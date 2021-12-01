const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const utilsfunctions = require("utils_functions")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_070() {
  const indelPlanindelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_PhyData.Click()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  physicaldata.addEmptyMachine(indelPlan, pv, Project.Variables.new_machine_name, false)
  
  indelPlan.machine_management.add_btn.Click()
  indelPlan.machine_new_machine.LineEdit.SetText(Project.Variables.new_machine_name)
  indelPlan.machine_new_machine.DialogButtonBox.buttonOk.ClickButton()
  
  aqObject.CheckProperty(indelPlan.machine_exists_popup, "VisibleOnScreen", cmpEqual, true)
  indelPlan.machine_exists_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  indelPlan.machine_management.Close()
  exitwithlogic.exitWithLogic(false, true)
}