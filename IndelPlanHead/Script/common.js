const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")

const __closeRegisterImporter = indelPlan => {
  indelPlan.register_importer.pbClose.ClickButton()
  indelPlan.register_close_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
}

const __handlePatientData = (indelPlan, isUpdatePatient = false) => {
  indelPlan.PatientData.groupBox_6.pushButton_Close.ClickButton()
  if (isUpdatePatient) {
    indelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
  } else {
    indelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
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
const __handlePopup = (indelPlan, tabName, currentTabName, isPlanFinish) => {
  const __helper1 = () => {
    if (indelPlan.contour_planlib_empty_contours_remove_popup.Exists) {
      indelPlan.contour_planlib_empty_contours_remove_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }

    if (indelPlan.contour_no_skin_type_contour_exist_popup.Exists) {
      indelPlan.contour_no_skin_type_contour_exist_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else if (indelPlan.contour_skin_not_complete_popup.Exists) {
      indelPlan.contour_skin_not_complete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
  }
  
  const __helper2 = () =>{
    if (indelPlan.plan_finished_popup.Exists) {
      if (isPlanFinish) {
        indelPlan.plan_finished_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      } else {
        indelPlan.plan_finished_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    }
  }
  //handler[currentTabName][tabName]
  const handler = {
    [globalConstant.obj.patientManagement]: {
      [globalConstant.obj.contour]: () => {
        if (indelPlan.contour_no_study_exist_popup.Exists) {
          indelPlan.contour_no_study_exist_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        } else if (indelPlan.main_contour_choose_patient_first_popup.Exists) {
          indelPlan.main_contour_choose_patient_first_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        }
      },
      [globalConstant.obj.planDesign]: () => {
        if (indelPlan.plan_start_plan_module_popup.Exists) {
          indelPlan.plan_start_plan_module_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
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
        if (indelPlan.plan_PlanList.Exists) {
          //Sys.Desktop.Keys("[Esc]")
          LLPlayer.KeyDown(VK_ESCAPE, globalConstant.obj.delayMouseOneSecond)
          LLPlayer.KeyUp(VK_ESCAPE, globalConstant.obj.delayMouseOneSecond)
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

const getPatientDetailTabName = indelPlan => {
  return indelPlan.tabWidget.wTabCaption(indelPlan.tabWidget.wFocusedTab)
}

const changePatientDetailTab = (indelPlan, tabName, isPlanFinish = false) => {
  if(!__checkTabExists(indelPlan.tabWidget, tabName)) {
    Log.Error(`Please input valid tabName, tabName=${tabName}`)
    return
  }
    
  const currentTabName = getPatientDetailTabName(indelPlan)
  //return if already located target tab
  if (currentTabName === tabName) {
    Log.Error(`no need to change patient tab`)
    return
  }

  //handle PlanListClass at top level
  if (!indelPlan.plan_PlanList.Exists) {
    indelPlan.tabWidget.ClickTab(tabName)
    //just in case
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  }
  
  //handle various popup
  __handlePopup(indelPlan, tabName, currentTabName, isPlanFinish)
    
  //check if switch successfully, or stop testcase directly
  if (getPatientDetailTabName(indelPlan) !== tabName) {
    Log.Error(`${Project.TestItems.Current.Name} changePatientDetailTab to ${tabName} fail`)
    return
  }
}

const gotoPatientManagement = (indelPlan, isUpdatePatient = false) => {
  //login window
  if (indelPlan.login.VisibleOnScreen) return
  //already in main page
  if (indelPlan.patientManagement.frame.pushButton_Logout.Visible) return
  //check if can close register_importer window
  if (indelPlan.register_importer.pbClose.Exists) __closeRegisterImporter(indelPlan)
  //check if can changedetail
  if (!strictEqual(getPatientDetailTabName(indelPlan), globalConstant.obj.patientManagement)) {
    changePatientDetailTab(indelPlan, globalConstant.obj.patientManagement)
  }
  if (indelPlan.PatientData.VisibleOnScreen) __handlePatientData(indelPlan, isUpdatePatient)
}

module.exports.changePatientDetailTab = changePatientDetailTab
module.exports.getPatientDetailTabIndex = getPatientDetailTabIndex
module.exports.getPatientDetailTabName = getPatientDetailTabName
module.exports.gotoPatientManagement = gotoPatientManagement
module.exports.handlePopupDialog = handlePopupDialog