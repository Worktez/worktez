import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { MyProjectData } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {

  @Input('uid') uid: string;
  @Input('displayName') displayName: string;
  @Input('email') email: string;
  @Input('projectModalData') projectModalData: MyProjectData;
  @Input('projectModalMode') projectModalMode: string;

  enableLoader: boolean = false
  showClose: boolean = false

  startDate: string
  endDate: string
  projectName: string
  description: string
  
  @Output() editProjectCompleted = new EventEmitter<{ completed: boolean }>();

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    // this.todayDate = this.toolsService.date();
    if (this.projectModalMode == "edit") {
      console.log(this.projectModalData);
      this.projectName = this.projectModalData.ProjectName;
      this.description = this.projectModalData.Description;
      this.startDate = this.projectModalData.Start
      this.endDate = this.projectModalData.End
    }
  }

  async addProject() {
    this.enableLoader = true
    if(this.endDate == undefined){
      this.endDate = "Present";
    }
    const callable = this.functions.httpsCallable('users');
    try {
      await callable({ mode: "addProject", Uid: this.uid, DisplayName: this.displayName, Email: this.email, ProjectName: this.projectName, Description: this.description, Start: this.startDate, End: this.endDate }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
    }
  }
  
  async updateProject() {
    if(this.endDate == undefined || this.endDate == ""){
      this.endDate = "Present";
    }
    this.enableLoader = true
    console.log("Edit");
    const callable = this.functions.httpsCallable('users');
    try {
      await callable({ mode: "updateProject", Uid: this.uid, DisplayName: this.displayName, Email: this.email, ProjectName: this.projectName, Description: this.description, Start: this.startDate, End: this.endDate, ProjectId: this.projectModalData.ProjectId }).toPromise();
      console.log("Successful");
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
    }
  }

  editProjectDone() {
    this.editProjectCompleted.emit({ completed: true });
  }
}
