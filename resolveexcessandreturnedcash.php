<div class="jcontainer">
    <h1 class="jpageheader">RESOLVE EXCESS & RETURNED CASH</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="filterresolveexcessandreturnedcashform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Start Date</label>
                            <input type="date" class="jformcontrol jmargin-top" id="startdate" name="startdate">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">End Date</label>
                            <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Location</label>
                            <select class="jformcontrol jmargin-top"  id="location" name="location" >
                                <option value=""> -- Select Location -- </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit"> Submit </button>
                </div>
            </form>
            
            <div class="jtable-content" style="margin-top:50px">
                <table class="jmargin-top" id="resolveexcessandreturnedcashtable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Target</th>
                            <th>Group</th>
                            <th>Date</th>
                            <th>Account officer</th>
                            <th>Deposit</th>
                            <th>Excess Cash</th>
                            <th>Returned Cash</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="jtabledata"></tbody>
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
</div>