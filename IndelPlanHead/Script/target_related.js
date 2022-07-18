const globalConstant = require("global_constant")
const utilsFunctions = require("utils_functions")
const coordinate = require("coordinate")


const __generateTriangleParameters = triangleCoordinate => {
  const obj = {}
  obj.p1= {x : triangleCoordinate[0][0], y : triangleCoordinate[0][1], delay : globalConstant.obj.delayMouseOneSecond}
  obj.p2= {x : triangleCoordinate[1][0], y : triangleCoordinate[1][1], delay : globalConstant.obj.delayMouseOneSecond}
  obj.p3= {x : triangleCoordinate[2][0], y : triangleCoordinate[2][1], delay : globalConstant.obj.delayMouseOneSecond}
  return obj
}

const __generateRectangleParameters = rectangleCoordinate => {
  const obj = {}
  obj.p1= {startX : rectangleCoordinate[0][0], startY : rectangleCoordinate[0][1], distanceX : globalConstant.obj.delayDistanceZero, distanceY :  globalConstant.obj.delayDistanceOneHundredAndTwenty, delay : globalConstant.obj.delayMouseZeroSecond}
  obj.p2= {startX : rectangleCoordinate[1][0], startY : rectangleCoordinate[1][1], distanceX : globalConstant.obj.delayDistanceTwoHundred, distanceY :  globalConstant.obj.delayDistanceZero, delay : globalConstant.obj.delayMouseZeroSecond}
  obj.p3= {startX : rectangleCoordinate[2][0], startY : rectangleCoordinate[2][1], distanceX : globalConstant.obj.delayDistanceZero, distanceY :  globalConstant.obj.delayDistanceNegativeOneHundred, delay : globalConstant.obj.delayMouseZeroSecond}
  obj.p4= {startX : rectangleCoordinate[3][0], startY : rectangleCoordinate[3][1], distanceX : globalConstant.obj.delayDistanceNegativeOneHundredAndEighty, distanceY :  globalConstant.obj.delayDistanceZero, delay : globalConstant.obj.delayMouseZeroSecond}
  return obj
}

const __addPoint = position => {
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  //LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
}

const addOnePointNearMiddle = indelPlan => {
  const position = coordinate.getNearMiddleCoordinate()
  const gamaAngle = indelPlan.CPlanInforPanel.groupBox_2.GamaAngle
  //do {
     __addPoint(position)
  //} while (!gamaAngle.Enabled)
  utilsFunctions.delay(globalConstant.obj.delayFiveSeconds)
}

const addOneOutBoundPoint = indelPlan => {
  __addPoint(coordinate.getOutBoundCoordinate())
}

const deletePointByPosition = position => {
  LLPlayer.MouseDown(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_RBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
}

const deletePointByButton = (indelPlan, idx) => {
  if (indelPlan.CPlanInforPanel.focusList.wItems.Item(0).Items.Count < idx) {
    Log.Warning(`Can not __deletePointByButton due to idx is not right, idx = ${idx}`)
    return
  }
  indelPlan.CPlanInforPanel.focusList.wItems.Item(0).Items.Item(idx - 1).Click()
  indelPlan.CPlanInforPanel.groupBox_2.pbDelete.ClickButton()
}

const movePointByPositionOutBound = (indelPlan, from, to, isKeep) => {
  LLPlayer.MouseDown(MK_LBUTTON, from.width, from.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseMove(to.width, to.height, globalConstant.obj.delayMouseHalfSecond)
  LLPlayer.MouseUp(MK_LBUTTON, to.width, to.height, globalConstant.obj.delayMouseHalfSecond)
  isKeep ? indelPlan.plan_out_target_popup.qt_msgbox_buttonbox.buttonYes.ClickButton(): indelPlan.plan_out_target_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
}

const drawTriangleNearMiddle = indelPlan => {
  const data = coordinate.getTriangleCoordinate()
  const canvas = indelPlan.ContourGUI.canvas.C2DViewer
  canvas.DblClick(data[0][0], data[0][1])
  canvas.DblClick(data[0][0], data[0][1])
  utilsFunctions.delay(globalConstant.obj.delayOneSecond)
  canvas.DblClick(data[1][0], data[1][1])
  utilsFunctions.delay(globalConstant.obj.delayOneSecond)
  canvas.DblClick(data[2][0], data[2][1])
  utilsFunctions.delay(globalConstant.obj.delayOneSecond)
  canvas.DblClick(data[0][0], data[0][1])
  canvas.DblClick(data[0][0], data[0][1])
  utilsFunctions.delay(globalConstant.obj.delayOneSecond)
  canvas.ClickR()
  /*
  LLPlayer.MouseDown(MK_LBUTTON, data.p1.x, data.p1.y, data.p1.delay)
  LLPlayer.MouseDown(MK_LBUTTON, data.p2.x, data.p2.y, data.p2.delay)
  LLPlayer.MouseDown(MK_LBUTTON, data.p3.x, data.p3.y, data.p3.delay)
  LLPlayer.MouseDown(MK_LBUTTON, data.p1.x, data.p1.y, data.p1.delay)
  LLPlayer.MouseUp(MK_LBUTTON, data.p1.x, data.p1.y, data.p1.delay)
  */
}

const drawRectangleNearMiddle = indelPlan => {
  if (indelPlan.ContourGUI.VisibleOnScreen) {
    const data = __generateRectangleParameters(coordinate.getRectangleCoordinate())
    const canvas = indelPlan.ContourGUI.canvas.C2DViewer
    canvas.Drag(data.p1.startX, data.p1.startY, data.p1.distanceX, data.p1.distanceY, data.p1.delay)
    canvas.Drag(data.p2.startX, data.p2.startY, data.p2.distanceX, data.p2.distanceY, data.p1.delay)
    canvas.Drag(data.p3.startX, data.p3.startY, data.p3.distanceX, data.p3.distanceY, data.p1.delay)
    canvas.Drag(data.p4.startX, data.p4.startY, data.p4.distanceX, data.p4.distanceY, data.p1.delay)
  } else {
    Log.Warning(`Can not drawRectangleNearMiddle due to window is not right`) 
  }
}


module.exports.addOnePointNearMiddle = addOnePointNearMiddle
module.exports.addOneOutBoundPoint = addOneOutBoundPoint
module.exports.deletePointByPosition = deletePointByPosition
module.exports.deletePointByButton = deletePointByButton
module.exports.movePointByPositionOutBound = movePointByPositionOutBound
module.exports.drawTriangleNearMiddle = drawTriangleNearMiddle
module.exports.drawRectangleNearMiddle = drawRectangleNearMiddle