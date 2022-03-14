const gotoFuse = (indelPlan) => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    indelPlan.PatientData.groupBox_6.pushButton_GamaReg.ClickButton()
  } else {
    Log.Warning(`Can not gotoFuse due to window is not right`) 
  }
}

const doFuse = (indelPlan) => {
  if (indelPlan.PatientData.VisibleOnScreen) {
    indelPlan.fuse_GamaReg.centralWidget.tbEV_FS.qt_tabwidget_stackedwidget.tab_2.pbStartReg.ClickButton()
    while (indelPlan.fuse_GamaReg.statusBar.ProgressBar.VisibleOnScreen) {
      utilsFunctions.delay(globalConstant.obj.delayTenSeconds)
    }
    indelPlan.fuse_GamaReg.centralWidget.tbEV_FS.qt_tabwidget_stackedwidget.tab_3.groupBox_4.pbFuse.ClickButton()
    indelPlan.fuse_popup.qt_msgbox_buttonbox.buttonOk.ClickButton()
  } else {
    Log.Warning(`Can not gotoFuse due to window is not right`) 
  }
}

const closeFuse = (indelPlan, isSave) => {
  indelPlan.fuse_GamaReg.Close()
  if (isSave) {
    indelPlan.fuse_exit.qt_msgbox_buttonbox.buttonYes.ClickButton()
  } else {
    indelPlan.fuse_exit.qt_msgbox_buttonbox.buttonNo.ClickButton()
  }
}

module.exports.gotoFuse = gotoFuse
module.exports.doFuse = doFuse
module.exports.closeFuse = closeFuse