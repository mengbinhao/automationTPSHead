const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.wrongpassword)
  
  const loginWrongPasswordPopup = IndelPlan.login_wrong_password_popup
  aqObject.CheckProperty(loginWrongPasswordPopup, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(loginWrongPasswordPopup.qt_msgbox_label, "text", cmpEqual, "The password you have typed is incorrect.")   
  common.handlePopupDialog(loginWrongPasswordPopup)
  exitwithlogic.exitWithLogic(false, false, 2)
}