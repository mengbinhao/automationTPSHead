﻿const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const study = require("study")
const contour = require("contour")
const common = require("common")
const plan = require("plan")


function testcase() {
  
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
 
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
  
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)

  if (study.addOneStudyActivity(indelPlan, Project.Variables.study_image_id)) {
    contour.gotoContourWindow(indelPlan)
    contour.loadAndContourSKINActivity(indelPlan)
    contour.loadAndContourTargetAreaByBrushActivity(indelPlan, 'tar')
    common.changePatientDetailTab(indelPlan, globalConstant.obj.planDesign)
    plan.addTreatCourse(indelPlan, true)
    plan.addPlan(indelPlan, "TC1", "TC1_P1", true)
    plan.gotoPlanDesign(indelPlan, "TC1", "TC1_P1", true)
    
    const before = indelPlan.CPlanInforPanel.focusList.wItems.Item(0).Items.Count
    plan.setupPoint(indelPlan, "tar")
    const afterAdd = indelPlan.CPlanInforPanel.focusList.wItems.Item(0).Items.Count
    plan.deletePoint(indelPlan, "tar", 1)
    const afterDelete = indelPlan.CPlanInforPanel.focusList.wItems.Item(0).Items.Count
    
    if (strictEqual(before + 1, afterAdd) && strictEqual(before, afterDelete)) {
      Log.Checkpoint(`deletePoint by mouse successfully!`)
    } else {
      Log.Error(`deletePoint by mouse fail!`)
    }
  } else {
    Log.Error(`Execute fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}