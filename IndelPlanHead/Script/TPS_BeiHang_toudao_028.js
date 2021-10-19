const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_028() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const gb = IndelPlan.systemsettingsClass.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox_3
  aqObject.CheckProperty(gb.database_ip, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.database_username, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.database_password, "VisibleOnScreen", cmpEqual, true)
  
  aqObject.CheckProperty(gb.lineEdit_SQLServerIP, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_SQLServerUser, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_SQLServerKey, "wText", cmpNotEqual, "")
  IndelPlan.systemsettingsClass.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}