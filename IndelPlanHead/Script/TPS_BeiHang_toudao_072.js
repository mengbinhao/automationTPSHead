const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsfunctions = require("utils_functions")
const physicaldata = require("physical_data")
const findinlist = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_071() {
  const IndelPlan = Project.Variables.IndelPlan
  const configList = IndelPlan.machinemanagementClass.ConfigList
  
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  physicaldata.addEmptyMachine(IndelPlan, Project.Variables.newmachinename, false)
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  const RowIdx = findinlist.isItemInListReturnIndex(Project.Variables.newmachinename, globalConstant.obj.machineConfigNameColumn, configList) 
  
  if (!strictEqual(RowIdx, globalConstant.obj.notFoundIndex)) {
    let prev = findinlist.getFieldValueFromRow(RowIdx, 'Last Edit Time', configList)
    
    physicaldata.editMachine(IndelPlan, Project.Variables.newmachinename, 0, 'text', 'Machine Name:', Project.Variables.editmachinename, true)
    
    utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    
    let cur = findinlist.getFieldValueFromRow(RowIdx, 'Last Edit Time', configList)
    
    if (strictEqual(prev, cur)) {
      Log.Message("TPS_BeiHang_toudao_072 Pass")
    } else {
      Log.Error("TPS_BeiHang_toudao_072 Failed")
    }
  } else {
    Log.Error(`TPS_BeiHang_toudao_072 Failed`)
  }
  IndelPlan.machinemanagementClass.Close()
  exitwithlogic.exitWithLogic(false, true)
}