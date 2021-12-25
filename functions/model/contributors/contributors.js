/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if


const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addContributor } = require("./tark/addContributor");
const { getContributorsList } = require("./tark/getContributorsList");

fastify.post("/getContributorsData", (req, res) => {
    getContributorsList(req, res);
});

fastify.post("/addContributor", (req, res) => {
    addContributor(req, res);
});

exports.contributors = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
                requestHandler(req, res);
        });
        // const mode = request.body.data.mode;

        // if (mode == "getContributorsData") {
        //     return getContributorsList(request, response);
        // } else if (mode == "addContributor") {
        //     return addContributor(request, response);
        // }
    });
});