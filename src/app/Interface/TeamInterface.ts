export interface Sprint {
    OrganizationId: string;
    TeamId: string;
    SprintNumber: number;
    TotalNumberOfTask: number;
    TotalCompletedTask: number;
    TotalUnCompletedTeamTask: number;
    StartDate: string;
    EndDate: string;
    Status: string;
}

export interface SprintDataId extends Sprint{id: string;}

export interface Team {
    TeamName: string;
    TeamId: string;
    TeamDescription: string;
    TeamManagerEmail: string;
    TeamMembers: string[];
    TaskLabels: string[];
    StatusLabels: string[];
    PriorityLabels: string[];
    DifficultyLabels: string[];
    TotalTeamTasks: number;
    OrganizationId: string;
    CurrentSprintId: number;
}

export interface TeamDataId extends Team {id: string;}