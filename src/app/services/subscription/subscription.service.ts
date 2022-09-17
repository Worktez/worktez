import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { SubscriptionData } from 'src/app/Interface/SubscriptionInterface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscriptionPackage: SubscriptionData

  constructor(public functions: AngularFireFunctions) { }

  getSubscriptionDetails(appKey: string){
    const callable = this.functions.httpsCallable('subscriptions/getSubscriptionDetails');
    callable({OrgAppKey: appKey}).subscribe({
      next: (result) => {
        console.log(result);
        this.subscriptionPackage = result["resultData"];
        return this.subscriptionPackage;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    })
  }
  
}
