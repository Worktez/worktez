import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, UntypedFormControl } from '@angular/forms';
import { Tasks } from 'src/app/Interface/TasksInterface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToolsService } from 'src/app/services/tool/tools.service'; 
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ApplicationSettingsService } from 'src/app/services/applicationSettings/application-settings.service';
import { map, Observable, startWith } from 'rxjs';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-add-watchers',
  templateUrl: './add-watchers.component.html',
  styleUrls: ['./add-watchers.component.css']
})
export class AddWatchersComponent implements OnInit {

  watcherName = new UntypedFormControl();
  filteredOptionsWatcher: string[];

  @ViewChild('form') form: NgForm;
  @Input('task') task: Tasks
  @Input('orgDomain') orgDomain: string;
  @Input('watcherList') watcherList: string[];
  @Output() addWatcherCompleted = new EventEmitter<{ completed: boolean }>();

  componentName: string = "ADD-WATCHER";
  enableLoader: boolean = false;
  showClose: boolean = false;
  todayDate: string;
  time: string;
  teamMembers: string[];

  constructor(public toolsService: ToolsService, public authService: AuthService, public errorHandlerService: ErrorHandlerService, private functions: AngularFireFunctions, public applicationSetting: ApplicationSettingsService, public validationService: ValidationService) { }

  ngOnInit(): void {
    this.watcherName.setValue(this.authService.getUserEmail());
    this.todayDate = this.toolsService.date();
    this.time = this.toolsService.time();
    this.readTeamMembers(this.task.TeamId);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamMembers.filter(option => option.toLowerCase().includes(filterValue));
  }

  readTeamMembers(teamId :string){
    this.applicationSetting.getTeamDetails(teamId); 
    const team = this.applicationSetting.team;
    this.teamMembers = team.TeamMembers;

    this.watcherName.valueChanges.pipe(
      startWith(''),
      map((value) => {
        return this._filter(value)
      })).subscribe({
      next :(data) => {
        this.filteredOptionsWatcher = data
      },
      error:(error) => {
        console.error(error)
      },
      complete:() => console.info("Getting filtered options Watcher was successfull")
    });
  }

  selectedWatcher(item) {
    if(item.selected == false) {
      this.watcherName.setValue("");
      this.workDone();
    } else {
      this.watcherName.setValue(item.data);
    }
  }

  submit() {
    this.enableLoader = true;
    let data = [{ label: "watcher", value: this.watcherName.value }];

    var condition = (this.validationService.checkValidity(this.componentName, data)).then(res => {
      return res;
    });

    if(condition && this.watcherName.value) {
      const callable = this.functions.httpsCallable( 'tasks/addWatcher' );
      callable({OrgDomain: this.orgDomain, TaskId:this.task.Id, NewWatcher: this.watcherName.value, CreationDate: this.todayDate, Time: this.time, Uid: this.authService.userAppSetting.uid}).subscribe({
        next: (data) => {
          console.log("Successful");
          this.enableLoader = false;
          this.showClose = true;
          return;
        },
        error: (error) => {
          this.errorHandlerService.showError = true;
          this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
          console.log( "Error", error );
        },
        complete: () => console.info('Successful')
      });
    }

  }

  workDone() {
    this.addWatcherCompleted.emit({ completed: true });
  }

}
