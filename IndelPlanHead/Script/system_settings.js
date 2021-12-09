const tabs = []
  
const __getSystemSettingsTabs = (indelPlan) => {
  const tabWidget = indelPlan.system_settings.tabWidget
  for (let i = 0; i < tabWidget.wTabCount; i++) {
    tabs[i] = tabWidget.wTabCaption(i)
  }
  return tabs
}

const openSystemSettings = (indelPlan) => {
  if (indelPlan.patientManagement.VisibleOnScreen) {
    indelPlan.patientManagement.frame.pushButton_SystemSetting.ClickButton()
  } else {
    Log.Warning(`Can not openSystemSettings due to window is not right`) 
  }
}

const closeSystemSettings = (indelPlan) => {
  if (indelPlan.system_settings.VisibleOnScreen) {
    indelPlan.system_settings.frame.pushButton_Cancel.ClickButton()
  } else {
    Log.Warning(`Can not closeSystemSettings due to window is not right`) 
  }
}

const changeSystemSettingsTab = (indelPlan, tabName) => {
  if (!__getSystemSettingsTabs(indelPlan).includes(tabName)) {
    Log.Warning(`Can not changeSystemSettingsTab due to tabName = ${tabName}`) 
    return
  }
  if (indelPlan.system_settings.VisibleOnScreen) {
    indelPlan.system_settings.tabWidget.setCurrentIndex(tabs.findIndex(item => item === tabName))
  } else {
    Log.Warning(`Can not changeSystemSettingsTab due to window is not right`) 
  }
}

const check = (indelPlan) => {
  if (indelPlan.system_settings.VisibleOnScreen) {
    changeSystemSettingsTab(indelPlan, "System Checking")
    indelPlan.system_settings.tabWidget.qt_tabwidget_stackedwidget.tab_2.pushButton_Check.ClickButton()
  } else {
    Log.Warning(`Can not closeSystemSettings due to window is not right`) 
  }
}


module.exports.openSystemSettings = openSystemSettings
module.exports.closeSystemSettings = closeSystemSettings
module.exports.changeSystemSettingsTab = changeSystemSettingsTab
module.exports.check = check