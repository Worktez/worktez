import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  editProfileEnabled: boolean = false
  componentName: string = "PROFILE"
  uid: string
  photoURL: string
  displayName: string
  email: string
  aboutMe: string

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public db: AngularFirestore) { }

  ngOnInit(): void {
    this.navbarHandler.addToNavbar(this.componentName);

    this.uid = this.authService.getUserData().uid
    this.photoURL = this.authService.getUserData().photoURL
    this.displayName = this.authService.getUserData().displayName
    this.email = this.authService.getUserData().email
    this.aboutMe = this.authService.getUserData().aboutMe

  }

  editProfile(){
    this.editProfileEnabled = true;
  }

  editProfileCompleted(data: { completed: boolean }) {
    this.editProfileEnabled = false;
    this.authService.getUserSettings();
  }

}
