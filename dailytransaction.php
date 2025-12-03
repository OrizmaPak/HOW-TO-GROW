<div class="jcontainer">
    <h1 class="jpageheader">DAILY TRANSACTION</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterdailytransactionsform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                         <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">account number</label>
                            <input type="number" name="accountnumber" id="accountnumber" class="jformcontrol jmargin-top" />
                        </div>
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Startdate</label>
                            <input type="date" name="startdate" id="startdate" class="jformcontrol jmargin-top" />
                        </div>
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">end date</label>
                           <input type="date" name="enddate" id="enddate" class="jformcontrol jmargin-top" />
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel">Location</label>
                            <select class="jformcontrol jmargin-top" id="location" name="location">
                                <option value="">--Select Location --</option>
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-dt">print</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-dt">export excel</button>
                    </span>
                </div>
            </form>
            
            <div class="jtable-content" style="margin-top:10px">
                <table class="jmargin-top" id="dailytransactionstable">
                    <thead>
                       <tr>
                            <th>S/N</th>
                            <th>T. Date</th>
                            <th>V. Date</th>
                            <th>Acc. No</th>
                            <th>Ref</th>
                            <th>T. Type</th>
                            <th>Description</th>
                            <th>Acc. Officer</th>
                            <th>Approved By</th>
                            <th>Method</th>
                            <th>Location</th>
                            <th>Ser. Charge</th>
                            <th>Credit</th>
                            <th>Debit</th>
                        </tr>
                    </thead>
                    <tbody id="jtabledata"></tbody>
                </table>
            </div>
            <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
                <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                <span class="jflex jcontent-between">
                    <span>
                        <select id="pagination-limit" class="jmargin-left jformcontrol jmargin-right">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="70">70</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="750">750</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                        </select>
                    </span>
                    <span class="jflex jpagination">
                        <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
                        <span id="pagination-numbers"></span>
                        <button class="j-no-bg disabled" type="button" id="jnext-button" disabled="true">next</button>
                    </span>
                </span>
            </div>
            
        </div>
    </div>
</div>
