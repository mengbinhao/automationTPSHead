const globalConstant = require("global_constant")
const findInList = require("find_in_list")

const USER_TYPE = ['Visitor', 'PlanningPhysicist', 'RadiationPhysicist', 'RadiationTherapist', 'ChiefDoctor', 'Technician'];

const __getUserType = () => USER_TYPE

const __choiceUserType = (indelPlan, newUserType) => {
  if (__getUserType().includes(newUserType)) {
    indelPlan.user_new_user.comboBox_UserType.ClickItem(newUserType)
  } else {
    Log.Warning(`Can not find UserType=${newUserType} when adding user`)
  }
}

const __fillUserInfo = (indelPlan, newUserName, newUserPassword, newUserConfirmPassword, newUserType) => {
  newUserName && indelPlan.user_new_user.lineEdit_UserName.Keys(newUserName)
  newUserPassword && indelPlan.user_new_user.lineEdit_Password.Keys(newUserPassword)
  newUserConfirmPassword && indelPlan.user_new_user.lineEdit_PasswordConfirm.Keys(newUserConfirmPassword)
  newUserType && __choiceUserType(indelPlan, newUserType)
}

const __handleUserDirtyData = (pv, userName) => {
  const dirtydUsers = pv.dirtyData.get(globalConstant.obj.addUser)
  if (dirtydUsers.includes(userName)) {
    pv.dirtyData.set(globalConstant.obj.addUser, dirtydUsers.filter(val => val !== userName))
  } else {
    Log.Warning(`can not __handleUserDirtyData due to userName=${userName}`)
  }
}

const gotoUserListWindow = (indelPlan) => {
  indelPlan.patientManagement.frame.pushButton_UserManage.ClickButton()
}

const openNewUserWindow = (indelPlan) => {
  indelPlan.user_management.pushButton_NewUser.ClickButton()
}

const exitNewUserWindow = (indelPlan) => {
  indelPlan.user_new_user.pushButton_Cancel.ClickButton()
}

const exitUserListWindow = (indelPlan) => {
  indelPlan.user_management.pushButton_Exit.Click()
}

const addUserActivity = (indelPlan, pv, newUserName = "", newUserPassword = "", newUserConfirmPassword = "", newUserType = "") => {
  gotoUserListWindow(indelPlan)
  openNewUserWindow(indelPlan)
  addUser(indelPlan, pv, newUserName, newUserPassword, newUserConfirmPassword, newUserType, false)
  exitUserListWindow(indelPlan)
}

const editUserActivity = (indelPlan, userName, editUserPassword = "", editUserConfirmPassword = "", editUserType = "") => {
  gotoUserListWindow(indelPlan)
  openNewUserWindow(indelPlan)
  editUser(indelPlan, userName, editUserPassword, editUserConfirmPassword, editUserType, false)
  exitUserListWindow(indelPlan)
}

const deleteUserActivity = (indelPlan, userName) => {
  gotoUserListWindow(indelPlan)
  openNewUserWindow(indelPlan)
  deleteUser(indelPlan, pv, userName, false)
  exitUserListWindow(indelPlan)
}

const addUser = (indelPlan, pv, newUserName = "", newUserPassword = "", newUserConfirmPassword = "", newUserType = "", isCancel = false) => {
  __fillUserInfo(indelPlan, newUserName, newUserPassword, newUserConfirmPassword, newUserType)
  if (!isCancel) {
    indelPlan.user_new_user.pushButton_OK.ClickButton()
    if (!indelPlan.user_exists_popup.Exists && !indelPlan.user_incorrect_confirm_password_popup.Exists && !indelPlan.user_null_password_popup.Exists) {
      pv.dirtyData.get(globalConstant.obj.addUser).push(newUserName)
    }
  } else {
    indelPlan.user_new_user.pushButton_Cancel.ClickButton()
  }
}

const editUser = (indelPlan, userName, editUserPassword = "", editUserConfirmPassword = "", editUserType = "", isCancel = false) => {
  const userList = indelPlan.user_management.UserList
  const rowIdx = findInList.isItemInListReturnIndex(userName, globalConstant.obj.userNameColumn, userList)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
    indelPlan.user_management.pushButton_EditUser.ClickButton()
    if (editUserPassword) {
      indelPlan.user_new_user.lineEdit_Password.wText = globalConstant.obj.emptyString
      indelPlan.user_new_user.lineEdit_Password.Keys(editUserPassword)
    }
    if (editUserConfirmPassword) {
      indelPlan.user_new_user.lineEdit_PasswordConfirm.wText = globalConstant.obj.emptyString
      indelPlan.user_new_user.lineEdit_PasswordConfirm.Keys(editUserConfirmPassword)
    }
    editUserType && __choiceUserType(indelPlan, editUserType)
    !isCancel ? indelPlan.user_new_user.pushButton_OK.ClickButton() : indelPlan.user_new_user.pushButton_Cancel.ClickButton()
  } else {
    Log.Warning(`Can not find user with userName=${userName} when editting user`)
  }
}

const updateUserPassword = (indelPlan, oldPassword = '', newPassword = '', confirmNewPassword = '', isUpdate = false) => {
  gotoUserListWindow(indelPlan)
  oldPassword && indelPlan.user_information.lineEdit_OldPassword.Keys(oldPassword)
  newPassword && indelPlan.user_information.lineEdit_NewPassword.Keys(newPassword)
  confirmNewPassword && indelPlan.user_information.lineEdit_PasswordConfirm.Keys(confirmNewPassword)
  
  if (isUpdate) {
    indelPlan.user_information.pushButton_OK.ClickButton()
  } else {
    indelPlan.user_information.pushButton_Cancel.ClickButton()
  }
}

const deleteUser = (indelPlan, pv, userName, isCancel = false) => {
  const userList = indelPlan.user_management.UserList
  const rowIdx = findInList.isItemInListReturnIndex(userName, globalConstant.obj.userNameColumn, userList)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
    indelPlan.user_management.pushButton_DelUser.ClickButton()
    if (!isCancel) {
      indelPlan.user_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      __handleUserDirtyData(pv, userName)
    } else {
      indelPlan.user_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not find user with userName=${userName} when deleting user`)
  }
}

const deleteUserForDirtyData = (indelPlan, deleteUsers) => {
  gotoUserListWindow(indelPlan)
  const userList = indelPlan.user_management.UserList
  let du = deleteUsers.pop()
  while (du) {
    const rowIdx = findInList.isItemInListReturnIndex(du, globalConstant.obj.userNameColumn, userList)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
      indelPlan.user_management.pushButton_DelUser.ClickButton()
      indelPlan.user_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else {
      Log.Warning(`Can not find user with userName=${du} when deleteUserForDirtyData`)
    }
    du = deleteUsers.pop()
  }
  exitUserListWindow(indelPlan)
}


module.exports.gotoUserListWindow = gotoUserListWindow
module.exports.openNewUserWindow = openNewUserWindow
module.exports.exitNewUserWindow = exitNewUserWindow
module.exports.exitUserListWindow = exitUserListWindow
module.exports.addUser = addUser
module.exports.addUserActivity = addUserActivity
module.exports.editUser = editUser
module.exports.editUserActivity = editUserActivity
module.exports.updateUserPassword = updateUserPassword
module.exports.deleteUser = deleteUser
module.exports.deleteUserActivity = deleteUserActivity
module.exports.deleteUserForDirtyData = deleteUserForDirtyData