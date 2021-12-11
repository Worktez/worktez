import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './body/login/login.component';
import { BoardComponent } from './body/board/board.component';
import { TaskDetailsComponent } from './body/task-details/task-details.component';
import { TasksComponent } from './body/tasks/tasks.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { MyDashBoardComponent } from './body/my-dashboard/my-dashboard.component';
import { CreateNewOrganizationComponent } from './body/create-new-organization/create-new-organization.component';
import { CreateNewTeamComponent } from './body/create-new-team/create-new-team.component';
import { Patch1Component } from './patches/patch1/patch1.component';
import { Patch2Component } from './patches/patch2/patch2.component';
import { Patch3Component } from './patches/patch3/patch3.component';
import { Patch4Component } from './patches/patch4/patch4.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { ProfileComponent } from './body/profile/profile.component';
import { SetupComponent } from './body/setup/setup.component';
import { HomeComponent } from './body/home/home.component';
import { ViewOrganizationDetailsComponent } from './body/view-organization-details/view-organization-details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TasksEvaluationComponent } from './body/tasks-evaluation/tasks-evaluation.component';
import { ListPatchesComponent } from './list-patches/list-patches.component';
import { Patch5Component } from './patches/patch5/patch5.component';
import { Patch6Component } from './patches/patch6/patch6.component';
import { CopyrightComponent } from './body/copyright/copyright.component';
import { Patch8Component } from './patches/patch8/patch8.component';
import { Patch7Component } from './patches/patch7/patch7.component';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['MyDashboard']);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'verifyUser/:organizationDomain/:teamName/:teamId/:userEmail', component: UserVerificationComponent },
  { path: 'Board', component: BoardComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'Tasks/:teamId/:currentSprintName', component: TasksComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'TasksEvaluation', component: TasksEvaluationComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'TaskDetails/:taskId', component: TaskDetailsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'MyDashboard', component: MyDashBoardComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'CreateNewOrganization', component: CreateNewOrganizationComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'CreateNewTeam', component: CreateNewTeamComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'Patch1', component: Patch1Component },
  { path: 'Patch2', component: Patch2Component },
  { path: 'Patch3', component: Patch3Component },
  { path: 'Patch4', component: Patch4Component },
  { path: 'Patch5', component: Patch5Component },
  { path: 'Patch6', component: Patch6Component },
  { path: 'Patch7', component: Patch7Component },
  { path: 'Patch8', component: Patch8Component },
  { path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard } },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'UpdateTeam/:teamId', component: CreateNewTeamComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'setup', component: SetupComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'ViewOrganizationDetails', component: ViewOrganizationDetailsComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'ListPatches', component: ListPatchesComponent },
  { path: 'copyright', component: CopyrightComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
