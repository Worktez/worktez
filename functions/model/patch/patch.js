/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors } = require("../application/lib");
const { patch1 } = require("./patch1");
const { patch2 } = require("./patch2");
const { patch3 } = require("./patch3");
const { patch4 } = require("./patch4");
const { patch5 } = require("./patch5");
const { patchModerator } = require("./patchModerator");
const { editPatch } = require("./editPatch");
const { patch6 } = require("./patch6");
const { patch7 } = require("./patch7");
const { patch8 } = require("./patch8");

exports.patch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "patch1") {
            // To fix counters of all sprints
            return patch1(request, response);
        } else if (mode == "patch2") {
            // To add a new field and value to all tasks
            return patch2(request, response);
        } else if (mode == "patch3") {
            // To change a particular field in relevent tasks
            return patch3(request, response);
        } else if (mode == "patch4") {
            // To update the uid for previous activities
            return patch4(request, response);
        } else if (mode == "patch5") {
            // To update the userDoc for all Users to change Organization structure
            return patch5(request, response);
        } else if (mode == "patch6") {
            // To update the Sprints collections with new field values
            return patch6(request, response);
        } else if (mode == "patch7") {
            // To add a new field to the organization
            return patch7(request, response);
        } else if (mode == "patch8") {
            // To add a new field and value to teams
            return patch8(request, response);
        } else if (mode == "patchModerator") {
            return patchModerator(request, response);
        } else if (mode == "edit") {
            return editPatch(request, response);
        }
    });
});