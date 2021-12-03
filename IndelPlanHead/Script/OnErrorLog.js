const __getItemName = (val) => {
  const replacer = (match, p1, offset, string) => p1
  return val.replace(/\w+\\(\w+).+/, replacer)
}

function GeneralEvents_OnLogError(Sender, LogParams) {
  const pv = Project.Variables.ProjectVariable
  //first time normal running items
  //Project.TestItems.Current is not right while rerunning
  if (!strictEqual(Project.TestItems.Current.Name, "for_rerun_cases")) {
    const info = []
    const name = Project.TestItems.Current.Name
    info[0] = name
    const caption = Project.TestItems.Current.ElementToBeRun.Caption
    info[1] = __getItemName(Project.TestItems.Current.ElementToBeRun.Caption)
    pv.reRunItems.push(info)
    pv.bugItems.push(name)

    //Log.Picture(Sys.Desktop.Picture(), "Image of the whole screen", "", pmHigher)
    /*
    const pict = Sys.Desktop.Picture()
    const region = pict.GetRect(10, 10, 200, 100)
    Log.Picture(region, "Image")
    */
  }
}