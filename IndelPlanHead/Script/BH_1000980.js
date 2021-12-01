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
  //check our user
  user.addUser(indelPlan, pv, Project.Variables.username, Project.Variables.new_user_password, Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype)
  aqObject.CheckProperty(indelPlan.user_exists_popup, "Exists", cmpEqual, true)
  common.handlePopupDialog(indelPlan.user_exists_popup)
  indelPlan.user_new_user.pushButton_Cancel.ClickButton()
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}