/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author:Aditya Khedekar <aditya3034@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { Reward } from 'src/app/Interface/RewardInterface';
import { NavbarHandlerService } from 'src/app/services/navbar-handler/navbar-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-rewards-page',
  templateUrl: './rewards-page.component.html',
  styleUrls: ['./rewards-page.component.css']
})
export class RewardsPageComponent implements OnInit {

  createNewReward: boolean = false;
  showLoader: boolean = false;
  rewardsData: Reward[] = [];
  pvtRewardsData: Reward[] = [];
  rewardUrl: string[] = [];
  newDaId: string = "";


  constructor(public navbarHandler: NavbarHandlerService, public popupHandlerService: PopupHandlerService, private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    this.navbarHandler.resetNavbar();
    this.navbarHandler.addToNavbar("REWARDS PAGE");
    this.getDigitalAssets()
  }
  
  createReward() {
    this.createNewReward = true;
    this.popupHandlerService.createNewRewardEnabled = true;
  }

  getDigitalAssets() {
    const callable = this.functions.httpsCallable('rewards/getDigitalAssets');
    callable({}).pipe(
      map(actions => {
        return actions.data as Reward[];
      })).subscribe({
        next: (data) => {
          if (data) {
            this.rewardsData = data;
            this.rewardsData.forEach((reward) => {
              reward.AssetSignature = atob(reward.AssetSignature);
            })
            if(this.rewardsData.length>0){
              this.filterRewards(this.rewardsData);
            }
            const totalDigitalAsset = this.rewardsData.length;
            const newDaNumber = totalDigitalAsset + 1;
            this.newDaId = "Da" + newDaNumber;
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          console.info("Fetched Rewards Data Successfully");
          this.showLoader = false;
        }
      });
  }



  getNewDaId(rewardsData) {
    const totalDigitalAsset = rewardsData.length;
    this.newDaId = "Da" + totalDigitalAsset;
  }

  filterRewards(rewardsData) {
    rewardsData.forEach((reward) => {
      if (reward.AssetType == 'Private') {
        this.pvtRewardsData.push(reward);
        const index = rewardsData.indexOf(reward);
        if (index !== -1) {
          rewardsData.splice(index, 1);
        }
      }
    })
  }
}
