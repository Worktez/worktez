/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Abhishek Mishra <am1426620@gmail.com>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
 const { setOrgMember, getOrgMember } = require("../lib");

 exports.createMember = function(createMemberInput) {
     const orgDomain = createMemberInput.orgDomain;
     const email = createMemberInput.email;
     let isAdmin = createMemberInput.isAdmin;
     let teamManager = createMemberInput.teamManager;
     const teams = createMemberInput.teams;
     const today = new Date();
     const dd = String(today.getDate()).padStart(2, "0");
     const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
     const yyyy = today.getFullYear();
     const DateOfAddition = yyyy + "-" + mm + "-" + dd;
     const DateOfExit = "xxxx-xx-xx";
     console.log(orgDomain, email);

    getOrgMember(orgDomain, email).then((MemberDoc) => {
        console.log("MemberDOc", MemberDoc);
        if (MemberDoc == undefined) {
            setOrgMember(orgDomain, email, DateOfAddition, DateOfExit, isAdmin, teamManager, teams).catch(
                (error) => {
                    console.error("Error", error);
                }
            );
        } else {
            isAdmin=MemberDoc.IsAdmin;
            teamManager= MemberDoc.TeamManager;
            const currentTeams= MemberDoc.Teams;
            if (currentTeams.indexOf(teams[0]) == -1) {
                currentTeams.push(teams[0]);
            }
            setOrgMember(orgDomain, email, DateOfAddition, DateOfExit, isAdmin, teamManager, currentTeams).catch(
                (error) => {
                    console.error("Error", error);
                }
            );
        }
    }).catch((error) => {
        console.log("Error:", error);
    });
 };