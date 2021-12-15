const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const clearDirtyData = require("clear_dirty_data")
const reRunCases = require("rerun_cases")
const exportTestResult = require("export_test_result")
const postJIRA = require("post_jira")
const email = require("email")
//const postJIRA = require("post_jira")
//const email = require("email")

function GeneralEvents_OnStopTest(Sender) {
  const pv = Project.Variables.ProjectVariable
  const contourLen = pv.dirtyData.get(globalConstant.obj.addContourLib).length
  const patientLen = pv.dirtyData.get(globalConstant.obj.addPatient).length
  const userLen = pv.dirtyData.get(globalConstant.obj.addUser).length
  const machineLen = pv.dirtyData.get(globalConstant.obj.addMachine).length
  if (contourLen || patientLen || userLen || machineLen) clearDirtyData.clearDirtyData()
  
  //check if this is the last running script
  if (strictEqual(++pv.currentRunningItem, pv.maxRunningItem)) {
    reRunCases.reRun()
    //export result
    //exportTestResult.exportTestResult()
    //wait file generated completely
    //utilsFunctions.delay(globalConstant.obj.delayTenSeconds)

    //post defect
    //postJIRA.postToJIRA(null)
    //send email
    //email.send()
  }
}