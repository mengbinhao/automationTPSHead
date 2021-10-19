const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
const common = require("common")
const targetRelated = require("target_related")

//unified approach
const __closePlanList = indel => {
  if (indel.plan_PlanListClass.Exists) {
    indel.plan_PlanListClass.Close()
  }
}

const __getNextTreatCourseName = indel => {
  const cnt = indel.patientDataClass.groupBox_5.treeWidget_PlanList.wItems.Count
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

const addTreatCourse = (indel, isAdd = false) => {
  __closePlanList(indel)
  if (indel.patientDataClass.VisibleOnScreen) {
    indel.patientDataClass.groupBox_5.pushButton_AddTreatCourse.ClickButton()
    if (isAdd) {
      indel.detail_tc_TreatcourseAddClass.pushButton_Ok.ClickButton()
      if (!indel.detail_tc_no_set_no_bodypart_popup.Exists) {
        //indel.dirtyData.set(globalConstant.obj.addTreatCourse, __getNextTreatCourseName(indel))
      }
    } else {
      indel.detail_tc_TreatcourseAddClass.pushButton_Cancel.ClickButton()
    }
  } else {
    Log.Warning(`Can not addTreatCourse due to window is not right`) 
  }
}

const deleteTreatCourse = (indel, TCName, isDelete = false) => {
  __closePlanList(indel)
  if (indel.patientDataClass.VisibleOnScreen) {
    const TCList = indel.patientDataClass.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(TCName, globalConstant.obj.nameColumn, TCList)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      TCList.wItems.Item(rowIdx).Click()
      indel.patientDataClass.groupBox_5.pushButton_DeletePlan.ClickButton()
      if (indel.detail_tc_delete_tc_in_use_popup.Exists) {
        Log.Warning(`Can not delete TC due to it is in use`)
        return
      }
      if (isDelete) {
        indel.detail_tc_delete_tc_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      } else {
        indel.detail_tc_delete_tc_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    } else {
      Log.Warning(`Can not find TC with TCName=${TCName} when deleteTreatCourse`)
    }
  } else {
    Log.Warning(`Can not deleteTreatCourse due to window is not right`) 
  }
}

const addPlan = (indel, parentTCName, isAdd = false) => {
  __closePlanList(indel)
  if (indel.patientDataClass.VisibleOnScreen) {
    const TCList = indel.patientDataClass.groupBox_5.treeWidget_PlanList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not addPlan due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    TCList.wItems.Item(rowIdx).Click()
    indel.patientDataClass.groupBox_5.pushButton_AddPlan.ClickButton()

    if (indel.detail_tc_addplan_no_contour_or_study_popup.Exists) {
      Log.Warning(`Can not addPlan due to no contour_or_study`)
      return
    }
    
    if (isAdd) {
      indel.detail_plan_PlanAddClass.pushButton_Ok.ClickButton()
      if (!indel.detail_tc_addplan_no_selected_contour_popup.Exists && !indel.detail_tc_addplan_no_selected_skin_contour_popup.Exists && !indel.detail_tc_addplan_no_selected_target_contour_popup.Exists) {
        if (indel.plan_add_not_ct_popup.Exists) common.handlePopupDialog(indel.plan_add_not_ct_popup, 1)
      }
    } else {
      indel.detail_plan_PlanAddClass.pushButton_Cancel.ClickButton()
    }
  } else {
    Log.Warning(`Can not addPlan due to window is not right`) 
  }
}

const deletePlan = (indel, parentTCName, planName, isDelete = false) => {
  __closePlanList(indel)
  if (indel.patientDataClass.VisibleOnScreen) {
    const TCList = indel.patientDataClass.groupBox_5.treeWidget_PlanList
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
    indel.patientDataClass.groupBox_5.pushButton_DeletePlan.ClickButton()
    
    if (isDelete) {
      indel.detail_tc_delete_plan_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else {
      indel.detail_tc_delete_plan_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not deletePlan due to window is not right`) 
  }
}

const copyPlan = (indel, parentTCName, copiedplanName, isCopy = false) => {
  __closePlanList(indel)
  if (indel.patientDataClass.VisibleOnScreen) {
    const TCList = indel.patientDataClass.groupBox_5.treeWidget_PlanList
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
    indel.patientDataClass.groupBox_5.pushButton_CopyPlan.ClickButton()
    if (isCopy) {      
      indel.detail_tc_copy_plan_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      //indel.dirtyData.set(globalConstant.obj.addPlan, newCopiedPlanName)
    } else {
      indel.detail_tc_copy_plan_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not copyPlan due to window is not right`) 
  }
}

//By double click
const gotoPlanDesign = (indel, parentTCName, planName) => {
  __closePlanList(indel)
  if (indel.patientDataClass.VisibleOnScreen) {
    const TCList = indel.patientDataClass.groupBox_5.treeWidget_PlanList
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
const calculateDose = (indel, type = false) => {
  if (indel.PlanGUI.VisibleOnScreen) {
    const obj = indel.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel.groupBox_2
    type ? obj.cbSample.setCurrentIndex(0) : obj.cbSample.setCurrentIndex(1)
    obj.pbCalDose.ClickButton()
    utilsfunctions.delay(globalConstant.obj.delayThirtySeconds)
  } else {
    Log.Warning(`Can not calculateDose due to window is not right`) 
  }
}

const setDose = (indel, percentage = 50, doseValue = 1000) => {
  if (indel.PlanGUI.VisibleOnScreen) {
    const obj = indel.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel.groupBox
    obj.Percentage.SetText(percentage)
    obj.pDose.SetText(doseValue)
    obj.pbSetPD.ClickButton()
    if (indel.plan_do_fine_calculate_popup.Exists) return
    utilsfunctions.delay(globalConstant.obj.delayThirtySeconds)
  } else {
    Log.Warning(`Can not setDose due to window is not right`) 
  }
}

const setFraction = (indel, fraction = 1) => {
  if (indel.PlanGUI.VisibleOnScreen) {
    indel.PlanGUI.widget.groupBox_2.pbFraction.ClickButton()
    if (indel.plan_do_fine_calculate_popup.Exists) return
    if (indel.plan_no_set_popup.Exists) return
    indel.plan_dlgfractionClass.sbFractionCount.qt_spinbox_lineedit.SetText(fraction)
    indel.plan_dlgfractionClass.Close()
  } else {
    Log.Warning(`Can not setFraction due to window is not right`) 
  }
}

const confirmPlan = (indel, userName, password, isConfirm = true) => {
  if (indel.PlanGUI.VisibleOnScreen) {
    indel.PlanGUI.widget.groupBox_2.pbConfirm.ClickButton()
    if (indel.plan_do_fine_calculate_popup.Exists) return
    if (indel.plan_no_finished_popup.Exists) return
    indel.plan_plandlgConformClass.pbConfirm.ClickButton()
    indel.plan_confirm_AuthorityCheckDlgClass.lineEdit.SetText(userName)
    indel.plan_confirm_AuthorityCheckDlgClass.lineEdit_2.SetText(password)
    if (isConfirm) {
      indel.plan_confirm_AuthorityCheckDlgClass.pushButton.ClickButton()
      if (indel.plan_confirm_no_user_popup.Exists) return
      if (indel.plan_confirm_wrong_password_popup.Exists) return
      indel.plan_confirmed_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    } else {
      indel.plan_confirm_AuthorityCheckDlgClass.pushButton_2.ClickButton()
    }
  } else {
    Log.Warning(`Can not setFraction due to window is not right`) 
  }
}

const closeConfirmWindow = indel => {
  indel.plan_plandlgConformClass.Close()
}

const planDefaultConfirmActivity = indel => {
  addTreatCourse(indel, true)
  addPlan(indel, 'TC1', true)
  gotoPlanDesign(indel, 'TC1', 'TC1_P1')
  targetRelated.addOnePlanNearMiddlePoint(indel)
  calculateDose(indel)
  setDose(indel)
  setFraction(indel)
  confirmPlan(indel, Project.Variables.username, Project.Variables.password, true)
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
module.exports.planDefaultConfirmActivity = planDefaultConfirmActivity
