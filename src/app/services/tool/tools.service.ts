import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  todayDate: string
  todayTime: string

  constructor() { }

  date(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return this.todayDate = dd + "/" + mm + "/" + yyyy;
  }

  time(){
    var today = new Date();
    var hh = String(today.getHours()).padStart(2, '0');
    var mn = String(today.getMinutes()).padStart(2, '0');
    var ss= String(today.getSeconds()).padStart(2, '0');
    return this.todayTime = hh + ":" + mn + ":" + ss;
  }

  getEmailString(email: string){
    let startindex = email.indexOf('<')
    let endindex = email.indexOf('>')

    if(startindex > -1 && endindex > -1) {
      return email.substring(startindex+1,endindex);
    } else {
      if(this.validateEmail(email)) {
        return email;
      } else {
        return undefined;
      }
    }
  }

  validateEmail(email: string) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

  getFormattedDate() {
    return this.date().split('/').reverse().join('-');
  }

}