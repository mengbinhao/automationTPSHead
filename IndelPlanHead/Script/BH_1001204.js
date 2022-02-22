const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")


function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)

  if (study.addOneStudyActivity(indelPlan, Project.Variables.study_image_id)) {
    contour.gotoContourWindow(indelPlan)
    const originW =  indelPlan.ContourGUI.SetWW.wText
    const originL =  indelPlan.ContourGUI.SetWL.wText
    
    //set L
    LLPlayer.MouseDown(MK_LBUTTON, 1867, 450, 500)
    LLPlayer.MouseMove(1867, 500, 500)
    LLPlayer.MouseUp(MK_LBUTTON, 1867, 500, 500)
    utilsFunctions.delay(globalConstant.obj.delayOneSeconds)
    //set W
    LLPlayer.MouseDown(MK_LBUTTON, 1867, 654, 500)
    LLPlayer.MouseMove(1867, 704, 500)
    LLPlayer.MouseUp(MK_LBUTTON, 1867, 704, 500)

    if (originW !== indelPlan.ContourGUI.SetWW.wText && originL !== indelPlan.ContourGUI.SetWL.wText) {
      Log.Checkpoint("Drag W&L successfully in Contour window!")
    } else {
      Log.Error("BH_1001204 execute fail!")
    }
  } else {
     Log.Error(`Add ContourLib fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(true, false, 1)
}