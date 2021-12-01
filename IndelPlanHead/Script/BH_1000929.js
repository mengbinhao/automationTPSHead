const launch = require("launch")
const common = require("common")
const exitwithlogic = require("exit_with_logic")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  indelPlan.login.pushButton.ClickButton()

  aqObject.CheckProperty(indelPlan.login_noninput_popup, "VisibleOnScreen", cmpEqual, true)
  const expectedStr = `Illegal input.
Please input username, password and database.`
  aqObject.CheckProperty(indelPlan.login_noninput_popup.qt_msgbox_label, "text", cmpEqual, expectedStr)  
  common.handlePopupDialog(indelPlan.login_noninput_popup)
  exitwithlogic.exitWithLogic(false, false, 2)
}