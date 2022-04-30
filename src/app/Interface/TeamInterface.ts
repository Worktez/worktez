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
    TeamStatus: number;
    TeamDescription: string;
    TeamManagerEmail: string;
    TeamMembers: string[];
    Type: string[];
    Status: string[];
    Priority: string[];
    Difficulty: string[];
    TotalTeamTasks: number;
    OrganizationId: string;
    CurrentSprintId: number;
    Scope: string[];
    ProjectLink: string;
}

export interface TeamDataId extends Team {id: string;}

export interface Label {
    ColorCode: string;
    DisplayName: string;
    IconName: string;
    Scope: string;
    Status: string;
    Id: string;
}