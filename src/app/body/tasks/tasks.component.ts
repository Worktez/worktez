import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { TeamDataId } from 'src/app/Interface/TeamInterface';

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
  tasksCollection: AngularFirestoreCollectionGroup<Tasks>
  tasksData: Observable<TasksId[]>

  filterAssignee: string
  filterPriority: string
  filterDifficulty: string
  filterStatus: string
  filterProject: string
  filterSprintNumber: number;
  showFilter: boolean = false
  teamData: TeamDataId[] = [];
  
  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, public navbarHandler: NavbarHandlerService, public authService: AuthService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.currentSprintName = this.route.snapshot.params['currentSprintName'];

    this.navbarHandler.addToNavbar(this.teamId);

    if (this.currentSprintName == "Backlog") {
      this.currentSprintNumber = -1;
    } else if (this.currentSprintName == "Deleted") {
      this.currentSprintNumber = -2;
    } else {
      this.currentSprintNumber = parseInt(this.currentSprintName.slice(1));
    }

    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.AppKey) {
          this.readData();
        }
      });
    });
  }

  readData() {
    this.tasksCollection = this.db.collectionGroup<Tasks>("Tasks", ref => {
      let queryRef = ref;
      queryRef = queryRef.where('SprintNumber', '==', this.currentSprintNumber);
      if (this.filterProject) {
        queryRef = queryRef.where("Project", "==", this.filterProject);
      }
      else {
        queryRef = queryRef.where("TeamId", "==", this.teamId);
      }

      if (this.filterAssignee) {
        queryRef = queryRef.where("Assignee", "==", this.filterAssignee);
      }
      if (this.filterPriority) {
        queryRef = queryRef.where("Priority", "==", this.filterPriority);
      }
      if (this.filterStatus) {
        queryRef = queryRef.where("Status", "==", this.filterStatus);
      }
      if (this.filterDifficulty) {
        queryRef = queryRef.where("Difficulty", "==", this.filterDifficulty);
      }
      return queryRef;
    });
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  backToDashboard() {
    this.router.navigate(['/Board']);
  }

  changeSprint(newSprintNumber: number) {
    if (newSprintNumber == 0) {
      this.applicationSettingsService.getTeamDetails(this.teamId).subscribe(teams => {
        this.teamData = teams;
        newSprintNumber = this.teamData[0].CurrentSprintId;
        this.currentSprintName = this.fullSprintName(newSprintNumber);
        this.router.navigate(['Tasks/', this.teamId, this.currentSprintName]);
        this.readData();
      });
    } else {
      this.currentSprintNumber = newSprintNumber;
      this.currentSprintName = this.fullSprintName(newSprintNumber);
      this.router.navigate(['Tasks/', this.teamId, this.currentSprintName]);
      this.readData();
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
    this.readData();
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
