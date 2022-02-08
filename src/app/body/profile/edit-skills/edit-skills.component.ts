import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrls: ['./edit-skills.component.css']
})
export class EditSkillsComponent implements OnInit {

  enableLoader: boolean = false
  showClose: boolean = false

  @Input('uid') uid: string;
  @Input('displayName') displayName: string;
  @Input('email') email: string;
  @Input('skills') skills: string;

  @Output() editSkillsCompleted = new EventEmitter<{ completed: boolean }>();
  componentName:string = "PROFILE"
  skill: string

  constructor(private functions: AngularFireFunctions, public authService: AuthService, public errorHandlerService: ErrorHandlerService,public validationService:ValidationService) { }

  ngOnInit(): void {
  }
  
  async addSkill() {
    let labels = ['skill'];
    let values = [this.skill];
    let data = [{ label: "skill", value: this.skill }];
   
    
    var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
      
      return res;
    });
    if (condition) {
      console.log("Inputs are valid");
      this.submitaddedskill();
    }
    else
      console.log("Log-Work failed due to validation error");
  }
  async submitaddedskill() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('users/updateSkill');
    try {
      await callable({Uid: this.uid, DisplayName: this.displayName, Email: this.email, Skill: this.skill}).toPromise();
      console.log("Successful");
      this.skill = "";
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }
  
  editSkillCompleted() {
    this.editSkillsCompleted.emit({ completed: true });
  }
}
