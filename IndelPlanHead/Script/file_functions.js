const globalConstant = require("global_constant")

//aqFile / aqFileSystem
//check whether the specified drive, folder or file exists.
const isExists = (path, fileName = "") => {
  if (!fileName) return aqFileSystem.Exists(path) ? true : false
  return aqFileSystem.Exists(path + globalConstant.obj.backslash + fileName) ? true : false
}

const createFile = (path, fileName) => {
  if (!isExists(path, fileName)) aqFile.Create(path + fileName)
}

const deleteFile = (path, fileName) => {
  if (isExists(path, fileName))aqFile.Delete(path + fileName)
}

const createFolder = (path) => {
  if (!isExists(path, null))aqFileSystem.CreateFolder(path)
}

const deleteFolder = (path, removeNonEmpty) => {
  if (isExists(path, null)) aqFileSystem.DeleteFolder(path, removeNonEmpty)
}

const readFile = (path, fileName) => {
  if (!isExists(path, fileName)) return null
  return aqFile.ReadWholeTextFile(path + fileName, aqFile.ctUTF8)
}

const readFileByLine = (path, fileName) => {
  let ret = globalConstant.obj.emptyString
  if (isExists(path, fileName)) return ret
  let readFile = aqFile.OpenTextFile(path + fileName, aqFile.faRead, aqFile.ctUTF8)

  while(! readFile.IsEndOfFile()) {
      ret += readFile.ReadLine()
  }
  readFile.Close()
  return ret
}

const appendTextToFile = (path, fileName, text) =>  aqFile.WriteToTextFile(path + fileName, text, aqFile.ctUTF8)

const isSpecificFolderWithPartialNameExist = (path, folderPartialName) => {
  const subFolders = aqFileSystem.GetFolderInfo(path).SubFolders
  while (subFolders.HasNext()){
    const fName = subFolders.Next().Name
    if (fName.endsWith(folderPartialName)) return true
  }
  return false
}

const getFullFolderNameWithPartialName = (path, folderPartialName) => {
  const subFolders = aqFileSystem.GetFolderInfo(path).SubFolders
  while (subFolders.HasNext()){
    const fName = subFolders.Next().Name
    if (fName.endsWith(folderPartialName)) return fName
  }
  return globalConstant.obj.emptyString
}

const getFolderDateLastModifiedTime = (path) => {
  return aqFileSystem.GetFolderInfo(path).DateLastModified
}

module.exports.isExists = isExists
module.exports.createFile = createFile
module.exports.deleteFile = deleteFile
module.exports.createFolder = createFolder
module.exports.deleteFolder = deleteFolder
module.exports.readFile = readFile
module.exports.readFileByLine = readFileByLine
module.exports.appendTextToFile = appendTextToFile
module.exports.isSpecificFolderWithPartialNameExist = isSpecificFolderWithPartialNameExist
module.exports.getFullFolderNameWithPartialName = getFullFolderNameWithPartialName
module.exports.getFolderDateLastModifiedTime = getFolderDateLastModifiedTime