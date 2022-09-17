/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const admin = require("firebase-admin");

if (admin.apps.length === 0) {
    admin.initializeApp();
}

const { users } = require("./model/users/users");
const { tasks } = require("./model/tasks/tasks");
const { organization } = require("./model/organization/organization");
const { teams } = require("./model/teams/teams");
const { sprints } = require("./model/sprints/sprints");
const { patch } = require("./model/patch/patch");
const { tasksEvaluation } = require("./model/tasksEvaluation/tasksEvaluation");
const { performanceChart } = require("./model/performanceChart/performanceChart");
const { activity } = require("./model/activity/activity");
const { librarian } = require("./model/librarian/librarian");
const { notifications } = require("./model/notifications/notifications");
const { contributors } = require("./model/contributors/contributors");
const { scheduledFn, scheduledFnManually } = require("./model/scheduledFunctions/scheduledFn");
const { linker } = require("./model/linker/linker");
const { quickNotes } = require("./model/quickNotes/quickNotes");
const { socialPage } = require("./model/socialPage/socialPage");
const { milestone } = require("./model/milestone/milestone");
const { filters } = require("./model/filters/filters");
const { requestDemo } = require("./model/requestDemo/requestDemo");
const { meet } = require("./model/meet/meet");

exports.users = users
exports.tasks = tasks;
exports.organization = organization;
exports.teams = teams;
exports.sprints = sprints;
exports.patch = patch;
exports.tasksEvaluation = tasksEvaluation;
exports.performanceChart = performanceChart;
exports.activity = activity;
exports.librarian = librarian;
exports.notifications = notifications;
exports.contributors = contributors;
exports.scheduledFn = scheduledFn;
exports.linker = linker;
exports.quickNotes = quickNotes;
exports.socialPage = socialPage;
exports.scheduledFnManually = scheduledFnManually;
exports.milestone = milestone;
exports.filters = filters;
exports.requestDemo = requestDemo;
exports.meet = meet;