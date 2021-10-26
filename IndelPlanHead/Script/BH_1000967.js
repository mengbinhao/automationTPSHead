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
  user.openNewUserWindow(IndelPlan)
  user.addUser(IndelPlan, Project.Variables.newusername, Project.Variables.newuserpassword, Project.Variables.newuserconfirmpassword, Project.Variables.newusertype)

  const userList = IndelPlan.user_management.UserList
  const rowIdx = findinlist.isItemInListReturnIndex(Project.Variables.newusername, globalConstant.obj.userNameColumn, userList)
  userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
  IndelPlan.user_management.pushButton_EditUser.ClickButton()
  
  IndelPlan.user_newusercClass.lineEdit_Password.clear()
  IndelPlan.user_newusercClass.lineEdit_Password.Keys(Project.Variables.edituserpassword)
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.clear()
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys(Project.Variables.edituserpassword)
  IndelPlan.user_newusercClass.pushButton_Cancel.ClickButton()
  user.exitUserListWindow(IndelPlan)
  exitwithlogic.exitWithLogic(false, false, 2)
  
  login.login(Project.Variables.username, Project.Variables.password)

  if (strictEqual(common.getPatientDetailTabName(IndelPlan), globalConstant.obj.patientManagement)) {
    Log.Checkpoint(`default focused tab is ${globalConstant.obj.patientManagement}`);
  } else {
    Log.Error(`default main tab should be ${globalConstant.obj.patientManagement}`)
  }
  
  /*
  aqObject.CheckProperty(IndelPlan.patientManagement.frame.groupBox_3.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.username}`)
  */

  exitwithlogic.exitWithLogic(false, false, 1)
}