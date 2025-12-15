<div class="jcontainer">
    <h1 class="jpageheader">CUSTOMER BALANCES</h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="customerbalancesform" style="margin-top: 15px;">
            <div class="col-form-group">
                <div class="jformgroup jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel">Location</label>
                        <select class="jformcontrol jmargin-top" id="location" name="location">
                            <option value="">--Select Location --</option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Up Till This Year</label>
                        <input type="number" name="year" id="year" class="jformcontrol jmargin-top" min="1900" />
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Up Till This Month</label>
                        <select class="jformcontrol jmargin-top" id="month" name="month">
                            <option value="">--Select Month --</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                <span class="jcontent-between">
                    <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                </span>
            </div>
        </form>
        <p class="jcontrollabel" style="margin-top: 20px;">Submit opens customer balances in a new tab.</p>
    </div>
</div>
