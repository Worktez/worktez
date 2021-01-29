import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AuthService } from 'src/app/services/auth.service';
import {Location} from '@angular/common';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  componentName: string = ""

  sprintName: string
  Id: string
  logWorkEnabled: boolean = false
  editTaskEnabled: boolean = false
  userLoggedIn: boolean = false
  task: Tasks
  public taskDocument: AngularFirestoreDocument<Tasks>
  public taskDataObservable: Observable<Tasks>

  constructor(private route: ActivatedRoute, public db: AngularFirestore, private router: Router, private functions: AngularFireFunctions, public authService: AuthService, private location: Location, private navbarHandler: NavbarHandlerService) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.params['taskId'];

    this.componentName = this.Id;
    this.navbarHandler.addToNavbar(this.componentName);

    this.getTaskDetail();
  }

  getTaskDetail() {
    var documentName = 'Tasks/' + this.Id;
    this.taskDocument = this.db.doc<Tasks>(documentName);
    this.taskDataObservable = this.taskDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as Tasks;
        this.task = data;

        return { ...data }
      }));
  }

  logWorkPage() {
    this.logWorkEnabled = true;
  }

  editTask() {
    this.editTaskEnabled = true;
  }

  logWorkCompleted(data: { completed: boolean }) {
    this.logWorkEnabled = false;
  }

  editTaskCompleted(data: { completed: boolean }) {
    this.editTaskEnabled = false;
  }

  async deleteTask() {
    const callable = this.functions.httpsCallable('deleteTask');

    try {
      const result = await callable({ Id: this.task.Id, SprintNumber: this.task.SprintNumber, Category: this.task.Category, Status: this.task.Status }).toPromise();
      console.log(this.task.Id + " deleted");
      console.log(result);
      this.router.navigate(['/']);
    } catch (error) {
      console.log("Error", error);
    }
  }

  backToTasks(){
    this.navbarHandler.removeFromNavbar();
    this.location.back()
  }

}
