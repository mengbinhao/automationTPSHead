const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const logout = require("logout")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)  
  logout.logout()
  aqObject.CheckProperty(indelPlan.login, "Exists", cmpEqual, true)   
  aqObject.CheckProperty(indelPlan.login.lineEdit_Username, "Text", cmpEqual, globalConstant.obj.emptyString)   
  aqObject.CheckProperty(indelPlan.login.lineEdit_Password, "Text", cmpEqual, globalConstant.obj.emptyString)

  exitwithlogic.exitWithLogic(false, false, 2)
}