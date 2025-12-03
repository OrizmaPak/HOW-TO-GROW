<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader">NET TRANSACTION</h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filternetreportupdatedform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel">Month:</label>
                        <select class="jformcontrol jmargin-top" id="month" name="month"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Year:</label>
                        <select class="jformcontrol jmargin-top" id="year" name="year"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Location:</label>
                        <select class="jformcontrol jmargin-top" id="location" name="location"></select>
                    </div>
                </div>
                <div class="jflex jcontent-between no-pr" style="margin-top: 15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit">Generate Report</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-nt">Print</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-nt">Export Excel</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: green;border-color: rgb(2, 77, 30);color: white;text-transform:capitalize;" id="dump-nt">Dump External Net</button>
                    </span>
                </div>
            </div>
        </form>
        <div class="jtable-content" style="margin-top:30px">
            <table class="jmargin-top" id="netreportupdatedtable">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Date</th>
                        <th style="text-align:left;display:none">Location</th>
                        <th style="text-align:left">Previous Balance</th>
                        <th style="text-align:left">Daily Deposit</th>
                        <th style="text-align:left">Daily R.R.R</th>
                        <th style="text-align:left">Service Charge</th>
                        <th style="text-align:left">Pay Bank With 100</th>
                        <th style="display: none;text-align:left">Bank Charges</th>
                        <th style="display: none;text-align:left">Cash From Bank</th>
                        <th style="display: none;text-align:left">Cash From Branch</th>
                        <th style="text-align:left">Loan Repayments</th>
                        <th style="text-align:left">Cash From Property</th>
                        <th style="text-align:left;border-right: 3px solid black">Total Credit</th>
                        
                        <th style="text-align:left">Daily Expenses</th>
                        <th style="text-align:left">Cash Withdrawals</th>
                        <th style="text-align:left">Bank Withdrawals</th>
                        <th style="text-align:left">Deposit By Transfer</th>
                        <th style="text-align:left">Cash To Bank</th>
                        <th style="display: none;text-align:left">N.I.A</th>
                        <th style="display: none;text-align:left">Returned Cash</th>
                        <th style="text-align:left">Total Debit</th>
                        <th style="text-align:left">Balance</th>
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
                <tfoot id="jtabledatafoot"></tfoot>
            </table>
        </div>
    </div>
</div>