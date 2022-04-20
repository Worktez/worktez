/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
// /* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { setLabelProperties, getTeam, updateTeamDetails } = require("../lib");

exports.createLabelProperties = function(orgDomain, teamName, type, statusLabels, priorityLabels, difficultyLabels) {
    let scope;
    let displayName;
    let iconName;
    let colorCode;
    let docNumber = 0;

    priorityLabels.forEach((element) => {
        displayName = element;
        scope = "Priority";
        const data = getIconDetails(element);
        iconName = data.IconName;
        colorCode = data.ColorCode;
        docNumber++;
        const docID = "L" + docNumber;
        setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
    });

    difficultyLabels.forEach((element) => {
        displayName = element;
        scope = "Difficulty";
        const data = getIconDetails(element);
        iconName = data.IconName;
        colorCode = data.ColorCode;
        docNumber++;
        const docID = "L" + docNumber;
        setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
    });

    type.forEach((element) => {
        displayName = element;
        scope = "Type";
        const data = getIconDetails(element);
        iconName = data.IconName;
        colorCode = data.ColorCode;
        docNumber++;
        const docID = "L" + docNumber;
        setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
    });

    statusLabels.forEach((element) => {
        displayName = element;
        scope = "Status";
        const data = getIconDetails(element);
        iconName = data.IconName;
        colorCode = data.ColorCode;
        docNumber++;
        const docID = "L" + docNumber;
        setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
    });

    getTeam(orgDomain, teamName).then((team) => {
        if (team) {
            const updateJson = {
                LabelCounters: docNumber,
            };
            updateTeamDetails(updateJson, orgDomain, teamName);
            console.log("Team Updated Successfully");
        }
    }).catch((error) => {
        console.log("Error: ", error);
    });
};

const highData = {
    ColorCode: "ff0000",
    IconName: "keyboard_arrow_up",
};

const mediumData = {
    ColorCode: "EF6C00",
    IconName: "sync_alt",
};

const lowData = {
    ColorCode: "42a5f5",
    IconName: "keyboard_arrow_down",
};

const bugData = {
    ColorCode: "42a5f5",
    IconName: "keyboard_arrow_down",
};

const iceBoxData = {
    ColorCode: "42a5f5",
    IconName: "inventory_2",
};

const readyData = {
    ColorCode: "673ab7",
    IconName: "inventory_2",
};

const inPrgressData = {
    ColorCode: "fc6a03",
    IconName: "inventory_2",
};

const blockedData = {
    ColorCode: "f44336",
    IconName: "inventory_2",
};

const completeData = {
    ColorCode: "00ff00",
    IconName: "inventory_2",
};

const getIconDetails = function(element) {
    if (element === "High") {
        return highData;
    } else if (element === "Medium") {
        return mediumData;
    } else if (element === "Low") {
        return lowData;
    } else if (element === "Bug") {
        return bugData;
    } else if (element === "Story") {
        return bugData;
    } else if (element === "Sub Task") {
        return bugData;
    } else if (element === "Ice Box") {
        return iceBoxData;
    } else if (element === "Ready to start") {
        return readyData;
    } else if (element === "Under Progress") {
        return inPrgressData;
    } else if (element === "Blocked") {
        return blockedData;
    } else if (element === "Completed") {
        return completeData;
    }
};