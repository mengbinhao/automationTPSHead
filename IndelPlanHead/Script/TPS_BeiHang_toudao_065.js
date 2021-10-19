const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsfunctions = require("utils_functions")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_065() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  IndelPlan.machinemanagementClass.add_btn.Click()
  IndelPlan.addmachineClass.LineEdit.SetText(Project.Variables.newmachinename)
  IndelPlan.addmachineClass.DialogButtonBox.buttonOk.ClickButton()
  
  const ret = "General Information,Source,Collimator,Machine,TMR,OAR,HU-ED,FrameParameters"  
  const widget = IndelPlan.machine_addmachinedetailClass.tabWidget
  let val = ""
  for (let i = 0; i < widget.wTabCount; i++) {
    val += widget.wTabCaption(i) + ","
  }
  val = aqString.SubString(val, 0, val.length - 1)
  
  if (strictEqual(val, ret)) {
    Log.Message("Pass")
  } else {
    Log.Error("TPS_BeiHang_toudao_065 Failed")
  }
  IndelPlan.machine_addmachinedetailClass.Close()
  IndelPlan.machinemanagementClass.Close()
  exitwithlogic.exitWithLogic(false, true)
}