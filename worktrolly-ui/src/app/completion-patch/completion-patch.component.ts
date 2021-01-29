import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completion-patch',
  templateUrl: './completion-patch.component.html',
  styleUrls: ['./completion-patch.component.css']
})
export class CompletionPatchComponent implements OnInit {
  functions: any;

  constructor() { }

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
