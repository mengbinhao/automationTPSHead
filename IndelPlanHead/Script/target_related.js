const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const coordinate = require("coordinate")


const __generateTriangleParameters = triangleCoordinate => {
  const obj = {}
  obj.p1= {x : triangleCoordinate[0][0], y : triangleCoordinate[0][1], delay : globalConstant.obj.delayMouseZeroSecond}
  obj.p2= {x : triangleCoordinate[1][0], y : triangleCoordinate[1][1], delay : globalConstant.obj.delayMouseOneSecond}
  obj.p3= {x : triangleCoordinate[2][0], y : triangleCoordinate[2][1], delay : globalConstant.obj.delayMouseOneSecond}
  return obj
}

const __generateRectangleParameters = rectangleCoordinate => {
  const obj = {}
  obj.p1= {startX : rectangleCoordinate[0][0], startY : rectangleCoordinate[0][1], distanceX : globalConstant.obj.delayDistanceZero, distanceY :  globalConstant.obj.delayDistanceOneHundredAndTwenty, delay : globalConstant.obj.delayMouseZeroSecond}
  obj.p2= {startX : rectangleCoordinate[1][0], startY : rectangleCoordinate[1][1], distanceX : globalConstant.obj.delayDistanceTwoHundredAndThirty, distanceY :  globalConstant.obj.delayDistanceZero, delay : globalConstant.obj.delayMouseOneSecond}
  obj.p3= {startX : rectangleCoordinate[2][0], startY : rectangleCoordinate[2][1], distanceX : globalConstant.obj.delayDistanceZero, distanceY :  globalConstant.obj.delayDistanceNegativeOneHundred, delay : globalConstant.obj.delayMouseOneSecond}
  obj.p4= {startX : rectangleCoordinate[3][0], startY : rectangleCoordinate[3][1], distanceX : globalConstant.obj.delayDistanceNegativeOneHundredAndEighty, distanceY :  globalConstant.obj.delayDistanceZero, delay : globalConstant.obj.delayMouseOneSecond}
  return obj
}

const __addPoint = position => {
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  //LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
  LLPlayer.MouseDown(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseZeroSecond)
  LLPlayer.MouseUp(MK_LBUTTON, position.width, position.height, globalConstant.obj.delayMouseHalfSecond)
}

const addOneNearMiddlePoint = indel => {
  if (indel.PlanGUI.VisibleOnScreen) {
    const position = coordinate.getNearMiddleCoordinate()
    const gamaGngle = indel.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel.groupBox_2.GamaAngle
    do {
       __addPoint(position)
    } while (!gamaGngle.Enabled)
    utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
  } else {
    Log.Warning(`Can not addOneNearMiddlePointer due to window is not right`) 
  }
}

const drawTriangleNearMiddle = indel => {
  const data = __generateTriangleParameters(coordinate.getTriangleCoordinate())
  LLPlayer.MouseDown(MK_LBUTTON, data.p1.x, data.p1.y, data.p1.delay)
  LLPlayer.MouseDown(MK_LBUTTON, data.p2.x, data.p2.y, data.p2.delay)
  LLPlayer.MouseDown(MK_LBUTTON, data.p3.x, data.p3.y, data.p3.delay)
  LLPlayer.MouseDown(MK_LBUTTON, data.p1.x, data.p1.y, data.p1.delay)
  LLPlayer.MouseUp(MK_LBUTTON, data.p1.x, data.p1.y, data.p1.delay)
}

const drawRectangleNearMiddle = indel => {
  if (indel.ContourGUIClass.VisibleOnScreen) {
    const data = __generateRectangleParameters(coordinate.getRectangleCoordinate())
    indel.ContourGUIClass.canvas.C2DViewer.Drag(data.p1.startX, data.p1.startY, data.p1.distanceX, data.p1.distanceY, data.p1.delay)
    indel.ContourGUIClass.canvas.C2DViewer.Drag(data.p2.startX, data.p2.startY, data.p2.distanceX, data.p2.distanceY, data.p1.delay)
    indel.ContourGUIClass.canvas.C2DViewer.Drag(data.p3.startX, data.p3.startY, data.p3.distanceX, data.p3.distanceY, data.p1.delay)
    indel.ContourGUIClass.canvas.C2DViewer.Drag(data.p4.startX, data.p4.startY, data.p4.distanceX, data.p4.distanceY, data.p1.delay)
  } else {
    Log.Warning(`Can not drawRectangleNearMiddle due to window is not right`) 
  }
}

const addOnePlanNearMiddlePoint = indel => {
  if (indel.PlanGUI.VisibleOnScreen) {
    const position = coordinate.getPlanCanvasNearMiddleCoordinate()
    const gamaGngle = indel.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel.groupBox_2.GamaAngle
    do {
       indel.PlanGUI.canvas.PlanC2DViewer.DblClick(position[0], position[1])
    } while (!gamaGngle.Enabled)
    utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
  } else {
    Log.Warning(`Can not addOneNearMiddlePointer due to window is not right`) 
  }
}

//module.exports.addOneNearMiddlePoint = addOneNearMiddlePoint
module.exports.addOnePlanNearMiddlePoint = addOnePlanNearMiddlePoint
module.exports.drawTriangleNearMiddle = drawTriangleNearMiddle
module.exports.drawRectangleNearMiddle = drawRectangleNearMiddle