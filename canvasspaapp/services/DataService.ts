import { IInputs } from "../generated/ManifestTypes";
import { signInAndGetToken } from "./AuthorizationService";

export let _context: ComponentFramework.Context<IInputs>;
export let _childRecodSchema: string = "new_childrecord";
let eventEntitySchema: string = "new_contactevent";
let eventEntityNameSchema: string = "new_name";
let eventEntityDateSchema: string = "new_eventdate";
let eventRelatedEntitySchema: string = "new_contact";
let environmentUrl: string = "";
let applicationId: string;
let tenantId: string;
let appType: string = "model";
let accessToken: string = "";

interface Entity {
  [key: string]: any;
}

interface WebApiRetrieveMultipleResponse {
  value: Entity[];
}

export const setContext = async (
  context: ComponentFramework.Context<IInputs>
) => {
  _context = context;
  if (
    _context.parameters.environmentUrl.raw != null &&
    _context.parameters.environmentUrl.raw != ""
  ) {
    environmentUrl = _context.parameters.environmentUrl.raw;
  }

  if (
    _context.parameters.eventEntityDateSchema.raw != null &&
    _context.parameters.eventEntityDateSchema.raw != ""
  ) {
    eventEntityDateSchema = _context.parameters.eventEntityDateSchema.raw;
  }

  if (
    _context.parameters.eventEntityNameSchema.raw != null &&
    _context.parameters.eventEntityNameSchema.raw != ""
  ) {
    eventEntityNameSchema = _context.parameters.eventEntityNameSchema.raw;
  }

  if (
    _context.parameters.eventEntitySchema.raw != null &&
    _context.parameters.eventEntitySchema.raw != ""
  ) {
    eventEntitySchema = _context.parameters.eventEntitySchema.raw;
  }

  if (
    _context.parameters.eventRelatedEntitySchema.raw != null &&
    _context.parameters.eventRelatedEntitySchema.raw != ""
  ) {
    eventRelatedEntitySchema = _context.parameters.eventRelatedEntitySchema.raw;
  }

  if (
    _context.parameters.appType.raw != null &&
    _context.parameters.appType.raw != ""
  ) {
    appType = _context.parameters.appType.raw;
  }

  if(_context.parameters.applicationId.raw != null && _context.parameters.applicationId.raw != ""){
    applicationId = _context.parameters.applicationId.raw;
  }

  if(_context.parameters.tenantId.raw != null && _context.parameters.tenantId.raw != ""){
    tenantId = _context.parameters.tenantId.raw;
  }

  if (_context.parameters.appType.raw !== "model") {
    accessToken = await signInAndGetToken(environmentUrl, applicationId, tenantId);
  }
};

export const getSelectedChildRecords = async (selectedRecordId: string) => {
  let results: Entity[];

  if (appType == "model") {
    let fetchXml = `?fetchXml=<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' top='9'>
    <entity name='${eventEntitySchema}'>
        <attribute name='${eventEntitySchema}id' />
        <attribute name='${eventEntityNameSchema}' />
        <attribute name='${eventEntityDateSchema}' />
        <order attribute='${eventEntityDateSchema}' descending='true' />
        <filter type='and'>
        <condition attribute='${eventRelatedEntitySchema}' operator='eq' value='${selectedRecordId}' />
        </filter>
    </entity>
      </fetch>`;

    let response = await _context.webAPI.retrieveMultipleRecords(
      "new_contactevent",
      fetchXml
    );
    results = response.entities;
  } else {
    let uri = `${environmentUrl}/api/data/v9.2/${eventEntitySchema}s?$select=_${eventRelatedEntitySchema}_value,${eventEntityDateSchema},${eventEntityNameSchema}&$filter=_${eventRelatedEntitySchema}_value eq ${selectedRecordId}`;
    let response = await RetrieveMultipleXhr(accessToken, uri);
    results = response.value;
  }
  return results;
};

export const createNewEvent = async (
  eventName: string,
  eventDate: string,
  selectedRecordId: string
) => {
  let entitySchemaName: string;
  let createResponse: ComponentFramework.LookupValue;
  if (
    _context.parameters.eventEntitySchema == null ||
    _context.parameters.eventEntitySchema.raw == null
  ) {
    entitySchemaName = "new_contactevent";
  } else {
    entitySchemaName = _context.parameters.eventEntitySchema.raw;
  }

  const eventData = {
    new_name: eventName,
    new_eventdate: new Date(eventDate).toISOString(),
    "new_Contact@odata.bind": `/contacts(${selectedRecordId})`,
  };

  if (appType === "model") {
    createResponse = await _context.webAPI.createRecord(
      entitySchemaName,
      eventData
    );
  } else {
    let uri = `${environmentUrl}/api/data/v9.2/${eventEntitySchema}`;
    createResponse = await CreateXhr(uri, eventData);
  }

  return createResponse;
};

const RetrieveMultipleXhr = (
  accessToken: string,
  uri: string
): Promise<WebApiRetrieveMultipleResponse> => {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open("GET", uri, true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Prefer", "odata.include-annotations=*, odata.maxpagesize=5");
    req.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          const results: WebApiRetrieveMultipleResponse = JSON.parse(
            req.response
          );
          resolve(results);
        } else {
          reject(new Error("Error fetching records: " + req.responseText));
        }
      }
    };
    req.send();
  });
};

const CreateXhr = (
  uri: string,
  record: unknown
): Promise<ComponentFramework.LookupValue> => {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest();
    req.open("POST", uri, true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Prefer", "odata.include-annotations=*");
    req.setRequestHeader("Authorization", `Bearer ${accessToken}`);
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 204) {
          const results: ComponentFramework.LookupValue = JSON.parse(
            req.status.toString()
          );
          resolve(results);
        } else {
          reject(new Error("Error fetching records: " + req.responseText));
        }
      }
    };
    req.send(JSON.stringify(record));
  });
};
