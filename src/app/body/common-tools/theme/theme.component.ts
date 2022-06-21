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
import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  @Input('appTheme') appTheme: string
  @Input('uid') uid: string
  @Input('showOnlyButton') showOnlyButton: boolean
  showloader: boolean = false;
  componentName:string ="THEME";
  enableDarkTheme: boolean
  presentThemeReady: boolean=false;
  
  constructor(public themeService: ThemeService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.themeService.presentTheme$.subscribe((data) => {
      this.presentThemeReady = true;
    });
    
    if (this.appTheme == 'theme-dark') {
      this.enableDarkTheme = true;
    } else {
      this.enableDarkTheme = false;
    }
  }

  changeThemeSwitch() {
    if (!this.enableDarkTheme) {
      return this.updateTheme('theme-dark')
    }
    else {
      return this.updateTheme('theme-light')
    }

  }

  updateTheme(appTheme: string) {
    const callable = this.functions.httpsCallable('users/updateTheme');
    this.showloader = true;
    this.themeService.changeTheme(appTheme);

    callable({Uid: this.uid, AppTheme: appTheme }).subscribe({
      next: (data) => {
        console.log("Successful updated theme");
        this.showloader = false;
      },
      error: (error) => {
        this.errorHandlerService.showError = true;
        this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
        console.error(error);
      },
      complete: () => console.info('Theme updated successfully')
  });
}
} 
  


