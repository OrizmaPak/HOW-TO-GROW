<?php
session_start();

$displayhtml .=  '<div class="formcontainer overflowcontainer">';
$displayhtml .=  '<div class="formheader">';
$displayhtml .=  '<h5>RENEWAL/REPLACEMENT OF BOOKLET</h5>'; 
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formmain">';
$displayhtml .=  ''; 

$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="enteraccountno">Enter Account Number</label>';
$displayhtml .= '<input type="number" list="accounterlist" name="enteraccountno" id="mataccountnumber" 
onfocusout="mataccoutnumberchecker(this.value, document.getElementById(\'displayfetchname\'), this)">';
$displayhtml .=  '</div><datalist id="accounterlist"></datalist>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label class="matgreenlabel" for="accountname">Account Name</label>';
$displayhtml .=  '<p  id="displayfetchname"></p>';
$displayhtml .=  '</div>'; 

$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="marketer">Marketer</label>';
// Input field with datalist
$displayhtml .=  '<input list="marketer-list" name="marketer_name" id="matmarketer" autocomplete="off" placeholder="Select or type marketer">';
// Datalist element
$displayhtml .=  '<datalist id="marketer-list">';
$displayhtml .=    '<option value=""></option>'; // Optional: Placeholder option
$displayhtml .=  '</datalist>';
// Hidden input to store marketer ID
$displayhtml .=  '<input type="hidden" name="marketer_id" id="matmarketer-id">';
$displayhtml .=  '</div>';


$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="actiontype">Action type</label>';
$displayhtml .=  '<select name="marketer" id="actiontype">';
$displayhtml .=  '<option value=""></option>';
$displayhtml .=  '<option>RENEWAL</option>';
$displayhtml .=  '<option>REPLACEMENT</option>';
$displayhtml .=  '</select>';
$displayhtml .=  '</div>';

$displayhtml .=  '<div class="split">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="transactiondate">Request Date</label>';
$displayhtml .=  '<input type="date" name="transctiondate" id="matrequestdate" >';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="branch">Branch</label>';
$displayhtml .=  '<select disabled name="branch" id="matbranch">';
$displayhtml .=  '<option value=""></option>';
$displayhtml .=  '</select>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '<div class="split">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="charge">Charge</label>';
$displayhtml .=  '<input type="text" name="charge" id="matcharge">';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="reason">Reason</label>';
$displayhtml .=  '<select name="reason" id="matreason">';
$displayhtml .=  '<option>LOST</option>';
$displayhtml .=  '<option>DAMAGED</option>';
$displayhtml .=  '<option>STOLEN</option>';
$displayhtml .=  '<option>EXHAUSTED</option>';
$displayhtml .=  '</select>';
$displayhtml .=  '<button class="sortarrow btnicon">';
$displayhtml .=  '<span>';
$displayhtml .=  '<img src="images/icons/sort-arrows.png" alt="" />';
$displayhtml .=  '</span>';
$displayhtml .=  '</button>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="split">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="charge">Serial Number Range from</label>';
$displayhtml .=  '<input type="number" name="charge" id="serialnumberfrom">';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="reason">Serial Number Range to</label>';
$displayhtml .=  '<input type="number" name="charge" id="serialnumberto">';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';

$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="pages">Pages</label>';
$displayhtml .=  '<input type="number" name="pages" id="matpages">';
$displayhtml .=  '</div>';

$displayhtml .=  '';
$displayhtml .=  '<div class="btns ">';
$displayhtml .=  '<button type="submit" class="btnmedium btn btnblue" id="matsubmitbtn">';
$displayhtml .=  'Submit';
$displayhtml .=  '</button>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';


$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> Account &nbsp Number </th>';
$displayhtml .= '<th> Request Date </th>';
$displayhtml .= '<th> Location </th>';
$displayhtml .= '<th> Pages</th>';
$displayhtml .= '<th> Reason</th>';
$displayhtml .= '<th> Marketers</th>';
$displayhtml .= '<th> Charges</th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="renewalreplacementofbooklettabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';


$displayhtml .=  '</div>';

echo $displayhtml;
?>
