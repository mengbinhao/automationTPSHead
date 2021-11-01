const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findinlist = require("find_in_list")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const ret = "8997668testpatient2F811816118812341236north east1note1"
  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  patient.deletePatient(IndelPlan, true, aqConvert.IntToStr(8997668))
  
  const list = IndelPlan.patientManagement.treeWidget_PatientList
  const isExist = findinlist.isItemExistInMoreList(aqConvert.IntToStr(8997668), globalConstant.obj.patientIDColumn, list)
  
  if (isExist) {
    Log.Checkpoint("Cancel delete patient successfully!")
  } else {
    Log.Error("Cancel delete patient fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}