import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';

const routes: Routes = [
  {path: '', component: CreateNewSessionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
