/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Vivek Kumar <vvksindia@gmail.com>
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
  let htmlbody = "";
  let htmlContent = "";
  let subjectMessage = "";
  let templateName = "";
  let mailSubject;
  if (mailType == "Comment_Task") {
    templateName = "comment.html";
    htmlContent = "$$$ has commented on task id: $$$$";
    mailSubject = "New Comment on Worktez Task";
  } else if (mailType == "Watcher_Task") {
    templateName = "watcher.html";
    mailSubject = "Added Watcher on Worktez Task";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$! you have been added as a watcher to task id:$$$$!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Create_Task") {
    templateName = "createTask.html";
    mailSubject = "New Task created on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hey $$$! $$$$ has created a task for you with task id:$$$$$!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/$$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Delete_Task") {
    templateName = "deleteTask.html";
    mailSubject = "Task deleted on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$! $$$$ deleted task with id:$$$$$!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/$$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Edit_Task") {
    templateName = "editTask.html";
    mailSubject = "Task edited on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$! $$$$ edited your task with id:$$$$$!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/$$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Log_Task") {
    templateName = "logTask.html";
    mailSubject = "Logged work on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hey $$$! You logged your work successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/TaskDetails/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
    } else if (mailType == "Verification_Mail") {
      templateName = "verificationMail.html";
      mailSubject = "Verification mail of Worktez";
      htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hey $$$! $$$$ invited you to join the team with id:$$$$$" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/verifyUser/$$$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Add_Education_Profile") {
    templateName = "addEducation.html";
    mailSubject = "Education added on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Add_Experience_Profile") {
    templateName = "addExperience.html";
    mailSubject = "Experience added on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Add_Project_Profile") {
    templateName = "addProjectProfile.html";
    mailSubject = "Project added on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Update_Education_Profile") {
    templateName = "updateEducation.html";
    mailSubject = "Education updated on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Update_Experience_Profile") {
    templateName = "updateExperience.html";
    mailSubject = "Experience updated on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Update_Pic_Profile") {
    templateName = "updatePic";
    mailSubject = "Profile Pic updated on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Update_Project_Profile") {
    templateName = "updateProject.html";
    mailSubject = "Project updated on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Update_Skill_Profile") {
    templateName = "updateSkill.html";
    mailSubject = "Skill updated on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  } else if (mailType == "Edit_Profile") {
    templateName = "editProfile.html";
    mailSubject = "Profile edited on Worktez";
    htmlContent = "<tr><td style=\"padding-left:30px;text-align:center;\"><p>" + "Hi $$$ your profile has been updated Successfully!" + "</p></td></tr><tr style=\"text-align:center;\" rowspan=\"1\"><td><a href=\"https://worktez.com/profile/$$$$" + "\" target=\"_blank\" style=\"background-color: #dc3226; color: white; text-decoration:none; padding: 15px;border-radius:50px;border:red;cursor:pointer;\">View comment</a><p style=\"color:#666;\">Please click the button to view the comment.";
  }
  const promise = getTemplate(templateName).then((data) => {
    if (templateName == "comment.html") {
      htmlContent = htmlContent.replace("$$$", valueArray[0]);
      htmlContent = htmlContent.replace("$$$$", valueArray[1]);
    } else if (templateName == "watcher.html") {
      htmlContent = htmlContent.replace("$$$", valueArray[0]);
      htmlContent = htmlContent.replace("$$$$", valueArray[1]);
      htmlContent = htmlContent.replace("https://worktez.com/TaskDetails/$$$$", "https://worktez.com/TaskDetails/" + valueArray[1]);
    } else if (templateName == "createTask.html" || templateName == "deleteTask.html" || templateName == "editTask.html") {
      htmlContent = htmlContent.replace("$$$", valueArray[2]);
      htmlContent = htmlContent.replace("$$$$", valueArray[0]);
      htmlContent = htmlContent.replace("$$$$$", valueArray[1]);
      htmlContent = htmlContent.replace("https://worktez.com/TaskDetails/$$$$$", "https://worktez.com/TaskDetails/" + valueArray[1]);
    } else if (templateName == "logTask.html") {
      htmlContent = htmlContent.replace("$$$", valueArray[2]);
      htmlContent = htmlContent.replace("$$$$", valueArray[1]);
      htmlContent = htmlContent.replace("https://worktez.com/TaskDetails/$$$$", "https://worktez.com/TaskDetails/" + valueArray[1]);
    } else if (templateName == "addEducation.html" || templateName == "addExperience.html" || templateName == "addProjectProfile.html" || templateName == "updateEducation.html" || templateName == "updateExperience.html" || templateName == "updateProject.html" || templateName == "updateSkill.html" || templateName == "editProfile.html") {
      htmlContent = htmlContent.replace("$$$", valueArray[2]);
      htmlContent = htmlContent.replace("https://worktez.com/profile/$$$$", "https://worktez.com/profile/" + valueArray[0]);
    } else if (templateName == "verificationMail.html") {
      htmlContent = htmlContent.replace("$$$", valueArray[2]);
        htmlContent = htmlContent.replace("$$$$", valueArray[1]);
        htmlContent = htmlContent.replace("$$$$", valueArray[0]);
        htmlContent = htmlContent.replace("https://worktez.com/verifyUser/$$$$", "https://worktez.com/verifyUser/"+valueArray[3]+valueArray[0]+valueArray[4]+valueArray[2]);
    }
    htmlbody = data.replace("$$$", htmlContent);
    subjectMessage = mailSubject;
    message.push(subjectMessage);
    message.push(htmlbody);
    return message;
  }).catch((err) => {
    console.error(err);
    return;
  });
  return Promise.resolve(promise);
};