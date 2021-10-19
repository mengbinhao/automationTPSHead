const globalConstant = require("global_constant")
const UI = require("UI")

function GeneralEvents_OnStartTest(Sender) {
  if (!Project.Variables.VariableExists(globalConstant.obj.projectObjectVaiableName)) {
    Project.Variables.AddVariable(globalConstant.obj.projectObjectVaiableName, globalConstant.obj.projectObjectVaiableType)
  } else {
    if (strictEqual(Project.Variables.IndelPlan, null)) {
      Project.Variables.IndelPlan = UI.initUI()
    }
  }
}