const globalConstant = require("global_constant")

const isParamsEmpty = (...args) => {
  if (strictEqual(args.length, 0)) return false
}

const isParamsFalsy = (...args) => {
  return args.every((arg) => {
    return !strictEqual(arg, null) && !strictEqual(arg, undefined) && !strictEqual(arg, globalConstant.obj.emptyString)
  })
}

const isNumberInRange = (arg, min, max) => {
  if (Number.isNaN(arg) || Number.isNaN(min) || Number.isNaN(max)) return false
  if (arg < min || arg > max) return false
  return true
}

const isEmptyObject = (obj) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false
  return !Object.keys(obj).length
}

const findChild = (parent, propName, propValue) => {
  const child = parent.FindChild(propName, propValue)
  return child.Exists ? child : null
}

const findAllChild = (parent, propName, propValue) => {
  const ret = parent.FindChild(propName, propValue)
  return (typeof ret != null && typeof ret === 'object') ? ret : null
}

const findChildByPropWithRegex = (parent, propName, propValue, isPartial) => {
  const ret = parent.FindChild(propName, isPartial ? `regexp:${propValue}`: `regexp:^${propValue}$`)
  return (typeof ret === 'object') ? ret : null
}

const delay = (seconds) => aqUtils.Delay(seconds)

const strReplace = (str, stringToReplace, subString) => aqString.Replace(str, stringToReplace, subString)

const getRandom = () => Math.random()
 
const getRandomInRange = (min, max) => Math.random() * (max-min) + min
 
const getRandomInt = (min, max) => Math.round(Math.random() * (max-min) + min)

//like 2018/11/14 11:44:57
const getTimeAsStr = () => aqConvert.DateTimeToStr(aqDateTime.Now())

//43418.4895486111
const getTimeAsFloat = () => aqConvert.FloatToStr(aqDateTime.Now())

//support.smartbear.com/testcomplete/docs/reference/program-objects/aqdatetime/date-and-time-format-specifiers.html
//"%Y-%m-%d-%H-%M-%S"
const getTimeAsFormatStr = (formatStr) => aqConvert.DateTimeToFormatStr(aqDateTime.Now(), formatStr)

//1 AddDays
//2 AddHours
//3 AddMinutes
//4 AddMonths
//5 AddSeconds
const getTimeIntervalAsFormatStr = (formatStr, invervalUnit, inverva) => {
  const now = aqDateTime.Now()
  let ret
  if (1 === invervalUnit) {
    ret = aqDateTime.AddDays(now, inverva)
  } else if (2 === invervalUnit) {
    ret = aqDateTime.AddHours(now, inverva)
  } else if (3 === invervalUnit) {
    ret = aqDateTime.AddMinutes(now, inverva)
  } else if (4 === invervalUnit) {
    ret = aqDateTime.AddMonths(now, inverva)
  } else if (5 === invervalUnit) {
    ret = aqDateTime.AddSeconds(now, inverva)
  } else {
    Log.Error('wrong params in invervalUnit = ${invervalUnit}')
  }
  return aqConvert.DateTimeToFormatStr(ret, formatStr)
}


module.exports.isParamsEmpty = isParamsEmpty
module.exports.isParamsFalsy = isParamsFalsy
module.exports.isNumberInRange = isNumberInRange
module.exports.isEmptyObject = isEmptyObject
module.exports.findChildByPropWithRegex = findChildByPropWithRegex
module.exports.findChild = findChild
module.exports.delay = delay
module.exports.strReplace = strReplace
module.exports.getRandom = getRandom
module.exports.getRandomInRange = getRandomInRange
module.exports.getRandomInt = getRandomInt
module.exports.getTimeAsStr = getTimeAsStr
module.exports.getTimeAsFloat = getTimeAsFloat
module.exports.getTimeAsFormatStr = getTimeAsFormatStr
module.exports.getTimeIntervalAsFormatStr = getTimeIntervalAsFormatStr