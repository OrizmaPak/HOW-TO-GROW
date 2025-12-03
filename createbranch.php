
<?php
session_start();

$displayhtml .= '<div class="createbranchcontainer">';
$displayhtml .= '<div class="createbranchheader">';
$displayhtml .= '<h5>CREATE BRANCH</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol formcontrolcenter ">';
$displayhtml .= '<label for="createbranch">Branch Name</label>';
$displayhtml .= '<input type="text" name="createbranch" id="createbranch" class="createbranch">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="address">Address</label>';
$displayhtml .= '<input type="text" class="address" id="address">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<button class="createbranchbtn btn btnblue">Enter Branch </button>';
$displayhtml .= '';
$displayhtml .= '</form>';
$displayhtml .= '';
$displayhtml .= '<div class="branchescontainer">';
$displayhtml .= '<!-- <div class="branch">';
$displayhtml .= '<p class="branchname">Lagos island branch</p>';
$displayhtml .= '<div class="cancelbranch"><i class="fa-solid fa-xmark"></i></div>';
$displayhtml .= '</div> -->';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>