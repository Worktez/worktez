import { Component, Input, OnInit } from '@angular/core';
import { Label } from 'src/app/Interface/TeamInterface';

@Component({
  selector: 'app-generate-icon',
  templateUrl: './generate-icon.component.html',
  styleUrls: ['./generate-icon.component.css']
})
export class GenerateIconComponent implements OnInit {

  @Input('icon') icon: Label;
  @Input('Border') Border: boolean = false;

  colorCode: string = "";
  constructor() { }

  ngOnInit(): void {
    this.colorCode = "#" + this.icon.ColorCode;
    console.log(this.icon);
  }

}
