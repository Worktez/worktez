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
import { map, Observable } from 'rxjs';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.css']
})
export class QuickNotesComponent implements OnInit {

  showNotesList: boolean = false
  public quickNoteObservable: QuickNote[]
  public notes: QuickNote[]
  componentName:string = "QUICK-NOTES"
  showloader: boolean = false
  showAddNote: boolean = false
  openEditNote: boolean = false
  selectedNote: QuickNote;
  gotQuickNotes: boolean=false;
  noNotes: boolean = true;

  constructor(private functions: AngularFireFunctions, public authService: AuthService, public errorHandlerService: ErrorHandlerService, public popupHandlerService:PopupHandlerService) { }

  ngOnInit(): void {
  }

  showList() {
    this.showNotesList = true
    this.showAddNote = false
    this.showloader = true
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable("quickNotes/getMyNotesList");
    callable({Uid: uid }).pipe(map(res=>{
      const data = res.data as QuickNote[];
      return data;
    })).subscribe({
      next: (data) => {
        if(data) {
          this.notes = data;
        }
        if(this.notes.length>0){
          this.noNotes = false
        }
        else{
          this.noNotes = true;
        }
        this.showloader = false
        
        this.gotQuickNotes=true;
        this.quickNoteObservable=data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Notes List successful')}
    });
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

  async deleteNote(docId: string) {
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("quickNotes/deleteNote");
    
    await callable({Uid: uid, DocId: docId}).subscribe({
      next: (data) => {
        this.showList();
        console.log("Successfull");
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
