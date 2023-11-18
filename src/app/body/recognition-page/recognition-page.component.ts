import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/Interface/TeamInterface';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { TeamServiceService } from 'src/app/services/team/team-service.service';
import { UserServiceService } from 'src/app/services/user-service/user-service.service';
import { map, Observable, startWith } from 'rxjs';
import { Reward } from 'src/app/Interface/RewardInterface';


@Component({
  selector: 'app-recognition-page',
  templateUrl: './recognition-page.component.html',
  styleUrls: ['./recognition-page.component.css']
})
export class RecognitionPageComponent {
  componentName = "RECOGNITION PAGE";
  teamId: string;
  team: Team;
  showLoader: boolean = true;
  teamDataReady: boolean = false;
  recognizeMember: boolean = false;
  rewardsData: Reward[] = [];
  len = 0;

  constructor(public navbarHandler: NavbarHandlerService, private route: ActivatedRoute, public teamService: TeamServiceService,private userService: UserServiceService,  private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);
    this.teamId = this.route.snapshot.params['teamId'];
    if(this.teamService.teamsReady) {
      this.getTeamData();
    } else {
      this.teamService.teamDataStateObservable.subscribe({
        next: (data) => {
          if(data)
            this.getTeamData();
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {          
          console.log("Completed getting Team Data");
        }
      });
    }
  }

  getTeamData() {
    this.showLoader = true;
    this.team = this.teamService.getTeamUsingId(this.teamId);

    const teamMembersEmailId = this.team.TeamMembers;
    this.getTeamRewards(teamMembersEmailId);

    
    this.team.TeamMembers.forEach((element: string) => {
      let userData = this.userService.getUserData(element);
      this.userService.checkAndAddToUsersUsingEmail(element);
    });
    this.userService.fetchUserData().subscribe(()=>{
      this.teamDataReady = true;
      this.showLoader = false;
    });
  }
  selectedAssignee(item: any) {
    console.log(item)
  }

  getTeamRewards(email) {
    this.showLoader = true;
    const callable = this.functions.httpsCallable("teams/getTeamRewards");
    callable({TeamMembers: email}).pipe(
      map(actions => {
        return actions.data as Reward[];
      })).subscribe({
        next: (data) => {
          if (data) {
            this.rewardsData = data;
            this.rewardsData.forEach((reward) => {
              reward.Logo = atob(reward.Logo);              
            })
            this.len = this.rewardsData.length;
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Rewards Data Successfully");
          this.showLoader = false;
        }
     });
  }

  recognize(){
    this.recognizeMember = true;
  }
  
}
