import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {
  user: User
  displayName: string
  
  tasksCollection: AngularFirestoreCollection<Tasks>
  tasksData: Observable<TasksId[]>
  userObservable: Observable<User>
  // constructor(public authService: AuthService, public router: Router) { }

  
  

  constructor(private route: ActivatedRoute,public router: Router, private db: AngularFirestore,public authService: AuthService) { }

  ngOnInit(): void {
    
      this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data
      return { ...data }
    }));

    this.displayName = this.user.displayName.toLowerCase();
    this.readTaskData();

    
  }

  readTaskData() {
    
    this.tasksCollection = this.db.collection<Tasks>("Tasks", ref=>ref.where('Assignee', '==', this.displayName));
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  backToDashboard(){
    this.router.navigate(['/']);
  }
}
