import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './body/login/login.component';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';
import { CreateNewSprintComponent } from './body/create-new-sprint/create-new-sprint.component';
import { BoardComponent } from './body/board/board.component';
import { EditPageComponent } from './body/task-details/edit-page/edit-page.component';
import { LogWorkComponent } from './body/task-details/log-work/log-work.component';
import { TaskDetailsComponent } from './body/task-details/task-details.component';
import { TasksComponent } from './body/tasks/tasks.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { MyDashBoardComponent } from './body/my-dashboard/my-dashboard.component';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: 'Board', component: BoardComponent },
  { path: 'CreateNewSession', component: CreateNewSessionComponent },
  { path: 'StartNewSprint', component: CreateNewSprintComponent },
  { path: 'Board/Tasks/:category/:currentSprintName', component: TasksComponent },
  { path: 'Board/Tasks/:category/:currentSprintName/:taskId', component: TaskDetailsComponent },
  { path: '', component: MyDashBoardComponent },
  { path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDashboard } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
