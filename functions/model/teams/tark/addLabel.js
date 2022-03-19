// const { setLabelProperties, getTeam, updateTeamDetails } = require("../lib");
// console.log("checkcheck");

// exports.addLabel = function(orgDomain, teamName, type, statusLabels, priorityLabels, difficultyLabels) {
// let scope;
// let displayName;
// let iconName;
// let colorCode;
// let docNumber = 0;
// let result;
// let status =200;

// priorityLabels.forEach((element) => {
// console.log(element)
// let docID="";
// displayName = element;
// if(scope = "Priority"){
// const data = getIconDetails(element);
// iconName = data.IconName;
// colorCode = data.ColorCode;
// docNumber++;
// const docID = "L" + docNumber;
// }
// setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
// });

// difficultyLabels.forEach((element) => {
// let docId="";
// displayName = element;
// if(scope = "Difficulty"){
// const data = getIconDetails(element);
// iconName = data.IconName;
// colorCode = data.ColorCode;
// docNumber++;
// const docID = "L" + docNumber;
// }
// setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
// });

// type.forEach((element) => {
// let docId="";
// displayName = element;
// if (scope = "Type") {
// const data = getIconDetails(element);
// iconName = data.IconName;
// colorCode = data.ColorCode;
// docNumber++;
// const docID = "L" + docNumber;
// }
// setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
// });

// statusLabels.forEach((element) => {
// displayName = element;
// if (scope = "Status"){
// const data = getIconDetails(element);
// iconName = data.IconName;
// colorCode = data.ColorCode;
// docNumber++;
// const docID = "L" + docNumber;
// }
// setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
// });

// getTeam(orgDomain, teamName).then((team) => {
// if (team) {
// const updateJson = {
// LabelCounters: docNumber,
// };
// updateTeamDetails(updateJson, orgDomain, teamName);
// console.log("Team Updated Successfully");
// }
// }).catch((error) => {
// console.log("Error: ", error);
// });
// };
// const labelData = {
//     ColorCode: this.colorCode,
//     IconName: this.iconName,
// };

// const getIconDetails = function(element) {
//     if (element === this.displayName) {
//         return labelData;
//     } 
// };


const { getLabelInScope ,updateTeamDetails , addTeamLabel} = require("../lib");

exports.addLabel = function(request, response) {
const orgDomain = request.body.data.orgDomain;
const teamName = request.body.data.TeamName;
const scope = request.body.data.Scope;
let result;
let status = 200;

const p1 = getLabelInScope(orgDomain, teamName, scope).then((labelData) => {
let docId = "";
if (labelData) {
let labelCounter=labelData.LabelCounter;
labelCounter = labelCounter+1;
docId="L" + labelCounter;

updateLabelInputJson = {
LabelCounter: labelCounter,
};
updateTeamDetails(updateLabelInputJson, orgDomain, teamName);
console.log()
addTeamLabel(orgDomain, teamName, scope, docId).then(()=> {
console.log("Label added successfully");
}).catch((error) => {
result = {data: error};
status = 500;
console.error("Error",error); 
});
}
});
const Promises = [p1];
return Promise.all(Promises).then(() => {
result = { data: "User Label Added successfully" };
return response.status(status).send(result);
}).catch((error) => {
result = { data: error };
console.error("Error adding Label", error);
return response.status(status).send(result);
});

}