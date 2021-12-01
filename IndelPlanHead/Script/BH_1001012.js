const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const fileFunctions = require("file_functions")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  const path = globalConstant.obj.patientDataFolder
  const patientFolderName = `${Project.Variables.new_patient_name}@${Project.Variables.new_patientID}`
  
  //delete target folder first
  fileFunctions.deleteFolder(path + globalConstant.obj.backslash + patientFolderName, true)
    
  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)

  patient.exportPatientData(indelPlan, false, Project.Variables.new_patientID, path)
  indelPlan.patient_export_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  indelPlan.patient_exporter.pushButton_Cancel.ClickButton()

  patient.deletePatient(indelPlan, pv, false, Project.Variables.new_patientID)
  
  patient.importPatientData(indelPlan, pv, false, Project.Variables.new_patientID, path) 
  indelPlan.patient_import_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  indelPlan.patient_importer.pushButton_Cancel.ClickButton()

  patient.importPatientData(indelPlan, pv, false, Project.Variables.new_patientID, path)
  
  aqObject.CheckProperty(indelPlan.patient_import_error_popup, "Exists", cmpEqual, true)   
  indelPlan.patient_import_error_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  indelPlan.patient_importer.pushButton_Cancel.ClickButton()

  exitwithlogic.exitWithLogic(false, false, 1)
}