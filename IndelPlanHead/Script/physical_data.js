const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const findInList = require("find_in_list")
const patient = require("patient")
const fileFunctions = require("file_functions")

const __isTabRangeExists = (tabIdx, maxIdx) => {
  return 0 <= tabIdx && tabIdx <= maxIdx
}

const __getMacineTabObj = (tabWidget, tabIdx) => {
   const obj = tabWidget.qt_tabwidget_stackedwidget
   const tab = {
     '0' : obj.tab,
     '1' : obj.tab_2,
     '2' : obj.tab_3,
     '3' : obj.tab_4,
     '4' : obj.tab_5,
     '5' : obj.tab_6,
     '6' : obj.tab_7,
     '7' : obj.tab_8.groupBox
   }
  return tab[tabIdx] || globalConstant.obj.emptyString
}

const __isPropExists = (parent, propName, propValue) => {
  const children = parent.FindChild(propName, propValue)
  if (children.length > 0) return true
  return false
}

const __handlePhysicalDirtyData = (pv, machineName) => {
  const dirtydMachines = pv.dirtyData.get(globalConstant.obj.addMachine)
  if (dirtydMachines.includes(machineName)) {
    pv.dirtyData.set(globalConstant.obj.addMachine, dirtydMachines.filter(val => val !== machineName))
  } else {
    Log.Warning(`can not __handlePhysicalDirtyData due to machineName=${machineName}`)
  }
}

const openMachineWindow = indelPlan => {
  indelPlan.patientManagement.frame.pushButton_PhyData.ClickButton()
}

const exitMachineWindow = indelPlan => {
  indelPlan.machine_management.Close()
}

const addEmptyMachineActivity = (indelPlan, pv, newMachineName = "") => {
  openMachineWindow(indelPlan)
  addEmptyMachine(indelPlan, pv, newMachineName, false)
  exitMachineWindow(indelPlan)
}

const editMachineActivity = (indelPlan, machineName, tab = 0, propName, propValue, editPropVal) => {
  openMachineWindow(indelPlan)
  editMachine(indelPlan, machineName, tab, propName, propValue, editPropVal, false)
  exitMachineWindow(indelPlan)
}

const deleteMachineActivity = (indelPlan, pv, machineName) => {
  openMachineWindow(indelPlan)
  deleteMachine(indelPlan, pv, machineName, false)
  exitMachineWindow(indelPlan)
}

//DO not consider TMR and OAR
const addEmptyMachine = (indelPlan, pv, newMachineName = "", isCancel = false) => {
  if (!newMachineName) {
    Log.Error(`Can not add machine with empty machine name`)
    return
  }
  indelPlan.machine_management.add_btn.Click()
  indelPlan.machine_new_machine.LineEdit.SetText(newMachineName)
  indelPlan.machine_new_machine.DialogButtonBox.buttonOk.ClickButton()
  if (!isCancel) {
    indelPlan.machine_new_machine_detail.pushButton.ClickButton()
    indelPlan.machine_less_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    indelPlan.machine_less_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    indelPlan.machine_add_confirm_data_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    if (indelPlan.machine_exists_popup.Exists) {
      indelPlan.machine_exists_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    } else {
      pv.dirtyData.get(globalConstant.obj.addMachine).push(newMachineName)
    }
  } else {
    indelPlan.machine_new_machine_detail.pushButton_2.ClickButton()
  }
}

//Now only support some properties in General Information tab
const editMachine = (indelPlan, machineName, tab = 0, propName, propValue, editPropVal, isCancel = false) => {
  const configList = indelPlan.machine_management.ConfigList,
    machine_new_machine_detail = indelPlan.machine_new_machine_detail,
    tabWidget = machine_new_machine_detail.tabWidget
        
  const idx =  findInList.isItemInListReturnIndex(machineName, globalConstant.obj.machineConfigNameColumn, configList)

  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(idx, globalConstant.obj.machineConfigNameColumn)
    indelPlan.machine_management.edit_btn.ClickButton()
    
    if (indelPlan.machine_edit_popup.Exists) {
      indelPlan.machine_edit_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      Log.Error(`Can not edit current machine machineName=${machineName}`)
      return
    }

    if (__isTabRangeExists(tab, tabWidget.wTabCount)) {
      tabWidget.setCurrentIndex(tab)
      if (utilsFunctions.findChild(__getMacineTabObj(tabWidget, tab), propName, propValue)) {
        //todo,according to object type to update its value
        //todo,according to object type to update its value
        tabWidget.qt_tabwidget_stackedwidget.tab.lineEdit_MachineName.SetText(editPropVal)
        machine_new_machine_detail.pushButton.ClickButton()
        indelPlan.machine_less_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        indelPlan.machine_less_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        indelPlan.machine_add_confirm_data_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        if (!isCancel) {
          indelPlan.machine_PhyDataChangeViewerClass.pushButton_Ok.ClickButton()
        } else {
          indelPlan.machine_PhyDataChangeViewerClass.pushButton_Cancel.ClickButton()
        }
      } else {
        Log.Error(`Can not find a propName=${propName} when editting machine`)
        return
      }
    } else {
      Log.Error(`Can not switch tab to tab=${tab} when editting machine`)
      return
    }
  } else {
    Log.Warning(`Can not find machine to edit machineName=${machineName}`)
  }
}

const deleteMachine = (indelPlan, pv, machineName, isCancel = false) => {
  const configList = indelPlan.machine_management.ConfigList
    //machine_new_machine_detail = indelPlan.machine_new_machine_detail,
    //tabWidget = machine_new_machine_detail.tabWidget

  const rowIdx =  findInList.isItemInListReturnIndex(machineName, globalConstant.obj.machineConfigNameColumn, configList)

  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(rowIdx, globalConstant.obj.machineConfigNameColumn)
    indelPlan.machine_management.delete_btn.ClickButton()
    
    if (!isCancel) {
      if (indelPlan.machine_delete_default_popup.Exists) {
        indelPlan.machine_delete_default_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      } else if (indelPlan.machine_delete_used_plan_popup.Exists) {
        indelPlan.machine_delete_used_plan_popup.qt_msgbox_buttonbox.buttonOk
      } else {
        indelPlan.machine_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        __handlePhysicalDirtyData(pv, machineName)
      }
    } else {
      indelPlan.machine_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`can not find machine to delete, machineName=${machineName}`)
  }
}

const getExportFolder = () => {
    const exportFolder = aqFileSystem.GetFileDrive(TestedApps.Items(0).Path) + globalConstant.obj.backslash + globalConstant.obj.exportFolder
    fileFunctions.createFolder(exportFolder)
    return exportFolder
}

/*
const importMachine = (indelPlan, exportFolder, exportName) => {
  indelPlan.machine_management.import_btn.ClickButton()
  const pathAndName = exportFolder + globalConstant.obj.backslash + exportName
  indelPlan.dlgImportConfigs.ComboBoxEx32.ComboBox.Edit.SetText(pathAndName)
  indelPlan.dlgImportConfigs.btn_O.Click()
  indelPlan.machine_new_machine_detail.pushButton.ClickButton()
  
  //if data is big, need to wait a bit longer
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    
  //todo. handle if input wrong path
  //todo. handle if input wrong path
  if (indelPlan.machine_import_exists_popup.Exists) {
    indelPlan.machine_import_exists_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  }
}
*/

/*
const exportMachine = (indelPlan, machineName, exportFolder, exportName) => {
  const configList = indelPlan.machine_management.ConfigList
        
  const idx =  findInList.isItemInListReturnIndex(machineName, globalConstant.obj.machineConfigNameColumn, configList)

  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(idx, globalConstant.obj.machineConfigNameColumn)
    indelPlan.machine_management.export_btn.ClickButton()
    const pathAndName = exportFolder + globalConstant.obj.backslash + exportName
    indelPlan.dlgImportConfigs.ComboBoxEx32.ComboBox.Edit.SetText(pathAndName)
    indelPlan.dlgImportConfigs.btn_O.Click()
    //handle export file exists
    if (indelPlan.machine_export_exist_popup.Exists) {
      indelPlan.machine_export_exist_popup.Item.CtrlNotifySink.btn_Y.Click()
    }
  }
}
*/

const setCurrentMachine = (indelPlan, machineName) => {
  const machine_management = indelPlan.machine_management,
      configList = machine_management.ConfigList,
      machineConfigNameColumn = globalConstant.obj.machineConfigNameColumn
  const idx =  findInList.isItemInListReturnIndex(machineName, machineConfigNameColumn, configList)

  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(idx, machineConfigNameColumn)
    machine_management.set_current.ClickButton()
    if (indelPlan.machine_set_current_popup.Exists) {
      indelPlan.machine_set_current_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }
  } else {
    Log.Error(`can not find machine to setCurrent withe machineName = ${machineName}`)
  }
}

/*
const getCurrentMachineNameFromPatientDetail = (indelPlan, patientID) => {
  patient.loadPatient(indelPlan, patientID)
  if (indelPlan.PatientData.Exists) {
    const ret = indelPlan.PatientData.groupBox_10.label_PhydataName.QtText
    return utilsfunction.strReplace(ret, 'Name: ', globalConstant.obj.emptyString)
  }
  return globalConstant.obj.emptyString
}
*/

/*
const getCurrentMachine = indelPlan => {
  let machineManagement = indelPlan.machine_management,
    machineList = machineManagement.ConfigList,
    machineConfigNameColumn = globalConstant.obj.machineConfigNameColumn,
    count = machineList.wRowCount
  for (let i = 0; i < count; i++) {
    machineList.ClickCell(i, machineConfigNameColumn)
    machineManagement.pushButton_3.ClickButton()
    if (indelPlan.machine_delete_default_config_popup.Exists) {
      indelPlan.machine_delete_default_config_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      return finditeminlist.getFieldValue(i, machineConfigNameColumn, machineList)
    } else {
      indelPlan.machine_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  }
  return globalConstant.obj.emptyString
}
*/

const deleteMachineForDirtyData = (indelPlan, deleteMachines) => {
  openMachineWindow(indelPlan)
  const configList = indelPlan.machine_management.ConfigList
  let dm = deleteMachines.pop()
  while (dm) {
    const rowIdx =  findInList.isItemInListReturnIndex(dm, globalConstant.obj.machineConfigNameColumn, configList)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      configList.ClickCell(rowIdx, globalConstant.obj.machineConfigNameColumn)
      indelPlan.machine_management.delete_btn.ClickButton()
      indelPlan.machine_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    } else {
      Log.Warning(`Can not find machine with machineName=${dm} when deleteMachineForDirtyData`)
    }
    dm = deleteMachines.pop()
  }
  exitMachineWindow(indelPlan)
}

module.exports.openMachineWindow = openMachineWindow
module.exports.exitMachineWindow = exitMachineWindow
module.exports.addEmptyMachine = addEmptyMachine
module.exports.addEmptyMachineActivity = addEmptyMachineActivity
module.exports.editMachine = editMachine
module.exports.editMachineActivity = editMachineActivity
module.exports.deleteMachine = deleteMachine
module.exports.deleteMachineActivity = deleteMachineActivity
module.exports.getExportFolder = getExportFolder
module.exports.setCurrentMachine = setCurrentMachine
module.exports.deleteMachineForDirtyData = deleteMachineForDirtyData