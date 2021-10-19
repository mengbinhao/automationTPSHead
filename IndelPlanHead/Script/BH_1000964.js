const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const logout = require("logout")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")
const utils_functions = require("utils_functions")

function testcase() {
  const IndelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(IndelPlan)

  const userList = IndelPlan.user_management.UserList
  let isUserExisting = findinlist.isItemExitInList(Project.Variables.newusername, globalConstant.obj.userNameColumn, userList)
  
  if (isUserExisting) {
    Log.Error(`Prerequisites is not correct`)
  } else {
    user.openNewUserWindow(IndelPlan)
    user.addUser(IndelPlan, Project.Variables.newusername, Project.Variables.newuserpassword, Project.Variables.newuserconfirmpassword, Project.Variables.newusertype)
    user.exitUserListWindow(IndelPlan)
    exitwithlogic.exitWithLogic(false, false, 2)
    login.login(Project.Variables.newusername, Project.Variables.newuserpassword)
    user.updateUserPassword(IndelPlan, Project.Variables.newuserpassword, '456', '456')
    exitwithlogic.exitWithLogic(false, false, 2)
    login.login(Project.Variables.newusername, '456')
    
    //check login name
    const group = IndelPlan.patientManagement.frame.groupBox_3
    aqObject.CheckProperty(group.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.newusername}`)
    
    //check login time
    const systemCurrentTime = utils_functions.getTimeAsFormatStr("%H:%M")
    const systemOneMinuteBeforeTime = utils_functions.getTimeIntervalAsFormatStr("%H:%M", 3, -1)
    const ret1 = aqString.FindLast(group.label_LoginTime.text,systemCurrentTime)
    const ret2 = aqString.FindLast(group.label_LoginTime.text,systemOneMinuteBeforeTime)
    if (strictEqual(ret1, -1) && strictEqual(ret2, -1)) {
      Log.Error("Login Time is not correct!")
    } {
      Log.Checkpoint("Login Time is correct!")
    }
  }
}