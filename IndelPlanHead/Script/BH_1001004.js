const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const common = require("common")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  patient.loadPatient(IndelPlan,  aqConvert.IntToStr(8997668))

  aqObject.CheckProperty(IndelPlan.patientDataClass, "VisibleOnScreen", cmpEqual, true)
  
  exitwithlogic.exitWithLogic(false, false, 1)
}