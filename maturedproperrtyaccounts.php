<div class="jcontainer">
    <h1 class="jpageheader">Matured Property Accounts</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filtermaturedpropertyaccountsform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Account</label>
                            <select class="jformcontrol jmargin-top" name="account" id="account">
                                <option value=""> -- Select Account -- </option>
                            </select>
                        </div>
                       
                    </div>
                    <div class="jformgroup jformgroup form_row">
                         <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Startdate</label>
                            <input type="date" name="startdate" id="startdate" class="jformcontrol jmargin-top" />
                        </div>
                         <div class="jformgroup jformgroupcol   jmargin-left">
                            <label  class="jcontrollabel">end date</label>
                           <input type="date" name="enddate" id="enddate" class="jformcontrol jmargin-top" />
                        </div>
                        <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                            <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                        </div>
                    </div>
                </div>
            </form>
            
            <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                <span class="jcontent-between">
                    <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-matured-accounts">print</button>
                    <button class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-matured-accounts">export excel</button>
                </span>
            </div>
            
            <div class="jtable-content" style="margin-top:50px">
                <table class="jmargin-top" id="maturedpropertyaccountstable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>account no</th>
                            <th>Name</th>
                            <th>Reg. Date</th>
                            <th>Exp. Maturity</th>
                            <th>Total Amount</th>
                            <th>status</th>
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
            
        </div>
    </div>
</div>
