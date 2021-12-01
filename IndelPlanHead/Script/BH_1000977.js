const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)

  user.openNewUserWindow(indelPlan)
  user.addUser(indelPlan, pv, Project.Variables.new_username, Project.Variables.new_user_password, Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype)
  user.deleteUser(indelPlan, pv, Project.Variables.new_username, true)

  const isExisting = findinlist.isItemExitInList(Project.Variables.new_username, globalConstant.obj.userNameColumn, indelPlan.user_management.UserList)
  if (isExisting) {
    Log.Checkpoint("Cancel Delete user Successfully!")
  } else {
    Log.Error("Cancel Delete user Fail!")
  }
  
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}