<div class="jcontainer">
    <h1 class="jpageheader">RETURNED CASH REPORT</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterreturnedcashreportform" style="margin-top: 15px;">
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
                 <div class="jflex jcontent-between no-pr" style="margin-top: 15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report  </button>
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-rc">print</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-rc">export excel</button>
                    </span>
                </div>
            </form>
            
            <div class="jtable-content" style="margin-top:30px">
                <table class="jmargin-top" id="returnedcashreporttable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Target</th>
                            <th>Group</th>
                            <th>Date</th>
                            <th>Account officer</th>
                            <th>Returned Cash</th>
                            <th>Total</th>
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