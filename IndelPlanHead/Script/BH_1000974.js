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

  user.editUser(IndelPlan, Project.Variables.newusername, "", "", Project.Variables.editusertype, true)
  
  const userList = IndelPlan.user_management.UserList
  const idx = findinlist.isItemInListReturnIndex(Project.Variables.newusername, globalConstant.obj.userNameColumn, userList)
  const userType = findinlist.getFieldValueFromRow(idx, globalConstant.obj.userTypeColumn, userList)
  if (strictEqual(userType, Project.Variables.newusertype)) {
    Log.Checkpoint("Cancel update userType Successfully!")
  } else {
    Log.Error("Cancel update userType Fail!")
  }
  
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}