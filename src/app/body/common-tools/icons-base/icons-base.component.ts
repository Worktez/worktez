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
  currentScrollPos: number = 0;

  constructor(public iconsBaseService: IconsBaseService) { }

  ngOnInit(): void {
    this.getIcons("down");
    window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }
   
  scrollEvent = (event): void => {
    let scrollPos = event.target.scrollTop;
    if(scrollPos >= this.currentScrollPos+700) {
      // down
      this.currentScrollPos = scrollPos;
      this.getIcons("down");
    }
  }

  getIcons(pos:string) {
    if(pos == "down") {
      this.currentPosition = this.endPosition
      this.endPosition = this.endPosition + this.getIconsMaximumLimit;
    } 
    const iconData = this.iconsBaseService.getIconsWithLimit(this.currentPosition, this.endPosition);
    this.iconsToShow = this.iconsToShow.concat(iconData);
  }

  selectedIcon(item: string) {
    this.iconsSelected = item;
    this.selectedIconName.emit({ selected: true, data: this.iconsSelected });
  }

}
