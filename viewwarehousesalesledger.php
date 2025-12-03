<?php
session_start();


$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>VIEW WAREHOUSE SALES LEDGER</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="accountno">Account Number</label>';
$displayhtml .= '<input type="number" class="accountno" id="mataccountno" name="accountno">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="transactiondate">Transaction Date</label>';
$displayhtml .= '<input type="date" class="transactiondate" id="mattransactiondate" name="transactiondate">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="companyaccountno">Company Account Number</label>';
$displayhtml .= '<input type="number" class="companyaccountno" id="matcompanyaccountno" name="companyaccountno">';
$displayhtml .= '</div>';


$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<div class=" wrapbtn ">';
$displayhtml .= '<button type="button" class="btnmedium btn btnblue mt mb " id="matviewbtn">';
$displayhtml .= 'Submit';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';



$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="split3">';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="totalcost">Total Cost</label>';
$displayhtml .= '<input type="number" name="totalcost" id="mattotalcost">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="totalpayment">Total Payment</label>';
$displayhtml .= '<input type="number" name="totalpayment" id="totalpayment">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="balance">Balance</label>';
$displayhtml .= '<input type="number" name="balance" id="balance">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '<!-- <div class="wrapper">';
$displayhtml .= '<h5>Total cost</h5>';
$displayhtml .= '<span class="showvalue totalquantity">13494940</span>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="wrapper">';
$displayhtml .= '<h5>Total payment</h5>';
$displayhtml .= '<span class="showvalue">9888576</span>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="wrapper">';
$displayhtml .= '<h5>Balance</h5>';
$displayhtml .= '<span class="showvalue">89668767</span>';
$displayhtml .= '</div> -->';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '';
$displayhtml .= '<div class="generaltableholder">';
$displayhtml .= '<table id="viewwarehousesalestable">';
$displayhtml .= '<tr class="fixedrow">';
$displayhtml .= '<th></th>';
$displayhtml .= '<th>Date</th>';
$displayhtml .= '<th>Account No</th>';
$displayhtml .= '<th>Users.......</th>';
$displayhtml .= '<th>Product</th>';
$displayhtml .= '<th>Cost</th>';
$displayhtml .= '<th>Payment</th>';
$displayhtml .= '<th>Balance</th>';
$displayhtml .= '<th>Mode</th>';
$displayhtml .= '<th>Bank</th>';
$displayhtml .= '</tr>';
$displayhtml .= '';
$displayhtml .= '<!-- <tr>';
$displayhtml .= '<td>1</td>';
$displayhtml .= '<td>22/09/2022</td>';
$displayhtml .= '<td>02456810345</td>';
$displayhtml .= '<td>NNEKA</td>';
$displayhtml .= '<td>BINATONE IRON SM605</td>';
$displayhtml .= '<td>6000.00</td>';
$displayhtml .= '<td>6000.00</td>';
$displayhtml .= '<td>0.00</td>';
$displayhtml .= '<td>CASH</td>';
$displayhtml .= '<td>First Bank</td>';
$displayhtml .= '</tr> -->';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';


echo $displayhtml;
?>