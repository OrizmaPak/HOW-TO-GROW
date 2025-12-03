<?php
session_start();

$displayhtml .= '<div class="formcontainer" style="overflow: auto;height: 100vh">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>Group Name</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="groupname">Group Name</label>';
$displayhtml .= '<input type="text" id="matgroupname">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="location">Location</label>';
$displayhtml .= '<select  id="matgrouplocation" class="matgrouplocation">';
$displayhtml .='</select>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<input type="hidden"  class="id" id="matgroupnameid">';
$displayhtml .= '<input type="hidden"  class="status" id="matgroupnamestatus">';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" class="btnmedium btn btnblue" id="matgroupnamesubmitbtn">';
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
$displayhtml .= '<th> Group Name </th>';
$displayhtml .= '<th> Location </th>';
$displayhtml .= '<th> Action </th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="groupnametabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';

$displayhtml .= '</div>';

echo $displayhtml;
?>