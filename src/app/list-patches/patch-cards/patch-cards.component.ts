
import { Component, OnInit, Input } from '@angular/core';
import { Patch } from 'src/app/Interface/PatchInterface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { PatchService } from 'src/app/services/patch/patch.service';

@Component({
  selector: 'app-patch-cards',
  templateUrl: './patch-cards.component.html',
  styleUrls: ['./patch-cards.component.css']
})

export class PatchCardsComponent implements OnInit {

  @Input('patch') patches: Patch 
  editPatchEnabled: boolean = false
  orgDomain: string
  showLoader: boolean = false;
  patch : Patch  
  EditedName : string
  public taskDocument: AngularFirestoreDocument<Patch>
  public taskDataObservable: Observable<Patch>
  constructor(public db: AngularFirestore, public authService: AuthService, public patchService: PatchService) { }

  ngOnInit(): void {

    this.showLoader = true;
    this.authService.afauth.user.subscribe(data => {
      this.authService.userAppSettingObservable.subscribe(data => {
        if (data.SelectedOrgAppKey) {                            
          this.showLoader = false;
        }
      });
    });       
  }

  getPatchData(name: string) {
    this.editPatchEnabled = true;
    this.patchService.getPatchData(name).subscribe(data => {      
      this.patch = data;     
    });    
  }

  editPatches(name: string) { 
    this.EditedName = name;
    this.editPatchEnabled = true;
  }
  
  editPatchCompleted(data: { completed: boolean }) {
    this.editPatchEnabled = false;
  }
}
