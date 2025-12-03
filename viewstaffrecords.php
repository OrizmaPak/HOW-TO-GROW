<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">VIEW STAFF RECORDS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<p class="bold">Add Staff Records</p>';
$displayhtml .= '<hr class="hrline">';
$displayhtml .= '<div class="vsrtablebodyadd mbb">';
$displayhtml .= '<input type="text" class="centerede" placeholder="Staff Names">';
$displayhtml .= "<input type='text' class='centerede' placeholder='1st Guarantor's Names>";
$displayhtml .= "<input type='text' class='centerede' placeholder='1st Guarantor's Address>";
$displayhtml .= "<input type='text' class='centerede' placeholder='1st Guarantor's Occupation>";
$displayhtml .= '<p><span class="orebtnedadd">Add</span><span class="orebtndelte hidden">delete</span></p>';
$displayhtml .= '</div>';
$displayhtml .= '<p class="bold">View Staff Records</p>';
$displayhtml .= '<hr class="hrline">';
$displayhtml .= '<div class="vsrcontainer">';
$displayhtml .= '<div class="vsrtableheader">';
$displayhtml .= '<p>Staff Names</p>';
$displayhtml .= "<p>1st Guarantor's Names</p>";
$displayhtml .= "<p>1st Guarantor's Address</p>";
$displayhtml .= "<p>1st Guarantor's Occupation</p>";
$displayhtml .= '<p>actions</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="vsrtablebodycontainer">';
$displayhtml .= '<div class="vsrtablebody">';
$displayhtml .= '<input type="text" disabled class="centerede" value="Staff Names">';
$displayhtml .= "<input type='text' disabled class='centerede' value='1st Guarantor's Names'>";
$displayhtml .= "<input type='text' disabled class='centerede' value='1st Guarantor's Address'>";
$displayhtml .= "<input type='text' disabled class='centerede' value='1st Guarantor's Occupation'>";
$displayhtml .= '<p><span class="orebtnedit">edit</span><span class="orebtndelte">delete</span></p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>