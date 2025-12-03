<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">CREATED CREATED</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="cacontainer">';
$displayhtml .= '<div class="catableheader">';
$displayhtml .= '<p>Accounts Names</p>';
$displayhtml .= '<p>Accounts Code</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="catablebody">';
$displayhtml .= '<p>Accounts Names</p>';
$displayhtml .= '<p>Accounts Code</p>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>