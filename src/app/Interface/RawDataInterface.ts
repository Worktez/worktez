/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
export interface Counters {
  TotalNumberOfTask: number;
  TotalUnCompletedTask: number;
  TotalCompletedTask: number;
}

export interface RawDataType extends Counters {
  CurrentSprintId: number;
}

export interface RawDataId extends RawDataType { id: string; }
