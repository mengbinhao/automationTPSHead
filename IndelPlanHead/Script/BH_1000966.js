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
  const rowIdx = findinlist.isItemInListReturnIndex(Project.Variables.username, globalConstant.obj.userNameColumn, userList)
  userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
  IndelPlan.user_management.pushButton_EditUser.ClickButton()
  
  aqObject.CheckProperty(IndelPlan.user_newusercClass.label_username, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_newusercClass.label_password, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_newusercClass.label_confirmpassword, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_newusercClass.label_usertype, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_newusercClass.pushButton_OK, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_newusercClass.pushButton_Cancel, "VisibleOnScreen", cmpEqual, true)
  IndelPlan.user_newusercClass.pushButton_Cancel.ClickButton()
  
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}