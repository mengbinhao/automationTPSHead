const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const common = require("common")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  const group = indelPlan.patientManagement.frame.groupBox_3
  aqObject.CheckProperty(group.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.username}`)   

  const tabName = common.getPatientDetailTabName(indelPlan)
  if (strictEqual(tabName, globalConstant.obj.patientManagement)) {
    Log.Checkpoint(`default focused tab is ${globalConstant.obj.patientManagement}`)
  } else {
    Log.Error(`default main tab should be ${globalConstant.obj.patientManagement}`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}