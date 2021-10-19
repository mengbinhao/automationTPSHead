const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")
const common = require("common")

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
    user.addUser(IndelPlan, Project.Variables.newusername, "", Project.Variables.newuserconfirmpassword, Project.Variables.newusertype)
    aqObject.CheckProperty(IndelPlan.user_nullpassword_popup, "Exists", cmpEqual, true)
    common.handlePopupDialog(IndelPlan.user_nullpassword_popup)
    IndelPlan.user_newusercClass.pushButton_Cancel.ClickButton()
  }
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}