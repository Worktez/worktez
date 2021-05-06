import { Injectable } from '@angular/core';
import { Team } from 'src/app/Interface/TeamInterface'
import { BackendService } from './backend.service';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrgTeamService {

  teamDetails: Team;
  teamName: string;
  public teamDocument: AngularFirestoreDocument<Team>
  public teamDataObservable: Observable<Team>

  constructor(private backendService: BackendService, private router: Router,  public db: AngularFirestore) { }

  getTeamDetails(){
    var documentPath = 'Organizations/' + this.backendService.getOrganizationDomain() + '/Teams/' + this.teamName;
    console.log(documentPath);
    this.teamDocument = this.db.doc<Team>(documentPath);
    this.teamDataObservable = this.teamDocument.snapshotChanges().pipe(
      map(actions => {
        const data = actions.payload.data() as Team;
        this.teamDetails = data;

        return { ...data }
      }));
    return this.teamDataObservable;
  }

  getTeam(teamId: string){
    if(teamId == 'Dev'){
      this.teamName = 'Development';
    }
    else if(teamId == 'Mar'){
      this.teamName = 'Marketing';
    }
    else if(teamId == 'Bus'){
      this.teamName = 'Business';
    }
    else if(teamId == 'Oth'){
      this.teamName = 'Others';
    }
    else{
      this.teamName = '';
    }
    this.router.navigate(['/CreateTeam']);
  }
}