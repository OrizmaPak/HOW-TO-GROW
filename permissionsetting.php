<?php
session_start();
if(!isset($_SESSION["user_id"]) || !isset($_SESSION["user_id"]))
{
	header('Location: login.php');
}
if($_SESSION["role"] !== "SUPERADMIN"){
    header('Location: index.php');
}
$displayhtml .= '<div id="permissiion-container">';
$displayhtml .= '<div class="prm-subcontainer">';
$displayhtml .= '<div id="prm-btnscreen">';
$displayhtml .= '<!-- <a id="p1" class="hidden" href="#prm-contentscreen"></a> -->';
$displayhtml .= '<div id="prm-card" class="prm-modal">';
$displayhtml .= '<div class="prm-section1">';
$displayhtml .= '<h2>User Permission Setting</h2>';
$displayhtml .= '<p>set permission for specific user --></p>';
$displayhtml .= '</div>';
$displayhtml .= '<img class="prm-section2" src="../images/key.png">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="prm-contentscreen">';
$displayhtml .= '<!-- <a id="p2" class="hidden" href="#prm-btnscreen">krerlldkf</a> -->';
$displayhtml .= '<div class="prmtoplayer">';
$displayhtml .= '<!-- <div class="prminstrucbackcontainer"> -->';
$displayhtml .= '<div class="prmbackbtncontainer">';
$displayhtml .= '<div id="prm-bckbtn" class="prmbackbtn">';
$displayhtml .= '<img src="../images/greater-than-solid.svg" alt="">';
$displayhtml .= '<p>Back</p>';
$displayhtml .= '</div>';
$displayhtml .= '<p class="prmtoplayerheader formheader">SET USER PERMISSION</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="prminstruction">';
$displayhtml .= '<p class="prminstructheasder">Instructions:</p>';
$displayhtml .= '<p class="prminstructp">1. Select a user from the dropdown menu</p>';
$displayhtml .= '<p class="prminstructp">2. Turn ON/OFF specific permission for user</p>';
$displayhtml .= '<p class="prminstructp">3. Click on save to apply changes</p>';
$displayhtml .= '</div>';
$displayhtml .= '<!-- </div> -->';
$displayhtml .= '<div id="prmmaincontent" class="">';
$displayhtml .= '<div  class="prmselectcontainer">';
$displayhtml .= '<p id="test" class="prminstructpp">Select a user to view and set permissions:</p>';
$displayhtml .= '<div class="prmselectsubcontainer">';
$displayhtml .= '<div class="prmselectselectcontain">';
$displayhtml .= '<input type="text" value="" readonly id="permlocation" Placeholder="LOCATION" style="border-radius: 10px;border: 1px solid #5f5f5f;"/>';
$displayhtml .= '<select id="perm_role">
                    <option value="">--select role--</option> 
                    <option>ADMIN</option>  
                    <option>STAFF</option> 
                    <option value="SUPERADMIN">SUPER ADMIN</option> 
                </select>'; 
$displayhtml .= '<select id="platform">
                    <option value="">--select platform--</option>
                    <option>WEB</option>
                    <option>MOBILE</option>
                </select>';
$displayhtml .= '<input type="text" id="perm_user" class="hidden" /><input type="text" id="perm_user-11" list="datastaff" onchange="cvwd(this)"/>';
// $displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="oreleftcontainer">';
$displayhtml .= '<div id="permset_save" class="orerbtn sysblue hidden">Save</div>';
$displayhtml .= '</div>';
// $displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmswitchcontainer"  style="margin-bottom: 400px">'; 
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_activatedata">';
// $displayhtml .= '<p class="prmitemheader subheader2">ADMINISTRATION</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="prmitemcontainer" id="permset_administration">';
// $displayhtml .= '<p class="prmitemheader subheader2">ADMINISTRATION</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="prmitemcontainer" id="permset_administration">';
// $displayhtml .= '<p class="prmitemheader subheader2">ADMINISTRATION</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_inventory">';
// $displayhtml .= '<p class="prmitemheader subheader2">INVENTORY</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_customer">';
// $displayhtml .= '<p class="prmitemheader subheader2">SAVINGS</p>';
$displayhtml .= '</div>';
$displayhtml .= ''; 
$displayhtml .= '<div class="prmitemcontainer" id="permset_savings">';
// $displayhtml .= '<p class="prmitemheader subheader2">SAVINGS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_property">';
// $displayhtml .= '<p class="prmitemheader subheader2">PROPERTY</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_loans">';
// $displayhtml .= '<p class="prmitemheader subheader2">LOANS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_transactions">';
// $displayhtml .= '<p class="prmitemheader subheader2">TRANSACTIONS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_PersonnelPayroll">';
// $displayhtml .= '<p class="prmitemheader subheader2">PERSONNEL & PAYROLL</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_accounts">';
// $displayhtml .= '<p class="prmitemheader subheader2">ACCOUNTS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_otherreports">';
// $displayhtml .= '<p class="prmitemheader subheader2">OTHER REPORTS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="prmitemcontainer" id="permset_other">';
// $displayhtml .= '<p class="prmitemheader subheader2">OTHER REPORTS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div><datalist id="datastaff"><datalist>';

echo  $displayhtml;
?>