import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';

@Component({
  selector: 'app-patch',
  templateUrl: './patch.component.html',
  styleUrls: ['./patch.component.css']
})
export class PatchComponent implements OnInit {

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
  }
  async patch() {
    const completionDate = "XX/XX/XXXX"
    const callable = this.functions.httpsCallable('addCompletionDatePatch');

    try {
      const result = await callable({ CompletionDate: completionDate }).toPromise();
      console.log("Success!");
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
  }

  async activityCollectionpatch() {
    
    const callable = this.functions.httpsCallable('activityCollectionPatch');

    try {
      const result = await callable({ }).toPromise();
      console.log("Success!");
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
  }
}
