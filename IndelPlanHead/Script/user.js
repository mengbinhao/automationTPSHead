const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")
const findinlist = require("find_in_list")

const USER_TYPE = ['Visitor', 'PlanningPhysicist', 'RadiationPhysicist', 'RadiationTherapist', 'ChiefDoctor', 'Technician'];

const __getUserType = () => USER_TYPE

const __choiceUserType = (indel, newUserType) => {
  if (__getUserType().includes(newUserType)) {
    indel.user_newusercClass.comboBox_UserType.ClickItem(newUserType)
  } else {
    Log.Warning(`Can not find UserType=${newUserType} when adding user`)
  }
}

const __fillUserInfo = (indel, newUserName, newUserPassword, newUserConfirmPassword, newUserType) => {
  newUserName && indel.user_newusercClass.lineEdit_UserName.Keys(newUserName)
  newUserPassword && indel.user_newusercClass.lineEdit_Password.Keys(newUserPassword)
  newUserConfirmPassword && indel.user_newusercClass.lineEdit_PasswordConfirm.Keys(newUserConfirmPassword)
  newUserType && __choiceUserType(indel, newUserType)
}

const __handleDirtyDate = (indel, userName) => {
  const dirtydUsers = indel.dirtyData.get(globalConstant.obj.addUser)
  if (dirtydUsers.includes(userName)) {
    indel.dirtyData.set(globalConstant.obj.addUser, dirtydUsers.filter(val => val !== userName))
  } else {
    Log.Warning(`can not __handleDirtyDate due to userName=${userName}`)
  }
}

const gotoUserListWindow = (indel) => {
  indel.patientManagement.frame.pushButton_UserManage.ClickButton()
}

const openNewUserWindow = (indel) => {
  indel.user_management.pushButton_NewUser.ClickButton()
}

const exitUserListWindow = (indel) => {
  indel.user_management.pushButton_Exit.Click()
}

const addUserActivity = (indel, newUserName = "", newUserPassword = "", newUserConfirmPassword = "", newUserType = "") => {
  gotoUserListWindow(indel)
  openNewUserWindow(indel)
  addUser(indel, newUserName, newUserPassword, newUserConfirmPassword, newUserType, false)
  exitUserListWindow(indel)
}

const editUserActivity = (indel, userName, editUserPassword = "", editUserConfirmPassword = "", editUserType = "") => {
  gotoUserListWindow(indel)
  openNewUserWindow(indel)
  editUser(indel, userName, editUserPassword, editUserConfirmPassword, editUserType, false)
  exitUserListWindow(indel)
}

const deleteUserActivity = (indel, userName) => {
  gotoUserListWindow(indel)
  openNewUserWindow(indel)
  deleteUser(indel, userName, false)
  exitUserListWindow(indel)
}

const addUser = (indel, newUserName = "", newUserPassword = "", newUserConfirmPassword = "", newUserType = "", isCancel = false) => {
  __fillUserInfo(indel, newUserName, newUserPassword, newUserConfirmPassword, newUserType)
  if (!isCancel) {
    indel.user_newusercClass.pushButton_OK.ClickButton()
    if (!indel.user_exists_popup.Exists && !indel.user_wrongpassword_popup.Exists && !indel.user_nullpassword_popup.Exists) {
      indel.dirtyData.get(globalConstant.obj.addUser).push(newUserName)
    }
  } else {
    indel.user_newusercClass.pushButton_Cancel.ClickButton()
  }
}

const editUser = (indel, userName, editUserPassword = "", editUserConfirmPassword = "", editUserType = "", isCancel = false) => {
  const userList = indel.user_management.UserList
  const rowIdx = findinlist.isItemInListReturnIndex(userName, globalConstant.obj.userNameColumn, userList)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
    indel.user_management.pushButton_EditUser.ClickButton()
    if (editUserPassword) {
      indel.user_newusercClass.lineEdit_Password.wText = globalConstant.obj.emptyString
      indel.user_newusercClass.lineEdit_Password.Keys(editUserPassword)
    }
    if (editUserConfirmPassword) {
      indel.user_newusercClass.lineEdit_PasswordConfirm.wText = globalConstant.obj.emptyString
      indel.user_newusercClass.lineEdit_PasswordConfirm.Keys(editUserConfirmPassword)
    }
    editUserType && __choiceUserType(indel, editUserType)
    !isCancel ? indel.user_newusercClass.pushButton_OK.ClickButton() : indel.user_newusercClass.pushButton_Cancel.ClickButton()
  } else {
    Log.Warning(`Can not find user with userName=${userName} when editting user`)
  }
}

const updateUserPassword = (indel, oldPassword = '', newPassword = '', confirmNewPassword = '', isUpdate = true) => {
  gotoUserListWindow(indel)
  oldPassword && indel.user_information.lineEdit_OldPassword.Keys(oldPassword)
  newPassword && indel.user_information.lineEdit_NewPassword.Keys(newPassword)
  confirmNewPassword && indel.user_information.lineEdit_PasswordConfirm.Keys(confirmNewPassword)
  
  if (isUpdate) {
    indel.user_information.pushButton_OK.ClickButton()
  } else {
    indel.user_information.pushButton_Cancel.ClickButton()
  }
}

const deleteUser = (indel, userName, isCancel = false) => {
  const userList = indel.user_management.UserList
  const rowIdx = findinlist.isItemInListReturnIndex(userName, globalConstant.obj.userNameColumn, userList)
  if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
    userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
    indel.user_management.pushButton_DelUser.ClickButton()
    if (!isCancel) {
      indel.user_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
      __handleDirtyDate(indel, userName)
    } else {
      indel.user_delete_popup.qt_msgbox_buttonbox.buttonNo.ClickButton()
    }
  } else {
    Log.Warning(`Can not find user with userName=${userName} when deleting user`)
  }
}

const deleteUserForDirtyData = (indel, deleteUsers) => {
  gotoUserListWindow(indel)
  const userList = indel.user_management.UserList
  let du = deleteUsers.pop()
  while (du) {
    const rowIdx = findinlist.isItemInListReturnIndex(du, globalConstant.obj.userNameColumn, userList)
    if (!strictEqual(rowIdx, globalConstant.obj.notFoundIndex)) {
      userList.ClickCell(rowIdx, globalConstant.obj.userNameColumn)
      indel.user_management.pushButton_DelUser.ClickButton()
      indel.user_delete_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
    } else {
      Log.Warning(`Can not find user with userName=${du} when deleteUserForDirtyData`)
    }
    du = deleteUsers.pop()
  }
  exitUserListWindow(indel)
}


module.exports.gotoUserListWindow = gotoUserListWindow
module.exports.openNewUserWindow = openNewUserWindow
module.exports.exitUserListWindow = exitUserListWindow
module.exports.addUser = addUser
module.exports.addUserActivity = addUserActivity
module.exports.editUser = editUser
module.exports.editUserActivity = editUserActivity
module.exports.updateUserPassword = updateUserPassword
module.exports.deleteUser = deleteUser
module.exports.deleteUserActivity = deleteUserActivity
module.exports.deleteUserForDirtyData = deleteUserForDirtyData