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
  let checkObj = {}
  const prop = findinlist.getHeaderFromList(IndelPlan.user_management.UserList)
  checkObj.header = prop
  aqObject.CheckProperty(checkObj, "header", cmpEqual, "User Name,User Type,Login Information,Login Time")
  checkObj = null
  
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_NewUser, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_EditUser, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_DelUser, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_Exit, "VisibleOnScreen", cmpEqual, true)

  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}