/* eslint-disable linebreak-style */
/* eslint-disable max-len */
const {setPatch, getPatchData} = require("./lib");

exports.setPatches = function() {
  getPatchData("Patch1").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch1", "Counter Fix", "This patch Fixes all the counters for the team", "16/06/2021", "06/08/2021", "", "");
    }
  });

  getPatchData("Patch2").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch2", "Patch2", "This patch adds a new field to all the tasks with a default value.", "18/07/2021", "06/08/2021", "", "");
    }
  });

  getPatchData("Patch3").then((patch) => {
    if (patch == undefined) {
      setPatch("Patch3", "Patch3", "This patch allows the user to change a particular field in relevent tasks, enter field name and field value to get the task details", "07/07/2021", "06/08/2021", "", "");
    }
  });
};
