export interface Counters {
  TotalNumberOfTask: number;
  TotalUnCompletedTask: number;
  TotalCompletedTask: number;
}

export interface RawDataType extends Counters {
  CurrentSprintId: number;
}

export interface RawDataId extends RawDataType { id: string; }
