import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
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
  appTheme: string

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService, public db: AngularFirestore) { }

  ngOnInit(): void {
    this.navbarHandler.addToNavbar(this.componentName);

    this.authService.userAppSettingObservable.subscribe(
      data =>{
        this.photoURL = data.photoURL;
        this.displayName = data.displayName;
        this.email = data.email;
        this.uid = data.uid;
        this.aboutMe = data.AboutMe;
        this.appTheme = data.AppTheme;
      }
      );    
  }

  editProfile(){
    this.editProfileEnabled = true;
  }

  editProfileCompleted(data: { completed: boolean }) {
    this.editProfileEnabled = false;
  }

}
