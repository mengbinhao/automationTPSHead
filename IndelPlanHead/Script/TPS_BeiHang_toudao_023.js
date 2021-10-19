const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_023() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  aqObject.CheckProperty(IndelPlan.systemsettingsClass, "VisibleOnScreen", cmpEqual, true)
  IndelPlan.systemsettingsClass.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}