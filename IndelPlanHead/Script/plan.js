const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const findInList = require("find_in_list")
const common = require("common")
const targetRelated = require("target_related")

const tabs = []

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

const __getTargetRegionTabs = (indelPlan) => {
  const tabWidget = indelPlan.PlanGUI.widget.m_targetTabWidget
  for (let i = 0; i < tabWidget.wTabCount; i++) {
    tabs[i] = tabWidget.wTabCaption(i)
  }
  return tabs
}

const getTargetPlan = (parentTC, planName) => {
  const cnt = parentTC.Items.Count
  if (cnt < 1) return globalConstant.obj.notFoundIndex
  for (let i = 0; i < cnt; i++) {
    if (strictEqual(parentTC.Items.Item(i).Text(globalConstant.obj.nameColumn), planName)) return i
  }
  return globalConstant.obj.notFoundIndex
}

const changeTargetRegionTabs = (indelPlan, tarName) => {
  if (indelPlan.PlanGUI.widget.m_targetTabWidget.wTabCount === 1) return
  if (!__getTargetRegionTabs(indelPlan).includes(tarName)) {
    Log.Warning(`Can not changeTargetRegionTabs due to tarName = ${tarName}`) 
    return
  }
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    indelPlan.PlanGUI.widget.m_targetTabWidget.setCurrentIndex(tabs.findIndex(item => item === tarName))
  } else {
    Log.Warning(`Can not changeTargetRegionTabs due to window is not right`) 
  }
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
    const rowIdx = findInList.isItemExistInMoreListReturnIndex(TCName, globalConstant.obj.nameColumn, TCList)
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

const addPlan = (indelPlan, parentTCName = "TC1", planName = "TC1_P1", isAdd = false) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findInList.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
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
        if (indelPlan.detail_tc_addplan_not_ct_popup.Exists) common.handlePopupDialog(indelPlan.detail_tc_addplan_not_ct_popup, 1)
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
    const rowIdx = findInList.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not deletePlan due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    const subRowIdx = getTargetPlan(TCList.wItems.Item(rowIdx), planName)
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
    const rowIdx = findInList.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not copyPlan due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    const parentTC = TCList.wItems.Item(rowIdx)
    const subRowIdx = getTargetPlan(parentTC, copiedplanName)
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

//type true means click menu or DblClick
const gotoPlanDesign = (indelPlan, parentTCName, planName, type = true) => {
  __closePlanList(indelPlan)
  if (indelPlan.PatientData.VisibleOnScreen) {
    const TCList = indelPlan.PatientData.groupBox_5.treeWidget_PlanList
    const rowIdx = findInList.isItemExistInMoreListReturnIndex(parentTCName, globalConstant.obj.nameColumn, TCList)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not gotoPlanDesign due to can not find target TC with TCName=${parentTCName}`)
      return
    }
    const parentTC = TCList.wItems.Item(rowIdx)
    const subRowIdx = getTargetPlan(parentTC, planName)
    if (strictEqual(subRowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not gotoPlanDesign due to can not find target planName with planName=${planName}`)
      return
    }
    if (type) {
      parentTC.Items.Item(subRowIdx).Click()
      indelPlan.PatientData.groupBox_6.pushButton_PlanDesign.ClickButton()
    } else {
      parentTC.Items.Item(subRowIdx).DblClick()
    }
    //just in case
    utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
  } else {
    Log.Warning(`Can not gotoPlanDesign due to window is not right`) 
  }
}

//true gross, false fine
const calculateDose = (indelPlan, type = false) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    const obj = indelPlan.PlanGUI.widget.groupBox_3
    type ? obj.cbSample.setCurrentIndex(0) : obj.cbSample.setCurrentIndex(1)
    obj.pbCalDose.ClickButton()
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not calculateDose due to window is not right`) 
  }
}

const setDose = (indelPlan, val = 50, doseValue = 1000) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    const obj = indelPlan.CPlanInforPanel.groupBox
    obj.Percentage.SetText(val)
    obj.pDose.SetText(doseValue)
    indelPlan.PlanGUI.widget.groupBox_3.pbSetPD.ClickButton()
    if (indelPlan.plan_do_fine_dose_calculate_popup.Exists || indelPlan.plan_set_wrong_popup.Exists) return
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

const confirmPlan = (indelPlan, userName, password, isConfirmed = false) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    indelPlan.PlanGUI.widget.groupBox_2.pbConfirm.ClickButton()
    if (indelPlan.plan_do_fine_dose_calculate_popup.Exists) return
    if (indelPlan.plan_unfinished_popup.Exists) return
    indelPlan.plan_confirm.pbConfirm.ClickButton()
    indelPlan.plan_confirm_sign.lineEdit.SetText(userName)
    indelPlan.plan_confirm_sign.lineEdit_2.SetText(password)
    if (isConfirmed) {
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

const closeConfirmWindow = indelPlan => {
  if (indelPlan.plan_confirm.Exists) {
    indelPlan.plan_confirm.Close()
  } else {
    Log.Warning(`Can not closeConfirmWindow due to window is not right`) 
  }
}

const openReport = indelPlan => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_3.toolButton_47.ClickButton()
  } else {
    Log.Warning(`Can not openReport due to window is not right`) 
  }
}

const closeReport = indelPlan => {
  if (indelPlan.plan_report.VisibleOnScreen) {
    indelPlan.plan_report.Close()
  } else {
    Log.Warning(`Can not closeReport due to window is not right`) 
  }
}

const setupPoint = (indelPlan, tarName) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    changeTargetRegionTabs(indelPlan, tarName)
    targetRelated.addOnePointNearMiddle(indelPlan)
  } else {
    Log.Warning(`Can not setupPoint due to window is not right`) 
  }
}

const setupOutBoundPoint = (indelPlan, tarName) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    changeTargetRegionTabs(indelPlan, tarName)
    targetRelated.addOneOutBoundPoint(indelPlan)
  } else {
    Log.Warning(`Can not setupOutBoundPoint due to window is not right`) 
  }
}

const deletePoint = (indelPlan, tarName, type, pointIndex) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    changeTargetRegionTabs(indelPlan, tarName)
    targetRelated.deleteOnePointNearMiddle(indelPlan, type, pointIndex)
  } else {
    Log.Warning(`Can not deletePoint due to window is not right`) 
  }
}

const updatePoint = (indelPlan, tarName, pointIndex, attrName, attrVal) => {
  if (indelPlan.PlanGUI.VisibleOnScreen) {
    changeTargetRegionTabs(indelPlan, tarName)
    //operate attr
    //set val
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not updatePoint due to window is not right`) 
  }
}

const planDefaultConfirmActivity = indelPlan => {
  addTreatCourse(indelPlan, true)
  addPlan(indelPlan, "TC1", "TC1_P1", true)
  gotoPlanDesign(indelPlan, "TC1", "TC1_P1")
  setupPoint(indelPlan, "tar")
  calculateDose(indelPlan)
  setDose(indelPlan)
  setFraction(indelPlan)
  confirmPlan(indelPlan, Project.Variables.username, Project.Variables.password, true)
  closeConfirmWindow(indelPlan)
}

module.exports.getTargetPlan = getTargetPlan
module.exports.changeTargetRegionTabs = changeTargetRegionTabs
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
module.exports.openReport = openReport
module.exports.closeReport = closeReport
module.exports.setupPoint = setupPoint
module.exports.setupOutBoundPoint = setupOutBoundPoint
module.exports.deletePoint = deletePoint
module.exports.updatePoint = updatePoint
module.exports.planDefaultConfirmActivity = planDefaultConfirmActivity
