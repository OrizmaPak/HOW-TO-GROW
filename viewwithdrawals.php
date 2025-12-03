<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> view withdrawals  </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterviewwithdrawalsform">
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
                        <select
                            class="jformcontrol jmargin-top" id="paymentmethod" name="paymentmethod">
                            <option value="">--Select payment method --</option>
                            <option>CASH</option>
                            <option>TRANSFER</option>
                        </select>
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Account Type: </label>
                        <select
                            class="jformcontrol jmargin-top" id="accounttype" name="accounttype">
                            <option value="">--Select account type --</option>
                            <option>SAVINGS</option>
                            <option>PROPERTY</option>
                        </select>
                    </div>
                    
                </div>
                <div class="jformgroup form_row" >
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Account Officer: </label>
                        <input type="email"
                            class="jformcontrol jmargin-top" id="email" name="email">
                    </div>
                    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                        <button type="button" class="j-action-btn"  style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report </button>&nbsp;
                    </div>
                </div>
                <div class="jflex jcontent-between" style="margin-top:15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-wl">print</button> &nbsp;
                        <button type ="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-wl">export excel</button>
                    </span>
                </div>
            </div>
        </form>
        <div class="jtable-content" style="margin-top:50px">
        <div id="jtabledata1"></div>
            <table class="jmargin-top" id="viewwithdrawalstable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th>T. date</th>
                        <th>V. date</th>
                        <th> account name </th>
                        <th> account number </th>
                        <th> Voucher image </th>
                        <th> reference ID </th>
                        <th id="pitem">Property Items</th>
                        <th> account officer </th>
                        <th> debit </th>
                        <th class="tdetails hidden"> t. details </th>
                        <th class="no-pr"> Action </th>
                    </tr>
                </thead>
                <tbody id="jtabledata"><tbody>
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