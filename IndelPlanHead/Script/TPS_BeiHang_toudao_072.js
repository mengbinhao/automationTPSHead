const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsFunctions = require("utils_functions")
const physicaldata = require("physical_data")
const findInList = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_071() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  const configList = indelPlan.machine_management.ConfigList
  
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  physicaldata.addEmptyMachine(indelPlan, pv, Project.Variables.new_machine_name, false)
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  const RowIdx = findInList.isItemInListReturnIndex(Project.Variables.new_machine_name, globalConstant.obj.machineConfigNameColumn, configList) 
  
  if (!strictEqual(RowIdx, globalConstant.obj.notFoundIndex)) {
    let prev = findInList.getFieldValueFromRow(RowIdx, 'Last Edit Time', configList)
    
    physicaldata.editMachine(indelPlan, Project.Variables.new_machine_name, 0, 'text', 'Machine Name:', Project.Variables.edit_machine_name, true)
    
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    
    let cur = findInList.getFieldValueFromRow(RowIdx, 'Last Edit Time', configList)
    
    if (strictEqual(prev, cur)) {
      Log.Message("TPS_BeiHang_toudao_072 Pass")
    } else {
      Log.Error("TPS_BeiHang_toudao_072 Failed")
    }
  } else {
    Log.Error(`TPS_BeiHang_toudao_072 Failed`)
  }
  indelPlan.machine_management.Close()
  exitwithlogic.exitWithLogic(false, true)
}