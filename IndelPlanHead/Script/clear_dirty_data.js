const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const patient = require("patient")
const user = require("user")
const contour = require("contour")
const study = require("study")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

const clearDirtyData = () => {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  const contourArr = pv.dirtyData.get(globalConstant.obj.addContourLib)
  const patientArr = pv.dirtyData.get(globalConstant.obj.addPatient)
  const userArr = pv.dirtyData.get(globalConstant.obj.addUser)
  const restoreStudy = pv.dirtyData.get(globalConstant.obj.restoreStudy)
  const machineArr = pv.dirtyData.get(globalConstant.obj.addMachine)
  
  //delete must be suquence
  if (contourArr.length > 0) {
    Log.Message("Clear Contour test data")
    contour.deleteContourForDirtyData(indelPlan, contourArr)
  }
  if (restoreStudy) {
    study.restoreStudy(indelPlan)
    pv.dirtyData.set(globalConstant.obj.restoreStudy, false)
  }
  if (patientArr.length > 0) {
    Log.Message("Clear Patient test data")
    patient.deletePatientForDirtyData(indelPlan, patientArr)
  }
  if (userArr.length > 0) {
    Log.Message("Clear User test data")
    user.deleteUserForDirtyData(indelPlan, userArr)
  }
  if (machineArr.length > 0){
    Log.Message("Clear Machine test data")
    physicaldata.deleteMachineForDirtyData(indelPlan, machineArr)
  }

  exitwithlogic.exitWithLogic(false, false, 1)
}

module.exports.clearDirtyData = clearDirtyData