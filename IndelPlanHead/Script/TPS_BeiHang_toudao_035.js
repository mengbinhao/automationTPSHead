const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const utilsfunctions = require("utils_functions")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_035() {
  const IndelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(Project.Variables.username, Project.Variables.password)
  IndelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const passed = "Passed"
  IndelPlan.systemsettingsClass.tabWidget.setCurrentIndex(1)
  IndelPlan.systemsettingsClass.tabWidget.qt_tabwidget_stackedwidget.tab_2.pushButton_Check.Click()
  
  utilsfunctions.delay(globalConstant.obj.delayTenSeconds)
  const list = IndelPlan.systemsettingsClass.tabWidget.qt_tabwidget_stackedwidget.tab_2.groupBox_6.treeWidget_Result
  
  let checkObj = {}
  checkObj.isExists = true
  for (let i = 0, len = list.wItems; i < len; i++) {
    if (!strictEqual(list.wItems.item(i).Text(1), passed)) {
      checkObj.isExists = false
      break
    }
  }

  aqObject.CheckProperty(checkObj, "isExists", cmpEqual, true)
  IndelPlan.systemsettingsClass.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}

