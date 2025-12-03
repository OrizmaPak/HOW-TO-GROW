<?php
session_start();

$displayhtml .= '<div class="formcontainer"  style="overflow: auto;height: 100vh">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>DEPARTMENT</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
// $displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="department">Department</label>';
$displayhtml .= '<input type="text" name="department" id="matdepartment">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" class="btnmedium btn btnblue" id="matdepartmentsubmitbtn">';
$displayhtml .= 'Save';
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
$displayhtml .= '<th> Department </th>';
$displayhtml .= '<th> Action </th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="departmenttabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';

$displayhtml .= '</div>';

echo $displayhtml;
?>