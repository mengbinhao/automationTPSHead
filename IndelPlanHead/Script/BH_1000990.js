const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.main.Close()
  common.handlePopupDialog(indelPlan.main_quit_popup, 4)
  aqObject.CheckProperty(indelPlan.main, "VisibleOnScreen", cmpEqual, true)   
  exitwithlogic.exitWithLogic(false, false, 1)
}