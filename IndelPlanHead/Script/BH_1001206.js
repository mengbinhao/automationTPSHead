const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
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
    
      const originW =  indelPlan.PlanGUI.widget_3.splitter_2.widget_5.leWidth.wText
      const originL =  indelPlan.PlanGUI.widget_3.splitter_2.widget_5.leLevel.wText
    
      //set L
      LLPlayer.MouseDown(MK_LBUTTON, 1855, 445, 500)
      LLPlayer.MouseMove(1855, 495, 500)
      LLPlayer.MouseUp(MK_LBUTTON, 1855, 495, 500)
      utilsFunctions.delay(globalConstant.obj.delayOneSeconds)
      //set W
      LLPlayer.MouseDown(MK_LBUTTON, 1855, 654, 500)
      LLPlayer.MouseMove(1855, 704, 500)
      LLPlayer.MouseUp(MK_LBUTTON, 1855, 704, 500)

      if (originW !== indelPlan.PlanGUI.widget_3.splitter_2.widget_5.leWidth.wText && originL !== indelPlan.PlanGUI.widget_3.splitter_2.widget_5.leLevel.wText) {
        Log.Checkpoint("Drag W&L successfully in Planwindow!")
      } else {
        Log.Error("BH_1001206 execute fail!")
      }
    } else {
      Log.Error(`Execute fail due to contour fail!`)
    } 
  } else {
    Log.Error(`Execute fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}