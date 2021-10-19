const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  patient.openNewPatientWindow(IndelPlan)
  
  //terminate process
  Sys.Process(IndelPlan.procesName).Terminate() 
  //in case popup loggedin window
  utilsfunctions.delay(globalConstant.obj.delayOneMinute)
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  //handle nonnormal popup
  common.handlePopupDialog(IndelPlan.login_nonnormal_popup, 3)
  exitwithlogic.exitWithLogic(false, false, 1)
}