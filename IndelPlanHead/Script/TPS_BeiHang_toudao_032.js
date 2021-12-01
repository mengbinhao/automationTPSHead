﻿const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_030() {
  const indelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const gb = indelPlan.system_settings.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox_5
  aqObject.CheckProperty(gb.igrt_ip, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.igrt_port, "VisibleOnScreen", cmpEqual, true)

  
  aqObject.CheckProperty(gb.lineEdit_IGRTIP, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_IGRTPort, "wText", cmpNotEqual, "")
  indelPlan.system_settings.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}