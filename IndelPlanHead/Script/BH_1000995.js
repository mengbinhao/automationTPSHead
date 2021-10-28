const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)

  const dateArea = IndelPlan.patientManagement.groupBox_2

  aqObject.CheckProperty(dateArea.radioButton_AllDate, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Today, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Week, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Month, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Between, "wChecked", cmpEqual, false)

  dateArea.radioButton_Today.ClickButton()
  aqObject.CheckProperty(dateArea.radioButton_AllDate, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Today, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Week, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Month, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Between, "wChecked", cmpEqual, false)

  dateArea.radioButton_Yesterday.ClickButton()
  aqObject.CheckProperty(dateArea.radioButton_AllDate, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Today, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Week, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Month, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Between, "wChecked", cmpEqual, false)

  dateArea.radioButton_Week.ClickButton()
  aqObject.CheckProperty(dateArea.radioButton_AllDate, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Today, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Week, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Month, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Between, "wChecked", cmpEqual, false)

  dateArea.radioButton_Month.ClickButton()
  aqObject.CheckProperty(dateArea.radioButton_AllDate, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Today, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Week, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Month, "wChecked", cmpEqual, true)
  aqObject.CheckProperty(dateArea.radioButton_Between, "wChecked", cmpEqual, false)

  dateArea.radioButton_Between.ClickButton()
  aqObject.CheckProperty(dateArea.radioButton_AllDate, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Today, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Yesterday, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Week, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Month, "wChecked", cmpEqual, false)
  aqObject.CheckProperty(dateArea.radioButton_Between, "wChecked", cmpEqual, true)
         
  exitwithlogic.exitWithLogic(false, false, 1)
}