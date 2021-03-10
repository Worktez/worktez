import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { CreateNewSessionComponent } from './body/create-new-session/create-new-session.component';
import { CreateNewSprintComponent } from './body/create-new-sprint/create-new-sprint.component';
import { BoardComponent } from './body/board/board.component';
import { FeatureCardComponent } from './body/board/feature-card/feature-card.component';
import { SprintDetailsComponent } from './body/board/sprint-details/sprint-details.component';
import { TasksComponent } from './body/tasks/tasks.component';
import { TaskCardsComponent } from './body/tasks/task-cards/task-cards.component';
import { TaskDetailsComponent } from './body/task-details/task-details.component';
import { LogWorkComponent } from './body/task-details/log-work/log-work.component';
import { EditPageComponent } from './body/task-details/edit-page/edit-page.component';
import { LoaderComponent } from './body/loader/loader.component';
import { LoginComponent } from './body/login/login.component';
import { LoginHandlerComponent } from './header/login-handler/login-handler.component';
import { UserCardComponent } from './header/login-handler/user-card/user-card.component';
import { AuthService } from './services/auth.service';
import { MyDashBoardComponent } from './body/my-dashboard/my-dashboard.component';
import { PriorityIconsComponent } from './icons/priority-icons/priority-icons.component';
import { StatusIconsComponent } from './icons/status-icons/status-icons.component';
import { FilterTaskComponent } from './body/filter-task/filter-task.component';
import { NavbarComponent } from './body/navbar/navbar.component';
import { ChartComponent } from './body/common-tools/chart/chart.component';
import { MyTasksComponent } from './body/my-dashboard/my-tasks/my-tasks.component';
import { PerformanceChartComponent } from './body/my-dashboard/performance-chart/performance-chart.component';
import { RangeCardComponent } from "./body/my-dashboard/performance-chart/range-card/range-card.component";
import { CreateNewOrganizationComponent } from './body/create-new-organization/create-new-organization.component'
import { ErrorComponent } from './body/error/error.component';
import { PatchComponent } from './patch/patch.component';
import { OrganizationDetailsComponent } from './body/create-new-organization/organization-details/organization-details.component';
import { TeamDetailsComponent } from './body/create-new-organization/team-details/team-details.component';
import { FocusNavComponent } from './body/board/focus-nav/focus-nav.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CreateNewSessionComponent,
    CreateNewSprintComponent,
    BoardComponent,
    FeatureCardComponent,
    SprintDetailsComponent,
    TasksComponent,
    TaskCardsComponent,
    TaskDetailsComponent,
    LogWorkComponent,
    EditPageComponent,
    LoaderComponent,
    LoginComponent,
    LoginHandlerComponent,
    UserCardComponent,
    MyDashBoardComponent,
    PriorityIconsComponent,
    StatusIconsComponent,
    FilterTaskComponent,
    NavbarComponent,
    ChartComponent,
    MyTasksComponent,
    PerformanceChartComponent,
    RangeCardComponent,
    CreateNewOrganizationComponent,
    ErrorComponent,
    FilterTaskComponent,
    PatchComponent,
    OrganizationDetailsComponent,
    TeamDetailsComponent,
    FocusNavComponent,
    UserVerificationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot({ version: 'current' }),
    HttpClientModule
  ],
  providers: [
    AuthService,
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 7002] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 7001] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
