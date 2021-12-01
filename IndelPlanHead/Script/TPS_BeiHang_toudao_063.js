const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_063() {
  const indelPlan = Project.Variables.IndelPlan
  launch.lauindelnch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  let checkObj = {}
  const checkProp = "Config Name,Creator,Create Time,Last Editor,Last Edit Time"
  checkObj.checkProp = checkProp

  const headers = findinlist.getColumnHearders(indelPlan.machine_management.ConfigList)
  aqObject.CheckProperty(checkObj, "checkProp", cmpEqual, headers)
  indelPlan.machine_management.Close()
  exitwithlogic.exitWithLogic(false, true)
}