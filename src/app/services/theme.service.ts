import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public appTheme: string;

  theme(){
  // this.appTheme = 'theme-dark'
    // if(!this.authService.afauth){
    //   return this.presentThemeSubject.next('theme-light');
    // } else {
      this.appTheme = this.authService.userAppSetting.appTheme;
      return this.presentThemeSubject.next(this.appTheme);
    // }
  }
  public presentThemeSubject = new BehaviorSubject('theme-light');
  presentTheme$: Observable<string> = this.presentThemeSubject.asObservable();


  constructor(public authService: AuthService) {
    if(this.authService.afauth.user) {
    this.theme();
    }
   }

  changeTheme(theme) {
    this.presentThemeSubject.next(theme);
  }

}