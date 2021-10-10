import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserAppSetting } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  user: User;
  userAppSetting: UserAppSetting;

  public userObservable: Observable<User>

  appKey: string;
  email:string;
  uid: string;
  public showLoader: boolean = false;

  constructor(private functions: AngularFireFunctions, public router: Router, public authService: AuthService) { }

  ngOnInit(): void { }

  start() {
    this.getUser()
    this.showLoader = true;
    // this.createNewOrg();
  }

  async getUser() {
    this.userObservable = this.authService.afauth.user.pipe(map(action => {
      const data = action as User;
      this.user = data
      return { ...data }
    })
    );
    this.email = (await this.authService.afauth.currentUser).email;
    this.uid = (await this.authService.afauth.currentUser).uid;
    this.createNewOrg();

  }

  async createNewOrg() {
    var condition = true;
    if (condition) {
      console.log("Inputs are valid");
      this.createNewOrganization("create", "Worktrolly", "worktrolly@gmail.com", "worktrolly.web.app", "dev setup", this.email, this.uid, "this.orgLogoURL");
      this.createNewOrganization("create", "TestOrg", "testOrgabc@gmail.com", "testOrg.web.app", "dev setup", this.email, this.uid, "this.orgLogoURL");
    }
    else {
      console.log("Organization not created! Validation error");
    }
  }

  async createNewOrganization(modeTo: string , organizationName: string, organizationEmail: string, organizationDomain: string, organizationDescription: string, organizationAdmin: string, organizationAdminUid: string, organizationLogoURL: string) {
    const callable = this.functions.httpsCallable('organization');
    try {
      const result = await callable({ mode: modeTo, OrganizationName: organizationName, OrganizationEmail: organizationEmail, OrganizationDomain: organizationDomain, OrganizationDescription: organizationDescription, OrganizationAdmin: organizationAdmin, OrganizationAdminUid: organizationAdminUid, OrganizationLogoURL: organizationLogoURL }).toPromise();
      console.log("Successfully created the Organization");
      console.log(result[0]);
      console.log("APPKEY: ", result[1]);
      this.appKey = result[1];

      const orgAppKey = result[1];
      const priority = ["High", "Medium", "Low"];
      const type = ["Bug", "Story", "Sub Task"];
      const status = ["Ice Box", "Ready to Start", "Under Progress", "Blocked", "Completed"];
      const difficulty = ["High", "Medium", "Low"];

      this.createNewTeamWithLabels("create", organizationDomain, "Development", "Dev", "test", organizationAdmin, ["member1@gmail.com"], this.email, type, status, priority, difficulty, orgAppKey);
      this.createNewTeamWithLabels("create", organizationDomain, "Marketing", "Mar", "test2", organizationAdmin, ["member2@gmail.com"], this.email, type, status, priority, difficulty, orgAppKey)
    } catch (error) {
      console.log(error);
    }
  }

  async createNewTeamWithLabels( modeTo: string, organizationDomain: string, teamName: string, teamId: string, teamDescription: string, teamManagerEmail: string, teamMembers: string[], teamAdmin: string, type: string[], statusLabels: string[], priorityLabels: string[], difficultyLabels: string[], organizationAppKey: any ) {
    const callable = this.functions.httpsCallable('teams');
    try {
      const result = await callable({ mode: modeTo, OrganizationDomain: organizationDomain, TeamName: teamName, TeamId: teamId, TeamDescription: teamDescription, TeamManagerEmail: teamManagerEmail, TeamMembers: teamMembers, TeamAdmin: teamAdmin, Type: type, StatusLabels: statusLabels, PriorityLabels: priorityLabels, DifficultyLabels: difficultyLabels, OrganizationAppKey: organizationAppKey, Uid: this.uid }).toPromise();
      console.log(result);
      this.createNewSprint(teamName, teamId, organizationAppKey);
    } catch (error) {
      console.error("Error", error);
    }
  }


  async createNewSprint(project: string, teamId: string, organizationAppKey: string) {
    const callable = this.functions.httpsCallable('sprints');

    try {
      const result = await callable({ mode: "create", AppKey: organizationAppKey, StartDate: "2021-10-09", EndDate: "2021-10-18", Status: "Under Progress", NewSprintId: 1, TeamId: teamId }).toPromise();

      console.log("Successfully created a new sprint");
      console.log(result);
      this.createNewSession(project, teamId, organizationAppKey);
    } catch (error) {
      console.log(error);
    }


  }

  async createNewSession(project: string, teamId: string, organizationAppKey: string) {
    const callable = this.functions.httpsCallable('tasks');

    try {
      const result = await callable({ mode: "create", TeamId: teamId, AppKey: organizationAppKey, Title: "Title2", Description: "Backlog-2", Priority: "High", Difficulty: "Low", Creator: "Createor", Assignee: "-", Reporter: "-", EstimatedTime: 5, Status: "Ready to Start", Project: project, SprintNumber: -1, StoryPointNumber: 3, CreationDate: "xx/xx/xxxx", Time: "07:30:21",  Type: "Story", Uid: this.authService.userAppSetting.uid }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await callable({ mode: "create", TeamId: teamId, AppKey: organizationAppKey, Title: "Title-1", Description: "Backlog description", Priority: "High", Difficulty: "High", Creator: "Createor", Assignee: "-", Reporter: "-", EstimatedTime: 7, Status: "Ice Box", Project: project, SprintNumber: -1, StoryPointNumber: 7, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Bug", Uid: this.authService.userAppSetting.uid }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await callable({ mode: "create", TeamId: teamId, AppKey: organizationAppKey, Title: "1st Task", Description: "Do a task", Priority: "Medium", Difficulty: "Low", Creator: "joe", Assignee: this.email, Reporter: this.email, EstimatedTime: 9, Status: "Ready to start", Project: project, SprintNumber: 1, StoryPointNumber: 9, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Sub Task", Uid: this.authService.userAppSetting.uid  }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await callable({ mode: "create", TeamId: teamId, AppKey: organizationAppKey, Title: "2nd Task", Description: "Do a task again", Priority: "High", Difficulty: "Medium", Creator: "joe", Assignee: this.email, Reporter: this.email, EstimatedTime: 24, Status: "Ice Box", Project: project, SprintNumber: 1, StoryPointNumber: 9, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Bug", Uid: this.authService.userAppSetting.uid }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await callable({ mode: "create", TeamId: teamId, AppKey: organizationAppKey, Title: "2nd task", Description: "Do this 2nd task", Priority: "High", Difficulty: "Medium", Creator: "Mayo", Assignee: "Ketch", Reporter: "Cheese", EstimatedTime: 8, Status: "Ready to start", Project: project, SprintNumber: 1, StoryPointNumber: 7, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Story", Uid: this.authService.userAppSetting.uid }).toPromise();

      console.log("Successfully created the task");
      console.log(result);
      this.createPatchesCollection();
    } catch (error) {
      console.log(error);
    }
  }
  
  async createPatchesCollection() {
    const callable = this.functions.httpsCallable('patch');

    try {
      const result = await callable({ mode: "patchModerator", Patch: "Patch1", PatchName: "Counter Fix", PatchDescription: "This patch Fixes all the counters for the team", CreationDate: "16/06/2021", UpdatedOn: "06/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).toPromise();

      console.log("Created Patch1 document");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await callable({ mode: "patchModerator", Patch: "Patch2", PatchName: "Patch-2", PatchDescription: "This patch adds a new field to all the tasks with a default value.", CreationDate: "18/07/2021", UpdatedOn: "06/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).toPromise();

      console.log("Created Patch2 document");
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await callable({ mode: "patchModerator", Patch: "Patch3", PatchName: "Patch-3", PatchDescription: "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", CreationDate: "07/07/2021", UpdatedOn: "12/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).toPromise();

      console.log("Created Patch3 document");
      this.showLoader = false;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
