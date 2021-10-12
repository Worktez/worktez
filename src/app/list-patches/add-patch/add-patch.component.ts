import { Component, OnInit } from '@angular/core';
import { Patch } from 'src/app/Interface/PatchInterface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { ToolsService } from 'src/app/services/tool/tools.service';
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
  constructor(private functions : AngularFireFunctions,private toolsService:ToolsService) { }

  ngOnInit(): void {
    this.date = this.toolsService.date();
  }
  async createNewPatch(data) {
    this.enableLoader = true;
    const callable = this.functions.httpsCallable('patch');

    try {
      const result = await callable({mode: "patchModerator",Patch: data.name,PatchName: data.name, PatchDescription: data.description, CreationDate: this.date, UpdatedOn: this.date, LastUsedByOrg:"", LastUsedByUid:""}).toPromise();

      this.enableLoader = false;
      this.showClose = true;
    } catch (error) {
      console.log(error);
      this.enableLoader = false;
    }
  }

}
