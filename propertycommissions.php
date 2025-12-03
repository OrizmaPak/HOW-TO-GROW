<div class="jcontainer">
    <h1 class="jpageheader">PROPERTY COMMISSIONS</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterpropertycommissionsform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Account Officer</label>
                            <input type="text" list="accountofficerlist" onchange="checkdatalist(this, 'accountofficer')" name="" id="accountofficername" class="jformcontrol jmargin-top" />
                            <input type="hidden" name="accountofficer" id="accountofficer" class="jformcontrol jmargin-top" />
                            <datalist id="accountofficerlist"></datalist>
                            <datalist id="accountofficerlistvalue"></datalist>
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
                            <label  class="jcontrollabel">Location</label>
                           <select name="location" id="location" class="jformcontrol jmargin-top">
                               <option value=""> -- Select Location -- </option>
                           </select>
                        </div>
                    </div>
                     <div class="jflex" style="margin: 30px 0;">
                        <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit"> Submit </button>
                    </div>
                </div>
            </form>
            
            <div class="jtable-content" style="margin-top:10px">
                <table class="jmargin-top" id="propertycommissionstable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Account No</th>
                            <th>Account Name</th>
                            <th>registration date</th>
                            <th>invoice number</th>
                            <th>location</th>
                            <th>products</th>
                            <th>marketer</th>
                            <th>commission</th>
                            <th>product value</th>
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
