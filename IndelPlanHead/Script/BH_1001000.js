const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findInList = require("find_in_list")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)

  patient.deletePatient(indelPlan, pv, Project.Variables.new_patientID, true)
  
  const list = indelPlan.patientManagement.treeWidget_PatientList
  const isExist = findInList.isItemExistInMoreList(Project.Variables.new_patientID, globalConstant.obj.patientIDColumn, list)
  
  if (isExist) {
    Log.Checkpoint("Execute ${Project.TestItems.Current.Name} successfully!")
  } else {
    Log.Error("Execute ${Project.TestItems.Current.Name} fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}