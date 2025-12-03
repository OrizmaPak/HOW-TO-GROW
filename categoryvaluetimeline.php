<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> Category Value Timeline </h1>
    <div class="jpagecontent">
        <form class="jform" id="categoryvaluetimelineform">
           <div class="section-header" style="display:flex; gap:6px; align-items:center">
                <h1>Category Value Timeline Form</h1>
            </div>
            
            <label class="jcontrollabel" style="font-size:small;font-weight:600;text-transform:none;margin-bottom:10px">Fill in the form to create and edit Category Value Timeline</label>
            
            <div id="customer-profile" style="margin: 20px 0 40px 0;display:flex;align-items:start;gap:20px"></div>
            
            <div class="col-form-group"> 
    
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol hidden">
                        <label class="jcontrollabel"> Code: </label>
                        <input  type="text" class="jformcontrol jmargin-top" id="code" name="code" readonly="readonly">
                    </div>
                    <div class="jformgroup jformgroupcol">
                        <!--<label class="jcontrollabel"> Total value from: (₦) </label>-->
                        <label class="jcontrollabel"> Total Value from: </label>
                        <input type="number" class="jformcontrol jmargin-top comma" id="totalvaluefrom" name="totalvaluefrom" >
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Total value to: </label>
                        <input type="number"
                            class="jformcontrol jmargin-top comma" id="totalvalueto" name="totalvalueto">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Number of Days: </label>
                        <input  type="number"
                            class="jformcontrol jmargin-top" id="numberofdays" name="numberofdays">
                    </div> 
                </div>
                
                <div class="jflex jitems-left" style="margin: 30px 0;width: 100%;">
                    <div class="jflex jitems-right" style="width: 100%;display:flex;justify-content: flex-end">
                        <button type="button" id="catformsubmit" class="j-action-btn"  style="padding:10px; min-width: 15%; text-transform: capitalize" id="submit"> Save property account </button>&nbsp;
                    </div>
                </div>
                
                
            </div>
            
        </form>
        
        <div class="jtable-content">
                    <table class="jmargin-top" id="dueloans">
                        <thead>
                            <tr>
                                <th> S/N </th>
                                <th> Total Value from </th>
                                <th> Total Value to </th>
                                <th> Number of Days </th>
                                <th style="width: 150px;"> action </th>
                            </tr>
                        </thead>
                        <tbody id="categoryvaluetimelinetabledata"></tbody>
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
                