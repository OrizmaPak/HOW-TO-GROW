
<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>Confirm/Collect Booklet</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="enteraccountnumber">Enter Account Number</label>';
$displayhtml .= '<input type="number" name="enteraccountnumber" id="enteraccountnumber" onfocusout="mataccoutnumberchecker(this.value, this.parentElement.parentElement.children[1].children[1], this)" >';
$displayhtml .= '</div>';

$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label class="matgreenlabel" for="accountname">Account Name</label>';
$displayhtml .=  '<p id="displayfetchname"></p>';
$displayhtml .=  '</div>';

$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button class=" btn btnmedium btnblue " id="matrenewalbookletgo">Confirm</button>';
$displayhtml .= '</div >';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> Account Number </th>';
$displayhtml .= '<th> Account Name </th>';
$displayhtml .= '<th> Action </th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="confirmbooklettabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';


$displayhtml .= '</div>';

echo $displayhtml;
?>
