const globalConstant = require("global_constant")
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

  if (study.addOneRegistedStudyActivity(indelPlan, Project.Variables.study_image_id)) {
    contour.gotoContourWindow(indelPlan)
    contour.loadAndContourSKINActivity(indelPlan)
    indelPlan.ContourGUI.groupBox_5.DeleteLayerAfter.ClickButton()
    indelPlan.contour_delete_planlib_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()

    indelPlan.ContourGUI.canvas.C2DViewer.MouseWheel(-1)
    
    Regions.YANGDAZHONG_MR78_contour_skin_delete_after_png.Check(indelPlan.ContourGUI.canvas.C2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)
  } else {
    Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}