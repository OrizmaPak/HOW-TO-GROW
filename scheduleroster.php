<?php
session_start();

$displayhtml .= '<div class="formcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>TASK SCHEDULE</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="branch">Branch</label>';
$displayhtml .= '<select name="branch"  id="taskschedulebranch" class="mbranch">';
$displayhtml .='</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">'; 
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="date">Entry Date</label>';
$displayhtml .= '<input type="date" name="date" id="taskscheduleentrydate">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="date">Expected Delivery Date</label>';
$displayhtml .= '<input type="date" name="date" id="taskscheduleexpectdeliverydate">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="item">Task</label>';
$displayhtml .= '<input type="text" name="item" id="taskscheduletask">';
$displayhtml .= '</div>';
// $displayhtml .= '<input type="hidden" name= "id" class="id" id="matdepartmentid">';
// $displayhtml .= '<input type="hidden" name = "status" class="status" id="matdepartmentstatus">';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" style="margin-top:50px" class="btnmedium btn btnblue" id="matschedulerostersubmitbtn">';
$displayhtml .= 'Submit';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';

echo $displayhtml;
?>