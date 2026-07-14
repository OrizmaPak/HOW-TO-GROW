<?php
session_start();

$displayhtml = '';
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>SELECT PAYMENT CHANNEL</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form id="selectpaymentchannelform">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label>Payment Channel</label>';
$displayhtml .= '<div style="display:flex;gap:25px;align-items:center;margin-top:12px;">';
$displayhtml .= '<label style="display:flex;gap:8px;align-items:center;cursor:pointer;">';
$displayhtml .= '<input type="radio" name="channel" id="selectpaymentchannelpaystack" value="Paystack"> Paystack';
$displayhtml .= '</label>';
$displayhtml .= '<label style="display:flex;gap:8px;align-items:center;cursor:pointer;">';
$displayhtml .= '<input type="radio" name="channel" id="selectpaymentchannelflutterwave" value="Flutterwave"> Flutterwave';
$displayhtml .= '</label>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<div class="wrapbtn" style="justify-content:flex-end">';
$displayhtml .= '<button type="button" class="createbranchbtn btn btnmedium btnblue mb" id="selectpaymentchannelsubmitbtn">Submit</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>
