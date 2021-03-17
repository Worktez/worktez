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

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: 'Board', component: BoardComponent },
  { path: 'CreateNewSession', component: CreateNewSessionComponent },
  { path: 'StartNewSprint', component: CreateNewSprintComponent },
  { path: 'Tasks/:category/:currentSprintName', component: TasksComponent },
  { path: 'TaskDetails/:taskId', component: TaskDetailsComponent },
  { path: '', component: MyDashBoardComponent },
  { path: 'CreateNewOrganization', component: CreateNewOrganizationComponent },
  { path: 'patch', component: PatchComponent },
  { path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard } },
  { path: 'verifyUser/:organizationDomain/:teamName/:userEmail', component: UserVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
