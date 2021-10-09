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
    BasePath: string;
  }