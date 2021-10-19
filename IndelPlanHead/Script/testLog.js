var ImgCount, ExportFile, ExportFileName

// Exporting the log
function ExportLog() {
  var i, FS
  
  if(Project.Logs.LogItemsCount > 0) {
    ExportFileName = "C:\\ExportLog_JS.txt"
    ImgCount = 0

    // Creating file. In JScript, use Sys.OleObject instead of getActiveXObject
    FS = getActiveXObject("Scripting.FileSystemObject")
    ExportFile = FS.CreateTextFile(ExportFileName, true)

    try {
      for(i = 0; i < Project.Logs.LogItemsCount; i++) ExportLogItem(Project.Logs.LogItem(i))
    } finally {
      ExportFile.Close()
    }
  } else {
    Log.Message("No logs for export.")
  }
}

function ExportPicture(ALogData) {
  var s
  // Generating the image file name
  ImgCount = ImgCount + 1
  s = aqFileSystem.GetFileFolder(ExportFileName) + "\\" + aqConvert.VarToStr(ImgCount) + ".jpg"
  ALogData.Picture.SaveToFile(s)
  ExportFile.WriteLine("Picture: " + s)
}

function ExportText(ALogData) {
  ExportFile.WriteLine("Text: " + ALogData.Text)
}

function ExportRow(TableScheme, Caption, ARow) {
  var i, s
  var Child, ChildRow
  var ColCount, ChildCount

  ColCount = TableScheme.ColumnCount
  ChildCount = TableScheme.ChildCount
    
  s = Caption

  for(i = 0; i < ColCount; i++) {
    s = s + aqConvert.VarToStr(ARow.ValueByIndex(i)) + "\t"
    ExportFile.WriteLine(s)
    
    // Exporting child tables data
    for(i = 0; i < ChildCount; i++) {
      Child = ARow.ChildDataByIndex(i)
      ExportLogData(Child)
    }
    
    // Exporting child rows (if the data is displayed as a tree)
    for(i = 0; i < ARow.ChildRowCount; i++) {
      ChildRow = ARow.ChildRow(i)
      s = "Row " + aqConvert.VarToStr(i + 1) + ":\t"
      ExportRow(TableScheme, s, ChildRow)
    }
  }
}

function ExportTable(ALogData) {
  var TableScheme, Row, i, s

  TableScheme = ALogData.Scheme

  for(i = 0; i < ALogData.RowCount; i++) {
    // Obtaining the row object
    Row = ALogData.Rows(i)
    s = "Row " + aqConvert.VarToStr(i + 1) + ":\t"
    ExportRow(TableScheme, s, Row)
  }
}

function ExportLogData(ALogData) {
  var Scheme

  Scheme = ALogData.Scheme
  
  ExportFile.WriteBlankLines (1)
  ExportFile.WriteLine ("Name: " + Scheme.Name)
  ExportFile.WriteLine("-------------------------------------------")

  switch(Scheme.DataType)
  {
    case ldtTable :
      ExportTable(ALogData)
      break;
    case ldtPicture:
      ExportPicture(ALogData)
      break;
    case ldtText :
      ExportText(ALogData)
      break;
  }
}

function ExportLogItem(ALogItem) {
  var i
  for(i = 0; i < ALogItem.DataCount; i++) ExportLogData(ALogItem.Data(i))
  for(i = 0; i < ALogItem.ChildCount; i++) ExportLogItem(ALogItem.Child(i))  
}
