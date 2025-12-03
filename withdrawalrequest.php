<div class="" style="overflow: auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 40px;
    width: 100%;">
    <form  id="withdrawalrequestform" style="width:90%">
  <div class="matsubheader" style="width:100%;display:flex;justify-content: center;margin-bottom:50px">
    <h4>WITHDRAWAL REQUEST</h4>
  </div>
  
  <div class="split">
    <div class="formcontrol">
      <label for="itemtype">account number</label>
      <input type="number" name="accountnumber" id="accountnumber" class="itemtype">
    </div>
    <div class="formcontrol">
      <label for="itemname">account name</label>
      <input type="text" name="accountname" id="accountname" readonly class="itemname">
    </div>
  </div>
  <div class="split">
    <div class="formcontrol">
      <label for="model">account officer</label>
      <input type="text" name="accountofficer" readonly id="accountofficer" class="model">
    </div>
    <div class="formcontrol">
      <label for="cost">request date</label>
      <input type="date" name="requestdate" id="requestdate" value="0" class="cost">
    </div>
  </div>
  <div class="">
    <div class="formcontrol">
      <label for="savingselling">amount</label>
      <input type="number" id="amount" class="savingselling comma" value="0" name="amount">
    </div>
  </div>
  <input type="hidden" id="withdrawalrequestedit">
  <div class="btns btncenter" style="margin-top:66px">
    <button type="button" class="btnsizetwo btn btnblue" id="submit">Submit</button>
    <button type="button" class="btnsizetwo btn btnred" id="cancel">Cancel</button>
  </div>
</form>
</div>
