const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")


function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)

  study.gotoRegisterImporter(indelPlan)
  aqObject.CheckProperty(indelPlan.register_importer, "VisibleOnScreen", cmpEqual, true)
  
  study.closeRegisterImporter(indelPlan)
  aqObject.CheckProperty(indelPlan.PatientData, "VisibleOnScreen", cmpEqual, true)
  
  exitwithlogic.exitWithLogic(false, false, 1)
}