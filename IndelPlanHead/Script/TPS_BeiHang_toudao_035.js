const globalConstant = require("global_constant")
const launchwithlogic = require("launch_with_logic")
const login = require("login")
const patient = require("patient")
const utilsFunctions = require("utils_functions")
const exitwithlogic = require("exit_with_logic")

function TPS_BeiHang_toudao_035() {
  const indelPlan = Project.Variables.IndelPlan
  launchwithlogic.launchWithLogic()
  login.login(indelPlan, Project.Variables.username, Project.Variables.password)
  indelPlan.patientManagement.frame.pushButton_SystemSetting.Click()
  
  const passed = "Passed"
  indelPlan.system_settings.tabWidget.setCurrentIndex(1)
  indelPlan.system_settings.tabWidget.qt_tabwidget_stackedwidget.tab_2.pushButton_Check.Click()
  
  utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
  const list = indelPlan.system_settings.tabWidget.qt_tabwidget_stackedwidget.tab_2.groupBox_6.treeWidget_Result
  
  let checkObj = {}
  checkObj.isExists = true
  for (let i = 0, len = list.wItems; i < len; i++) {
    if (!strictEqual(list.wItems.item(i).Text(1), passed)) {
      checkObj.isExists = false
      break
    }
  }

  aqObject.CheckProperty(checkObj, "isExists", cmpEqual, true)
  indelPlan.system_settings.pushButton_Cancel.Click()
  exitwithlogic.exitWithLogic(false, true)
}

