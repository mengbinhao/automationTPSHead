const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  patient.openNewPatientWindow(indelPlan)
  
  const previousCount = indelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  
  patient.addPatient(indelPlan, pv, true, [Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note])

  const currentCount = indelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  if (strictEqual(previousCount, currentCount)) {
    Log.Checkpoint("Cancel add patient successfully!")
  } else {
    Log.Error("Cancel add patient fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}