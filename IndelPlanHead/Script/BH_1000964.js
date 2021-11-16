const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const logout = require("logout")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")
const utilsFunctions = require("utils_functions")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(IndelPlan)
  user.openNewUserWindow(IndelPlan)
  user.addUser(IndelPlan, Project.Variables.newusername, Project.Variables.newuserpassword, Project.Variables.newuserconfirmpassword, Project.Variables.newusertype)
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 2)
  //login with new user
  login.login(Project.Variables.newusername, Project.Variables.newuserpassword)
  //visitor authority
  user.updateUserPassword(IndelPlan, Project.Variables.newuserpassword, Project.Variables.edituserpassword, Project.Variables.edituserpassword)
  exitwithlogic.exitWithLogic(false, false, 2)
  
  //relogin after changing password
  login.login(Project.Variables.newusername, Project.Variables.edituserpassword)
  aqObject.CheckProperty(IndelPlan.patientManagement.frame.groupBox_3, "Visible", cmpEqual, true)
  
  /*  
  //check login name
  const group = IndelPlan.patientManagement.frame.groupBox_3
  aqObject.CheckProperty(group.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.newusername}`)
    
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