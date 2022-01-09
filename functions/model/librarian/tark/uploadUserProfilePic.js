/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { setProfilePicToUserDocument } = require("../lib");
const { getUser, updateUser } = require("../../users/lib");

exports.uploadProfilePicToUserDoc = function(request, response) {
    const fileName = request.body.data.FileName;
    const fileUrl = request.body.data.FileUrl;
    const lastModified = request.body.data.LastModified;
    const size = request.body.data.Size;
    const date = request.body.data.Date;
    const time = request.body.data.Time;
    const basePath = request.body.data.BasePath;
    const uid = request.body.data.Uid;

    let result;
    let status = 200;

    const promise = getUser(uid, "").then((data) => {
        let photoCounter = data.TotalPhotoCounter;
        photoCounter++;

        updateUserDocJson = {
            TotalPhotoCounter: photoCounter,
        };
        updateUser(updateUserDocJson, uid);

        const orgFileDocumentName = "File" + photoCounter;
        const updateUserFileJson = {
            FileName: fileName,
            FileUrl: fileUrl,
            LastModified: lastModified,
            Size: size,
            Date: date,
            Time: time,
            OrgFileDocumentName: orgFileDocumentName,
            BasePath: basePath,
            FileStatus: "OK",
        };
        setProfilePicToUserDocument(updateUserFileJson, uid, orgFileDocumentName);
    }).catch((error) => {
        status = 500;
        console.log("Error:", error);
    });

    Promise.resolve(promise).then(() => {
            result = { data: { status: "OK" } };
            console.log("Profile Pic Uploaded Successfully");
            return response.status(status).send(result);
        })
        .catch((error) => {
            result = { data: error };
            console.error("Error Uploading Profile Pic", error);
            return response.status(status).send(result);
        });
};