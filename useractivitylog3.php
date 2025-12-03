<?php
session_start();

$displayhtml .= '<div id="useractivity-container">';
$displayhtml .= '<p class="useralheader formheader">USER ACTIVITY LOG</p>';
$displayhtml .= '<div class="useralinputcontainer">';
$displayhtml .= '<div class="userallablecontainer">';
$displayhtml .= '<p>User Name</p>';
$displayhtml .= '<select name="" id="useraluserselect">';
$displayhtml .= '<option value="">--Select User-- </option>';
$displayhtml .= '<option>dgfgdfgdfg </option>';
$displayhtml .= '<option>dgfgdfgdfg </option>';
$displayhtml .= '<option>dgfgdfgdfg </option>';
$displayhtml .= '<option>dgfgdfgdfg </option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="userallablecontainer">';
$displayhtml .= '<p>Start Date</p>';
$displayhtml .= '<input id="useraldateone" type="date">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="userallablecontainer">';
$displayhtml .= '<p>Start Date</p>';
$displayhtml .= '<input id="useraldatetwo" type="date">';
$displayhtml .= '</div>';
$displayhtml .= '<button id="useralviewbtn">View</button>';
$displayhtml .= '<button id="useralprintbtn">Print</button>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="useralscreen">';
$displayhtml .= '<p>User Activity</p>';
$displayhtml .= '<div id="useraldisplaycontent">';
// $displayhtml .= '<div class="useraldisplaycard">';
// $displayhtml .= '<p class="useralcardname">ADMIN ADMIN</p>';
// $displayhtml .= '<p class="useralcardloginstat">Successful login</p>';
// $displayhtml .= '<p class="useralcarddatetime">22-2-2022 22:22:22</p>';
// $displayhtml .= '<p class="useralcardtimeago">2 mins ago</p>';
// $displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';

echo $displayhtml 
?>