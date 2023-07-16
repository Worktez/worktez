import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataCheck, MonthInfo } from 'src/app/Interface/CalenderInterface';
import { Milestones } from 'src/app/Interface/MilestoneInterface';

@Component({
  selector: 'app-h-calender',
  templateUrl: './h-calender.component.html',
  styleUrls: ['./h-calender.component.css']
})
export class HCalenderComponent {

  calender:Map<number, MonthInfo> = new Map();
  data:Map<string, Map<number, DataCheck>> = new Map();
  completedData:Map<string, Map<number, DataCheck>> = new Map();

  @ViewChild('tableContainer', { read: ElementRef }) public tableContainer: ElementRef<any>;

  @Input('milestoneData') milestoneData: Milestones[];

  dataReady: boolean = false;

  prevKey: number = 0;
  futureKey: number = 0;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.generateCalender();
    this.fixData();
    this.createDataArray();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.scrollRight();
  }

  createDataArray() {
    this.milestoneData.forEach(element => {
      let sda = element.StartDate.split("-");
      let eda = element.EndDate.split("-");
      
      let st = sda[2]+"-"+sda[3]+"-"+"1";
      let et = eda[0]+"-"+eda[1]+"-"+"28";

      let startDateMili = new Date(st).getTime();
      let endDateMili = new Date(et).getTime();

      let color = "#" + element.ColorCode;
      let calData: Map<number, DataCheck> = new Map();

      let title = element.Title.trim();
      this.calender.forEach((value, key) => {
        let check = true;
        let currentDateMillisec = value.year + "-" + value.month + "-" + "1";

        let calTimeMili = new Date(currentDateMillisec).getTime();

        if(startDateMili<=calTimeMili && calTimeMili<endDateMili)
          check = true;
        else
          check = false;

        calData.set(key, {check: check,
          days: value.days,
          displayName: value.displayName,
          month: value.month,
          name: value.name,
          year: value.year,
          color: color});
      });
      if(element.MilestoneStatus != 'Completed') {
        this.data.set(title, calData);
      } else {
        this.completedData.set(title, calData);
      }
    });

    this.dataReady=true;
  }

  fixData() {
    this.milestoneData.forEach(element => {
      let slashStartDate = element.StartDate.indexOf("/");
      if(slashStartDate) {
        let arr = element.StartDate.split("/");
        element.StartDate = arr[2]+"-"+arr[1]+"-"+arr[0];
      }
    });
  }

  generateCalender() {
    let date = new Date();
    
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let monthBuffer = 6;

    let nod = this.daysInMonth(month, year);
    let displayName = this.getMonthName(month);
    let name = this.getMonthName(month);
    let focusKey = 0;
    this.calender.set(focusKey, {days: nod, displayName: displayName, name: name, month: month, year: year});


    // Get past calender
    this.getPastCalender(monthBuffer, month, year);

    // Get future calender
    this.getFutureCalender(monthBuffer, month, year)

    this.calender = new Map([...this.calender].sort());
  }

  getFutureCalender(monthBuffer: number, month: number, year: number) {
    while(monthBuffer) {
      month++;
      if(month==13) {
        month -= 12;
        year++;
      }

      let nod = this.daysInMonth(month, year);
      let displayName = this.getMonthName(month);
      let name = this.getMonthName(month);

      this.futureKey++;
      let focusKey = 1*this.futureKey;
      this.calender.set(focusKey, {days: nod, displayName: displayName, name: name, month: month, year: year});
      monthBuffer--;
    }
  }

  getPastCalender(monthBuffer: number, month: number, year: number) {
    while(monthBuffer) {
      month--;
      if(month==0) {
        month += 12;
        year--;
      }

      let nod = this.daysInMonth(month, year);
      let displayName = this.getMonthName(month);
      let name = this.getMonthName(month);

      this.prevKey++;
      let focusKey = -1*this.prevKey;
      this.calender.set(focusKey, {days: nod, displayName: displayName, name: name, month: month, year: year});
      monthBuffer--;
    }
  }

  daysInMonth (month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  getMonthName(month: number) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month-1];
  }

  scrollLeft() {
    this.tableContainer.nativeElement.scrollTo({ left: (this.tableContainer.nativeElement.scrollLeft - 800), block: "start", inline: "nearest" });
  }

  scrollRight() {
    this.tableContainer.nativeElement.scrollTo({ left: (this.tableContainer.nativeElement.scrollLeft + 1000), block: "start", inline: "nearest" });
  }
}
