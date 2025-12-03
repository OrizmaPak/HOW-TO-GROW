<div class="jcontainer">
    <h1 class="jpageheader">Missed Property Maturity</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filtermissedmaturityform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Date</label>
                            <input type="date" name="currentdate" id="startdate" class="jformcontrol jmargin-top" />
                        </div>
                    </div>
                </div>
            </form>
            
            <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                <span class="jcontent-between">
                    <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                    <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-missed-maturity">print</button>
                    <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-missed-maturity">export excel</button>
                </span>
            </div>
            
            <div class="jtable-content" style="margin-top:50px">
                <table class="jmargin-top" id="missedmaturitytable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Account Number</th>
                            <th>Full Name</th>
                            <th>registration date</th>
                            <th>expected maturity date</th>
                            <th>Pending balance</th>
                            <th>Total Paid</th>
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
