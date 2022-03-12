const { getLabelInScope, deleteUserLabel } =require("../lib");

exports.deleteLabel= function(request,response) {
const orgDomain = request.body.data.OrgDomain;
const teamName = request.body.data.TeamName;
const scope = request.body.data.Scope;

    let result;
    let status = 200;

    const p1 = getLabelInScope(orgDomain, teamName, scope).then((labelData) => {
       if (labelData == undefined) {
          console.log("checking");
          result = {data: {status:"Label does not exist"}};
       } else {
           const updateLabelToJson = {
               Status: "DELETED" ,
           };
           deleteUserLabel(updateLabelToJson, orgDomain, teamName, scope);
       }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
      });

      Promise.resolve(p1).then(() => {
        result = {data: {status: "OK"}};
        console.log("Label Deleted Successfully");
        return response.status(status).send(result);
      })
          .catch((error) => {
            result = {data: error};
            console.error("Error Deleting", error);
            return response.status(status).send(result);
          });
    };


