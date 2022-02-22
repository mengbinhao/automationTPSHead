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

    const originState = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.down
    indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.ClickButton()
    utilsFunctions.delay(globalConstant.obj.delayOneSeconds)
    const originStateAfterPressed = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.down
    LLPlayer.MouseMove(934, 562, 500)
    LLPlayer.MouseDown(MK_RBUTTON, 934, 562, 500)
    LLPlayer.MouseUp(MK_RBUTTON, 934, 562, 500)
    LLPlayer.MouseMove(972, 688, 500)
    utilsFunctions.delay(globalConstant.obj.delayOneSeconds)
    LLPlayer.MouseDown(MK_LBUTTON, 972, 688, 500)
    LLPlayer.MouseUp(MK_LBUTTON, 972, 688, 500)
    utilsFunctions.delay(globalConstant.obj.delayOneSeconds)
    const exitInteract = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.down

    if (originState === exitInteract && originState === !originStateAfterPressed) {
      Log.Checkpoint("BH_10012030 execute successfully!")
    } else {
      Log.Error("BH_10012030 execute fail!")
    }
  } else {
     Log.Error(`Add ContourLib fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(true, false, 1)
}