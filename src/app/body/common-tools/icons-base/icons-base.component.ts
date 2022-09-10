import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconsBaseService } from 'src/app/services/iconsBase/icons-base.service';

@Component({
  selector: 'app-icons-base',
  templateUrl: './icons-base.component.html',
  styleUrls: ['./icons-base.component.css']
})
export class IconsBaseComponent implements OnInit {

  @Output() selectedIconName = new EventEmitter<{ selected: boolean, data: string }>();

  currentPosition: number = 0
  endPosition: number = 0

  iconsToShow: string[] = []
  getIconsMaximumLimit: number = 100

  iconsSelected: string = ""
  dataReady: boolean = false

  constructor(public iconsBaseService: IconsBaseService) { }

  ngOnInit(): void {
    this.getIcons();
  }

  getIcons() {
    this.currentPosition = this.endPosition
    this.endPosition = this.currentPosition + this.getIconsMaximumLimit;
    this.iconsToShow = this.iconsBaseService.getIconsWithLimit(this.currentPosition, this.endPosition);
  }

  selectedIcon(item: string) {
    this.iconsSelected = item;
    this.selectedIconName.emit({ selected: true, data: this.iconsSelected });
  }

}
