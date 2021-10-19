const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsfunctions = require("utils_functions")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_070() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  physicaldata.addEmptyMachine(IndelPlan, Project.Variables.newmachinename, false)
  
  IndelPlan.machinemanagementClass.add_btn.Click()
  IndelPlan.addmachineClass.LineEdit.SetText(Project.Variables.newmachinename)
  IndelPlan.addmachineClass.DialogButtonBox.buttonOk.ClickButton()
  
  aqObject.CheckProperty(IndelPlan.machine_exists_popup, "VisibleOnScreen", cmpEqual, true)
  IndelPlan.machine_exists_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  IndelPlan.machinemanagementClass.Close()
  exitwithlogic.exitWithLogic(false, true)
}