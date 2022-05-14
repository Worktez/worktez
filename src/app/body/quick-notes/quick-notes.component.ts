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
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { QuickNotesService } from 'src/app/services/quickNotes/quick-notes.service';

@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.css']
})
export class QuickNotesComponent implements OnInit {

  showNotesList: boolean = false
  componentName:string = "QUICK-NOTES"
  showAddNote: boolean = false
  openEditNote: boolean = false
  selectedNote: QuickNote;
  enableLoader: boolean = false
  constructor(private quickNotes: QuickNotesService, private functions: AngularFireFunctions, public authService: AuthService, public errorHandlerService: ErrorHandlerService, public popupHandlerService:PopupHandlerService) { }

  ngOnInit(): void {
  }

  showList() {
    this.showNotesList = true
    this.showAddNote = false
    this.quickNotes.getQuickNotes();
  }

  openAddNote() {
    this.showNotesList = false
    this.openEditNote= false;
    this.showAddNote = true
  }

  addNoteCompleted(data) {
    if(data) {
      this.showAddNote = false
      return this.showList()
    }
  }

  openNote(item: QuickNote) {
    this.showList();
    this.selectedNote = item;
    this.showNotesList = false
    this.openEditNote = true

  }

  editNoteCompleted(data) {
    if(data) {
      this.showNotesList = true
      this.openEditNote = false
    }
  }

  deleteNote(docId: string) {
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("quickNotes/deleteNote");
    this.enableLoader = true
    callable({Uid: uid, DocId: docId}).subscribe({
      next: (data) => {
        this.showList();
        console.log("Successfull");
        this.enableLoader = false
      },
      error: (error) => {
        console.log("Error", error);
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('Successful updated Selected Team in db')
  });
  
  }

  close() {
    this.showNotesList = false;
    this.showAddNote = false;
    this.openEditNote = false;
  }

}
