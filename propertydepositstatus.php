<div class="jcontainer">
    <h1 class="jpageheader"> Property Deposit Status </h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterpropertydepositstatusform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row" style="align-items:start;padding:10px;background-color:#f1f0f0;border:1px solid #ebe8e8">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Account Number: </label>
                            <input type="number" name="searchtext" id="searchtext" class="jformcontrol jmargin-top" title="Property account number" />
                                   <div style="text-align:left;font-size:11px;opacity:.9">Leave blank to retrieve all</div>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Days to Delivery: </label>
                            <input type="number" name="daystodelivery" id="daystodelivery" class="jformcontrol jmargin-top" title="Number of days left before the delivery date" />
                            <div style="text-align:left;font-size:11px;opacity:.9">Number of days left before the delivery date</div>
                        </div>
                    </div>
                </div>
            </form>
            
            <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                <span class="jcontent-between">
                    <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                    <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-pds">print</button>
                    <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-pds">export excel</button>
                </span>
            </div>
            
            <div class="jtable-content" style="margin-top:30px">
                <table class="jmargin-top" id="propertydepositstatustable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Account Number</th>
                            <th>Account Name</th>
                            <th>Opening Date</th>
                            <th>Maturity Date</th>
                            <th>Total Amount</th>
                            <th>Paid Amount</th>
                            <th>Paid Percentage (%)</th>
                            <th>Stock Status</th>
                            <th class="no-pr">Action</th>
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
            
            <div style="height: 400px">
                <canvas id="pdschart"></canvas>
            </div>
            
        </div>
    </div>
</div>
