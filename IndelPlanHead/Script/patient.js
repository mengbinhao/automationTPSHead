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

const addPatientActivity = (indel, patientId, patientName) => {
  openNewPatientWindow(indel)
  addPatient(indel, patientId, patientName, false)
}

const addPatient = (indel, patientId = "", patientName = "", isCancel = false) => {
  const npc = indel.patient_newpatientClass
  patientId && npc.name.Keys(patientName)
  patientName && npc.id.Keys(patientId)

  if (!isCancel) {
    npc.createButton.ClickButton()
    if (!indel.patient_exists_popup.Exists && !indel.patient_no_name_or_id_popup.Exists) {
      indel.dirtyData.get(globalConstant.obj.addPatient).push(patientId)
    }  
  } else {
    npc.cancelButton.ClickButton()
  }
}

const editPatient = (indel, patientId, editPatientName = "", isCancel = false) => {
  const patientList = indel.patientManagement.treeWidget_PatientList
  const isExist = findinlist.isItemExistInMoreList(patientId, globalConstant.obj.patientIDColumn, patientList)
    
  if (isExist) {
    patientList.ClickItem(patientId)
    indel.patientManagement.pushButton_EditPatient.ClickButton()
    if (editPatientName) {
      indel.patient_newpatientClass.name.wText = globalConstant.obj.emptyString
      indel.patient_newpatientClass.name.Keys(editPatientName)
    }
    isCancel ? indel.patient_newpatientClass.createButton.ClickButton() : indel.patient_newpatientClass.cancelButton.ClickButton()
  } else {
    Log.Warning(`Can not find patient with patientId=${patientId} when editing patient`)
  }
}

const deletePatient = (indel, patientId, isCancel = false) => {
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
module.exports.deletePatientForDirtyData = deletePatientForDirtyData