﻿const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(IndelPlan)

  user.openNewUserWindow(IndelPlan)
  user.addUser(IndelPlan, Project.Variables.newusername, Project.Variables.newuserpassword, Project.Variables.newuserconfirmpassword, Project.Variables.newusertype)
  user.deleteUser(IndelPlan, Project.Variables.newusername, false)

  const isExisting = findinlist.isItemExitInList(Project.Variables.newusername, globalConstant.obj.userNameColumn, IndelPlan.user_management.UserList)
  if (!isExisting) {
    Log.Checkpoint("Delete user Successfully!")
  } else {
    Log.Error("Delete user Fail!")
  }
  
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}