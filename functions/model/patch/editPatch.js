const { updatePatchData, getPatchData } = require("./lib");

exports.editPatch = function(request, response) {
    const Name = request.body.data.Name;
    const Description = request.body.data.Description;
    const PatchId = request.body.data.Id;
    let status = 200;

    const editPatchPromise = getPatchData(PatchId).then((patch) => {
        if (patch != undefined) {
            const updatePatchJson = {
                Name: Name,
                Description: Description,
            };
            updatePatchData(PatchId, updatePatchJson)
        }
    }).catch((error) => {
        status = 500;
        console.log("Error: ", error);
    });
    const Promises = [editPatchPromise];
    return Promise.all(Promises).then(() => {
            return response.status(status).json({ data: "success" });
        })
        .catch((error) => {
            console.error("Error Editing Patch: ", error);
        });
}