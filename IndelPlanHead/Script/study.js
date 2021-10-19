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
  const patientFolderName = filefunctions.getFullFolderNameWithPartialName(globalConstant.obj.importData, patientID)
  if (!patientFolderName) return false
  const typefName = `${globalConstant.obj.importData}${patientFolderName}\\${type}`
  const isSubExists = filefunctions.isExists(typefName)
  if (!isSubExists) return false
  return __isDcmFilesExist(typefName)
}

//return rowIdx
const __getPatientIDRowIdx = (indel, patientID, type) => {
  const list = indel.import_GamaImporterClass.treeWidget
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

const __deletePatient = (indel, patientID, isDelete) => {
  const list = indel.import_GamaImporterClass.treeWidget
  const rowIdx = findinlist.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex))  {
    list.wItems.Item(rowIdx).Click()
    indel.import_GamaImporterClass.pbDelete.ClickButton()
    if (!indel.import_delete_not_selected_popup.Exists) {
      isDelete ? indel.import_delete_patient_popup.qt_msgbox_buttonbox.buttonYes.ClickButton() : indel.import_delete_patient_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not __deletePatient due to patientID = ${patientID}`) 
  }
}

const __deleteOneSeries = (indel, patientID, type, isDelete) => {
  const list = indel.import_GamaImporterClass.treeWidget
  const rowIdx = findinlist.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex))  {
    const parent = list.wItems.Item(rowIdx)
    parent.Expand()
    const subIdx = __getSubItemIdx(parent, type)
    if (!strictEqual(subIdx, globalConstant.obj.notFoundIndex)) {
      parent.Items.Item(subIdx).Click()
      indel.import_GamaImporterClass.pbDelete.ClickButton()
      if (!indel.import_delete_not_selected_popup.Exists) {
        isDelete ? indel.import_delete_series_popup.qt_msgbox_buttonbox.buttonYes.ClickButton() : indel.import_delete_series_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    } else {
      Log.Warning(`Can not __deleteOneSeries due to patientID = ${patientID} and type = ${type}`) 
    }
    
  } else {
    Log.Warning(`Can not __deleteOneSeries due to patientID = ${patientID}`) 
  }  
}

const gotoImportWindow = indel => {
  if (indel.patientDataClass.VisibleOnScreen) {
    indel.patientDataClass.groupBox.pushButton_AddStudy.ClickButton()
    utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not gotoImportClass due to window is not right`) 
  }
}

const exitImportWindow = indel => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    indel.import_GamaImporterClass.pbClose.ClickButton()
    if (indel.import_close_popup.Exists) {
      indel.import_close_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
  } else {
    Log.Warning(`Can not exitImportWindow due to window is not right`) 
  }
}

const contourExistingStudy = (indel, studyName) => {
  if (indel.patientDataClass.VisibleOnScreen) {
    const list = indel.patientDataClass.groupBox.treeWidget_StudyList
    const rowIdx = findinlist.isItemExistInMoreListReturnIndex(studyName, globalConstant.obj.studyName, list)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      list.wItems.Item(rowIdx).Click()
      indel.patientDataClass.groupBox_6.pushButton_Contour.ClickButton()
    } else {
      Log.Warning(`Can not loadExistingStudy due to incorrect studyName, studyName = ${studyName}`)
    }
  } else {
    Log.Warning(`Can not loadExistingStudy due to window is not right`) 
  }
}

const loadStudy = (indel, patientID, type = "CT") => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    //check is in list and related files in Disk
    const rowIdx = __getPatientIDRowIdx(indel, patientID, type)
    if (strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not loadStudy due to wrong patient or files don't exist on disk`) 
      return
    }
    const parent = indel.import_GamaImporterClass.treeWidget.wItems.Item(rowIdx)
    parent.Expand()
    const subIdx = __getSubItemIdx(parent, type)
    if (strictEqual(subIdx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not loadStudy due to wrong patient data`) 
      return
    }
    indel.import_GamaImporterClass.treeWidget.wItems.Item(rowIdx).Items.Item(subIdx).Click()
    indel.import_GamaImporterClass.pbDeleteAll_3.ClickButton()
    if (indel.import_reimport_popup.Exists) {
      indel.import_reimport_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
  } else {
    Log.Warning(`Can not loadStudy due to window is not right`) 
  }
}

const deleteStudy = (indel, patientID, type = "", isDelete = false) => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    !type ? __deletePatient(indel, patientID, isDelete) : __deleteOneSeries(indel, patientID, type, isDelete)
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const deleteAllStudy = (indel, isDelete = false) => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    indel.import_GamaImporterClass.pbDeleteAll.ClickButton()
    isDelete ? indel.import_delete_all_popup.qt_msgbox_buttonbox.buttonYes.ClickButton(): indel.import_delete_all_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const extractStudy = indel => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    indel.import_GamaImporterClass.tabWidget.qt_tabwidget_stackedwidget.tab.toolButton.ClickButton()
    if (indel.import_extract_not_import_popup.Exists) {
      Log.Warning(`Can not extractStudy due to should import first`)
      return
    }
    const position = coordinate.getNearMiddleCoordinate()
    LLPlayer.MouseDown(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
    LLPlayer.MouseUp(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
    
    if (indel.import_extract_head_axial_popup.Exists) {
      Log.Warning(`Can not extractStudy due to should image extract head axial popup`)
      return      
    }
    
    if (indel.import_extract_unsupported_dicom_series_popup.Exists) {
      Log.Warning(`Can not extractStudy due to should image extract unsupported dicom series popup`)
      return      
    }

    if (indel.import_extract_can_not_locate_frame_popup.Exists) {
      Log.Warning(`Can not extractStudy due to should image extract fail`)
      return      
    }
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const registerStudy = indel => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    const tab = indel.import_GamaImporterClass.tabWidget.qt_tabwidget_stackedwidget.tab
    tab.pushButton.ClickButton()
    if (indel.import_register_popup.Exists) {
      Log.Warning(`Can not registerStudy due to image quality low`)
      return
    }
    
    if (indel.import_CDeviationTableDlg.Exists) {
      indel.import_CDeviationTableDlg.Close()
      tab.ConfirmRegisterBotton.ClickButton()
      utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const saveStudy = (indel, isSave = false) => {
  if (indel.import_GamaImporterClass.VisibleOnScreen) {
    indel.import_GamaImporterClass.pbSaveStudy.ClickButton()
    if (indel.import_save_collision_detection_popup.Exists) {
      indel.import_save_collision_detection_popup.qt_msgbox_buttonbox.buttonIgnore.ClickButton()
      utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
    
    if (indel.import_save_ct_popup.Exists) indel.import_save_ct_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    
    if (isSave) {
      indel.import_save_inform_confirm_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      if (!indel.import_save_out_of_size_popup.Exists) {
        indel.import_save_successfully_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      }
    } else {
       indel.import_save_inform_popup.import_save_inform_confirm_popup.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const addOneStudyActivity = (indel, patientID, type = "CT") => {
  gotoImportWindow(indel)
  loadStudy(indel, patientID, type)
  extractStudy(indel)
  registerStudy(indel)
  saveStudy(indel, true)
  exitImportWindow(indel)
}

module.exports.gotoImportWindow = gotoImportWindow
module.exports.exitImportWindow = exitImportWindow
module.exports.loadStudy = loadStudy
module.exports.deleteAllStudy = deleteAllStudy
module.exports.deleteStudy = deleteStudy
module.exports.extractStudy = extractStudy
module.exports.registerStudy = registerStudy
module.exports.saveStudy = saveStudy
module.exports.contourExistingStudy = contourExistingStudy
module.exports.addOneStudyActivity = addOneStudyActivity