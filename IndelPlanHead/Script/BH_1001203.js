const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const common = require("common")
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
    
    const w = Sys.Desktop.Width / 2
    const h = Sys.Desktop.Height / 2
    LLPlayer.MouseDown(MK_LBUTTON, w, h, globalConstant.obj.delayMouseZeroSecond)
    LLPlayer.MouseUp(MK_LBUTTON, w, h, globalConstant.obj.delayMouseHalfSecond)
    common.moveMouse(220, 800, 500)
  Regions.YANGDAZHONG_MR78_common_rebuild_png.Check(indelPlan.ContourGUI.canvas.C2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)
  } else {
     Log.Error(`Execute ${Project.TestItems.Current.Name} fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(true, false, 1)
}