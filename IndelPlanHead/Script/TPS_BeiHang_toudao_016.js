const launchwithlogic = require("launch_with_logic")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_016() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  
  const pmm = IndelPlan.patientManagement
  //Search
  aqObject.CheckProperty(pmm.groupBox_6.lineEdit_SearchPatient, "Exists", cmpEqual, true)
  
  const gb2 = pmm.groupBox_2
  //Date
  aqObject.CheckProperty(gb2.radioButton_AllDate, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Today, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Yesterday, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Week, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Month, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Between, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.dateEdit_StartDate, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb2.dateEdit_EndDate, "Exists", cmpEqual, true)
  
  const gb7 = pmm.groupBox_7
  //Backup
  aqObject.CheckProperty(gb7.pushButton_Export, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb7.pushButton_Import, "Exists", cmpEqual, true)
  
  const gb5 = pmm.groupBox_5
  //Plan State
  aqObject.CheckProperty(gb5.radioButton_AllPlan, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb5.radioButton_Unapproved, "Exists", cmpEqual, true)
  aqObject.CheckProperty(gb5.radioButton_Approved, "Exists", cmpEqual, true)
  
  //CRUD
  aqObject.CheckProperty(pmm.pushButton_LoadPatient, "Exists", cmpEqual, true)
  aqObject.CheckProperty(pmm.pushButton_NewPatient, "Exists", cmpEqual, true)
  aqObject.CheckProperty(pmm.pushButton_EditPatient, "Exists", cmpEqual, true)
  aqObject.CheckProperty(pmm.pushButton_DeletePatient, "Exists", cmpEqual, true)
  
  const frame = pmm.frame
  //Other funtions
  aqObject.CheckProperty(frame.pushButton_SystemSetting, "Exists", cmpEqual, true)
  aqObject.CheckProperty(frame.pushButton_PhyData, "Exists", cmpEqual, true)
  aqObject.CheckProperty(frame.pushButton_UserManage, "Exists", cmpEqual, true)
  aqObject.CheckProperty(frame.pushButton_SystemLog, "Exists", cmpEqual, true)
  
  exitwithlogic.exitWithLogic(false, true)
}