function otherTest() {
  const IndelPlan = Project.Variables.IndelPlan
  //scenario one
  //var p = Utils.Picture
  //p.LoadFromFile("C:\\Users\\TPS-Server\\Downloads\\test.jpg")
  //Log.Picture(p)

  //scenario two
  //Log.Picture(Sys.Desktop.Picture())
  //Log.Picture(Sys.Desktop.Picture(424, 79, 840, 840, false), "study size")
  //Log.Picture(Sys.Desktop.Picture(425, 132, 1036, 861, false), "contour size")
  //Log.Picture(Sys.Desktop.Picture(431, 129, 1003, 865, false), "plan size")

  /*
  const realPicture = IndelPlan.ContourGUIClass.canvas.C2DViewer.Picture()
  const storedPicture = Regions.GetPicture("wangbangai_with_target_contour")
  //if (storedPicture.Compare(realPicture)) {
  if (storedPicture.Compare(realPicture, false, 200, false, 0, 0)) {
    Log.Message(1111)
  } else {
    Log.Message(2222)
  }
  
  Regions.wangbangai_with_target_contour.Check(IndelPlan.ContourGUIClass.canvas.C2DViewer.Picture(), false, false, 200, 0, 0)
  */
  Log.Warning('warning')
}
