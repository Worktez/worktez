import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { QuickNote } from 'src/app/Interface/UserInterface';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuickNotesService {

  showloader: boolean = false;
  notes: QuickNote[];
  noNotes: boolean;

  constructor(private authService: AuthService, private functions: AngularFireFunctions) { }

  getQuickNotes() {
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
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Getting Notes List successful')}
    });
  }
}
