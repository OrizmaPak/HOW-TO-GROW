<div class="jcontainer">
    <h1 class="jpageheader">PROPERTY TRANSACTION REPORT</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="propertytransactionreportform" style="margin-top: 15px;">
                <div class="col-form-group" >
                     <div class="jformgroup jformgroup form_row">
                         <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Startdate</label>
                            <input type="date" name="startdate" id="matpropertytransactionstartdate" class="jformcontrol jmargin-top" />
                        </div>
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">end date</label>
                           <input type="date" name="enddate" id="matpropertytransactionenddate" class="jformcontrol jmargin-top" />
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label class="jcontrollabel"> Location: </label>
                            <select class="jformcontrol jmargin-top" id="location" name="location">
                                <option value="" selected="">--Select Location --</option>
                            </select>
                        </div>
                    </div>
                    <!--<div class="jformgroup jformgroup form_row">-->
                    <!--    <div class="jformgroup jformgroupcol">-->
                    <!--        <label  class="jcontrollabel">Account</label>-->
                    <!--        <select class="jformcontrol jmargin-top" id="account">-->
                    <!--            <option value=""> -- Select Account -- </option>-->
                    <!--        </select>-->
                    <!--    </div>-->
                    <!--    <div class="jformgroup jformgroupcol jmargin-left">-->
                    <!--        <label  class="jcontrollabel">Marketer</label>-->
                    <!--        <select class="jformcontrol jmargin-top" id="matpropertytransactionmarketer">-->
                    <!--            <option value=""> -- Select Marketer --</option>-->
                    <!--        </select>-->
                    <!--    </div>-->
                        
                    <!--    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">-->
                    <!--        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="matpropertytransactionviewbtn"> Generate Report </button>&nbsp;-->
                    <!--    </div>-->
                    <!--</div>-->
                </div>
                <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-ptr">print</button>
                        <button type="button"  class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-ptr">export excel</button>
                    </span>
                </div>
            </form>
            
            <div style="margin:30px 0" class="no-pr hidden">
                <div style="width:max-content;background-color:;border-radius:5px;border:1px solid lightgray;padding:10px;background-color:rgb(225, 227, 230, 0.5);font-size:11px">
                    <span>Total Amount/ Total Deposit: <strong id="totalqty">1000</strong></span>
                </div>
            </div>
            
            <div class="jtable-content" style="margin-top:10px">
                <table class="jmargin-top" id="propertytransactiontable">
                    <thead>
                         <tr>
                            <th>S/N</th>
                            <th>Date</th>
                            <th>Account Name</th>
                            <th>Account No</th>
                            <th>Reference</th>
                            <th id="pitem">Property Items</th>
                            <!--<th>Type</th>-->
                            <!--<th>Ser. Charge</th>-->
                            <!--<th>Credit</th>-->
                            <th>Paid Value</th>
                            <th>action</th> 
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
