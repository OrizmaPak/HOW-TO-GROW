<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> view property account </h1>
    <div class="jpagecontent">
        <form class="jform" id="filterpropertyaccountform">
            <div class="col-form-group"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Account Number: </label> 
                        <input  type="number"  class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                    </div> 
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Customer: </label>
                        <select type="text" class="jformcontrols jmargin-top" id="customer1" name="customer">
                        </select>
                    </div>
                    <!--<div class="jformgroup jformgroupcol jmargin-left">-->
                    <!--    <label class="jcontrollabel"> Account number: </label>-->
                    <!--    <input  type="number"  class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">-->
                    <!--</div>-->
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Marketer: </label> 
                        <input  type="text"  class="jformcontrol jmargin-top" id="accountofficer" list="accountofficerlist" onchange="checkdatalist(this)" name="marketer">
                    </div> 
                </div>
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Registration Point: </label>
                        <select  type="text"  class="jformcontrol jmargin-top" id="registrationpoint" name="registrationpoint"></select>
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> start date: </label>
                        <input type="date"
                            class="jformcontrol jmargin-top" id="startdate" name="startdate">
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> end date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">
                    </div>
                </div>
                <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                    </span>
                </div>
            </div>
        </form>
         <div class="jtable-content">
            <table class="jmargin-top" id="approveloanstable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> customer </th>
                        <th> account&nbsp;number </th>
                        <th> Reg. Date </th>
                        <th> location </th>
                        <th> number of days </th>
                        <th> expected maturity date </th>
                        <th> registration point </th>
                        <th> property item </th>
                        <th> settlement type </th>
                        <th> total amount </th>
                        <th class="no-pr"> customer image </th>
                        <th> marketer </th>
                        <th class="no-pr"> action </th>
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
    <datalist id="accountofficerlist"></datalist>
</div>