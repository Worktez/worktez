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
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-addnew-note',
  templateUrl: './addnew-note.component.html',
  styleUrls: ['./addnew-note.component.css']
})
export class AddnewNoteComponent implements OnInit {

  @Output() addNoteCompleted = new EventEmitter<boolean>();
  @Output() showList = new EventEmitter();

  title: string = ""
  notesContent: string = ""

  enableLoader: boolean = false

  constructor(private functions: AngularFireFunctions, public authService: AuthService, private toolService: ToolsService,public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
  }

  createTask(){
    this.popupHandlerService.createNewTaskEnabled= true;
    this.popupHandlerService.resetTaskIds();
    this.popupHandlerService.quickNotesTitle = this.title;
    this.popupHandlerService.quickNotesDescription = this.notesContent;
    this.addNote();
    }

  addNote() {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true

    if(this.title != "" && this.notesContent != "" ) {
      const callable = this.functions.httpsCallable("quickNotes/addNote");
      callable({Uid: uid, Title: this.title, Note: this.notesContent, LastUpdatedDate: date, LastUpdatedTime: time }).pipe(map(res=>{
        return res
      })).subscribe((data) => {
        this.enableLoader = false
        this.addNoteCompleted.emit(true);
      });
    }
  }

  close() {
    this.addNoteCompleted.emit(true);
  }

}
