const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const findInList = require("find_in_list")
const fileFunctions = require("file_functions")
const coordinate = require("coordinate")
const patient = require("patient")

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
  const patientFolderName = fileFunctions.getFullFolderNameWithPartialName(globalConstant.obj.studyDICOMFolder, patientID)
  if (!patientFolderName) return false
  const typefName = `${globalConstant.obj.studyDICOMFolder}${patientFolderName}\\${type}`
  const isSubExists = fileFunctions.isExists(typefName)
  if (!isSubExists) return false
  return __isDcmFilesExist(typefName)
}

//return rowIdx
const __getPatientIDRowIdx = (indelPlan, patientID, type) => {
  const list = indelPlan.register_importer.treeWidget
  const rowIdx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
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

//isAll means copy all back or just one patient
/*
const __copyDeletedStudyBack = (isAll) => {
  let source = globalConstant.obj.studyDICOMOriginFolder
  if (!isAll) {
    source += `${Project.Variables.study_image_name}@${Project.Variables.study_image_id}`  
    if(fileFunctions.copyOnePatientFolder(source, globalConstant.obj.studyDICOMFolder)) {
      Log.Message(`Copy ${Project.Variables.study_image_name}@${Project.Variables.study_image_id} from ${globalConstant.obj.studyDICOMOriginFolder} to ${globalConstant.obj.studyDICOMFolder} successfuly!`)
    } else {
      Log.Error(`Copy ${Project.Variables.study_image_name}@${Project.Variables.study_image_id} from ${globalConstant.obj.studyDICOMOriginFolder} to ${globalConstant.obj.studyDICOMFolder} fail!`)
    }
  } else {
    if (fileFunctions.copyAllPatientFolders(source, globalConstant.obj.studyDICOMFolder)) {
      Log.Message(`Copy ${source} to ${globalConstant.obj.studyDICOMFolder} successfuly!`)
    } else {
      Log.Message(`Copy ${source} to ${globalConstant.obj.studyDICOMFolder} fail!`)
    }
  }
  utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
}
*/

const __deletePatient = (indelPlan, pv, patientID, isDelete) => {
  const list = indelPlan.register_importer.treeWidget
  const rowIdx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex))  {
    list.wItems.Item(rowIdx).Click()
    indelPlan.register_importer.pbDelete.ClickButton()
    if (!indelPlan.register_delete_not_selected_popup.Exists) {
      if (isDelete) {
        indelPlan.register_delete_patient_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
        pv.dirtyData.set(globalConstant.obj.restoreStudy, true)
        //__copyDeletedStudyBack(false)
      } else {
        indelPlan.register_delete_patient_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    }
  } else {
    Log.Warning(`Can not __deletePatient due to patientID = ${patientID}`) 
  }
}

const __deleteOneSeries = (indelPlan, pv, patientID, type, isDelete) => {
  const list = indelPlan.register_importer.treeWidget
  const rowIdx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, list)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex))  {
    const parent = list.wItems.Item(rowIdx)
    parent.Expand()
    const subIdx = __getSubItemIdx(parent, type)
    if (!strictEqual(subIdx, globalConstant.obj.notFoundIndex)) {
      parent.Items.Item(subIdx).Click()
      indelPlan.register_importer.pbDelete.ClickButton()
      if (!indelPlan.register_delete_not_selected_popup.Exists) {
        if (isDelete) {
          indelPlan.register_delete_series_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
          pv.dirtyData.set(globalConstant.obj.restoreStudy, true)
          //__copyDeletedStudyBack(false)
        } else {
          indelPlan.register_delete_series_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
        }
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
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not gotoRegisterImporter due to window is not right`) 
  }
}

const closeRegisterImporter = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.Close()
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not closeRegisterImporter due to window is not right`) 
  }
}

//click Close button
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

//form PatientData to ContourGUI
const contourExistingStudy = (indelPlan, studyName) => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    const list = indelPlan.PatientData.groupBox.treeWidget_StudyList
    const rowIdx = findInList.isItemExistInMoreListReturnIndex(studyName, globalConstant.obj.studyName, list)
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

//method true means click load button, else double click image node
const loadStudy = (indelPlan, patientID, type = "CT", method = true) => {
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
      Log.Warning(`Can not loadStudy due to wrong patient`) 
      return
    }
    
    if (method) {
      indelPlan.register_importer.treeWidget.wItems.Item(rowIdx).Items.Item(subIdx).Click()
      indelPlan.register_importer.pbDeleteAll_3.ClickButton()

    } else {
      indelPlan.register_importer.treeWidget.wItems.Item(rowIdx).Items.Item(subIdx).DblClick()
    }
    //just in case
    utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
    
    if (indelPlan.register_overwrite_data_popup.Exists) {
      indelPlan.register_overwrite_data_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
    //incase study not display normally
    while (indelPlan.register_area.checkBox.Enabled) {
      utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
  } else {
    Log.Warning(`Can not loadStudy due to window is not right`) 
  }
}

const setWWAndWL = (indelPlan, type = "CT",  W = "1200", L = "300") => {
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

//with type means delete one series
//delete will delete image file on local disk, so need to copy back
const deleteStudy = (indelPlan, pv, patientID, type = "", isDelete = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    !type ? __deletePatient(indelPlan, pv, patientID, isDelete) : __deleteOneSeries(indelPlan, pv, patientID, type, isDelete)
  } else {
    Log.Warning(`Can not deleteStudy due to window is not right`) 
  }
}

const deleteAllStudy = (indelPlan, pv, isDelete = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.pbDeleteAll.ClickButton()
    if (isDelete) {
      indelPlan.register_delete_all_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      pv.dirtyData.set(globalConstant.obj.restoreStudy, true)
      //__copyDeletedStudyBack(true)
    } else {
      indelPlan.register_delete_all_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not deleteAllStudy due to window is not right`) 
  }
}

const exportStudy = (indelPlan, patientID, path, isCancel = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    //should exist in register_importer list first
    let idx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDAndModalityColumn, indelPlan.register_importer.treeWidget)
    if (strictEqual(idx, globalConstant.obj.notFoundIndex)) {
      Log.Warning(`Can not exportStudy due to no target patientID`)
      return
    } else {
      indelPlan.register_importer.pbExport.ClickButton()
      const dlg = indelPlan.register_exporter
      //use coordinate to choice target node
      idx = findInList.isItemExistInMoreListReturnIndex(patientID, globalConstant.obj.patientIDColumn, dlg.treeWidget_PatientList)
      if (!strictEqual(idx, globalConstant.obj.notFoundIndex)) {
        dlg.pushButton_SelectNone.ClickButton()
        const [desX, desY] = coordinate.getStudyExportNodeCorrdinate(idx)
        LLPlayer.MouseMove(desX, desY, globalConstant.obj.delayMouseHalfSecond)
        LLPlayer.MouseDown(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
        LLPlayer.MouseUp(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
        dlg.lineEdit_Path.Keys(path)
        !isCancel ? dlg.pushButton_Ok.ClickButton() : dlg.pushButton_Cancel.ClickButton()
        utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
        indelPlan.register_export_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      } else {
        Log.Error("can not find target export study!")
        dlg.pushButton_Cancel.ClickButton()
      }
    }
  } else {
    Log.Warning(`Can not exportStudy due to window is not right`) 
  }
}

const importStudy = (indelPlan, path, isCancel = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.pbImport.ClickButton()
    const dlg = indelPlan.register_import_QFileDialog
    dlg.fileNameEdit.Keys(path)
    if (!isCancel) {
      dlg.buttonBox.buttonChoose.ClickButton()
      while (indelPlan.main_save_progress.VisibleOnScreen) {
        utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
      }
    } else {
      dlg.buttonBox.buttonCancel.ClickButton()
    }
  } else {
    Log.Warning(`Can not importStudy due to window is not right`) 
  }
}

const extractStudy = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_area.toolButton.ClickButton()
    utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    //hide zoom view
    indelPlan.register_area.checkBox_3.setChecked(false)
    const position = coordinate.getNearMiddleCoordinate()
    LLPlayer.MouseDown(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
    LLPlayer.MouseUp(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
    
    while (indelPlan.register_auto_extract_progress.Exists) {
      utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
    //incase register button disabled
    //utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  } else {
    Log.Warning(`Can not extractStudy due to window is not right`) 
  }
}

const registerStudy = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_area.pushButton.ClickButton()
    if (indelPlan.register_less_slices_popup.Exists) {
      Log.Error(`Can not registerStudy due to image quality low`)
      indelPlan.register_less_slices_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
      return false
    }
    
    if (indelPlan.register_CDeviationTableDlg.Exists) {
      indelPlan.register_CDeviationTableDlg.Close()
      indelPlan.register_area.ConfirmRegisterBotton.ClickButton()
      utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
    return true
  } else {
    Log.Warning(`Can not registerStudy due to window is not right`)
    return false
  }
}

const unRegisterStudy = indelPlan => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    if (indelPlan.register_area.UnRegisterButton.Enabled) {
      indelPlan.register_area.UnRegisterButton.ClickButton()
    } else {
      Log.Warning(`Can not unRegisterStudy due to it is disabled`)
    }
  } else {
    Log.Warning(`Can not unRegisterStudy due to window is not right`) 
  }
}

const saveStudy = (indelPlan, isSave = false) => {
  if (indelPlan.register_importer.VisibleOnScreen) {
    indelPlan.register_importer.pbSaveStudy.ClickButton()
    if (indelPlan.register_save_collision_detection_popup.Exists) {
      indelPlan.register_save_collision_detection_popup.qt_msgbox_buttonbox.buttonIgnore.ClickButton()
      utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
    }
    
    if (indelPlan.register_save_ct_voxels_popup.Exists) {
      indelPlan.register_save_ct_voxels_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    }
    
    if (isSave) {
      indelPlan.register_save_confirm_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      indelPlan.register_save_done_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    } else {
       indelPlan.register_save_confirm_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not saveStudy due to window is not right`) 
  }
}

const addOneStudyActivity = (indelPlan, patientID, type = "CT") => {
  gotoRegisterImporter(indelPlan)
  loadStudy(indelPlan, patientID, type)
  setWWAndWL(indelPlan)
  extractStudy(indelPlan)
  //check if register successful
  if (registerStudy(indelPlan)) {
    saveStudy(indelPlan, true)
    exitImportWindow(indelPlan)
    return true
  }
  return false
}

const restoreStudy = (indelPlan) => {
  patient.loadPatient(indelPlan, Project.Variables.new_patientID)
  gotoRegisterImporter(indelPlan)
  //just restore all images from D:\Data_Origin
  importStudy(indelPlan, globalConstant.obj.studyDICOMOriginFolder, false)
  exitImportWindow(indelPlan)
  patient.fromPatientDetailToMain(indelPlan)
}

//type means find CT or MR
const isStudyExist = (indelPlan) => {
  const studyList = indelPlan.register_importer.treeWidget
  if (studyList.wItems.Count === 0) return false
  const isExist = findInList.isItemExistInMoreList(Project.Variables.study_image_id, globalConstant.obj.patientIDAndModalityColumn, studyList)
  return isExist ? true : false
}

const getSubCountFromOnePatientStudy = (indelPlan) => {
  const studyList = indelPlan.register_importer.treeWidget
  if (studyList.wItems.Count === 0) return globalConstant.obj.notFoundIndex  
  const rowIdx = findInList.isItemExistInMoreListReturnIndex(Project.Variables.study_image_id, globalConstant.obj.patientIDAndModalityColumn, studyList)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) return studyList.wItems.Item(rowIdx).Items.Count
  return globalConstant.obj.notFoundIndex
}

module.exports.gotoRegisterImporter = gotoRegisterImporter
module.exports.closeRegisterImporter = closeRegisterImporter
module.exports.exitImportWindow = exitImportWindow
module.exports.loadStudy = loadStudy
module.exports.setWWAndWL = setWWAndWL
module.exports.deleteStudy = deleteStudy
module.exports.deleteAllStudy = deleteAllStudy
module.exports.exportStudy = exportStudy
module.exports.importStudy = importStudy
module.exports.extractStudy = extractStudy
module.exports.registerStudy = registerStudy
module.exports.unRegisterStudy = unRegisterStudy
module.exports.saveStudy = saveStudy
module.exports.contourExistingStudy = contourExistingStudy
module.exports.addOneStudyActivity = addOneStudyActivity
module.exports.restoreStudy = restoreStudy
module.exports.isStudyExist = isStudyExist
module.exports.isStudyExist = isStudyExist
module.exports.getSubCountFromOnePatientStudy = getSubCountFromOnePatientStudy