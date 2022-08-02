const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const common = require("common")


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
    contour.loadAndContourTargetAreaByBrushActivity(indelPlan, 'tar')
    contour.contourScale(indelPlan, true, false, 2, 1, 5, 4, 2)

    //erase mouse circle
    indelPlan.ContourGUI.groupBox_5.pbManualSketch.ClickButton()
    LLCollection.move_to_center.Execute(indelPlan.ContourGUI)
    utilsFunctions.delay(globalConstant.obj.delayOneSecond)
    LLCollection.move_out_of_main_image.Execute(indelPlan.ContourGUI)
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)

    Regions.YANGDAZHONG_MR78_contour_unisotropically_png.Check(indelPlan.ContourGUI.canvas.C2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)
  } else {
    Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}