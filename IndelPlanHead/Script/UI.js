const indelPlan = {}

const init = () => {
  const mappingName = NameMapping.Sys.IndelplanV2
  const GamaReg = NameMapping.Sys.GamaReg

  //Login
  indelPlan.login = mappingName.login
  indelPlan.login_noninput_popup = mappingName.login_noninput_popup
  indelPlan.login_wrong_username_popup = mappingName.login_wrong_username_popup
  indelPlan.login_wrong_password_popup = mappingName.login_wrong_password_popup
  

  //main (ContourGUIClass、PatientDataClass、PatientManagement、PlanGUI)
  indelPlan.main = mappingName.main
  indelPlan.centralWidget = indelPlan.main.centralWidget
  indelPlan.tabWidget = indelPlan.centralWidget.tabWidget
  

  //Common
  indelPlan.main_quit_popup = mappingName.main_quit_popup
  indelPlan.main_contour_choose_patient_first_popup = mappingName.main_contour_choose_patient_first_popup
  indelPlan.main_plan_start_plan_module_first_popup = mappingName.main_plan_start_plan_module_first_popup
  indelPlan.main_save_progress = mappingName.main_save_progress
  indelPlan.patient_update_popup = mappingName.patient_update_popup
  indelPlan.patient_update_fail_popup = mappingName.patient_update_fail_popup
  

  //Unnormal Window
  indelPlan.login_unnormal = mappingName.login_unnormal
  indelPlan.login_nonnormal_popup = mappingName.login_nonnormal_popup
  indelPlan.login_loggedin_popup = mappingName.login_loggedin_popup
  
  //common tool popup window
  indelPlan.common_capture_image = mappingName.common_capture_image
  
  
  //PatientManagement
  const patientManagementWidget = indelPlan.centralWidget.stackedWidget.page.PatientManagementWidget
  indelPlan.patientManagement = patientManagementWidget.PatientManagement
  //patient export/import on the right top corner 
  indelPlan.patient_dlgSelectImportPath =mappingName.patient_dlgSelectImportPath
  indelPlan.patient_importer = mappingName.patient_importer
  indelPlan.patient_exporter = mappingName.patient_exporter
  indelPlan.patient_export_done_popup = mappingName.patient_export_done_popup
  indelPlan.patient_export_error_popup = mappingName.patient_export_error_popup
  indelPlan.patient_import_done_popup = mappingName.patient_import_done_popup
  indelPlan.patient_import_error_popup = mappingName.patient_import_error_popup
  //New Patient Window
  indelPlan.patient_new_patient = mappingName.patient_new_patient
  indelPlan.patient_exists_popup = mappingName.patient_exists_popup
  indelPlan.patient_no_name_or_id_popup = mappingName.patient_no_name_or_id_popup 
  indelPlan.patient_delete_popup = mappingName.patient_delete_popup
  indelPlan.patient_delete_nochoice_popup = mappingName.patient_delete_nochoice_popup


  //PatientDataClass
  indelPlan.PatientData = patientManagementWidget.PatientData
  indelPlan.detail_fuse_more_studys_popup = mappingName.detail_fuse_more_studys_popup
  indelPlan.detail_push_controller_not_confirmed_popup = mappingName.detail_push_controller_not_confirmed_popup
  indelPlan.detail_push_controller_popup = mappingName.detail_push_controller_popup
  indelPlan.detail_push_controller_complete_popup = mappingName.detail_push_controller_complete_popup
  
  
  //Study Related
  indelPlan.detail_study_delete_popup = mappingName.detail_study_delete_popup
  indelPlan.detail_study_delete_inuse_popup = mappingName.detail_study_delete_inuse_popup

  
  //Contour Related   
  indelPlan.detail_contour_details = mappingName.detail_contour_details
  indelPlan.detail_contour_delete_popup = mappingName.detail_contour_delete_popup
   

  //TreatCourse Related
  indelPlan.detail_tc_new_treatcourse = mappingName.detail_tc_new_treatcourse
  indelPlan.detail_tc_addplan_no_contours_or_studys_popup = mappingName.detail_tc_addplan_no_contours_or_studys_popup
  indelPlan.detail_tc_no_item_selected_popup = mappingName.detail_tc_no_item_selected_popup
  indelPlan.detail_tc_no_tc_selected_popup = mappingName.detail_tc_no_tc_selected_popup
  indelPlan.detail_tc_new_plan = mappingName.detail_tc_new_plan
  indelPlan.detail_tc_addplan_no_selected_contour_popup = mappingName.detail_tc_addplan_no_selected_contour_popup
  indelPlan.detail_tc_addplan_no_selected_skin_popup = mappingName.detail_tc_addplan_no_selected_skin_popup
  indelPlan.detail_tc_addplan_no_selected_target_popup = mappingName.detail_tc_addplan_no_selected_target_popup
  indelPlan.detail_tc_addplan_skin_discontinuous_popup = mappingName.detail_tc_addplan_skin_discontinuous_popup
  indelPlan.detail_tc_delete_tc_inuse_popup = mappingName.detail_tc_delete_tc_inuse_popup
  indelPlan.detail_tc_delete_plan_popup = mappingName.detail_tc_delete_plan_popup
  indelPlan.detail_tc_delete_tc_popup = mappingName.detail_tc_delete_tc_popup
  indelPlan.detail_tc_no_plan_selected_popup = mappingName.detail_tc_no_plan_selected_popup
  indelPlan.detail_tc_copy_plan_popup = mappingName.detail_tc_copy_plan_popup
  indelPlan.detail_tc_addplan_not_ct_popup = mappingName.detail_tc_addplan_not_ct_popup  
  indelPlan.detail_tc_go_plandesign_popup = mappingName.detail_tc_go_plandesign_popup
  indelPlan.detail_tc_plan_info = mappingName.detail_tc_plan_info 
  
  
  //Register Study Window
  indelPlan.register_importer = mappingName.register_importer
  indelPlan.register_area = indelPlan.register_importer.stackedWidget.page_2.groupBox_0.tabWidget.qt_tabwidget_stackedwidget.tab
  //Auto Extract Progress
  indelPlan.register_auto_extract_progress = mappingName.register_auto_extract_progress
  //Export Study
  indelPlan.register_exporter = mappingName.register_exporter
  indelPlan.register_export_done_popup = mappingName.register_export_done_popup
  //Import Study
  indelPlan.register_import_QFileDialog = mappingName.register_import_QFileDialog
  indelPlan.register_save_not_register_popup = mappingName.register_save_not_register_popup
  indelPlan.register_close_popup = mappingName.register_close_popup
  indelPlan.register_overwrite_data_popup = mappingName.register_overwrite_data_popup
  indelPlan.register_import_error_popup = mappingName.register_import_error_popup
  indelPlan.register_delete_all_popup = mappingName.register_delete_all_popup
  indelPlan.register_delete_patient_popup = mappingName.register_delete_patient_popup
  indelPlan.register_delete_series_popup = mappingName.register_delete_series_popup
  indelPlan.register_delete_not_selected_popup = mappingName.register_delete_not_selected_popup
  indelPlan.register_selected_study_popup = mappingName.register_selected_study_popup
  indelPlan.register_less_slices_popup = mappingName.register_less_slices_popup
  indelPlan.register_save_collision_detection_popup = mappingName.register_save_collision_detection_popup
  indelPlan.register_save_ct_voxels_popup = mappingName.register_save_ct_voxels_popup
  indelPlan.register_save_confirm_popup = mappingName.register_save_confirm_popup
  indelPlan.register_save_done_popup = mappingName.register_save_done_popup
  //Deviation Window
  indelPlan.register_CDeviationTableDlg = mappingName.register_CDeviationTableDlg

  
  //ContourGUIClass
  indelPlan.ContourGUI = indelPlan.centralWidget.stackedWidget.ContourGUI
  indelPlan.contour_no_study_exist_popup = mappingName.contour_no_study_exist_popup
  indelPlan.contour_no_skin_type_contour_exist_popup = mappingName.contour_no_skin_type_contour_exist_popup
  indelPlan.contour_skin_not_complete_popup = mappingName.contour_skin_not_complete_popup
  indelPlan.contour_auto_sketch_popup = mappingName.contour_auto_sketch_popup
  indelPlan.contour_draw_skin_first_popup = mappingName.contour_draw_skin_first_popup
  //Draw then clear all contours
  indelPlan.contour_planlib_empty_contours_remove_popup = mappingName.contour_planlib_empty_contours_remove_popup
  indelPlan.contour_delete_planlib_popup = mappingName.contour_delete_planlib_popup
  indelPlan.contour_draw_out_of_skin_popup = mappingName.contour_draw_out_of_skin_popup
  indelPlan.contour_interpolate_atleast_two_layer_popup = mappingName.contour_interpolate_atleast_two_layer_popup


  //ContourLib
  indelPlan.contour_new_contourItem = mappingName.contour_new_contourItem
  indelPlan.contour_lib_exist_popup = mappingName.contour_lib_exist_popup
  indelPlan.contour_planlib_exist_popup = mappingName.contour_planlib_exist_popup
  //two Edit and isoPick
  indelPlan.contour_edit_and_isopick_no_choose_popup = mappingName.contour_edit_and_isopick_no_choose_popup
  //Load、Upload、Stat
  indelPlan.contour_load_upload_stat_no_choose_popup = mappingName.contour_load_upload_stat_no_choose_popup
  indelPlan.contour_stat_no_contour_data_popup = mappingName.contour_stat_no_contour_data_popup
  indelPlan.contour_stat_dialog = mappingName.contour_stat_dialog
  indelPlan.contour_copy_exceed_skin_popup = mappingName.contour_copy_exceed_skin_popup
  indelPlan.contour_select_color = mappingName.contour_select_color
  indelPlan.contour_iso_info = mappingName.contour_iso_info
  indelPlan.contour_logic_dialog = mappingName.contour_logic_dialog
  indelPlan.contour_logic_error_popup = mappingName.contour_logic_error_popup
  
  //Switch to Plandesign Popup PlanList Window
  indelPlan.plan_PlanList = mappingName.plan_PlanList
  

  //PlanGUI
  indelPlan.PlanGUI = indelPlan.centralWidget.stackedWidget.PlanGUI
  indelPlan.CPlanInforPanel = indelPlan.PlanGUI.widget.m_targetTabWidget.qt_tabwidget_stackedwidget.CPlanInforPanel
  indelPlan.plan_do_fine_dose_calculate_popup = mappingName.plan_do_fine_dose_calculate_popup
  indelPlan.plan_no_focus_detected_popup = mappingName.plan_no_focus_detected_popup
  indelPlan.plan_unfinished_popup = mappingName.plan_unfinished_popup
  indelPlan.plan_set_wrong_popup = mappingName.plan_set_wrong_popup
  indelPlan.plan_set_prescription_dose_popup = mappingName.plan_set_prescription_dose_popup
  indelPlan.plan_out_target_popup = mappingName.plan_out_target_popup
  
  //Fraction
  indelPlan.plan_dlgfraction = mappingName.plan_dlgfraction
  indelPlan.plan_finished_popup = mappingName.plan_finished_popup
  indelPlan.plan_not_used_focus_reordered_popup = mappingName.plan_not_used_focus_reordered_popup
  //Plan Confirm Window
  indelPlan.plan_confirm = mappingName.plan_confirm
  //plan EVA
  indelPlan.plan_eva = mappingName.plan_eva
  //Plan Sign Window
  indelPlan.plan_confirm_sign = mappingName.plan_confirm_sign  
  indelPlan.plan_confirm_wrong_user_popup = mappingName.plan_confirm_wrong_user_popup
  indelPlan.plan_confirm_wrong_password_popup = mappingName.plan_confirm_wrong_password_popup
  indelPlan.plan_confirmed_popup = mappingName.plan_confirmed_popup
  //plan report
  indelPlan.plan_report = mappingName.plan_report
  
  //plan DoseLineCfg
  indelPlan.plan_DlgdoselineClass = mappingName.plan_DlgdoselineClass
  
    
  //User Management
  indelPlan.user_management = mappingName.user_management
  indelPlan.user_new_user = mappingName.user_new_user
  indelPlan.user_exists_popup = mappingName.user_exists_popup
  indelPlan.user_delete_popup = mappingName.user_delete_popup
  indelPlan.user_null_password_popup = mappingName.user_null_password_popup
  indelPlan.user_null_name_popup = mappingName.user_null_name_popup
  indelPlan.user_delete_current_popup = mappingName.user_delete_current_popup
  indelPlan.user_incorrect_confirm_password_popup = mappingName.user_incorrect_confirm_password_popup
  //User Information window
  indelPlan.user_information = mappingName.user_information
  

  //Physical Data
  //System Settings

    
  //fuse
  indelPlan.fuse_GamaReg = GamaReg.GamaRegClass
  indelPlan.fuse_exit = GamaReg.exit
  indelPlan.fuse_setting = GamaReg.RegParaSetting
  indelPlan.fuse_popup = GamaReg.fuse_popup
  indelPlan.process_repeated_popup = GamaReg.process_repeated_popup
  
  return indelPlan
}

const getUI = () => indelPlan


module.exports.init = init