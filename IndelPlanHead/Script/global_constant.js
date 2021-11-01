const obj = {}
//project vaiable name
obj.projectObjectVaiableName = 'IndelPlan'
obj.projectObjectVaiableType = 'Object'

//common
obj.delayFiveSeconds = 5000
obj.delayTenSeconds = 10000
obj.delayThirtySeconds = 30000
obj.delayOneMinute = 60000

obj.exitYes = 1
obj.exitNo = 2
obj.exitCancel = 3

//mouse delay
obj.delayMouseZeroSecond = 0
obj.delayMouseHalfSecond = 500
obj.delayMouseOneSecond = 1000
obj.delayMousePositiveDelta = -10

//distcnce
obj.delayDistanceZero = 0
obj.delayDistanceOneHundred = 100
obj.delayDistanceOneHundredAndTwenty = 120
obj.delayDistanceTwoHundredAndThirty = 230
obj.delayDistanceNegativeOneHundred = -100
obj.delayDistanceNegativeOneHundredAndEighty = -180

//patient detail tab
obj.patientManagement = 'PatientManagement'
obj.contour = 'Contour'
obj.planDesign = 'PlanDesign'

//file related
//obj.indelPath = 'D:\\IndelPlan\\'
obj.importData = 'D:\\Data\\'
//obj.systemConfigFile = 'SystemConfig.ini'
//obj.temp = '_temp'
//obj.doubleBackslashes = '\\\\'
obj.backslash = '\\'
obj.exportFolder = 'AutoTested'

//list column
obj.machineConfigNameColumn = 'Config Name'
obj.userNameColumn = 'User Name'
obj.userTypeColumn = 'User Type'
obj.nameColumn = 'Name'
obj.patientIDColumn = 'ID'
obj.patientIDAndModalityColumn = 'PatientID/Modality'
obj.studyName = 'StudyName'
obj.contourType = 'Type'


//patient info
obj.defaultPatientGender = 'Male'

//for magic number or string
//obj.userMaxLength = 30
//obj.passMaxLength = 10
//obj.numberAndLetter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
//Note: ! and ^ has special meaning while passing to Keys as parameter,so need to write at the end of wrongInput
//obj.wrongInput = '@#$%&* ()-_=+.`,<>/?\'\"[]{}\\|~^!'
//obj.spaceString = ' '
//obj.configFileSuffix = '.cfg'
obj.notFoundIndex = -1
obj.emptyString = ''
obj.zero = 0

//Dirty Data
obj.addContourLib = 'contourLib'
obj.addPatient = 'patient'
obj.addUser = 'user'
obj.addMachine = 'machine'
//obj.addContourPlanLib = 'addContourPlanLib'
//obj.addTreatCourse = 'addTreatCourse'
//obj.addPlan = 'addPlan'


//PixelTolerance
obj.pixelTolerance = 200

//C:\Users\TPS-Server\Documents\TestComplete 12 Projects\TPS\IndelPlanHead\
//export test report
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

//email related
obj.toAddress = "bin.meng@ourunited.com"
obj.fromHost = "smtp.ourunited.com"
obj.fromName = "孟斌"
//just a fake address
obj.fromAddress = "automation@ouruited.com"
obj.subject = "IndelPlanHead Test Report"
obj.body= "This email was sending by IndelPlanHead Automation Testing Project"

//JIRA related
obj.JIRA_location = "http://192.168.90.179:8080/"
obj.JIRA_account = "bin.meng"
obj.JIRA_password = "123456"
obj.JIRA_project_key = "TEST"
obj.JIRA_issue_type = "Defect"

module.exports.obj = obj