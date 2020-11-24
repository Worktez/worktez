import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { TasksComponent } from './body/tasks/tasks.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'CreateNewSession', component: CreateNewSessionComponent},
  {path: 'Tasks/:category/:currentSprintName', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
