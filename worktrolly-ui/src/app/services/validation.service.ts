import { Injectable } from '@angular/core';
import { User } from "../Interface/UserInterface";
import { Tasks } from "../Interface/TasksInterface";
import { Validators } from '@angular/forms';

@Injectable({    
    providedIn: 'root',
})    

export class ValidationService {    

    constructor() { }    

    async checkValidity(label:String, value:any){
        switch(label)
        {
            case 'title': { 
                return this.checkTitle(value);
            } 
            case 'status': { 
                return this.checkStatus(value);
            } 
            case 'priority': { 
                return(this.checkPriority(value)); 
            } 
            case 'estimatedTime': { 
                return(this.checkEstimatedTime(value));
            } 
            case 'difficulty': { 
                return(this.checkDifficulty(value));
            } 
            case 'description': { 
                return(this.checkDescription(value));
            } 
            case 'creator': { 
                return(this.checkCreator(value));
            } 
            case 'category': { 
                return(this.checkCategory(value));
            } 
            case 'assignee': { 
                return(this.checkAssignee(value));
            } 
            case 'creationDate': { 
                return(this.checkCreationDate(value));
            } 
            case 'sprintNumber': { 
                return(this.checkSprintNumber(value));
            } 
            case 'storyPoint': { 
                return(this.checkStoryPoint(value));
            } 
        }
    }


    async checkTitle(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Title field is required");
            return(false);
        }
    }

    async checkStatus(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Status field is required");
            return(false);
        }
    }

    async checkPriority(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Priority field is required");
            return(false);
        }    
    }

    async checkEstimatedTime(value: number){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Estimated-Time field is required");
            return(false);
        }    
    }

    async checkDifficulty(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Title field required");
            return(false);
        }
    }

    async checkDescription(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Description field is required");
            return(false);
        }
    }

    async checkCreator(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Creator field is required");
            return(false);
        }
    }

    async checkCategory(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Categpry field is required");
            return(false);
        }    
    }

    async checkAssignee(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Assignee field is required");
            return(false);
        }   
    }

    async checkCreationDate(value: String){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Creation-Date field is required");
            return(false);
        }   
    }

    async checkSprintNumber(value: number){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Sprint-Number field is required");
            return(false);
        }   
    }

    async checkStoryPoint(value: number){
        if (Validators.required ===null)
            return(true);
        else{
            console.log("Storyu-Point field required");
            return(false);
        }  
    }

}    