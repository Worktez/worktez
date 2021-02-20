import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorHandlerService } from './error-handler.service';

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

    async checkCategory(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_CATEGORY";
            this.errorHandlerService.addError(errorType, "Category field is required")
            return (false);
        }
    }

    async checkAssignee(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_ASSIGNEE";
            this.errorHandlerService.addError("VALIDATION_ASSIGNEE", "Assignee field is required")
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
        if (control.errors === null)
            return (true);
        else {
            let errorType = this.componentName + "_VALIDATION_STARTDATE";
            this.errorHandlerService.addError(errorType, "Start-Date field is required")
            return (false);
        }
    }

    async checkEndDate(value: String) {
        const control = new FormControl(value, Validators.required);
        if (control.errors === null)
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
        if (value1 == null ) {
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
}  