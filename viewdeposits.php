<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> view deposits  </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterviewdepositsform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> start date: </label>
                        <input type="date"
                            class="jformcontrol jmargin-top" id="startdate" name="startdate">
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> end date: </label>
                        <input type="date"
                            class="jformcontrol jmargin-top" id="enddate" name="enddate">
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Payment Method: </label>
                        <select class="jformcontrol jmargin-top" id="paymentmethod" name="paymentmethod">
                            <option value="">--SELECT PAYMENT METHOD --</option>
                            <option>CASH</option>
                            <option>TRANSFER</option>
                        </select>
                    </div>
                    
                </div>
                <div class="jformgroup form_row" >
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Account Offficer: </label>
                        <input type="email"
                            class="jformcontrol jmargin-top" id="email" name="email" list="viewdepositaccofficer">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Deposit Type: </label>
                        <select class="jformcontrol jmargin-top" id="deposittype" name="deposittype">
                            <option value="">--SELECT DEPOSIT TYPE --</option>
                            <option selected>ALL</option>
                            <option>COLLECTION</option>
                            <option>DEPOSIT NIA</option>
                        </select>
                    </div>
                    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                        <button type="button" class="j-action-btn"  style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report </button>&nbsp;
                    </div>
                </div>
                <div class="jflex jcontent-between" style="margin-top:15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-dl">print</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-dl">export excel</button>
                    </span>
                </div>
            </div>
        </form>
       <div class="jtable-content" style="margin-top:50px">
           <!-- Total Credit Card -->
    <div 
        id="totalCreditCard" 
        style="
            padding: 15px; 
            margin-bottom: 20px; 
            background-color: #f8f9fa; 
            border: 1px solid #dee2e6; 
            border-radius: 5px; 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
        "
    >
        <span style="font-size: 1.2em; font-weight: bold;">Total Credit:</span>
        <span id="totalCreditTop" style="font-size: 1.2em; font-weight: bold;">0.00</span>
    </div>
    <table class="jmargin-top" id="viewdepositstable">
        <thead>
            <!-- Header Row -->
            <tr>
                <th>s/n</th>
                <th>T. date</th>
                <th>V. date</th>
                <th>Account name</th>
                <th>Account number</th>
                <th>Reference ID</th>
                <th>Account officer</th>
                <th>Marketer</th>
                <th> description </th>
                <th>Credit</th>
                <th class="no-pr">Action</th>
            </tr>
        </thead>
        <tbody id="jtabledata"></tbody>
        <!-- Optionally, you can remove the footer if not needed -->
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
    <datalist id="viewdepositaccofficer"></datalist>
</div>