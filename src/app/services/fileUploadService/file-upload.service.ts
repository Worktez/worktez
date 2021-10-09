import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileData, FileUpload } from 'src/app/Interface/FileInterface';
import { AuthService } from '../auth.service';
import { BackendService } from '../backend/backend.service';
import { ToolsService } from '../tool/tools.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public fileUploadStatus: boolean = false;
  taskId: string = "";

  filesData: Observable<FileData[]>

  constructor(private storage: AngularFireStorage, private functions: AngularFireFunctions, private backendService: BackendService, private authService: AuthService, private toolsService: ToolsService) { }

  pushFileToTaskStorage(fileUpload: FileUpload, basePath: string, taskId: string): Observable<number> {
    this.fileUploadStatus = true;
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, basePath, taskId).then((data) => {
            this.readFiles();
          });
        });
      })
    ).subscribe();
  
    return uploadTask.percentageChanges();
  }

  async saveFileData(fileUpload: FileUpload, basePath: string, taskId: string) {
    const appKey = this.backendService.getOrganizationAppKey();

    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();

    const fileName = fileUpload.name;
    const fileUrl = fileUpload.url;
    const lastModified = fileUpload.file.lastModified;
    const size = fileUpload.file.size;

    const callable = this.functions.httpsCallable( 'tasks' );
    await callable( { mode: "UploadFileToTask", BasePath: basePath, FileName: fileName, FileUrl: fileUrl, LastModified: lastModified, TaskId: taskId, Size: size, AppKey: appKey,  Uid: this.authService.user.uid, Date: todayDate, Time: time } ).toPromise();

    this.fileUploadStatus = false;
  }

  private async deleteFileFromDB(fileName, taskId, taskFileDocumentName) {
    const appKey = this.backendService.getOrganizationAppKey();
    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();

    const callable = this.functions.httpsCallable( 'tasks' );
    return await callable( { mode: "DeleteFilesInTask", FileName: fileName, TaskId: taskId, AppKey: appKey,  Uid: this.authService.user.uid, Date: todayDate, Time: time, TaskFileDocumentName:  taskFileDocumentName} ).toPromise();
  }

  private deleteFileStorage(name: string, basePath:string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }

  async deleteFile(file: FileData) {
    this.deleteFileStorage(file.FileName, file.BasePath);
    this.deleteFileFromDB(file.FileName, file.TaskId, file.TaskFileDocumentName).then((data) => {
      this.readFiles();
    });
  }

  readFiles() {
    const orgDomain = this.backendService.getOrganizationDomain();
    const selectedTaskId = this.backendService.selectedTaskId;

    const callable = this.functions.httpsCallable("tasks");
    this.filesData = callable({ mode: "GetFilesInTask", OrgDomain: orgDomain, Id: selectedTaskId }).pipe(
      map(actions => {
        return actions.data as FileData[];
    }));
  }
}
