const logout = () => {
  const IndelPlan = Project.Variables.IndelPlan

  //can not handle exception if main is not the top window
  //can not handle exception if main is not the top window
  //can not handle exception if main is not the top window
  if (Sys.Process(IndelPlan.procesName).Exists && IndelPlan.main.Exists) {
    //Focused、Index、ChildCount
    IndelPlan.main.Activate()
    IndelPlan.patientManagement.frame.pushButton_Logout.ClickButton()
  }
}

module.exports.logout = logout