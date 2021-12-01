const logout = () => {
  const indelPlan = Project.Variables.IndelPlan
  const pv = Project.Variables.ProjectVariable

  //can not handle exception if main is not the top window
  if (Sys.Process(pv.procesName).Exists && indelPlan.main.Exists) {
    //Focused、Index、ChildCount
    indelPlan.main.Activate()
    indelPlan.patientManagement.frame.pushButton_Logout.ClickButton()
  }
}

module.exports.logout = logout