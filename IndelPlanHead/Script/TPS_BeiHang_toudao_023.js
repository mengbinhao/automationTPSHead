const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_023() {
  const indelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  aqObject.CheckProperty(indelPlan.system_settings, "VisibleOnScreen", cmpEqual, true)
  indelPlan.system_settings.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}