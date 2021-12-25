﻿const globalConstant = require("global_constant")
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
    patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
    patient.loadPatient(indelPlan, Project.Variables.new_patientID)
    study.gotoRegisterImporter(indelPlan)
    study.loadStudy(indelPlan, Project.Variables.study_image_id, "CT", false)

    if (!indelPlan.register_area.checkBox.Enabled) {
      Log.Checkpoint(`load ${Project.Variables.study_image_name} image successfully!`)
    } else {
      Log.Error(`load ${Project.Variables.study_image_name} image fail!`)
    }
    //Regions.YANGDAZHONG_CT95_after_load.Check(indelPlan.register_importer.wdMainView.Picture(), false, false, globalConstant.obj.pixelTolerance, 0, 0)
  }
  
  exitwithlogic.exitWithLogic(false, false, 1)
}