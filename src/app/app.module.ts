/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { CreateNewTaskComponent } from './body/create-new-task/create-new-task.component';
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
import { FilterTaskComponent } from './body/filter-task/filter-task.component';
import { NavbarComponent } from './body/navbar/navbar.component';
import { ChartComponent } from './body/common-tools/chart/chart.component';
import { MyTasksComponent } from './body/my-dashboard/my-tasks/my-tasks.component';
import { PerformanceChartComponent } from './body/my-dashboard/performance-chart/performance-chart.component';
import { RangeCardComponent } from "./body/my-dashboard/performance-chart/range-card/range-card.component";
import { CreateNewOrganizationComponent } from './body/create-new-organization/create-new-organization.component'
import { ErrorComponent } from './body/error/error.component';
import { Patch1Component } from './patches/patch1/patch1.component';
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
import { AddMemberComponent } from './body/create-new-team/add-member/add-member.component';
import { PerformanceColumnChartComponent } from './body/board/performance-column-chart/performance-column-chart.component';
import { ColumnChartComponent } from './body/common-tools/column-chart/column-chart.component';
import { SelectDropdownComponent } from './body/board/performance-column-chart/select-dropdown/select-dropdown.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityComponent } from './body/task-details/activity/activity.component';
import { ViewOrganizationDetailsComponent } from './body/view-organization-details/view-organization-details.component';
import { Patch4Component } from './patches/patch4/patch4.component';
import { WarningComponent } from './body/common-tools/warning/warning.component';
import { TasksEvaluationComponent } from './body/tasks-evaluation/tasks-evaluation.component';
import { ListPatchesComponent } from './list-patches/list-patches.component';
import { PatchCardsComponent } from './list-patches/patch-cards/patch-cards.component';
import { EditPatchComponent } from './list-patches/edit-patch/edit-patch.component';
import { CreateNewTeamComponent } from './body/create-new-team/create-new-team.component';
import { AddPatchComponent } from './list-patches/add-patch/add-patch.component';
import { Patch5Component } from './patches/patch5/patch5.component';
import { UploadFilesComponent } from './body/task-details/upload-files/upload-files.component';
import { ShowFilesComponent } from './body/common-tools/show-files/show-files.component';
import { UploadLogoComponent } from './body/create-new-organization/upload-logo/upload-logo.component';
import { LinkComponent } from './body/task-details/link/link.component';
import { BarChartComponent } from './body/common-tools/bar-chart/bar-chart.component';
import { SprintEvaluationGraphComponent } from './body/board/sprint-evaluation-graph/sprint-evaluation-graph.component';
import { SpeedImagesComponent } from './body/common-tools/speed-images/speed-images.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './body/common-tools/data-table/data-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TeamsCardComponent } from './body/view-organization-details/teams-card/teams-card.component';
import { OrgDocumentsComponent } from './body/view-organization-details/org-documents/org-documents.component';
import { Patch6Component } from './patches/patch6/patch6.component';
import { PrivacyComponent } from './body/privacy/privacy.component';
import { EditEducationComponent } from './body/profile/edit-education/edit-education.component';
import { EditWorkexperienceComponent } from './body/profile/edit-workexperience/edit-workexperience.component';
import { EditProjectsComponent } from './body/profile/edit-projects/edit-projects.component';
import { EditSkillsComponent } from './body/profile/edit-skills/edit-skills.component';
import { NotificationCenterComponent } from './header/notification-center/notification-center.component';
import { Patch7Component } from './patches/patch7/patch7.component';
import { CopyrightComponent } from './body/copyright/copyright.component';
import { ContributorsComponent } from './body/contributors/contributors.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { Patch8Component } from './patches/patch8/patch8.component';
import { AddContributorsComponent } from './body/contributors/add-contributors/add-contributors.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { EditProfilePicComponent } from './body/profile/edit-profile-pic/edit-profile-pic.component';
import { UpdateImageComponent } from './body/common-tools/update-image/update-image.component';
import { Patch10Component } from './patches/patch10/patch10.component';
import { QuickNotesComponent } from './body/quick-notes/quick-notes.component';
import { AddnewNoteComponent } from './body/quick-notes/addnew-note/addnew-note.component';
import { EditNoteComponent } from './body/quick-notes/edit-note/edit-note.component';
import { ReleaseNotesComponent } from './body/release-notes/release-notes.component';
import { ReleaseNotesBodyComponent } from './body/release-notes/release-notes-body/release-notes-body.component';
import { SocialPageComponent } from './body/social-page/social-page.component';
import { CreatePostComponent } from './body/social-page/create-post/create-post.component';
import { PostsComponent } from './body/social-page/posts/posts.component';
import { WhatsNewComponent } from './body/social-page/whats-new/whats-new.component';
import { GithubLinkComponent } from './body/github-link/github-link.component';
import { KanbanBoardComponent } from './body/kanban-board/kanban-board.component';
import { UpdateTeamComponent } from './body/update-team/update-team.component';
import { SchedularPatchComponent } from './patches/schedular-patch/schedular-patch.component';
import { GitComponent } from './body/task-details/git/git.component';
import { ProfilePicturesComponent } from './body/common-tools/profile-pictures/profile-pictures.component';
import { TeamDetailsComponent } from './body/team-details/team-details.component';
import { LabelCardComponent } from './body/team-details/label-card/label-card.component';
import { EditLabelPropComponent } from './body/team-details/edit-label-prop/edit-label-prop.component';
import { AddLabelComponent } from './body/team-details/add-label/add-label.component';
import { TaskECardComponent } from './body/tasks-evaluation/task-ecard/task-ecard.component';
import { CommentsComponent } from './body/social-page/posts/comments/comments.component';
import { EditDpComponent } from './body/view-organization-details/edit-dp/edit-dp.component';
import { SprintBurndownChartComponent } from './body/board/sprint-burndown-chart/sprint-burndown-chart.component';
import { OrgDpComponent } from './body/common-tools/org-dp/org-dp.component';
import { KanbanCardComponent } from './body/kanban-board/kanban-card/kanban-card.component';
import { TestimonialCardComponent } from './body/home/testimonial-card/testimonial-card.component';
import { CookieService } from 'ngx-cookie-service';
import { MilestoneComponent } from './body/milestone/milestone.component';
import { MilestoneDetailsComponent } from './body/milestone-details/milestone-details.component';
import { GenerateIconComponent } from './icons/generate-icon/generate-icon.component';
import { GetIconComponent } from './icons/get-icon/get-icon.component';
import { FilterPageComponent } from './body/filter-page/filter-page.component';
import { EditFilterComponent } from './body/filter-page/edit-filter/edit-filter.component';
import { CreateFilterComponent } from './body/filter-page/create-filter/create-filter.component';
import { IconsBaseComponent } from './body/common-tools/icons-base/icons-base.component';
import { ColorsBaseComponent } from './body/common-tools/colors-base/colors-base.component';

import { ImageCropperModule } from 'ngx-image-cropper';
import { AddMilestoneComponent } from './body/milestone/add-milestone/add-milestone.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    CreateNewTaskComponent,
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
    TasksEvaluationComponent,
    ListPatchesComponent,
    PatchCardsComponent,
    EditPatchComponent,
    CreateNewTeamComponent,
    AddPatchComponent,
    Patch5Component,
    UploadFilesComponent,
    ShowFilesComponent,
    UploadLogoComponent,
    SprintEvaluationGraphComponent,
    BarChartComponent,
    LinkComponent,
    SpeedImagesComponent,
    DataTableComponent,
    TeamsCardComponent,
    OrgDocumentsComponent,
    Patch6Component,
    CopyrightComponent,
    Patch8Component,
    NotificationCenterComponent,
    Patch7Component,
    PrivacyComponent,
    EditEducationComponent,
    EditWorkexperienceComponent,
    EditProjectsComponent,
    EditSkillsComponent,
    CopyrightComponent,
    NotificationCenterComponent,
    Patch7Component,
    CopyrightComponent,
    ContributorsComponent,
    TermsAndConditionComponent,
    AddContributorsComponent,
    EditProfilePicComponent,
    UpdateImageComponent,
    Patch10Component,
    QuickNotesComponent,
    AddnewNoteComponent,
    EditNoteComponent,
    ReleaseNotesComponent,
    ReleaseNotesBodyComponent,
    SocialPageComponent,
    CreatePostComponent,
    PostsComponent,
    WhatsNewComponent,
    GithubLinkComponent,
    KanbanBoardComponent,
    SchedularPatchComponent,
    UpdateTeamComponent,
    GitComponent,
    ProfilePicturesComponent,
    TeamDetailsComponent,
    LabelCardComponent,
    EditLabelPropComponent,
    AddLabelComponent,
    TaskECardComponent,
    CommentsComponent,
    EditDpComponent,
    SprintBurndownChartComponent,
    OrgDpComponent,
    KanbanCardComponent,
    TestimonialCardComponent,
    MilestoneComponent,
    MilestoneDetailsComponent,
    GenerateIconComponent,
    GetIconComponent,
    FilterPageComponent,
    EditFilterComponent,
    CreateFilterComponent,
    IconsBaseComponent,
    ColorsBaseComponent,
    AddMilestoneComponent,
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
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatBadgeModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    DragDropModule,
    ImageCropperModule
  ],
  providers: [
    AuthService,
    CookieService,
    { provide: REGION, useValue: 'asia-south1' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'} },
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', '7002'] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', '7001'] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
