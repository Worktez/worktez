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
export interface GitData {
    avatar_url: string;
}

export interface GitRepoData {
    title: string;
    body: string;
    url: string;
    html_url: string;
    number: number;
    state: string;
    description: string;
    web_url:string;
    iid: number;
}
export interface GitPrData{
    title: string;
    body: string;
    url: string;
    html_url: string;
}