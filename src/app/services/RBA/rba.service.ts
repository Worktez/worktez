import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RBAService {
  public isRbaReady : boolean = true;
  public isAdmin : boolean = true;
  constructor() { }
}
