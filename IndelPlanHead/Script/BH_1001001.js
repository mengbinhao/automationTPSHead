const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const patient = require("patient")
const fileFunctions = require("file_functions")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable

  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  if (indelPlan.patientManagement.treeWidget_PatientList.wItems.Count !== 0) {
    Log.Error("Should no patient first")
  } else {
    const path = globalConstant.obj.patientDataFolder
    const patientFolderName = `${Project.Variables.new_patient_name}@${Project.Variables.new_patientID}`
  
    //delete target folder first
    fileFunctions.deleteFolder(path + patientFolderName, true)
  
    patient.addPatientActivity(indelPlan, pv, Project.Variables.new_patientID, Project.Variables.new_patient_name, Project.Variables.new_patient_gender, Project.Variables.new_patient_height, Project.Variables.new_patient_weight, Project.Variables.new_patient_age, Project.Variables.new_patient_address, Project.Variables.new_patient_phone, Project.Variables.new_patient_note)
      
    patient.exportPatient(indelPlan, Project.Variables.new_patientID, path, false)
    aqObject.CheckProperty(indelPlan.patient_export_done_popup, "Exists", cmpEqual, true)   
    indelPlan.patient_export_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    indelPlan.patient_exporter.pushButton_Cancel.ClickButton()

    //check folder exist and update time correct
    if (fileFunctions.isExists(path, patientFolderName)) {
      Log.Checkpoint(`Execute ${Project.TestItems.Current.Name} successfully!`)
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
    }
  }

  exitwithlogic.exitWithLogic(false, false, 1)
}