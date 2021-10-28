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
  const headers = findinlist.getHeaderFromList(IndelPlan.user_management.UserList)
  const match = "User Name,User Type,Login Information,Login Time"
  if (strictEqual(headers, match)) {
    Log.Checkpoint("User List header includs ${match}")
  } else {
    Log.Error("User List header does not equal ${match}")
  }
  
  /*
  let checkObj = {}
  const prop = findinlist.getHeaderFromList(IndelPlan.user_management.UserList)
  checkObj.header = prop
  aqObject.CheckProperty(checkObj, "header", cmpEqual, "User Name,User Type,Login Information,Login Time")
  checkObj = null
  */
  
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_NewUser, "Visible", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_EditUser, "Visible", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_DelUser, "Visible", cmpEqual, true)
  aqObject.CheckProperty(IndelPlan.user_management.pushButton_Exit, "Visible", cmpEqual, true)

  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}