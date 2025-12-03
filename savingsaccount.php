<?php session_start(); ?>

<div class="jcontainer">
    <h1 class="jpageheader"> savings account </h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id="savingsaccountform">
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none">
                    <h1>account information</h1>
                </div>
                <div class="col-form-group">
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Account Number: </label>
                            <input type="text" class="jformcontrol jmargin-top" 
                                id="accountnumber" name="accountnumber" readonly="readonly">
                        </div> 
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Account Code: </label>
                            <input type="text" class="jformcontrol jmargin-top" id="accountcode" name="accountcode" readonly="readonly">
                        </div>
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Customer: </label>
                            <select type="text" class="jformcontrols jmargin-top" id="customer" name="customer">
                        </select>
                    </div>
                    </div>
                </div>
                <div class="col-form-group">
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> savings product: </label>
                            <select class="jformcontrol jmargin-top" id="savingsproduct" name="savingsproduct"></select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Serial number from: </label>
                            <input type="number"
                                class="jformcontrol jmargin-top" id="serialnumberfrom" name="serialnumberfrom">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Serial number to: </label>
                            <input  type="number" class="jformcontrol jmargin-top" id="serialnumberto" name="serialnumberto">
                        </div>
                    </div>
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Registration Charge: (₦) </label>
                        <input type="text" class="jformcontrol jmargin-top" id="registrationcharge" name="registrationcharge" readonly="readonly">
                    </div>
                </div>
                
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none">
                    <h1>Registration information</h1>
                </div>
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Registration Date: </label>
                        <input  type="date" readonly
                            class="jformcontrol jmargin-top" id="registrationdate" name="registrationdate">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Location: </label>
                        <select class="jformcontrol jmargin-top" id="location" disabled name="location">
                            <option> -- Select Location </option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Registration Point: </label>
                        <select  class="jformcontrol jmargin-top" id="registrationpoints" name="registrationpoint"> </select>
                    </div>
                </div>
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none">
                    <h1>Bank information </h1>
                </div>
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Bank name: </label>
                        <select class="jformcontrol jmargin-top" id="bankname1" name="bankname1"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Account number: </label>
                        <input  type="text"  class="jformcontrol jmargin-top" id="bankaccountnumber1" name="bankaccountnumber1">
                    </div>
                </div>
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Bank name 2: </label>
                        <select class="jformcontrol jmargin-top" id="bankname2" name="bankname2"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Account number 2: </label>
                        <input  type="text"  class="jformcontrol jmargin-top" id="bankaccountnumber2" name="bankaccountnumber2">
                    </div>
                </div>
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none">
                    <h1>other information </h1>
                </div>
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Daily Unit: </label>
                        <input  type="text"  class="jformcontrol jmargin-top" id="dailyunit" name="dailyunit">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Account Officer: </label>
                        <input list="officers" style="text-transform:capitalize" type="text" onchange="checkdatalist(this)"  class="jformcontrol jmargin-top" id="user" onblur="showlabel(this)" name="accountofficer"/>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> marketers Group: </label> 
                        <select  type="text"  class="jformcontrol jmargin-top" id="marketergroup" name="marketergroup">
                            <option value=""> -- Select Group --</option>
                        </select>
                    </div> 
                </div>
                
                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="submit"> Submit </button>
                </div>
                
        </div>
            </form>
    </div>
    <datalist id="customerdata"></datalist>
    <datalist id="officers"></datalist>
</div>