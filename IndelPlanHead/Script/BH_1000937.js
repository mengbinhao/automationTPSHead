const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.main.Close()
  common.handlePopupDialog(IndelPlan.main_quit_popup, 4)
  aqObject.CheckProperty(IndelPlan.main, "VisibleOnScreen", cmpEqual, true)   
  exitwithlogic.exitWithLogic(false, false, 1)
}