import { IInputs } from "../generated/ManifestTypes";
import { RecordItem } from "../interfaces/interfaces";

export let _context: ComponentFramework.Context<IInputs>;
export let _childRecodSchema: string = "new_childrecord";

export const setContext = (context: ComponentFramework.Context<IInputs>) => {
  _context = context;
};

export const getSelectedChildRecords = async (selectedRecordId: string) => {
  let fetchXml = `?fetchXml=<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
                                <entity name='new_contactevent'>
                                    <attribute name='new_contacteventid' />
                                    <attribute name='new_name' />
                                    <attribute name='createdon' />
                                    <order attribute='new_name' descending='false' />
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
