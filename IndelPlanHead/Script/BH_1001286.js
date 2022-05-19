const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  const checkCharacters = 'test1test1test1test1test1test12'
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)
  user.openNewUserWindow(indelPlan)
  indelPlan.user_new_user.lineEdit_UserName.Keys(checkCharacters)
  aqObject.CheckProperty(indelPlan.user_new_user.lineEdit_UserName, "wText", cmpEqual, 'test1test1test1test1test1test1')
  user.exitNewUserWindow(indelPlan)
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}