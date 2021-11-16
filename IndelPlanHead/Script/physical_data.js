const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
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

const __handleDirtyDate = (indel, machineName) => {
  const dirtydMachines = indel.dirtyData.get(globalConstant.obj.addMachine)
  if (dirtydMachines.includes(machineName)) {
    indel.dirtyData.set(globalConstant.obj.addMachine, dirtydMachines.filter(val => val !== machineName))
  } else {
    Log.Warning(`can not __handleDirtyDate due to machineName=${machineName}`)
  }
}

const openMachineWindow = indel => {
  indel.patientManagement.frame.pushButton_PhyData.ClickButton()
}

const exitMachineWindow = indel => {
  indel.machine_managementClass.Close()
}

const addEmptyMachineActivity = (indel, newMachineName = "") => {
  openMachineWindow(indel)
  addEmptyMachine(indel, newMachineName, false)
  exitMachineWindow(indel)
}

const editMachineActivity = (indel, machineName, tab = 0, propName, propValue, editPropVal) => {
  openMachineWindow(indel)
  editMachine(indel, machineName, tab, propName, propValue, editPropVal, false)
  exitMachineWindow(indel)
}

const deleteMachineActivity = (indel, machineName) => {
  openMachineWindow(indel)
  deleteMachine(indel, machineName, false)
  exitMachineWindow(indel)
}

//DO not consider TMR and OAR
const addEmptyMachine = (indel, newMachineName = "", isCancel = false) => {
  if (!newMachineName) {
    Log.Error(`Can not add machine with empty machine name`)
    return
  }
  indel.machine_managementClass.add_btn.Click()
  indel.machine_addmachineClass.LineEdit.SetText(newMachineName)
  indel.machine_addmachineClass.DialogButtonBox.buttonOk.ClickButton()
  if (!isCancel) {
    indel.machine_addmachinedetailClass.pushButton.ClickButton()
    indel.machine_less_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    indel.machine_less_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    indel.machine_add_confirm_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    if (indel.machine_exists_popup.Exists) {
      indel.machine_exists_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    } else {
      indel.dirtyData.get(globalConstant.obj.addMachine).push(newMachineName)
    }
  } else {
    indel.machine_addmachinedetailClass.pushButton_2.ClickButton()
  }
}

//Now only support some properties in General Information tab
const editMachine = (indel, machineName, tab = 0, propName, propValue, editPropVal, isCancel = false) => {
  const configList = indel.machine_managementClass.ConfigList,
    machine_addmachinedetailClass = indel.machine_addmachinedetailClass,
    tabWidget = machine_addmachinedetailClass.tabWidget
        
  const idx =  findinlist.isItemInListReturnIndex(machineName, globalConstant.obj.machineConfigNameColumn, configList)

  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(idx, globalConstant.obj.machineConfigNameColumn)
    indel.machine_managementClass.edit_btn.ClickButton()
    
    if ( indel.machine_edit_popup.Exists) {
      indel.machine_edit_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      Log.Error(`Can not edit current machine machineName=${machineName}`)
      return
    }

    if (__isTabRangeExists(tab, tabWidget.wTabCount)) {
      tabWidget.setCurrentIndex(tab)
      if (utilsfunctions.findChild(__getMacineTabObj(tabWidget, tab), propName, propValue)) {
        //todo,according to object type to update its value
        //todo,according to object type to update its value
        tabWidget.qt_tabwidget_stackedwidget.tab.lineEdit_MachineName.SetText(editPropVal)
        machine_addmachinedetailClass.pushButton.ClickButton()
        indel.machine_less_TMR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        indel.machine_less_OAR_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        indel.machine_add_confirm_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
        if (!isCancel) {
          indel.machine_PhyDataChangeViewerClass.pushButton_Ok.ClickButton()
        } else {
          indel.machine_PhyDataChangeViewerClass.pushButton_Cancel.ClickButton()
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

const deleteMachine = (indel, machineName, isCancel = false) => {
  const configList = indel.machine_managementClass.ConfigList
    //machine_addmachinedetailClass = indel.machine_addmachinedetailClass,
    //tabWidget = machine_addmachinedetailClass.tabWidget

  const rowIdx =  findinlist.isItemInListReturnIndex(machineName, globalConstant.obj.machineConfigNameColumn, configList)

  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(rowIdx, globalConstant.obj.machineConfigNameColumn)
    indel.machine_managementClass.delete_btn.ClickButton()
    
    if (!isCancel) {
      if (indel.machine_delete_default_popup.Exists) {
        indel.machine_delete_default_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      } else if (indel.machine_delete_used_plan_popup.Exists) {
        indel.machine_delete_used_plan_popup.qt_msgbox_buttonbox.buttonOk
      } else {
        indel.machine_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        __handleDirtyDate(indel, machineName)
      }
    } else {
      indel.machine_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
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
const importMachine = (indel, exportFolder, exportName) => {
  indel.machine_managementClass.import_btn.ClickButton()
  const pathAndName = exportFolder + globalConstant.obj.backslash + exportName
  indel.dlgImportConfigs.ComboBoxEx32.ComboBox.Edit.SetText(pathAndName)
  indel.dlgImportConfigs.btn_O.Click()
  indel.machine_addmachinedetailClass.pushButton.ClickButton()
  
  //if data is big, need to wait a bit longer
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    
  //todo. handle if input wrong path
  //todo. handle if input wrong path
  if (indel.machine_import_exists_popup.Exists) {
    indel.machine_import_exists_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  }
}
*/

/*
const exportMachine = (indel, machineName, exportFolder, exportName) => {
  const configList = indel.machine_managementClass.ConfigList
        
  const idx =  findinlist.isItemInListReturnIndex(machineName, globalConstant.obj.machineConfigNameColumn, configList)

  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(idx, globalConstant.obj.machineConfigNameColumn)
    indel.machine_managementClass.export_btn.ClickButton()
    const pathAndName = exportFolder + globalConstant.obj.backslash + exportName
    indel.dlgImportConfigs.ComboBoxEx32.ComboBox.Edit.SetText(pathAndName)
    indel.dlgImportConfigs.btn_O.Click()
    //handle export file exists
    if (indel.machine_export_exist_popup.Exists) {
      indel.machine_export_exist_popup.Item.CtrlNotifySink.btn_Y.Click()
    }
  }
}
*/

const setCurrentMachine = (indel, machineName) => {
  const machine_managementClass = indel.machine_managementClass,
      configList = machine_managementClass.ConfigList,
      machineConfigNameColumn = globalConstant.obj.machineConfigNameColumn
  const idx =  findinlist.isItemInListReturnIndex(machineName, machineConfigNameColumn, configList)

  if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
    configList.ClickCell(idx, machineConfigNameColumn)
    machine_managementClass.set_current.ClickButton()
    if (indel.machine_set_current_popup.Exists) {
      indel.machine_set_current_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }
  } else {
    Log.Error(`can not find machine to setCurrent withe machineName = ${machineName}`)
  }
}

/*
const getCurrentMachineNameFromPatientDetail = (indel, patientId) => {
  patient.loadPatient(indel, patientId)
  if (indel.PatientDataClass.Exists) {
    const ret = indel.PatientDataClass.groupBox_10.label_PhydataName.QtText
    return utilsfunction.strReplace(ret, 'Name: ', globalConstant.obj.emptyString)
  }
  return globalConstant.obj.emptyString
}
*/

/*
const getCurrentMachine = indel => {
  let machineManagement = indel.machine_management,
    machineList = machineManagement.ConfigList,
    machineConfigNameColumn = globalConstant.obj.machineConfigNameColumn,
    count = machineList.wRowCount
  for (let i = 0; i < count; i++) {
    machineList.ClickCell(i, machineConfigNameColumn)
    machineManagement.pushButton_3.ClickButton();
    if (indel.machine_delete_default_config_popup.Exists) {
      indel.machine_delete_default_config_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      return finditeminlist.getFieldValue(i, machineConfigNameColumn, machineList)
    } else {
      indel.machine_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  }
  return globalConstant.obj.emptyString
}
*/

const deleteMachineForDirtyData = (indel, deleteMachines) => {
  openMachineWindow(indel)
  const configList = indel.machine_managementClass.ConfigList
  let dm = deleteMachines.pop()
  while (dm) {
    const rowIdx =  findinlist.isItemInListReturnIndex(dm, globalConstant.obj.machineConfigNameColumn, configList)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      configList.ClickCell(rowIdx, globalConstant.obj.machineConfigNameColumn)
      indel.machine_managementClass.delete_btn.ClickButton()
      indel.machine_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    } else {
      Log.Warning(`Can not find machine with machineName=${dm} when deleteMachineForDirtyData`)
    }
    dm = deleteMachines.pop()
  }
  exitMachineWindow(indel)
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