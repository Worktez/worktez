import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {
  componentName: string = "LOGIN"
  teamName: string

  constructor(private route: ActivatedRoute, public authService: AuthService, public errorHandlerService: ErrorHandlerService, public router: Router) { }

  ngOnInit(): void {
    this.teamName = this.route.snapshot.params['teamName'];
  }

  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      this.router.navigate(['']);
    }).catch((err) => {
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError");
      console.log(err);
    });
  }
}
