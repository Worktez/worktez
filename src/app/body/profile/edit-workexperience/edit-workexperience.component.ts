import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { MyEducationData, MyExperienceData } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-edit-workexperience',
  templateUrl: './edit-workexperience.component.html',
  styleUrls: ['./edit-workexperience.component.css']
})
export class EditWorkexperienceComponent implements OnInit {

  @Input('uid') uid: string;
  @Input('displayName') displayName: string;
  @Input('email') email: string;
  @Input('workModalData') workModalData: MyExperienceData;
  @Input('workModalMode') workModalMode: string;

  enableLoader: boolean = false
  showClose: boolean = false
  organizationName: string
  position: string
  startDate: string
  endDate: string
  todayDate: string

  @Output() editWorkCompleted = new EventEmitter<{ completed: boolean }>();

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    // this.todayDate = this.toolsService.date();
    if (this.workModalMode == "edit") {
      console.log(this.workModalData);
      this.organizationName = this.workModalData.OrganizationName;
      this.position = this.workModalData.Position;
      this.startDate = this.workModalData.Start
      this.endDate = this.workModalData.End
    }
  }

  async addWork() {
    this.enableLoader = true
    if(this.endDate == undefined){
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users/addExperience');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, OrganizationName: this.organizationName, Position: this.position, Start: this.startDate, End: this.endDate }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
    }
  }
  
  async updateWork() {
    if(this.endDate == undefined || this.endDate == ""){
      this.endDate = "Present";
    }
    this.enableLoader = true
    console.log("Edit");
    const callable = this.functions.httpsCallable('users/updateExperience');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, OrganizationName: this.organizationName, Position: this.position, Start: this.startDate, End: this.endDate, ExperienceId: this.workModalData.ExperienceId }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
    }
  }

  editWorkDone() {
    this.editWorkCompleted.emit({ completed: true });
  }
}
