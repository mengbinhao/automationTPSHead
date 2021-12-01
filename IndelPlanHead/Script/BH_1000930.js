const launch = require("launch")
const login = require("login")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.loginThenExit(indelPlan, Project.Variables.username, Project.Variables.password)
  aqObject.CheckProperty(indelPlan.login, "Exists", cmpEqual, false)   
}