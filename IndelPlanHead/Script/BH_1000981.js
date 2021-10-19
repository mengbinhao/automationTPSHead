const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")
const common = require("common")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(IndelPlan)
  aqObject.CheckProperty(IndelPlan.user_management, "Exists", cmpEqual, true)
  user.exitUserListWindow(IndelPlan)
  aqObject.CheckProperty(IndelPlan.user_management, "Exists", cmpEqual, false)
  exitwithlogic.exitWithLogic(false, false, 1)
}