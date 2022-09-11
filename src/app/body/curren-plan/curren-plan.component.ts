import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NativeWindowService } from 'src/app/services/native-window.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

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

  constructor(private authService: AuthService, private zone: NgZone, public router: Router, public nativeWindowServive: NativeWindowService, public functions: AngularFireFunctions, public startService: StartServiceService) { }

  ngOnInit(): void {
  }

  public options: any = {
    key:'rzp_live_rSjMAYRWbLGMBk',
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
        console.log(paymentId);
        console.log(orderId);
        console.log(signature);
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

  getSubscriptionId(){
    const uid = this.startService.uid;
    console.log(uid);
    const callable = this.functions.httpsCallable('subscriptions/createSubscriptionId');
    callable({Uid: uid}).subscribe({
      next: (result) => {
        this.subscriptionId = result.data;
        console.log(result.data);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.setOrderWithRazorpay();
      }
    })
  }

  pay(){
    this.rzp1 = new this.nativeWindowServive.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }

  setOrderWithRazorpay() {
   console.log(this.subscriptionId);
   const uid = this.startService.uid;
   const userName = this.authService.userAppSetting.Username;
   console.log(uid, userName);
   const callable = this.functions.httpsCallable('payment/razorpayPayment');
   callable({SubscriptionId:this.subscriptionId, Uid: uid, Amount: "49", UserName: userName}).subscribe({
     next: (result) => {
      console.log(result);
      this.options.order_id = result.id;
      this.options.amount = result.amount;
      this.options.key = result.key;
      this.options.prefill.name = this.authService.userAppSetting.Username;
      this.options.prefill.email = this.authService.user.email;
      this.options.prefill.contact = this.authService.user.phoneNumber;
     },
     error: (error) => {
      console.log(error);
     },
     complete: () => {
       this.pay();
     }
   })

  }

}
