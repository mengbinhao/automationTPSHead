const globalConstant = require("global_constant")
const projectVariable = {}

const __initMap = (map) => {
  map.set(globalConstant.obj.addContourLib, [])
  map.set(globalConstant.obj.addPatient, [])
  map.set(globalConstant.obj.addUser, [])
  map.set(globalConstant.obj.addMachine, []) 
  map.set(globalConstant.obj.restoreStudy, false) 
  return map
}

const __calculateTestCaseCount = () =>{
  let count = 0

  const __doCalculateRunningTestItems  = testItem => {
    if (testItem.ElementToBeRun && testItem.Enabled) {
      count++
    } else {
      if (testItem.Enabled) {   
        for (let i = 0; i < testItem.ItemCount; i++) {
          __doCalculateRunningTestItems(testItem.TestItem(i))
        }
      }
    }
  }

  for (let i = 0; i < Project.TestItems.ItemCount; i++) {
    __doCalculateRunningTestItems(Project.TestItems.TestItem(i))
  }
  
  return count
}

const init = () => {
  //clear test data
  projectVariable.dirtyData = __initMap(new Map())
  
  //check if is last running testItem
  projectVariable.maxRunningItem = __calculateTestCaseCount()
  projectVariable.currentRunningItem = 0
  projectVariable.reRunItems = [];
  projectVariable.bugItems = [];
  projectVariable.isRerun = Project.Variables.isRerun
  projectVariable.procesName = Project.Variables.project_process_name
  
  return projectVariable
}

const getPV = () => projectVariable


module.exports.init = init
module.exports.getPV = getPV