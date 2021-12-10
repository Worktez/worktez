import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupHandlerService {

  createNewSprintEnabled: boolean = false
  createNewTaskEnabled: boolean = false
  editProfileEnabled: boolean = false
  editEducationEnabled: boolean = false
  
  constructor() { }

}
