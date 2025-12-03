<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader">RRR Transaction Report</h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterrrrtransactionreportform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel">Start Date:</label>
                        <input type="date" class="jformcontrol jmargin-top" id="startdate" name="startdate">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">End Date:</label>
                        <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Location:</label>
                        <select class="jformcontrol jmargin-top" id="rrrlocation" name="location">
                            <option value="">--Select Location--</option>
                        </select>
                    </div>
                   
                </div>
                <div class="jformgroup form_row"> 
                   
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Charge:</label>
                        <select class="jformcontrol jmargin-top" id="charge" name="charge">
                            <option>ALL</option>
                            <option>REGISTRATION</option>
                            <option>RENEWAL</option>
                            <option>REPLACEMENT</option> 
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel">Marketer:</label>
                        <select class="jformcontrolj jmargin-top" id="marketer1" name="marketer">
                            
                        </select>
                    </div>
                </div>
                <div class="jformgroup form_row">
                    <div class="jformgroup jmargin-left" style="display:flex; align-items: flex-end;">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize; width: inherit;" id="submit">Generate Report</button>&nbsp;
                    </div>
                </div>
                <div class="jflex jcontent-between" style="margin-top:15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff; text-transform: capitalize;" id="print-wl">Print</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent; border-color: rgb(2, 77, 30); color: rgb(2, 77, 30); text-transform: capitalize;" id="export-wl">Export Excel</button>
                    </span>
                </div>
            </div>
        </form>

        <!-- Combined Summary Card -->
        <div class="jcard summary-card" style="background-color: #ffffff; border-radius: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); padding: 30px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 800px; margin: auto;">
    <div class="summary-section" style="display: flex; justify-content: space-between; align-items: center;">
        <div class="summary-item" style="flex: 1; text-align: center; margin: 10px;">
            <h3 style="font-size: 18px; color: #555555; margin-bottom: 10px;">Selected Location</h3>
            <p id="selected-location" style="font-size: 24px; font-weight: 600; color: #007BFF; margin: 0;"></p>
        </div>
        <div class="summary-item" style="flex: 1; text-align: center; margin: 10px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0;">
            <h3 style="font-size: 18px; color: #555555; margin-bottom: 10px;">Total Debit</h3>
            <p id="total-debit" style="font-size: 24px; font-weight: 600; color: #FF4D4F; margin: 0;">₦0.00</p>
        </div>
        <div class="summary-item" style="flex: 1; text-align: center; margin: 10px;">
            <h3 style="font-size: 18px; color: #555555; margin-bottom: 10px;">Total Credit</h3>
            <p id="total-credit" style="font-size: 24px; font-weight: 600; color: #52C41A; margin: 0;">₦0.00</p>
        </div>
    </div>
</div>


        <div class="jtable-content" style="margin-top:50px">
            <table class="jmargin-top" id="rrrtransactionreporttable">
                <thead>
                    <tr>
                        <th>S/N</th> 
                        <th>T. Date</th>
                        <th>Description</th>
                        <th>Reference</th>
                        <th>Account Officer</th>
                        <th>Marketer Name</th>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
                <!-- Table Footer for Totals -->
                <tfoot>
                    <tr>
                        <td colspan="5" class="total-label">TOTALS:</td>
                        <td id="table-total-debit">₦0.00</td>
                        <td id="table-total-credit">₦0.00</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
            <span class="jcontrollabel" style="text-transform: none" id="pagination-status"></span>
            <span class="jflex jpagination">
                <button class="j-no-bg" type="button" id="jprev-button">Previous</button>
                <span id="pagination-numbers"></span>
                <button class="j-no-bg" type="button" id="jnext-button">Next</button>
            </span>
        </div>
    </div>
</div>
