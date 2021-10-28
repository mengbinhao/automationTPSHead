const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const planStateArea = IndelPlan.patientManagement.groupBox_5

  aqObject.CheckProperty(planStateArea.radioButton_AllPlan, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(planStateArea.radioButton_Unapproved, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(planStateArea.radioButton_Approved, "wChecked", cmpEqual, false)

  planStateArea.radioButton_Unapproved.ClickButton()
  aqObject.CheckProperty(planStateArea.radioButton_AllPlan, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(planStateArea.radioButton_Unapproved, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(planStateArea.radioButton_Approved, "wChecked", cmpEqual, false)

  planStateArea.radioButton_Approved.ClickButton()
  aqObject.CheckProperty(planStateArea.radioButton_AllPlan, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(planStateArea.radioButton_Unapproved, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(planStateArea.radioButton_Approved, "wChecked", cmpEqual, true)
 
  exitwithlogic.exitWithLogic(false, false, 1)
}