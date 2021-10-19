const launch = require("launch")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  IndelPlan.loginClass.pushButton.ClickButton()
  
  const loginNoninputPopup = IndelPlan.login_noninput_popup
  aqObject.CheckProperty(loginNoninputPopup, "VisibleOnScreen", cmpEqual, true)
  const expectedStr = `Illegal input.
Please input username, password and database.`
  aqObject.CheckProperty(loginNoninputPopup.qt_msgbox_label, "text", cmpEqual, expectedStr)  
  common.handlePopupDialog(loginNoninputPopup)
  exitwithlogic.exitWithLogic(false, false, 2)
}