const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  patient.addPatientActivity(IndelPlan, 1997661, "baby8", "Male", 180, 60, 80, "north east", 18812341235, "note")
   
  IndelPlan.patientManagement.groupBox_6.lineEdit_SearchPatient.Keys("8")
  
  const cnt = IndelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  if (strictEqual(cnt, 2)) {
    Log.Checkpoint("Filter patient Name and ID successfully!")
  } else {
    Log.Error("Filter patient Name and ID fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}