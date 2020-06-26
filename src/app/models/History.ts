export enum HistorySearchingType {
    Beer,
    Trade
}

export interface History {
    type: HistorySearchingType;
    fields: string;
    resultCount: number;
}