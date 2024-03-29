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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parser } from 'xml2js'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  showError: boolean = false
  errorType: string
  errorDescription: string = " : "
  errorCode: string
  errorComponentarray: string[]
  errorComponentName: string
  public xmlItems: any

  constructor(public http: HttpClient) { }

  addError(errorId: string, error: string) {
    this.errorComponentarray = errorId.split("_");
    this.errorComponentName = this.errorComponentarray[0];
    this.showError = true
    this.getErrorCode(this.errorComponentName, "ExternalError")
    this.errorDescription += error
  }

  loadXML() {
    this.http.get('/assets/errorCodes.xml', {
      headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType: 'text'
    })
      .subscribe((data) => {
        this.parseXML(data).then((data) => {
          this.xmlItems = data;
        });
      });
  }

  parseXML(data: any) {
    return new Promise(resolve => {
      var k: string | number,
        arr = [],
        parser = new Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        var obj = result.Component;
        for (k in obj.SubComponent) {
          var item = obj.SubComponent[k];
          arr.push(item)
        }
        resolve(arr);
      });
    });
  }

  getErrorCode(componentName: string, errorType: string, innerErrorType?:string) {
    let error: string = "00";
    if(innerErrorType == undefined){
      innerErrorType = "Error";
    }
    this.xmlItems.map(item => {
      if (item["$"].name === componentName) {
        error += item["$"].code + '-';
        error += item["SubSystem"][0]["$"].code + '-';
        error += item["SubSystem"][0][errorType][0]["$"].code;
        error += item["SubSystem"][0][errorType][0][innerErrorType][0]["$"].code;
        if (errorType == "InternalError") {
          this.errorDescription = ""
        }
        this.errorType = item["SubSystem"][0][errorType][0][innerErrorType][0]["$"].description;
      }
    })
    this.errorCode = error;
  }

}