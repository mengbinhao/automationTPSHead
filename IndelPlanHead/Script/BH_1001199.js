const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
   if (indelPlan.patientManagement.treeWidget_PatientList.wItems.Count !== 0) {
    Log.Error("Should no patient first")
  } else {
    indelPlan.patientManagement.pushButton_DeletePatient.ClickButton()
    if (indelPlan.patient_delete_nochoice_popup.Exists) {
      indelPlan.patient_delete_nochoice_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      Log.Checkpoint("Delete patient should select first!")
    } else {
      Log.Error(`Execute ${Project.TestItems.Current.Name} fail!`)
    }
  }
  exitwithlogic.exitWithLogic(false, false, 1)
}