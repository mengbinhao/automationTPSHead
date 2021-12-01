const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")
const common = require("common")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)
  user.exitUserListWindow(indelPlan)
  aqObject.CheckProperty(indelPlan.user_management, "Exists", cmpEqual, false)
  exitwithlogic.exitWithLogic(false, false, 1)
}