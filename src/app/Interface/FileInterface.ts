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
export class FileUpload {
    key: string;
    name: string;
    url: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
  }

  export interface FileData {
    FileName: string;
    FileUrl: string;
    LastModified: number;
    Size: number;
    Uid: string;
    Date: string;
    Time: string;
    TaskId: string;
    OrgId: string;
    TaskFileDocumentName: string;
    OrgFileDocumentName: string;
    BasePath: string;
  }