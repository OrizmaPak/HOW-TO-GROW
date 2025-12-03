<?php
session_start();
// include 'scripts/FunctionsPage.php';
// if (!isset($_SESSION["username"])) {
//   exit('<div class="d-flex justify-content-center" style="margin-top: 100px;">
//   <div class="w-75">
//     <div class="shadow p-2" style="background-color: #fb5656;">
//       <h6 class="text-center text-white"><i class="fa fa-exclamation-circle"></i> SESSION EXPIRED</h6>
//       <p class="text-center text-white">please Reload and Login or click <a class="text-white" href="login.php">here&nbsp;<i class="fa fa-sign-in text-white"></i></a></p>
//     </div>
//   </div>
// </div>');
// }
$displayhtml = '<div class="confirm-modal hide" id="glconfirm">
<div class="confirm-dialog">
<i class="fa fa-exclamation-triangle text-danger text-center fa-2x p-1"></i>
  <div class="confirm-title">
    <h6>Are you sure you want to perform this operation ?</h6>
  </div>
  <div class="confirm-actions hidden">
    <button onclick="closeConfirm()" class="reject-action"><i class="fa fa-times"></i>&nbsp;Cancel</button>
    <button onclick="closeConfirm()" class="accept-action" id="glconfirmbtn">Confirm&nbsp;<i class="fa fa-check"></i></button>
  </div>
</div>
</div>';
$displayhtml = $displayhtml .
"<div class='container-fluid'>
<h3 align='center' style='color:#003;'>GL ACCOUNT FORM</h3>
<div id='userdiv' name='savingsdiv'>
<div id='savingstable' name='savingstable'>
<div id='savingstable1' name='savingstable1'>
<div class='row shadow p-3 mb-3 rounded'>

<div class='col-lg-12'>";

$displayhtml .= "<h5 align='left' style='color:#003;'>Account Info</h5>
<hr width='90%' align='left' />";

$displayhtml .= "<div class='form-group'><label for='accountnumber'>Account Number&#58;</label>
<input type='text' id='accountnumber' name='accountnumber' class='form-control' title='Enter account number, Leave blank for new GL Account' placeholder='Account Number' />
</div>

<div class='oreconttain' align='right'>
<input type='button' class='btn btn-primary btn-m' id='retrievebutton' name='retrievebutton' value='Retrieve Account'
title='Enter account number and Location, then click retrieve to get account data' />
</div>";
$displayhtml .= "<div class='row'>";

$displayhtml .= "<div class='form-group col-md-6'><label for='groupname'>Group Name&#58;</label>
<input type='text' id='groupname' class='form-control' name='groupname' title='Enter group name for the account.' placeholder='Group Name' />
</div>";

$displayhtml .= "<div class='form-group col-md-6'><label for='accounttype'>Type Of Account&#58;</label>
<select id='accounttype' class='custom-select' name='accounttype' title='Select account type.'>
<option disabled selected='selected'>--Select&nbsp;Account Type--</option>
<option value='ASSET'>ASSET</option>
<option value='CASH'>CASH</option>
<option value='CURRENT ASSETS'>CURRENT ASSETS</option>
<option value='EXPENSE'>EXPENSE</option>
<option value='INCOME'>INCOME</option>
<option value='EQUITY RETAINED EARNINGS'>EQUITY RETAINED EARNINGS</option>
<option value='EQUITY DOES NOT CLOSE'>EQUITY DOES NOT CLOSE</option>
<option value='INVENTORY'>INVENTORY</option>
<option value='OTHER ASSET'>OTHER ASSET</option>
<option value='COST OF SALES'>COST OF SALES</option>
<option value='FIXED ASSET'>FIXED ASSET</option>
<option value='OTHER CURRENT ASSET'>OTHER CURRENT ASSET</option>
<option value='ACCOUNTS PAYABLE'>ACCOUNTS PAYABLE</option>
<option value='ACCOUNTS RECEIVABLE'>ACCOUNTS RECEIVABLE</option>
<option value='ACCUMULATED DEPRECIATION'>ACCUMULATED DEPRECIATION</option>
<option value='LIABILITIES'>LIABILITIES</option>
<option value='OTHER CURRENT LIABILITIES'>OTHER CURRENT LIABILITIES</option>
<option value='LONG TERM LIABILITIES'>LONG TERM LIABILITIES</option>
<option value='EQUITY'>EQUITY</option>
</select>
</div>";

$displayhtml .= "<div class='form-group col-md-12'><label for='description'>Description&#58;</label>
<input type='text' id='description' class='form-control' name='description' title='Enter account description' placeholder='Description' />
</div>";

$displayhtml .= "</div>";

$displayhtml .= "<div class='d-flex justify-content-center w-100'>
<input type='button' id='deleteglbutton' name='deleteglbutton' value='Delete'
class='btn btn-sm btn-danger w-25 mx-1' title='click to delete the data.' />

<input type='button' id='savebutton' name='savebutton' value='Save'
class='btn btn-sm btn-primary w-25 mx-1' title='click to save the data.' />

</div>";
$displayhtml .= "</div></div>";

//second table
// $displayhtml = $displayhtml . "<table id='savingstable2' name='savingstable2' cellspacing='0' cellpadding='0' border='0' style='width:395px;color:#003;font-family:tahoma,verdana;font-size:12px;font-weight:normal;'>";
// $displayhtml .= "<tr><td align='center' valign='bottom' style='width:395px;'>&nbsp</td></tr>";
// $displayhtml .= "<tr><td align='left' valign='bottom' style='width:395px;padding-bottom:20px'>";
// $displayhtml .= "&nbsp</td></tr>";
// $displayhtml .= "</table>";



// $displayhtml .= "</div></div></div></div>";
// $displayhtml .= "<script type='text/javascript'>";
// $displayhtml .= "</script>";
echo $displayhtml;