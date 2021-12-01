const globalConstant = require("global_constant")
const utilsfunctions = require("utils_functions")

const __inputLoginFields = (login, username, password) => {
  login.lineEdit_Username.Click()
  login.lineEdit_Username.Keys(username)
  login.lineEdit_Password.Click()
  login.lineEdit_Password.Keys(password)
}

const __doLogin = (login, username, password) => {
  __inputLoginFields(login, username, password)
  login.pushButton.ClickButton()
}

const login = (indelPlan, username, password) => {
  __doLogin(indelPlan.login, username, password)
  
  //handle loggin case
  while (indelPlan.login_loggedin_popup.Exists) {
    utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
    indelPlan.login_loggedin_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    __doLogin(indelPlan.login, username, password)
  }
  
  //handle nonnormal case
  if (indelPlan.login_nonnormal_popup.Exists) indelPlan.login_nonnormal_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
  //handle nonnormal case
  if (indelPlan.login_unnormal.Exists) indelPlan.login_unnormal.pushButton_3.ClickButton()
}

const loginThenExit = (indelPlan, username, password) => {
  const login = indelPlan.login
  __inputLoginFields(login, username, password)
  login.pushButton_2.ClickButton()    
}

module.exports.login = login
module.exports.loginThenExit = loginThenExit