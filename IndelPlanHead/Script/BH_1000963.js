const globalConstant = require("global_constant")
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

  const isUserExisting = findinlist.isItemExitInList(Project.Variables.newusername, globalConstant.obj.userNameColumn, IndelPlan.user_management.UserList)
  if (isUserExisting) {
    Log.Checkpoint("Add user successfully!")
  } else {
    Log.Error("Add user fail!")
  }

  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}