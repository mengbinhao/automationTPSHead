const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findInList = require("find_in_list")

const __compareDateAndTime = (loginTime, loginTimeOneMinuteAfter, createTime) => {
  if (strictEqual(createTime, loginTime) || strictEqual(createTime, loginTimeOneMinuteAfter)) return true
  return false
}

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  const ret = "8997668testpatientM801806018812341235north east"
  const now = aqDateTime.Now()
  const loginTime = aqConvert.DateTimeToFormatStr(now, "%H:%M")
  const loginTimeOneMinuteAfter = aqConvert.DateTimeToFormatStr(aqDateTime.AddMinutes(now, 1), "%H:%M")

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  const list = indelPlan.patientManagement.treeWidget_PatientList
  const idx = findInList.isItemExistInMoreListReturnIndex(Project.Variables.new_patientID, globalConstant.obj.patientIDColumn, list)
  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    const vals = findInList.getOneRowValueForMoreListFromRowIndex(idx, list)
    aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%H:%M")
    const createTime = aqString.SubString(vals.pop(), 11, 5)
    if (!strictEqual(ret, vals.join('')) || !__compareDateAndTime(loginTime, loginTimeOneMinuteAfter, createTime)) {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
    } else {
      Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
    }
  } else {
    Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}