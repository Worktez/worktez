/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const admin = require("firebase-admin");
admin.initializeApp();

const { users } = require("./model/users/users");
const { tasks } = require("./model/tasks/tasks");
const { organization } = require("./model/organization/organization");
const { teams } = require("./model/teams/teams");
const { sprints } = require("./model/sprints/sprints");
const { patch } = require("./model/patch/patch");
const { tasksEvaluation } = require("./model/tasksEvaluation/tasksEvaluation");
const { performanceChart } = require("./model/performanceChart/performanceChart");
// const updateSprintStatusAPI = require("./updateSprintStatusAPI");
// const createNewOrgAPI = require("./createNewOrgAPI");
// const patch1API = require("./patch1API");
// const verifyUserAPI = require("./verifyUserAPI");
// const updateUserProfileAPI = require("./updateUserProfileAPI");
// const updateThemeAPI = require("./updateUserProfileAPI");
// const patch1API = require("./patch1API");
// const patch2API = require("./patch2API");
// const patch3API = require("./patch3API");


// class Task {
//     constructor(id, title, status, priority, estimatedTime, difficulty, description, creator, project , assignee, logWorkTotalTime, workDone, creationDate, sprintNumber, storyPointNumber) {
//         this.Id = id;
//         this.Title = title;
//         this.Status = status;
//         this.Priority = priority;
//         this.EstimatedTime = estimatedTime;
//         this.Difficulty = difficulty;
//         this.Description = description;
//         this.Creator = creator;
//         this.Project = project;
//         this.Assignee = assignee;
//         this.LogWorkTotalTime = logWorkTotalTime;
//         this.WorkDone = workDone;
//         this.CreationDate = creationDate;
//         this.SprintNumber = sprintNumber;
//         this.StoryPointNumber = storyPointNumber;
//     }
// }
const { performanceChart } = require("./model/performanceChart/performanceChart")
const { activity } = require("./model/activity/activity")

exports.users = users;
exports.tasks = tasks;
exports.organization = organization;
exports.teams = teams;
exports.sprints = sprints;
exports.patch = patch;
exports.tasksEvaluation = tasksEvaluation;
exports.performanceChart = performanceChart;
exports.activity = activity;