const launch = require("launch")
const login = require("login")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.wrongusername, Project.Variables.password)
  
  const loginWrongUsernamePopup = IndelPlan.login_wrong_username_popup
  aqObject.CheckProperty(loginWrongUsernamePopup, "VisibleOnScreen", cmpEqual, true)   
  aqObject.CheckProperty(loginWrongUsernamePopup.qt_msgbox_label, "Text", cmpEqual, "The username you have typed does not exist.")    
  common.handlePopupDialog(loginWrongUsernamePopup)
  exitwithlogic.exitWithLogic(false, false, 2)
}