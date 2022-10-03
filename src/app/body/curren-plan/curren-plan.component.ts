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

  constructor(private authService: AuthService, private zone: NgZone, public router: Router, public nativeWindowServive: NativeWindowService, public functions: AngularFireFunctions, public startService: StartServiceService, private backendService: BackendService, public subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
  }



  
}
