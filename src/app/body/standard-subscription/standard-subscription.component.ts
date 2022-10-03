import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { type } from 'os';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { NativeWindowService } from 'src/app/services/native-window.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';

@Component({
  selector: 'app-standard-subscription',
  templateUrl: './standard-subscription.component.html',
  styleUrls: ['./standard-subscription.component.css']
})
export class StandardSubscriptionComponent implements OnInit {

  constructor(private authService: AuthService, private zone: NgZone, public router: Router, public nativeWindowServive: NativeWindowService, public functions: AngularFireFunctions, public startService: StartServiceService, private backendService: BackendService, public subscriptionService: SubscriptionService) { }

  subscriptionId;
  rzp1;
  paymentDone = false;
  paymentStatus = "Failed";
  rzpPaymentId;
  paymentId;
  orderId;
  signature;
  ngOnInit(): void {
  }

  public options: any = {
    key: '',
    name: 'Worktez',
    description: 'Add Subscription',
    image: "https://worktez.com/assets/logo.png",
    order_id: "",
    amount: 0,
    prefill: {
      name: '',  //add your names
      contact: '', //add your contact
      email: '', //add your emailId
    },
    notes: {},
    theme: {

    },
    handler: (res: any) => {
      console.log(res);
      
      this.rzpPaymentId = res.razorpay_payment_id;
      this.orderId = res.razorpay_order_id;
      this.signature = res.razorpay_signature;
      this.zone.run(() => {
        this.subscriptionId = this.subscriptionService.subscriptionPackage.SubscriptionId;
        console.log(this.subscriptionId);

        // this.router.navigate(["PaymentStatus", orderId, rzpPaymentId, signature, this.subscriptionId]);
        this.verifyPayment();
      })
    },
    modal: {
      ondismiss: (() => {
        this.zone.run(() => {
          //route to current plan page if payment fails
          console.log("sign");
          this.router.navigate(['/Standard']);
          this.paymentStatus = "Failed";
        })
      }),
    }
  }

  pay() {
    this.rzp1 = new this.nativeWindowServive.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }


  setOrderWithRazorpay() {
    this.paymentStatus = "Waiting";
    const subscriptionId = this.subscriptionService.subscriptionPackage.SubscriptionId;
    console.log(subscriptionId);
    const uid = this.startService.uid;
    const userName = this.authService.userAppSetting.Username;
    const orgDomain = this.backendService.getOrganizationDomain();
    const callable = this.functions.httpsCallable('payment/generateRazorpayOrder');
    callable({ OrgDomain: orgDomain, Uid: uid, UserName: userName, SubscriptionId: subscriptionId }).subscribe({
      next: (result) => {
        console.log(result);
        this.paymentId = result.paymentId;
        this.options.order_id = result.id;
        this.options.amount = result.amount;
        this.options.key = result.key;
        this.options.prefill.name = this.authService.userAppSetting.displayName;
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

  
  verifyPayment(){
    console.log(this.rzpPaymentId)
    const callable = this.functions.httpsCallable("payment/paymentVerification");
    callable({OrderId: this.orderId, PaymentId:this.rzpPaymentId, Signature: this.signature, Id: this.subscriptionId, Type: "StandardUpgrade", PId: this.paymentId}).subscribe({
      next: (data) => {
        this.paymentStatus = "Complete";
        console.log("PaymentStatus", this.paymentStatus);
      },
      error: (error) => {
        this.paymentStatus = "Failed";
        console.log(error);
        console.log("PaymentStatus", this.paymentStatus);
      },
      complete: () => {
        console.log("PaymentSuccessfull");
      }
    })
  }
}
