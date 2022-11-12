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
    "#BDE4A7",
    "#5df2d6",
    "#00bfa5",
    "#6effe8",
    "#1de9b6",
    "#00b686",
    "#ff5c8d",
    "#d81b60",
    "#a00037",
    "#ae52d4",
    "#7b1fa2",
    "#e6ceff",
    "#b39ddb",
    "#836fa9",
    "#e7ff8c",
    "#b2ff59",
    "#7ecb20",
    "#99d066",
    "#689f38",
    "#387002",
    "#d7ffd9",
    "#a5d6a7",
    "#75a478",
    "#b6ffff",
    "#81d4fa",
    "#4ba3c7",
    "#6f74dd",
    "#3949ab",
    "#00227b",
    "#b6e3ff",
    "#82b1ff",
    "#4d82cb",
    "#ffddc1",
    "#ffab91",
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
