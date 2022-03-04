/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-release-notes-body',
  templateUrl: './release-notes-body.component.html',
  styleUrls: ['./release-notes-body.component.css']
})
export class ReleaseNotesBodyComponent implements OnInit {
  @Input('body') body: string 
  bodyArray: Array<string>
  versionName: string;
  releaseDate: string;
  featuresArray: Array<string>
  constructor() {

   }

  ngOnInit(): void {
    this.bodyArray=this.body.split("\n")
    this.featuresArray=this.bodyArray.slice(this.bodyArray.indexOf('## Feature Release:\r'),this.bodyArray.indexOf('## Release Credit:\r'))
    this.versionName = this.bodyArray[2]
    this.versionName=this.versionName.replace('**','')
    this.versionName=this.versionName.replace('**','')

    this.releaseDate=this.bodyArray[3]
    this.releaseDate=this.releaseDate.replace('**','')
    this.releaseDate=this.releaseDate.replace('**','')

    this.featuresArray[0]=this.featuresArray[0].replace('##','')
  }
  
}
