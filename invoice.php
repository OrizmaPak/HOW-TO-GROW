<?php
session_start();

$displayhtml .= '<div id="howtogrowinvoice-container">';
$displayhtml .= '<div class="howtogrowinvoice-subcontainer">';
$displayhtml .= '<img class="htgbackgroundimg" src="../images/WhatsApp Image 2022-08-07 at 2.40.30 PM.jpeg" alt="">';
$displayhtml .= '<div class="htgheader">';
$displayhtml .= '<h1>HOW TO GROW LIMITED</h1>';
$displayhtml .= '<p>CITY BUSCUIT ROAD, UGWUAGBA OBOSI</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="htgbody">';
$displayhtml .= '<p class="htgbodyheader">INVOICE / RECEIPT</p>';
$displayhtml .= '<div class="htgbodydetailscontainer">';
$displayhtml .= '<div class="htgbodydetails">';
$displayhtml .= '<p class="htgbodydetails1 bb">Account No: <span>84593845</span></p>';
$displayhtml .= '<p class="htgbodydetails2 b">Name: <span>MIRIAM</span></p>';
$displayhtml .= '<p class="htgbodydetails1 bb">Phone No: <span>0804535345345</span></p>';
$displayhtml .= '<p class="htgbodydetails1 b">Product Name: <span>INDOMIE</span></p>';
$displayhtml .= '<p class="htgbodydetails1 bb">Value Amount: N<span>54,345.56</span></p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="htgbodydetails">';
$displayhtml .= '<p class="htgbodydetails2 b">Branch: <span>DELTA</span></p>';
$displayhtml .= '<p class="htgbodydetails1 bb">Receipt No: <span>86767</span></p>';
$displayhtml .= '<p class="htgbodydetails2 b">Date Printed: <span>25/02/2022</span></p>';
$displayhtml .= "<p class='htgbodydetails2 bb'>Product's Model: <span>BELLE FULL</span></p>";
$displayhtml .= '<p class="htgbodydetails2 b"> <span>.</span></p>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<p class="htgbodyheader2">GOODS RECEIVED IN GOOD CONDITION IS NOT REFUNDABLE AFTER PAYMEN
T</p>';
$displayhtml .= '<div class="htgbodysign">';
$displayhtml .= '<div class="htgbodysign1">';
$displayhtml .= '<div class="htgbodysigncontainer">';
$displayhtml .= '<input type="text" name="" id="">';
$displayhtml .= '<p>Control Officer 1 </p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '<p>sign / date</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="htgbodysigncontainer">';
$displayhtml .= '<input type="text" name="" id="">';
$displayhtml .= '<p>Delivery Head</p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '<p>sign / date</p>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="htgbodysign2">';
$displayhtml .= '<div class="htgbodysigncontainer">';
$displayhtml .= '<input type="text" name="" id="">';
$displayhtml .= "<p>Customer's Sign</p>";
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="htgprintbtn">print</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml
?>