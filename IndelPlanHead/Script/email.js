const globalConstant = require("global_constant")

const send = () => {
  const dateStr = aqConvert.DateTimeToFormatStr(aqDateTime.Now(), "%Y-%m-%d %H:%M:%S")
  const subject = dateStr + " " + globalConstant.obj.subject
  
  if (SendMail(globalConstant.obj.toAddress, globalConstant.obj.fromHost, globalConstant.obj.fromName, globalConstant.obj.fromAddress, subject, globalConstant.obj.body, globalConstant.obj.packedResults + globalConstant.obj.compressedFileName + globalConstant.obj.separator + globalConstant.obj.compressedFileSuffix)) {
    Log.Message(`Sending email to ${globalConstant.obj.toAddress} successfully!`)
  } else {
    Log.Error(`Sending email to ${globalConstant.obj.toAddress} fail!`)
  }
}

module.exports.send = send
