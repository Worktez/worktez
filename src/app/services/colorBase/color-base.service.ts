import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorBaseService {

  public colors: string [] = [
    "#000000",
    "#d32f2f",
    "#6a1b9a",
    "#1a237e",
    "#0277bd",
    "#2e7d32",
    "#00c853",
    "#f9a825",
    "#ff6f00",
    "#ffb300",
    "#ffab00",
    "#d84315",
    "#4e342e",
    "#424242",
    "#00b0ff",
  ]

  constructor() { }

  getColorsWithLimit(start, end) {
    console.log(this.colors.length)
    if(end>this.colors.length) {
      end = this.colors.length;
    }
    if(start<this.colors.length && end<=this.colors.length) {
      return this.colors.slice(start, end);
    }
  }
}
