const globalConstant = require("global_constant")
const utils_functions = require("utils_functions")
const user = require("user")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const physicalData = require("physical_data")
const plan = require("plan")
const common = require("common")
const coordinate = require("coordinate")
const targetRelated = require("target_related")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const exportTestResult = require("export_test_result")
const postJIRA = require("post_jira")
const email = require("email")

function test() {
  const IndelPlan = Project.Variables.IndelPlan
  //launch.launch()
  //login.login(Project.Variables.username, Project.Variables.password)
  
  
  //patient.addPatientActivity(IndelPlan,Project.Variables.newpatientID, Project.Variables.newpatientname)
  //patient.loadPatient(IndelPlan, Project.Variables.newpatientID)
  //study.addOneStudyActivity(IndelPlan, '16691200', 'MR')
  //contour.gotoContourWindow(IndelPlan)
  //contour.loadAndContourSKINActivity(IndelPlan)
  //contour.loadAndContourTargetAreaByBrushActivity(IndelPlan, 'CTV1')
  //common.changePatientDetailTab(IndelPlan, globalConstant.obj.planDesign, false)
  //plan.planDefaultConfirmActivity(IndelPlan)
  //plan.closeConfirmWindow(IndelPlan)
  //exitwithlogic.exitWithLogic(true, false, 1)
  //exitwithlogic.exitWithLogic(false, false, 1)
  //targetRelated.addOnePlanNearMiddlePoint(IndelPlan)   
  
  email.send()
}

