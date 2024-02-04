import { IInputs } from "../generated/ManifestTypes";
import { RecordItem } from "../interfaces/interfaces";

export let _context : ComponentFramework.Context<IInputs>;
export let _selectedRecord: RecordItem;

export const setContext = (context : ComponentFramework.Context<IInputs>) => {
    _context = context;
}

export const setSelectedRecord = (selectedRecord : RecordItem) => {
    _selectedRecord = selectedRecord;
}