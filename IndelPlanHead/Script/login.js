const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")

const __inputLoginFields = (loginClass, username, password) => {
  loginClass.username_input.Click()
  loginClass.username_input.Keys(username)
  loginClass.password_input.Click()
  loginClass.password_input.Keys(password)
}

const __doLogin = (loginClass, username, password) => {
  __inputLoginFields(loginClass, username, password)
  loginClass.pushButton.ClickButton()
}

const login = (username, password) => {
  const indel = Project.Variables.IndelPlan
  __doLogin(indel.loginClass, username, password)
  
  //handle loggin case
  while (indel.login_loggedin_popup.Exists) {
    utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
    indel.login_loggedin_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    __doLogin(indel.loginClass, username, password)
  }
  
  //handle nonnormal case
  if (indel.login_nonnormal_popup.Exists) indel.login_nonnormal_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
  //handle nonnormal case
  if (indel.login_ReloadClass.Exists) indel.login_ReloadClass.pushButton_3.ClickButton()
}

const loginThenExit = (username, password) => {
  const loginClass = Project.Variables.IndelPlan.loginClass
  __inputLoginFields(loginClass, username, password)
  loginClass.pushButton_2.ClickButton()    
}

module.exports.login = login
module.exports.loginThenExit = loginThenExit