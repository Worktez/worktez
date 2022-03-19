import { Component, Input, OnInit, Output, ViewChild , EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Label ,Team} from 'src/app/Interface/TeamInterface';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { ValidationService } from 'src/app/services/validation/validation.service';



@Component({
  selector: 'app-edit-label-prop',
  templateUrl: './edit-label-prop.component.html',
  styleUrls: ['./edit-label-prop.component.css']
})
export class EditLabelPropComponent implements OnInit {
  componentName: string = "EDIT-LABEL-PROP";

  @ViewChild('form') form: NgForm;
  @Input('label') label: Label;
  @Output() editLabelCompleted = new EventEmitter<{ completed: boolean }>();
  public labelObservable: Observable<Label>

  editLabel: Label
  enableLoader: boolean = false;
  displayName: string
  scope: string
  colorCode: string
  iconName: string
  showClose: boolean=false;
  newVal=[]
  preVal=[]
  changedData: string = ""

  constructor(private fuctions:AngularFireFunctions, private authService: AuthService, public errorHandlerService: ErrorHandlerService, private backendService: BackendService, public validationService: ValidationService) { }

  ngOnInit(): void {
    console.log('check')
    this.editLabel = this.label;
    this.displayName = this.label.DisplayName;
    this.colorCode = this.label.ColorCode;
    this.iconName = this.label.IconName;
    this.scope = this.label.Scope
  }

  async submit(){
    let data = [{ label: "displayName", value: this.editLabel.DisplayName},
                { label: "colorCode", value: this.editLabel.ColorCode},
                { label: "iconName", value: this.editLabel.IconName},
                { label: "scope", value:this.editLabel.Scope}]
                var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res=>{
                  return res;
                });
                if (condition) {
                   this.newVal = [this.editLabel.DisplayName, this.editLabel.ColorCode , this.editLabel.IconName, this.editLabel.Scope];
                   this.generateChanges();
                   console.log("Inputs are valid");
                   this.editLabelprop();
                }
                else
                   console.log("validation error")
  }

  async generateChanges() {
    if (this.preVal[0] != this.newVal[0])
    this.changedData + "displayName,";
    if (this.preVal[1] != this.newVal[1])
    this.changedData + "scope,";
    if (this.preVal[2] != this.newVal[2])
    this.changedData + "icoName,";
    if (this.preVal[3] != this.newVal[3])
    this.changedData + "colorCode,";
    if (this.changedData != "")
    this.changedData = "Edited-" + this.changedData;
    this.changedData = this.changedData.substring(0,this.changedData.length - 1) + "."

  }

  async editLabelprop(){
      this.enableLoader=true
        console.log("check")
        const callable = this.fuctions.httpsCallable('teams/editLabel.js');
        await callable({displayName: this.editLabel.DisplayName, status: this.editLabel.Status, colorCode: this.editLabel.ColorCode, iconName: this.editLabel.IconName, scope: this.editLabel.Scope}).subscribe({
          next: (data) => {
            this.enableLoader=false;
            this.showClose=true;
          },
          error: (error) => {
            this.errorHandlerService.showError = true;
            this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
            this.enableLoader = false;
            console.error(error);
          },
          complete: () => console.info('Successful ')
        });
  }

  editLabelDone(){
    this.editLabelCompleted.emit({ completed:true });
  }

  backToLabelDetails() {
    window.location.reload();
  }

}
