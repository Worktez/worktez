import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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

  pushFileToTaskStorage(fileUpload: FileUpload, basePath: string, folderName: string): Observable<number> {
    this.fileUploadStatus = true;
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, basePath, folderName).then((data) => {
            this.readFiles(this.backendService.getOrganizationDomain(), folderName);
          });
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  async saveFileData(fileUpload: FileUpload, basePath: string, folderName: string) {

    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();

    const fileName = fileUpload.name;
    const fileUrl = fileUpload.url;
    const lastModified = fileUpload.file.lastModified;
    const size = fileUpload.file.size;

    if (folderName == "ContributorsDocuments") {
      const callable = this.functions.httpsCallable('librarian/uploadFileToContributorsDocuments');
      await callable({ BasePath: basePath, FileName: fileName, FileUrl: fileUrl, LastModified: lastModified, Size: size, Date: todayDate, Time: time }).toPromise();
    } else if (folderName == "ProfilePic") {
      const callable = this.functions.httpsCallable('librarian/uploadUserProfilePic');
      await callable({ BasePath: basePath, FileName: fileName, FileUrl: fileUrl, LastModified: lastModified, Size: size, Uid: this.authService.user.uid, Date: todayDate, Time: time }).toPromise();
    } else {
      const appKey = this.backendService.getOrganizationAppKey();
      if (folderName == "Logo") {
        const callable = this.functions.httpsCallable('librarian/uploadLogoFile');
        await callable({ BasePath: basePath, FileName: fileName, FileUrl: fileUrl, LastModified: lastModified, Size: size, AppKey: appKey, Uid: this.authService.user.uid, Date: todayDate, Time: time }).toPromise();
      } else if (folderName == "Documents") {
        const callable = this.functions.httpsCallable('librarian/uploadFileToOrgDocuments');
        await callable({ BasePath: basePath, FileName: fileName, FileUrl: fileUrl, LastModified: lastModified, Size: size, AppKey: appKey, Uid: this.authService.user.uid, Date: todayDate, Time: time }).toPromise();
      } else {
        const callable = this.functions.httpsCallable('librarian/uploadFileToTask');
        await callable({ BasePath: basePath, FileName: fileName, FileUrl: fileUrl, LastModified: lastModified, TaskId: folderName, Size: size, AppKey: appKey, Uid: this.authService.user.uid, Date: todayDate, Time: time }).toPromise();
      }
    }
    this.fileUploadStatus = false;
  }

  private async deleteFileFromDB(fileName, taskId, taskFileDocumentName) {
    const appKey = this.backendService.getOrganizationAppKey();
    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();

    const callable = this.functions.httpsCallable('librarian/deleteFilesInTask');
    return await callable({ FileName: fileName, TaskId: taskId, AppKey: appKey, Uid: this.authService.user.uid, Date: todayDate, Time: time, TaskFileDocumentName: taskFileDocumentName }).toPromise();
  }

  private deleteFileStorage(name: string, basePath: string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }

  async deleteFile(file: FileData) {
    this.deleteFileStorage(file.FileName, file.BasePath);
    this.deleteFileFromDB(file.FileName, file.TaskId, file.TaskFileDocumentName).then((data) => {
      this.readFiles(this.backendService.getOrganizationDomain(), file.TaskId);
    });
  }

  private async deleteFileFromDBOrg(fileName: string, fileUrl: string, orgFileDocumentName: string) {
    const appKey = this.backendService.getOrganizationAppKey();
    const todayDate = this.toolsService.date();
    const time = this.toolsService.time();  
    const callable = this.functions.httpsCallable('librarian/deleteFilesInOrg');
    return await callable({ FileName: fileName, FileUrl: fileUrl, AppKey: appKey, Uid: this.authService.user.uid, Date: todayDate, Time: time, OrgFileDocumentName: orgFileDocumentName }).toPromise();
    }

  async deleteFileOrg(file: FileData) {
    this.deleteFileStorage(file.FileName, file.BasePath);
    this.deleteFileFromDBOrg(file.FileName, file.FileUrl, file.OrgFileDocumentName, ).then((data) => {
    this.readFiles(this.backendService.getOrganizationDomain(), "Documents");
    });
    }

  readFiles(orgDomain: string, id: string) {
    if (id != "Logo") {

      if (id == "Documents") {
        const callable = this.functions.httpsCallable("librarian/getFilesInOrgDocument");
        this.filesData = callable({ OrgDomain: orgDomain }).pipe(
          map(actions => {
            return actions.data as FileData[];
          }));
      } else {
        const callable = this.functions.httpsCallable("librarian/getFilesInTask");
        this.filesData = callable({ OrgDomain: orgDomain, Id: id }).pipe(
          map(actions => {
            return actions.data as FileData[];
          }));
      }
    }
  }
}
