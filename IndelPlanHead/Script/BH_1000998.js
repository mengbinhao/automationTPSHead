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
  patient.editPatient(IndelPlan, false, aqConvert.IntToStr(8997668), "testpatient2", "Female", 181, 61, 81, "north east1", 18812341236, "note1")
  
  const list = IndelPlan.patientManagement.treeWidget_PatientList
  const idx = findinlist.isItemExistInMoreListReturnIndex(aqConvert.IntToStr(8997668), globalConstant.obj.patientIDColumn, list)
  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    list.ClickItem(aqConvert.IntToStr(8997668))
    const vals = findinlist.getOneRowValueForMoreListFromRowIndex(idx, list)
    vals.pop()
    vals.push(IndelPlan.patientManagement.groupBox_4.textEdit_Note.wText)
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