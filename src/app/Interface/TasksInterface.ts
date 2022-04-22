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
export interface Tasks {
  Id: string;
  Title: string;
  Status: string;
  Priority: string;
  EstimatedTime: number;
  Difficulty: string;
  Description: string;
  Creator: string;
  Project: string;
  Assignee: string;
  Reporter: string;
  Watcher: string[];
  LogWorkTotalTime: number;
  WorkDone: number;
  CreationDate: string;
  SprintNumber: number;
  StoryPointNumber: number;
  CompletionDate: string;
  OrganizationId: string;
  TeamId: string;
  Type: string;
  LinkCounter: number;
  LastUpdatedDate: string;
  PrLink: string;
  PrApiLink: string;
  PrNumber: string;
  MilestoneId:string;
}

export interface TasksId extends Tasks {id: string;}

export interface Link {
  LinkType: string;
  LinkURL: string;
  OrganizationID: string;
  TaskID: string;
}