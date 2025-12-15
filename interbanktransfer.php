<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> INTERBANK TRANSFERS  </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterinterbanktransferform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Type: </label>
                        <select class="jformcontrol jmargin-top" id="authorisation" name="authorisation">
                            <!--<option value="NOT APPROVED">NOT APPROVED</option>-->
                            <option value="ALL">ALL</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REVERSED">REVERSED</option>
                            <option value="FAILED">FAILED</option>
                            <option value="FROZEN">FROZEN</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> start date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="startdate" name="startdate">
                    </div>
                     <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> end date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">
                    </div>
                    
                </div>
                <div class="jflex jcontent-between" style="margin-top:15px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-it">print</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-it">export excel</button>
                    </span>
                </div>
            </div>
        </form>
       <div
  class="jflex jcontent-between jmargin-top"
  id="interbank-totals"
  style="
    display:none;
    align-items:center;
    justify-content:space-between;
    padding:10px 16px;
    margin-top:20px;
    background:#f0fdf4;
    border:1px solid #16a34a;
    border-radius:8px;
    color:#065f46;
    font-size:13px;
    box-shadow:0 2px 6px rgba(0,0,0,0.06);
  "
>
    <span
      class="jcontrollabel"
      id="interbank-total-count"
      style="
        text-transform:none;
        font-weight:600;
        letter-spacing:0.02em;
      "
    >
        📄 Total records: 0
    </span>
    <span
      class="jcontrollabel"
      id="interbank-total-amount"
      style="
        text-transform:none;
        font-weight:600;
        letter-spacing:0.02em;
      "
    >
        💸 Total amount: 0.00
    </span>
</div>


        <div class="jtable-content" style="margin-top:50px">
            <table class="jmargin-top" id="interbanktransfertable">
                <thead>
                    <tr>
                        <th> s/n </th>
                        <th>  </th>
                        <th> source </th>
                        <th> currency  </th>
                        <th> BANK name  </th>
                        <th> bank account no.  </th>
                        <th> reason/name  </th>
                        <th> recipient  </th>
                        <th> reference </th>
                        <th> t.code </th>
                        <th> t.date</th>
                        <th> account number</th>
                        <th> t.status</th>
                        <th> local reference </th>
                        <th> amount </th>
                        <th id="action" class="no-pr"> Action </th>
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
    <span class="w-full flex justify-end gap-5">
                        <button type="button" class="j-action-btn" style="margin-right: 40px;padding:10px; text-transform: capitalize;width:inherit;" id="selectall"> Select All </button>
                        <button type="button" class="j-action-btn" style="margin-right: 40px;padding:10px; text-transform: capitalize;width:inherit;" id="deselectall"> Deselect All </button>
                        <button type="button" class="j-action-btn" style="margin-right: 40px;padding:10px; text-transform: capitalize;width:inherit;" id="submitforapproval"> Pay Selected </button>
                        <button type="button" class="j-action-btn" style="padding:10px; background: red; text-transform: capitalize;width:inherit;" id="submitfordisapproval"> Cancel Selected </button>
                        <button type="button" class="j-action-btn" style="padding:10px; background: #6b21a8; color: #fff; text-transform: capitalize;width:inherit;" id="submitforfreezeall"> Freeze All </button>
                    </span>
    </div>
</div>
