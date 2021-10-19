const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const clearDirtyData = require("clear_dirty_data")
const email = require("email")
const exportTestResult = require("export_test_result")
const postJIRA = require("post_jira")

function GeneralEvents_OnStopTest(Sender) {
  const IndelPlan = Project.Variables.IndelPlan

  const contourLen = IndelPlan.dirtyData.get(globalConstant.obj.addContourLib).length
  const patientLen = IndelPlan.dirtyData.get(globalConstant.obj.addPatient).length
  const userLen = IndelPlan.dirtyData.get(globalConstant.obj.addUser).length
  const machineLen = IndelPlan.dirtyData.get(globalConstant.obj.addMachine).length
  if (contourLen || patientLen || userLen || machineLen) clearDirtyData.clearDirtyData()
  
  //check if this is the last script
  if (strictEqual(++IndelPlan.currentRunningItem, IndelPlan.maxRunningItem)) {
    //export result
    //exportTestResult.exportTestResult()
    //in case file generated completely
    //utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    //post defect
    //postJIRA.postToJIRA(null)
    //send email
    //email.send()
  }
}