const launch = require("launch")
const common = require("common")
const login = require("login")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.main.Close()
  common.handlePopupDialog(IndelPlan.main_quit_popup, 3)
  aqObject.CheckProperty(Sys.Process(IndelPlan.procesName), "Exists", cmpEqual, false)   
}