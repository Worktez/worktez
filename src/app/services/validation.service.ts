import { Injectable } from '@angular/core';
import { User } from "../Interface/UserInterface";
import { Tasks } from "../Interface/TasksInterface";
import { FormControl, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})

export class ValidationService {

    constructor() { }

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
            case 'category': {
                return (this.checkCategory(value));
            }
            case 'assignee': {
                return (this.checkAssignee(value));
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
            case 'organizationName': {
                return (this.checkOrgName(value));
            }
            case 'organizationDomain': {
                return (this.checkOrgDomain(value));
            }
            case 'organizationEmail': {
                return (this.checkOrgEmail(value));
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
        }
    }

    async checkValidity(data: any[]) {
        var valid = 0;

        for (const element of data) {
            var condition = await this.validation(element.label, element.value).then(res => {
                return res;
            });
            if (condition) {
                valid += 1;
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
            console.log("Title field is required");
            return (false);
        }
    }

    async checkStatus(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Status field is required");
            return (false);
        }
    }

    async checkPriority(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Priority field is required");
            return (false);
        }
    }

    async checkEstimatedTime(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Estimated-Time field is required");
            return (false);
        }
    }

    async checkDifficulty(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Difficulty field is required");
            return (false);
        }
    }

    async checkDescription(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Description field is required");
            return (false);
        }
    }

    async checkCreator(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Creator field is required");
            return (false);
        }
    }

    async checkCategory(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Category field is required");
            return (false);
        }
    }

    async checkAssignee(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Assignee field is required");
            return (false);
        }
    }

    async checkCreationDate(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Creation-Date field is required");
            return (false);
        }
    }

    async checkSprintNumber(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Sprint-Number field is required");
            return (false);
        }
    }

    async checkStoryPoint(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Story-Point field is required");
            return (false);
        }
    }

    async checkStartDate(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Start-Date field is required");
            return (false);
        }
    }

    async checkEndDate(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("End-Date field is required");
            return (false);
        }
    }

    async checkLogHours(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Log-Hours field is required");
            return (false);
        }
    }

    async checkWorkCompleted(value: number) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Work-Completed field is required");
            return (false);
        }
    }

    async checkComment(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Comment field is required");
            return (false);
        }
    }
    async checkSprintRange(value1: number, value2: number) {
        if (value1 >= value2) {
            console.log("Start Range should not be greater or equal to End Range");
            return (false)
        }
        if (value1 <= 0) {
            console.log("Start Range should not be less than 1");
            return (false)
        }
        if (value2 <= 0) {
            console.log("End Range should not be less than 1");
            return (false)
        }
        return (true)
    }
    async checkEmail(value: String) {
        const control = new FormControl(value, [Validators.required, Validators.email]);
        if (control.errors === null)
            return (true);
        else {
            console.log("Email is badly formatted");
            return (false);
        }
    }
    async checkUsername(value: String) {
        const control = new FormControl(value, [Validators.required, Validators.minLength(3)]);
        if (control.errors === null)
            return (true);
        else {
            console.log("Username should be greater than 2 characters");
            return (false);
        }
    }
    async checkPassword(value: string) {
        const control = new FormControl(value, [Validators.required, Validators.minLength(6)]);
        if (control.errors === null)
            return (true);
        else {
            console.log("Password should be greater than 5 characters");
            return (false);
        }
    }
    async checkOrgName(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Organization Name field is required");
            return (false);
        }
    }
    async checkOrgDomain(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Organization Domain field is required");
            return (false);
        }
    }
    async checkOrgEmail(value: string) {
        const control = new FormControl(value, [Validators.required, Validators.email]);
        if (control.errors === null)
            return (true);
        else {
            console.log("Organization Email field is required");
            return (false);
        }
    }
    async checkTeamName(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Team Name field is required");
            return (false);
        }
    }
    async checkTeamId(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Team Id field is required");
            return (false);
        }
    }
    async checkTeamDescription(value: string) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            console.log("Team Description field is required");
            return (false);
        }
    }
    async checkTeamManagerEmail(value: string) {
        const control = new FormControl(value, [Validators.required, Validators.email]);
        if (control.errors === null)
            return (true);
        else {
            console.log("Team Manager field is required");
            return (false);
        }
    }
    async checkTeamMemberEmails(value: string) {
        const memberEmails = value.split(",").map(member => member.trim());
        let hasNoError;
        console.log(memberEmails);
        if (memberEmails.filter((e, i, a) => a.indexOf(e) !== i).length > 0) {
            console.log("Matching Team Member Emails are not Allowed");
            return (false);
        }
        if (memberEmails.length >= 10) {
            console.log("Only 10 Team Member's Email is required");
            return (false);
        }
        memberEmails.map((member, index) => {
            const control = new FormControl(member, [Validators.required, Validators.email]);
            if (control.errors === null)
                hasNoError = true
            else {
                console.log(`Team Member ${index + 1} Email is required`);
                hasNoError = false
            }
        });
        return hasNoError;
    }
}  