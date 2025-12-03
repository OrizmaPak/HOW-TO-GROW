<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> VIEW TRANSFERS HISTORY </h1>
    <div class="jpagecontent" id="jpagecontent">
        <form class="jform no-pr" id="filterviewtransfersform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Status: </label>
                        <select class="jformcontrol jmargin-top" id="transactionstatus" name="status">
                            <option value="SUCCESS">SUCCESS</option>
                            <option value="FAILED">FAILED</option>
                            <option value="REVERSED">REVERSED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="%">ALL</option>
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Location</label>
                           <select name="location" id="location" class="jformcontrol jmargin-top">
                               <option value=""> -- Select Location -- </option>
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
                        <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="print-vt">print</button> &nbsp;
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-vt">export excel</button>
                    </span>
                </div>
            </div>
        </form>
        <!-- Totals Summary (inline styles; prints because it's inside #jpagecontent) -->
<div id="vt-totals"
     style="display:none; margin-top:20px; border:1px solid #e1e1e1; border-radius:6px; padding:12px; background:#ffffff;">
  <!-- simple theme toggles (still inline; optional to click) -->
  <div id="vt-theme-controls" style="margin-bottom:10px; display:none; gap:6px;">
    <button type="button" onclick="vtSetTheme('light')"
            style="padding:6px 10px; border:1px solid #cfcfcf; background:#fafafa; cursor:pointer; border-radius:4px;">
      Light
    </button>
    <button type="button" onclick="vtSetTheme('dark')"
            style="padding:6px 10px; border:1px solid #444; background:#222; color:#fff; cursor:pointer; border-radius:4px;">
      Dark
    </button>
    <button type="button" onclick="vtSetTheme('contrast')"
            style="padding:6px 10px; border:2px solid #000; background:#fffd00; color:#000; cursor:pointer; border-radius:4px;">
      Contrast
    </button>
  </div>

  <div style="font-weight:700; font-size:16px; margin-bottom:8px;">Transfers Summary</div>

  <!-- two-row quick totals -->
  <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
    <div style="flex:1 0 180px; border:1px solid #e1e1e1; border-radius:6px; padding:10px;">
      <div style="font-size:12px; opacity:0.8;">Total Records</div>
      <div id="vt-total-count" style="font-size:18px; font-weight:700;">0</div>
    </div>
    <div style="flex:1 0 220px; border:1px solid #e1e1e1; border-radius:6px; padding:10px;">
      <div style="font-size:12px; opacity:0.8;">Total Amount</div>
      <div id="vt-total-amount" style="font-size:18px; font-weight:700;">0</div>
    </div>
  </div>

  <!-- status grid -->
  <div style="display:grid; grid-template-columns: repeat(4, minmax(160px, 1fr)); gap:10px;">
    <div style="border:1px solid #e1e1e1; border-radius:6px; padding:10px;">
      <div style="font-weight:600; margin-bottom:6px;">SUCCESS</div>
      <div style="font-size:12px; opacity:0.8;">Count</div>
      <div id="vt-success-count" style="font-weight:700;">0</div>
      <div style="font-size:12px; opacity:0.8; margin-top:6px;">Amount</div>
      <div id="vt-success-amount" style="font-weight:700;">0</div>
    </div>

    <div style="border:1px solid #e1e1e1; border-radius:6px; padding:10px;">
      <div style="font-weight:600; margin-bottom:6px;">FAILED</div>
      <div style="font-size:12px; opacity:0.8;">Count</div>
      <div id="vt-failed-count" style="font-weight:700;">0</div>
      <div style="font-size:12px; opacity:0.8; margin-top:6px;">Amount</div>
      <div id="vt-failed-amount" style="font-weight:700;">0</div>
    </div>

    <div style="border:1px solid #e1e1e1; border-radius:6px; padding:10px;">
      <div style="font-weight:600; margin-bottom:6px;">REVERSED</div>
      <div style="font-size:12px; opacity:0.8;">Count</div>
      <div id="vt-reversed-count" style="font-weight:700;">0</div>
      <div style="font-size:12px; opacity:0.8; margin-top:6px;">Amount</div>
      <div id="vt-reversed-amount" style="font-weight:700;">0</div>
    </div>

    <div style="border:1px solid #e1e1e1; border-radius:6px; padding:10px;">
      <div style="font-weight:600; margin-bottom:6px;">CANCELLED</div>
      <div style="font-size:12px; opacity:0.8;">Count</div>
      <div id="vt-cancelled-count" style="font-weight:700;">0</div>
      <div style="font-size:12px; opacity:0.8; margin-top:6px;">Amount</div>
      <div id="vt-cancelled-amount" style="font-weight:700;">0</div>
    </div>
  </div>
</div>

        <div class="jtable-content" style="margin-top:50px">
            <table class="jmargin-top" id="viewtransferstable">
                <thead>
                    <tr>
                         <th> s/n </th>
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