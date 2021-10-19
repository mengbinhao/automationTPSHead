const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const user = require("user")
const contour = require("contour")
const physicaldata = require("physical_data")
const exitwithlogic = require("exit_with_logic")

const clearDirtyData = () => {
  const IndelPlan = Project.Variables.IndelPlan
  const dirtyData = IndelPlan.dirtyData
  
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  
  const contourArr = IndelPlan.dirtyData.get(globalConstant.obj.addContourLib)
  const patientArr = IndelPlan.dirtyData.get(globalConstant.obj.addPatient)
  const userArr = IndelPlan.dirtyData.get(globalConstant.obj.addUser)
  const machineArr = IndelPlan.dirtyData.get(globalConstant.obj.addMachine)
  
  //delete must be suquence
  if (contourArr.length > 0) {
    contour.deleteContourForDirtyData(IndelPlan, contourArr)
  }
  if (patientArr.length > 0) {
    patient.deletePatientForDirtyData(IndelPlan, patientArr)
  }
  if (userArr.length > 0) {
    user.deleteUserForDirtyData(IndelPlan, userArr)
  }
  if (machineArr.length > 0){
    physicaldata.deleteMachineForDirtyData(IndelPlan, machineArr)
  }

  exitwithlogic.exitWithLogic(false, false, 1)
}

module.exports.clearDirtyData = clearDirtyData;