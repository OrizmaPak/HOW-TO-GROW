<div class="jcontainer">
    <h1 class="jpageheader">GROUP DEPOSIT</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterviewgroupdepositsform" style="margin-top: 15px;">
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
                        <div class="jformgroup jformgroupcol jmargin-left ">
                            <label  class="jcontrollabel">Location</label>
                            <select class="jformcontrol jmargin-top"  id="location" onchange="fetchViewGroupDepositGroups(this.value)" name="location" >
                                <option value=""> -- Select Location -- </option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Group</label>
                            <select class="jformcontrol jmargin-top"  id="group" name="groupid" >
                                <option value=""> -- Select Group -- </option>
                            </select>
                        </div>
                    </div>
                </div>
                 <div class="jflex jcontent-between no-pr" style="margin-top: 15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report  </button>
                        <button type="button" class="j-action-btn no-pr jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-gd">print</button>
                        <button type="button" class="j-action-btn no-pr jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-gd">export excel</button>
                    </span>
                </div>
            </form> 
            
            <div class="jtable-content" style="margin-top:30px"> 
               <table class="jmargin-top" id="viewgroupdepositstable">
                      <thead>
                        <tr>
                          <th>s/n</th>
                          <th style="display:none">T. date</th>
                          <th>account officer</th>
                          <th style="display:none">account number</th>
                          <th style="display:none">Account name</th>
                          <th>credit</th>
                          <th>total property</th>
                          <th>total savings</th>
                          <th>total registrations</th>
                          <th>total renewals</th>
                          <!--<th class="no-pr"> Action </th>-->
                        </tr>
                      </thead>
                      <tbody id="jtabledata">
                        <!-- rows dynamically generated here -->
                      </tbody>
                      <tfoot>
                        <tr style="font-weight:600; border-top:2px solid #ccc;">
                          <td colspan="2" style="text-align:right; padding-right:10px;">
                            Totals:
                          </td>
                          <td id="footer-credit">0.00</td>
                          <td id="footer-property">0.00</td>
                          <td id="footer-savings">0.00</td>
                          <td id="footer-registrations">0</td>
                          <td id="footer-renewals">0</td>
                          <!-- <td class="no-pr"></td> -->
                        </tr>
                      </tfoot>
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