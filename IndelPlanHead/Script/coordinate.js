const w = Sys.Desktop.Width
const h = Sys.Desktop.Height

const getNearMiddleCoordinate = () => {
  const offset = 25
  const obj = {}
  obj.width = w / 2 - offset
  obj.height = h / 2 - offset * 2
  return obj
}

const getPlanCanvasNearMiddleCoordinate = () => {
  return [500, 350]
}

const getTriangleCoordinate = () => {
  const triangle = [[500, 300], [400, 550], [630, 550]]
  return triangle
}

const getRectangleCoordinate = () => {
  const rectangle = [[450, 300], [450, 400], [600, 400], [600, 300]]
  return rectangle
}

//from 0 to infinity
const getPatientExportNodeCorrdinate = (idx) => {
  const coordX = 522, coordY = 320, step = 20
  return [coordX, coordY + step * idx]
}

const getPatientImportNodeCorrdinate = (idx) => {
  const coordX = 580, coordY = 260, step = 20
  return [coordX, coordY + step * idx]
}

const getStudyExportNodeCorrdinate = (idx) => {
  const coordX = 620, coordY = 304, step = 20
  return [coordX, coordY + step * idx]
}

//blue: 3, 1
//red: 4, 2
//green: 1, 7
const getContourColorCorrdinate = (row = 1, column = 1) => {
  const firstBlackColor = [716, 376], step = 28
  if (row > 6 || column > 8) reutrn
  return [firstBlackColor[0] + step * (column - 1), firstBlackColor[1] + (step - 3) * (row - 1)]
}


module.exports.getPlanCanvasNearMiddleCoordinate = getPlanCanvasNearMiddleCoordinate
module.exports.getNearMiddleCoordinate = getNearMiddleCoordinate
module.exports.getTriangleCoordinate = getTriangleCoordinate
module.exports.getRectangleCoordinate = getRectangleCoordinate
module.exports.getPatientExportNodeCorrdinate = getPatientExportNodeCorrdinate
module.exports.getPatientImportNodeCorrdinate = getPatientImportNodeCorrdinate
module.exports.getStudyExportNodeCorrdinate = getStudyExportNodeCorrdinate
module.exports.getContourColorCorrdinate = getContourColorCorrdinate