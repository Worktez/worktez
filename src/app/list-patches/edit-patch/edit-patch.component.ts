import { Component, OnInit, Input,Output, EventEmitter,ViewChild } from '@angular/core';
import { Patch } from 'src/app/Interface/PatchInterface';
import { PatchService } from 'src/app/services/patch/patch.service';
import { AngularFirestore, AngularFirestoreCollectionGroup } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-patch',
  templateUrl: './edit-patch.component.html',
  styleUrls: ['./edit-patch.component.css']
})

export class EditPatchComponent implements OnInit {
  @Input('patch') patch : string  
  @Output() editPatchCompleted = new EventEmitter<{ completed: boolean }>();
  showClose: boolean = false;  
  initialPatch : Patch
  editPatch : Patch
  prevVal = []
  newVal = []
  changedData: string = ""
  enableLoader: boolean = false;
  constructor( public db: AngularFirestore,private patchService: PatchService) { }

  ngOnInit(): void {  
    this.patchService.getPatchData(this.patch).subscribe(data => {     
      this.initialPatch = data;
      this.prevVal = [this.initialPatch.Name,this.initialPatch.Description];      
      this.editPatch = this.initialPatch;
    });    
  }   

  editPatchDone() {    
    this.editPatchCompleted.emit({ completed: true });
  }
  
  async submit(){    
    this.newVal = [this.editPatch.Name,this.editPatch.Description]
    this.generateChanges();
    this.editPage();
  }

  async generateChanges() {    
    if (this.prevVal[1] != this.newVal[1])
      this.changedData = this.changedData + " description,";
    if (this.prevVal[0] != this.newVal[0])
      this.changedData = this.changedData + " name,";
    if (this.changedData != "")
      this.changedData = "Edited-" + this.changedData;
    this.changedData = this.changedData.substring(0, this.changedData.length - 1) + "."
    console.log(this.changedData);
  }

  async editPage(){
    this.enableLoader = true;
    try{            
      const patchDB = this.db.collection('Patches');
      patchDB.doc(this.patch).update({Name: this.editPatch.Name});
      patchDB.doc(this.patch).update({Description: this.editPatch.Description});
      this.enableLoader = false;
      this.showClose = true;
    }
    catch(error){
      console.log(error);
      this.enableLoader = false;
    }
  }

}
