<div class="jcontainer">
    <h1 class="jpageheader">EXPENDITURE</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="expenditureform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Recipient/Supplier </label>
                            <input list="supplierslist" class="jformcontrol jmargin-top" type="text" id="supplier"></select>
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label  class="jcontrollabel">Branch</label>
                            <select class="jformcontrol jmargin-top" type="text" name="" id="branch" required>
                                <option value=""> -- Select branch -- </option>
                            </select>
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
                            <label  class="jcontrollabel">Post Voucher No.</label>
                            <input class="jformcontrol jmargin-top" type="text" name="postvoucherno" id="postvoucherno" required>
                        </div>
                    </div>
                    <div class="jformgroup jformgroupcol" style="border-radius:5px;border:1px solid lightgray;padding:10px;background-color:rgb(225, 227, 230, 0.5);margin-top:20px">
                        <div id="trows" class="jformgroup jformgroupcol">
                            <div class="jformgroup form_row item" style="align-items:end"> 
                                <div class="jformgroup jformgroupcol">
                                    <label  class="jcontrollabel">Description.</label>
                                    <input class="jformcontrol jmargin-top description" type="text">
                                </div> 
                                
                                <div class="jformgroup jformgroupcol  jmargin-left"> 
                                    <label  class="jcontrollabel">Debit</label>
                                    <input onchange="calculateexpendituredebit()" class="calculateexpendituredebit jformcontrol jmargin-top debit" type="number">
                                </div>
                                <div class="jformgroup jformgroupcol" style="width: auto;margin-left: 5px">
                                    <button type="button" class="j-action-btn"
                                        style="text-transform: capitalize;background-color:red" onclick="removeTransactionRow(event)">del</button>
                                </div>
                            </div>
                        </div>

                        <div class="jformgroup jformgroupcol" style="width: auto;justify-content:end;">
                            <button type="button" class="j-action-btn" style="text-transform: capitalize;background-color:rgb(50, 156, 97)" onclick="appendTransactionRow(event)">Add</button>
                        </div>
                    </div>
                    
                    <div style="margin-top:20px"></div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel" >Total Debits</label>
                            <input class="jformcontrol jmargin-top" type="number" id="totaldebit" name="totaldebit">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Amount paid</label>
                            <input class="jformcontrol jmargin-top" type="number" name="amountpaid" id="amountpaid" required>
                        </div>
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