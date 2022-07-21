const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const common = require("common")
const plan = require("plan")
const utilsFunctions = require("utils_functions")


function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
 
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)

  if (study.addOneRegistedStudyActivity(indelPlan, Project.Variables.study_image_id)) {
    contour.gotoContourWindow(indelPlan)
    contour.loadAndContourSKINActivity(indelPlan)
    if (contour.loadAndContourTargetAreaByBrushActivity(indelPlan, 'tar')) {
      common.changePatientDetailTab(indelPlan, globalConstant.obj.planDesign)
      plan.addTreatCourse(indelPlan, true)
      plan.addPlan(indelPlan, "TC1", "TC1_P1", true)
      plan.gotoPlanDesign(indelPlan, "TC1", "TC1_P1", true)
      plan.setupPoint(indelPlan, "tar")
      plan.movePointOutBound(indelPlan, "tar", 1, false)
      //in case mouse position tooltip
      common.moveMouse(220, 800, 500)
      utilsFunctions.delay(globalConstant.obj.delayOneSecond)
         Regions.YANGDAZHONG_MR78_plan_moveoutbound_point_notkeep_png.Check(indelPlan.PlanGUI.canvas.PlanC2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourToleranceForPD)
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to contour fail!`)
    }
  } else {
    Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}