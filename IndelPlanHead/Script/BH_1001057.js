const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const findInList = require("find_in_list")
const fileFunctions = require("file_functions")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable

  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  if (indelPlan.patientManagement.treeWidget_PatientList.wItems.Count !== 0) {
    Log.Error("Should no patient first")
  } else {
    const path = globalConstant.obj.studyDataFolder
    const patientFolderName = `${Project.Variables.study_image_name}@${Project.Variables.study_image_id}`

    patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)

    patient.loadPatient(indelPlan, Project.Variables.new_patientID)
    study.gotoRegisterImporter(indelPlan)
    
    //exist then export and import
    if (study.isStudyExist(indelPlan)) {    
      //delete target folder first
      //incase the postion action incorrect
      fileFunctions.deleteFolder(path + patientFolderName, true)
      utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
      study.exportStudy(indelPlan, Project.Variables.study_image_id, path)
      study.deleteStudy(indelPlan, pv, Project.Variables.study_image_id, "", true)
      study.importStudy(indelPlan, path, false)
    } else {
      study.importStudy(indelPlan, path, false)
    }

    if (study.isStudyExist(indelPlan)) {
      Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
    }
  }

  exitwithlogic.exitWithLogic(false, false, 1)
}