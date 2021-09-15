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
import { Patch1Component } from './patches/patch1/patch1.component';
import { OrganizationDetailsComponent } from './body/create-new-organization/organization-details/organization-details.component';
import { TeamDetailsComponent } from './body/create-new-organization/team-details/team-details.component';
import { FocusNavComponent } from './body/board/focus-nav/focus-nav.component';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { ProfileComponent } from './body/profile/profile.component';
import { EditProfileComponent } from './body/profile/edit-profile/edit-profile.component';
import { TimeChartComponent } from './body/common-tools/time-chart/time-chart/time-chart.component';
import { ThemeComponent } from './body/common-tools/theme/theme.component';
import { SetupComponent } from './body/setup/setup.component';
import { HomeComponent } from './body/home/home.component';
import { PieChartComponent } from './body/common-tools/pie-chart/pie-chart.component';
import { WorkCompletionComponent } from './body/tasks/work-completion/work-completion.component';
import { Patch2Component } from './patches/patch2/patch2.component';
import { Patch3Component } from './patches/patch3/patch3.component';
import { UpdateFieldComponent } from './patches/patch3/update-field/update-field.component';
import { ProfileIconsComponent } from './icons/profile-icons/profile-icons.component';
import { ProgressGraphComponent } from './body/common-tools/progress-graph/progress-graph.component';
import { SuggestionBucketComponent } from './body/common-tools/suggestion-bucket/suggestion-bucket.component';
import { AddMemberComponent } from './body/create-new-organization/team-details/add-member/add-member.component';
import { PerformanceColumnChartComponent } from './body/board/performance-column-chart/performance-column-chart.component';
import { ColumnChartComponent } from './body/common-tools/column-chart/column-chart.component';
import { SelectDropdownComponent } from './body/board/performance-column-chart/select-dropdown/select-dropdown.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityComponent } from './body/task-details/activity/activity.component';
import { ViewOrganizationDetailsComponent } from './body/view-organization-details/view-organization-details.component';
import { Patch4Component } from './patches/patch4/patch4.component';
import { WarningComponent } from './body/common-tools/warning/warning.component';
import { ListPatchesComponent } from './list-patches/list-patches.component';
import { PatchCardsComponent } from './list-patches/patch-cards/patch-cards.component';
import { EditPatchComponent } from './list-patches/edit-patch/edit-patch.component';


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
    Patch1Component,
    OrganizationDetailsComponent,
    TeamDetailsComponent,
    FocusNavComponent,
    UserVerificationComponent,
    ProfileComponent,
    EditProfileComponent,
    TimeChartComponent,
    ThemeComponent,
    SetupComponent,
    HomeComponent,
    PieChartComponent,
    WorkCompletionComponent,
    Patch2Component,
    Patch3Component,
    UpdateFieldComponent,
    ProgressGraphComponent,
    ProfileIconsComponent,
    SuggestionBucketComponent,
    AddMemberComponent,
    PerformanceColumnChartComponent,
    ColumnChartComponent,
    SelectDropdownComponent,
    FooterComponent,
    ActivityComponent,
    ViewOrganizationDetailsComponent,
    Patch4Component,
    WarningComponent,
    ListPatchesComponent,
    PatchCardsComponent,
    EditPatchComponent
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
