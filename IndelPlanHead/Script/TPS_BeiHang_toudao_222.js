const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const findinlist = require("find_in_list")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_222() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  const patientList = IndelPlan.patientManagement.treeWidget_PatientList
  patient.addPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.newpatientname, false)
  patient.editPatient(IndelPlan, Project.Variables.newpatientID, Project.Variables.editpatientname, false)
  
  const patientName = findinlist.getFieldValueForMoreListFromOtherField(Project.Variables.newpatientID, globalConstant.obj.patientID, globalConstant.obj.patientName, patientList)

  let checkObj = {}
  checkObj.patientName = patientName
  aqObject.CheckProperty(checkObj, "patientName", cmpEqual, Project.Variables.editpatientname)
  checkObj = null
  exitwithlogic.exitWithLogic(false, true)
}