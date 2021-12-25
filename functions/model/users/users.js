/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { updateUser } = require("./tark/updateUser");
const { updateTheme } = require("./tark/updateTheme");
const { verifyUser } = require("./tark/verifyUser");
const { checkAvailableUsername } = require("./tark/checkAvailableUsername");
const { getMyOrgList } = require("./tark/getMyOrgList");
const { getMyTeamsList } = require("./tark/getMyTeamsList");
const { setMyOrganization } = require("./tark/setMyOrganization");
const { updateSelectedTeam } = require("./tark/updateSelectedTeam");
const { getUserByEmail } = require("./tark/getUserByEmail");
const { getPhotoURLList } = require("./tark/getPhotoURLList");
const { getMyOrgCollectionDocs } = require("./tark/getMyOrgCollectionDoc");
const { createNewUser } = require("./tark/createNewUser");
const { getUserAppSettings } = require("./tark/getUserAppSettings");
const { getEducationList } = require("./tark/getEducationList");
const { getExperienceList } = require("./tark/getExperienceList");
const { getProjectList } = require("./tark/getProjectList");
const { updateEducation } = require("./tark/updateEducation");
const { updateExperience } = require("./tark/updateExperience");
const { updateProject } = require("./tark/updateProject");
const { addEducation } = require("./tark/addEducation");
const { addExperience } = require("./tark/addExperience");
const { addProject } = require("./tark/addProject");
const { updateUserSkill } = require("./tark/updateSkills");


fastify.post("/createNewUser", (req, res) => {
  createNewUser(req, res);
});

fastify.post("/getUserAppSettings", (req, res) => {
  getUserAppSettings(req, res);
});

fastify.post("/checkAvailableUsername", (req, res) => {
  checkAvailableUsername(req, res);
});

fastify.post("/getMyOrgCollectionDocs", (req, res) => {
  getMyOrgCollectionDocs(req, res);
});

fastify.post("/getMyOrgList", (req, res) => {
  getMyOrgList(req, res);
});

fastify.post("/getMyTeamsList", (req, res) => {
  getMyTeamsList(req, res);
});

fastify.post("/getPhotoURLList", (req, res) => {
  getPhotoURLList(req, res);
});

fastify.post("/getUserByEmail", (req, res) => {
  getUserByEmail(req, res);
});

fastify.post("/setMyOrganization", (req, res) => {
  setMyOrganization(req, res);
});

fastify.post("/updateSelectedTeam", (req, res) => {
  updateSelectedTeam(req, res);
});

fastify.post("/updateUser", (req, res) => {
  updateUser(req, res);
});

fastify.post("/updateTheme", (req, res) => {
  updateTheme(req, res);
});

fastify.post("/verifyUser", (req, res) => {
  verifyUser(req, res);
});

fastify.post("/addEducation", (req, res) => {
  addEducation(req, res);
});

fastify.post("/updateEducation", (req, res) => {
  updateEducation(req, res);
});

fastify.post("/getAllEducation", (req, res) => {
  getEducationList(req, res);
});

fastify.post("/addExperience", (req, res) => {
  addExperience(req, res);
});

fastify.post("/updateExperience", (req, res) => {
  updateExperience(req, res);
});

fastify.post("/getAllExperience", (req, res) => {
  getExperienceList(req, res);
});

fastify.post("/addProject", (req, res) => {
  addProject(req, res);
});

fastify.post("/updateProject", (req, res) => {
  updateProject(req, res);
});

fastify.post("/getAllProject", (req, res) => {
  getProjectList(req, res);
});

fastify.post("/updateSkill", (req, res) => {
  updateUserSkill(req, res);
});


exports.users = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
          requestHandler(req, res);
      });
  });
});


        // if (mode == "create") {
        //     return createNewUser(request, response);
        // } else if (mode == "update") {
        //     return updateUser(request, response);
        // } else if (mode == "update-theme") {
        //     return updateTheme(request, response);
        // } else if (mode == "verify") {
        //     return verifyUser(request, response);
        // } else if (mode == "getUserAppSettings") {
        //     return getUserAppSettings(request, response);
        // } else if (mode == "getUserByEmail") {
        //     return getUserByEmail(request, response);
        // } else if (mode == "CheckAvailableUsername") {
        //     return checkAvailableUsername(request, response);
        // } else if (mode == "getMyOrgList") {
        //     return getMyOrgList(request, response);
        // } else if (mode == "getMyTeamsList") {
        //     return getMyTeamsList(request, response);
        // } else if (mode == "setMyOrganization") {
        //     return setMyOrganization(request, response);
        // } else if (mode == "updateSelectedTeam") {
        //     return updateSelectedTeam(request, response);
        // } else if (mode == "getPhotoURLList") {
        //     return getPhotoURLList(request, response);
        // } else if (mode == "getMyOrgCollectionDocs") {
        //     return getMyOrgCollectionDocs(request, response);
        // } else if (mode == "addEducation") {
        //     return addEducation(request, response);
        // } else if (mode == "updateEducation") {
        //     return updateEducation(request, response);
        // } else if (mode == "getAllEducation") {
        //     return getEducationList(request, response);
        // } else if (mode == "addExperience") {
        //     return addExperience(request, response);
        // } else if (mode == "updateExperience") {
        //     return updateExperience(request, response);
        // } else if (mode == "getAllExperience") {
        //     return getExperienceList(request, response);
        // } else if (mode == "addProject") {
        //     return addProject(request, response);
        // } else if (mode == "updateProject") {
        //     return updateProject(request, response);
        // } else if (mode == "getAllProject") {
        //     return getProjectList(request, response);
        // } else if (mode == "updateSkill") {
        //     return updateUserSkill(request, response);
        // }