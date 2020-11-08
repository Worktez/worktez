import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';
import { CreateNewSprintComponent } from './body/create-new-sprint/create-new-sprint.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path: 'CreateNewSession', component: CreateNewSessionComponent},
  {path: 'CreateNewSprint', component: CreateNewSprintComponent},
  {path:"",component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
