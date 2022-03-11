import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team} from '../../Interface/TeamInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map, Observable } from 'rxjs';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common';
import { StartServiceService } from 'src/app/services/start/start-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  componentName: string = "TEAM-DETAILS"
  teamId: string;
  team: Team;
  teamDataReady: boolean=false;
  childStep: number = 1
  teamName: string;
  teamDescription: string = "";
  teamManagerEmail: string;
  teamMembers: string[] = [];
  router: any;

  constructor(private route: ActivatedRoute ,public navbarHandler: NavbarHandlerService,private functions: AngularFireFunctions, private backendService: BackendService,private startService: StartServiceService, private userService: UserServiceService, private validationService: ValidationService, private location: Location) { }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params['teamId'];
    this.navbarHandler.addToNavbar(this.teamId);
    if(this.startService.showTeams) {
      this.getTeamDetails(this.teamId);
    } else {
      this.startService.userDataStateObservable.subscribe((data) => {
        if(data){
          this.getTeamDetails(this.teamId);
        }
      });
    }
  }

  getTeamDetails(teamId: string) {
      this.teamDataReady=false;
      const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
      const callable = this.functions.httpsCallable("teams/getTeamData");
      callable({TeamId: teamId, OrganizationDomain: orgDomain}).pipe(
        map(actions => {
          const data = actions.resultData as Team
          return data;
      })).subscribe({
        next: (data) =>{          
            this.team = data
            this.teamDataReady=true;
          data.TeamMembers.forEach(element => {
            this.userService.checkAndAddToUsersUsingEmail(element);
          });
          if(!this.userService.userReady) {
            this.userService.fetchUserData().subscribe(()=>{

            });
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => console.info("team details read successfully")
      });
  }

  getLabels() {
    const callable = this.functions.httpsCallable("teams/setLabelProperties");
    callable({})
  }

  close(){
    this.location.back();
  }
  
}




