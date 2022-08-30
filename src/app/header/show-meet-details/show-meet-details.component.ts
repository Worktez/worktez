import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { Meet } from 'src/app/Interface/MeetInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { map, Observable } from "rxjs";




@Component({
  selector: 'app-show-meet-details',
  templateUrl: './show-meet-details.component.html',
  styleUrls: ['./show-meet-details.component.css']
})
export class ShowMeetDetailsComponent implements OnInit {

  meetData:Meet[]=[];

  @Output() getMeet: EventEmitter<string> = new EventEmitter();
  @Input('meet') meet:Meet;
  constructor(public authService: AuthService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) {}

  ngOnInit(): void {
    this.getMeetData();
  }  

  getMeetData() {
    const uid = this.authService.getLoggedInUser();
    const callable = this.functions.httpsCallable("meet/getMeetDetails");
    callable({ Uid: uid }).pipe(map(actions => {
        return actions.data as Meet[];
      })).subscribe({
        next: (data) => {
          if (data) {
            this.meetData = data            
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Meet Data Successfully");
        }
      })
  }
}
