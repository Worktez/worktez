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
  async patch(){
    const completionDate = "XX/XX/XXXX"
    const callable = this.functions.httpsCallable('addCompletionDatePatch');

    try {
      const result = await callable({CompletionDate:completionDate}).toPromise();
      console.log("Successfully created the task");
      console.log(result);
    } catch (error) {
      console.error("Error", error);
    }
}
}
