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
.payment-channel-shell{max-width:940px;margin:0 auto;padding:22px;border:1px solid #dcebd7;border-radius:18px;background:linear-gradient(135deg,#f8fff6 0%,#fff 48%,#eef8ea 100%);box-shadow:0 14px 35px rgba(13,84,3,.09);position:relative;overflow:hidden}
.payment-channel-shell:before{content:"";position:absolute;right:-90px;top:-100px;width:260px;height:260px;border-radius:999px;background:radial-gradient(circle,rgba(14,230,57,.18),rgba(14,230,57,0) 68%)}
.payment-channel-shell:after{content:"";position:absolute;left:0;bottom:0;width:100%;height:5px;background:linear-gradient(90deg,#0d5403,#0ee639,#0d5403)}
.payment-channel-intro{position:relative;margin:0 0 20px;color:#31512c;font-size:13px;line-height:1.6;display:flex;align-items:center;gap:10px}
.payment-channel-intro:before{content:"";width:9px;height:34px;border-radius:20px;background:#0d5403;box-shadow:0 0 0 5px rgba(13,84,3,.08);flex:0 0 auto}
.payment-channel-grid{position:relative;display:grid;grid-template-columns:repeat(2,minmax(250px,1fr));gap:18px}
.payment-channel-option{position:relative;display:block;cursor:pointer}
.payment-channel-option input{position:absolute;opacity:0;pointer-events:none}
.payment-channel-card{position:relative;overflow:hidden;min-height:166px;border-radius:16px;padding:18px;background:#fff;border:1px solid #d8e8d3;box-shadow:0 10px 24px rgba(0,0,0,.07);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,background .18s ease}
.payment-channel-card:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,84,3,.08),rgba(255,255,255,0) 55%);opacity:.9}
.payment-channel-card:after{content:"";position:absolute;right:-38px;bottom:-42px;width:140px;height:140px;border-radius:999px;border:28px solid rgba(13,84,3,.07)}
.payment-channel-option:hover .payment-channel-card{transform:translateY(-3px);box-shadow:0 16px 32px rgba(13,84,3,.13)}
.payment-channel-option input:checked + .payment-channel-card{border-color:#0d5403;background:linear-gradient(135deg,#ffffff 0%,#f2ffef 100%);box-shadow:0 0 0 4px rgba(13,84,3,.1),0 18px 34px rgba(13,84,3,.16)}
.payment-channel-card.paystack{--brand:#0b63ce;--brand-soft:rgba(11,99,206,.12)}
.payment-channel-card.flutterwave{--brand:#f5a400;--brand-soft:rgba(245,164,0,.18)}
.payment-channel-top{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.payment-channel-brand{display:flex;align-items:center;gap:10px;color:#0f2410}
.payment-channel-logo{width:48px;height:48px;border-radius:13px;background:linear-gradient(135deg,#fff,var(--brand-soft));border:1px solid rgba(13,84,3,.13);box-shadow:inset 0 0 0 1px rgba(255,255,255,.7),0 7px 16px rgba(0,0,0,.08);position:relative;display:flex;align-items:center;justify-content:center}
.payment-channel-logo .logo-bars{display:grid;grid-template-columns:repeat(3,6px);gap:3px;align-items:end}
.payment-channel-logo .logo-bars span{display:block;width:6px;border-radius:5px;background:var(--brand)}
.payment-channel-logo .logo-bars span:nth-child(1){height:12px}.payment-channel-logo .logo-bars span:nth-child(2){height:22px}.payment-channel-logo .logo-bars span:nth-child(3){height:16px}
.payment-channel-logo .logo-wave{width:28px;height:28px;position:relative}
.payment-channel-logo .logo-wave span{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--brand)}
.payment-channel-logo .logo-wave span:nth-child(1){left:0;top:2px}.payment-channel-logo .logo-wave span:nth-child(2){left:10px;top:9px}.payment-channel-logo .logo-wave span:nth-child(3){left:20px;top:16px}.payment-channel-logo .logo-wave span:nth-child(4){left:4px;top:18px;background:#0d5403}
.payment-channel-brand strong{display:block;font-size:20px;letter-spacing:-.3px;color:#102a12}
.payment-channel-brand small{display:block;margin-top:3px;color:#66785f;font-size:11px;text-transform:uppercase;letter-spacing:.12rem}
.payment-channel-status{width:25px;height:25px;border-radius:999px;border:2px solid #b9cab3;background:#fff;box-shadow:inset 0 0 0 5px #f2f6f0;flex:0 0 auto}
.payment-channel-option input:checked + .payment-channel-card .payment-channel-status{background:#0ee639;border-color:#0d5403;box-shadow:inset 0 0 0 5px #fff,0 0 0 4px rgba(14,230,57,.18)}
.payment-channel-name{position:relative;z-index:1;margin:24px 0 8px;font-size:15px;color:#0d5403;text-transform:uppercase;letter-spacing:.12rem}
.payment-channel-copy{position:relative;z-index:1;margin:0;color:#42583f;font-size:13px;line-height:1.55;max-width:340px}
.payment-channel-meta{position:relative;z-index:1;margin-top:16px;display:flex;gap:8px;flex-wrap:wrap}
.payment-channel-pill{font-size:10px;letter-spacing:.08rem;text-transform:uppercase;color:#0d5403;background:#eef8ea;border:1px solid #d5e9cf;border-radius:999px;padding:5px 9px}
.payment-channel-submit{display:flex;justify-content:center;margin-top:20px;position:relative}
.payment-channel-submit button{min-width:210px;border:0;border-radius:8px;padding:12px 28px;color:#fff;font-weight:800;letter-spacing:.4px;background:linear-gradient(135deg,#0d5403,#179c18);box-shadow:0 10px 22px rgba(13,84,3,.25);cursor:pointer;text-transform:uppercase}
.payment-channel-submit button:hover{filter:brightness(1.06);transform:translateY(-1px)}
@media(max-width:760px){.payment-channel-shell{padding:16px}.payment-channel-grid{grid-template-columns:1fr}.payment-channel-card{min-height:150px}.payment-channel-brand strong{font-size:18px}}
</style>';
$displayhtml .= '<div class="payment-channel-shell">';
$displayhtml .= '<p class="payment-channel-intro">Set the gateway customers will use for payment collections. Select one channel, then submit to update the active provider.</p>';
$displayhtml .= '<div class="payment-channel-grid">';
$displayhtml .= '<label class="payment-channel-option" for="selectpaymentchannelpaystack">';
$displayhtml .= '<input type="radio" name="channel" id="selectpaymentchannelpaystack" value="Paystack">';
$displayhtml .= '<div class="payment-channel-card paystack">';
$displayhtml .= '<div class="payment-channel-top"><div class="payment-channel-brand"><div class="payment-channel-logo"><div class="logo-bars"><span></span><span></span><span></span></div></div><div><strong>Paystack</strong><small>Primary gateway</small></div></div><span class="payment-channel-status"></span></div>';
$displayhtml .= '<h3 class="payment-channel-name">Card, bank and transfer rails</h3>';
$displayhtml .= '<p class="payment-channel-copy">Use Paystack for local card, bank transfer, USSD and direct payment collection flows.</p>';
$displayhtml .= '<div class="payment-channel-meta"><span class="payment-channel-pill">Paystack</span><span class="payment-channel-pill">Online payments</span></div>';
$displayhtml .= '</div>';
$displayhtml .= '</label>';
$displayhtml .= '<label class="payment-channel-option" for="selectpaymentchannelflutterwave">';
$displayhtml .= '<input type="radio" name="channel" id="selectpaymentchannelflutterwave" value="Flutterwave">';
$displayhtml .= '<div class="payment-channel-card flutterwave">';
$displayhtml .= '<div class="payment-channel-top"><div class="payment-channel-brand"><div class="payment-channel-logo"><div class="logo-wave"><span></span><span></span><span></span><span></span></div></div><div><strong>Flutterwave</strong><small>Alternate gateway</small></div></div><span class="payment-channel-status"></span></div>';
$displayhtml .= '<h3 class="payment-channel-name">Local and global collection</h3>';
$displayhtml .= '<p class="payment-channel-copy">Use Flutterwave for multi-channel payment acceptance across supported local and international rails.</p>';
$displayhtml .= '<div class="payment-channel-meta"><span class="payment-channel-pill">Flutterwave</span><span class="payment-channel-pill">Gateway switch</span></div>';
$displayhtml .= '</div>';
$displayhtml .= '</label>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="payment-channel-submit">';
$displayhtml .= '<button type="button" id="selectpaymentchannelsubmitbtn">Submit Channel</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>
