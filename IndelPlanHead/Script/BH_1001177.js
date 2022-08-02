const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const common = require("common")
const plan = require("plan")
const coordinate = require("coordinate")


function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
 
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)
  study.addOneStudyActivity(indelPlan, Project.Variables.study_image_id)
  contour.gotoContourWindow(indelPlan)
  contour.loadAndContourSKINActivity(indelPlan)
  //can not compare with registered image
  //pass after drawing 27 times 
  contour.loadAndContourTargetAreaByBrushActivity(indelPlan, 'tar')
  common.changePatientDetailTab(indelPlan, globalConstant.obj.planDesign)
  plan.addTreatCourse(indelPlan, true)
  plan.addPlan(indelPlan, "TC1", "TC1_P1", true)
  plan.gotoPlanDesign(indelPlan, "TC1", "TC1_P1", true)
  plan.setupPoint(indelPlan, "tar")
  plan.calculateDose(indelPlan, true)
  plan.calculateDose(indelPlan, false)
  indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_3.toolButton_36.ClickButton()
  const position = coordinate.getNearMiddleCoordinate()
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height + 50, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height + 50, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height + 50, globalConstant.obj.delayMouseHalfSecond)
  LLCollection.move_out_of_main_image.Execute(indelPlan.PlanGUI)

  Regions.YANGDAZHONG_MR78_plan_drr_png.Check(indelPlan.PlanGUI.canvas.PlanC2DViewer.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourToleranceForPD)
  exitwithlogic.exitWithLogic(false, false, 1)
}