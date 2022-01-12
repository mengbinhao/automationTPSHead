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
    contour.loadContourLibByType(indelPlan, "TARGET")
    contour.loadContourLibByType(indelPlan, "OAR")
  
    const planList = indelPlan.ContourGUI.groupBox_6.PlanLib
    const origin = 2
  
    if (planList.wItems.count !== origin) {
      Log.Error(`PlanLib count must be two!`)
      exitwithlogic.exitWithLogic(false, false, 1)
      return
    }
  
    indelPlan.ContourGUI.groupBox_5.LogicOperationButton.ClickButton()
  
    const logicWindow = indelPlan.contour_logic_dialog
    const logicList = logicWindow.LogicOperationgContourLib
 
    if (logicList.wItems.count !== 2) {
      Log.Error(`logicList count must be two!`)
      logicWindow.Close()
      exitwithlogic.exitWithLogic(false, false, 1)
      return
    }
  
    contour.logicOperate(indelPlan, logicWindow.LogicOperator.logicAnd)
  
    if (!indelPlan.contour_logic_error_popup.Exists) {
      const target = planList.wItems.count
      if (origin + 1=== target) {
        Log.Checkpoint(`Logic Operate Contour successfully!`)
      } else {
        Log.Error(`Logic Operate Contour fail!`)
      }
    } else {
      Log.Error(`Logic Operate Contour fail!`)
      indelPlan.contour_logic_error_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }
    logicWindow.Close()
  } else {
    Log.Error(`Logic Operate Contour fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}