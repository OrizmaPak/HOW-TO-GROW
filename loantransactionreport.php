<?php
$displayhtml .= '<div class="jcontainer">';
$displayhtml .= '<div>';
$displayhtml .= '<h1 class="jpageheader"> loan transaction report </h1>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jpagecontent" id="jpagecontent">';
$displayhtml .= '<div>';
$displayhtml .= '<form class="jform" id="loantransactionreportform">';
$displayhtml .= '';
$displayhtml .= '<div class="col-form-group">';
$displayhtml .= '<div class="jformgroup">';
$displayhtml .= '<div class="jformgroup jformgroupcol">';
$displayhtml .= '<label class="jcontrollabel"> Account Number: </label>';
$displayhtml .= '<input placeholder="Enter loan account" type="text"';
$displayhtml .= 'class="jformcontrol jmargin-top" id="reportaccountnumber" name="reportaccountnumber">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<label class="jcontrollabel"> account name: </label>';
$displayhtml .= '<input type="text"';
$displayhtml .= 'class="jformcontrol jmargin-top" id="reportaccountname" name="reportaccountname">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jflex jitems-left">';
$displayhtml .= '<div class="jflex jitems-left" style="width: 100%;">';
$displayhtml .= '<button type="button" class="j-action-btn" style="width: 15%;text-transform: capitalize;background-color: rgb(34, 33, 33);" id="view-lr">view</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn" style="width: 15%;text-transform: capitalize;" id="print-lr">print</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn" style="width: 15%;text-transform: capitalize;background-color: rgb(2, 77, 30);" id="export-lr">report</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="section-header" style="border: none;">';
$displayhtml .= '<h1 class=" jmargin-top" style="text-align: center;"> </h1>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div id ="reportcontainer">';
$displayhtml .= '<div class="section-header">';
$displayhtml .= '<h1 class=" jmargin-top" style="text-align: center;"></h1>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jmargin-top">';
$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="loantransactionreporttable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> date </th>';
$displayhtml .= '<th> account  </th>';
$displayhtml .= '<th> reference </th>';
$displayhtml .= '<th> description </th>';
$displayhtml .= '<th> principal</th>';
$displayhtml .= '<th> location </th>';
$displayhtml .= '<th> debit</th>';
$displayhtml .= '<th> credit</th>';
$displayhtml .= '<th> balance </th>';
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="jtabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '
<div class="j-table-status jflex jcontent-between jmargin-top no-pr">
    <span class="jcontrollabel" style="text-transform: none" id="pagination-status"></span>
    <span class="jflex jcontent-between">
        <span>
            <select id="pagination-limit" class="jmargin-left jformcontrol jmargin-right">
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="35">35</option>
                <option value="40">40</option>
                <option value="70">70</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="250">250</option>
                <option value="500">500</option>
                <option value="750">750</option>
                <option value="1000">1000</option>
                <option value="1500">1500</option>
            </select>
        </span>
        <span class="jflex jpagination">
            <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
            <span id="pagination-numbers"></span>
            <button class="j-no-bg disabled" type="button" id="jnext-button" disabled="true">next</button>
        </span>
    </span>
</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</form>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>