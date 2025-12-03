<style>
    /* If you like this, be sure to ❤️ it. */
.wrapper {
  height: 100vh;
  /* This part is important for centering the content */
  display: flex;
  align-items: center;
  justify-content: center;
  /* End center */
  background: -webkit-linear-gradient(to right, #834d9b, #d04ed6);
  background: linear-gradient(to right, #834d9b, #d04ed6);
}

.wrapper a {
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  text-transform: uppercase;
  color: #585858;
  font-family: 'Roboto', sans-serif;
}

.modal {
  visibility: visible;
  opacity: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.18);
  transition: all .4s;
}


.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #fff;
  padding: 1em 2em;
}

.modal__footer {
  text-align: right;
  a {
    color: #585858;
  }
  i {
    color: #d02d2c;
  }
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}
</style>



    



<!--<div id="demo-modal" onclick="if(event.target.id == 'demo-modal')this.classList.add('hidden')" class="modal">-->
<div id="demo-modal" class="modal hidden">
    <div class="modal__content">
        <div style="width:100%;display:flex;justify-content:flex-end">
              <button type="button" title="Close Modal" onclick="document.getElementById('demo-modal').classList.add('hidden')" class="j-action-btn" style="padding:5px;padding-right: 10px;padding-left: 10px;background:white; text-transform: capitalize;color:red;border: 1px solid red; margin-bottom: 10px" id="addaccountmodalrow" onclick="addaccountmodalrow()"> X - close</button>
        </div>
          <div class="jformgroup jformgroup "> 
                <div class="jformgroup jformgroupcol">
                    <label  class="jcontrollabel">account number</label> 
                    <input type="number" id="accountnumbermodal" readonly class="jformcontrol jmargin-top cont" />
                    <input type="hidden" id="amountmodal" readonly class="jformcontrol jmargin-top" />
                </div>
            </div>
            <div class="jtable-content" style="margin-top:10px">
                <table class="jmargin-top" id="statementindailydetailtablemodal"> 
                    <thead>
                        <tr>
                            <th>destination account</th>  
                            <th>credit</th> 
                            <th>
                                <button type="button" class="j-action-btn" title="Add entry row" style="padding:5px;padding-right: 10px; padding-left: 10px; text-transform: capitalize;width:inherit;;background:green;" id="addaccountmodalrow" onclick="addaccountmodalrow()"> + </button>
                            </th>
                        </tr> 
                    </thead>
                    <tbody id="statementindailydetailmodalrowbody">
                        <tr class="source-row-item">
                            <td><label  class="jcontrollabel hidden">destination account number</label> <input type="number" id="dan-1" name="destinationaccountnumbermodal" class="jformcontrol cont" onchange="gettheaccountnamemodal(this)" /><p></p></td>
                            <td><label  class="jcontrollabel hidden">credit</label> <input type="number" name="creditmodal" id="credit-1" class="jformcontrol cont"  onchange="calculateallmodalamount()"/></td>
                            <td>
                                <button type="button" title="Remove this entry row" onclick="this.parentElement.parentElement.remove();calculateallmodalamount()" class="j-action-btn" style="padding:5px;padding-right: 10px;padding-left: 10px;background:red; text-transform: capitalize;width:inherit;" id="addaccountmodalrow" onclick="addaccountmodalrow()"> - </button>
                            </td>
                        </tr>
                        <tr id="tablefooterr">
                            <td style="text-transform: uppercase;font-weight:bold;text-align:left">Amount left: </td>
                            <td style="text-transform: uppercase;font-weight:bold;text-align:left">0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          <div class="jformgroup jformgroup " style="margin-top: 10px">
                <div class="jformgroup jformgroupcol">
                    <label  class="jcontrollabel">reference</label>
                    <input type="text" id="referencemodal" readonly class="jformcontrol jmargin-top cont" />
                </div>
                 <div class="jformgroup jformgroupcol  jmargin-left">
                    <label  class="jcontrollabel">transaction date</label>
                    <input type="date" id="transactiondatemodal" readonly class="jformcontrol jmargin-top cont" />
                </div>
            </div>
          <div class="jformgroup jformgroup " style="margin-top: 10px">
                <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Account Officer: </label>
                        <input list="officers" placeholder="Enter Account Officer email" style="text-transform:capitalize" type="text" onchange="checkdatalist(this)"  class="jformcontrol jmargin-top" id="accofficer" onblur="showlabel(this)" name="accountofficer"/>
                    </div>
                <div class="flex no-pr jmargin-left" style="align-items:center">
                   <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;margin-top: 26px" id="submitmodal"> Submit </button>
                </div>
            </div>
    </div>
</div>

<datalist id="officers"></datalist>






<div class="jcontainer">
    <h1 class="jpageheader pr-only">HOW TO GROW</h1>
    <h1 class="jpageheader pr-hide">Statement In Daily Detail</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="filterstatementindailydetailform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <!--<div class="jformgroup jformgroup form_row">-->
                        <!--<div class="jformgroup jformgroupcol jmargin-left">-->
                        <!--    <label class="jcontrollabel"> Location: </label>-->
                        <!--    <select class="jformcontrol jmargin-top" id="location" name="location">-->
                        <!--        <option value="" selected="">--Select Location--</option>-->
                        <!--    </select>-->
                        <!--</div>-->
                    <!--</div>-->
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
                    <!--<span class="pr-hide hidden" style="display:none;border-radius:5px;border:1px solid lightgray;padding:7px;background-color:rgb(225, 227, 230, 0.5);font-size:10px">-->
                        <p class="hidden" style="display: none">Account Officer: &nbsp;<strong id="accountofficer"></strong> </p>
                    <!--</span>-->
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
            <div id="jtabledata1"></div>
                <table class="jmargin-top" id="statementindailydetailtable">
                    <thead>
                                                <tr>
                            <th>S/N</th>
                            <th>transaction Date</th>
                            <th>value Date</th>
                            <!--<th>Account Name</th>--> 
                            <th>description</th>
                            <th>Reference</th>
                            <th>D. slip no</th>
                            <th id="pitem">Property Items</th>
                            <th>Type</th>
                            <th>Credit</th>
                            <th>Debit</th>
                            <th>service charge</th>
                          <th>Total Credit</th>
                          <th>Total Debit</th>
                            <th>Balance</th>
                            <th id="otherinfo" class="hidden">other info</th>
                            <th>Action</th>
                        </tr>
                    </thead> 
                    <tbody id="jtabledata"></tbody>
                    <tfoot id="jtablefoot"></tfoot>
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
