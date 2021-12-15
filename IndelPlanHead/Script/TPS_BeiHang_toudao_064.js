const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsFunctions = require("utils_functions")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_064() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  const previousRowCount = indelPlan.machine_management.ConfigList.wRowCount
  
  physicaldata.addEmptyMachine(indelPlan, pv, Project.Variables.new_machine_name, false)
  
  const curRowCount = indelPlan.machine_management.ConfigList.wRowCount
  let checkObj = {}
  checkObj.count = curRowCount
  aqObject.CheckProperty(checkObj, "count", cmpEqual, previousRowCount + 1)
  checkObj = null
  
  indelPlan.machine_management.Close()
  exitwithlogic.exitWithLogic(false, true)
}