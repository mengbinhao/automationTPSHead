const launch = require("launch")

function testcase() {  
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  IndelPlan.loginClass.Close()
  aqObject.CheckProperty(IndelPlan.loginClass, "Exists", cmpEqual, false)   
}