import { Injectable } from '@angular/core';
import { matIcons } from './matIcons';

@Injectable({
  providedIn: 'root'
})
export class IconsBaseService {

  icons: string[] = []

  constructor() {
    const data = matIcons;
    this.icons = data;
  }

  getIconsWithLimit(start, end) {
    if(end>this.icons.length) {
      end = this.icons.length;
    }
    if(start<this.icons.length && end<this.icons.length) {
      return this.icons.slice(start, end);
    }
  }
}
