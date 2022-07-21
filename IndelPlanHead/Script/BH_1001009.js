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
  
  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID_2, "baby", Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
   
  indelPlan.patientManagement.groupBox_6.lineEdit_SearchPatient.Keys(Project.Variables.new_patient_name)
  
  const cnt = indelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  if (strictEqual(cnt, 1)) {
    Log.Checkpoint("Execute ${Project.TestItems.Current.Name} successfully!")
  } else {
    Log.Error("Execute ${Project.TestItems.Current.Name} fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}