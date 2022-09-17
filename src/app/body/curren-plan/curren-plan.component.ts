import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NativeWindowService } from 'src/app/services/native-window.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-curren-plan',
  templateUrl: './curren-plan.component.html',
  styleUrls: ['./curren-plan.component.css']
})
export class CurrenPlanComponent implements OnInit {
  rzp1;
  paymentComplete: boolean = false;
  showLoader: boolean = true;
  subscriptionId: string;

  constructor(private authService: AuthService, private zone: NgZone, public router: Router, public nativeWindowServive: NativeWindowService, public functions: AngularFireFunctions, public startService: StartServiceService, private backendService: BackendService, private subscriptionService: SubscriptionService ) { }

  ngOnInit(): void {
  }

  public options: any = {
    key:'',
    name: 'Worktez',
    description: 'Add Subscription',
    image: "https://worktez.com/assets/logo.png",
    order_id: "",
    amount: 100,
    prefill: {
      name: '',  //add your names
      contact: '', //add your contact
      email: '', //add your emailId
    },
    notes: {},
    theme: {

    },
    handler: (res: any) => {
      const paymentId = res.razorpay_payment_id;
      const orderId = res.razorpay_order_id;
      const signature = res.razorpay_signature;
      this.zone.run(() => {
        console.log("paymentId",paymentId);
        console.log("orderId",orderId);
        console.log("signature",signature);
        this.router.navigate(["paymentStatus", this.subscriptionId]);
      })
    },
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          //route to current plan page if payment fails
          console.log("sign");
          this.router.navigate(['/CurrentPlan']);
        })
      }),
    }
  }

  pay(){
    this.rzp1 = new this.nativeWindowServive.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

  upgradeSubscriptionToStandard(){
    const subscriptionId = this.subscriptionService.subscriptionPackage.SubscriptionId;
    const uid = this.startService.uid;
    console.log( uid, subscriptionId)
    const userName = this.authService.userAppSetting.Username;
    const callable = this.functions.httpsCallable('subscriptions/upgradeSubscriptionsToStandard');
    callable({Uid: uid, SubscriptionId: subscriptionId,
    UserName: userName}).subscribe({
      next: (data) => {
        this.pay();
      },
      error: (error) => {
        console.log(error);
      },
      complete:  () => {

      }
    })
  }

  // setOrderWithRazorpay() {
  //   const subscriptionId = this.subscriptionService.subscriptionPackage.SubscriptionId;
  //   console.log(subscriptionId); 
  //   const uid = this.startService.uid;
  //   const userName = this.authService.userAppSetting.Username;
  //   const orgDomain = this.backendService.getOrganizationDomain();
  //   const callable = this.functions.httpsCallable('payment/generateRazorpayOrder');
  //   callable({OrgDomain: orgDomain,Uid: uid, Amount: "49", UserName: userName, SubscriptionId: subscriptionId}).subscribe({
  //     next: (result) => {
  //       console.log(result);
  //       this.options.order_id = result.id;
  //       this.options.amount = result.amount;
  //       this.options.key = result.key;
  //       this.options.prefill.name = this.authService.userAppSetting.Username;
  //       this.options.prefill.email = this.authService.user.email;
  //       this.options.prefill.contact = this.authService.user.phoneNumber;
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //     complete: () => {
  //       this.pay();
  //     }
  //   })

  //   }

}
