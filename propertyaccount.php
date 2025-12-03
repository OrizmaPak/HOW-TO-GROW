<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> property account </h1>
    <div class="jpagecontent">
        <form class="jform" id="addpropertyaccountform">
           <div class="section-header" style="display:flex; gap:6px; align-items:center">
                <h1>account information</h1>
            </div>
            
            <label class="jcontrollabel" style="font-size:small;font-weight:600;text-transform:none;margin-bottom:10px">To register new property account, leave the account number blank. or provide one to create new property for existing account</label>
            <!--<div class="jformgroup jformgroupcol" style="margin: 20px 0 5px 0;">-->
            <!--    <label class="jcontrollabel"> Account Number: </label>-->
            <!--    <input type="text" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">-->
            <!--</div>-->
            <div class="jformgroup form_row">  
                <div class="jformgroup jformgroupcol">
                    <label class="jcontrollabel"> Account Number: </label>
                    <input type="text" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber"> 
                </div> 
                <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Customer: </label>
                        <select type="text" class="jformcontrols jmargin-top" id="customer" name="customer">
                        </select>
                    </div>
            </div>
            
            
            <div id="customer-profile" style="margin: 20px 0 40px 0;display:flex;align-items:start;gap:20px"></div>
            
            <div class="col-form-group"> 
    
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol hidden">
                        <label class="jcontrollabel"> Code: </label>
                        <input  type="text" class="jformcontrol jmargin-top" id="code" name="code" readonly="readonly">
                    </div>
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Registration Charge: (₦) </label>
                        <input type="text" class="jformcontrol jmargin-top comma" id="registrationcharge" name="registrationcharge" readonly="readonly">
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Serial number from: </label>
                        <input type="number"
                            class="jformcontrol jmargin-top" id="serialnumberfrom" name="serialnumberfrom">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Serial number to: </label>
                        <input  type="number"
                            class="jformcontrol jmargin-top" id="serialnumberto" name="serialnumberto">
                    </div>
                </div>
                
                <div style="margin-top:20px"></div>
                <div class="section-header hidden" style="display:flex; gap:6px; align-items:center;border:none">
                    <h1>Bank information </h1>
                </div>
                <div class="jformgroup form_row hidden"> 
                   <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Bank name: </label>
                        <select disabled class="jformcontrol jmargin-top" id="bankname1" name="bankname1"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Bank Account number: </label>
                        <input disabled  type="text"  class="jformcontrol jmargin-top" id="bankacccountnumber1" name="bankaccountnumber1">
                    </div>
                </div>
                <div class="jformgroup form_row hidden"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Bank name 2: </label>
                        <select disabled class="jformcontrol jmargin-top" id="bankname2" name="bankname2"></select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left hidden">
                        <label class="jcontrollabel"> Bank Account number 2: </label>
                        <input disabled  type="text"  class="jformcontrol jmargin-top" id="bankacccountnumber2" name="bankaccountnumber2">
                    </div>
                </div>
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none">
                    <h1>Other Information</h1>
                </div>
                
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Registration Date: </label>
                        <input  type="date"
                            class="jformcontrol jmargin-top" id="registrationdate" name="registrationdate" readonly>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Location: </label>
                        <select class="jformcontrol jmargin-top" id="location" name="location" disabled>
                            <option> -- Select Location </option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Registration Point: </label>
                        <select class="jformcontrol jmargin-top" id="registrationpoint" name="registrationpoint"></select>
                    </div>
                </div>
                
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Daily Unit: </label>
                        <input  type="text"  class="jformcontrol jmargin-top comma" id="dailyunit" name="dailyunit">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Marketer: </label>
                        <input style="text-transform:capitalize" type="text" list="userdata" onchange="checkdatalist(this)" class="jformcontrol jmargin-top" id="user" name="user">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> marketers Group: </label> 
                        <select  type="text"  class="jformcontrol jmargin-top" id="marketergroup" name="marketergroup">
                            <option value=""> -- Select Group --</option>
                        </select>
                    </div> 
                    
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Number of days: </label>
                        <input type="number"  class="jformcontrol jmargin-top" id="numberofdays" name="numberofdays" >
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> expected maturity date: </label>
                        <input type="date"  class="jformcontrol jmargin-top" id="expectedmaturitydate" name="expectedmaturitydate" readonly="readonly">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> settlement type: </label>
                        <select onchange="
                        if(this.value == 'NON-TIME BOUND'){
                        document.getElementById('numberofdays').value = 0 ;
                        document.getElementById('expectedmaturitydate').value = '';
                        document.getElementById('numberofdays').parentElement.classList.add('hidden');
                        document.getElementById('expectedmaturitydate').parentElement.classList.add('hidden');
                        }else{
                        document.getElementById('numberofdays').parentElement.classList.remove('hidden');
                        document.getElementById('expectedmaturitydate').parentElement.classList.remove('hidden');
                        }
                        " class="jformcontrol jmargin-top" id="settlementtype" name="settlementtype">
                            <option>TIME BOUND</option>
                            <option>NON-TIME BOUND</option>
                        </select>
                    </div>
                </div>

                <div style="margin-top:20px"></div>
                <div class="section-header" style="border:none">
                    <h1>Transaction details</h1>
                </div>
                
                <div class="jformgroup jformgroupcol" style="align-items:start" id="summary">
                    <div class="jformgroup jformgroupcol" style="border:1px solid lightgray; border-radius:5px;padding: 10px">
                        <div class="jformgroup jformgrouprow" style="align-items:end">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> property items: </label>
                                <select  type="text"  class="jformcontrol jmargin-top" id="items" >
                                    <option> -- Select item --</option>
                                </select>
                            </div>
                            <div class="jformgroup" style="width: 110px; margin-left: 5px">
                               <button type="button" class="j-action-btn"
                                style="text-transform: capitalize;margin:0;padding:10px"
                                id="add-item">Add item</button>
                            </div>
                        </div>
                        <div class="jformgroup jformgroupcol items-column"></div>
                    </div>
                    <div class="jformgroup jformgroupcol">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Total amount: </label>
                            <input  type="number"  class="jformcontrol jmargin-top comma" id="totalamount" name="totalamount" readonly="readonly">
                        </div>
                    </div>
                </div> 
                
                <div class="jflex jitems-left" style="margin: 30px 0;">
                    <div class="jflex jitems-right" style="width: 100%">
                        <button type="button" class="j-action-btn"  style="padding:10px; min-width: 15%; text-transform: capitalize" id="submit"> Save property account </button>&nbsp;
                    </div>
                </div>
                
             </div>
        </form>
    </div>
    <datalist id="customerdata"></datalist>
    <datalist id="userdata"></datalist>
</div>
