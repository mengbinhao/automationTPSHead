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
    contour.loadContourLibByType(indelPlan, "TARGET")
  
    const list = indelPlan.ContourGUI.groupBox_6.PlanLib
  
    if (list.wItems.count !== 1) {
      Log.Error(`PlanLib count must be one!`)
      exitwithlogic.exitWithLogic(false, false, 1)
      return
    }
  
    const index =  findInList.isItemExistInMoreListReturnIndex("TARGET", globalConstant.obj.contourType, list)
  
    if (strictEqual(index, globalConstant.obj.notFoundIndex)) {
      Log.Error(`Copy as Contour fail due to can not find target contour item, contourType = ${globalConstant.obj.contourType}!`)
    } else {
      const origin = list.wItems.item(0).Text(globalConstant.obj.nameColumn)
      list.ClickItem(origin)
      indelPlan.ContourGUI.groupBox_5.Copyto.ClickButton()
      const target = list.wItems.item(1).Text(globalConstant.obj.nameColumn)
      if ("Copy_From_" + origin === target) {
        Log.Checkpoint(`Copy as Contour successfully!`)
      } else {
        Log.Error(`Copy as Contour fail!`)
      }
    }
  } else {
    Log.Error(`Copy as Contour fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}