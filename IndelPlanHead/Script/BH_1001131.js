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
    contour.loadAndContourSKINActivity(indelPlan)
    //only contour one layer
    contour.loadAndContourTargetAreaByBrushActivity(indelPlan, 'tar')

    const before = indelPlan.ContourGUI.groupBox_6.PlanLib.wItems.Count
    contour.contourScale(indelPlan, true, false, 3, 1, 3, 5, 2)
    const after = indelPlan.ContourGUI.groupBox_6.PlanLib.wItems.Count

    if (strictEqual(before + 1, after)) {
      Log.Checkpoint(`Create as Contour Scale successfully!`)
    } else {
      Log.Error(`Create as Contour Scale fail!`)
    }
  } else {
    Log.Error(`Create as Contour Scale fail due to register study!`)
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}