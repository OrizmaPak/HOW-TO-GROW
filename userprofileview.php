<?php
session_start();

$displayhtml .=  '<div class="formcontainer overflowcontainer">';
$displayhtml .=  '<!-- form main header -->';
$displayhtml .=  '<div class="formheader">';
$displayhtml .=  '<h5>USER PROFILE VIEW</h5>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formmain">';
$displayhtml .=  '<div class="profilepicturecenter">';
$displayhtml .=  '<div class="picturediv"><img src="/images/forto.jpg" alt=""></div>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="profilecontent">';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">Full Name</label>';
$displayhtml .=  '<p type="text" name="fullname" id="orefullname" class="fullname" style="text-transform:capitalize"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">E-mail</label>';
$displayhtml .=  '<p type="text" name="fullname" id="oreemail" class="fullname"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">Phone Number(s)</label>';
$displayhtml .=  '<p type="text" name="fullname" id="orephone" class="fullname"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">Contact Address</label>';
$displayhtml .=  '<p type="text" name="fullname" id="oreaddress" class="fullname" style="text-transform:capitalize"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">User Role</label>';
$displayhtml .=  '<p type="text" name="fullname" id="oreuserrole" class="fullname" style="text-transform:capitalize"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">Office Location</label>';
$displayhtml .=  '<p type="text" name="fullname" id="orelocation" class="fullname" style="text-transform:capitalize"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">Supervisor 1</label>';
$displayhtml .=  '<p type="text" name="fullname" id="oresupervisor1" class="fullname"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="profilecontrol">';
$displayhtml .=  '<label for="fullname">Supervisor 2</label>';
$displayhtml .=  '<p type="text" name="fullname" id="oresupervisor2" class="fullname"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';

echo $displayhtml;
?>

