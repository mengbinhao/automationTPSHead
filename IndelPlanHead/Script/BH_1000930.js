const launch = require("launch")
const login = require("login")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.loginThenExit(Project.Variables.username, Project.Variables.password)
  aqObject.CheckProperty(IndelPlan.loginClass, "Exists", cmpEqual, false)   
}