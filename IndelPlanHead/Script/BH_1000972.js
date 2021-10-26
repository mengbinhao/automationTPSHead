﻿const globalConstant = require("global_constant")
const launch = require("launch")
const login = require("login")
const exitwithlogic = require("exit_with_logic")
const user = require("user")
const findinlist = require("find_in_list")

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
  //incase transferred meaning have to type one by one
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("!")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("@")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("#")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("$")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("%")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("^")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("&")
  IndelPlan.user_newusercClass.lineEdit_Password.Keys("*")
  aqObject.CheckProperty(IndelPlan.user_newusercClass.lineEdit_Password, "wText", cmpEqual, "")
  
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.clear()
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("!")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("@")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("#")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("$")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("%")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("^")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("&")
  IndelPlan.user_newusercClass.lineEdit_PasswordConfirm.Keys("*")
  aqObject.CheckProperty(IndelPlan.user_newusercClass.lineEdit_PasswordConfirm, "wText", cmpEqual, "")
  
  IndelPlan.user_newusercClass.pushButton_Cancel.ClickButton()
  user.exitUserListWindow(IndelPlan)

  exitwithlogic.exitWithLogic(false, false, 1)
}