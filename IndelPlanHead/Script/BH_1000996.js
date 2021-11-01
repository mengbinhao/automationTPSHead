const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findinlist = require("find_in_list")
const utils_functions = require("utils_functions")

const __compareDateAndTime = (origin, target) => {
  const systemOneMinuteAfterTime = utils_functions.getTimeIntervalAsFormatStr("%H:%M", 3, 1)
  const ret1 = aqString.FindLast(target,origin)
  const ret2 = aqString.FindLast(target,systemOneMinuteAfterTime)
  if (strictEqual(ret1, -1) && strictEqual(ret2, -1)) return false
  return true
}

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const ret = "8997668testpatientM801806018812341235north east"
  const systemCurrentTime = utils_functions.getTimeAsFormatStr("%H:%M")
  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  
  const list = IndelPlan.patientManagement.treeWidget_PatientList
  const idx = findinlist.isItemExistInMoreListReturnIndex(aqConvert.IntToStr(8997668), globalConstant.obj.patientIDColumn, list)
  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    const vals = findinlist.getOneRowValueForMoreListFromRowIndex(idx, list)
    const dateAndTime = vals.pop()
    if (!strictEqual(ret, vals.join('')) || !__compareDateAndTime(systemCurrentTime, dateAndTime)) {
      Log.Error("Add patient fail!")
    } else {
      Log.Checkpoint("Add patient successfully!")
    }
  } else {
    Log.Error("Add patient fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}