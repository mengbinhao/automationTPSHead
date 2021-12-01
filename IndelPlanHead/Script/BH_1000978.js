const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")
const common = require("common")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)
  user.openNewUserWindow(indelPlan)
  user.addUser(indelPlan, pv, Project.Variables.new_username, "", Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype)
  aqObject.CheckProperty(indelPlan.user_null_password_popup, "Exists", cmpEqual, true)
  common.handlePopupDialog(indelPlan.user_null_password_popup)
  indelPlan.user_new_user.pushButton_Cancel.ClickButton()
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}