const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const path = "D:\\IndelPlan\\export"
  const patientID = aqConvert.IntToStr(8997668)
  
  patient.addPatientActivity(IndelPlan, patientID, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")

  patient.exportPatientData(IndelPlan, false, patientID, path)
  IndelPlan.patient_export_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  IndelPlan.patient_DlgExportClass.pushButton_Cancel.ClickButton()

  patient.deletePatient(IndelPlan, false, patientID)
  
  patient.importPatientData(IndelPlan, false, patientID, path) 
  IndelPlan.patient_import_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  IndelPlan.patient_DlgImportClass.pushButton_Cancel.ClickButton()

  patient.importPatientData(IndelPlan, false, patientID, path)
  
  aqObject.CheckProperty(IndelPlan.patient_import_error_popup, "Exists", cmpEqual, true)   
  IndelPlan.patient_import_error_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  IndelPlan.patient_DlgImportClass.pushButton_Cancel.ClickButton()

  exitwithlogic.exitWithLogic(false, false, 1)
}