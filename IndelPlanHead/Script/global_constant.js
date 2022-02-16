const obj = {}

//common
obj.delayOneSeconds = 1000
obj.delayFiveSeconds = 5000
obj.delayTenSeconds = 10000
obj.delayThirtySeconds = 30000
obj.delayOneMinute = 60000


//mouse delay
obj.delayMouseZeroSecond = 0
obj.delayMouseHalfSecond = 500
obj.delayMouseOneSecond = 1000


//scroll mouse
//positive means increase, negative means reduce
obj.mousePositiveScroll = 20


//distcnce
obj.delayDistanceZero = 0
obj.delayDistanceOneHundredAndTwenty = 120
obj.delayDistanceTwoHundred = 200
obj.delayDistanceNegativeOneHundred = -100
obj.delayDistanceNegativeOneHundredAndEighty = -180


//patient detail tab
obj.patientManagement = 'PatientManagement'
obj.contour = 'Contour'
obj.planDesign = 'PlanDesign'


//file related
obj.backslash = '\\'
obj.studyDICOMFolder = 'D:\\Data\\'
obj.studyDICOMOriginFolder = 'D:\\Data_Origin\\'
obj.patientDataFolder = 'D:\\PatientData\\'
obj.studyDataFolder = 'D:\\StudyData\\'
obj.notExistingFolder = 'D:\\NotExistingFolder\\'
//obj.exportFolder = 'AutoTested'
//obj.indelPath = 'D:\\IndelPlan\\'
//obj.systemConfigFile = 'SystemConfig.ini'
//obj.temp = '_temp'


//list column
obj.machineConfigNameColumn = 'Config Name'
obj.userNameColumn = 'User Name'
obj.userTypeColumn = 'User Type'
obj.nameColumn = 'Name'
obj.patientIDColumn = 'ID'
obj.patientIDColumnFromGate = 'Patient ID'
obj.patientIDAndModalityColumn = 'PatientID/Modality'
obj.studyName = 'StudyName'
obj.contourType = 'Type'


//patient info
obj.defaultPatientGender = 'Male'


//for magic number or string
obj.notFoundIndex = -1
obj.emptyString = ''
//obj.numberAndLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
//Note: ! and ^ has special meaning while passing to Keys as parameter,so need to write at the end of wrongInput
//obj.wrongInput = '@#$%&* ()-_=+.`,<>/?\'\"[]{}\\|~^!'


//Dirty Data
obj.addContourLib = 'contourLib'
obj.addPatient = 'patient'
obj.addUser = 'user'
obj.restoreStudy = 'restorestudy'
obj.addMachine = 'machine'
//obj.addContourPlanLib = 'addContourPlanLib'
//obj.addTreatCourse = 'addTreatCourse'
//obj.addPlan = 'addPlan'


//PixelTolerance
obj.pixelTolerance = 200
obj.colourTolerance = 200


//C:\Users\TPS-Server\Documents\TestComplete 12 Projects\TPS\IndelPlanHead\
//export test report path
obj.workDir = Project.ConfigPath + "Log\\ExportedResults\\"
obj.packedResults = Project.ConfigPath + "Log\\PackedResults\\"
//1 means folder, 2 means file
//obj.reportFolderName = "report.mht"
//1 html, 2 mht
//obj.reportType = 2
obj.reportFolderName = "report"
obj.reportType = 1
obj.compressedFileName = "CompressedReport"
obj.compressedFileSuffix = "ZIP"
obj.separator = "."


//email related, do not use any more
/*
obj.toAddress = "bin.meng@ourunited.com"
obj.fromHost = "smtp.ourunited.com"
obj.fromName = "孟斌"
//just a fake address
obj.fromAddress = "automation@ouruited.com"
obj.subject = "IndelPlanHead Test Report"
obj.body= "This email was sending by IndelPlanHead Automation Testing Project"
*/


//JIRA related
obj.JIRA_location = "http://192.168.90.179:8080/"
obj.JIRA_account = "bin.meng"
obj.JIRA_password = "123456"
obj.JIRA_project_key = "TEST"
obj.JIRA_issue_type = "Defect"


//Jenkins related
obj.TC_compressedReport = Project.ConfigPath + "Log\\PackedResults\\" + "CompressedReport.ZIP" 
obj.Jenkins_workspace = "C:\\Windows\\System32\\config\\systemprofile\\AppData\\Local\\Jenkins\\.jenkins\\workspace\\IndelPlanAutomation\\TestReport"


module.exports.obj = obj