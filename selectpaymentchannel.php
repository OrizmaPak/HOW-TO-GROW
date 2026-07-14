<?php
session_start();

$displayhtml = '';
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>SELECT PAYMENT CHANNEL</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form id="selectpaymentchannelform">';
$displayhtml .= '<style>
.payment-channel-shell{max-width:900px;margin:0 auto;padding:8px 0 20px}
.payment-channel-intro{margin:0 0 22px;color:#475569;font-size:14px;line-height:1.6}
.payment-channel-grid{display:grid;grid-template-columns:repeat(2,minmax(220px,1fr));gap:22px}
.payment-channel-option{position:relative;display:block;cursor:pointer}
.payment-channel-option input{position:absolute;opacity:0;pointer-events:none}
.payment-channel-card{position:relative;overflow:hidden;min-height:190px;border-radius:24px;padding:24px;border:2px solid transparent;box-shadow:0 18px 45px rgba(15,23,42,.14);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
.payment-channel-card:before{content:"";position:absolute;inset:-80px auto auto -80px;width:180px;height:180px;border-radius:999px;background:rgba(255,255,255,.25)}
.payment-channel-card:after{content:"";position:absolute;right:-55px;bottom:-70px;width:180px;height:180px;border-radius:999px;background:rgba(255,255,255,.18)}
.payment-channel-option:hover .payment-channel-card{transform:translateY(-4px);box-shadow:0 22px 55px rgba(15,23,42,.22)}
.payment-channel-option input:checked + .payment-channel-card{border-color:#ffffff;box-shadow:0 0 0 4px rgba(37,99,235,.18),0 22px 55px rgba(15,23,42,.24)}
.payment-channel-card.paystack{background:linear-gradient(135deg,#032d60 0%,#0867d6 50%,#00c3ff 100%);color:#fff}
.payment-channel-card.flutterwave{background:linear-gradient(135deg,#24120a 0%,#f5a400 50%,#ff6b00 100%);color:#fff}
.payment-channel-top{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.payment-channel-logo{display:flex;align-items:center;justify-content:center;width:62px;height:62px;border-radius:20px;background:rgba(255,255,255,.94);color:#0f172a;font-weight:900;font-size:22px;letter-spacing:-1px;box-shadow:0 10px 25px rgba(15,23,42,.2)}
.payment-channel-status{width:24px;height:24px;border-radius:999px;border:2px solid rgba(255,255,255,.8);background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 4px rgba(255,255,255,.08)}
.payment-channel-option input:checked + .payment-channel-card .payment-channel-status{background:#22c55e;border-color:#fff;box-shadow:0 0 0 5px rgba(34,197,94,.25)}
.payment-channel-name{position:relative;z-index:1;margin:28px 0 8px;font-size:30px;font-weight:900;letter-spacing:-.8px}
.payment-channel-copy{position:relative;z-index:1;margin:0;color:rgba(255,255,255,.86);font-size:13px;line-height:1.6;max-width:300px}
.payment-channel-submit{display:flex;justify-content:center;margin-top:26px}
.payment-channel-submit button{min-width:220px;border:0;border-radius:999px;padding:14px 34px;color:#fff;font-weight:800;letter-spacing:.3px;background:linear-gradient(135deg,#0f172a,#2563eb);box-shadow:0 14px 32px rgba(37,99,235,.32);cursor:pointer}
.payment-channel-submit button:hover{filter:brightness(1.06);transform:translateY(-1px)}
@media(max-width:760px){.payment-channel-grid{grid-template-columns:1fr}.payment-channel-card{min-height:165px}.payment-channel-name{font-size:25px}}
</style>';
$displayhtml .= '<div class="payment-channel-shell">';
$displayhtml .= '<p class="payment-channel-intro">Choose the active payment gateway for customer payments. The selected channel will be saved immediately when you submit.</p>';
$displayhtml .= '<div class="payment-channel-grid">';
$displayhtml .= '<label class="payment-channel-option" for="selectpaymentchannelpaystack">';
$displayhtml .= '<input type="radio" name="channel" id="selectpaymentchannelpaystack" value="Paystack">';
$displayhtml .= '<div class="payment-channel-card paystack">';
$displayhtml .= '<div class="payment-channel-top"><div class="payment-channel-logo">PS</div><span class="payment-channel-status"></span></div>';
$displayhtml .= '<h3 class="payment-channel-name">Paystack</h3>';
$displayhtml .= '<p class="payment-channel-copy">Fast card, bank, transfer and USSD collections through the Paystack gateway.</p>';
$displayhtml .= '</div>';
$displayhtml .= '</label>';
$displayhtml .= '<label class="payment-channel-option" for="selectpaymentchannelflutterwave">';
$displayhtml .= '<input type="radio" name="channel" id="selectpaymentchannelflutterwave" value="Flutterwave">';
$displayhtml .= '<div class="payment-channel-card flutterwave">';
$displayhtml .= '<div class="payment-channel-top"><div class="payment-channel-logo">FW</div><span class="payment-channel-status"></span></div>';
$displayhtml .= '<h3 class="payment-channel-name">Flutterwave</h3>';
$displayhtml .= '<p class="payment-channel-copy">Accept local and international payments through the Flutterwave gateway.</p>';
$displayhtml .= '</div>';
$displayhtml .= '</label>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="payment-channel-submit">';
$displayhtml .= '<button type="button" id="selectpaymentchannelsubmitbtn">Submit Channel</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>
