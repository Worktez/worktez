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
  public newEmails: string[] = []
  userReady: boolean = false

  public newUids: string[] = []

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
        console.log("User Not Found Loading empty User")
        // this.userReady = false;
        return newArray[0]
      }
    } else {
      this.userReady = false;
      return undefined
    }
  }

  checkAndAddToUsersUsingEmail(email) {
    if(this.newEmails.indexOf(email) == -1) {
      const checkUser = this.users.filter((obj) => {
        return (obj.email == email)
      });

      if(checkUser.length <= 0) {
        this.newEmails.push(email);
        this.userReady = false;
      }
    }
  }

  checkAndAddToUsersUsingUid(Uid) {
    if(this.newUids.indexOf(Uid) == -1) {
      const checkUser = this.users.filter((obj) => {
        return (obj.uid == Uid)
      });

      if(checkUser.length <= 0) {
        this.newUids.push(Uid);
        this.userReady = false;
      }
    }
  }

  fetchUserData() {
    if(!this.userReady) {
      const callable = this.functions.httpsCallable("users/getUserByEmail");
      this.usersObservable =  callable({Email: this.newEmails }).pipe(map(res=>{
        const data = res.userData as UserAppSetting[];
        if(this.users.length == 0) {
          this.users = data
        } else {
          this.users.concat(data)
        }
        this.newEmails = []
        this.userReady = true
        return data
      }));
    }
    return this.usersObservable;
  }

  fetchUserDataUsingUID() {
    if(!this.userReady) {
      const callable = this.functions.httpsCallable("users/getUserByUid");
      this.usersObservable =  callable({Uid: this.newUids }).pipe(map(res=>{
        const data = res.userData as UserAppSetting[];
        if(this.users.length == 0) {
          this.users = data
        } else {
          this.users.concat(data)
        }
        this.newUids = []
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
