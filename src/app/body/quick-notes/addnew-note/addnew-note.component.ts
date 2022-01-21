import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

@Component({
  selector: 'app-addnew-note',
  templateUrl: './addnew-note.component.html',
  styleUrls: ['./addnew-note.component.css']
})
export class AddnewNoteComponent implements OnInit {

  @Output() addNoteCompleted = new EventEmitter<boolean>();

  title: string = ""
  notesContent: string = ""

  showloader: boolean = false

  constructor(private functions: AngularFireFunctions, public authService: AuthService, private toolService: ToolsService) { }

  ngOnInit(): void {
  }

  addNote() {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.showloader = true

    const callable = this.functions.httpsCallable("quickNotes/addNote");
    callable({Uid: uid, Title: this.title, Note: this.notesContent, LastUpdatedDate: date, LastUpdatedTime: time }).pipe(map(res=>{
      return res
    })).subscribe((data) => {
      console.log(data);
      this.showloader = false
      this.addNoteCompleted.emit(true);
    });
  }

}
