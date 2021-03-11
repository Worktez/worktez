import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { Router } from '@angular/router';
import firebase from "firebase/app";
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  componentName: string = "TASKS"

  currentSprintName: string
  category: string
  currentSprintNumber: number
  searchAssignee: string = ""
  tasksCollection: AngularFirestoreCollection<Tasks>
  tasksData: Observable<TasksId[]>

  filterAssignee: string
  filterPriority: string
  filterDifficulty: string
  filterStatus: string
  filterCategory: string
  showFilter: boolean = false
  constructor(private route: ActivatedRoute, private router: Router, private db: AngularFirestore, public navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {

    this.category = this.route.snapshot.params['category'];
    this.currentSprintName = this.route.snapshot.params['currentSprintName'];

    this.navbarHandler.addToNavbar(this.category);

    if (this.currentSprintName == "Backlog") {
      this.currentSprintNumber = -1;
    } else if (this.currentSprintName == "Deleted") {
      this.currentSprintNumber = -2;
    } else {
      this.currentSprintNumber = parseInt(this.currentSprintName.slice(1));
    }
    this.readData();
  }

  readData() {
    this.tasksCollection = this.db.collection<Tasks>("Tasks", ref => {
      let queryRef: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      queryRef = queryRef.where('SprintNumber', '==', this.currentSprintNumber);
      if (this.filterCategory) {
        queryRef = queryRef.where("Category", "==", this.filterCategory);
      }
      else {
        queryRef = queryRef.where("Category", "==", this.category);
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

  showFilterOptions() {
    this.showFilter = !this.showFilter
  }

  applyFilters(data: { Assignee: string, Priority: string, Difficulty: string, Status: string, Category: string }) {
    this.filterAssignee = data.Assignee
    this.filterPriority = data.Priority
    this.filterDifficulty = data.Difficulty
    this.filterStatus = data.Status
    this.filterCategory = data.Category
    this.readData();
  }
}
