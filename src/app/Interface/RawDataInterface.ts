export interface Counters {
  TotalNumberOfTask: number;
  TotalUnCompletedTask: number;
  TotalCompletedTask: number;
}

export interface RawDataType extends Counters {
  CurrentSprintId: number;
}

export interface RawDataId extends RawDataType { id: string; }

export interface Main extends Counters {
  EndDate: string;
  StartDate: string;
  Status: string;
  OrganizationId: string;
}

export interface MainDataId extends Main { id: string; }
