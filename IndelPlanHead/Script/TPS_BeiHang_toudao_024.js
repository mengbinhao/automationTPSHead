const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_024() {
  const indelPlanindelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const gb = indelPlan.system_settings.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox
  aqObject.CheckProperty(gb.module_interface_folder, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.work_folder_name, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.DICOM_export_path, "VisibleOnScreen", cmpEqual, true)
  
  aqObject.CheckProperty(gb.lineEdit_ModuleInterfaceFolder, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_WorkDirFolder, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_DCMPath, "wText", cmpNotEqual, "")
  indelPlan.system_settings.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}