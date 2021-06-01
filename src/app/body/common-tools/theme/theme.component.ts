import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  enableDarkTheme: boolean
  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
  }

  changeThemeSwitch(){
    if(this.enableDarkTheme){
      return this.themeService.changeTheme('theme-light')
    }
    else{
      return this.themeService.changeTheme('theme-dark')
    }
  }

}
