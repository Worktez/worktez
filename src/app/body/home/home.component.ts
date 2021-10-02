import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public useEmulator = environment.useEmulators;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe((data)=>{
      if(data!=null){
      this.authService.userAppSettingObservable.subscribe((data)=> {
        if(data.SelectedOrgAppKey){
          // if(this.router.url === '/') {
            this.router.navigate(['/MyDashboard']);
          // }
        }
      });
    }
    });
  }
}
