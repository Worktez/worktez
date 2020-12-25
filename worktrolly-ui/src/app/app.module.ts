import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';
import { CreateNewSprintComponent } from './body/create-new-sprint/create-new-sprint.component';
import { DashboardComponent } from './body/dashboard/dashboard.component';
import { FeatureCardComponent } from './body/dashboard/feature-card/feature-card.component';
import { SprintDetailsComponent } from './body/dashboard/sprint-details/sprint-details.component';
import { TasksComponent } from './body/tasks/tasks.component';
import { TaskCardsComponent } from './body/tasks/task-cards/task-cards.component';
import { TaskDetailsComponent } from './body/task-details/task-details.component';
import { LogWorkComponent } from './body/task-details/log-work/log-work.component';
import { EditPageComponent } from './body/task-details/edit-page/edit-page.component';
import { StatusIconsComponent } from './icons/status-icons/status-icons.component';
import { PriorityIconsComponent } from './icons/priority-icons/priority-icons.component';
import { LoaderComponent } from './body/loader/loader.component';
import { LoginComponent } from './body/login/login.component';
import { LoginHandlerComponent } from './header/login-handler/login-handler.component';
import { UserCardComponent } from './header/login-handler/user-card/user-card.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CreateNewSessionComponent,
    CreateNewSprintComponent,
    DashboardComponent,
    FeatureCardComponent,
    SprintDetailsComponent,
    TasksComponent,
    TaskCardsComponent,
    TaskDetailsComponent,
    LogWorkComponent,
    EditPageComponent,
    StatusIconsComponent,
    PriorityIconsComponent,
    LoaderComponent,
    LoginComponent,
    LoginHandlerComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
