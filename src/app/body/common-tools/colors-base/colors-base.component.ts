import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColorBaseService } from 'src/app/services/colorBase/color-base.service';

@Component({
  selector: 'app-colors-base',
  templateUrl: './colors-base.component.html',
  styleUrls: ['./colors-base.component.css']
})
export class ColorsBaseComponent implements OnInit {

  @Output() selectedColorName = new EventEmitter<{ selected: boolean, data: string }>();

  currentPosition: number = 0
  endPosition: number = 0

  colorsToShow: string[] = []
  getcolorsMaximumLimit: number = 100

  colorsSelected: string = ""
  dataReady: boolean = false

  constructor(private colorsBaseService: ColorBaseService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.currentPosition = this.endPosition
    this.endPosition = this.currentPosition + this.getcolorsMaximumLimit;
    this.colorsToShow = this.colorsBaseService.getColorsWithLimit(this.currentPosition, this.endPosition);
    console.log(this.colorsToShow);
  }

  selectedColor(item: string) {
    this.colorsSelected = item;
    this.selectedColorName.emit({ selected: true, data: this.colorsSelected });
  }


}
