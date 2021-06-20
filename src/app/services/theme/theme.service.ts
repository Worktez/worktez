import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  public fontColor: string = "#000000"
  public bgColor: string = "#FFFFFF"
  public chartGridlinesColor: string = "#829696"

  public presentThemeSubject = new BehaviorSubject('theme-light');
  presentTheme$: Observable<string> = this.presentThemeSubject.asObservable();
  constructor() {}

  changeTheme(theme) {
    if(theme == "theme-light") {
      this.fontColor = "#000000"
      this.bgColor = "#FFFFFF"
    } else {
      this.fontColor = "#FFFFFF"
      this.bgColor = "#000000"
    }
    this.presentThemeSubject.next(theme);
  }
}