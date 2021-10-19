const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_034() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const checkFields = ['TPS database connection test', 'DICOM gate database connection test', 'Default physical data existence test', 
        'Machine parameters test', 'Collimator, TMR and OAR test', 'Electron density map test', 'System settings test']

  IndelPlan.systemsettingsClass.tabWidget.setCurrentIndex(1)
  
  const list = IndelPlan.systemsettingsClass.tabWidget.qt_tabwidget_stackedwidget.tab_2.groupBox_6.treeWidget_Result
  
  let checkObj = {}
  checkObj.isExists = true
  for (let i = 0, len = list.wItems; i < len; i++) {
    if (!strictEqual(list.wItems.item(i).Text(0), checkFields[i])) {
      checkObj.isExists = false
      break
    }
  }
  
  aqObject.CheckProperty(checkObj, "isExists", cmpEqual, true)
  IndelPlan.systemsettingsClass.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}

