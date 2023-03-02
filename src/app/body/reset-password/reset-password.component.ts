import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode: string;
  actionCode: string;
  apiKey: string;
  email: any;
  newPassword: string;
  confirmPassword: string;

  actionCodeChecked: boolean;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, public afauth: AngularFireAuth) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.queryParams['mode'];
    this.actionCode = this.activatedRoute.snapshot.queryParams['oobCode'];
    this.apiKey= this.activatedRoute.snapshot.queryParams['apiKey']
    if (this.mode ==  undefined || this.actionCode == undefined){
      this.router.navigate(['/Home']);
    }  
    console.log(this.mode, this.actionCode, this.apiKey);
    this.afauth.verifyPasswordResetCode(this.actionCode).then(email => {
      this.email= email;
      console.log("email: ", this.email);
      this.actionCodeChecked = true;
    }).catch(e => {
      this.router.navigate(['/login']);
    });
  }

  handleResetPassword() {
    if (this.newPassword != this.confirmPassword) {
      alert('New Password and Confirm Password do not match');
      this.router.navigate(['/login']);
      return;
    }
    console.log(this.newPassword);
    // Save the new password.    /// this method is not working right now
    this.afauth.confirmPasswordReset(this.actionCode, this.newPassword).then(resp => {
      console.log(resp);
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error(error)
    });
  }

}