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
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  @Output() editNoteCompleted = new EventEmitter<boolean>();
  @Output() addNewNote = new EventEmitter();
  @Input('note') note: QuickNote;
  public quickNoteObservable: Observable<QuickNote>
  componentName:string = "QUICK-NOTES"
  editNote: QuickNote
  enableLoader: boolean = false

  constructor(private functions: AngularFireFunctions, public authService: AuthService, private toolService: ToolsService, private router: Router, public errorHandlerService: ErrorHandlerService,public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
    
  }

  createTask(){
    this.popupHandlerService.createNewTaskEnabled= true;
    this.popupHandlerService.resetTaskIds();
    this.popupHandlerService.quickNotesTitle = this.note.Title;
    this.popupHandlerService.quickNotesDescription = this.note.Note;
    this.saveNote();
    }


  async saveNote() {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true

    const callable = this.functions.httpsCallable("quickNotes/editNote");
    
    const result = await callable({Uid: uid, Title: this.note.Title, Note: this.note.Note, LastUpdatedDate: date, LastUpdatedTime: time, DocId: this.note.DocId }).subscribe({
      next: (data) => {
        console.log("Note edited succesfully");
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error("Error", error);
      },
      complete: () => console.info('Successfully edited note')
  });
    this.editNoteCompleted.emit(true);
  }

  addNote(){
    this.addNewNote.emit();
  }

  close() {
    this.editNoteCompleted.emit(true);
  }

}
