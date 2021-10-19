const launchwithlogic = require("launch_with_logic")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_013() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  
  const gb2 = IndelPlan.patientManagement.groupBox_2
  aqObject.CheckProperty(gb2.radioButton_AllDate, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Today, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Yesterday, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Week, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Month, "checked", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Between, "checked", cmpEqual, false)
  
  gb2.radioButton_AllDate.setChecked(true)
  
  aqObject.CheckProperty(gb2.radioButton_AllDate, "checked", cmpEqual, true)
  aqObject.CheckProperty(gb2.radioButton_Today, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Yesterday, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Week, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Month, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb2.radioButton_Between, "checked", cmpEqual, false)

  exitwithlogic.exitWithLogic(false, true)
}