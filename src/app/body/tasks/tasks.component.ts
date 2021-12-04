import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { Team } from 'src/app/Interface/TeamInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { DataTableService } from 'src/app/services/dataTable/data-table.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  componentName: string = "TASKS"

  currentSprintName: string
  teamId: string
  currentSprintNumber: number
  searchAssignee: string = ""
  tasksData: Tasks[]

  filterAssignee: string = ""
  filterPriority: string = ""
  filterDifficulty: string = ""
  filterStatus: string = ""
  filterProject: string = ""
  filterSprintNumber: number;
  showFilter: boolean = false
  teamData: Team;
  parentComponent: string = "Tasks"

  displayColoumns: string[] = []
  showLoader: boolean = true;

  constructor(public dataTableService: DataTableService, private route: ActivatedRoute, private router: Router, public navbarHandler: NavbarHandlerService, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService,  public backendService: BackendService) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.currentSprintName = this.route.snapshot.params['currentSprintName'];

    this.navbarHandler.addToNavbar(this.teamId);

    if (this.currentSprintName == "S-1") {
      this.currentSprintNumber = -1;
    } else if (this.currentSprintName == "S-2") {
      this.currentSprintNumber = -2;
    } else {
      this.currentSprintNumber = parseInt(this.currentSprintName.slice(1));
    }

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {
          this.backendService.organizationsData.subscribe(data => {
            this.showLoader = true
            this.dataTableService.readAllTaskData(this.teamId, this.currentSprintNumber, this.filterAssignee, this.filterPriority, this.filterDifficulty, this.filterStatus, this.filterProject).subscribe((data) =>{
              if(data.length) {
                this.tasksData = data;
                this.displayColoumns = ['Priority', 'Id', 'Title', 'Assignee', 'Status', 'Difficulty', 'WorkDone'];
                this.showLoader = false;
              }
            });
          });
        }
      });
    });
  }

  backToDashboard() {
    this.router.navigate(['/Board']);
  }

  changeSprint(newSprintNumber: number) {
    if (newSprintNumber == 0) {
      this.applicationSettingsService.getTeamDetails(this.teamId).subscribe(teams => {
        this.teamData = teams;
        newSprintNumber = this.teamData.CurrentSprintId;
        this.currentSprintName = this.fullSprintName(newSprintNumber);
        this.router.navigate(['Tasks/', this.teamId, this.currentSprintName]);
        this.dataTableService.readAllTaskData(this.teamId, this.currentSprintNumber, this.filterAssignee, this.filterPriority, this.filterDifficulty, this.filterStatus, this.filterProject).subscribe((data) =>{
          if(data.length) {
            this.tasksData = data;
            this.showLoader = false;
          }
        });
      });
    } else {
      this.currentSprintNumber = newSprintNumber;
      this.currentSprintName = this.fullSprintName(newSprintNumber);
      this.router.navigate(['Tasks/', this.teamId, this.currentSprintName]);
      this.dataTableService.readAllTaskData(this.teamId, this.currentSprintNumber, this.filterAssignee, this.filterPriority, this.filterDifficulty, this.filterStatus, this.filterProject).subscribe((data) =>{
        if(data.length) {
          this.tasksData = data;
          this.showLoader = false;
        }
      });
    }
  }

  showFilterOptions() {
    this.showFilter = !this.showFilter
  }

  applyFilters(data: { Assignee: string, Priority: string, Difficulty: string, Status: string, Project: string }) {
    this.filterAssignee = data.Assignee
    this.filterPriority = data.Priority
    this.filterDifficulty = data.Difficulty
    this.filterStatus = data.Status
    this.filterProject = data.Project
    this.dataTableService.readAllTaskData(this.teamId, this.currentSprintNumber, this.filterAssignee, this.filterPriority, this.filterDifficulty, this.filterStatus, this.filterProject).subscribe((data) =>{
      if(data.length) {
        this.tasksData = data;
        this.showLoader = false;
      }
    });
  }

  openTaskDetails(id: string) {
    this.router.navigate(['/TaskDetails', id]);
  }

  fullSprintName(sprintNumber: number) {
    if (sprintNumber == -1) {
      return "S" + sprintNumber
    } else if (sprintNumber == -2) {
      return "S" + sprintNumber
    } else {
      return "S" + sprintNumber
    }
  }

}
