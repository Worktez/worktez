import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { auth } from 'firebase-functions/v1';
import { element } from 'protractor';
import { map } from 'rxjs';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from '../auth/auth.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class QuickNotesService {
  componentName:string = "QUICK-NOTES"

  showloader: boolean = false;
  notes: QuickNote[] = [];
  notesOrder: string[] = [];
  noNotes: boolean;


  constructor(private errorHandlerService: ErrorHandlerService, private authService: AuthService, private functions: AngularFireFunctions) { }

  getQuickNotes() {
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable("quickNotes/getMyNotesList");
    callable({Uid: uid }).pipe(map(res=>{
      const data = res.data as QuickNote[];
      return data;
    })).subscribe({
      next: (data) => {
        if(data) {
          this.notes = [];
          this.notesOrder = this.authService.userAppSetting.NotesOrder;
          this.notesOrder.forEach(element => {
            data.forEach(note => {
              if(note.DocId == element){
                this.notes.push(note);
              }
            })
          })
        }
        if(this.notes.length>0){
          this.noNotes = false
        }
        else{
          this.noNotes = true;
        }
        this.showloader = false
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => {
        console.info('Getting Notes List successful')}
    });
  }

  reorderQuicknotes(){
    this.authService.userAppSetting.NotesOrder=this.notesOrder;
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("quickNotes/reorderQuicknotes");
    callable({Uid: uid, NotesOrder: this.notesOrder }).pipe(map(res=>{
      const data = res.data as QuickNote[];
      return data;
    })).subscribe({
      next: (data) => {
        console.log("Quicknotes Reorder");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => {
        console.info('Reordering Quicknotes successful')
      }
    });
  }
}
