const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsfunctions = require("utils_functions")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_064() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  const previousRowCount = IndelPlan.machinemanagementClass.ConfigList.wRowCount
  
  physicaldata.addEmptyMachine(IndelPlan, Project.Variables.newmachinename, false)
  
  const curRowCount = IndelPlan.machinemanagementClass.ConfigList.wRowCount
  let checkObj = {}
  checkObj.count = curRowCount
  aqObject.CheckProperty(checkObj, "count", cmpEqual, previousRowCount + 1)
  checkObj = null
  
  IndelPlan.machinemanagementClass.Close()
  exitwithlogic.exitWithLogic(false, true)
}