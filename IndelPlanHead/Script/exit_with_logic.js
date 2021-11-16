﻿const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const common = require("common")

//isQuitPopup 1 means yes, 2 means no, 3 means cancel
const exitWithLogic = (isPatientSavePopup = false, isCurrentPlanFinishedPopup = false, isQuitPopup = 1) => {
  const IndelPlan = Project.Variables.IndelPlan    
  //too violence, will popup an unnormal window when next login
  //Sys.Process(IndelPlan.procesName).Terminate()

  //can not close directly due to pupup a comfirm popup
  //Sys.Process(IndelPlan.procesName).Close()
  common.gotoPatientManagement(IndelPlan)
  
  if (IndelPlan.tabWidget.Visible) {
    IndelPlan.main.Close()
    if (isPatientSavePopup) {
      IndelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }

    if (isCurrentPlanFinishedPopup) {
      IndelPlan.plan_current_plan_finished_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
    
    if (strictEqual(isQuitPopup, globalConstant.obj.exitYes)) {
      IndelPlan.main_quit_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else if (strictEqual(isQuitPopup, globalConstant.obj.exitNo)) {
      IndelPlan.main_quit_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    } else if (strictEqual(isQuitPopup, globalConstant.obj.exitCancel)) {
      IndelPlan.main_quit_popup.qt_msgbox_buttonbox.buttonCancel.ClickButton()
    }
  } else {
    if (IndelPlan.loginClass.Visible) IndelPlan.loginClass.Close()
  }
  //have to delay for restarting normally
  utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
}

module.exports.exitWithLogic = exitWithLogic