import { Component, OnInit } from '@angular/core';
import { Patch } from 'src/app/Interface/PatchInterface';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { ToolsService } from 'src/app/services/tool/tools.service';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
@Component({
  selector: 'app-add-patch',
  templateUrl: './add-patch.component.html',
  styleUrls: ['./add-patch.component.css']
})
export class AddPatchComponent implements OnInit {
  showClose: boolean = false;  
  enableLoader: boolean = false;
  name: string;
  description: string;
  createdOn : string;
  updatedOn : string;
  date : string;
  patch : Patch
  componentName:string = "LIST-PATCHES"
  constructor(private functions : AngularFireFunctions,private toolsService:ToolsService, public errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.date = this.toolsService.date();
  }
  async createNewPatch(data) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('patch/patchModerator');

    try {
      const result = await callable({Patch: data.name,PatchName: data.name, PatchDescription: data.description, CreationDate: this.date, UpdatedOn: this.date, LastUsedByOrg:"", LastUsedByUid:""}).toPromise();

      this.enableLoader = false;
      this.showClose = true;
    } catch (error) {
      console.log(error);
      this.enableLoader = false;
      this.errorHandlerService.showError = true;
      this.errorHandlerService.getErrorCode(this.componentName, "InternalError","Api");
    }
  }

}
