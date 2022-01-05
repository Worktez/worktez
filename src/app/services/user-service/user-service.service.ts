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

  public users: UserAppSetting[]
  public emails: string[] = []

  constructor(private functions: AngularFireFunctions) { }

  getUserData (email) {
    const newArray = this.users.filter((data)=>{
      if(data.email == email) {
        return data
      }
    });
    if(newArray.length) {
      return newArray[0];
    }
  }

  fetchUserData() {
    const callable = this.functions.httpsCallable("users/getUserByEmail");
    this.usersObservable =  callable({Email: this.emails }).pipe(map(res=>{
      const data = res.userData as UserAppSetting[];
      this.users = data;
      return data
    }));
    return this.usersObservable;
  }

  getPhotoList(emailList: string[]) {
    const callable = this.functions.httpsCallable("users/getPhotoURLList");
    this.photoUrlObservable = callable({Email: emailList}).pipe(map(res => {
        return res.data as string[];
    }));  
  }
}
