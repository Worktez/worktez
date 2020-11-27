export interface Tasks {
  Id: string;
  Title: string;
  Status: string;
  Priority: string;
  ET: number;
  Difficulty: string;
  Description: string;
  Creator: string;
  Category: string;
  Assignee: string;
  LogHours: number;
  WorkDone: string;
  CreationDate: string;
  SprintNumber: number;
  StoryPointNumber: string;
  LogWorkTotalTime: number;
}

export interface TasksId extends Tasks {id: string;}
