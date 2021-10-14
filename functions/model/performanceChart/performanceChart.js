/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors } = require("../application/lib");
const { performanceChartData } = require("./performanceChartData");
const { getUserPerformanceChartData } = require("./getUserPerformanceChartData");

exports.performanceChart = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "performanceChartData") {
            return performanceChartData(request, response);
        } else if (mode == "getUserPerformanceChartData") {
            return getUserPerformanceChartData(request, response);
        }
    });
});