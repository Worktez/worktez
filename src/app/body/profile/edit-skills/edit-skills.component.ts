import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';

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
  
  skill: string

  constructor(private functions: AngularFireFunctions, public authService: AuthService) { }

  ngOnInit(): void {
  }

  async addSkill() {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('users');
    try {
      await callable({ mode: "updateSkill", Uid: this.uid, DisplayName: this.displayName, Email: this.email, Skill: this.skill}).toPromise();
      console.log("Successful");
      this.skill = "";
      this.showClose = true;
    } catch (error) {
      console.log("error");
      this.enableLoader = false;
    }
  }
  
  editSkillCompleted() {
    this.editSkillsCompleted.emit({ completed: true });
  }
}
