const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.wrong_username, Project.Variables.password)

  aqObject.CheckProperty(indelPlan.login_wrong_username_popup, "VisibleOnScreen", cmpEqual, true)   
  aqObject.CheckProperty(indelPlan.login_wrong_username_popup.qt_msgbox_label, "Text", cmpEqual, "The username you have typed does not exist.")    
  common.handlePopupDialog(indelPlan.login_wrong_username_popup)
  exitwithlogic.exitWithLogic(false, false, 2)
}