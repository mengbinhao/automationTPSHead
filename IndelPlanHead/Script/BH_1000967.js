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
  user.addUser(indelPlan, pv, Project.Variables.new_username, Project.Variables.new_user_password, Project.Variables.new_user_confirmpassword, Project.Variables.new_usertype)

  const userList = indelPlan.user_management.UserList
  const rowIdx = findinlist.isItemInListReturnIndex(Project.Variables.new_username, globalConstant.obj.userNameColumn, userList)
  userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
  indelPlan.user_management.pushButton_EditUser.ClickButton()
  
  indelPlan.user_new_user.lineEdit_Password.clear()
  indelPlan.user_new_user.lineEdit_Password.Keys(Project.Variables.edit_user_password)
  indelPlan.user_new_user.lineEdit_PasswordConfirm.clear()
  indelPlan.user_new_user.lineEdit_PasswordConfirm.Keys(Project.Variables.edit_user_password)
  indelPlan.user_new_user.pushButton_Cancel.ClickButton()
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 2)
  
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)

  if (strictEqual(common.getPatientDetailTabName(indelPlan), globalConstant.obj.patientManagement)) {
    Log.Checkpoint(`default focused tab is ${globalConstant.obj.patientManagement}`)
  } else {
    Log.Error(`default main tab should be ${globalConstant.obj.patientManagement}`)
  }
  
  /*
  aqObject.CheckProperty(indelPlan.patientManagement.frame.groupBox_3.label_UserName, "text", cmpEqual, `User Name: ${Project.Variables.username}`)
  */

  exitwithlogic.exitWithLogic(false, false, 1)
}