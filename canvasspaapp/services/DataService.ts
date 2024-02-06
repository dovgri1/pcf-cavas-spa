import { IInputs } from "../generated/ManifestTypes";
import { RecordItem } from "../interfaces/interfaces";

export let _context: ComponentFramework.Context<IInputs>;
export let _childRecodSchema: string = "new_childrecord";

export const setContext = (context: ComponentFramework.Context<IInputs>) => {
  _context = context;
};

export const getSelectedChildRecords = async (selectedRecordId: string) => {
  let fetchXml = `?fetchXml=<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' top='5'>
                                <entity name='new_contactevent'>
                                    <attribute name='new_contacteventid' />
                                    <attribute name='new_name' />
                                    <attribute name='createdon' />
                                    <attribute name='new_eventdate' />
                                    <order attribute='new_eventdate' descending='true' />
                                    <filter type='and'>
                                    <condition attribute='new_contact' operator='eq' value='${selectedRecordId}' />
                                    </filter>
                                </entity>
                            </fetch>`;

  const result = await _context.webAPI.retrieveMultipleRecords(
    "new_contactevent",
    fetchXml
  );

  return result;
};

export const createNewEvent = async (eventName : string, eventDate: string, selectedRecordId :  string) => {
  let entitySchemaName : string;
  if(_context.parameters.eventEntitySchema == null || _context.parameters.eventEntitySchema.raw == null){
    entitySchemaName = "new_contactevent";
  }else{
    entitySchemaName = _context.parameters.eventEntitySchema.raw 
  }

  const eventData = {
    "new_name": eventName,
    "new_eventdate": new Date(eventDate).toISOString(),
    "new_Contact@odata.bind": `/contacts(${selectedRecordId})`
  };

  const createResponse = await _context.webAPI.createRecord(entitySchemaName, eventData);
  return createResponse;

}
