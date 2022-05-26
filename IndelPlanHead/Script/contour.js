const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const findInList = require("find_in_list")
const coordinate = require("coordinate")
const target_related = require("target_related")
const patient = require("patient")
const common = require("common")


let targetPic = null

const __getType = contourLibType => {
  return ["TARGET", "OAR", "SKIN"]
}

const __getDisplayMode = displayMode => {
  return ["WIREFRAME", "SURFACE", "POLYLINES"]
}

const __getTypeIndex = contourLibType => {
  const types = {
    'TARGET' : 0,
    'OAR' : 1,
    'SKIN' : 2,
  }
  return types[contourLibType]
}

const __getDisplayModeIndex = displayMode => {
  const modes = {
    'WIREFRAME' : 0,
    'SURFACE' : 1,
    'POLYLINES' : 2,
  }
  return modes[displayMode]
}

const __checkContourTypeExists = (contourLibType) => {
  return __getType().includes(contourLibType)
}

const __checkDisplayModeExists = (displayMode) => {
  return __getDisplayMode().includes(displayMode)
}

const __fillColor = (indelPlan, color) => {
  const supportColors = ["bule", "red", "green"]
  if (!supportColors.includes(color)) return
  const row = 3, column = 1
  if (color === 'red') {
    row = 4
    column = 2
  } else if (color === 'green') {
    row = 1
    column = 7
  }
  const [desX, desY] = coordinate.getContourColorCorrdinate(row, column)
  if (desX && desY) {
    indelPlan.contour_new_contourItem.ContourColor.ClickButton()
    LLPlayer.MouseMove(desX, desY, globalConstant.obj.delayMouseHalfSecond)
    LLPlayer.MouseDown(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
    LLPlayer.MouseUp(MK_LBUTTON, desX, desY, globalConstant.obj.delayMouseHalfSecond)
    indelPlan.contour_select_color.DialogButtonBox.buttonOk.ClickButton()
  }
}

const __setContourAttribute = (indelPlan, contourLibName, contourLibType, displayMode, color) => {
  indelPlan.contour_new_contourItem.ContourName.SetText(contourLibName)
  indelPlan.contour_new_contourItem.ContourType.setCurrentIndex(__getTypeIndex(contourLibType))
  indelPlan.contour_new_contourItem.DisplayMode.setCurrentIndex(__getDisplayModeIndex(displayMode))
  color && __fillColor(indelPlan, color)
}

const __handleContourDirtyData = (pv, contourLibName) => {
  const dirtydContours = pv.dirtyData.get(globalConstant.obj.addContourLib)
  if (dirtydContours.includes(contourLibName)) {
    pv.dirtyData.set(globalConstant.obj.addContourLib, dirtydContours.filter(val => val !== contourLibName))
  } else {
    Log.Warning(`can not __handleContourDirtyData due to contourLibName=${contourLibName}`)
  }
}

const increaseMouseAperture = (indelPlan, val) => {
  const canvas = indelPlan.ContourGUI.canvas.C2DViewer
  canvas.Click()
  LLPlayer.KeyDown(VK_LCONTROL, globalConstant.obj.delayMouseHalfSecond)
  //positive means increase, negative means reduce
  canvas.MouseWheel(val)
  LLPlayer.KeyUp(VK_LCONTROL, globalConstant.obj.delayMouseHalfSecond)
}

const __comparedPicture = (indelPlan) => {
  if (strictEqual(targetPic, null)) {
    targetPic = Utils.Picture
    targetPic.LoadFromFile(`${Project.Path}\\Stores\\Regions\\YANGDAZHONG_MR78_target.png`)
  }
  const actualPic = indelPlan.ContourGUI.canvas.C2DViewer.Picture()
  //Compare
  const ret = targetPic.Difference(actualPic, false, globalConstant.obj.pixelTolerance, false,globalConstant.obj.colourTolerance)
  //Regions.YANGDAZHONG_MR78_target_png.Check(actualPic, false, false, globalConstant.obj.pixelTolerance, globalConstant.obj.colourTolerance)
  return strictEqual(ret, null)
}
 
const generateRandomCTVName = indelPlan => {
  const ctvNmber = utilsFunctions.getRandomInt(10000, 1000)
  return `CTV${ctvNmber}`
}

const __doContour = (indelPlan) => {
  let i = 0
  do {
    target_related.drawRectangleNearMiddle(indelPlan)
    target_related.drawRectangleNearMiddle(indelPlan)
    target_related.drawRectangleNearMiddle(indelPlan)
    i++
  } while (i < 3 && !__comparedPicture(indelPlan))
  return __comparedPicture(indelPlan)
}

// true means ContourLib, false means PlanLib
const addContourLib = (indelPlan, pv, contourLibName, contourLibType, displayMode = "SURFACE", libType = true, isAdd = false) => {
  const __fulfillAdd = (dirtyData, popupDialog, contourLibName, libType, isAdd) => {
    if (isAdd) {
      indelPlan.contour_new_contourItem.OperationDone.ClickButton()
      if (!popupDialog.Exists && libType) dirtyData.get(globalConstant.obj.addContourLib).push(contourLibName)
    } else {
      indelPlan.contour_new_contourItem.OperationCancel.ClickButton()
    }
  }

  if(!__checkContourTypeExists(contourLibType)) {
    Log.Error(`Please input valid contourLibType, contourLibType=${contourLibType}`)
    return
  }
  
  if(!__checkDisplayModeExists(displayMode)) {
    Log.Error(`Please input valid displayMode displayMode=${displayMode}`)
    return
  }
  
  if (strictEqual(libType, true)) {
    indelPlan.ContourGUI.groupBox_4.AddToLib.ClickButton()
    __setContourAttribute(indelPlan, contourLibName, contourLibType, displayMode)
    __fulfillAdd(pv.dirtyData, indelPlan.contour_lib_exist_popup, contourLibName, libType, isAdd)
  } else {
    indelPlan.ContourGUI.groupBox_6.AddPlanContour.ClickButton()
    __setContourAttribute(indelPlan, contourLibName, contourLibType, displayMode)
    __fulfillAdd(pv.dirtyData, indelPlan.contour_planlib_exist_popup, contourLibName, libType, isAdd)
  }
}

const editContourLib = (indelPlan, pv, contourLibName, editContourLibName, editContourLibType, editDisplayMode, libType = true, isEdit = false) => {
  const __fulfillEdit = (dirtyData, popupDialog, contourLibName, editContourLibName, libType, isEdit) => {        
    if (isEdit) {
       indelPlan.contour_new_contourItem.OperationDone.ClickButton()
       if (!popupDialog.Exists && libType) {
         const contours = pv.dirtyData.get(globalConstant.obj.addContourLib)
         for (let i = 0; i < contours.length; i++) {
           if (contours[i] === contourLibName) {
             contours[i] = editContourLibName
             break
           }
         }
       }
    } else {
      indelPlan.contour_new_contourItem.OperationCancel.ClickButton()
    }
  }
  
  if(!__checkContourTypeExists(editContourLibType)) {
    Log.Error(`Please input valid contourLibType, contourLibType=${editContourLibType}`)
    return
  }
  
  if(!__checkDisplayModeExists(editDisplayMode)) {
    Log.Error(`Please input valid displayMode displayMode=${editDisplayMode}`)
    return
  }
  
  let contourLibList = null
  if (strictEqual(libType, true)) {
    contourLibList = indelPlan.ContourGUI.groupBox_4.ContourLib 
  } else {
    contourLibList = indelPlan.ContourGUI.groupBox_6.PlanLib
  }
  const isExist =  findInList.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    if (strictEqual(libType, true)) {
      indelPlan.ContourGUI.groupBox_4.EditContourLib.ClickButton()
      __setContourAttribute(indelPlan, editContourLibName, editContourLibType, editDisplayMode)
      __fulfillEdit(pv.dirtyData, indelPlan.contour_lib_exist_popup, contourLibName, editContourLibName, libType, isEdit)
    } else {
      indelPlan.ContourGUI.groupBox_6.EditPlanLib.ClickButton()
      __setContourAttribute(indelPlan, editContourLibName, editContourLibType, editDisplayMode)
      __fulfillEdit(pv.dirtyData, indelPlan.contour_planlib_exist_popup, contourLibName, editContourLibName, libType, isEdit)
    }
  } else {
    Log.Warning(`can not find target contourLib to update, contourLibName=${contourLibName}`)
  }
}

const deleteContourLib = (indelPlan, pv, contourLibName,libType = true, isDelete = false) => {
  let contourLibList = null
  if (libType) {
    contourLibList = indelPlan.ContourGUI.groupBox_4.ContourLib
  } else {
    contourLibList = indelPlan.ContourGUI.groupBox_6.PlanLib
  }
  const isExist =  findInList.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    if (libType) {
      indelPlan.ContourGUI.groupBox_4.DeleteFromContourLib.ClickButton()
    } else {
      indelPlan.ContourGUI.groupBox_6.DeleteFromPlanLib.ClickButton()
    }
    if (!libType) {
      if (isDelete) {
        indelPlan.contour_delete_planlib_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()        
      } else {
        indelPlan.contour_delete_planlib_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
      }
    } else {
      __handleContourDirtyData(pv, contourLibName)
    }
  } else {
    Log.Warning(`can not find contourLib to delete, contourLibName=${contourLibName}`)
  }
}

const loadContourLib = (indelPlan, contourLibName) => {
  const contourLibList = indelPlan.ContourGUI.groupBox_4.ContourLib
  const isExist =  findInList.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    indelPlan.ContourGUI.groupBox_4.LoadToPlanLib.ClickButton()
  } else {
    Log.Warning(`can not loadContourLib due to contourLibName=${contourLibName}`)
  }
}

const uploadPlanLib = (indelPlan, pv, contourLibName) => {
  const contourLibList = indelPlan.ContourGUI.groupBox_6.PlanLib
  const isExist =  findInList.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    indelPlan.ContourGUI.groupBox_6.UploadToContourLib.ClickButton()
    if (!indelPlan.contour_lib_exist_popup.Exists) {
      pv.dirtyData.get(globalConstant.obj.addContourLib).push(contourLibName)
    }
  } else {
    Log.Warning(`can not uploadPlanLib due to contourLibName=${contourLibName}`)
  }
}

const statPlanLib = (indelPlan, contourLibName) => {
  const contourLibList = indelPlan.ContourGUI.groupBox_6.PlanLib
  const isExist =  findInList.isItemExistInMoreList(contourLibName, globalConstant.obj.nameColumn, contourLibList)
  
  if (isExist) {
    contourLibList.ClickItem(contourLibName)
    indelPlan.ContourGUI.groupBox_6.ShowStatInfo.ClickButton()
  } else {
    Log.Warning(`can not statPlanLib due to contourLibName=${contourLibName}`)
  }
}

const logicOperate = (indelPlan, Operator) => {
  const logicWindow = indelPlan.contour_logic_dialog
  const list = logicWindow.LogicOperationgContourLib
  list.wItems.Item(0).DblClick()
  Operator.ClickButton()
  list.wItems.Item(1).DblClick()
  logicWindow.LogicOperator.GenerateNew.ClickButton()
}

// type: true means isotropically, false means unisotropically
// 1 means preview, 2 accept 3 create as 4 reject
const contourScale = (indelPlan, isAllLayer = true, type = true, method = 1, ...args) => {
  const gb = indelPlan.ContourGUI.groupBox_2
  gb.ExpandAllLayers.setChecked(isAllLayer)
  //UniformlyScale、AnisoScale
  if (!type) gb.AnisoScale.setChecked(true)
  if (type) {
    gb.AllLayersScaleFactor.qt_spinbox_lineedit.SetText(args[0])
  } else {
    gb.ScaleUp.qt_spinbox_lineedit.SetText(args[0])
    gb.ScaleDown.qt_spinbox_lineedit.SetText(args[1])
    gb.ScaleLeft.qt_spinbox_lineedit.SetText(args[2])
    gb.ScaleRight.qt_spinbox_lineedit.SetText(args[3])
  }
  
  gb.Preview.ClickButton()
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
  
  switch (method) {
    case 2:
      gb.AcceptScale.ClickButton()
      break;
    case 3:
      gb.Create_As.ClickButton()
      break;
    case 4:
      gb.RejectScale.ClickButton()
      break;
    default:
      Log.Warning(`method value is not correct, method = ${method}`)
  }
}

//maybe multi SKIN ContourLib, choose the one of first found
const loadContourLibByType = (indelPlan, contourLibType) => {
  const contourLibList = indelPlan.ContourGUI.groupBox_4.ContourLib
  const rowIdx =  findInList.isItemExistInMoreListReturnIndex(contourLibType, globalConstant.obj.contourType, contourLibList)
  
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    contourLibList.ClickItem(rowIdx)
    indelPlan.ContourGUI.groupBox_4.LoadToPlanLib.ClickButton()
  } else {
    Log.Warning(`can not loadContourLibByType due to contourLibType=${contourLibType}`)
  }
}

//goto contour page
const gotoContourWindow = indelPlan => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    indelPlan.PatientData.groupBox_6.pushButton_Contour.ClickButton()
    if (indelPlan.contour_no_study_exist_popup.Exists) {
      Log.Warning(`gotoRegisteredContour fail due to no Study exist`)
    }
  } else {
    Log.Warning(`Can not gotoContourWindow due to window is not right`) 
  }
}

const loadAndContourSKINActivity = indelPlan => {
  loadContourLibByType(indelPlan, "SKIN")
  indelPlan.tabWidget.qt_tabwidget_stackedwidget.tab_2.toolButton_17.ClickButton()
  const position = coordinate.getNearMiddleCoordinate()
  LLPlayer.MouseDown(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
  while (indelPlan.ContourGUI.ProgressBar.VisibleOnScreen) {
    utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
  }
}

//only contour one layer
const loadAndContourTargetAreaByLineActivity = (indelPlan, contourLibName) => {
  loadContourLib(indelPlan, contourLibName)
  indelPlan.ContourGUI.groupBox_5.pbManualSketch.ClickButton()
  target_related.drawTriangleNearMiddle(indelPlan)
  indelPlan.ContourGUI.canvas.C2DViewer.ClickR()
}

//only contour one layer
const loadAndContourTargetAreaByBrushActivity = (indelPlan, contourLibName) => {
  loadContourLib(indelPlan, contourLibName)
  indelPlan.ContourGUI.groupBox_5.BrushTool.ClickButton()
  increaseMouseAperture(indelPlan, globalConstant.obj.mousePositiveScroll)
  let j = 0, ret = false
  while (!ret) {
    if (++j > 3) break
    if (j > 1) {
      indelPlan.ContourGUI.groupBox_5.ClearContourLayers.ClickButton()
      indelPlan.contour_delete_planlib_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    }
    ret = __doContour(indelPlan)
  }
  return j > 3 ? false : true 
}

const doInterpolate = (indelPlan) => {
  indelPlan.ContourGUI.canvas.C2DViewer.MouseWheel(globalConstant.obj.delayMouseDelta)
  LLPlayer.MouseDown(MK_LBUTTON, 950, 480, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_LBUTTON, 950, 480, globalConstant.obj.delayMouseOneSecond)
  indelPlan.ContourGUI.canvas.C2DViewer.ClickR()
  indelPlan.ContourGUI.groupBox_5.Interpolate.ClickButton()
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
}

const deleteContourForDirtyData = (indelPlan, deleteContours) => {
  indelPlan.patientManagement.treeWidget_PatientList.wItems.Item(0).Click()
  indelPlan.patientManagement.pushButton_LoadPatient.ClickButton()
  indelPlan.PatientData.groupBox_6.pushButton_Contour.ClickButton()
  
  const contourLibList = indelPlan.ContourGUI.groupBox_4.ContourLib
  let dc = deleteContours.pop()
  while (dc) {
    contourLibList.ClickItem(dc)
    indelPlan.ContourGUI.groupBox_4.DeleteFromContourLib.ClickButton()
    dc = deleteContours.pop()
  }
  common.changePatientDetailTab(indelPlan, globalConstant.obj.patientManagement)
  patient.fromPatientDetailToMain(indelPlan)
}

module.exports.addContourLib = addContourLib
module.exports.editContourLib = editContourLib
module.exports.deleteContourLib = deleteContourLib
module.exports.loadContourLib = loadContourLib
module.exports.uploadPlanLib = uploadPlanLib
module.exports.statPlanLib = statPlanLib
module.exports.logicOperate = logicOperate
module.exports.contourScale = contourScale
module.exports.loadContourLibByType = loadContourLibByType
module.exports.generateRandomCTVName = generateRandomCTVName
module.exports.gotoContourWindow = gotoContourWindow
module.exports.increaseMouseAperture = increaseMouseAperture
module.exports.loadAndContourSKINActivity = loadAndContourSKINActivity
module.exports.loadAndContourTargetAreaByLineActivity = loadAndContourTargetAreaByLineActivity
module.exports.loadAndContourTargetAreaByBrushActivity = loadAndContourTargetAreaByBrushActivity
module.exports.doInterpolate = doInterpolate
module.exports.deleteContourForDirtyData = deleteContourForDirtyData