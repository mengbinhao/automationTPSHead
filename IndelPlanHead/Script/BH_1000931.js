const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const logout = require("logout")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)  
  logout.logout()
  const loginClass = IndelPlan.loginClass
  aqObject.CheckProperty(loginClass, "Exists", cmpEqual, true)   
  aqObject.CheckProperty(loginClass.username_input, "Text", cmpEqual, globalConstant.obj.emptyString)   
  aqObject.CheckProperty(loginClass.password_input, "Text", cmpEqual, globalConstant.obj.emptyString)

  exitwithlogic.exitWithLogic(false, false, 2)
}