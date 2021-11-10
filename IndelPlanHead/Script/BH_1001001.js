const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const file_functions = require("file_functions")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const path = "D:\\IndelPlan\\export"
  const patientFolderName = "testpatient@8997668"
  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  
  const beforeExportDate = aqDateTime.Now()
  
  patient.exportPatientData(IndelPlan, false, aqConvert.IntToStr(8997668), path)
  
  aqObject.CheckProperty(IndelPlan.patient_export_done_popup, "Exists", cmpEqual, true)   
  IndelPlan.patient_export_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  IndelPlan.patient_DlgExportClass.pushButton_Cancel.ClickButton()

  if (file_functions.isExists(path, patientFolderName) && strictEqual(aqDateTime.Compare(beforeExportDate, file_functions.getFolderDateLastModifiedTime(path + globalConstant.obj.backslash + patientFolderName)), -1)) {
    Log.Checkpoint("Export patient data successfully!")
  } else {
    Log.Error("Export patient data fail!")
  }

  exitwithlogic.exitWithLogic(false, false, 1)
}