import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/Interface/ActivityInterface';
import { User, UserAppSetting} from "../../../Interface/UserInterface";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input('activity') activity: Activity

  public userObservable: Observable<UserAppSetting>;
  public userDocument: AngularFirestoreDocument<UserAppSetting>;

  user: UserAppSetting;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    console.log(this.activity.Uid);
    this.getUserDetail();
  }

  getUserDetail() {
    var documentName = "Users/"+this.activity.Uid;
    this.userDocument = this.db.doc<UserAppSetting>(documentName);
    this.userObservable = this.userDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as UserAppSetting;
        this.user = data;
        console.log(data);
        return { ...data }
      }));

  }
}

