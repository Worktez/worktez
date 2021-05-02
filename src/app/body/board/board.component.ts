import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { Main, MainDataId, RawDataId, RawDataType } from 'src/app/Interface/RawDataInterface';
import { TeamDataId } from 'src/app/Interface/TeamInterface';
import { ApplicationSettingsService } from 'src/app/services/application-settings.service';
import { BackendService } from 'src/app/services/backend.service';
import { NavbarHandlerService } from 'src/app/services/navbar-handler.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  componentName: string = "BOARD";

  // public rawData: RawDataType;

  filterSprintNumber: string;

  // public teamSprintCollection: AngularFirestoreCollectionGroup<RawDataType>;
  // public teamSprintData: Observable<RawDataId[]>;

  constructor(private router: Router, private db: AngularFirestore, public navbarHandler: NavbarHandlerService, public backendService: BackendService, public applicationSettingsService: ApplicationSettingsService) { }

  ngOnInit(): void {
    // Better way of use db.
    // this.rawCollection = this.db.collection<RawDataType>('RawData');
    // this.rawData = this.rawCollection.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as RawDataType;
    //     this.currentSprintNumber = data.CurrentSprintId;
    //     this.currentSprintName = "S"+this.currentSprintNumber;
    //     const id = a.payload.doc.id;
    //     return { id, ...data };
    //   }))
    // );
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar(this.componentName);

    // Efficient for now
    this.getCurrentSprint();
    this.readCurrentSprintData();
  }

  // Reading data as get() method

  // async getCurrentSprint() {
  //   this.rawDocument = this.db.doc<RawDataType>('Main/RawData');
  //   try {
  //     await this.rawDocument.ref.get().then(doc=> {
  //       if(doc.exists){
  //         var rawData = doc.data();
  //         this.currentSprintNumber = rawData.CurrentSprintId;
  //         this.currentSprintName = "S" + this.currentSprintNumber;
  //       } else {
  //         console.error("Document does not exists!")
  //       }
  //     });
  //     return "Success";
  //   } catch (error) {
  //     return "Error";
  //   }

  // }

  // Reading synchronous snapshot of data

  getCurrentSprint() {
    this.backendService.getCurrentSprint();

  }

  // getSprintDetails(orgId: string, teamName: string) {
  //   this.teamSprintCollection = this.db.collectionGroup<RawDataType>('Teams/' + teamName + '/Sprints/' + this.backendService.currentSprintName, ref => ref.where('OrganizationId', '==', orgId));
  //   this.teamSprintData = this.teamSprintCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as RawDataType;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  //   return this.teamSprintData;
  // }

  readCurrentSprintData() {
    // this.backendService.readCurrentSprintData();
    const orgId = this.backendService.organizationDetails.OrganizationId;
    const teamId = this.applicationSettingsService.teamDetails.TeamId;
    const currentSprintNumber = this.backendService.currentSprintNumber;
    this.applicationSettingsService.getSprintsDetails(orgId, teamId, currentSprintNumber);
    // this.mainData = this.mainCollection.snapshotChanges().pipe(
    //   map()
    // )
  }

  showTasks(teamId: string) {
    this.router.navigate(['/Tasks', teamId, this.backendService.currentSprintName])
  }

  changeCurrentSprint(currentSprintNumber: number) {
    this.backendService.setCurrentSprint(currentSprintNumber);
  }
}
