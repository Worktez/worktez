import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { SocialPageData } from 'src/app/Interface/SocialInterface';
import { ToolsService } from '../tool/tools.service';
import { UserServiceService } from '../user-service/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class SocialPageServiceService {
  public socialPageDataReady: boolean = false;
  public socialPageDataJson: SocialPageData[] = [];
  currentEpochTime: number = 0; 
  posts: {};
  dataReady: boolean = false;
  constructor( private functions: AngularFireFunctions, private toolsService: ToolsService, public userService: UserServiceService) { }

  getSocialPageData() {
    this.socialPageDataReady = false;
    if(this.currentEpochTime==0){
      this.currentEpochTime = this.toolsService.today().valueOf();
    } else {
      console.log(this.socialPageDataJson);
      this.currentEpochTime = this.socialPageDataJson[this.socialPageDataJson.length-1].LastUpdatedEpochTime;
    }
    const callable = this.functions.httpsCallable('socialPage/getAllSocialPageData');
    callable({CurrentEpochTime: this.currentEpochTime }).subscribe({
      next: (data) => {
        const postsDataArray = data as SocialPageData[];
        this.socialPageDataReady=true;
        for (const key in postsDataArray) {
          if (Object.prototype.hasOwnProperty.call(postsDataArray, key)) {
            const element = postsDataArray[key];
            this.socialPageDataJson.push(element);
            this.userService.checkAndAddToUsersUsingUid(element.Uid);
            this.socialPageDataReady=true;
          }
        }
        this.userService.fetchUserDataUsingUID().subscribe(()=>{
          this.dataReady = true;
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.socialPageDataReady = true;
        console.info('Getting Social Page Data Successful')
      }
    });
  }
}
