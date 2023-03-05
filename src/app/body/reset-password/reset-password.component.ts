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
  newPassword: string = '';
  confirmPassword: string = '';
  letters = /[a-zA-z]/;
  numbers = /\d/;
  showPassword:boolean;
  containsLetters: boolean;
  containsNumbers: boolean;
  minLength:boolean;
  actionCodeChecked: boolean;
  passwordsMatched:boolean;
  passwordResetCompleted: boolean = false;

  constructor(public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, public afauth: AngularFireAuth) { }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.queryParams['mode'];
    this.actionCode = this.activatedRoute.snapshot.queryParams['oobCode'];
    this.apiKey= this.activatedRoute.snapshot.queryParams['apiKey']
    if (this.mode ==  undefined || this.actionCode == undefined){
      this.router.navigate(['/Home']);
    }
    this.afauth.verifyPasswordResetCode(this.actionCode).then(email => {
      this.email= email;
      this.actionCodeChecked = true;
    }).catch(e => {
      this.router.navigate(['/login']);
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleResetPassword() {
    if (this.newPassword != this.confirmPassword) {
      alert('New Password and Confirm Password do not match');
      this.router.navigate(['/Home']);
      return;
    }
    // Save the new password.    /// this method is not working right now
    this.afauth.confirmPasswordReset(this.actionCode, this.newPassword).then(resp => {
      console.log(resp);
      this.passwordResetCompleted = true;
    }).catch(error => {
      console.error(error)
    });
  }
  checkInputField(){
    this.newPassword.length >= 6? this.minLength = true: this.minLength = false;
    this.newPassword == this.confirmPassword? this.passwordsMatched = true: this.passwordsMatched = false;
    this.containsLetters=this.letters.test(this.newPassword);
    this.containsNumbers=this.numbers.test(this.newPassword);
  }
  navigateToLogin(){
    this.router.navigate(['/login']);
  }
}