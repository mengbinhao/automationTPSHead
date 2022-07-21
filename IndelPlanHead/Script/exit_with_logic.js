const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const common = require("common")

//isQuitPopup 1 means yes, 2 means no, 3 means cancel
const exitWithLogic = (isPatientSavePopup = false, isCurrentPlanFinishedPopup = false, isQuitPopup = 1) => {
  const indelPlan = Project.Variables.IndelPlan    
  //goto PatientManagement first
  common.gotoPatientManagement(indelPlan, isPatientSavePopup)
  
  if (indelPlan.patientManagement.Visible) {
    indelPlan.main.Close()
    if (isPatientSavePopup && indelPlan.patient_update_popup.Exists) {
      indelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }

    if (isCurrentPlanFinishedPopup) {
      indelPlan.plan_finished_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
    
    if (strictEqual(isQuitPopup, 1)) {
      indelPlan.main_quit_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else if (strictEqual(isQuitPopup, 2)) {
      indelPlan.main_quit_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    } else if (strictEqual(isQuitPopup, 3)) {
      indelPlan.main_quit_popup.qt_msgbox_buttonbox.buttonCancel.ClickButton()
    }
  } else {
    if (indelPlan.login.Visible) indelPlan.login.Close()
  }
  //has to delay for restarting normally
  utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
}

module.exports.exitWithLogic = exitWithLogic