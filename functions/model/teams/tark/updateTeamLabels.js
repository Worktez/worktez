const { updateTeamLabels } = require("../lib");

exports.updateTeamLabels = function(request, response) {
    const type = request.body.data.TypeLabels;
    const statusLabels;
    const priorityLabels;
    const difficultyLabels;
    const milestoneStatusLabels;

    let status = 200;
    let result = { data: "Error in updating Labels"};

    const promise1 = getLabelInScope(orgDomain, teamName, scope).then((labelData) => {
        if (labelData) {
            const updateJson = {
                Type: type,
                StatusLabels: statusLabels,
                PriorityLabels: priorityLabels,
                DifficultyLabels: difficultyLabels,
                MilestoneStatusLabels: milestoneStatusLabels,
            };
            updateTeamLabels(updateJson, orgDomain, teamName);
            result = { data: "Labels updated successfully"};
            console.log("Successfully updated team labels");
        } else {
            status: 500;
            result = {data: "Error: Label doesn't exist"};
            console.log("Error: Label doesn't exist");
        }
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    const Promises = [promise1];
    return Promise.all(Promises).then(() => {
        return response.status(status).send(result);
    }).catch((error) => {
        result = {data: error};
        console.error("Error updating Labels", error);
        return response.status(status).send(result);
    });
};