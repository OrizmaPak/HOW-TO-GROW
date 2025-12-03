<div class="jcontainer">
    <h1 class="jpageheader">ADD BALANCE</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="balanceform" style="margin-top: 15px;">
                <div class="col-form-group">
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel">Account Number</label>
                            <input type="text" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label class="jcontrollabel">Account Name</label>
                            <input type="text" class="jformcontrol jmargin-top" id="accountname" name="accountname">
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label class="jcontrollabel">Old Account Number</label>
                            <input type="text" class="jformcontrol jmargin-top" id="oldaccountnumber" name="oldaccountnumber">
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label class="jcontrollabel">Transaction Date</label>
                            <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                        </div>
                    </div>
                </div>

                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                    <h1>Transaction Details</h1>
                </div>

                <div class="jformgroup jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel">Credit Amount</label>
                        <input type="number" step="0.01" class="jformcontrol jmargin-top" id="credit" name="credit">
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label class="jcontrollabel">Voucher No</label>
                        <input type="text" class="jformcontrol jmargin-top" id="serialnumber" name="serialnumber">
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label class="jcontrollabel">Upload Voucher</label>
                        <input type="file" class="jformcontrol jmargin-top" id="upload" name="upload">
                    </div>
                </div>

                <div style="margin-top:20px"></div>
                <div class="jflex" style="margin: 30px 0; gap:10px">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit">Submit</button>
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background-color: tomato" class="j-action-btn" id="resetform">Reset</button>
                </div>
            </form>
        </div>
    </div>
</div>
