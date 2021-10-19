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

  const userList = IndelPlan.user_management.UserList
  let isUserExisting = findinlist.isItemExitInList(Project.Variables.newusername, globalConstant.obj.userNameColumn, userList)
  
  if (isUserExisting) {
    Log.Error(`Prerequisites is not correct`)
  } else {
    user.openNewUserWindow(IndelPlan)
    user.addUser(IndelPlan, Project.Variables.newusername, Project.Variables.newuserpassword, Project.Variables.newuserconfirmpassword, Project.Variables.newusertype)
    user.deleteUser(IndelPlan, Project.Variables.newusername, true)
    const idx = findinlist.isItemInListReturnIndex(Project.Variables.newusername, globalConstant.obj.userNameColumn, userList)
    const isExisting = findinlist.isItemExitInList(Project.Variables.newusername, globalConstant.obj.userNameColumn, userList)
    if (isExisting) {
      Log.Checkpoint("Cancel Delete user Successfully!")
    } else {
      Log.Error("Cancel Delete user Fail!")
    }
  }
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}