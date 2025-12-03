<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= "<h5>Transfer Cash to Bank</h5>";
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="" id="transfercashtobankform">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Bank</label>';
$displayhtml .= '<input type="text" class="stockledgdate" id="bank" name="bank" />';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Account Number</label>';
$displayhtml .= '<input type="number" class="stockledgdate" name="accountnumber"  id="accountnumber"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Account Name</label>';
$displayhtml .= '<input type="text" class="stockledgdate" name="accountname"  id="accountname"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Amount</label>';
$displayhtml .= '<input type="number" class="stockledgdate" id="amount" name="amount" onchange="checkcashieremail(this.value)"  />';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Transaction Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" name="transactiondate" readonly id="transactiondate"/>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Description</label>';
$displayhtml .= '<textarea class="stockledgdate" id="description" name="description"></textarea>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="submit">Submit</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';

$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="hidden" style="position: fixed; width: 100%; height: 100%;background: #151A1570;top:0;display: flex;justify-content: center; align-items:center">
                        <div style="width: 50%; min-width: 400px;height: 70%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
echo $displayhtml;
?>