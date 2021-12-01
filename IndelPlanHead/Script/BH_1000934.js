const launch = require("launch")

function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  indelPlan.login.Close()
  aqObject.CheckProperty(indelPlan.login, "Exists", cmpEqual, false)   
}