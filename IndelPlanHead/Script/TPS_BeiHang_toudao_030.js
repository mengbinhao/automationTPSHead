﻿const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_030() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const gb = IndelPlan.systemsettingsClass.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox_4
  aqObject.CheckProperty(gb.controller_ip, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.controller_database, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.controller_username, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.controller_password, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.controller_image_path, "VisibleOnScreen", cmpEqual, true)
  
  aqObject.CheckProperty(gb.lineEdit_UpperIP, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_UpperDatabase, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_UpperUser, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_UpperKey, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_UpperImagePath, "wText", cmpNotEqual, "")
  IndelPlan.systemsettingsClass.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}