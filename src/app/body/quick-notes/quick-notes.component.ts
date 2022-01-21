import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Observable } from 'rxjs';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quick-notes',
  templateUrl: './quick-notes.component.html',
  styleUrls: ['./quick-notes.component.css']
})
export class QuickNotesComponent implements OnInit {

  showNotesList: boolean = false
  public quickNoteObservable: Observable<QuickNote[]>
  public notes: QuickNote[]

  showloader: boolean = false
  showAddNote: boolean = false
  openEditNote: boolean = false

  constructor(private functions: AngularFireFunctions, public authService: AuthService) { }

  ngOnInit(): void {
  }

  showList() {
    this.showNotesList = true
    this.showloader = true
    const uid = this.authService.getLoggedInUser();

    const callable = this.functions.httpsCallable("quickNotes/getMyNotesList");
    this.quickNoteObservable =  callable({Uid: uid }).pipe(map(res=>{
      const data = res.data as QuickNote[];
      if(data) {
        this.notes = data;
      }
      this.showloader = false
      return data
    }));
  }

  openAddNote() {
    this.showNotesList = false
    this.showAddNote = true
  }

  addNoteCompleted(data) {
    if(data) {
      this.showNotesList = true
      this.showAddNote = false
    }
  }

  openNote() {
    this.showNotesList = false
    this.openEditNote = true
  }
}
