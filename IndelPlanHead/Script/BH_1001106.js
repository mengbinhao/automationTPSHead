﻿const launch = require("launch")
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
  
    const before = indelPlan.ContourGUI.groupBox_4.ContourLib.wItems.Count
    contour.addContourLib(indelPlan, pv, Project.Variables.contourlib_name, Project.Variables.contourlib_type, Project.Variables.contourlib_display_mode, true, false)
    const after = indelPlan.ContourGUI.groupBox_4.ContourLib.wItems.Count

    if (strictEqual(before, after)) {
      Log.Checkpoint(`Cancel add ContourLib successfully!`)
    } else {
      Log.Error(`Cancel add ContourLib fail!`)
    }
  } else {
    Log.Error(`Cancel add ContourLib fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}