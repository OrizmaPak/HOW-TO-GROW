<?php session_start() ?>
<div class="jcontainer">
    <style>.jtotals .jtotal-card { box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
@media (max-width:700px) { .jtotals { flex-direction:column; } }
</style>
    <h1 class="jpageheader"> APPROVE INTERBANK TRANSFERS  </h1>
    <div class="jpagecontent" id="jpagecontent">
                <!-- Totals summary (shows on screen and will be printed since print uses jpagecontent) -->
       

        <form class="jform no-pr" id="filterapprovetransferform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                        <div class="jformgroup   jformgroupcol">
                            <label  class="jcontrollabel  ">Branch</label>
                            <select class="jformcontrol jmargin-top" type="text" name="location" id="branch" required>
                                <option value=""> -- Select branch -- </option>
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
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> View </button>
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-it">print</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-it">export excel</button>
                    </span>
                </div>
            </div>
        </form>
        <!-- Inline-styled notice -->
<div style="background:#fff9e8;border:1px solid #f7b500;color:#333;
            font-family:Arial,Helvetica,sans-serif;font-size:14px;
            padding:12px 16px;margin:12px 0;border-radius:6px;">
  <strong style="display:block;font-size:15px;margin-bottom:4px;">
    Heads-up:
  </strong>
  If you’d like to “Select All”, you’ll need to do it <em>page&nbsp;by&nbsp;page</em>.
</div>

<div id="approvetransfer-totals" style="display:flex;gap:14px;margin-top:18px;flex-wrap:wrap;align-items:stretch;">
  <!-- Total transfers -->
  <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;min-width:180px;background:linear-gradient(180deg,#ffffff,#f3fff6);box-shadow:0 6px 16px rgba(16,95,46,0.06);border-left:6px solid #2fa24f;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#ecf9f0;">
      <!-- simple list icon -->
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="5" width="14" height="2" rx="1" fill="#2fa24f"></rect>
        <rect x="4" y="11" width="14" height="2" rx="1" fill="#2fa24f"></rect>
        <rect x="4" y="17" width="8" height="2" rx="1" fill="#2fa24f"></rect>
      </svg>
    </div>
    <div>
      <div style="font-size:12px;color:#6c7a6a;margin-bottom:4px;">Total transfers</div>
      <div id="total-count" style="font-weight:800;font-size:18px;color:#145214;">0</div>
    </div>
  </div>

  <!-- Total amount -->
  <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;min-width:220px;background:linear-gradient(180deg,#ffffff,#f3fff6);box-shadow:0 6px 16px rgba(16,95,46,0.06);border-left:6px solid #2fa24f;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#ecf9f0;">
      <!-- money icon -->
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1v22" stroke="#2fa24f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17 5.5a3.5 3.5 0 01-3.5 3.5H10" stroke="#2fa24f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 18.5a3.5 3.5 0 003.5-3.5H14" stroke="#2fa24f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div>
      <div style="font-size:12px;color:#6c7a6a;margin-bottom:4px;">Total amount</div>
      <div id="total-amount" style="font-weight:800;font-size:18px;color:#114b21;">₦0.00</div>
    </div>
  </div>

  <!-- Page total -->
  <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;min-width:200px;background:linear-gradient(180deg,#ffffff,#f8fff9);box-shadow:0 6px 12px rgba(16,95,46,0.04);border-left:6px solid #8fd9a4;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#f0fbf3;">
      <!-- page icon -->
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 3h7l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="#2fa24f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 3v6h6" stroke="#2fa24f" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div>
      <div style="font-size:12px;color:#6c7a6a;margin-bottom:4px;">Page total</div>
      <div id="page-total" style="font-weight:800;font-size:18px;color:#145214;">₦0.00</div>
    </div>
  </div>

  <!-- Pending -->
  <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;min-width:140px;background:linear-gradient(180deg,#fffdf6,#f6fff0);box-shadow:0 6px 12px rgba(32,92,40,0.03);border-left:6px solid #f0b429;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff8e6;color:#d69d12;">
      <!-- clock -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#d69d12" stroke-width="1.4"></circle>
        <path d="M12 7v6l4 2" stroke="#d69d12" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </div>
    <div>
      <div style="font-size:12px;color:#6c7a6a;margin-bottom:4px;">Pending</div>
      <div id="count-pending" style="font-weight:800;font-size:16px;color:#7a5a00;">0</div>
    </div>
  </div>

  <!-- Approved -->
  <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;min-width:140px;background:linear-gradient(180deg,#f7fffb,#effff6);box-shadow:0 6px 12px rgba(16,95,46,0.03);border-left:6px solid #2fa24f;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#ecf9f0;color:#2fa24f;">
      <!-- check -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17l-5-5" stroke="#2fa24f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </div>
    <div>
      <div style="font-size:12px;color:#6c7a6a;margin-bottom:4px;">Approved</div>
      <div id="count-approved" style="font-weight:800;font-size:16px;color:#114b21;">0</div>
    </div>
  </div>

  <!-- Declined -->
  <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;min-width:140px;background:linear-gradient(180deg,#fffafc,#fff6f6);box-shadow:0 6px 12px rgba(200,30,30,0.03);border-left:6px solid #e85b4b;font-family:Arial,Helvetica,sans-serif;">
    <div style="width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff2f2;color:#e85b4b;">
      <!-- x icon -->
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6l12 12" stroke="#e85b4b" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div>
      <div style="font-size:12px;color:#6c7a6a;margin-bottom:4px;">Declined</div>
      <div id="count-declined" style="font-weight:800;font-size:16px;color:#7a1212;">0</div>
    </div>
  </div>
</div>


        <div class="jtable-content" style="margin-top:50px">
            <table class="jmargin-top" id="approvetransfertable">
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
                <tbody id="jtabledata"></tbody>
            <tfoot id="approvetransfertablefoot">
                <tr>
                    <!-- 14 columns then amount cell then action blank -->
                    <td colspan="14" style="text-align:right;padding:8px 12px;"><strong>Totals</strong></td>
                    <td id="tfoot-amount" style="text-align:left;padding:8px 12px;">₦0.00</td>
                    <td></td>
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
            <div class="w-full flex justify-end gap-5">
                        <button type="button" class="j-action-btn" style="margin-right: 40px;padding:10px; text-transform: capitalize;width:inherit;" id="selectall"> Select All </button>
                        <button type="button" class="j-action-btn" style="margin-right: 40px;padding:10px; text-transform: capitalize;width:inherit;" id="deselectall"> Deselect All </button>
                        <button type="button" class="j-action-btn" style="margin-right: 40px;padding:10px; text-transform: capitalize;width:inherit;" id="submitforapproval"> Approve Selected </button>
                        <button type="button" class="j-action-btn" style="padding:10px; background: red; text-transform: capitalize;width:inherit;" id="submitfordisapproval"> Decline Selected </button>
                    </div>
    </div>
</div>
