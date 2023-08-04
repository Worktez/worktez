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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FileUpload } from 'src/app/Interface/FileInterface';
import { BackendService } from 'src/app/services/backend/backend.service';
import { FileUploadService } from 'src/app/services/fileUploadService/file-upload.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';

@Component({
  selector: 'app-create-reward',
  templateUrl: './create-reward.component.html',
  styleUrls: ['./create-reward.component.css']
})
export class CreateRewardComponent implements OnInit {

  componentName: string = "REWARDS";
  assetName: string = "";
  assetSvgurl: string = "";

  
  assetType: string = "";
  description: string = "";


  @Output() getRewards: EventEmitter<string> = new EventEmitter();
  @Input('newDaId') newDaId: string;

  selectedFile: FileList

  basePath:string;
  currentFileUpload: FileUpload;
  fileName: string;
  percentage: number = 0;
  imgUploaded: boolean;



  constructor( public popupHandlerService: PopupHandlerService, private functions: AngularFireFunctions, public backendService: BackendService,  public uploadService: FileUploadService){}
  ngOnInit(){
    this.basePath = '/DigitalAssets/' + this.newDaId;
    this.imgUploaded = false;
  }


  createReward(){
    const callable = this.functions.httpsCallable('rewards/addDigitalAssets');
    const orgDomain = this.backendService.organizationDetails.OrganizationDomain;
    this.uploadDigitalAssetToStorage(this.currentFileUpload, this.basePath, this.newDaId)
    
    callable({OrgDomain: orgDomain, AssetName:this.assetName, AssetSvgUrl: this.assetSvgurl, AssetType: this.assetType, Description: this.description}).subscribe({
      next: (data) => {
        console.log("Successful Next", data);
        
      },
      error: (error) =>{
        console.log(error);
      },
      complete:() =>{
        this.assetName ="";
        this.assetSvgurl="";
        this.assetType="";
        this.description=""
        this.getRewards.emit();
        this.popupHandlerService.createNewRewardEnabled = false;
        this.imgUploaded= false;
        window.location.reload();
      },
    });
  }

  uploadDigitalAssetToStorage(currentFileUpload, basePath, newDaId){
    this.uploadService.pushFileToTaskStorage(currentFileUpload, basePath, newDaId)
    .subscribe({
      next: (percentage) =>{
        this.percentage = Math.round(percentage);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => console.log("Getting Percentage Data Complete")
    }
    );
  }

  onSelectFile(event){
    this.selectedFile = event.target.files;
    const file = this.selectedFile.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.fileName = this.currentFileUpload.file.name;
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.assetSvgurl = event.target.result
    }
    reader.readAsDataURL(file);
    this.imgUploaded = true;
  }

  removeImg(){
    this.assetSvgurl="";
    this.imgUploaded = false;
  }
}
