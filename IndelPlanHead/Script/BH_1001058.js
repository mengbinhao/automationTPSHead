const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
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
  
    //delete target folder first
    fileFunctions.deleteFolder(path + globalConstant.obj.backslash + patientFolderName, true)
  
    patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
      
    patient.loadPatient(indelPlan, Project.Variables.new_patientID)

    study.gotoRegisterImporter(indelPlan)
    
    study.exportStudy(indelPlan, Project.Variables.study_image_id, path)

    //check folder exist and update time correct
    if (fileFunctions.isExists(path, patientFolderName)) {
      Log.Checkpoint("Export study successfully!")
    } else {
      Log.Error("Export study fail!")
    }
  }
  
  exitwithlogic.exitWithLogic(false, false, 1)
}