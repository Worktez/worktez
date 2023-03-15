/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  public fontColor: string = "#000000"
  public bgColor: string = "#FFFFFF"
  public chartGridlinesColor: string = "#829696"

  public presentThemeSubject = new BehaviorSubject('theme-light');
  presentTheme$: Observable<string> = this.presentThemeSubject.asObservable();
  constructor(private cookieService: CookieService, private router: Router) {}

  changeTheme(theme: string) {
    if(theme == "theme-light") {
      this.fontColor = "#000000"
      this.bgColor = "#FFFFFF"
    } else {
      this.fontColor = "#FFFFFF"
      this.bgColor = "#000000"
    }

    this.cookieService.set("userAppTheme", theme);
    this.presentThemeSubject.next(theme);
  }

  clearDarkThemeFromCookies(theme: string){
    if(theme === "theme-dark"){
      this.cookieService.deleteAll("userAppTheme");
      this.router.navigate(['/techverse']);
      location.reload();
    }
  }
}