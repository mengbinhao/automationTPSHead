const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  const management = IndelPlan.patientManagement
  const searchArea = management.groupBox_6
  aqObject.CheckProperty(searchArea, "title", cmpEqual, "Search Patient")
  aqObject.CheckProperty(searchArea.lineEdit_SearchPatient, "wText", cmpEqual, "")

  
  const dateArea = management.groupBox_2
  aqObject.CheckProperty(dateArea, "title", cmpEqual, "Date")
  aqObject.CheckProperty(dateArea.radioButton_AllDate, "Visible", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Today, "Visible", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "Visible", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Week, "Visible", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Month, "Visible", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Between, "Visible", cmpEqual, true)
  
  const detailInfoArea = management.groupBox_4
  aqObject.CheckProperty(detailInfoArea, "title", cmpEqual, "Detail Info.")
  aqObject.CheckProperty(detailInfoArea.label_15, "text", cmpEqual, "Create Time")
  aqObject.CheckProperty(detailInfoArea.lineEdit_CreateTime, "wText", cmpEqual, "")
  aqObject.CheckProperty(detailInfoArea.label_19, "text", cmpEqual, "Studys")
  aqObject.CheckProperty(detailInfoArea.lineEdit_StudyCount, "wText", cmpEqual, "")
  aqObject.CheckProperty(detailInfoArea.label_23, "text", cmpEqual, "Plans")
  aqObject.CheckProperty(detailInfoArea.lineEdit_PlanCount, "wText", cmpEqual, "")  
  aqObject.CheckProperty(detailInfoArea.label_16, "text", cmpEqual, "Treat Time")
  aqObject.CheckProperty(detailInfoArea.lineEdit_TreatTime, "wText", cmpEqual, "")  
  aqObject.CheckProperty(detailInfoArea.label_20, "text", cmpEqual, "Contours")
  aqObject.CheckProperty(detailInfoArea.lineEdit_ContourCount, "wText", cmpEqual, "")  
  aqObject.CheckProperty(detailInfoArea.label_22, "text", cmpEqual, "Unfinished Plans")
  aqObject.CheckProperty(detailInfoArea.lineEdit_UFPlanCount, "wText", cmpEqual, "")   
  aqObject.CheckProperty(detailInfoArea.label_17, "text", cmpEqual, "Doctor")
  aqObject.CheckProperty(detailInfoArea.lineEdit_CreateDoc, "wText", cmpEqual, "") 
  aqObject.CheckProperty(detailInfoArea.label_21, "text", cmpEqual, "Treatcourses")
  aqObject.CheckProperty(detailInfoArea.lineEdit_TCCount, "wText", cmpEqual, "")  
  aqObject.CheckProperty(detailInfoArea.label_24, "text", cmpEqual, "Untreated Plans")
  aqObject.CheckProperty(detailInfoArea.lineEdit_UTPlanCount, "wText", cmpEqual, "")  
  aqObject.CheckProperty(detailInfoArea.label_18, "text", cmpEqual, "Note")
  aqObject.CheckProperty(detailInfoArea.textEdit_Note, "wText", cmpEqual, "")   
  
  const backupArea = management.groupBox_7
  aqObject.CheckProperty(backupArea, "title", cmpEqual, "Backup")
  aqObject.CheckProperty(backupArea.pushButton_Export, "Visible", cmpEqual, true)
  aqObject.CheckProperty(backupArea.pushButton_Import, "Visible", cmpEqual, true)

  const planStateArea = management.groupBox_5
  aqObject.CheckProperty(planStateArea, "title", cmpEqual, "Plan State")
  aqObject.CheckProperty(planStateArea.radioButton_AllPlan, "Visible", cmpEqual, true)
  aqObject.CheckProperty(planStateArea.radioButton_Unapproved, "Visible", cmpEqual, true)
  aqObject.CheckProperty(planStateArea.radioButton_Approved, "Visible", cmpEqual, true)
  
  aqObject.CheckProperty(management.pushButton_LoadPatient, "Visible", cmpEqual, true)
  aqObject.CheckProperty(management.pushButton_NewPatient, "Visible", cmpEqual, true)
  aqObject.CheckProperty(management.pushButton_EditPatient, "Visible", cmpEqual, true)
  aqObject.CheckProperty(management.pushButton_DeletePatient, "Visible", cmpEqual, true)  
      
  exitwithlogic.exitWithLogic(false, false, 1)
}