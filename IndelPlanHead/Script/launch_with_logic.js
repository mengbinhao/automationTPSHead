const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const exitwithlogic = require("exit_with_logic")

const launchWithLogic = () => {
  const indelPlan = Project.Variables.IndelPlan
  //Exists: true if the object exist in the system
  //Visible: specifies whether an onscreen object is visible to user
  if(!indelPlan.login.Exists) {
    TestedApps.IndelplanV2.Run()
  } else {
    //from contour maybe popup other dialog
    exitwithlogic.exitWithLogic(false, false, 1)
    utilsfunctions.delay(globalConstant.obj.delayTime)
    TestedApps.IndelplanV2.Run()
  }
}

module.exports.launchWithLogic = launchWithLogic