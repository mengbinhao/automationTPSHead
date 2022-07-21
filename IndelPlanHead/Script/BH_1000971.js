const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)
  const previousCount = indelPlan.user_management.UserList.wRowCount
  user.openNewUserWindow(indelPlan)
  user.addUser(indelPlan, pv, Project.Variables.new_username, Project.Variables.new_user_password, Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype, true)
  
  if (strictEqual(previousCount, indelPlan.user_management.UserList.wRowCount)) {
    Log.Checkpoint('Execute ${Project.TestItems.Current.Name} successfully!')
  } else {
    Log.Error('Execute ${Project.TestItems.Current.Name} fail!')
  }

  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}