const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")

function GeneralEvents_OnTimeout(Sender, Params) {
  Log.Warning(`GeneralEvents_OnTimeout`)
  const IndelPlan = Project.Variables.IndelPlan

  if (Sys.Process(IndelPlan.procesName).Exists) {
    Sys.Process(IndelPlan.procesName).Terminate()
    //maybe can not excute, so need to handle when logging
    utilsfunctions.delay(globalConstant.obj.delayOneMinute)
  }
}