<div class="jcontainer">
    <h1 class="jpageheader pr-only">HOW TO GROW</h1>
    <h1 class="jpageheader pr-hide">STATEMENT OF ACCOUNT</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterpropertystatementofaccountform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <!--<div class="jformgroup jformgroup form_row">
                         
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Location: </label>
                            <select class="jformcontrol jmargin-top" id="location" name="location">
                                <option value="" selected="">--Select Location --</option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> marketer: </label> 
                        <input  type="text"  class="jformcontrol jmargin-top" id="accountofficer" list="accountofficerlist" onchange="checkdatalist(this)" name="marketer">
                    </div> 
                    </div>-->
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Account</label>
                            <input type="number" name="accountnumber" id="accountnumber" class="jformcontrol jmargin-top" />
                        </div>
                         <div class="jformgroup jformgroupcol  jmargin-left">
                            <label  class="jcontrollabel">Startdate</label>
                            <input type="date" name="startdate" id="startdate" class="jformcontrol jmargin-top" />
                        </div>
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">end date</label>
                           <input type="date" name="enddate" id="enddate" class="jformcontrol jmargin-top" />
                        </div>
                    </div>
                     <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                        <span class="jcontent-between">
                            <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                            <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-soa">print</button>
                            <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-soa">export excel</button>
                        </span>
                    </div>
                </div>
            </form>
            
            <div style="margin:40px 0 20px 0;display:flex;justify-content:space-between; gap:8px;align-items:end">
                <span class="pr-hide"> 
                    <img src="../images/howlogo-removebg-preview.png" alt="How to grow logo" class="hidden" style="width: 40px;margin-bottom:0px; height:auto;transform:translateY(10px)">
                </span><br/>
                
                <span style="display:none;gap:8px;align-items:center;text-transform:capitalize" id="accountinfo">
                    <span style="border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">
                        <span>Account Number: &nbsp;<strong id="accountnoo"></strong> </span>
                    </span>
                    <span style="border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">
                        <span>Account Name: &nbsp;<strong id="accountnamee"></strong> </span>
                    </span> 
                    <span class="pr-hide" style="border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">
                        <span>Account Officer: &nbsp;<strong id="accountofficer"></strong> </span>
                    </span>
                    <span class="pr-hide" style="border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">
                        <span>Marketer Group: &nbsp;<strong id="marketergroup"></strong> </span>
                    </span>
                </span>
            </div>
            <div style="width: 100%; display: flex;justify-content:flex-end">
                    <span class="" style="width:fit-content;border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">
                        <span>Account Balance: &nbsp;<strong id="accbal" style="font-size: 15px"></strong> </span>
                    </span>
            </div>
            <div class="jtable-content" style="margin-top:10px">
                <table class="jmargin-top" id="propertystatementofaccounttable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>transaction Date</th>
                            <th>value Date</th>
                            <th>Account Name</th>
                            <th>description</th>
                            <th>Reference</th>
                            <th>Type</th>
                            <th>Ser. Charge</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>Balance</th>
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

<datalist id="accountofficerlist"></datalist>