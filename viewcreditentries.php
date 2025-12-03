<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> View Credit (Charges) Entries  </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterviewcreditentriesform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol" >
                        <label class="jcontrollabel"> Account number: </label>
                        <input type="text"
                            class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber" >
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Account officer: </label>
                        <input type="text"
                            class="jformcontrol jmargin-top" id="accountofficer" name="accountofficer" list="viewcreditentriesname" onchange="checkdatalist(this)">
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
                     
                    
                </div>
                <div class="jformgroup form_row" >
                    
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
            <div style="width: 100%; display: flex;justify-content:flex-end">
                    <span class="" style="width:fit-content;border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">
                        <span>Total Credit: &nbsp;<strong id="totcredit" style="font-size: 15px"></strong> </span>
                    </span>
            </div>
            <table class="jmargin-top" id="viewcreditentriestable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th>T. date</th>
                        <th> account no </th>
                        <th> account name </th>
                        <th> reference ID </th>
                        <th> credit </th>
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
<datalist id="viewcreditentriesname" ></datalist>