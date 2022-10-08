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

exports.createLabelProperties = function(orgDomain, teamName, type, statusLabels, priorityLabels, difficultyLabels, milestoneStatusLabels) {
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

    milestoneStatusLabels.forEach((element) => {
        displayName = element;
        scope = "MilestoneStatus";
        const data = getIconDetails(element);
        iconName = data.IconName;
        colorCode = data.ColorCode;
        docNumber++;
        const docID = "L" + docNumber;
        setLabelProperties(orgDomain, teamName, docID, displayName, scope, iconName, colorCode);
    });


    const promise = getTeam(orgDomain, teamName).then((team) => {
        if (team) {
            const updateJson = {
                LabelCounters: docNumber,
            };
            updateTeamDetails(updateJson, orgDomain, teamName);
        }
    }).catch((error) => {
        console.error("Error: ", error);
        return error;
    });

    return Promise.resolve(promise);
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
    ColorCode: "7f0000",
    IconName: "bug_report",
};

const storyData = {
    ColorCode: "ff6f00",
    IconName: "change_history",
};

const subtaskData = {
    ColorCode: "64dd17",
    IconName: "subtitles",
};

const iceBoxData = {
    ColorCode: "42a5f5",
    IconName: "inventory_2",
};

const readyData = {
    ColorCode: "673ab7",
    IconName: "not_started",
};

const inPrgressData = {
    ColorCode: "fc6a03",
    IconName: "arrow_circle_up",
};

const blockedData = {
    ColorCode: "f44336",
    IconName: "block",
};

const completeData = {
    ColorCode: "00ff00",
    IconName: "check_circle_outline",
};

const socialMediaData = {
    ColorCode: "f44336",
    IconName: "check_circle_outline",
};

const emailData = {
    ColorCode: "00ff00",
    IconName: "arrow_circle_up",
};

const adsData = {
    ColorCode: "fc6a03",
    IconName: "inventory_2",
};


const getIconDetails = function(element) {
    switch (element) {
        case "High": {
            return highData;
    }   case "Medium": {
            return mediumData;
    }   case "Low": {
            return lowData;
    }   case "Bug": {
            return bugData;
    }   case "Story": {
            return storyData;
    }   case "Sub Task": {
            return subtaskData;
    }   case "Ice Box": {
            return iceBoxData;
    }   case "Ready to start": {
            return readyData;
    }   case "Under Progress": {
            return inPrgressData;
    }   case "Blocked": {
            return blockedData;
    }   case "Completed": {
            return completeData;
    }   case "SocialMedia": {
            return socialMediaData;
    }   case "Email": {
            return emailData;
    }   case "Ad's": {
            return adsData;
    }    
    }
};