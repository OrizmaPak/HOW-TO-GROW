<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> view savings account </h1>
    <div class="jpagecontent">
        <form class="jform" id="filtersavingsaccountform">
            <div class="col-form-group"> 
                   <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Account Number: </label> 
                        <input  type="number"  class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                    </div> 
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Customer: </label>
                        <select type="text" class="jformcontrols jmargin-top" id="customer" name="customer">
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Account Officer: </label> 
                        <input  type="text"  class="jformcontrol jmargin-top" id="accountofficer" list="accountofficerlist" onchange="checkdatalist(this)" name="marketer">
                    </div> 
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Registration Point: </label>
                        <select  type="text"  class="jformcontrol jmargin-top" id="registrationpoint" name="registrationpoint"> </select>
                    </div>
                </div>
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
                    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                        <button type="button" id="searchsubmitsavings" class="j-action-btn"  style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report </button>&nbsp;
                    </div>
                </div>
                </div>
         <div class="jtable-content">
            <table class="jmargin-top" id="approveloanstable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> customer </th>
                        <th> user </th>
                        <th> account&nbsp;number </th>
                        <th> Reg Charge </th>
                        <th> location </th>
                        <th> reg. Date </th>
                        <th> reg. point </th>
                        <th> daily unit </th>
                        <th> Marketer group </th>
                        <th> account officer </th>
                        <th> customer image </th>
                        <th> status </th>
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
        </form>
    </div>
    <datalist id="accountofficerlist"></datalist>
    <style>
        .swal-zoom {
    transform: scale(1.5); /* Scale the modal by 1.5x */
}
    </style>
</div>