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
}

export interface TeamDataId extends Team {id: string;}