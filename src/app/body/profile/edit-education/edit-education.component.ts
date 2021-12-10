import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';


@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  @Input('uid') uid: string
  @Input('college') college: string
  @Input('degree') degree: string

  @Output() editProfileCompleted = new EventEmitter<{ completed: boolean }>();

  enableLoader: boolean = false
  showClose: boolean = false
  public userAvailable: boolean = false;

  constructor(private functions: AngularFireFunctions, public popupHandlerService: PopupHandlerService) { }

  ngOnInit(): void {
  }

  async editEducation() {
    if(this.userAvailable == true) {
      this.enableLoader = true
      const callable = this.functions.httpsCallable('users');
      try {
        await callable({ mode: "update", Uid: this.uid, College: this.college  }).toPromise();
        console.log("Successful");
        this.showClose = true
      } catch (error) {
        console.log("error");
        this.enableLoader = false
      }
    } else {
      console.log("User Not Available");
    }
  }

}
