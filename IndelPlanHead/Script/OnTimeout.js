const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const exitwithlogic = require("exit_with_logic")

function GeneralEvents_OnTimeout(Sender, Params) {
  const pv = Project.Variables.ProjectVariable

  if (Sys.WaitProcess(pv.procesName).Exists) {
    //try exit first
    LLCollection.press_escape.Execute()
    exitwithlogic.exitWithLogic(false, false, 1)
    if (Sys.WaitProcess(pv.procesName).Exists) {
      Sys.Process(pv.procesName).Terminate()
      Log.Warning(`${pv.procesName} has Terminate by GeneralEvents_OnTimeout`)
      //maybe can not excute, so need to handle exception when logging
      utilsFunctions.delay(globalConstant.obj.delayOneMinute)
    }
  }
}