const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const logout = require("logout")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const utilsFunctions = require("utils_functions")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)
  user.openNewUserWindow(indelPlan)
  user.addUser(indelPlan, pv, Project.Variables.new_username, Project.Variables.new_user_password, Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype)
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 2)
  //login with new user
  login.login(indelPlan, Project.Variables.new_username, Project.Variables.new_user_password)
  //visitor authority
  user.updateUserPassword(indelPlan, Project.Variables.new_user_password, Project.Variables.edit_user_password, Project.Variables.edit_user_password, true)
  exitwithlogic.exitWithLogic(false, false, 2)
  
  //relogin after changing password
  login.login(indelPlan, Project.Variables.new_username, Project.Variables.edit_user_password)
  aqObject.CheckProperty(indelPlan.patientManagement.frame.groupBox_3, "Visible", cmpEqual, true)
  
  /*  
  //check login name
  const group = indelPlan.patientManagement.frame.groupBox_3
  aqObject.CheckProperty(group.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.new_username}`)
    
  //check login time
  const systemCurrentTime = utilsFunctions.getTimeAsFormatStr("%H:%M")
  const systemOneMinuteBeforeTime = utilsFunctions.getTimeIntervalAsFormatStr("%H:%M", 3, -1)
  const ret1 = aqString.FindLast(group.label_LoginTime.text,systemCurrentTime)
  const ret2 = aqString.FindLast(group.label_LoginTime.text,systemOneMinuteBeforeTime)
  if (strictEqual(ret1, -1) && strictEqual(ret2, -1)) {
    Log.Error("Login Time is not correct!")
  } {
    Log.Checkpoint("Login Time is correct!")
  }
  */
  exitwithlogic.exitWithLogic(false, false, 1)
}