export interface Column {
    key: string
    name: string
    fieldName: string
    minWidth: number
    maxWidth: number
    isResizable: boolean
    isIndex: IsIndex
}

export interface IsIndex {
    alias: string
    dataType: string
    disabledSorting: boolean
    displayName: string
    name: string
    order: number
}

export interface RecordItem {
    [key: string]: any
}

export interface Entity {
    [key: string]: any;
  }