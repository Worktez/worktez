import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-update-field',
  templateUrl: './update-field.component.html',
  styleUrls: ['./update-field.component.css']
})
export class UpdateFieldComponent implements OnInit {
  @Input('fieldName') fieldName: string;
  @Input('fieldValue') fieldValue: string;
  @Input('uid') uid: string;
  @Output() updateFieldCompleted = new EventEmitter<{ completed: boolean }>();
  componentName:string = "PATCHES"
  QueryShowLoader: boolean = false;
  newfieldName: string;
  newfieldValue: string;
  orgDomain: string;
  enableLoader: boolean = false
  showClose: boolean = false;

  constructor(private functions: AngularFireFunctions, private location: Location, public db: AngularFirestore, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void { }

  async query() {
    this.QueryShowLoader = true;
    console.log("Querying in Patch3");
    try {
      const callable = this.functions.httpsCallable('patch/patch3');
      await callable({OrgDomain: this.orgDomain, FieldName: this.fieldName, FieldValue: this.fieldValue, NewField: this.newfieldName, NewFieldValue: this.newfieldValue, Uid: this.uid}).toPromise().then(result => {
        this.QueryShowLoader = false;
        this.showClose = true;
        console.log(result);
      });
    } catch (error) {
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
      console.log("Error", error);
    }
  }

  workDone() {
    this.updateFieldCompleted.emit({ completed: true });
  }

}
