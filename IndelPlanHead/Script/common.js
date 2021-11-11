const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")

const __handleGamaImporterClass = indel => {
  indel.import_GamaImporterClass.pbClose.ClickButton()
  indel.import_close_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
}

const __handlePatientDataClass = (indel, isUpdatePatient = true) => {
  indel.patientDataClass.groupBox_6.pushButton_Close.ClickButton()
  if (isUpdatePatient) {
    indel.patient_update_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
  } else {
    indel.patient_update_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
  }
}

const __checkTabExists = (tabWidget, tabName) => {
  for (let i = 0; i < tabWidget.wTabCount; i++) {
    if (tabName === tabWidget.wTabCaption(i)) return true
  }
  return false
}

//tabName is where app switch to
//currentTabName is where app's tab located
const __handlePopup = (indel, tabName, currentTabName, isPlanFinish) => {
  const __helper1 = () => {
    if (indel.contour_planlib_remove_empty_contour_popup.Exists) {
      indel.contour_planlib_remove_empty_contour_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }

    if (indel.contour_no_skin_type_contour_exist_popup.Exists) {
      indel.contour_no_skin_type_contour_exist_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else if (indel.contour_skin_not_complete_popup.Exists) {
      indel.contour_skin_not_complete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
  }
  
  const __helper2 = () =>{
    if (indel.plan_current_plan_finished_popup.Exists) {
      if (isPlanFinish) {
        indel.plan_current_plan_finished_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      } else {
        indel.plan_current_plan_finished_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    }
  }
  //handler[currentTabName][tabName]
  const handler = {
    [globalConstant.obj.patientManagement]: {
      [globalConstant.obj.contour]: () => {
        if (indel.contour_no_study_exist_popup.Exists) {
          indel.contour_no_study_exist_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        } else if (indel.contour_choose_patient_first_popup.Exists) {
          indel.contour_choose_patient_first_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        }
      },
      [globalConstant.obj.planDesign]: () => {
        if (indel.plan_start_plan_module_popup.Exists) {
          indel.plan_start_plan_module_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        }
      }
    },
    [globalConstant.obj.contour]: {
      [globalConstant.obj.patientManagement]: () => {
        __helper1()
      },
      [globalConstant.obj.planDesign]: () => {
        __helper1()
      }
    },
    [globalConstant.obj.planDesign]: {
      [globalConstant.obj.patientManagement]: () => {
        if (indel.plan_PlanListClass.Exists) {
          Sys.Desktop.Keys("[Esc]")
        //change from PlanGUI
        } else {
          __helper2()  
        }
      },
      [globalConstant.obj.contour]: () => {
        __helper2()
      }
    }
  }
  handler[currentTabName][tabName] ? handler[currentTabName][tabName]() : globalConstant.obj.emptyString
}

//common approach to handle popup
//1 means buttonOk
//2 means buttonNo
//3 means buttonYes
//4 means buttonCancel
//5 means buttonIgnore
const handlePopupDialog = (dialog, type = 1) => {
  switch (type) {
    case 1:
      dialog.qt_msgbox_buttonbox.buttonOk.ClickButton()
      break
    case 2:
      dialog.qt_msgbox_buttonbox.buttonNo.ClickButton()
      break
    case 3:
      dialog.qt_msgbox_buttonbox.buttonYes.ClickButton()
      break
    case 4:
      dialog.qt_msgbox_buttonbox.buttonCancel.ClickButton()
      break
    case 5:
      dialog.qt_msgbox_buttonbox.buttonIgnore.ClickButton()
      break
    default:
      Log.Warning(`handlePopupDialog type is not right type = ${type}`)
  }
}

const getPatientDetailTabIndex = tabName => {
  const patientTabMapped = {
    [globalConstant.obj.patientManagement] : 0,
    [globalConstant.obj.contour] : 1,
    [globalConstant.obj.planDesign] : 2,
  }
  return patientTabMapped[tabName]
}

const getPatientDetailTabName = indel => {
  return indel.tabWidget.wTabCaption(indel.tabWidget.wFocusedTab)
}

const changePatientDetailTab = (indel, tabName, isPlanFinish = false) => {
  if(!__checkTabExists(indel.tabWidget, tabName)) {
    Log.Error(`Please input valid tabName, tabName=${tabName}`)
    //stop testcase directly
    Runner.Stop(true)
  }
    
  const currentTabName = getPatientDetailTabName(indel)
  //return if already located target tab
  if (currentTabName === tabName) {
    Log.Error(`no need to change patient tab`)
    //stop testcase directly
    Runner.Stop(true)
  }

  //handle PlanListClass at top level
  if (!indel.plan_PlanListClass.Exists) {
    indel.tabWidget.ClickTab(tabName)
    //just in case
    utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  }
  
  //handle various popup
  __handlePopup(indel, tabName, currentTabName, isPlanFinish)
    
  //check if switch successfully, or stop testcase directly
  if (getPatientDetailTabName(indel) !== tabName) {
    Log.Error(`${Project.TestItems.Current.Name} changePatientDetailTab to ${tabName} fail`)
    Runner.Stop(true)
  }
}

const gotoPatientManagement = (indel, isUpdatePatient = false) => {
  //login window
  if (indel.loginClass.VisibleOnScreen) return
  //already in main page
  if (indel.patientManagement.frame.pushButton_Logout.Visible) return
  //check if can close import_GamaImporterClass window
  if (indel.import_GamaImporterClass.pbClose.Exists) __handleGamaImporterClass(indel)
  //check if can changedetail
  if (!strictEqual(getPatientDetailTabName(indel), globalConstant.obj.patientManagement)) {
    changePatientDetailTab(indel, globalConstant.obj.patientManagement)
  }
  if (indel.patientDataClass.VisibleOnScreen) __handlePatientDataClass(indel, isUpdatePatient)
}

module.exports.changePatientDetailTab = changePatientDetailTab
module.exports.getPatientDetailTabIndex = getPatientDetailTabIndex
module.exports.getPatientDetailTabName = getPatientDetailTabName
module.exports.gotoPatientManagement = gotoPatientManagement
module.exports.handlePopupDialog = handlePopupDialog