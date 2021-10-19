const launchwithlogic = require("launch_with_logic")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_235() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.pushButton_DeletePatient.Click()
  aqObject.CheckProperty(IndelPlan.patient_delete_nochoice_popup, "Exists", cmpEqual, true)
  IndelPlan.patient_delete_nochoice_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()   
  exitwithlogic.exitWithLogic(false, true)
}