import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  @Output() editNoteCompleted = new EventEmitter<boolean>();
  @Input('note') note: QuickNote;
  public quickNoteObservable: Observable<QuickNote>
  componentName:string = "QUICK-NOTES"
  editNote: QuickNote
  enableLoader: boolean = false

  constructor(private functions: AngularFireFunctions, public authService: AuthService, private toolService: ToolsService, private router: Router, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    
  }

  async saveNote() {
    const uid = this.authService.getLoggedInUser();
    const date = this.toolService.date();
    const time = this.toolService.time();
    this.enableLoader = true

    const callable = this.functions.httpsCallable("quickNotes/editNote");
    try {
    const result = await callable({Uid: uid, Title: this.note.Title, Note: this.note.Note, LastUpdatedDate: date, LastUpdatedTime: time, DocId: this.note.DocId }).toPromise();
    console.log("Note edited succesfully");
    } catch(error) {
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      console.error("Error", error);
    }
    this.editNoteCompleted.emit(true);
  }

  close() {
    this.editNoteCompleted.emit(true);
  }

}
