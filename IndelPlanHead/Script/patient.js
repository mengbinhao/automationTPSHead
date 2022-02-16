const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const findInList = require("find_in_list")
const coordinate = require("coordinate")

const __handlePatientDirtyData = (pv, patientID) => {
  const dirtydPatients = pv.dirtyData.get(globalConstant.obj.addPatient)
  if (dirtydPatients.includes(patientID)) {
    pv.dirtyData.set(globalConstant.obj.addPatient, dirtydPatients.filter(val => val !== patientID))
  } else {
    Log.Warning(`can not __handlePatientDirtyData due to patientID=${patientID}`)
  }
}

const __inputPatientFields = (pnp, args) => {
  const [patientID, patientName, gender, height, weight, age, address, phone, note] = args
  if (!patientID || !patientName) return
  pnp.lineEdit.Keys(patientName)
  pnp.lineEdit_2.Keys(patientID)
  if (strictEqual(gender, globalConstant.obj.defaultPatientGender)) {
    pnp.radioButton.ClickButton()
  } else {
    pnp.radioButton_2.ClickButton()
  }
  if (height && height > 0 && height <= 600) pnp.spinBox_Height.qt_spinbox_lineedit.Keys(height)
  if (weight && weight > 0 && weight <= 300) pnp.spinBox_Weight.qt_spinbox_lineedit.Keys(weight)
  if (age && age > 0 && height <= 200) pnp.spinBox_Age.qt_spinbox_lineedit.Keys(age)
  address && pnp.lineEdit_5.Keys(address)
  phone && pnp.lineEdit_6.Keys(phone)
  note && pnp.textEdit_7.Keys(note)
}

const __inputEditPatientFields = (pnp, args) => {
  const [patientName, gender, height, weight, age, address, phone, note] = args
  if (patientName) {
    pnp.lineEdit.clear()
    pnp.lineEdit.Keys(patientName)
  }
  
  if (strictEqual(gender, globalConstant.obj.defaultPatientGender)) {
    pnp.radioButton.ClickButton()
  } else {
    pnp.radioButton_2.ClickButton()
  }
  if (height && height > 0 && height <= 600) {
    pnp.spinBox_Height.qt_spinbox_lineedit.clear()
    pnp.spinBox_Height.qt_spinbox_lineedit.Keys(height)
  }
  if (weight && weight > 0 && weight <= 300) {
    pnp.spinBox_Weight.qt_spinbox_lineedit.clear()
    pnp.spinBox_Weight.qt_spinbox_lineedit.Keys(weight)
  }
  if (age && age > 0 && height <= 200) {
    pnp.spinBox_Age.qt_spinbox_lineedit.clear()
    pnp.spinBox_Age.qt_spinbox_lineedit.Keys(age)
  }
  if (address){
    pnp.lineEdit_5.clear()
    pnp.lineEdit_5.Keys(address)
  }
  if (phone) {
    pnp.lineEdit_6.clear()
    pnp.lineEdit_6.Keys(phone)
  }
  if (note) {
    pnp.textEdit_7.clear()
    pnp.textEdit_7.Keys(note)
  } 
}

const openNewPatientWindow = indelPlan => {
  indelPlan.patientManagement.pushButton_NewPatient.ClickButton()
}

const exitPatientWindow = indelPlan => {
  indelPlan.patient_new_patient.Close()
}

const fromPatientDetailToMain = (indelPlan, isPatientSavePopup = false) => {
  indelPlan.PatientData.groupBox_6.pushButton_Close.Click()
  if (!isPatientSavePopup) {
    indelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
  } else {
    indelPlan.patient_update_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
  }
  utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
}

const loadPatient = (indelPlan, patientID) => {
  const patientList = indelPlan.patientManagement.treeWidget_PatientList
  const isExist = findInList.isItemExistInMoreList(patientID, globalConstant.obj.patientIDColumn, patientList)
 
  if (isExist) {
    patientList.ClickItem(patientID)
    indelPlan.patientManagement.pushButton_LoadPatient.ClickButton()
  } else {
    Log.Warning(`Can not find patient with patientID=${patientID} when loading patient`)
  }
}

const addPatientActivity = (indelPlan, pv, ...args) => {
  openNewPatientWindow(indelPlan)
  addPatient(indelPlan, pv, false, args)
}

const addPatient = (indelPlan, pv, isCancel = false, args) => {
  const pnp = indelPlan.patient_new_patient
  __inputPatientFields(pnp, args)

  if (!isCancel) {
    pnp.pushButton_2.ClickButton()
    if (!indelPlan.patient_exists_popup.Exists && !indelPlan.patient_no_name_or_id_popup.Exists) {
      pv.dirtyData.get(globalConstant.obj.addPatient).push(aqConvert.IntToStr(args[0]))
    }  
  } else {
    pnp.pushButton_4.ClickButton()
  }
}

const editPatient = (indelPlan, isCancel = false, patientID, ...args) => {
  const patientList = indelPlan.patientManagement.treeWidget_PatientList
  const isExist = findInList.isItemExistInMoreList(patientID, globalConstant.obj.patientIDColumn, patientList)
    
  if (isExist) {
    patientList.ClickItem(patientID)
    indelPlan.patientManagement.pushButton_EditPatient.ClickButton()
    __inputEditPatientFields(indelPlan.patient_new_patient, args)
    !isCancel ? indelPlan.patient_new_patient.pushButton_2.ClickButton() : indelPlan.patient_new_patient.pushButton_4.ClickButton()
  } else {
    Log.Warning(`Can not find patient with patientID=${patientID} when editing patient`)
  }
}

const deletePatient = (indelPlan, pv, patientID, isCancel = false) => {
  const patientList = indelPlan.patientManagement.treeWidget_PatientList
  const isExist = findInList.isItemExistInMoreList(patientID, globalConstant.obj.patientIDColumn, patientList)
  
  if (isExist) {
    patientList.ClickItem(patientID)
    indelPlan.patientManagement.pushButton_DeletePatient.ClickButton()
    if (!isCancel) {
      indelPlan.patient_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      __handlePatientDirtyData(pv, patientID)
    } else {
      indelPlan.patient_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not find patient with patientID=${patientID} when deleting patient`)
  }
}

const exportPatient = (indelPlan, patientID, path, isCancel = false) => {
  if (indelPlan.patientManagement.VisibleOnScreen) {
    indelPlan.patientManagement.groupBox_7.pushButton_Export.ClickButton()
    const dlg = indelPlan.patient_exporter
  
    //use coordinate to choice target node
    const idx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDColumn, dlg.treeWidget_PatientList)
    if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
      dlg.pushButton_SelectNone.ClickButton()
      const [desX, desY] = coordinate.getPatientExportNodeCorrdinate(idx)
      LLPlayer.MouseMove(desX, desY, globalConstant.obj.delayMouseHalfSecond)
      LLPlayer.MouseDown(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
      LLPlayer.MouseUp(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
      dlg.lineEdit_Path.Keys(path)
      !isCancel ? dlg.pushButton_Ok.ClickButton() : dlg.pushButton_Cancel.ClickButton()
    } else {
      Log.Error("can not find export target patient!")
    }

  } else {
    Log.Warning(`Can not exportPatient due to window is not right`) 
  }
}

const importPatient = (indelPlan, pv, patientID, path, isCancel = false) => {
  if (indelPlan.patientManagement.VisibleOnScreen) {
    indelPlan.patientManagement.groupBox_7.pushButton_Import.ClickButton()
    const dlgip = indelPlan.patient_dlgSelectImportPath
    //resolve overlap window of history blocks choose button
    Win32API.ShowWindowAsync(dlgip.Handle, Win32API.SW_MAXIMIZE)
    utilsFunctions.delay(globalConstant.obj.delayOneSeconds)
    dlgip.Edit.Keys(path)
    LLPlayer.MouseMove(Sys.Desktop.Width / 2, Sys.Desktop.Height / 2, globalConstant.obj.delayMouseHalfSecond)
    LLPlayer.MouseDown(MK_LBUTTON, Sys.Desktop.Width / 2, Sys.Desktop.Height / 2,globalConstant.obj.delayMouseZeroSecond)
    LLPlayer.MouseUp(MK_LBUTTON, Sys.Desktop.Width / 2, Sys.Desktop.Height / 2, globalConstant.obj.delayMouseHalfSecond)
    dlgip.btn_.ClickButton()
    const dlgic = indelPlan.patient_importer

    //use coordinate to choice target node
    const idx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDColumn, dlgic.treeWidget_PatientList)
    if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
      dlgic.pushButton_SelectNone.ClickButton()
      const [desX, desY] = coordinate.getPatientImportNodeCorrdinate(idx)
      LLPlayer.MouseMove(desX, desY, globalConstant.obj.delayMouseHalfSecond)
      LLPlayer.MouseDown(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
      LLPlayer.MouseUp(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
      if (!isCancel) {
        dlgic.pushButton_Ok.ClickButton()
        if (indelPlan.patient_import_done_popup.Exists) pv.dirtyData.get(globalConstant.obj.addPatient).push(patientID)
      } else {
        dlgic.pushButton_Cancel.ClickButton()
      }
    } else {
      Log.Error("can not find import target patient!")
    }
  } else {
    Log.Warning(`Can not importPatient due to window is not right`) 
  }
}

const deletePatientForDirtyData = (indelPlan, deletePatients) => {
  const patientList = indelPlan.patientManagement.treeWidget_PatientList
  let dp = deletePatients.pop()
  while (dp) {
    const isExist = findInList.isItemExistInMoreList(dp, globalConstant.obj.patientIDColumn, patientList)  
    if (isExist) {
      patientList.ClickItem(dp)
      indelPlan.patientManagement.pushButton_DeletePatient.ClickButton()
      indelPlan.patient_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else {
      Log.Warning(`Can not find patient with patientID=${dp} when deletePatientForDirtyData`)
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
module.exports.exportPatient = exportPatient
module.exports.importPatient = importPatient
module.exports.deletePatientForDirtyData = deletePatientForDirtyData