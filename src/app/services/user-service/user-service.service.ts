import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserAppSetting } from 'src/app/Interface/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public photoUrlObservable: Observable<string[]>
  public usersObservable: Observable<UserAppSetting[]>

  public users: UserAppSetting[] = []
  public emails: string[] = []
  userReady: boolean = false

  constructor(private functions: AngularFireFunctions) { }

  getUserData (email) {
    if(this.users.length) {
      const newArray = this.users.filter((data)=>{
        if(data.email == email) {
          return data
        }
      });
      if(newArray.length) {
        return newArray[0];
      } else {
        this.userReady = false;
      }
    } else {
      this.userReady = false;
    }
  }

  fetchUserData() {
    if(!this.userReady) {
      const callable = this.functions.httpsCallable("users/getUserByEmail");
      this.usersObservable =  callable({Email: this.emails }).pipe(map(res=>{
        const data = res.userData as UserAppSetting[];
        this.users = data;
        this.userReady = true
        return data
      }));
    }
    return this.usersObservable;
  }

  getPhotoList(emailList: string[]) {
    const callable = this.functions.httpsCallable("users/getPhotoURLList");
    this.photoUrlObservable = callable({Email: emailList}).pipe(map(res => {
        return res.data as string[];
    }));
  }
}
