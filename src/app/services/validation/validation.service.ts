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
import { FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Injectable({
    providedIn: 'root',
})

export class ValidationService {
    componentName: string = "";

    constructor(public errorHandlerService: ErrorHandlerService) { }

    validation(label: any, value: any) {
        switch (label) {
            case 'title': {
                return this.checkTitle(value);
            }
            case 'status': {
                return this.checkStatus(value);
            }
            case 'priority': {
                return (this.checkPriority(value));
            }
            case 'estimatedTime': {
                return (this.checkEstimatedTime(value));
            }
            case 'difficulty': {
                return (this.checkDifficulty(value));
            }
            case 'description': {
                return (this.checkDescription(value));
            }
            case 'creator': {
                return (this.checkCreator(value));
            }
            case 'project': {
                return (this.checkProject(value));
            }
            case 'assignee': {
                return (this.checkAssignee(value));
            }
            case 'reporter': {
                return (this.checkReporter(value));
            }
            case 'creationDate': {
                return (this.checkCreationDate(value));
            }
            case 'sprintNumber': {
                return (this.checkSprintNumber(value));
            }
            case 'storyPoint': {
                return (this.checkStoryPoint(value));
            }
            case 'startDate': {
                return (this.checkStartDate(value));
            }
            case 'endDate': {
                return (this.checkEndDate(value));
            }
            case 'logHours': {
                return (this.checkLogHours(value));
            }
            case 'workCompleted': {
                return (this.checkWorkCompleted(value));
            }
            case 'comment': {
                return (this.checkComment(value));
            }
            case 'userEmail': {
                return (this.checkUserEmail(value));
            }
            case 'userName': {
                return (this.checkUserName(value));
            }
            case 'userPassword': {
                return (this.checkUserPassword(value));
            }
            case 'organizationName': {
                return (this.checkOrgName(value));
            }
            case 'organizationDomain': {
                return (this.checkOrgDomain(value));
            }
            case 'organizationEmail': {
                return (this.checkOrgEmail(value));
            }
            case "organizationLogo": {
                return (this.checkOrgLogo(value));
            }
            case 'teamName': {
                return (this.checkTeamName(value));
            }
            case 'teamId': {
                return (this.checkTeamId(value));
            }
            case 'teamDescription': {
                return (this.checkTeamDescription(value));
            }
            case 'teamManagerEmail': {
                return (this.checkTeamManagerEmail(value));
            }
            case 'teamMemberEmails': {
                return (this.checkTeamMemberEmails(value));
            }
            case 'instituteName': {
                return (this.checkinstituteName(value));
            }
            case 'degree': {
                return (this.checkdegree(value));
            }
            case 'projectName': {
                return (this.checkprojectName(value));
            }
            case 'description': {
                return (this.checkdescription(value));
            }
            case 'skill': {
                return (this.checkskill(value));
            }
            case 'position': {
                return (this.checkposition(value));
            }
            case 'url':{
                return(this.checkURL(value));
            }


        }
    }

    async checkValidity(componentName: string, data: any[]) {
        var valid = 0;
        this.componentName = componentName;
        for (const element of data) {
            var condition = await this.validation(element.label, element.value).then(res => {
                return res;
            });
            if (condition) {
                valid += 1;
            }
            else {
                break;
            }
        }
        if (valid == data.length)
            return (true);
        else
            return (false);
    }

    async checkTitle(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "Title field is required")
            return (false);
        }
    }

    async checkStatus(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_STATUS";
            this.errorHandlerService.addError(errorType, "Status field is required")
            return (false);
        }
    }

    async checkPriority(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_PRIORITY";
            this.errorHandlerService.addError(errorType, "Priority field is required")
            return (false);
        }
    }

    async checkEstimatedTime(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ESTIMATEDTIME";
            this.errorHandlerService.addError(errorType, "Estimated-Time field is required")
            return (false);
        }
    }

    async checkDifficulty(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_DIFFICULTY";
            this.errorHandlerService.addError(errorType, "Difficulty field is required")
            return (false);
        }
    }

    async checkDescription(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_DESCRIPTION";
            this.errorHandlerService.addError(errorType, "Description field is required")
            return (false);
        }
    }

    async checkCreator(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_CREATOR";
            this.errorHandlerService.addError(errorType, "Creator field is required")
            return (false);
        }
    }

    async checkProject(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_PROJECT";
            this.errorHandlerService.addError(errorType, "Project field is required")
            return (false);
        }
    }

    async checkAssignee(value: String) {
        const control = new FormControl(value, Validators.required);
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = regularExpression.test(String(value).toLowerCase());
        if (control.errors === null && result == true)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ASSIGNEE";
            this.errorHandlerService.addError(errorType, "Assignee field is required")
            return (false);
        }
    }

    async checkReporter(value: String) {
        const control = new FormControl(value, Validators.required);
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const result = regularExpression.test(String(value).toLowerCase());
        if (control.errors === null && result == true)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_REPORTER";
            this.errorHandlerService.addError(errorType, "Reporter field is required")
            return (false);
        }
    }

    async checkCreationDate(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_CREATIONDATE";
            this.errorHandlerService.addError(errorType, "Creation-Date field is required")
            return (false);
        }
    }

    async checkSprintNumber(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_SPRINTNUMBER";
            this.errorHandlerService.addError(errorType, "Sprint-Number field is required")
            return (false);
        }
    }

    async checkStoryPoint(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_STORYPOINT";
            this.errorHandlerService.addError(errorType, "Story-Point field is required")
            return (false);
        }
    }

    async checkStartDate(value: String) {
        const control = new FormControl(value, Validators.required);
        const regularExpression = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        const result = regularExpression.test(String(value));
        if (control.errors === null && result == true)
            return (true);
        else {
            console.log(this.componentName);

            let errorType = this.componentName + "_VALIDATION_STARTDATE";
            this.errorHandlerService.addError(errorType, "Start-Date field is required")
            return (false);
        }
    }

    async checkEndDate(value: String) {
        const control = new FormControl(value, Validators.required);
        const regularExpression = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        const result = regularExpression.test(String(value));
        if (control.errors === null && result == true)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ENDDATE";
            this.errorHandlerService.addError(errorType, "End-Date field is required")
            return (false);
        }
    }

    async checkLogHours(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_LOGHOURS";
            this.errorHandlerService.addError(errorType, "Log-Hours field is required")
            return (false);
        }
    }

    async checkWorkCompleted(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_WORKCOMPLETED";
            this.errorHandlerService.addError(errorType, "Work-Completed field is required")
            return (false);
        }
    }

    async checkComment(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_COMMENT";
            this.errorHandlerService.addError(errorType, "Comment field is required")
            return (false);
        }
    }
    async checkSprintRange(value1: number, value2: number) {
        let errorType = "RANGE-CARD" + "_VALIDATION_RANGE";
        if (value1 == null) {
            this.errorHandlerService.addError(errorType, "Start Range should not be Empty")
            return (false)
        }
        if (value2 == null) {
            this.errorHandlerService.addError(errorType, "End Range should not be Empty")
            return (false)
        }
        if (value1 >= value2) {
            this.errorHandlerService.addError(errorType, "Start Range should not be greater or equal to End Range")
            return (false)
        }
        if (value1 <= 0) {
            this.errorHandlerService.addError(errorType, "Start Range should not be less than 1")
            return (false)
        }
        if (value2 <= 0) {
            this.errorHandlerService.addError(errorType, "End Range should not be less than 1")
            return (false)
        }

        return (true)
    }
    async checkUserEmail(value: String) {
        const control = new FormControl(value, [Validators.required, Validators.email]);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_USER_EMAIL";
            this.errorHandlerService.addError(errorType, "Email is badly formatted")
            return (false);
        }
    }
    async checkUserName(value: String) {
        const control = new FormControl(value, [Validators.required, Validators.minLength(3)]);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_USER_NAME";
            this.errorHandlerService.addError(errorType, "Username should be greater than 2 characters")
            return (false);
        }
    }
    async checkUserPassword(value: string) {
        const control = new FormControl(value, [Validators.required, Validators.minLength(6)]);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_USER_PASSWORD";
            this.errorHandlerService.addError(errorType, "Password should be greater than 5 characters")
            return (false);
        }
    }
    async checkOrgName(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ORG_NAME";
            this.errorHandlerService.addError(errorType, "Organization Name field is required")
            return (false);
        }
    }
    async checkOrgDomain(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ORG_DOMAIN";
            this.errorHandlerService.addError(errorType, "Organization Domain field is required")
            return (false);
        }
    }
    async checkOrgEmail(value: string) {
        const control = new FormControl(value, [Validators.required, Validators.email]);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ORG_EMAIL";
            this.errorHandlerService.addError(errorType, "Organization Email field is required")
            return (false);
        }
    }
    async checkOrgLogo(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ORG_LOGO";
            this.errorHandlerService.addError(errorType, "Organization Logo field is required")
            return (false);
        }
    }
    async checkTeamName(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TEAM_NAME";
            this.errorHandlerService.addError(errorType, "Team Name field is required")
            return (false);
        }
    }
    async checkTeamId(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TEAM_ID";
            this.errorHandlerService.addError(errorType, "Team Id field is required")
            return (false);
        }
    }
    async checkTeamDescription(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TEAM_DESCRIPTION";
            this.errorHandlerService.addError(errorType, "Team Description field is required")
            return (false);
        }
    }
    async checkTeamManagerEmail(value: string) {
        const control = new FormControl(value, [Validators.required, Validators.email]);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TEAM_MANAGER_EMAIL";
            this.errorHandlerService.addError(errorType, "Team Manager field is required")
            return (false);
        }
    
    }

    async checkinstituteName(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "Institute Name field is required")
            return (false);
        }
    }

    async checkdegree(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "degree field is required")
            return (false);
        }
    }
     
    async checkprojectName(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "projectName field is required")
            return (false);
        }
    }

    async checkdescription(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "description field is required")
            return (false);
        }
    }

    async checkskill(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "skill field is required")
            return (false);
        }
    }

    async checkposition(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_TITLE";
            this.errorHandlerService.addError(errorType, "position field is required")
            return (false);
        }
    }



    async checkTeamMemberEmails(value: string[]) {
        let hasNoError;
        let errorType = this.componentName + "_VALIDATION_TEAM_MEMBER_EMAILS";

        if (value.filter((e, i, a) => a.indexOf(e) !== i).length > 0) {
            this.errorHandlerService.addError(errorType, "Matching Team Member Emails are not Allowed");
            return (false);
        }
        if (value.length >= 10) {
            this.errorHandlerService.addError(errorType, "Only 10 Team Member's Email is required");
            return (false);
        }
        value.map((member, index) => {
            const control = new FormControl(member, [Validators.required, Validators.email]);
            if (control.errors === null)
                hasNoError = true
            else {
                this.errorHandlerService.addError(errorType, `Team Member ${index + 1} Email is required. `);
                hasNoError = false
            }
        });
        return hasNoError;
    }

    async checkURL(value: string[]){
        const control = new FormControl(value, Validators.required);
        const regularExpression = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
        const result = regularExpression.test(String(value).toLowerCase());
        if (control.errors === null && result == true)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_URL";
            this.errorHandlerService.addError(errorType, "Invalid URL")
            return (false);
        }
    }
}  