export interface Tasks {
  Id: string;
  Title: string;
  Status: string;
  Priority: string;
  ET: string;
  Difficulty: string;
  Description: string;
  Creator: string;
  Category: string;
  Assignee: string;
  LogHours: string;
  WorkDone: string;
  // CreationDate: string;
  SprintNumber: number;
  StoryPointNumber: string;
}

export interface TasksId extends Tasks {id: string;}
