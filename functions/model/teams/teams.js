/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors } = require("../application/lib");
const { createTeam } = require("./createTeam");
const { addMember } = require("./addMember");
const { removeMember } = require("./removeMember");
const { updateTeam } = require("./updateTeam");
const { getTeamData } = require("./getTeamData");
const { deleteTeam } = require("./deleteTeam");

exports.teams = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;
        if (mode == "create") {
            return createTeam(request, response);
        } else if (mode == "update") {
            return updateTeam(request, response);
        } else if (mode == "add-member") {
            return addMember(request, response);
        } else if (mode == "remove-member") {
            return removeMember(request, response);
        } else if (mode == "getTeamData") {
            return getTeamData(request, response);
        } else if (mode == "delete") {
            return deleteTeam(request, response);
        }
    });
});