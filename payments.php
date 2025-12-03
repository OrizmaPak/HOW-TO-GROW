<div class="jcontainer">
    <h1 class="jpageheader">PAYMENTS</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="expenditurepaymentform" style="margin-top: 15px;">
                
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row" style="align-items:end">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel" style="display:flex;gap:10px">
                                <span>Recipient/Supplier</span>
                                <span style="border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px;transition:.5s">
                                    <span>Balance: &nbsp;<strong id="balance"></strong> </span>
                                </span>
                            </label>
                            <input list="supplierslist" class="jformcontrol jmargin-top" type="text" id="supplier"></select>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                    <h1>Transaction details</h1>
                </div>
                <div class="col-form-group" >
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Transaction Date</label>
                            <input class="jformcontrol jmargin-top" type="date" name="transactiondate" id="transactiondate" required>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Amount paid</label>
                            <input class="jformcontrol jmargin-top" type="number" name="amountpaid" id="amountpaid" required>
                        </div>
                    </div>
                     <div class="jformgroup jformgroupcol">
                        <label  class="jcontrollabel">Description</label>
                        <textarea rows="5" class="jformcontrol jmargin-top" name="description" id="description" type="text"></textarea>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgrouprow" style="justify-content:start;align-items:center;gap:5px;">
                            <input class="jformcontrol" type="checkbox"  required>
                            <label  class="jcontrollabel">Tick for Cheque Payment</label>
                        </div>
                    </div>
                </div>
                
                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit"> Submit </button>
                </div>
            </form>
        </div>
    </div>
</div>