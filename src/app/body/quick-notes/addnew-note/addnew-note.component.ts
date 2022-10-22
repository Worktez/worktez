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
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { RBAService } from 'src/app/services/RBA/rba.service';

@Component({
  selector: 'app-addnew-note',
  templateUrl: './addnew-note.component.html',
  styleUrls: ['./addnew-note.component.css']
})
export class AddnewNoteComponent implements OnInit {

  @Output() addNoteCompleted = new EventEmitter<boolean>();

  title: string = ""
  titleChanged:boolean = false
  notesContent: string = ""

  enableLoader: boolean = false

  constructor(private functions: AngularFireFunctions,public rbaService :RBAService, public authService: AuthService, private toolService: ToolsService,public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
  }

  createTask(){
    this.popupHandlerService.createNewTaskEnabled= true;
    this.popupHandlerService.resetTaskIds();
    this.popupHandlerService.quickNotesTitle = this.title;
    this.popupHandlerService.quickNotesDescription = this.notesContent;
    }

  addNote() {
    this.enableLoader = true
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();

    if(this.title != "" && this.notesContent != "" ) {
      const callable = this.functions.httpsCallable("quickNotes/addNote");
      callable({Uid: uid, Title: this.title, Note: this.notesContent, LastUpdatedDate: date, LastUpdatedTime: time }).pipe(map(res=>{
        return res
      })).subscribe((data) => {
        this.addNoteCompleted.emit(true);
        this.enableLoader = false
      });
    }
  }

  setTitle(){
    if(!this.titleChanged){
    var titleArray = this.notesContent.split(' ');
    titleArray = titleArray.slice(0,3);
    this.title = titleArray.join(' ');
    }
  }

  setChange(){
      this.titleChanged = true;
  }

  close() {
    this.addNoteCompleted.emit(true);
  }

}
