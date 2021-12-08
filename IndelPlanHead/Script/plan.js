const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
const common = require("common")
const targetRelated = require("target_related")

//unified approach
const __closePlanList = indelPlan => {
  if (indelPlan.plan_PlanList.Exists) {
    indelPlan.plan_PlanList.Close()
  }
}

const __getNextTreatCourseName = indelPlan => {
  const cnt = indelPlan.PatientData.groupBox_5.treeWidget_PlanList.wItems.Count
  return `TC${cnt + 1}`
}

const __getTargetPlan = (parentTC, planName) => {
  const cnt = parentTC.Items.Count
  if (cnt < 1) return globalConstant.obj.notFoundIndex
  for (let i = 0; i < cnt; i++) {
    if (strictEqual(parentTC.Items.Item(i).Text(globalConstant.obj.nameColumn), planName)) return i
  }
  return globalConstant.obj.notFoundIndex
}

const __getNextCopyPlanName = (parentTC, copiedPlanName) => {
  const cnt = parentTC.Items.Count
  if (cnt === 1) return `^${copiedPlanName}_C1`
  let maxNumber = 1
  const reg = new RegExp(`^${copiedPlanName}_C(\\d+)$`)
  for (let i = 0; i < cnt; i++) {
    const tmp = parentTC.Items.Item(i).Text(globalConstant.obj.nameColumn).match(reg)
    if (tmp) {
      if (+tmp[1] > maxNumber) maxNumber = +tmp[1]
    }
  }
  return `${copiedPlanName}_C${maxNumber + 1}`
}

const addTreatCourse = (indelPlan, isAdd = false) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    indelPlan.PatientData.groupBox_5.pushButton_AddTreatCourse.ClickButton()
    if (isAdd) {
      indelPlan.detail_tc_new_treatcourse.pushButton_Ok.ClickButton()
      //pv.dirtyData.set(globalConstant.obj.addTreatCourse, __getNextTreatCourseName(indelPlan))
    } else {
      indelPlan.detail_tc_new_treatcourse.pushButton_Cancel.ClickButton()
    }
  } else {
    Log.Warning(`Can not addTreatCourse due to window is not right`) 
  }
}

const deleteTreatCourse = (indelPlan, TCName, isDelete = false) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(TCName, globalConstant.obj.nameColumn, TCList)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      TCList.wItems.Item(rowIdx).Click()
      indelPlan.PatientData.groupBox_5.pushButton_DeletePlan.ClickButton()
      if (indelPlan.detail_tc_delete_tc_inuse_popup.Exists) {
        Log.Warning(`Can not delete TC due to it is in use`)
        return
      }
      if (isDelete) {
        indelPlan.detail_tc_delete_tc_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      } else {
        indelPlan.detail_tc_delete_tc_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    } else {
      Log.Warning(`Can not find TC with TCName=${TCName} when deleteTreatCourse`)
    }
  } else {
    Log.Warning(`Can not deleteTreatCourse due to window is not right`) 
  }
}

const addPlan = (indelPlan, parentTCName, isAdd = false) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not addPlan due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    TCList.wItems.Item(rowIdx).Click()
    indelPlan.PatientData.groupBox_5.pushButton_AddPlan.ClickButton()

    if (indelPlan.detail_tc_addplan_no_contours_or_studys_popup.Exists) {
      Log.Warning(`Can not addPlan due to no contour_or_study`)
      return
    }
    
    if (isAdd) {
      indelPlan.detail_tc_new_plan.pushButton_Ok.ClickButton()
      if (!indelPlan.detail_tc_addplan_no_selected_contour_popup.Exists && !indelPlan.detail_tc_addplan_no_selected_skin_popup.Exists && !indelPlan.detail_tc_addplan_no_selected_target_popup.Exists) {
        if (indelPlan.detail_tc_addplan_not_ct_popup.Exists) common.handlePopupDialog(indel.detail_tc_addplan_not_ct_popup, 1)
      }
    } else {
      indelPlan.detail_tc_new_plan.pushButton_Cancel.ClickButton()
    }
  } else {
    Log.Warning(`Can not addPlan due to window is not right`) 
  }
}

const deletePlan = (indelPlan, parentTCName, planName, isDelete = false) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not deletePlan due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    const subRowIdx = __getTargetPlan(TCList.wItems.Item(rowIdx), planName)
    if (strictEqual(subRowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not deletePlan due to can not find target planName with planName=${planName}`)
      return
    }
    
    TCList.wItems.Item(rowIdx).Items.Item(subRowIdx).Click()
    indelPlan.PatientData.groupBox_5.pushButton_DeletePlan.ClickButton()
    
    if (isDelete) {
      indelPlan.detail_tc_delete_plan_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else {
      indelPlan.detail_tc_delete_plan_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not deletePlan due to window is not right`) 
  }
}

const copyPlan = (indelPlan, parentTCName, copiedplanName, isCopy = false) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not copyPlan due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    const parentTC = TCList.wItems.Item(rowIdx)
    const subRowIdx = __getTargetPlan(parentTC, copiedplanName)
    if (strictEqual(subRowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not copyPlan due to can not find target copiedplanName with planName=${copiedplanName}`)
      return
    }
    parentTC.Items.Item(subRowIdx).Click()
    const newCopiedPlanName = __getNextCopyPlanName(parentTC, parentTC.Items.Item(subRowIdx).Text(globalConstant.obj.nameColumn))
    indelPlan.PatientData.groupBox_5.pushButton_CopyPlan.ClickButton()
    if (isCopy) {      
      indelPlan.detail_tc_copy_plan_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      //pv.dirtyData.set(globalConstant.obj.addPlan, newCopiedPlanName)
    } else {
      indelPlan.detail_tc_copy_plan_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not copyPlan due to window is not right`) 
  }
}

//By double click
const gotoPlanDesign = (indelPlan, parentTCName, planName) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not gotoPlanDesign due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    const parentTC = TCList.wItems.Item(rowIdx)
    const subRowIdx = __getTargetPlan(parentTC, planName)
    if (strictEqual(subRowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not gotoPlanDesign due to can not find target planName with planName=${planName}`)
      return
    }
    parentTC.Items.Item(subRowIdx).DblClick()
    //just in case
    utilsfunctions.delay(globalConstant.obj.delayOneMinute)
  } else {
    Log.Warning(`Can not gotoPlanDesign due to window is not right`) 
  }
}

//true gross, false fine
const calculateDose = (indelPlan, type = false) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    const obj = indelPlan.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel.groupBox_2
    type ? obj.cbSample.setCurrentIndex(0) : obj.cbSample.setCurrentIndex(1)
    obj.pbCalDose.ClickButton()
    utilsfunctions.delay(globalConstant.obj.delayThirtySeconds)
  } else {
    Log.Warning(`Can not calculateDose due to window is not right`) 
  }
}

const setDose = (indelPlan, percentage = 50, doseValue = 1000) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    const obj = indelPlan.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel.groupBox
    obj.Percentage.SetText(percentage)
    obj.pDose.SetText(doseValue)
    obj.pbSetPD.ClickButton()
    if (indelPlan.plan_do_fine_dose_calculate_popup.Exists) return
    utilsfunctions.delay(globalConstant.obj.delayThirtySeconds)
  } else {
    Log.Warning(`Can not setDose due to window is not right`) 
  }
}

const setFraction = (indelPlan, fraction = 1) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    indelPlan.PlanGUI.widget.groupBox_2.pbFraction.ClickButton()
    if (indelPlan.plan_do_fine_dose_calculate_popup.Exists) return
    if (indelPlan.plan_set_prescription_dose_popup.Exists) return
    indelPlan.plan_dlgfraction.sbFractionCount.qt_spinbox_lineedit.SetText(fraction)
    indelPlan.plan_dlgfraction.Close()
  } else {
    Log.Warning(`Can not setFraction due to window is not right`) 
  }
}

const confirmPlan = (indelPlan, userName, password, isConfirm = true) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    indelPlan.PlanGUI.widget.groupBox_2.pbConfirm.ClickButton()
    if (indelPlan.plan_do_fine_dose_calculate_popup.Exists) return
    if (indelPlan.plan_unfinished_popup.Exists) return
    indelPlan.plan_confirm.pbConfirm.ClickButton()
    indelPlan.plan_confirm_sign.lineEdit.SetText(userName)
    indelPlan.plan_confirm_sign.lineEdit_2.SetText(password)
    if (isConfirm) {
      indelPlan.plan_confirm_sign.pushButton.ClickButton()
      if (indelPlan.plan_confirm_wrong_user_popup.Exists) return
      if (indelPlan.plan_confirm_wrong_password_popup.Exists) return
      indelPlan.plan_confirmed_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    } else {
      indelPlan.plan_confirm_sign.pushButton_2.ClickButton()
    }
  } else {
    Log.Warning(`Can not setFraction due to window is not right`) 
  }
}

const pushToController = indelPlan => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    indelPlan.PatientData.pushButton_PushPlan.ClickButton()
    if (indelPlan.detail_tc_no_plan_selected_popup.Exists) return
    if (indelPlan.detail_push_controller_not_confirmed_popup.Exists) return
    if (indelPlan.detail_push_controller_popup.Exists) {
      indelPlan.detail_push_controller_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
      indelPlan.detail_push_controller_complete_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }
  } else {
    Log.Warning(`Can not pushToController due to window is not right`) 
  }
}

const closeConfirmWindow = indelPlan => {
  indelPlan.plan_confirm.Close()
}

const planDefaultConfirmActivity = indelPlan => {
  addTreatCourse(indelPlan, true)
  addPlan(indelPlan, 'TC1', true)
  gotoPlanDesign(indelPlan, 'TC1', 'TC1_P1')
  targetRelated.addOnePlanNearMiddlePoint(indelPlan)
  calculateDose(indelPlan)
  setDose(indelPlan)
  setFraction(indelPlan)
  confirmPlan(indelPlan, Project.Variables.username, Project.Variables.password, true)
}

module.exports.addTreatCourse = addTreatCourse
module.exports.deleteTreatCourse = deleteTreatCourse
module.exports.addPlan = addPlan
module.exports.deletePlan = deletePlan
module.exports.copyPlan = copyPlan
module.exports.gotoPlanDesign = gotoPlanDesign
module.exports.calculateDose = calculateDose
module.exports.setDose = setDose
module.exports.setFraction = setFraction
module.exports.confirmPlan = confirmPlan
module.exports.closeConfirmWindow = closeConfirmWindow
module.exports.pushToController = pushToController
module.exports.planDefaultConfirmActivity = planDefaultConfirmActivity
