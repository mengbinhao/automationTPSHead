const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")


function testcase() {  
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  const group = indelPlan.patientManagement.frame.groupBox_3
  aqObject.CheckProperty(group.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.username}`)   

  const frame = indelPlan.patientManagement.frame
  aqObject.CheckProperty(frame.pushButton_SystemSetting, "Enabled", cmpEqual, true)   
  aqObject.CheckProperty(frame.pushButton_PhyData, "Enabled", cmpEqual, true)
  aqObject.CheckProperty(frame.pushButton_UserManage, "Enabled", cmpEqual, true)   
  aqObject.CheckProperty(frame.pushButton_SystemLog, "Enabled", cmpEqual, true)   
  aqObject.CheckProperty(frame.pushButton_Logout, "Enabled", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.tabWidget.qt_tabwidget_tabbar, "Enabled", cmpEqual, true)      

  exitwithlogic.exitWithLogic(false, false, 1)
}