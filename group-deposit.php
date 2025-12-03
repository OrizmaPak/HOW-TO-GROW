<div class="jcontainer">
    <h1 class="jpageheader">GROUP DEPOSIT</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="groupdepositform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Transaction Date</label>
                            <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label  class="jcontrollabel">Account Officer</label>
                            <select class="jformcontrol jmargin-top"  id="accountofficer" name="accountofficer">
                                <option value=""> -- Select Officer -- </option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label  class="jcontrollabel">Value Date</label>
                            <input type="date" class="jformcontrol jmargin-top" id="valuedate" name="valuedate">
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label  class="jcontrollabel">Group</label>
                            <select class="jformcontrol jmargin-top"  id="groupid" name="groupid" >
                                <option value=""> -- Select Group -- </option>
                            </select>
                        </div>
                    </div>
                    
                </div>
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                    <h1>Transaction details</h1>
                </div>
                
                <div class="jformgroup jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label  class="jcontrollabel">Deposit</label>
                        <input type="number" class="jformcontrol jmargin-top" id="deposit" name="deposit">
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label  class="jcontrollabel">Returned Cash</label>
                        <input type="number" class="jformcontrol jmargin-top" id="returnedcash" name="returnedcash">
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label  class="jcontrollabel">Excess Cash</label>
                        <input type="number" class="jformcontrol jmargin-top" id="excesscash" name="excesscash">
                    </div>
                    <div class="jformgroup jformgroupcol  jmargin-left">
                        <label  class="jcontrollabel">Total Cash</label>
                        <input type="number" class="jformcontrol jmargin-top" id="total" name="total">
                    </div>
                    
                </div>
                
                
                <div style="margin-top:20px"></div>
                <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                    <h1>Other Information</h1>
                </div>
                
                <div class="jformgroup jformgroup form_row">
                    <div class="jformgroup jformgroupcol">
                        <label  class="jcontrollabel">No Visited</label>
                        <input type="number" class="jformcontrol jmargin-top" id="numbervisited" name="numbervisited">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label  class="jcontrollabel">Target</label>
                        <select class="jformcontrol jmargin-top" name="target" id="target" >
                            <option value=""> -- Select Target -- </option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label  class="jcontrollabel">Branch</label>
                        <select class="jformcontrol jmargin-top" name="location" id="location" >
                            <option value=""> -- Select Branch -- </option>
                        </select>
                    </div>
                    
                </div>
                
                <div class="jflex" style="margin: 30px 0;gap:10px">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit"> Submit </button>
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background-color: tomato" class="j-action-btn" id="resetform"> Reset </button>
                </div>
            </form>
            
        </div>
    </div>
</div>