const globalConstant = require("global_constant")
const indel = {}

const __initMap = (map) => {
  map.set(globalConstant.obj.addContourLib, [])
  map.set(globalConstant.obj.addPatient, [])
  map.set(globalConstant.obj.addUser, [])
  map.set(globalConstant.obj.addMachine, []) 
  return map
}



const __calculateRunningTestItems = () =>{
  let count = 0

  const __doCalculateRunningTestItems  = testItem => {
    if (testItem.ElementToBeRun && testItem.Enabled) {
      count++
    } else {
      if (testItem.Enabled) {   
        for (let i = 0; i < testItem.ItemCount; i++) {
          __doCalculateRunningTestItems(testItem.TestItem(i))
        }
      }
    }
  }

  for (let i = 0; i < Project.TestItems.ItemCount; i++) {
    __doCalculateRunningTestItems(Project.TestItems.TestItem(i))
  }
  
  return count
}

const initUI = () => {
  //clear test data
  indel.dirtyData = __initMap(new Map())
  
  //check if is last running testItem
  indel.maxRunningItem = __calculateRunningTestItems()
  indel.currentRunningItem = 0

  indel.procesName = 'IndelPlanV2.0'
  const mainProcess = Aliases.IndelPlanV2_0
  
  //login
  indel.loginClass = mainProcess.login
  indel.login_noninput_popup = mainProcess.login_noninput_popup
  indel.login_wrong_username_popup = mainProcess.login_wrong_username_popup
  indel.login_wrong_password_popup = mainProcess.login_wrong_password_popup
  
  //main
  //patientmanagement
  indel.main = mainProcess.main
  indel.main_quit_popup = mainProcess.main_quit_popup
  indel.centralWidget = indel.main.centralWidget
  indel.tabWidget = indel.centralWidget.tabWidget
  
  const PatientManagementWidget = indel.centralWidget.stackedWidget.page.PatientManagementWidget
  indel.patientManagement = PatientManagementWidget.PatientManagement
  
  
  //patient export/import on the right top corner 
  indel.patient_dlgSelectImportPath =mainProcess.patient_dlgSelectImportPath
  indel.patient_DlgImportClass = mainProcess.patient_DlgImportClass
  indel.patient_DlgExportClass = mainProcess.patient_DlgExportClass
  indel.patient_export_done_popup = mainProcess.patient_export_done_popup
  indel.patient_export_error_popup = mainProcess.patient_export_error_popup
  indel.patient_import_done_popup = mainProcess.patient_import_done_popup
  indel.patient_import_error_popup = mainProcess.patient_import_error_popup
  
  
  //user_management
  indel.user_management = mainProcess.user_management
  indel.user_newusercClass = mainProcess.user_newusercClass
  indel.user_exists_popup = mainProcess.user_exists_popup
  indel.user_delete_popup = mainProcess.user_delete_popup
  indel.user_wrongpassword_popup = mainProcess.user_wrongpassword_popup
  indel.user_nullpassword_popup = mainProcess.user_nullpassword_popup
  indel.login_nonnormal_popup = mainProcess.login_nonnormal_popup
  indel.login_loggedin_popup = mainProcess.login_loggedin_popup
  indel.login_ReloadClass = mainProcess.login_ReloadClass

  
  indel.user_information = mainProcess.user_information
  
  //patient
  indel.patient_update_popup = mainProcess.patient_update_popup
  //same as delete current user popup
  indel.patient_delete_nochoice_popup = mainProcess.patient_delete_nochoice_popup
  indel.patient_newpatientClass = mainProcess.patient_newpatientClass
  indel.patient_delete_popup = mainProcess.patient_delete_popup
  indel.patient_exists_popup = mainProcess.patient_exists_popup
  indel.patient_no_name_or_id_popup = mainProcess.patient_no_name_or_id_popup
    
  //patient detail
  indel.patientDataClass = PatientManagementWidget.PatientDataClass
  indel.detail_function_need_two_study_popup = mainProcess.detail_function_need_two_study_popup
  indel.detail_function_two_same_study_popup = mainProcess.detail_function_two_same_study_popup
  indel.detail_study_delete_popup = mainProcess.detail_study_delete_popup
  
  //TreatCourse
  indel.detail_tc_TreatcourseAddClass = mainProcess.detail_tc_TreatcourseAddClass
  indel.detail_tc_no_set_no_bodypart_popup = mainProcess.detail_tc_no_set_no_bodypart_popup
  indel.detail_tc_addplan_no_contour_or_study_popup = mainProcess.detail_tc_addplan_no_contour_or_study_popup
  indel.detail_tc_no_selected_popup = mainProcess.detail_tc_no_selected_popup
  indel.detail_tc_no_treatcourse_selected_popup = mainProcess.detail_tc_no_treatcourse_selected_popup
  indel.detail_plan_PlanAddClass = mainProcess.detail_plan_PlanAddClass
  indel.detail_tc_addplan_no_selected_contour_popup = mainProcess.detail_tc_addplan_no_selected_contour_popup
  indel.detail_tc_addplan_no_selected_skin_contour_popup = mainProcess.detail_tc_addplan_no_selected_skin_contour_popup
  indel.detail_tc_addplan_no_selected_target_contour_popup = mainProcess.detail_tc_addplan_no_selected_target_contour_popup
  indel.detail_tc_delete_tc_in_use_popup = mainProcess.detail_tc_delete_tc_in_use_popup
  indel.detail_tc_delete_plan_popup = mainProcess.detail_tc_delete_plan_popup
  indel.detail_tc_delete_tc_popup = mainProcess.detail_tc_delete_tc_popup
  indel.detail_tc_no_copy_plan_selected_popup = mainProcess.detail_tc_no_copy_plan_selected_popup
  indel.detail_tc_copy_plan_popup = mainProcess.detail_tc_copy_plan_popup
      
  //import
  indel.import_GamaImporterClass = mainProcess.import_GamaImporterClass 
  indel.import_not_register_popup = mainProcess.import_not_register_popup
  indel.import_close_popup = mainProcess.import_close_popup
  indel.import_reimport_popup = mainProcess.import_reimport_popup
  indel.import_delete_all_popup = mainProcess.import_delete_all_popup
  indel.import_delete_patient_popup = mainProcess.import_delete_patient_popup
  indel.import_delete_series_popup = mainProcess.import_delete_series_popup
  indel.import_delete_not_selected_popup = mainProcess.import_delete_not_selected_popup
  indel.import_load_not_selected_popup = mainProcess.import_load_not_selected_popup
  indel.import_extract_not_import_popup = mainProcess.import_extract_not_import_popup
  indel.import_extract_can_not_locate_frame_popup = mainProcess.import_extract_can_not_locate_frame_popup
  indel.import_extract_head_axial_popup = mainProcess.import_extract_head_axial_popup
  indel.import_extract_unsupported_dicom_series_popup = mainProcess.import_extract_unsupported_dicom_series_popup
  indel.import_register_popup = mainProcess.import_register_popup
  indel.import_save_collision_detection_popup = mainProcess.import_save_collision_detection_popup
  indel.import_save_ct_popup = mainProcess.import_save_ct_popup
  indel.import_save_inform_confirm_popup = mainProcess.import_save_inform_confirm_popup
  indel.import_save_successfully_popup = mainProcess.import_save_successfully_popup
  indel.import_save_out_of_size_popup = mainProcess.import_save_out_of_size_popup
  
  indel.import_CDeviationTableDlg = mainProcess.import_CDeviationTableDlg
  
  //contour
  indel.ContourGUIClass = indel.centralWidget.stackedWidget.ContourGUIClass
  indel.contour_no_study_exist_popup = mainProcess.contour_no_study_exist_popup
  indel.contour_no_skin_type_contour_exist_popup = mainProcess.contour_no_skin_type_contour_exist_popup
  indel.contour_skin_not_complete_popup = mainProcess.contour_skin_not_complete_popup
  indel.contour_choose_patient_first_popup = mainProcess.contour_choose_patient_first_popup
  indel.contour_auto_sketch_no_choose_popup = mainProcess.contour_auto_sketch_no_choose_popup
  indel.contour_draw_skin_first_popup = mainProcess.contour_draw_skin_first_popup
  indel.contour_planlib_remove_empty_contour_popup = mainProcess.contour_planlib_remove_empty_contour_popup
  indel.contour_delete_planlib_popup = mainProcess.contour_delete_planlib_popup
  indel.contour_draw_out_of_skin_popup = mainProcess.contour_draw_out_of_skin_popup
  indel.contour_draw_interpolate_two_layer_popup = mainProcess.contour_draw_interpolate_two_layer_popup
  indel.contour_draw_interpolate_layer_between_popup = mainProcess.contour_draw_interpolate_layer_between_popup
  
  //contourLib
  indel.contour_DlgContourItemClass = mainProcess.contour_DlgContourItemClass
  indel.contour_lib_exist_popup = mainProcess.contour_lib_exist_popup
  indel.contour_planlib_exist_popup = mainProcess.contour_planlib_exist_popup
  //two Edit and isoPick
  indel.contour_edit_and_iso_no_choose_popup = mainProcess.contour_edit_and_iso_no_choose_popup
  //Load、Upload、Stat
  indel.contour_load_upload_stat_no_choose_popup = mainProcess.contour_load_upload_stat_no_choose_popup
  
  //plan
  indel.PlanGUI = indel.centralWidget.stackedWidget.PlanGUI
  indel.plan_start_plan_module_popup = mainProcess.plan_start_plan_module_popup
  indel.plan_current_plan_finished_popup = mainProcess.plan_current_plan_finished_popup
  indel.plan_PlanListClass = mainProcess.plan_PlanListClass
  indel.plan_no_focus_popup = mainProcess.plan_no_focus_popup
  indel.plan_do_fine_calculate_popup = mainProcess.plan_do_fine_calculate_popup
  indel.plan_no_set_popup = mainProcess.plan_no_set_popup
  indel.plan_no_finished_popup = mainProcess.plan_no_finished_popup
  indel.plan_confirm_focus_popup = mainProcess.plan_confirm_focus_popup
  indel.plan_add_not_ct_popup = mainProcess.plan_add_not_ct_popup
  
  //fraction
  indel.plan_dlgfractionClass = mainProcess.plan_dlgfractionClass
  
  //plan confirm  
  indel.plan_plandlgConformClass = mainProcess.plan_plandlgConformClass
  indel.plan_confirm_AuthorityCheckDlgClass = mainProcess.plan_confirm_AuthorityCheckDlgClass
  indel.plan_confirm_no_user_popup = mainProcess.plan_confirm_no_user_popup
  indel.plan_confirm_wrong_password_popup = mainProcess.plan_confirm_wrong_password_popup
  indel.plan_confirmed_popup = mainProcess.plan_confirmed_popup

  //settings
  indel.system_systemsettingsClass = mainProcess.system_systemsettingsClass

  //Physical Data
  indel.machine_managementClass = mainProcess.machine_managementClass
  indel.machine_addmachineClass = mainProcess.machine_addmachineClass
  indel.machine_addmachinedetailClass = mainProcess.machine_addmachinedetailClass
  indel.machine_less_TMR_popup = mainProcess.machine_less_TMR_popup
  indel.machine_less_OAR_popup = mainProcess.machine_less_OAR_popup
  indel.machine_add_confirm_popup = mainProcess.machine_add_confirm_popup
  indel.machine_exists_popup = mainProcess.machine_exists_popup
  indel.machine_PhyDataChangeViewerClass = mainProcess.machine_PhyDataChangeViewerClass
  indel.machine_delete_popup = mainProcess.machine_delete_popup
  indel.machine_delete_default_popup = mainProcess.machine_delete_default_popup
  indel.machine_delete_used_plan_popup = mainProcess.machine_delete_used_plan_popup
  indel.machine_import_exists_popup = mainProcess.machine_import_exists_popup
  indel.machine_set_current_popup = mainProcess.machine_set_current_popup
  indel.machine_edit_popup = mainProcess.machine_edit_popup
  //indel.dlgImportConfigs = mainProcess.dlgImportConfigs
  
  return indel
}

const getUI = () => indel



module.exports.initUI = initUI