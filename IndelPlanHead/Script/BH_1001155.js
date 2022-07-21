const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const common = require("common")
const plan = require("plan")


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

      const beforeX = plan.pointOperate(indelPlan, "tar", 1, {attr: "X", method: 'get'})
      const beforeY = plan.pointOperate(indelPlan, "tar", 1, {attr: "Y", method: 'get'})
      const beforeZ = plan.pointOperate(indelPlan, "tar", 1, {attr: "Z", method: 'get'})
    
      const afterUpX = plan.pointOperate(indelPlan, "tar", 1, {attr: "X", method: 'set', type: 'up', val: 50})
      const afterUpY = plan.pointOperate(indelPlan, "tar", 1, {attr: "Y", method: 'set', type: 'up', val: 50})
      const afterUpZ = plan.pointOperate(indelPlan, "tar", 1, {attr: "Z", method: 'set', type: 'up', val: 1})
    
      if (strictEqual(Number((beforeX + 5).toFixed(2)), afterUpX) && strictEqual(Number((beforeY + 5).toFixed(2)), afterUpY) && strictEqual(Number((beforeZ + 0.1).toFixed(2)), afterUpZ) && common.comparedPicture(Regions.YANGDAZHONG_MR78_plan_moveXY_point_png, indelPlan.PlanGUI.canvas.PlanC2DViewer.Picture(), globalConstant.obj.pixelTolerance, globalConstant.obj.colourToleranceForPD)) {
        Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
      } else {
        Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
      }
      
      const afterDownX = plan.pointOperate(indelPlan, "tar", 1, {attr: "X", method: 'set', type: 'down', val: 50})
      const afterDownY = plan.pointOperate(indelPlan, "tar", 1, {attr: "Y", method: 'set', type: 'down', val: 50})
      const afterDownZ = plan.pointOperate(indelPlan, "tar", 1, {attr: "Z", method: 'set', type: 'down', val: 1})
    
      if (strictEqual(beforeX, afterDownX) && strictEqual(beforeY, afterDownY) && strictEqual(beforeZ, afterDownZ) && common.comparedPicture(Regions.YANGDAZHONG_MR78_point_png, indelPlan.PlanGUI.canvas.PlanC2DViewer.Picture(), globalConstant.obj.pixelTolerance, globalConstant.obj.colourToleranceForPD)) {
        Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
      } else {
        Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
      }
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to contour fail!`)
    }
  } else {
    Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}