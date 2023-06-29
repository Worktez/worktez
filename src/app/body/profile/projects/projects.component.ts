import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyProjectData } from 'src/app/Interface/UserInterface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Output() editProjectDetails = new EventEmitter<{ completed: boolean, mode: string, projectId: number }>();
  @Input('projects') projects: MyProjectData[];
  @Input('sameUser') sameUser: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  dateConverter(date: string){
    const newDate = new Date(date)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[newDate.getMonth()] + " " + newDate.getFullYear()
}
  editProject(mode: string, projectId: number) {
    this.editProjectDetails.emit({ completed: true, mode: mode, projectId: projectId  });
  }

}
