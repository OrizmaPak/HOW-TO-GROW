<?php
session_start();

$displayhtml .= '<div class="formcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>BRANCH SELECTION</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="branch"> Select Branch</label>';
$displayhtml .= '<select name="branch"  id="mbranch" class="mbranch">';
$displayhtml .='</select>';
$displayhtml .= '</div>';

$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" class="btnmedium btn btnblue" id="matbranchselectionsubmitbtn">';
$displayhtml .= 'Submit';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';

echo $displayhtml;
?>