<?php
session_start();

$displayhtml .= '<div>';
$displayhtml .= '<div class="formcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5> <i class="fa-solid fa-key"></i>';
$displayhtml .= 'CHANGE PASSWORD</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form>';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="oldpassword">Old Password:</label>';
$displayhtml .= '<input type="password" id="oldpassword" placeholder="Enter Old Password" autocomplete="" class="password">';
$displayhtml .= '<button type="button" class="passwordbtn iconbtns btnicon ">';
$displayhtml .= '<i class="fa-solid fa-eye hide"></i>';
$displayhtml .= '<i class="fa-solid fa-eye-slash"></i>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="newpassword">Enter New Password:</label>';
$displayhtml .= '<input type="password" id="newpassword" placeholder="Enter New Password" autocomplete="" class="password">';
$displayhtml .= '<button class="passwordbtn iconbtns btnicon">';
$displayhtml .= '<i class="fa-solid fa-eye hide"></i>';
$displayhtml .= '<i class="fa-solid fa-eye-slash"></i>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="confirmpassword">Confirm Password:</label>';
$displayhtml .= '<input type="password" id="confirmpassword" placeholder="Confirm Password" autocomplete="" class="password">';
$displayhtml .= '<button class="passwordbtn  iconbtns btnicon">';
$displayhtml .= '<i class="fa-solid fa-eye hide"></i>';
$displayhtml .= '<i class="fa-solid fa-eye-slash"></i>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="btns btncenter">';
$displayhtml .= '<button type="submit" class="btn btnsizetwo btnred">Reset <i class="fa-solid fa-arrows-rotate"></i></button>';
$displayhtml .= '<button type="submit" class="btn btnsizetwo btnblue">Submit';
$displayhtml .= '<i class="fa-regular fa-floppy-disk"></i>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= $displayhtml;
  
  echo $displayhtml;
  
?>