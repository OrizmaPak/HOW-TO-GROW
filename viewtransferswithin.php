<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> VIEW TRANSFERS </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterviewtransferswithinform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Account Number: </label>
                        <input class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber" onchange="putnameunderaccountnumber(this)">
                        <p id="accname"></p>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Location: </label>
                        <select class="jformcontrol jmargin-top" id="location" name="location"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> start date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="startdate" name="startdate">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> end date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">
                    </div>
                    
                </div>
                <div class="jflex jcontent-between" style="margin-top:15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-vt">print</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-vt">export excel</button>
                    </span>
                </div>
            </div>
        </form>
        <div class="jtable-content" style="margin-top:50px">
            <table class="jmargin-top" id="viewtransferswithintable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> t.date </th>
                        <th> reference</th>
                        <th> D. account number</th>
                        <th> D. account name </th>
                        <th> C. account number </th>
                        <th> C. account name</th>
                        <th> description </th>
                        <th> user</th>
                        <th> Amount </th>
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
                <tfoot id="jtabledatafooter"></tfoot>
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