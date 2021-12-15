const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsFunctions = require("utils_functions")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_065() {
  const indelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  indelPlan.machine_management.add_btn.Click()
  indelPlan.machine_new_machine.LineEdit.SetText(Project.Variables.new_machine_name)
  indelPlan.machine_new_machine.DialogButtonBox.buttonOk.ClickButton()
  
  const ret = "General Information,Source,Collimator,Machine,TMR,OAR,HU-ED,FrameParameters"  
  const widget = indelPlan.machine_new_machine_detail.tabWidget
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
  indelPlan.machine_new_machine_detail.Close()
  indelPlan.machine_management.Close()
  exitwithlogic.exitWithLogic(false, true)
}