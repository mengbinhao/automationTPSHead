const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findinlist = require("find_in_list")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  const ret = "8997668testpatient2F811816118812341236north east1note1"

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  

  patient.editPatient(indelPlan, false, Project.Variables.new_patientID, Project.Variables.new_patient_name_2, "Female", 181, 61, 81, "north east1", 18812341236, "note1")
  
  const list = indelPlan.patientManagement.treeWidget_PatientList
  const idx = findinlist.isItemExistInMoreListReturnIndex(Project.Variables.new_patientID, globalConstant.obj.patientIDColumn, list)
  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    list.ClickItem(Project.Variables.new_patientID)
    const vals = findinlist.getOneRowValueForMoreListFromRowIndex(idx, list)
    vals.pop()
    vals.push(indelPlan.patientManagement.groupBox_4.textEdit_Note.wText)
    if (!strictEqual(ret, vals.join(''))) {
      Log.Error("Edit patient fail!")
    } else {
      Log.Checkpoint("Edit patient successfully!")
    }
  } else {
    Log.Error("Edit patient fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}