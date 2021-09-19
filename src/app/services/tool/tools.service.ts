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
    if(email == undefined)
      return undefined;
    
    let startindex = email.indexOf('<')
    let endindex = email.indexOf('>')
    if(startindex > -1 && endindex > -1) {
      return email.substring(startindex+1,endindex);
    } else {
        return email;
    }
  }

  getFormattedDate() {
    return this.date().split('/').reverse().join('-');
  }

}
