const globalConstant = require("global_constant")

//for user/machine list
const getColumnHearders = list => {
  const ret = []
  for (let i = 0; i < list.wColumnCount; i++) {
    ret.push(list.wColumn(i))
  }
  return ret
}

//for user/machine list
const isItemExitInList = (fieldValue, columnName, list) => {
  let rows = list.wRowCount - 1
  while (rows >= 0) {
    if (strictEqual(list.wValue(rows, columnName), fieldValue))return true
    rows--
  }
  return false
}

//for user/machine list
const isItemInListReturnIndex = (fieldValue, columnName, list) => {
  let rows = list.wRowCount - 1
  while (rows >= 0) {
    if (strictEqual(list.wValue(rows, columnName), fieldValue)) return rows
    rows--
  }
  return globalConstant.obj.notFoundIndex
}

//for user/machine list
const getFieldValueFromRow = (row, wantField, list) => list.wValue(row, wantField) || globalConstant.obj.emptyString

const getHeaderFromList = list => {
  let ret = globalConstant.obj.emptyString
  for (let i = 0, len = list.wColumnCount; i < len; i++) {
    ret += list.wColumn(i) + ','
  }
  return ret.length > 0 ? aqString.SubString(ret, 0, ret.length - 1): ret
}

//for patient/images/contour/settingcheck/machine_change_view list
const isItemExistInMoreList = (val, columnName, list) => {
  for (let i = 0, rows = list.wItems.count - 1; i <= rows; i++) {
    if (strictEqual(list.wItems.item(i).Text(columnName), val)) return true
  }
  return false
}

//for patient/images/contour/settingcheck/machine_change_view list
const isItemExistInMoreListReturnIndex = (val, columnName, list) => {
  let rows = list.wItems.count - 1
  for (let i = 0; i <= rows; i++) {
    if (strictEqual(list.wItems.item(i).Text(columnName), val)) return i
  }
  return globalConstant.obj.notFoundIndex
}

const getOneRowValueForMoreListFromRowIndex = (idx, list) => {
  let ret = []
  for (let i = 0; i <= 8; i++) {
    ret.push(list.wItems.Item(idx).Text(i))
  }
  return ret
}

//for patient/images/contour/settingcheck/machine_change_view list
const getFieldValueForMoreListFromRowAndCol = (row, col, list) => list.wItems.Item(row).Text(col) || globalConstant.obj.emptyString

//for patient/images/contour/settingcheck/machine_change_view list
const getFieldValueForMoreListFromOtherField = (propertyValue, fromColumn, wantColumn, list) => {
  for (let i = 0, rows = list.wItems.count - 1; i <= rows; i++) {
    if (strictEqual(list.wItems.item(i).Text(fromColumn), propertyValue)) return list.wItems.item(i).Text(wantColumn)
  }
  return globalConstant.obj.emptyString
}

//for patient/images/contour/settingcheck list
const getPatientReturnObject = (id, patientList) => {
  const ret = {}
  for (let i = 0, rows = patientList.wItems.count - 1; i <= rows; i++) {
    const findId = patientList.wItems.item(i).Text('ID')
    if (strictEqual(findId, id)) {
      ret.id = patientList.wItems.item(i).Text('ID')
      ret.name = patientList.wItems.item(i).Text('Name')
      ret.gender = patientList.wItems.item(i).Text('Gender')
      ret.age = patientList.wItems.item(i).Text('Age')
      ret.height = patientList.wItems.item(i).Text('Height')
      ret.weight = patientList.wItems.item(i).Text('Weight')
      ret.phone = patientList.wItems.item(i).Text('Phone')
      ret.address = patientList.wItems.item(i).Text('Address')
      ret.createTime = patientList.wItems.item(i).Text('Create Time')
      return ret
    }
  }
  return ret
}

module.exports.getColumnHearders = getColumnHearders
module.exports.isItemExitInList = isItemExitInList
module.exports.isItemInListReturnIndex = isItemInListReturnIndex
module.exports.getFieldValueFromRow = getFieldValueFromRow
module.exports.getHeaderFromList = getHeaderFromList
module.exports.isItemExistInMoreList = isItemExistInMoreList
module.exports.isItemExistInMoreListReturnIndex = isItemExistInMoreListReturnIndex
module.exports.getOneRowValueForMoreListFromRowIndex = getOneRowValueForMoreListFromRowIndex
module.exports.getFieldValueForMoreListFromRowAndCol = getFieldValueForMoreListFromRowAndCol
module.exports.getFieldValueForMoreListFromOtherField = getFieldValueForMoreListFromOtherField
module.exports.getPatientReturnObject = getPatientReturnObject