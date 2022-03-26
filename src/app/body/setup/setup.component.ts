/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserAppSetting } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  user: User;
  userAppSetting: UserAppSetting;

  progressPercentage: number = 0

  public userObservable: Observable<User>

  appKey: string;
  email:string;
  uid: string;
  public showLoader: boolean = false;

  constructor(private popupHandlerService: PopupHandlerService, private functions: AngularFireFunctions, public router: Router, public authService: AuthService) { }

  ngOnInit(): void { }

  start() {
    this.getUser()
    this.showLoader = true;
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
    this.progressPercentage = 2;
    this.createNewOrg();
  }

  async createNewOrg() {
    var condition = true;
    if (condition) {
      this.createNewOrganization("create", "Worktrolly", "worktrolly@gmail.com", "worktrolly.web.app", "dev setup", this.email, this.uid, "this.orgLogoURL");
      this.createNewOrganization("create", "TestOrg", "testOrgabc@gmail.com", "testOrg.web.app", "dev setup", this.email, this.uid, "this.orgLogoURL");
      this.progressPercentage = 10;
    }
    else {
      console.log("Organization not created! Validation error");
    }
  }

  async createNewOrganization(modeTo: string , organizationName: string, organizationEmail: string, organizationDomain: string, organizationDescription: string, organizationAdmin: string, organizationAdminUid: string, organizationLogoURL: string) {
    
    
      if (modeTo == "create")
      {
        const callable = this.functions.httpsCallable('organization/createOrg');
        const result = await callable({OrganizationName: organizationName, OrganizationEmail: organizationEmail, OrganizationDomain: organizationDomain, OrganizationDescription: organizationDescription, OrganizationAdmin: organizationAdmin, OrganizationAdminUid: organizationAdminUid, OrganizationLogoURL: organizationLogoURL }).subscribe({
          next: (result) => {
            console.log("Successful");
            this.appKey = result[1];
            const orgAppKey = result[1];
            const priority = ["High", "Medium", "Low"];
            const type = ["Bug", "Story", "Sub Task"];
            const status = ["Ice Box", "Ready to start", "Under Progress", "Blocked", "Completed"];
            const difficulty = ["High", "Medium", "Low"];
            this.progressPercentage = 15;
  
            this.createNewTeamWithLabels("create", organizationDomain, "Development", "Dev", "test", organizationAdmin, ["member1@gmail.com"], this.email, type, status, priority, difficulty, orgAppKey);
            this.createNewTeamWithLabels("create", organizationDomain, "Marketing", "Mar", "test2", organizationAdmin, ["member2@gmail.com"], this.email, type, status, priority, difficulty, orgAppKey)
          },
          error: (error) => {
            console.log(error);
            console.error(error);
          },
          complete: () => console.info('Successfully created org')
      });
 
      }
      
  }

  async createNewTeamWithLabels( modeTo: string, organizationDomain: string, teamName: string, teamId: string, teamDescription: string, teamManagerEmail: string, teamMembers: string[], teamAdmin: string, type: string[], statusLabels: string[], priorityLabels: string[], difficultyLabels: string[], organizationAppKey: any ) {
      if (modeTo == "create")
      {
        const callable = this.functions.httpsCallable('teams/createTeam');
        const result = await callable({OrganizationDomain: organizationDomain, TeamName: teamName, TeamId: teamId, TeamDescription: teamDescription, TeamManagerEmail: teamManagerEmail, TeamMembers: teamMembers, TeamAdmin: teamAdmin, TypeLabels: type, StatusLabels: statusLabels, PriorityLabels: priorityLabels, DifficultyLabels: difficultyLabels, OrganizationAppKey: organizationAppKey, Uid: this.uid }).subscribe({
          next: (result) => {
            console.log("Successful");
            this.progressPercentage = 20;
            this.createNewSprint(teamName, teamId, organizationAppKey);
          },
          error: (error) => {
            console.error("Error", error);
            console.error(error);
          },
          complete: () => console.info('Successfully created new team with label')
      });
        
      }    
   
  }


  async createNewSprint(project: string, teamId: string, organizationAppKey: string) {
    const callable = this.functions.httpsCallable('sprints/createNewSprint');

    await callable({AppKey: organizationAppKey, StartDate: "2021-10-09", EndDate: "2021-10-18", Status: "Under Progress", NewSprintId: 1, TeamId: teamId }).subscribe({
      next: (result) => {
        console.log("Successfully created ");
        this.progressPercentage = 25;
        this.createNewSession(project, teamId, organizationAppKey);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful created new sprint')
  });

  }

  async createNewSession(project: string, teamId: string, organizationAppKey: string) {
    const callable = this.functions.httpsCallable('tasks/createNewTask');
    const parentTaskId = this.popupHandlerService.parentTaskId;
    const parentTaskUrl = this.popupHandlerService.parentTaskUrl;

    await callable({TeamId: teamId, AppKey: organizationAppKey, Title: "Title2", Description: "Backlog-2", Priority: "High", Difficulty: "Low", Creator: "Createor", Assignee: this.email, Reporter: this.email, EstimatedTime: 5, Status: "Ready to start", Project: project, SprintNumber: -1, StoryPointNumber: 3, CreationDate: "xx/xx/xxxx", Time: "07:30:21",  Type: "Story", Uid: this.authService.userAppSetting.uid, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl }).subscribe({
      next: (result) => {
        console.log("Successful");
        this.progressPercentage = 30;
        console.log("Successfully created the task");
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful created new session')
  });

      await callable({ TeamId: teamId, AppKey: organizationAppKey, Title: "Title-1", Description: "Backlog description", Priority: "High", Difficulty: "High", Creator: this.email, Assignee: this.email, Reporter: this.email, EstimatedTime: 7, Status: "Ice Box", Project: project, SprintNumber: -1, StoryPointNumber: 7, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Bug", Uid: this.authService.userAppSetting.uid, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl }).subscribe({
        next: (result) => {
          this.progressPercentage = 32;
          console.log("Successfully created the task");
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successful created new session')
    });


    await callable({ TeamId: teamId, AppKey: organizationAppKey, Title: "1st Task", Description: "Do a task", Priority: "Medium", Difficulty: "Low", Creator: this.email, Assignee: this.email, Reporter: this.email, EstimatedTime: 9, Status: "Ready to start", Project: project, SprintNumber: 1, StoryPointNumber: 9, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Sub Task", Uid: this.authService.userAppSetting.uid, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl  }).subscribe({
      next: (result) => {
      this.progressPercentage = 33;
      console.log("Successfully created the task");
      
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful ')
  });

      const result = await callable({ TeamId: teamId, AppKey: organizationAppKey, Title: "2nd Task", Description: "Do a task again", Priority: "High", Difficulty: "Medium", Creator: this.email, Assignee: this.email, Reporter: this.email, EstimatedTime: 24, Status: "Ice Box", Project: project, SprintNumber: 1, StoryPointNumber: 9, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Bug", Uid: this.authService.userAppSetting.uid, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl }).subscribe({
        next: (result) => {
          this.progressPercentage = 38;
          console.log("Successfully created the task");
          console.log(result);
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successful')
    });

      await callable({ TeamId: teamId, AppKey: organizationAppKey, Title: "2nd task", Description: "Do this 2nd task", Priority: "High", Difficulty: "Medium", Creator: this.email, Assignee: this.email, Reporter: this.email, EstimatedTime: 8, Status: "Ready to start", Project: project, SprintNumber: 1, StoryPointNumber: 7, CreationDate: "xx/xx/xxxx", Time: "07:30:21", Type: "Story", Uid: this.authService.userAppSetting.uid, ParentTaskId: parentTaskId, ParentTaskUrl: parentTaskUrl }).subscribe({
        next: (result) => {
          this.progressPercentage = 39;
          console.log("Successfully created the task");
          console.log(result);
          this.createPatchesCollection();
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successful')
    });
  }
  
  async createPatchesCollection() {
    const callable = this.functions.httpsCallable('patch/patchModerator');

      const result = await callable({Patch: "Patch1", PatchName: "Counter Fix", PatchDescription: "This patch Fixes all the counters for the team", CreationDate: "16/06/2021", UpdatedOn: "06/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
        next: (result) => {
          this.progressPercentage = 40;
          console.log("Created Patch1 document");
          console.log(result);
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successfully created patches')
    });
  

      await callable({Patch: "Patch2", PatchName: "Patch-2", PatchDescription: "This patch adds a new field to all the tasks with a default value.", CreationDate: "18/07/2021", UpdatedOn: "06/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
        next: (result) => {
          this.progressPercentage = 42;
          console.log("Created Patch2 document");
          console.log(result);
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successful ')
    });

     await callable({Patch: "Patch3", PatchName: "Patch-3", PatchDescription: "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", CreationDate: "07/07/2021", UpdatedOn: "12/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
        next: (result) => {
          this.progressPercentage = 50;
          console.log("Created Patch3 document");
          this.showLoader = false;
          console.log(result);
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successful ')
    });


    await callable({Patch: "Patch4", PatchName: "Patch-4", PatchDescription: "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", CreationDate: "07/07/2021", UpdatedOn: "12/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
      next: (result) => {
        this.progressPercentage = 60;
        console.log("Created Patch4 document");
        this.showLoader = false;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful')
  });
   
      await callable({Patch: "Patch5", PatchName: "Patch-5", PatchDescription: "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", CreationDate: "07/07/2021", UpdatedOn: "12/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
        next: (result) => {
          this.progressPercentage = 70;
          console.log("Created Patch5 document");
          this.showLoader = false;
          console.log(result);
        },
        error: (error) => {
          console.log(error);
          console.error(error);
        },
        complete: () => console.info('Successful')
    });

    await callable({Patch: "Patch6", PatchName: "Patch-6", PatchDescription: "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", CreationDate: "07/07/2021", UpdatedOn: "12/08/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
      next: (result) => {
      this.progressPercentage = 75;
      console.log("Created Patch6 document");
      this.showLoader = false;
      console.log(result);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful')
  });

   await callable({Patch: "Patch7", PatchName: "Patch-7", PatchDescription: "This patch allows the user to add new fields for Organization", CreationDate: "09/12/2021", UpdatedOn: "09/12/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
    next: (result) => {
      this.progressPercentage = 80;
      console.log("Created Patch7 document");
      this.showLoader = false;
      console.log(result);
    },
    error: (error) => {
      console.log(error);
      console.error(error);
    },
    complete: () => console.info('Successful ')
});

     await callable({Patch: "Patch8", PatchName: "Patch-8", PatchDescription: "This patch allows the user to add new fields in team", CreationDate: "11/12/2021", UpdatedOn: "13/12/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
      next: (result) => {
        this.progressPercentage = 85;
        console.log("Created Patch8 document");
        this.showLoader = false;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful ')
  });

    await callable({Patch: "Patch9", PatchName: "Patch-9", PatchDescription: "This patch allows the user to add new fields for Users", CreationDate: "09/12/2021", UpdatedOn: "09/12/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
      next: (result) => {
        this.progressPercentage = 88;
        console.log("Created Patch9 document");
        this.showLoader = false;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful')
  });

    await callable({Patch: "Patch10", PatchName: "Patch-10", PatchDescription: "This patch allows the user to add new fields for my organization", CreationDate: "31/12/2021", UpdatedOn: "31/12/2021", LastUsedByOrg: "", LastUsedByUid: ""}).subscribe({
      next: (result) => {
        this.progressPercentage = 100;
        console.log("Created Patch10 document");
        this.showLoader = false;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
      },
      complete: () => console.info('Successful')
  });
   
    }
  }

