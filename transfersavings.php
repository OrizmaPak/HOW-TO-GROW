<?php
session_start();
// if(!isset($_SESSION["email"]) || $_SESSION["email"] === null){
//     exit('
//         <div style="position:absolute;left:0;background-color: rgb(0,0,0);background-color: rgba(0,0,0,0.4);height:100vh;width:100%; z-index: 9999;  transition: 2s;">
//             <div style="margin: 100px auto;width: 300px;background-color:white; padding:20px">
//                 <div>
//                   <h6 style="text-align:center;color: tomato;margin-bottom: 5px"><i class="fa fa-exclamation-circle"></i> SESSION EXPIRED</h6>
//                   <p style="opacity:.8;font-size:14px;">Please reload and login or click logout</p>
//                   <a style="display:block;margin-right:0;width:max-content;padding:8px 12px;background-color:green; font-size:13px;font-weight:500;border-radius:2px;color:white;margin-top:13px" href="login.php">Logout</a>
//                 </div>
//             </div>
//         </div>'
//     );
// }
// ?>
<div class="jcontainer">
    <h1 class="jpageheader">TRANSFER  SAVINGS</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="savingstransferform" autocomplete="off">
                <div class="col-form-group" >
                    <div class="jformgroup form_row" style="gap: 50px;align-items:start">
                        <div class="jformgroup jformgroupcol" style="gap: 20px">
                            <div class="jformgroup form_row" style="gap: 20px">
                                <div class="jformgroup jformgroupcol">
                                    <div class="section-header" style="display:flex; gap:6px; align-items:center;justify-content:space-between;">
                                        <h1>Transfer from</h1>
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        <label  class="jcontrollabel">Account Number</label>
                                        <input type="number" class="jformcontrol jmargin-top" id="accountnumberfrom" name="sourceaccountnumber">
                                    </div>
                                </div>
                                <div class="jformgroup jformgroupcol">
                                    <div class="section-header" style="display:flex; gap:6px; align-items:center;justify-content:space-between;">
                                        <h1>Transfer to</h1>
                                    </div>
                                    <div class="jformgroup jformgroupcol">
                                        <label  class="jcontrollabel">Account Number</label>
                                        <input type="number" class="jformcontrol jmargin-top" id="accountnumberto" name="destinationaccountnumber">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1>Other Information</h1>
                            </div>
                            
                            <div class="jformgroup form_row">
                                 <div class="jformgroup jformgroupcol">
                                    <label class="jcontrollabel">Branch</label>
                                    <select class="jformcontrol jmargin-top" id="location" disabled name="location">
                                        <option value=""> -- Select Branch -- </option>
                                    </select>
                                </div>
                                 <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label  class="jcontrollabel">Transaction Date</label>
                                    <input type="date" class="jformcontrol jmargin-top" id="transactiondate" name="transactiondate">
                                </div>
                                 <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label class="jcontrollabel">Transfer Amount</label>
                                    <input type="number" class="jformcontrol jmargin-top" id="amount"  name="transferamount">
                                </div>
                            </div>
                            
                            <div class="jformgroup form_row">
                                 <div class="jformgroup jformgroupcol">
                                    <label  class="jcontrollabel">description</label>
                                    <textarea class="jformcontrol jmargin-top" id="description" name="description"></textarea>
                                </div>
                            </div>
                            
                             <div class="jflex">
                                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="submit"> Transfer </button>
                            </div>
                            
                        </div>
                        <div class="jformgroup" id="propertyprev" style="display:none">
                            <div style="width: inherit">
                                <div style="padding:10px;width:inherit;background-color:#f7faf8;padding: 10px;border:1px solid lightgray;" id="result-area">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>