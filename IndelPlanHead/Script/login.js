const __inputLoginFields = (loginClass, username, password) => {
  loginClass.username_input.Click()
  loginClass.username_input.Keys(username)
  loginClass.password_input.Click()
  loginClass.password_input.Keys(password)
}

const login = (username, password) => {
  const loginClass = Project.Variables.IndelPlan.loginClass
  __inputLoginFields(loginClass, username, password)
  loginClass.pushButton.ClickButton()
}

const loginThenExit = (username, password) => {
  const loginClass = Project.Variables.IndelPlan.loginClass
  __inputLoginFields(loginClass, username, password)
  loginClass.pushButton_2.ClickButton()    
}

const loginWithNonNormal = (username, password) => {
  const loginClass = Project.Variables.IndelPlan.loginClass
  __inputLoginFields(loginClass, username, password)
  loginClass.pushButton.ClickButton()
  
  //以下需分情况讨论
  if (IndelPlan.login_loggedin_popup.Exists) {
    IndelPlan.login_loggedin_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
    __inputLoginFields(IndelPlan.loginClass, loginUserName, loginPassword)
  }
  
  if (IndelPlan.login_nonnormal_popup.Exists) {
    IndelPlan.login_nonnormal_popup.qt_msgbox_buttonbox.buttonYes.ClickButton()
  }
    
  //Abort
  if (IndelPlan.login_ReloadClass.Exists) {
    IndelPlan.login_ReloadClass.pushButton_3.ClickButton()
  }   
}

module.exports.login = login
module.exports.loginThenExit = loginThenExit