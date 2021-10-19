const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_005() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  patient.addPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.newpatientname, false)
  patient.loadPatient(IndelPlan, Project.Variables.newpatientID)
  aqObject.CheckProperty(IndelPlan.patientDataClass, "VisibleOnScreen", cmpEqual, true)
  IndelPlan.patientDataClass.groupBox_6.pushButton_Close.Click()
  IndelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonYes.Click()
  aqObject.CheckProperty(IndelPlan.patientManagement.treeWidget_PatientList, "VisibleOnScreen", cmpEqual, true)
  exitwithlogic.exitWithLogic(false, true)
}