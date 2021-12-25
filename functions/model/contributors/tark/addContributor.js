/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { getApplicationData, updateApplication } = require("../application/lib");
const { setContributors } = require("./lib");

exports.addContributor = function(request, response) {
    const email = request.body.data.email;
    const about = request.body.data.about;
    const photoUrl = request.body.data.photoUrl;
    const title = request.body.data.title;
    const name = request.body.data.name;

    console.log(about);

    let status = 200;
    let result;

    getApplicationData().then((data) => {
        const totalNumberOfContributors = data.TotalNumberOfContributors + 1;

        const appDetailsUpdateJson = {
            TotalNumberOfContributors: totalNumberOfContributors + 1,
        };

        const docId = "Contributor"+totalNumberOfContributors;

        updateApplication(appDetailsUpdateJson);
        setContributors(docId, email, about, photoUrl, title, name).then((doc) => {
            result = { data: doc };
            console.log("Sent contributors successfully");
            return response.status(status).send(result);
        }).catch((error)=>{
            status = 500;
            const result = { data: error };
            console.error("Error getting contributors", error);
            return response.status(status).send(result);
        });
    }).catch((error) => {
        status = 500;
        const result = { data: error };
        console.error("Error getting contributors", error);
        return response.status(status).send(result);
    });
};