const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const createNewTaskAPI = require('./createNewTaskAPI');
const startNewSprintAPI = require('./startNewSprintAPI');
const logWorkAPI = require('./logWorkAPI');
const editPageTaskAPI = require('./editPageTaskAPI');
const deleteTaskAPI = require('./deleteTaskAPI');
const createNewUserAPI = require('./createNewUserAPI');
const updateSprintStatusAPI = require('./updateSprintStatusAPI');
const patchAPI = require('./patchAPI');
const activityPatchAPI = require('./activityPatchAPI');

// class Task {
//     constructor(id, title, status, priority, estimatedTime, difficulty, description, creator, category, assignee, logWorkTotalTime, workDone, creationDate, sprintNumber, storyPointNumber) {
//         this.Id = id;
//         this.Title = title;
//         this.Status = status;
//         this.Priority = priority;
//         this.EstimatedTime = estimatedTime;
//         this.Difficulty = difficulty;
//         this.Description = description;
//         this.Creator = creator;
//         this.Category = category;
//         this.Assignee = assignee;
//         this.LogWorkTotalTime = logWorkTotalTime;
//         this.WorkDone = workDone;
//         this.CreationDate = creationDate;
//         this.SprintNumber = sprintNumber;
//         this.StoryPointNumber = storyPointNumber;
//     }
// }

exports.createNewTask = createNewTaskAPI.createNewTask;
exports.startNewSprint = startNewSprintAPI.startNewSprint;
exports.logWork = logWorkAPI.logWork;
exports.editPageTask = editPageTaskAPI.editPageTask;
exports.deleteTask = deleteTaskAPI.deleteTask;
exports.createNewUser = createNewUserAPI.createNewUser;
exports.updateSprintStatus = updateSprintStatusAPI.updateSprintStatus;
exports.addCompletionDatePatch = patchAPI.addCompletionDatePatch;
exports.activityCollectionPatch = activityPatchAPI.activityCollectionPatch;