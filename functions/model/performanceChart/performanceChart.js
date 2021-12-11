/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors } = require("../application/lib");
const { getPerformanceChartData } = require("./getPerformanceChartData");
const { getUserPerformanceChartData } = require("./getUserPerformanceChartData");
const { getSprintEvaluationGraph } = require("./getSprintEvaluationGraph");


exports.performanceChart = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const mode = request.body.data.mode;

        if (mode == "performanceChartData") {
            return getPerformanceChartData(request, response);
        } else if (mode == "sprintEvaluationGraph") {
            return getSprintEvaluationGraph(request, response);
        } else if (mode == "userPerformanceChartData") {
            return getUserPerformanceChartData(request, response);
        }
    });
});