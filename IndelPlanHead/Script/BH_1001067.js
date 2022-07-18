const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const common = require("common")


function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  if (indelPlan.patientManagement.treeWidget_PatientList.wItems.Count !== 0) {
    Log.Error("Should no patient first")
  } else {
    patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
    patient.loadPatient(indelPlan, Project.Variables.new_patientID)
    study.gotoRegisterImporter(indelPlan)
    study.loadStudy(indelPlan, Project.Variables.study_image_id, "MR", false)
    common.setWWAndWL(indelPlan, 'study', 625, 492)
    Regions.YANGDAZHONG_MR78_image_loaded_png.Check(indelPlan.register_importer.wdMainView.Picture(), false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)
  }
  
  exitwithlogic.exitWithLogic(false, false, 1)
}