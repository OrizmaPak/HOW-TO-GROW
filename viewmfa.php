<div class="formcontainer overflowcontainer">
  <div class="formheader">
    <h5>VIEW MFA</h5>
  </div>

  <div class="formmain">
    <form action="">

      <div class="split">
        <div class="formcontrol">
          <label for="viewmfastartdate">Start Date</label>
          <input type="date" class="stockledgdate" id="viewmfastartdate" />
        </div>
        <div class="formcontrol">
          <label for="viewmfaenddate">End Date</label>
          <input type="date" class="stockledgdate" id="viewmfaenddate" />
        </div>
      <div class="formcontrol">
        <label for="viewmfalocation">Satus</label>
        <select class="orejot stockledgreceivedfrom" id="viewmfastatus">
          <option value=""></option>
          <option>PENDING</option>
          <option>AUTHENTICATED</option>
        </select>
      </div>
      </div>

      <div class="formcontrol">
        <div class="wrapbtn" style="justify-content: flex-end">
          <button type="button" class="createbranchbtn btn btnmedium btnblue mb" id="viewmfafetchview">
            View
          </button>
        </div>
      </div>
    </form>

    <!-- Table 1 -->
    <div class="jtable-content">
      <table class="jmargin-top" id="viewmfaoretable">
        <thead>
          <tr>
              <th>S/N</th>
              <th>User</th>
              <th>Auth Code</th>
              <th>Request Time</th>
              <th>Expiry Time</th>
              <th>Status</th>
            </tr>

        </thead>
        <tbody id="viewmfaorehistorytablecontent"></tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="j-table-status jflex jcontent-between jmargin-top">
      <span class="jcontrollabel" style="text-transform: none" id="pagination-status"></span>
      <span class="jflex jpagination">
        <button class="j-no-bg" type="button" id="jprev-button">Previous</button>
        <span id="pagination-numbers"></span>
        <button class="j-no-bg" type="button" id="jnext-button">Next</button>
      </span>
    </div>

    <!-- Table 2 (hidden by default) -->
    <div id="viewmfaorefulltableparant" class="jtable-content hidden">
      <table class="jmargin-top" id="viewmfaoretable2">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Branch</th>
            <th>Entry Date</th>
            <th>Delivery Date</th>
            <th style="width: 350px">Task</th>
            <th style="width: 150px">Action</th>
          </tr>
        </thead>
        <tbody id="viewmfa2orehistorytablecontent"></tbody>
      </table>
    </div>

    <!-- Print & Export Buttons -->
    <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
      <div class="orerbtn" id="viewmfaprint">Print</div>
      <div style="background: green; width: 90px;" class="orerbtn" id="viewmfaexport">Export Excel</div>
    </div>

    <!-- Modal (hidden) -->
    <div class="hidden" style="position: fixed; width: 100%; height: 100%; background: #151A1570; top: 0; display: flex; justify-content: center; align-items: center;">
      <div style="width: 50%; min-width: 400px; height: 70%; min-height: 200px; background: white; border-radius: 20px; padding: 15px;">
        Modal content goes here
      </div>
    </div>
  </div>
</div>
