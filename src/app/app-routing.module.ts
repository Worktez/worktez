import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './body/login/login.component';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';
import { CreateNewSprintComponent } from './body/create-new-sprint/create-new-sprint.component';
import { BoardComponent } from './body/board/board.component';
import { TaskDetailsComponent } from './body/task-details/task-details.component';
import { TasksComponent } from './body/tasks/tasks.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { MyDashBoardComponent } from './body/my-dashboard/my-dashboard.component';
import { CreateNewOrganizationComponent } from './body/create-new-organization/create-new-organization.component';
import { PatchComponent } from './patch/patch.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { ProfileComponent } from './body/profile/profile.component';
import { TeamDetailsComponent } from './body/create-new-organization/team-details/team-details.component';
import { SetupComponent } from './body/setup/setup.component';
import { HomeComponent } from './body/home/home.component';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['MyDashboard']);

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'verifyUser/:organizationDomain/:teamName/:teamId/:userEmail', component: UserVerificationComponent },
  { path: 'Board', component: BoardComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'CreateNewSession', component: CreateNewSessionComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'StartNewSprint', component: CreateNewSprintComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'Tasks/:teamId/:currentSprintName', component: TasksComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'TaskDetails/:taskId', component: TaskDetailsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'MyDashboard', component: MyDashBoardComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'CreateNewOrganization', component: CreateNewOrganizationComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'patch', component: PatchComponent, canActivate: [AngularFireAuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard } },
  { path: 'verifyUser/:organizationDomain/:teamName/:teamId/:userEmail', component: UserVerificationComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToVerifyUser } },
  { path: 'profile', component: ProfileComponent },
  { path: 'CreateTeam', component: TeamDetailsComponent },
  { path: 'UpdateTeam/:teamId', component: TeamDetailsComponent}
  { path: 'CreateTeam', component: TeamDetailsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'UpdateTeam/:teamId', component: TeamDetailsComponent, canActivate: [AngularFireAuthGuard]},
  { path: 'setup', component: SetupComponent, canActivate: [AngularFireAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
