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
}

export interface TasksId extends Tasks {id: string;}

export interface Link {
  LinkType: string;
  LinkURL: string;
  OrganizationID: string;
  TaskID: string;
}