const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_063() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  let checkObj = {}
  const checkProp = "Config Name,Creator,Create Time,Last Editor,Last Edit Time"
  checkObj.checkProp = checkProp

  const headers = findinlist.getColumnHearders(IndelPlan.machinemanagementClass.ConfigList)
  aqObject.CheckProperty(checkObj, "checkProp", cmpEqual, headers)
  IndelPlan.machinemanagementClass.Close()
  exitwithlogic.exitWithLogic(false, true)
}