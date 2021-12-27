import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAppSetting } from 'src/app/Interface/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public photoUrlObservable: Observable<string[]>

  constructor(private functions: AngularFireFunctions) { }

  async getUserData (email) {
    const callable = this.functions.httpsCallable("users/getUserByEmail");
    try {
      const result =  await callable({Email: email }).toPromise();
      return result.userData as UserAppSetting;
    } catch(error) {
      console.log(error);
    }
  }

  getPhotoList(emailList: string[]) {
    const callable = this.functions.httpsCallable("users/getPhotoURLList");
    this.photoUrlObservable = callable({Email: emailList}).pipe(map(res => {
        return res.data as string[];
    }));  
  }
}
