const globalConstant = require("global_constant")

const exportTestResult = () => {
  aqFileSystem.DeleteFolder(globalConstant.obj.workDir, true)
  aqFileSystem.DeleteFolder(globalConstant.obj.packedResults, true)

  aqFileSystem.CreateFolder(globalConstant.obj.packedResults)
  aqFileSystem.CreateFolder(globalConstant.obj.workDir)

  Log.SaveResultsAs(globalConstant.obj.workDir + globalConstant.obj.reportFolderName, globalConstant.obj.reportType)

  const fileList = slPacker.GetFileListFromFolder(globalConstant.obj.workDir)
  const archivePath = globalConstant.obj.packedResults + globalConstant.obj.compressedFileName
  
  if (slPacker.Pack(fileList, globalConstant.obj.workDir, archivePath)) {
    Log.Message("Files compressed successfully!")
  } else {
    Log.Error("Files compressed fail!")
  }
}

module.exports.exportTestResult = exportTestResult
