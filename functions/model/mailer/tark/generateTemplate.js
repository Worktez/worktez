/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Twinkle Chatterjee <ctwinkle2812@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const { getTemplate } = require("./getTemplates");

/**
 * Description
 * @param {any} mailType
 * @param {any} valueArray
 * @return {any}
 */
exports.generateTemplate = function(mailType, valueArray) {
  const message = [];
  let subjectMessage = "";
  let templateName = "";
  let mailSubject;
  if (mailType == "Comment_Task") {
    templateName = "comment.html";
  } else if (mailType == "Watcher_Task") {
    templateName = "watcher.html";
    mailSubject = "Added as a watcher";
  } else if (mailType == "Create_Task") {
    templateName = "createTask.html";
  } else if (mailType == "Delete_Task") {
    templateName = "deleteTask.html";
    mailSubject = "Task deleted on Worktez";
  } else if (mailType == "Edit_Task") {
    templateName = "editTask.html";
    mailSubject = "Task edited on Worktez";
  } else if (mailType == "Log_Task") {
    templateName = "logTask.html";
    mailSubject = "Logged work on Worktez";
  } else if (mailType == "Verification_Mail") {
    templateName = "verificationMail.html";
  } else if (mailType == "Add_Education_Profile") {
    templateName = "addEducation.html";
    mailSubject = "Education added on Worktez";
  } else if (mailType == "Add_Experience_Profile") {
    templateName = "addExperience.html";
    mailSubject = "Experience added on Worktez";
  } else if (mailType == "Add_Project_Profile") {
    templateName = "addProjectProfile.html";
    mailSubject = "Project added on Worktez";
  } else if (mailType == "Update_Education_Profile") {
    templateName = "updateEducation.html";
    mailSubject = "Education updated on Worktez";
  } else if (mailType == "Update_Experience_Profile") {
    templateName = "updateExperience.html";
    mailSubject = "Experience updated on Worktez";
  } else if (mailType == "Update_Pic_Profile") {
    templateName = "updatePic.html";
    mailSubject = "Profile Pic updated on Worktez";
  } else if (mailType == "Update_Project_Profile") {
    templateName = "updateProject.html";
    mailSubject = "Project updated on Worktez";
  } else if (mailType == "Update_Skill_Profile") {
    templateName = "updateSkill.html";
    mailSubject = "Skill updated on Worktez";
  } else if (mailType == "Edit_Profile") {
    templateName = "editProfile.html";
    mailSubject = "Profile edited on Worktez";
  } else if (mailType == "Demo_Request") {
    templateName = "demoRequest.html";
    mailSubject = "New Demo Request - Worktez";
  }
  const promise = getTemplate(templateName).then((data) => {
    if (templateName == "comment.html") {
      mailSubject = "New Comment on Worktez Task - " + valueArray.taskId;
      data = data.replace("$taskId$", valueArray.taskId);
      data = data.replace("$link$", "\"" + "https://worktez.com/TaskDetails/"+ valueArray.taskId + "\"");
      if (valueArray.watcher) {
        data = data.replace("$receipient$", valueArray.recipientName);
        if (valueArray.doer != valueArray.recipientName) {
          data = data.replace("$name$", valueArray.doer);
        } else {
          data = data.replace("$name$", "You");
        }
      } else {
        data = data.replace("$receipient$", valueArray.recipientName);
        if (valueArray.doer != valueArray.recipientName) {
          data = data.replace("$name$", valueArray.doer);
        } else {
          data = data.replace("$name$", "You");
        }
      }
    } else if (templateName == "watcher.html" || templateName == "logTask.html") {
      data = data.replace("$recipientName$", valueArray.recipientName);
      data = data.replace("$taskId$", valueArray.taskId);
      data = data.replace("$link$", "\"" + "https://worktez.com/TaskDetails/"+ valueArray.taskId + "\"");
    } else if (templateName == "createTask.html") {
      mailSubject = "New Task created on Worktez";
      data = data.replace("$taskId$", valueArray.taskId);
      data = data.replace("$link$", "\"" + "https://worktez.com/TaskDetails/"+ valueArray.taskId + "\"");
      if (valueArray.watcher) {
        data = data.replace("$recipientName$", valueArray.recipientName);
        data = data.replace("$assignee$", valueArray.AssigneeEmail);
        if (valueArray.doer != valueArray.recipientName) {
          data = data.replace("$name$", valueArray.doer);
        } else {
          data = data.replace("$name$", "You");
        }
      } else {
        data = data.replace("$recipientName$", valueArray.recipientName);
        data = data.replace("$assignee$", "You");
        if (valueArray.doer != valueArray.recipientName) {
          data = data.replace("$name$", valueArray.doer);
        } else {
          data = data.replace("$name$", "You");
        }
      }
    } else if (templateName == "deleteTask.html" || templateName == "editTask.html" ) {
      data = data.replace("$taskId$", valueArray.taskId);
      data = data.replace("$link$", "\"" + "https://worktez.com/TaskDetails/"+ valueArray.taskId + "\"");
      if (valueArray.watcher) {
        data = data.replace("$recipientName$", valueArray.recipientName);
        if (valueArray.doer != valueArray.recipientName) {
          data = data.replace("$name$", valueArray.doer);
        } else {
          data = data.replace("$name$", "You");
        }
      } else {
        data = data.replace("$recipientName$", valueArray.recipientName);
        if (valueArray.doer != valueArray.recipientName) {
          data = data.replace("$name$", valueArray.doer);
        } else {
          data = data.replace("$name$", "You");
        }
      }
    } else if (templateName == "addEducation.html" || templateName == "addExperience.html" || templateName == "addProjectProfile.html" || templateName == "updateEducation.html" || templateName == "updateExperience.html" || templateName == "updateProject.html" || templateName == "updateSkill.html" || templateName == "editProfile.html" || templateName == "updatePic.html") {
      data = data.replace("$username$", valueArray[3]);
      data = data.replace("$recipientName$", valueArray[2]);
    } else if (templateName == "verificationMail.html") {
      mailSubject = "Verification mail - Worktez";
      data = data.replace("$recipientName$", valueArray[2]);
      data = data.replace("$name$", valueArray[1]);
      data = data.replace("$teamName$", valueArray[0]);
      data = data.replace("$link$", "\"" + "https://worktez.com/verifyUser/"+valueArray[3]+ "/" + valueArray[0]+ "/" + valueArray[4]+"/"+valueArray[2] + "\"");
    } else if (templateName == "demoRequest.html") {
      mailSubject = "New Demo Request - Worktez";
      data = data.replace("$userName$", valueArray[0]);
      data = data.replace("$userEmail$", valueArray[1]);
      data = data.replace("$userContact$", valueArray[2]);
      data = data.replace("$orgName$", valueArray[3]);
    }
    subjectMessage = mailSubject;
    message.push(subjectMessage);
    message.push(data);
    return message;
  }).catch((err) => {
    console.error(err);
    return;
  });
  return Promise.resolve(promise);
};