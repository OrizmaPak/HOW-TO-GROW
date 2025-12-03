<div class="jcontainer">
    <h1 class="jpageheader">PROPERTY DELIVERY</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="propertydeliveryform" autocomplete="off">
                <div class="jflex no-pr" style="justify-content:end;margin-bottom: 20px">
                    <span class="jcontent-between" id="print-download-btns">
                        <!--<button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-pd">print reciept</button>-->
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-dn">print delivery note</button>
                        <!--<button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="download-r">PDF Receipt</button>-->
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="download-dn">PDF Delivery Note</button>
                    </span>
                </div>
                <div class="col-form-group" >
                    <div class="jformgroup form_row" style="gap: 50px">
                        <div class="jformgroup jformgroupcol" style="gap: 20px">
                            <div class="jformgroup form_row" style="gap: 20px">
                                <div class="jformgroup jformgroupcol">
                                    <div class="section-header" style="display:flex; gap:6px; align-items:center;justify-content:space-between;">
                                        <h1>Property</h1>
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        <label  class="jcontrollabel">Invoice Number</label>
                                        <input list="paidprop" type="text" class="jformcontrol jmargin-top" id="invoicenumber" name="invoicenumber">
                                        <label  class="jcontrollabel hidden">Property Account</label>
                                        <input list="paidprop" type="text" class="jformcontrol hidden jmargin-top" id="propertyaccount" name="accountnumber">

                                         <div class="jflex">
                                            <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="searchaccount">Find</button>
                                        </div>
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        <label  class="jcontrollabel">Delivery Date</label>
                                        <input type="date" class="jformcontrol jmargin-top" id="deliverydate" name="deliverydate">
                                    </div>
                                </div>
                                
                                <!-- refund due -->
                                <div class="jformgroup jformgroupcol">
                                    <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                        <div>
                                            <label class="jcontrollabel"></label>
                                            <label class="switch j-slider">
                                                <input class="jformcontrol jmargin-top" type="checkbox" id="togglerefunddue">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <h1>Refund due</h1>
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        <div class="jformgroup jformgroupcol">
                                            <label class="jcontrollabel">refund</label>
                                            <input type="number" class="jformcontrol jmargin-top comma" id="refunddue" name="refunddue" disabled="disabled" placeholder="0.00">
                                        </div>
                                        <div class="jformgroup jformgroupcol">
                                            <label  class="jcontrollabel"></label>
                                            <textarea rows="3" class="jformcontrol jmargin-top" id="reasonforrefund" name="reasonforrefund" disabled="disabled" placeholder=" Reason for refund"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="jformgroup form_row" style="gap: 20px">
                                
                                <!--Other info-->
                                <div class="jformgroup jformgroupcol">
                                    <div class="section-header" style="display:flex; gap:6px; align-items:center;justify-content:space-between;">
                                        <h1>Other Information</h1>
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        
                                        <div class="jformgroup jformgroupcol">
                                            <label  class="jcontrollabel">location</label>
                                            <input type="text" class="jformcontrol jmargin-top" id="location" name="location" readonly="readonly">
                                        </div>
                                        <div class="jformgroup jformgroupcol">
                                            <label  class="jcontrollabel">User</label>
                                            <select class="jformcontrol jmargin-top" id="user" name="user" readonly readonly="readonly">
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                  <!--additional charge-->
                                <div class="jformgroup jformgroupcol">
                                    <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                        <div>
                                            <label class="jcontrollabel"></label>
                                            <label class="switch j-slider">
                                                <input class="jformcontrol jmargin-top" type="checkbox" id="toggleadditionalcharges">
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                        <h1>Additional Charge</h1>
                                        
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        <div class="jformgroup jformgroupcol">
                                            <label  class="jcontrollabel">Charges</label>
                                            <input type="number" class="jformcontrol jmargin-top comma" id="additionalcharge" name="additionalcharge" disabled="disabled" placeholder="0.00">
                                        </div>
                                        <div class="jformgroup jformgroupcol">
                                            <!--<label  class="jcontrollabel">additional charge description</label>-->
                                            <textarea rows="3" class="jformcontrol jmargin-top" id="additionalchargedescription" name="additionalchargedescription" disabled="disabled" placeholder="Additional charge description"></textarea>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1></h1>
                            </div>
                             <div class="jflex">
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit"> Submit </button>
                            </div>
                        </div>
                        <div class="jformgroup" id="propertyprev" style="display:none">
                            <div style="width: inherit">
                                <div style="border: 1px solid lightgray;background-color:#fff;padding:10px;width:inherit" id="result-area"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>