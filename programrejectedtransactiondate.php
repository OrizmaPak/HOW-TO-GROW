<?php
session_start();

$displayhtml .=  '<div class="formcontainer overflowcontainer">';
$displayhtml .=  '<div class="formheader">';
$displayhtml .=  '<h5>PROGRAM REJECTED TRANSACTION DATE </h5>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formmain">';
$displayhtml .=  '';
$displayhtml .=  '<form action="">';
// $displayhtml .=  '<div class="split">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="rejectdtransactiondate">Select Rejected Transaction Date</label>';
$displayhtml .=  '<input type="date" name="rejectedtrantiondate" class="matrejectedtransactiondate" id="matrejectedtransactiondate">';
$displayhtml .=  '</div>';

$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="locations">Branch</label>';
$displayhtml .=  '<select name="location" id="matrejectedtransactiondatelocations">';

$displayhtml .= '</select>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="sameline">';
$displayhtml .=  '<div class="btns ">';
// $displayhtml .=  '<button type="button" class="btnmedium btn btnblue" id="matrejectedtransactiondateresetbtn">';
// $displayhtml .=  'Reset';
// $displayhtml .=  '</button>';
$displayhtml .=  '<button type="button" class="btnmedium btn btnblue" id="matrejectedtransactiondatesubmitbtn">';
$displayhtml .=  'Submit';
$displayhtml .=  '</button>';
$displayhtml .=  '<button type="button" class="btnmedium btn " style="background: red" id="matrejectedtransactiondatesubmitbtnblock">';
$displayhtml .=  'Block all Locations';
$displayhtml .=  '</button>';
$displayhtml .=  '<button type="button" class="btnmedium btn " style="background: green" id="matrejectedtransactiondatesubmitbtnunblock">';
$displayhtml .=  'Unblock all Locations';
$displayhtml .=  '</button>';
// $displayhtml .=  '<button type="button" class="btnmedium btn btnblue" id="matrejectedtransactiondateupdatebtn">';
// $displayhtml .=  'Update';
// $displayhtml .=  '</button>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';

// $displayhtml .=  '</div>';

$displayhtml .=  '</div>';
$displayhtml .=  '</form>';
$displayhtml .=  '</div>';


$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> Reject&nbsp;Transaction &nbsp Date </th>';

$displayhtml .= '<th> Location </th>';
$displayhtml .= '<th> Action </th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="rejectedtransactiondatetabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';


// $displayhtml .=  '<div class="matmodal matmodalhidde">';
// $displayhtml .=  '<div class="matmodaltext">';
// $displayhtml .=  '<div class="matmodal__header">';
// $displayhtml .=  '<strong class="matcancelmodal">X</strong>';
// $displayhtml .=  '</div>';
// $displayhtml .=  '<div class="matmodalbody">';
// $displayhtml .=  '<div class="formcontrol">';
// $displayhtml .=  '<label for="">Rejected Transaction Date</label>';
// $displayhtml .=  '<input type="text" name="modalrejectedtransactiondate" id="modalrejectedtreansactiondate" disabled>';
// $displayhtml .=  '</div>';
// $displayhtml .=  '<div class="formcontrol">';
// $displayhtml .=  '<label for="">Office Branch</label>';
// $displayhtml .=  '<input type="text" name="modalofficebranch" id="modalofficebranch" disabled>';
// $displayhtml .=  '</div>';
// $displayhtml .=  '<div class="formcontrol">';
// $displayhtml .=  '<label for="">Location</label>';
// $displayhtml .=  '<input type="text" name="modallocation" id="modallocation" disabled>';
// $displayhtml .=  '</div>';
// $displayhtml .=  '</div>';
// $displayhtml .=  '</div>';
// $displayhtml .=  '</div>';

$displayhtml .= '<button class="pagbtn" id="rejecttransactionprev">Prev</button>';
$displayhtml .= '<span id="rejecttransactionindexBtn"> </span>';
$displayhtml .= '<button class="pagbtn" id="rejecttransactionnext">Next</button>';

$displayhtml .=  '</div>';
$displayhtml .=  '</div>';

echo $displayhtml;
?>