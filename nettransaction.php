<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> NET TRANSACTION   </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filternettransactionform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Month: </label>
                        <select class="jformcontrol jmargin-top" id="month" name="month"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Year: </label>
                        <select class="jformcontrol jmargin-top" id="year" name="year"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Location: </label>
                        <select class="jformcontrol jmargin-top" id="location" name="location"></select>
                    </div>
                </div>
                <div class="jflex jcontent-between no-pr" style="margin-top: 15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report  </button>
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-nt">print</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-nt">export excel</button>
                    </span>
                </div>
            </div>
        </form>
        <div class="jtable-content" style="margin-top:30px">
            <table class="jmargin-top" id="nettransactiontable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> date </th>
                        <th style="text-align:left;display:none" id="reportlocation"> location </th>
                        <th style="text-align:left"> Previous BALance </th>
                        <th style="text-align:left"> daily deposit </th>
                        <th style="text-align:left"> daily R.R.R </th>
                        <th style="text-align:left"> service charge </th>
                        <th style="text-align:left"> Pay Bank With 100 </th>
                        <th style="display: none;text-align:left"> bank charges </th>
                        <th style="display: none;text-align:left"> cash from bank </th>
                        <th style="display: none;text-align:left"> cash from branch </th>
                        <th style="text-align:left"> loan repayments </th>
                        <th style="text-align:left"> cash from property </th>
                        <th style="text-align:left;border-right: 3px solid black"> total credit </th>
                        
                        <th style="text-align:left"> daily expenses </th>
                        <th style="text-align:left"> cash withdrawals </th>
                        <th style="text-align:left"> bank withdrawals </th>
                        <th style="text-align:left"> deposit by transfer </th>
                        <th style="text-align:left"> cash to bank </th>
                        <th style="display: none;text-align:left"> N.I.A </th>
                        <th style="display: none;text-align:left"> returned cash </th>
                        <th style="text-align:left"> total debit </th>
                        <th style="text-align:left"> Balance </th>
                        <!--<th> balance </th>-->
                        <!--<th class="no-pr"> Action </th>-->
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
                <tfoot id="jtabledatafoot"></tfoot>
            </table>
        </div>
        <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
            <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
            <span class="jflex jpagination">
                <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                <span id="pagination-numbers"></span>
                <button  class="j-no-bg" type="button" id="jnext-button">next</button>
            </span>
        </div>
    </div>
</div>


<?php
session_start();

$displayhtml .= '<div class="formcontainer overflowcontainer hidden">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>NET TRANSACTION</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="branch">Branch</label>';
$displayhtml .= '<select name="branch" id="matnetbranch">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '<button class="sortarrow  iconbtns btnicon">';
$displayhtml .= '<span class="userroll">';
$displayhtml .= '<img src="images/icons/sort-arrows.png" alt="" />';
$displayhtml .= '</span>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="selectmonth">Select Month</label>';
$displayhtml .= '<select name="selectmonth" id="matnetmonth">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '<button class="sortarrow  iconbtns btnicon">';
$displayhtml .= '<span class="userroll">';
$displayhtml .= '<img src="images/icons/sort-arrows.png" alt="" />';
$displayhtml .= '</span>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
// $displayhtml .= '<div class="split">';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '';
$displayhtml .= '<label for="year">Year</label>';
$displayhtml .= '<select name="year" id="matnetyear">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '<button class="sortarrow  iconbtns btnicon">';
$displayhtml .= '<span class="userroll">';
$displayhtml .= '<img src="images/icons/sort-arrows.png" alt="" />';
$displayhtml .= '</span>';
$displayhtml .= '</button>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
// $displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" class="btnmedium btn btnblue" id="matnettransactionbtn">';
$displayhtml .= 'View';
$displayhtml .= '</button>';
$displayhtml .= '</div>';

$displayhtml .= '<div class="generaltableholder">';
$displayhtml .= '<table id="nettransactiontable">';
$displayhtml .= '<tr class="fixedrow">';
$displayhtml .= '<th></th>';
$displayhtml .= '<th>F</th>';
$displayhtml .= '<th>Deposit</th>';
$displayhtml .= '<th>RRR</th>';
$displayhtml .= '<th>Cash Fr. Property</th>';
$displayhtml .= '<th>Cash Fri. Bank</th>';
$displayhtml .= '<th>Cash Fr. Branch</th>';
$displayhtml .= '<th>Excess</th>';
$displayhtml .= '<th>Repaid Loan</th>';
$displayhtml .= '<th>NIA Deduction</th>';
$displayhtml .= '<th>T.Credit</th>';
$displayhtml .= '<th>Expense</th>';
$displayhtml .= '<th>Cash Withd</th>';
$displayhtml .= '<th>Bank Withd</th>';
$displayhtml .= '<th>Cash to Bank</th>';
$displayhtml .= '<th>Cash to Branch</th>';
$displayhtml .= '<th>NIA</th>';
$displayhtml .= '<th>Loan</th>';
$displayhtml .= '<th>Excess Deduct</th>';
$displayhtml .= '';
$displayhtml .= '</tr>';
$displayhtml .= '';
$displayhtml .= '<!-- <tr>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '<td></td>';
$displayhtml .= '';
$displayhtml .= '</tr> -->';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';


echo $displayhtml;
?>
