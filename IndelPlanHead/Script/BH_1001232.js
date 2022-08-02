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

  if (study.addOneRegistedStudyActivity(indelPlan, Project.Variables.study_image_id)) {
    contour.gotoContourWindow(indelPlan)

    const originState = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton.down
    const originState2 = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.down
    indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.ClickButton()
    utilsFunctions.delay(globalConstant.obj.delayOneSecond)
    const originStateAfterPressed = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton.down
    const originStateAfterPressed2 = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.down
    
    LLCollection.exit_measure_mode.Execute(indelPlan.ContourGUI)
    utilsFunctions.delay(globalConstant.obj.delayOneSecond)
    
    const exitInteract = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton.down
    const exitInteract2 = indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_4.down

    if (originState === !originState2 && originStateAfterPressed === !originStateAfterPressed2 && exitInteract === !exitInteract2) {
      Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
    }
  } else {
     Log.Error(`Add ContourLib fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(true, false, 1)
}