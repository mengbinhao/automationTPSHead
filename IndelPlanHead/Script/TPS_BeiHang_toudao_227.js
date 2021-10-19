const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const findinlist = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_227() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  patient.addPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.newpatientname, false)
  patient.addPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.newpatientname, false)
  aqObject.CheckProperty(IndelPlan.patient_exists_popup, "VisibleOnScreen", cmpEqual, true)
  IndelPlan.patient_exists_popup.qt_msgbox_buttonbox.buttonOk.Click()
  IndelPlan.patient_newpatientClass.cancelButton.Click()
  exitwithlogic.exitWithLogic(false, true)
}