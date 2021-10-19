const launchwithlogic = require("launch_with_logic")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_010() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  
  const gb5 = IndelPlan.patientManagement.groupBox_5
  aqObject.CheckProperty(gb5.radioButton_AllPlan, "checked", cmpEqual, true)
  aqObject.CheckProperty(gb5.radioButton_Unapproved, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb5.radioButton_Approved, "checked", cmpEqual, false)
  
  gb5.radioButton_Unapproved.setChecked(true)
  
  aqObject.CheckProperty(gb5.radioButton_AllPlan, "checked", cmpEqual, false)
  aqObject.CheckProperty(gb5.radioButton_Unapproved, "checked", cmpEqual, true)
  aqObject.CheckProperty(gb5.radioButton_Approved, "checked", cmpEqual, false)

  exitwithlogic.exitWithLogic(false, true)
}