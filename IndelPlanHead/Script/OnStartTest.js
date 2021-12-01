const globalConstant = require("global_constant")
const UI = require("UI")
const projectVariable = require("project_variable")

function GeneralEvents_OnStartTest(Sender) {
  if (!Project.Variables.isInit) {
    Project.Variables.IndelPlan = UI.init()
    Project.Variables.ProjectVariable = projectVariable.init()
    Project.Variables.isInit = true
  }
}