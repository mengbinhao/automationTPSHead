const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  const before = indelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  patient.openNewPatientWindow(indelPlan)
  patient.addPatientFromDicom(indelPlan, pv, Project.Variables.new_patientDicomID)
  const after = indelPlan.patientManagement.treeWidget_PatientList.wItems.Count
  
  if (strictEqual(before + 1, after)) {
    Log.Checkpoint("Execute ${Project.TestItems.Current.Name} successfully!")
  } else {
    Log.Error("Execute ${Project.TestItems.Current.Name} fail!")
  }

  exitwithlogic.exitWithLogic(false, false, 1)
}