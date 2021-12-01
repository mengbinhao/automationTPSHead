const launch = require("launch")
const common = require("common")
const login = require("login")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.main.Close()
  common.handlePopupDialog(indelPlan.main_quit_popup, 3)
  aqObject.CheckProperty(Sys.Process(pv.procesName), "Exists", cmpEqual, false)   
}