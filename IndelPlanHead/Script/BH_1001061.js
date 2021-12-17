const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  if (indelPlan.patientManagement.treeWidget_PatientList.wItems.Count !== 0) {
    Log.Error("Should no patient first")
  } else {
    const type = "MR"
  
    patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
    patient.loadPatient(indelPlan, Project.Variables.new_patientID)
    study.gotoRegisterImporter(indelPlan)

    if (!study.isStudyExist(indelPlan)) {    
      Log.Error(`Can not find target delete study, study_image_id = ${Project.Variables.study_image_id}`)
    } else {
      const before = study.getSubCountFromOnePatientStudy(indelPlan)
      if (strictEqual(before, globalConstant.obj.notFoundIndex)) {
        Log.Error(`There is no study to delete, study_image_id= ${Project.Variables.study_image_id}`)
        return
      }
      study.deleteStudy(indelPlan, pv, Project.Variables.study_image_id, type, true)
      const after = study.getSubCountFromOnePatientStudy(indelPlan)
      
      if (strictEqual(before, after + 1)) {
        Log.Checkpoint(`Delete study = ${Project.Variables.study_image_id} and type = ${type} successfully!`)
      } else {
        Log.Error(`Delete study = ${Project.Variables.study_image_id} and type = ${type} fail!`)
      }
    }
  }
  
  exitwithlogic.exitWithLogic(false, false, 1)
}