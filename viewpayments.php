<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> view payments  </h1>
    <div class="jpagecontent">
        <form class="jform" id="filterviewpaymentsform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> start date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="startdate" name="startdate">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> end date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Transaction id: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="id" name="id">
                    </div>
                    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                        <button type="button" class="j-action-btn"  style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report </button>&nbsp;
                    </div>
                </div>
            </div>
        </form>
        <div class="jtable-content" style="margin-top:30px">
            <table class="jmargin-top" id="viewpaymentstable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> recipient / payee  </th>
                        <th> location </th>
                        <th> date </th>
                        <th> description </th>
                        <th> debit </th>
                        <th> action </th>
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
            </table>
        </div>
        <div class="j-table-status jflex jcontent-between jmargin-top">
            <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
            <span class="jflex jpagination">
                <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                <span id="pagination-numbers"></span>
                <button  class="j-no-bg" type="button" id="jnext-button">next</button>
            </span>
        </div>
    </div>
</div>