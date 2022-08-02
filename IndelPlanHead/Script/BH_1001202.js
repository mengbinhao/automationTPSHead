const globalConstant = require("global_constant")
const coordinate = require("coordinate")
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
    
      if (indelPlan.PlanGUI.VisibleOnScreen) {
        LLCollection.move_to_center.Execute(indelPlan.PlanGUI)
        LLCollection.rotate_up_10_slices.Execute(indelPlan.PlanGUI)
  Regions.YANGDAZHONG_MR78_common_plan_rotate_down_mouse_png.Check(indelPlan.PlanGUI.canvas.PlanC2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)
    utilsFunctions.delay(globalConstant.obj.delayOneSecond)
    LLCollection.rotate_down_20_slices.Execute(indelPlan.PlanGUI)
    Regions.YANGDAZHONG_MR78_common_plan_rotate_up_mouse_png.Check(indelPlan.PlanGUI.canvas.PlanC2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)    
      } else {
        Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to window is not right!`)
      }
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to contour fail!`)
    }
  } else {
    Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}