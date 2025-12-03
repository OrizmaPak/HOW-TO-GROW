<?php
session_start();

$displayhtml = ''; 

// Start of the main container
$displayhtml .= '<div class="formcontainer overflowcontainer">';

// Form Header
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>REVIEW SERIAL NUMBER</h5>';
$displayhtml .= '</div>';

// Form Main
$displayhtml .= '<div class="formmain">';

// Account Number Section
$displayhtml .= '<div class="formsection formsectionnoborder">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matregistrationslipnoaccnumber">Enter Account Number</label>'; 
$displayhtml .= '<input list="allaccounts" type="number" name="matregistrationslipnoaccnumber" id="matregistrationslipnoaccnumber" onfocusout="mataccoutnumberchecker(this.value, this.parentElement.parentElement.children[1].children[1], this, this.name)"  >';
$displayhtml .= '<datalist id="allaccounts">';
$displayhtml .= '</datalist>';
$displayhtml .= '</input>';
$displayhtml .= '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label class="matgreenlabel" for="accountname">Account Name</label>';
$displayhtml .=  '<p id="displayfetchname"></p>';
$displayhtml .=  '</div>';
$displayhtml .= '</div>';

// Booklet Serial Number Section
$displayhtml .= '<div class="formsection">';
$displayhtml .= '<p class="topformsection"> Booklet Serial Number</p>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="from">Serial Number </label><br>';
$displayhtml .= '<input type="number"  name="serialnumberedited" class="from" id="slipnoserialnumberfrom">';
$displayhtml .= '<input type="hidden" readonly name="from" class="from" id="reviewslipid">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

// Booklet Serial Number Range Section
$displayhtml .= '<div class="formsection">';
$displayhtml .= '<p class="topformsection"> Booklet Serial Number Range</p>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="from">Serial Number From</label><br>';
$displayhtml .= '<input type="number"  name="from" class="from" id="matregistrationslipnoserialnumberfrom">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="to">Serial Number To</label><br>';
$displayhtml .= '<input type="number"  name="to" class="to" id="matregistrationslipnoserialnumberto">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

// Resolve Button
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="button" class="btnmedium btn btnblue" id="matregistrationslipnosubmitbtn">';
$displayhtml .= 'Resolve';
$displayhtml .= '</button>';
$displayhtml .= '</div>';


// Tab Navigation
$displayhtml .= '<div class="tab-container">';
$displayhtml .= '<ul class="tabs">';
$displayhtml .= '<li class="tab-link current" data-tab="unresolved">Unresolved</li>';
$displayhtml .= '<li class="tab-link" data-tab="resolved">Resolved</li>';
$displayhtml .= '</ul>';

// Tab Content for Unresolved
$displayhtml .= '<div id="unresolved" class="tab-content current">';
$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n</th>';
$displayhtml .= '<th>Account Number</th>';
$displayhtml .= '<th>Serial Number From</th>';
$displayhtml .= '<th>Serial Number To</th>';
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="registeredslipnumbertabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; // End of Unresolved Tab

// Tab Content for Resolved
$displayhtml .= '<div id="resolved" class="tab-content">';
$displayhtml .= '<div class="jtable-content">';

// Add the filter input box
$displayhtml .= '<div class="filter-container" style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">';
$displayhtml .= '<label for="accountNumberFilter" style="font-weight: bold; font-size: 14px; color: #333;">Filter by Account Number:</label>';
$displayhtml .= '<div style="position: relative; flex-grow: 1;">';
$displayhtml .= '<input type="text" id="accountNumberFilter" placeholder="Enter Account Number" style="padding: 10px 40px 10px 15px; width: 100%; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); font-size: 14px;">';
$displayhtml .= '<i class="fas fa-search" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); color: #888; font-size: 16px;"></i>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

// Table structure
$displayhtml .= '<table class="jmargin-top" id="resolvedloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n</th>';
$displayhtml .= '<th>entry date</th>';
$displayhtml .= '<th>Account Number</th>';
$displayhtml .= '<th>Account name</th>';
$displayhtml .= '<th>complaint</th>';
$displayhtml .= '<th>Serial Number</th>';
$displayhtml .= '<th>Edited Serial Number</th>';
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="resolvedslipnumbertabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>'; // End of jtable-content
$displayhtml .= '</div>'; // End of Resolved Tab
 // End of Resolved Tab
$displayhtml .= '</div>';

$displayhtml .= '</div><style>
/* Tab Navigation Styles */
.tab-container {
    margin-top: 20px;
}

.tabs {
    list-style: none;
    padding: 0;
    display: flex;
    border-bottom: 1px solid #ccc;
}

.tab-link {
    padding: 10px 20px;
    cursor: pointer;
    background: #f1f1f1;
    margin-right: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.tab-link.current {
    background: #fff;
    border: 1px solid #ccc;
    border-bottom: none;
}

.tab-content {
    display: none;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: none;
}

.tab-content.current {
    display: block;
}

/* Table Styles (Optional for better visuals) */
.jtable-content table {
    width: 100%;
    border-collapse: collapse;
}

.jtable-content th, .jtable-content td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.jtable-content th {
    background-color: #f2f2f2;
}
</style>
'; // End of tab-container

// Optional: Modal (Unchanged)
// Uncomment and modify if needed
/*
$displayhtml .=  '<div class="matmodal matmodalhidde">';
$displayhtml .=  '<div class="matmodaltext">';
$displayhtml .=  '<div class="matmodal__header">';
$displayhtml .=  '<strong class="matcancelmodal">X</strong>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="matmodalbody">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="">Account number</label>';
$displayhtml .=  '<input type="text" name="modalaccountnumber" id="modalaccountnumber" disabled>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="">Serial Number from</label>';
$displayhtml .=  '<input type="text" name="modalserialnumberfrom" id="modalserialnumberfrom" disabled>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="">Serial Number</label>';
$displayhtml .=  '<input type="text" name="modalserialnumberto" id="modalserialnumberto" disabled>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
*/

$displayhtml .= '</div>'; // End of main container

echo $displayhtml;
?>
