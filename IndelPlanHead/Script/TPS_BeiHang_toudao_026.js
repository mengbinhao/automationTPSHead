const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_026() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const gb = IndelPlan.systemsettingsClass.tabWidget.qt_tabwidget_stackedwidget.tab.groupBox_2
  aqObject.CheckProperty(gb.server_data_path, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.server_patient_path, "VisibleOnScreen", cmpEqual, true)
  aqObject.CheckProperty(gb.DICOM_gate_port, "VisibleOnScreen", cmpEqual, true)
  
  aqObject.CheckProperty(gb.lineEdit_ServerDataPath, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_ServerPatientPath, "wText", cmpNotEqual, "")
  aqObject.CheckProperty(gb.lineEdit_DCMGatePort, "wText", cmpNotEqual, "")
  IndelPlan.systemsettingsClass.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}