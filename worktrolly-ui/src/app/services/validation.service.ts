import { Injectable } from '@angular/core';
import { User } from "../Interface/UserInterface";
import { Tasks } from "../Interface/TasksInterface";
import { FormControl, Validators } from '@angular/forms';

@Injectable({    
    providedIn: 'root',
})    

export class ValidationService {    

    constructor() { }    

    validation(label:any, value:any){
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
            case 'startDate': { 
                return(this.checkStartDate(value));
            } 
            case 'endDate': { 
                return(this.checkEndDate(value));
            }
            case 'logHours': { 
                return(this.checkLogHours(value));
            } 
            case 'workCompleted': { 
                return(this.checkWorkCompleted(value));
            } 
            case 'comment': { 
                return(this.checkComment(value));
            } 
        }
    }

    async checkValidity(data: any[]){
        var valid = 0;
        
        for (const element of data) {
            var condition = await this.validation(element.label, element.value).then(res => {
                return res;});
            if(condition)
            {
                valid+=1;
            }
        }
        if (valid == data.length)
            return (true);
        else
            return(false);
    }

    async checkTitle(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Title field is required");
            return(false);
        }
    }

    async checkStatus(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Status field is required");
            return(false);
        }
    }

    async checkPriority(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Priority field is required");
            return(false);
        }    
    }

    async checkEstimatedTime(value: number){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Estimated-Time field is required");
            return(false);
        }    
    }

    async checkDifficulty(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Difficulty field is required");
            return(false);
        }
    }

    async checkDescription(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Description field is required");
            return(false);
        }
    }

    async checkCreator(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Creator field is required");
            return(false);
        }
    }

    async checkCategory(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Category field is required");
            return(false);
        }    
    }

    async checkAssignee(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Assignee field is required");
            return(false);
        }   
    }

    async checkCreationDate(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Creation-Date field is required");
            return(false);
        }   
    }

    async checkSprintNumber(value: number){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Sprint-Number field is required");
            return(false);
        }   
    }

    async checkStoryPoint(value: number){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Story-Point field is required");
            return(false);
        }  
    }

    async checkStartDate(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Start-Date field is required");
            return(false);
        }  
    }

    async checkEndDate(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("End-Date field is required");
            return(false);
        }  
    }

    async checkLogHours(value: number){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Log-Hours field is required");
            return(false);
        }  
    }

    async checkWorkCompleted(value: number){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Work-Completed field is required");
            return(false);
        }  
    }

    async checkComment(value: String){
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return(true);
        else{
            console.log("Comment field is required");
            return(false);
        }  
    }

}    