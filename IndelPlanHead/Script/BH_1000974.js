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

  user.editUser(indelPlan, Project.Variables.new_username, "", "", Project.Variables.edit_usertype, true)
  
  const userList = indelPlan.user_management.UserList
  const idx = findInList.isItemInListReturnIndex(Project.Variables.new_username, globalConstant.obj.userNameColumn, userList)
  const userType = findInList.getFieldValueFromRow(idx, globalConstant.obj.userTypeColumn, userList)
  if (strictEqual(userType, Project.Variables.new_usertype)) {
    Log.Checkpoint("Cancel update userType Successfully!")
  } else {
    Log.Error("Cancel update userType Fail!")
  }
  
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}