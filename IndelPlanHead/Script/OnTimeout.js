const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const exitwithlogic = require("exit_with_logic")

function GeneralEvents_OnTimeout(Sender, Params) {
  Log.Warning(`${Params.Name} GeneralEvents_OnTimeout`)
  const IndelPlan = Project.Variables.IndelPlan

  if (Sys.WaitProcess(IndelPlan.procesName).Exists) {
    //try exit first
    LLPlayer.KeyDown(VK_ESCAPE, globalConstant.obj.delayMouseOneSecond)
    LLPlayer.KeyUp(VK_ESCAPE, globalConstant.obj.delayMouseOneSecond)
    exitwithlogic.exitWithLogic(false, false, 1)
    if (Sys.WaitProcess(IndelPlan.procesName).Exists) {
      Sys.Process(IndelPlan.procesName).Terminate()
      Log.Warning(`${IndelPlan.procesName} has Terminate by GeneralEvents_OnTimeout`)
      //maybe can not excute, so need to handle when logging
      utilsfunctions.delay(globalConstant.obj.delayOneMinute)
    }
  }
}