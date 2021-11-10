const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")

const __handleDirtyDate = (indel, patientId) => {
  const dirtydPatients = indel.dirtyData.get(globalConstant.obj.addPatient)
  if (dirtydPatients.includes(patientId)) {
    indel.dirtyData.set(globalConstant.obj.addPatient, dirtydPatients.filter(val => val !== patientId))
  } else {
    Log.Warning(`can not __handleDirtyDate due to patientId=${patientId}`)
  }
}

const __inputPatientFields = (npc, args) => {
  const [patientID, patientName, gender, height, weight, age, address, phone, note] = args
  if (!patientID || !patientName) return
  npc.name.Keys(patientName)
  npc.id.Keys(patientID)
  if (strictEqual(gender, globalConstant.obj.defaultPatientGender)) {
    npc.radioButton.ClickButton()
  } else {
    npc.radioButton_2.ClickButton()
  }
  if (height && height > 0 && height <= 600) npc.spinBox_Height.qt_spinbox_lineedit.Keys(height)
  if (weight && weight > 0 && weight <= 300) npc.spinBox_Weight.qt_spinbox_lineedit.Keys(weight)
  if (age && age > 0 && height <= 200) npc.spinBox_Age.qt_spinbox_lineedit.Keys(age)
  address && npc.lineEdit_5.Keys(address)
  phone && npc.lineEdit_6.Keys(phone)
  note && npc.textEdit_7.Keys(note)
}

const __inputEditPatientFields = (npc, args) => {
  const [patientName, gender, height, weight, age, address, phone, note] = args
  if (patientName) {
    npc.name.clear()
    npc.name.Keys(patientName)
  }
  
  if (strictEqual(gender, globalConstant.obj.defaultPatientGender)) {
    npc.radioButton.ClickButton()
  } else {
    npc.radioButton_2.ClickButton()
  }
  if (height && height > 0 && height <= 600) {
    npc.spinBox_Height.qt_spinbox_lineedit.clear()
    npc.spinBox_Height.qt_spinbox_lineedit.Keys(height)
  }
  if (weight && weight > 0 && weight <= 300) {
    npc.spinBox_Weight.qt_spinbox_lineedit.clear()
    npc.spinBox_Weight.qt_spinbox_lineedit.Keys(weight)
  }
  if (age && age > 0 && height <= 200) {
    npc.spinBox_Age.qt_spinbox_lineedit.clear()
    npc.spinBox_Age.qt_spinbox_lineedit.Keys(age)
  }
  if (address){
    npc.lineEdit_5.clear()
    npc.lineEdit_5.Keys(address)
  }
  if (phone) {
    npc.lineEdit_6.clear()
    npc.lineEdit_6.Keys(phone)
  }
  if (note) {
    npc.textEdit_7.clear()
    npc.textEdit_7.Keys(note)
  } 
}

const openNewPatientWindow = indel => {
  indel.patientManagement.pushButton_NewPatient.ClickButton()
}

const exitPatientWindow = indel => {
  indel.patient_newpatientClass.Close()
}

const fromPatientDetailToMain = indel => {
  indel.patientDataClass.groupBox_6.pushButton_Close.Click()
  indel.patient_update_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
  utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
}

const loadPatient = (indel, patientId) => {
  const patientList = indel.patientManagement.treeWidget_PatientList
  const isExist = findinlist.isItemExistInMoreList(patientId, globalConstant.obj.patientIDColumn, patientList)
 
  if (isExist) {
    patientList.ClickItem(patientId)
    indel.patientManagement.pushButton_LoadPatient.ClickButton()
  } else {
    Log.Warning(`Can not find patient with patientId=${patientId} when loading patient`)
  }
}

const addPatientActivity = (indel, ...args) => {
  openNewPatientWindow(indel)
  addPatient(indel, false, args)
}

const addPatient = (indel, isCancel = false, args) => {
  const npc = indel.patient_newpatientClass
  __inputPatientFields(npc, args)

  if (!isCancel) {
    npc.createButton.ClickButton()
    if (!indel.patient_exists_popup.Exists && !indel.patient_no_name_or_id_popup.Exists) {
      indel.dirtyData.get(globalConstant.obj.addPatient).push(aqConvert.IntToStr(args[0]))
    }  
  } else {
    npc.cancelButton.ClickButton()
  }
}

const editPatient = (indel, isCancel = false, patientId, ...args) => {
  const patientList = indel.patientManagement.treeWidget_PatientList
  const isExist = findinlist.isItemExistInMoreList(patientId, globalConstant.obj.patientIDColumn, patientList)
    
  if (isExist) {
    patientList.ClickItem(patientId)
    indel.patientManagement.pushButton_EditPatient.ClickButton()
    __inputEditPatientFields(indel.patient_newpatientClass, args)
    !isCancel ? indel.patient_newpatientClass.createButton.ClickButton() : indel.patient_newpatientClass.cancelButton.ClickButton()
  } else {
    Log.Warning(`Can not find patient with patientId=${patientId} when editing patient`)
  }
}

const deletePatient = (indel, isCancel = false, patientId) => {
  const patientList = indel.patientManagement.treeWidget_PatientList
  const isExist = findinlist.isItemExistInMoreList(patientId, globalConstant.obj.patientIDColumn, patientList)
  
  if (isExist) {
    patientList.ClickItem(patientId)
    indel.patientManagement.pushButton_DeletePatient.ClickButton()
    if (!isCancel) {
      indel.patient_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      __handleDirtyDate(indel, patientId)
    } else {
      indel.patient_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not find patient with patientId=${patientId} when deleting patient`)
  }
}

const exportPatientData = (indel, isCancel = false, patientId, path) => {
  if (indel.patientManagement.VisibleOnScreen) {
    indel.patientManagement.groupBox_7.pushButton_Export.ClickButton()
    const dlg = indel.patient_DlgExportClass
    dlg.pushButton_SelectAll.ClickButton()
    dlg.lineEdit_Path.Keys(path)
    !isCancel ? dlg.pushButton_Ok.ClickButton() : dlg.pushButton_Cancel.ClickButton()
    //should choice target node first
    /*
    const list = dlg.treeWidget_PatientList
    const idx = findinlist.isItemExistInMoreListReturnIndex(patientId, globalConstant.obj.patientIDColumn, list)
    if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
      //list.wItems.Item(idx).Collapse()
      //list.wItems.Item(idx).Expand()
      dlg.lineEdit_Path.Keys(path)
      !isCancel ? dlg.pushButton_Ok.ClickButton() : dlg.pushButton_Cancel.ClickButton()
    } else {
      Log.Error("can not find export target patient!")
    }
    */
  } else {
    Log.Warning(`Can not exportPatientData due to window is not right`) 
  }
}

const importPatientData = (indel, isCancel = false, patientId, path) => {
  if (indel.patientManagement.VisibleOnScreen) {
    indel.patientManagement.groupBox_7.pushButton_Import.ClickButton()
    const dlgip = indel.patient_dlgSelectImportPath
    dlgip.Edit.Keys(path)
    dlgip.btn_2.ClickButton()
    const dlgic = indel.patient_DlgImportClass
    dlgic.pushButton_SelectAll.ClickButton()
    if (!isCancel) {
      dlgic.pushButton_Ok.ClickButton()
      if (indel.patient_import_done_popup.Exists) indel.dirtyData.get(globalConstant.obj.addPatient).push(patientId)
    } else {
      dlgic.pushButton_Cancel.ClickButton()
    }
    //should choice target node first
    /*
    const list = dlgic.treeWidget_PatientList
    const idx = findinlist.isItemExistInMoreListReturnIndex(patientId, globalConstant.obj.patientIDColumn, list)
    if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
      //list.wItems.Item(idx).Click()
      !isCancel ? dlgic.pushButton_Ok.ClickButton() : dlgic.pushButton_Cancel.ClickButton()
    } else {
      Log.Error("can not find import target patient!")
    }
    */
  } else {
    Log.Warning(`Can not importPatientData due to window is not right`) 
  }
}

const deletePatientForDirtyData = (indel, deletePatients) => {
  const patientList = indel.patientManagement.treeWidget_PatientList
  let dp = deletePatients.pop()
  while (dp) {
    const isExist = findinlist.isItemExistInMoreList(dp, globalConstant.obj.patientIDColumn, patientList)  
    if (isExist) {
      patientList.ClickItem(dp)
      indel.patientManagement.pushButton_DeletePatient.ClickButton()
      indel.patient_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else {
      Log.Warning(`Can not find patient with patientId=${patientId} when deletePatientForDirtyData`)
    }
    dp = deletePatients.pop()
  }
}

module.exports.openNewPatientWindow = openNewPatientWindow
module.exports.exitPatientWindow = exitPatientWindow
module.exports.fromPatientDetailToMain = fromPatientDetailToMain
module.exports.addPatient = addPatient
module.exports.addPatientActivity = addPatientActivity
module.exports.editPatient = editPatient
module.exports.deletePatient = deletePatient
module.exports.loadPatient = loadPatient
module.exports.exportPatientData = exportPatientData
module.exports.importPatientData = importPatientData
module.exports.deletePatientForDirtyData = deletePatientForDirtyData