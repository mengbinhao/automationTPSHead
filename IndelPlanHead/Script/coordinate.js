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
  const triangle = [[w / 2 - 10, h / 2 - 160], [w / 2 - 100, h / 2 + 60], [w / 2 + 100, h / 2 + 65]]
  return triangle
}

const getRectangleCoordinate = () => {
  const rectangle = [[450, 300], [400, 400], [600, 400], [600, 300]]
  return rectangle
}

module.exports.getPlanCanvasNearMiddleCoordinate = getPlanCanvasNearMiddleCoordinate
module.exports.getNearMiddleCoordinate = getNearMiddleCoordinate
module.exports.getTriangleCoordinate = getTriangleCoordinate
module.exports.getRectangleCoordinate = getRectangleCoordinate