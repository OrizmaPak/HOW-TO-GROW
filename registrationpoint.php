<?php
session_start();

$displayhtml .= '<div class="formcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>REGISTRATION POINT</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
// $displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="registrationpoint">Registration point</label>';
$displayhtml .= '<input type="text" name="registrationpoint" id="mregistrationpoint">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="branch">Branch</label>';
$displayhtml .= '<select  id="registrationpointbranch" >';
// $displayhtml .='<option  selected ></option>';
// $displayhtml .='<option  value="1">Head Office</option>';
// $displayhtml .='<option  value="2">Main market branch</option>';

$displayhtml .='</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '<input type="hidden" name= "id" class="id" id="matdepartmentid">';
// $displayhtml .= '<input type="hidden" name = "status" class="status" id="matdepartmentstatus">';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" class="btnmedium btn btnblue" id="btnSubmit">';
$displayhtml .= 'Submit';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';

$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> Registration &nbsp Point </th>';
$displayhtml .= '<th>  Branch </th>';

$displayhtml .= '<th> Action </th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="registrationpointtabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';

$displayhtml .= '</div>';

echo $displayhtml;
?>