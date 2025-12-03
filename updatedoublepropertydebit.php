<?php
session_start();

$displayhtml .= '<div id="updatedoublepropertydebit-container">';
$displayhtml .= '<div class="m">';
$displayhtml .= '<p class="oremainheader">UPDATE DOUBLE PROPERTY DEBIT</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="udpd-subcontainer">';
$displayhtml .= '<div class="udpd-section1">';
$displayhtml .= '<div class="udpds1holder">';
$displayhtml .= '<p>Select Branch</p>';
$displayhtml .= '<select id="">';
$displayhtml .= '<option>Location</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="udpds1holder">';
$displayhtml .= '<p>Date Control</p>';
$displayhtml .= '<input type="date">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="udpd-section2">';
$displayhtml .= '<div class="udpds2aholder">';
$displayhtml .= '<p>Select Items</p>';
$displayhtml .= '<select id="">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div  class="udpds2bholder">';
$displayhtml .= '<div class="">';
$displayhtml .= '<p>Account Number</p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '</div>';
$displayhtml .= '<div>';
$displayhtml .= '<p>Debit</p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '</div>';
$displayhtml .= '<div>';
$displayhtml .= '<p>Charge</p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="udpd-section3">';
$displayhtml .= '<div class="udpds3holder">';
$displayhtml .= '<div class="udpdbtn">Find Property</div>';
$displayhtml .= '<div class="udpdbtn">Find Provision</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="udpds3bholder">';
$displayhtml .= '<div class="udpdbtn">Update Property</div>';
$displayhtml .= '<div class="udpdbtn">Update Provision</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml
?>