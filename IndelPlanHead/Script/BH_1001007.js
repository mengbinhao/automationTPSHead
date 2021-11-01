const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const findinlist = require("find_in_list")
const utils_functions = require("utils_functions")
const common = require("common")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  patient.addPatientActivity(IndelPlan, 8997668, "testpatient", "Male", 180, 60, 80, "north east", 18812341235, "note")
  aqObject.CheckProperty(IndelPlan.patient_exists_popup, "Exists", cmpEqual, true)   
  common.handlePopupDialog(IndelPlan.patient_exists_popup, 1)
  patient.exitPatientWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}