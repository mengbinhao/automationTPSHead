const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findInList = require("find_in_list")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)

  user.openNewUserWindow(indelPlan)
  user.addUser(indelPlan, pv, Project.Variables.new_username, Project.Variables.new_user_password, Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype)
  user.deleteUser(indelPlan, pv, Project.Variables.new_username, false)

  const isExisting = findInList.isItemExitInList(Project.Variables.new_username, globalConstant.obj.userNameColumn, indelPlan.user_management.UserList)
  if (!isExisting) {
    Log.Checkpoint("Execute ${Project.TestItems.Current.Name} successfully!")
  } else {
    Log.Error("Execute ${Project.TestItems.Current.Name} fail!")
  }
  
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}