import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

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
  bio: string

  constructor(public authService: AuthService, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.navbarHandler.addToNavbar(this.componentName);
    this.bio = this.authService.getBio();

      this.authService.afauth.user.subscribe(
      data =>{
        this.photoURL = data.photoURL;
        this.displayName = data.displayName;
        this.email = data.email;
        this.uid = data.uid;
      }
      );

  }

  editProfile(){
    this.editProfileEnabled = true;
  }

}
