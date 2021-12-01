const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.wrong_password)
  
  aqObject.CheckProperty(indelPlan.login_wrong_password_popup, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.login_wrong_password_popup.qt_msgbox_label, "text", cmpEqual, "The password you have typed is incorrect.")   
  common.handlePopupDialog(indelPlan.login_wrong_password_popup)
  exitwithlogic.exitWithLogic(false, false, 2)
}