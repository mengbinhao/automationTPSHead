const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const utilsFunctions = require("utils_functions")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)  
  if (Sys.WaitProcess(pv.procesName).Exists) {
    Sys.Process(pv.procesName).Terminate()
    utilsFunctions.delay(globalConstant.obj.delayOneMinute)
    launch.launch()
    login.login(indelPlan, Project.Variables.username, Project.Variables.password)
    aqObject.CheckProperty(indelPlan.patientManagement.frame.groupBox_3.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.username}`)   
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}