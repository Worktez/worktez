import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Tasks, TasksId } from 'src/app/Interface/TasksInterface';
import { User } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashBoardComponent implements OnInit {
  user: User
  displayName: string
  
  tasksCollection: AngularFirestoreCollection<Tasks>
  tasksData: Observable<TasksId[]>
  userObservable: Observable<User>

  constructor(public router: Router, private db: AngularFirestore,public authService: AuthService) { }

  ngOnInit(): void {   
    this.readUser();
  }

  readUser(){
    this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data;
      if(data == null){
        this.router.navigate(['/Board']);
      }
      this.displayName = data.displayName;
      this.readTaskData(this.displayName);
      return { ...data }
    }));
  }

  readTaskData(displayName:string) {
    console.log(displayName)
    this.tasksCollection = this.db.collection<Tasks>("Tasks", ref=>ref.where('Assignee', '==', displayName));
    this.tasksData = this.tasksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
