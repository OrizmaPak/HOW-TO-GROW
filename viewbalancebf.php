<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> VIEW BALANCE  </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterviewbalancebf">
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
                        <label class="jcontrollabel"> Account Officer: </label>
                        <input list="officers" style="text-transform:capitalize" type="text" onchange="checkdatalist(this)"  class="jformcontrol jmargin-top" id="user" onblur="showlabel(this)" name="accountofficer"/>
                    </div>
                    
                </div>
                <div class="jflex jcontent-between" style="margin-top:15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="submitview">Submit</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-wl">print</button> &nbsp;
                        <button type ="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-wl">export excel</button>
                    </span>
                </div> 
            </div>
        </form>
        <div class="jtable-content" style="margin-top:50px">
            <div id="showtotal"></div>
            <table class="jmargin-top" id="viewwithdrawalstable">
                <thead> 
                    <tr> 
                        <th>s/n </th> 
                        <th>T.date</th> 
                        <th>location</th>
                        <th> ACCOUNT NUMBER </th>
                        <th> Account name </th>
                        <th> reference </th>
                        <th> credit </th>
                        <th> voucher no </th>
                        <th> approved by </th>
                        <th> user </th>
                        <th> action </th>
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