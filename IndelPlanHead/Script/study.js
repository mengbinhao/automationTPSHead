const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
const filefunctions = require("file_functions")
const coordinate = require("coordinate")

const __getIsDataOK = (parent, type) => {
  const cnt = parent.Items.Count
  if (cnt === 0) return false
  for (let i = 0; i < cnt; i++) {
    if (strictEqual(parent.Items.Item(i).Text(1), type)) {
      return true
    }
  }
  return false
}

const __isDcmFilesExist = typefName => {
  const subFolders = aqFileSystem.GetFolderInfo(typefName).SubFolders
  //only one subFolders under CT or MR
  if (subFolders.HasNext()){
    const fName = subFolders.Next().Name
    const subSubFolders = aqFileSystem.GetFolderInfo(`${typefName}\\${fName}`).SubFolders
    //maybe muiti folders
    while (subSubFolders.HasNext()){
      const name = subSubFolders.Next().Name
      const foundFiles = aqFileSystem.FindFiles(`${typefName}\\${fName}\\${name}`, "*.dcm")
      //return if exists dcm files
      if (!strictEqual(foundFiles, null)) {
        return true
        /*
        while (foundFiles.HasNext()) {
          aFile = foundFiles.Next()
        }
        */
      } else {
        continue
      }
    }
  }
  return false
}

const __getIsFilesOK = (patientID, type) => {
  const patientFolderName = filefunctions.getFullFolderNameWithPartialName(globalConstant.obj.studyDICOMFolder, patientID)
  if (!patientFolderName) return false
  const typefName = `${globalConstant.obj.studyDICOMFolder}${patientFolderName}\\${type}`
  const isSubExists = filefunctions.isExists(typefName)
  if (!isSubExists) return false
  return __isDcmFilesExist(typefName)
}

//return rowIdx
const __getPatientIDRowIdx = (indelPlan, patientID, type) => {
  const list = indelPlan.register_importer.treeWidget
  const rowIdx = findinlist.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) return globalConstant.obj.notFoundIndex
  if (!__getIsDataOK(list.wItems.Item(rowIdx), type)) return globalConstant.obj.notFoundIndex
  if (!__getIsFilesOK(patientID, type)) return globalConstant.obj.notFoundIndex
  return rowIdx
}

//return first find data
const __getSubItemIdx = (parent, type) => {
  const cnt = parent.Items.Count
  if (cnt < 1) return globalConstant.obj.notFoundIndex
  for (let i = 0; i < cnt; i++) {
    if (strictEqual(parent.Items.Item(i).Text(1), type)) return i
  }
  return globalConstant.obj.notFoundIndex
}

const __deletePatient = (indelPlan, patientID, isDelete) => {
  const list = indelPlan.register_importer.treeWidget
  const rowIdx = findinlist.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex))  {
    list.wItems.Item(rowIdx).Click()
    indelPlan.register_importer.pbDelete.ClickButton()
    if (!indelPlan.register_delete_not_selected_popup.Exists) {
      isDelete ? indelPlan.register_delete_patient_popup.qt_msgbox_buttonbox.buttonYes.ClickButton() : indelPlan.register_delete_patient_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not __deletePatient due to patientID = ${patientID}`) 
  }
}

const __deleteOneSeries = (indelPlan, patientID, type, isDelete) => {
  const list = indelPlan.register_importer.treeWidget
  const rowIdx = findinlist.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex))  {
    const parent = list.wItems.Item(rowIdx)
    parent.Expand()
    const subIdx = __getSubItemIdx(parent, type)
    if (!strictEqual(subIdx, globalConstant.obj.notFoundIndex)) {
      parent.Items.Item(subIdx).Click()
      indelPlan.register_importer.pbDelete.ClickButton()
      if (!indelPlan.register_delete_not_selected_popup.Exists) {
        isDelete ? indelPlan.register_delete_series_popup.qt_msgbox_buttonbox.buttonYes.ClickButton() : indelPlan.register_delete_series_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    } else {
      Log.Warning(`Can not __deleteOneSeries due to patientID = ${patientID} and type = ${type}`) 
    }
    
  } else {
    Log.Warning(`Can not __deleteOneSeries due to patientID = ${patientID}`) 
  }  
}

const gotoRegisterImporter = indelPlan => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    indelPlan.PatientData.groupBox.pushButton_AddStudy.ClickButton()
    utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not gotoRegisterImporter due to window is not right`) 
  }
}

const exitImportWindow = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.pbClose.ClickButton()
    if (indelPlan.register_close_popup.Exists) {
      indelPlan.register_close_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
  } else {
    Log.Warning(`Can not exitImportWindow due to window is not right`) 
  }
}

const contourExistingStudy = (indelPlan, studyName) => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    const list = indelPlan.PatientData.groupBox.treeWidget_StudyList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(studyName, globalConstant.obj.studyName, list)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      list.wItems.Item(rowIdx).Click()
      indelPlan.PatientData.groupBox_6.pushButton_Contour.ClickButton()
    } else {
      Log.Warning(`Can not loadExistingStudy due to incorrect studyName, studyName = ${studyName}`)
    }
  } else {
    Log.Warning(`Can not loadExistingStudy due to window is not right`) 
  }
}

const loadStudy = (indelPlan, patientID, type = "CT") => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    //check is in list and related files in Disk
    const rowIdx = __getPatientIDRowIdx(indelPlan, patientID, type)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not loadStudy due to wrong patient or files don't exist on disk`) 
      return
    }
    const parent = indelPlan.register_importer.treeWidget.wItems.Item(rowIdx)
    parent.Expand()
    const subIdx = __getSubItemIdx(parent, type)
    if (strictEqual(subIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not loadStudy due to wrong patient data`) 
      return
    }
    indelPlan.register_importer.treeWidget.wItems.Item(rowIdx).Items.Item(subIdx).Click()
    indelPlan.register_importer.pbDeleteAll_3.ClickButton()
    if (indelPlan.register_overwrite_data_popup.Exists) {
      indelPlan.register_overwrite_data_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
  } else {
    Log.Warning(`Can not loadStudy due to window is not right`) 
  }
}

const setWWAndWL = (indelPlan, type = "CT",  W = "2785", L = "430") => {
  if (indelPlan.register_importer.VisibleOnScreen) { 
    indelPlan.register_importer.groupBox_5.leMovWL.clear()
    indelPlan.register_importer.groupBox_5.leMovWL.Keys(L)
    indelPlan.register_importer.groupBox_5.leMovWW.clear()
    indelPlan.register_importer.groupBox_5.leMovWW.Keys(W)
    Sys.Desktop.Keys("[Enter]")
  } else {
    Log.Warning(`Can not setWWAndWL due to window is not right`) 
  }
}

const deleteStudy = (indelPlan, patientID, type = "", isDelete = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    !type ? __deletePatient(indelPlan, patientID, isDelete) : __deleteOneSeries(indel, patientID, type, isDelete)
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const deleteAllStudy = (indelPlan, isDelete = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.pbDeleteAll.ClickButton()
    isDelete ? indelPlan.register_delete_all_popup.qt_msgbox_buttonbox.buttonYes.ClickButton(): indelPlan.register_delete_all_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const extractStudy = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_area.toolButton.ClickButton()
    const position = coordinate.getNearMiddleCoordinate()
    LLPlayer.MouseDown(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
    LLPlayer.MouseUp(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
    utilsfunctions.delay(globalConstant.obj.delayThirtySeconds)
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const registerStudy = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_area.pushButton.ClickButton()
    if (indelPlan.register_less_slices_popup.Exists) {
      Log.Warning(`Can not registerStudy due to image quality low`)
      return
    }
    
    if (indelPlan.register_CDeviationTableDlg.Exists) {
      indelPlan.register_CDeviationTableDlg.Close()
      indelPlan.register_area.ConfirmRegisterBotton.ClickButton()
      utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const saveStudy = (indelPlan, isSave = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.pbSaveStudy.ClickButton()
    if (indelPlan.register_save_collision_detection_popup.Exists) {
      indelPlan.register_save_collision_detection_popup.qt_msgbox_buttonbox.buttonIgnore.ClickButton()
      utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
    
    if (indelPlan.register_save_ct_voxels_popup.Exists) indelPlan.register_save_ct_voxels_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    
    if (isSave) {
      indelPlan.register_save_confirm_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      //if (!indelPlan.import_save_out_of_size_popup.Exists) {
        indelPlan.register_save_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      //}
    } else {
       indelPlan.register_save_confirm_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const addOneStudyActivity = (indelPlan, patientID, type = "CT") => {
  gotoRegisterImporter(indelPlan)
  loadStudy(indelPlan, patientID, type)
  setWWAndWL(indelPlan)
  extractStudy(indelPlan)
  registerStudy(indelPlan)
  saveStudy(indelPlan, true)
  exitImportWindow(indelPlan)
}

module.exports.gotoRegisterImporter = gotoRegisterImporter
module.exports.exitImportWindow = exitImportWindow
module.exports.loadStudy = loadStudy
module.exports.setWWAndWL = setWWAndWL
module.exports.deleteAllStudy = deleteAllStudy
module.exports.deleteStudy = deleteStudy
module.exports.extractStudy = extractStudy
module.exports.registerStudy = registerStudy
module.exports.saveStudy = saveStudy
module.exports.contourExistingStudy = contourExistingStudy
module.exports.addOneStudyActivity = addOneStudyActivity