/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors } = require("../application/lib");
const { createNewUser } = require("./createNewUser");
const { updateUser } = require("./updateUser");
const { updateTheme } = require("./updateTheme");
const { verifyUser } = require("./verifyUser");
const { getUserAppSettings } = require("./getUserAppSettings");
const { checkAvailableUsername } = require("./checkAvailableUsername");
const { getMyOrgList } = require("./getMyOrgList");
const { getMyTeamsList } = require("./getMyTeamsList");
const { setMyOrganization } = require("./setMyOrganization");
const { updateSelectedTeam } = require("./updateSelectedTeam");
const { getUserByEmail } = require("./getUserByEmail");
const { getPhotoURLList } = require("./getPhotoURLList");
const { getMyOrgCollectionDocs } = require("./getMyOrgCollectionDoc");
const { addEducation } = require("./addEducation");
const { getEducationList } = require("./getEducationList");
const { updateEducation } = require("./updateEducation");
const { getExperienceList } = require("./getExperienceList");
const { updateExperience } = require("./updateExperience");
const { addExperience } = require("./addExperience");
const { getProjectList } = require("./getProjectList");
const { updateProject } = require("./updateProject");
const { addProject } = require("./addProject");
const { updateUserSkill } = require("./updateSkills");

exports.users = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "create") {
            return createNewUser(request, response);
        } else if (mode == "update") {
            return updateUser(request, response);
        } else if (mode == "update-theme") {
            return updateTheme(request, response);
        } else if (mode == "verify") {
            return verifyUser(request, response);
        } else if (mode == "getUserAppSettings") {
            return getUserAppSettings(request, response);
        } else if (mode == "getUserByEmail") {
            return getUserByEmail(request, response);
        } else if (mode == "CheckAvailableUsername") {
            return checkAvailableUsername(request, response);
        } else if (mode == "getMyOrgList") {
            return getMyOrgList(request, response);
        } else if (mode == "getMyTeamsList") {
            return getMyTeamsList(request, response);
        } else if (mode == "setMyOrganization") {
            return setMyOrganization(request, response);
        } else if (mode == "updateSelectedTeam") {
            return updateSelectedTeam(request, response);
        } else if (mode == "getPhotoURLList") {
            return getPhotoURLList(request, response);
        } else if (mode == "getMyOrgCollectionDocs") {
            return getMyOrgCollectionDocs(request, response);
        } else if (mode == "addEducation") {
            return addEducation(request, response);
        } else if (mode == "updateEducation") {
            return updateEducation(request, response);
        } else if (mode == "getAllEducation") {
            return getEducationList(request, response);
        } else if (mode == "addExperience") {
            return addExperience(request, response);
        } else if (mode == "updateExperience") {
            return updateExperience(request, response);
        } else if (mode == "getAllExperience") {
            return getExperienceList(request, response);
        } else if (mode == "addProject") {
            return addProject(request, response);
        } else if (mode == "updateProject") {
            return updateProject(request, response);
        } else if (mode == "getAllProject") {
            return getProjectList(request, response);
        } else if (mode == "updateSkill") {
            return updateUserSkill(request, response);
        }
    });
});