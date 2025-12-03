<?php
session_start();

$displayhtml .='<div class="formcontainer" style="overflow: auto;height: 100%">';
$displayhtml .='<div class="formheader">';
$displayhtml .='<h5>BRANCH SETUP</h5>';
$displayhtml .='</div>';
$displayhtml .='<div class="formmain ">';
$displayhtml .='<div class="split">';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="location">Location</label>';
$displayhtml .='<input type="text" name="location" id="matbranchsetuplocation">';
$displayhtml .='</div>';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="state">State</label>';
$displayhtml .='<input type="text" name="state" id="matbranchsetupstate">';
$displayhtml .='</div>';
$displayhtml .='</div>';
// $displayhtml .='<div class="split">';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="description">Description</label>';
$displayhtml .='<input type="text" name="description" id="matbranchsetupdescription">';
$displayhtml .='</div>';
$displayhtml .='';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="addres">Address</label>';
$displayhtml .='<input type="text" name="address" id="matbranchsetupaddress">';
$displayhtml .='</div>';
// $displayhtml .='</div>';

$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="accountno">Account Number</label>';
$displayhtml .='<input type="number" name="lastaccountno" id="matbranchsetupaccno">';
$displayhtml .='</div>';

$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="accountno">Cash Withdrawal Limit</label>';
$displayhtml .='<input type="number" name="cashwithdrawallimit" id="cashwithdrawallimit">';
$displayhtml .='</div>';

$displayhtml .='';
$displayhtml .='<div class="btns " style="margin-top: 45px;
    justify-content: flex-end;">';
$displayhtml .='<button type="submit" class="btnmedium btn btnblue hidden" id="matbranchsetupresetbtn">';
$displayhtml .='Reset';
$displayhtml .='</button>';
$displayhtml .='<button type="submit" class="btnmedium btn btnblue " id="matbranchsetupsubmitbtn">';
$displayhtml .='Save';
$displayhtml .='</button>';
$displayhtml .='<button type="submit" class="btnmedium btn btnblue hidden" id="matbranchsetupupdatebtn">';
$displayhtml .='Update Branch';
$displayhtml .='</button>';
$displayhtml .='</div>';
$displayhtml .='</div>';
$displayhtml .='';



$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> Location </th>';
$displayhtml .= '<th> State </th>';
$displayhtml .= '<th> Description </th>';
$displayhtml .= '<th> Address</th>';
$displayhtml .= '<th> Account &nbsp number</th>';
$displayhtml .= '<th> cash &nbsp withdrawal &nbsp limit</th>';
$displayhtml .= '<th> Action</th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="branchsetuptabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';


$displayhtml .=  '<div class="matmodal matmodalhidde">';
$displayhtml .=  '<div class="matmodaltext">';
$displayhtml .=  '<div class="matmodal__header">';
$displayhtml .=  '<strong class="matcancelmodal">X</strong>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="matmodalbody">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="">Location</label>';
$displayhtml .=  '<input type="text" name="modalrejectedtransactiondate" id="modallocation" disabled>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="">State</label>';
$displayhtml .=  '<input type="text" name="modalofficebranch" id="modalstate" disabled>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="">Description</label>';
$displayhtml .=  '<input type="text" name="modallocation" id="modallocation" disabled>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';


$displayhtml .='</div>';

echo $displayhtml;
?>
