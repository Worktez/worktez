class StoreData {
    constructor(data) {
        this.title = data.Title;
        this.status = data.Status;
        this.priority = data.Priority;
        this.estimatedTime = data.ET;
        this.difficulty = data.Difficulty;
        this.des = data.Description;
        this.creator = data.Creator;
        this.category = data.Category;
        this.assignee = data.Assignee;
        this.logWorkTotalTime = data.LogWorkTotalTime;
        this.workDone = data.WorkDone;
        this.creationDate = data.CreationDate;
    }
}

class StoreSprintData {
    constructor(data) {
        this.sprintStatus = data.sprintStatus;
        this.sprintEndDate = data.sprintEndDate;
        this.sprintStartDate = data.sprintStartDate;
        this.sprintId = data.sprintId;
        this.sprintDetail = data.sprintDetail;
        this.totalDevelopmentTask = data.totalDevelopmentTask;
        this.totalBusinessTask = data.totalBusinessTask;
        this.totalMarketingTask = data.totalMarketingTask;
    }
}