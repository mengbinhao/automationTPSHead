const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  patient.openNewPatientWindow(IndelPlan)
  
  const previousCount = IndelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  
  patient.addPatient(IndelPlan, true, [1997661, "testpatient2", "Male", 180, 60, 80, "north east", 18812341235, "note"])

  const currentCount = IndelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  if (strictEqual(previousCount, currentCount)) {
    Log.Checkpoint("Cancel add patient successfully!")
  } else {
    Log.Error("Cancel add patient fail!")
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}