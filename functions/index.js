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
const { performanceChart } = require("./model/performanceChart/performanceChart")
const { activity } = require("./model/activity/activity")

exports.users = users;
exports.tasks = tasks;
exports.organization = organization;
exports.teams = teams;
exports.sprints = sprints;
exports.patch = patch;
exports.performanceChart = performanceChart;
exports.activity = activity;