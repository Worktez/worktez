/***********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 *  ***********************************************************/ 
 export interface CreateReleaseData {
    ReleaseId: string;
    Description: string;
    GenerateRelease: string;
    IfDraft: string;
    PreRelease: string;
    OwnerName: string;
    ReleaseDate: string;
    ReleaseName: string;
    RepoName:string;
    TagName: string;
    TargetBranch: string;
    TeamId: string;
    Title: string;
    generateRelease: boolean;
}