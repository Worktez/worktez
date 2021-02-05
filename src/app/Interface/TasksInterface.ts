export interface Tasks {
  Id: string;
  Title: string;
  Status: string;
  Priority: string;
  EstimatedTime: number;
  Difficulty: string;
  Description: string;
  Creator: string;
  Category: string;
  Assignee: string;
  LogWorkTotalTime: number;
  WorkDone: number;
  CreationDate: string;
  SprintNumber: number;
  StoryPointNumber: number;
  CompletionDate: string;
}

export interface TasksId extends Tasks {id: string;}
