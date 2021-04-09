import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { error } from 'console';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/Interface/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class PeopleSuggestionService {
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>

  constructor (private db: AngularFirestore){ }
  readData(){
    this.userCollection = this.db.collection<User>('Users');
    this.users = this.userCollection.snapshotChanges().pipe(
    map(actions => actions.map(a =>{
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return {id, ...data};
    }))
  );
  }
  getData(){
  this.readData();
  return this.users;
  }
}
