const globalConstant = require("global_constant")

//only support re-run one time
const reRun = () => {
  const pv = Project.Variables.ProjectVariable
  if (strictEqual(pv.isRerun, false)) {
    const len = pv.reRunItems.length
    if (len > 0) {
      for (let i = 0; i < len; i++) {
        const [name, item] = pv.reRunItems.shift()
        const returnVal = Runner.CallMethod(`${item}.testcase`)
        //remove from bug list
        if (returnVal) pv.bugItems = pv.bugItems.filter((val) = val !== item)
      }
    }
    pv.isRerun = true
  }
}

module.exports.reRun = reRun
