const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findinlist = require("find_in_list")

const __compareDateAndTime = (loginTime, loginTimeOneMinuteAfter, createTime) => {
  if (strictEqual(createTime, loginTime) || strictEqual(createTime, loginTimeOneMinuteAfter)) return true
  return false
}

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const ret = "8997668testpatientM801806018812341235north east"
  const now = aqDateTime.Now()
  const loginTime = aqConvert.DateTimeToFormatStr(now, "%H:%M")
  const loginTimeOneMinuteAfter = aqConvert.DateTimeToFormatStr(aqDateTime.AddMinutes(now, 1), "%H:%M")

  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  
  const list = IndelPlan.patientManagement.treeWidget_PatientList
  const idx = findinlist.isItemExistInMoreListReturnIndex(aqConvert.IntToStr(8997668), globalConstant.obj.patientIDColumn, list)
  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    const vals = findinlist.getOneRowValueForMoreListFromRowIndex(idx, list)
    aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%H:%M")
    const createTime = aqString.SubString(vals.pop(), 11, 5)
    if (!strictEqual(ret, vals.join('')) || !__compareDateAndTime(loginTime, loginTimeOneMinuteAfter, createTime)) {
      Log.Error("Add patient fail!")
    } else {
      Log.Checkpoint("Add patient successfully!")
    }
  } else {
    Log.Error("Add patient fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}