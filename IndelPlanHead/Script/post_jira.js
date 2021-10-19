const globalConstant = require("global_constant")

const __loginJIRA = () => {
  Jira.Login(globalConstant.obj.JIRA_location, globalConstant.obj.JIRA_account, globalConstant.obj.JIRA_password)
}

const __generatedJIRAData = bug => {
  return Jira.CreateNewIssueData(globalConstant.obj.JIRA_project_key, globalConstant.obj.JIRA_issue_type).
                setField("summary", "").
                setField("description", "").
                setFieldJSON("priority", '{"name":"Medium"}')
}

const __updateJIRAData = key => {
  const upPriorityJSON = '{"name":"High"}'
  const updateJiraData = Jira.CreateUpdateIssueData().setFieldJSON("priority", upPriorityJSON)
  Jira.UpdateIssue(key, updateJiraData)
}

//can not post ZIP attachment
const postToJIRA = bugs => {
  __loginJIRA()
  let jiraData = null, key
  jiraData = Jira.CreateNewIssueData(globalConstant.obj.JIRA_project_key, globalConstant.obj.JIRA_issue_type).
                setField("summary", "Created by automation").
                setField("description", "for testing description").
                setFieldJSON("priority", '{"name":"Medium"}')
  key = Jira.PostIssue(jiraData)
  if (key) {
    //Jira.PostAttachment(key, globalConstant.obj.packedResults + globalConstant.obj.compressedFileName + globalConstant.obj.separator + globalConstant.obj.compressedFileSuffix)
    Log.Message("Successfully push to JIRA")
  } else {
    Log.Message("Fail push to JIRA")
  }
}

module.exports.postToJIRA = postToJIRA
