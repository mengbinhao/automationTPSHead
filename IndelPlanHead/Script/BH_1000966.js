const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")

function testcase() {
  const indelPlan = Project.Variables.IndelPlan
  launch.launch()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  
  user.gotoUserListWindow(indelPlan)
  const userList = indelPlan.user_management.UserList
  const rowIdx = findinlist.isItemInListReturnIndex(Project.Variables.username, globalConstant.obj.userNameColumn, userList)
  userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
  indelPlan.user_management.pushButton_EditUser.ClickButton()
  
  aqObject.CheckProperty(indelPlan.user_new_user.lineEdit_UserName, "Visible", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.user_new_user.lineEdit_Password, "Visible", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.user_new_user.lineEdit_PasswordConfirm, "Visible", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.user_new_user.comboBox_UserType, "Visible", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.user_new_user.pushButton_OK, "Visible", cmpEqual, true)
  aqObject.CheckProperty(indelPlan.user_new_user.pushButton_Cancel, "Visible", cmpEqual, true)
  indelPlan.user_new_user.pushButton_Cancel.ClickButton()
  
  user.exitUserListWindow(indelPlan)
  exitwithlogic.exitWithLogic(false, false, 1)
}