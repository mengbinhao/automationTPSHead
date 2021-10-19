const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const findinlist = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_224() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  const patientList = IndelPlan.patientManagement.treeWidget_PatientList
  patient.addPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.newpatientname, false)
  let checkObj = {}
  let isExist = findinlist.isItemExistInMoreList(Project.Variables.newpatientID, globalConstant.obj.patientID, patientList)
  checkObj.isExist = isExist
  aqObject.CheckProperty(checkObj, "isExist", cmpEqual, true)
  patient.deletePatient(IndelPlan, Project.Variables.newpatientID, false)
  
  isExist = findinlist.isItemExistInMoreList(Project.Variables.newpatientID, globalConstant.obj.patientID, patientList)
  checkObj.isExist = isExist
  aqObject.CheckProperty(checkObj, "isExist", cmpEqual, false)

  checkObj = null
  exitwithlogic.exitWithLogic(false, true)
}