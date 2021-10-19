const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_221() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  const checkObj = IndelPlan.patientManagement.treeWidget_PatientList.wItems
  const count = checkObj.Count
  patient.addPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.newpatientname, false)
  aqObject.CheckProperty(checkObj, "Count", cmpEqual, count + 1)
  exitwithlogic.exitWithLogic(false, true)
}