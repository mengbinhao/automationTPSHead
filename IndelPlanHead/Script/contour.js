const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")
const coordinate = require("coordinate")
const target_related = require("target_related")
const patient = require("patient")
const common = require("common")

const __getTypeIndex = contourLibType => {
  const types = {
    'TARGET' : 0,
    'OAR' : 1,
    'SKIN' : 2,
  }
  return types[contourLibType]
}

const __checkContourTypeExists = (contourLibType, contourType) => {
  for (let i = 0; i < contourType.wItemCount; i++) {
    if (contourLibType === contourType.wItem(i)) return true
  }
  return false
}

const __setContourAttribute = (obj, contourLibType, contourLibName) => {
  obj.ContourType.setCurrentIndex(__getTypeIndex(contourLibType))
  obj.ContourName.SetText(contourLibName)
}

const __handleDirtyDate = (indel, contourLibName) => {
  const dirtydContours = indel.dirtyData.get(globalConstant.obj.addContourLib)
  if (dirtydContours.includes(contourLibName)) {
    indel.dirtyData.set(globalConstant.obj.addContourLib, dirtydContours.filter(val => val !== contourLibName))
  } else {
    Log.Warning(`can not __handleDirtyDate due to contourLibName=${contourLibName}`)
  }
}
 
const generateRandomCTVName = indel => {
  const ctvNmber = utilsfunctions.getRandomInt(10000, 1000)
  return `CTV${ctvNmber}`
}

// true means ContourLib, false means PlanLib
const addContourLib = (indel, contourLibName, contourLibType, libType = true, isAdd = false) => {
  const __fulfillAdd = (isAdd, popupDialog, dirtyData, contourLibName, type) => {
    if (isAdd) {
      indel.contour_DlgContourItemClass.OperationDone.ClickButton()
      if (!popupDialog.Exists && type) {
        dirtyData.get(globalConstant.obj.addContourLib).push(contourLibName)
      }
    } else {
      indel.contour_DlgContourItemClass.OperationCancel.ClickButton()
    }
  }

  if(!__checkContourTypeExists(contourLibType, indel.contour_DlgContourItemClass.ContourType)) {
    Log.Error(`Please input valid contourLibType, contourLibType=${contourLibType}`)
    Runner.Stop(true)
  }
  
  if (strictEqual(libType, true)) {
    indel.ContourGUIClass.groupBox_4.AddToLib.ClickButton()
    __setContourAttribute(indel.contour_DlgContourItemClass, contourLibType, contourLibName)
    __fulfillAdd(isAdd, indel.contour_lib_exist_popup, indel.dirtyData, contourLibName, true)
  } else {
    indel.ContourGUIClass.groupBox_6.AddPlanContour.ClickButton()
    __setContourAttribute(indel.contour_DlgContourItemClass, contourLibType, contourLibName)
    __fulfillAdd(isAdd, indel.contour_planlib_exist_popup, indel.dirtyData, contourLibName, false)
  }
}

const editContourLib = (indel, contourLibName, editContourLibName, editContourLibType, libType = true, isEdit = false) => {
  if(!__checkContourTypeExists(editContourLibType, indel.contour_DlgContourItemClass.ContourType)) {
    Log.Error(`Please input valid contourLibType, contourLibType,=${editContourLibType}`)
    Runner.Stop(true)
  }
  
  let contourLibList = null
  if (libType) {
    contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib 
  } else {
    contourLibList = indel.ContourGUIClass.groupBox_6.PlanLib
  }
  const isExist =  findinlist.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    if (libType) {
      indel.ContourGUIClass.groupBox_4.EditContourLib.ClickButton()
    } else {
      indel.ContourGUIClass.groupBox_6.EditPlanLib.ClickButton()
    }
    __setContourAttribute(indel.contour_DlgContourItemClass, editContourLibType, editContourLibName)
    isEdit ? indel.contour_DlgContourItemClass.OperationDone.ClickButton() : indel.contour_DlgContourItemClass.OperationCancel.ClickButton()
  } else {
    Log.Warning(`can not find target contourLib to update, contourLibName=${contourLibName}`)
  }
}

const deleteContourLib = (indel, contourLibName,libType = true, isDelete = false) => {
  let contourLibList = null
  if (libType) {
    contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib
  } else {
    contourLibList = indel.ContourGUIClass.groupBox_6.PlanLib
  }
  const isExist =  findinlist.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    if (libType) {
      indel.ContourGUIClass.groupBox_4.DeleteFromContourLib.ClickButton()
    } else {
      indel.ContourGUIClass.groupBox_6.DeleteFromPlanLib.ClickButton()
    }
    if (!libType) {
      if (isDelete) {
        indel.contour_delete_planlib_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()        
      } else {
        indel.contour_delete_planlib_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    } else {
      __handleDirtyDate(indel, contourLibName)
    }
  } else {
    Log.Warning(`can not find contourLib to delete, contourLibName=${contourLibName}`)
  }
}

const loadContourLib = (indel, contourLibName) => {
  const contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib
  const isExist =  findinlist.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    indel.ContourGUIClass.groupBox_4.LoadToPlanLib.ClickButton()
  } else {
    Log.Warning(`can not loadContourLib due to contourLibName=${contourLibName}`)
  }
}

//maybe multi SKIN ContourLib, choose first find one
const loadContourLibByType = (indel, contourLibType) => {
  const contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib
  const rowIdx =  findinlist.isItemExistInMoreListReturnIndex(contourLibType, globalConstant.obj.contourType, contourLibList)
  
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    contourLibList.ClickItem(rowIdx)
    indel.ContourGUIClass.groupBox_4.LoadToPlanLib.ClickButton()
  } else {
    Log.Warning(`can not loadContourLibByType due to contourLibType=${contourLibType}`)
  }
}

//goto contour page
const gotoContourWindow = indel => {
  if (indel.patientDataClass.VisibleOnScreen) {
    indel.patientDataClass.groupBox_6.pushButton_Contour.ClickButton()
    if (indel.contour_no_study_exist_popup.Exists) {
      Log.Warning(`gotoRegisteredContour fail due to no Study exist`)
    }
  } else {
    Log.Warning(`Can not gotoContourWindow due to window is not right`) 
  }
}

const loadAndContourSKINActivity = indel => {
  loadContourLibByType(indel, "SKIN")
  indel.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_17.ClickButton()
  const position = coordinate.getNearMiddleCoordinate()
  LLPlayer.MouseDown(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
  utilsfunctions.delay(globalConstant.obj.delayThirtySeconds)
}

const loadAndContourTargetAreaByLineActivity = (indel, contourLibName) => {
  loadContourLib(indel, contourLibName)
  indel.ContourGUIClass.groupBox_5.pbManualSketch.ClickButton()
  target_related.drawTriangleNearMiddle(indel)
  indel.ContourGUIClass.canvas.C2DViewer.ClickR()
  indel.ContourGUIClass.canvas.C2DViewer.MouseWheel(globalConstant.obj.delayMousePositiveDelta)
  const position = coordinate.getNearMiddleCoordinate()
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseOneSecond * 3)
  LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseOneSecond)
  indel.ContourGUIClass.canvas.C2DViewer.ClickR()

  indel.ContourGUIClass.groupBox_5.Interpolate.ClickButton()
  
  /* need to handle exception popup
  if (indel.contour_interpolate_error_popup.Exists) {
   indel.contour_interpolate_error_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
   Log.Error(`loadAndContourTargetAreaByLineActivity failure`)
  }
  */
}

const loadAndContourTargetAreaByBrushActivity = (indel, contourLibName) => {
  loadContourLib(indel, contourLibName)
  indel.ContourGUIClass.groupBox_5.BrushTool.ClickButton()
  let i = 0
  while (i < 10) {
    target_related.drawRectangleNearMiddle(indel)
    i++
  }
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  indel.ContourGUIClass.canvas.C2DViewer.MouseWheel(globalConstant.obj.delayMousePositiveDelta)
  const position = coordinate.getNearMiddleCoordinate()
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseOneSecond)
  indel.ContourGUIClass.canvas.C2DViewer.ClickR()
  indel.ContourGUIClass.groupBox_5.Interpolate.ClickButton()
  utilsfunctions.delay(globalConstant.obj.delayFiveSeconds)
  /* need to handle exception popup
    if (indel.contour_interpolate_error_popup.Exists) {
     indel.contour_interpolate_error_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
     Log.Error(`loadAndContourTargetAreaByLineActivity failure`)
    }
  */
}

const deleteContourForDirtyData = (indel, deleteContours) => {
  indel.patientManagement.treeWidget_PatientList.wItems.Item(0).Click()
  indel.patientManagement.pushButton_LoadPatient.ClickButton()
  indel.patientDataClass.groupBox_6.pushButton_Contour.ClickButton()
  
  const contourLibList = indel.ContourGUIClass.groupBox_4.ContourLib
  let dc = deleteContours.pop()
  while (dc) {
    contourLibList.ClickItem(dc)
    indel.ContourGUIClass.groupBox_4.DeleteFromContourLib.ClickButton()
    dc = deleteContours.pop()
  }
  common.changePatientDetailTab(indel, globalConstant.obj.patientManagement)
  patient.fromPatientDetailToMain(indel)
}

module.exports.addContourLib = addContourLib
module.exports.editContourLib = editContourLib
module.exports.deleteContourLib = deleteContourLib
module.exports.loadContourLib = loadContourLib
module.exports.loadContourLibByType = loadContourLibByType
module.exports.generateRandomCTVName = generateRandomCTVName
module.exports.gotoContourWindow = gotoContourWindow
module.exports.loadAndContourSKINActivity = loadAndContourSKINActivity
module.exports.loadAndContourTargetAreaByLineActivity = loadAndContourTargetAreaByLineActivity
module.exports.loadAndContourTargetAreaByBrushActivity = loadAndContourTargetAreaByBrushActivity
module.exports.deleteContourForDirtyData = deleteContourForDirtyData