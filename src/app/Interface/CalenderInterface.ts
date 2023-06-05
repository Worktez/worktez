export interface MonthInfo {
    days: number;
    name: string;
    displayName: string;
    month: number;
    year: number;
}

export interface DataCheck extends MonthInfo {
    check: boolean;
    color: string;
}