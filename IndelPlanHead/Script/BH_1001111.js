const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const findInList = require("find_in_list")


function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)

  if (study.addOneRegistedStudyActivity(indelPlan, Project.Variables.study_image_id)) {
    contour.gotoContourWindow(indelPlan)

    contour.addContourLib(indelPlan, pv, Project.Variables.contourlib_name, Project.Variables.contourlib_type, Project.Variables.contourlib_display_mode, false, true)

    contour.deleteContourLib(indelPlan, pv, Project.Variables.contourlib_name, false, true)
  
    const isExist =  findInList.isItemExistInMoreList(Project.Variables.contourlib_name, globalConstant.obj.nameColumn, indelPlan.ContourGUI.groupBox_6.PlanLib )
  
    if (!isExist) {
      Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
    }
  } else {
    Log.Error(`Delete PlanLib fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}