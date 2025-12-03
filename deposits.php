<style>
    .content {
        display:flex;
        width: 100%;
    }
    .content .child {
        padding:10px;
    }
    .content .child:nth-child(1) {
        width: 35%;
        order: 2;
        -webkit-order: 2;
    }
    .content .child:nth-child(2) {
        width: 65%;
        padding-top: 0;
    }
    
    .content input:read-only {
        background-color: rgb(225, 227, 230, 0.5);
    }
    
    .customer-images {
        display:flex;
        margin-top: 10px;
        align-items:center;
        gap: 5px;
        flex-wrap: wrap;
    }
    
    
    .customer-images span{
        max-width: 32%;
        height: auto;
        border-radius: 5px;
        border: 1px solid lightgray;
        cursor: pointer;
        transition: all .4sec;
        overflow: hidden;
        
    }
    
     .customer-images span img {
         width: 100%;
     }
    
     .customer-images img:hover {
          opacity: .8;
      }
    
    @media all and (max-width: 760px) {
        .content {
            display: block;
        }
        .content .child:nth-child(1) {
            width: 100%;
             order: 1;
            -webkit-order: 1;
        }
        .content .child:nth-child(2) {
            width: 100%;
        }
    }
    
</style>
<div class="formcontainer overflowcontainer">
    <div class="formheader">
        <h5>DEPOSIT</h5>
    </div>
    <div class="formmain">
        <section class="content">
            <div class="child">
                <div class ="profile" style="padding:15px;border-radius:10px;border:1px solid rgb(50, 156, 97);;max-height:auto;background-color:rgb(10, 64, 34);">
                     <strong style="color:white">Customer Profile</strong>
                    <div style="display:flex;flex-direction:column;margin-top:15px;text-transform:capitalize;font-size:13px;font-weight:400;color:white">
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0">
                            <span style="font-weight:500;">First Name</span>
                            <span id="firstname"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">last Name</span>
                            <span id="lastname"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Other Name</span>
                            <span id="othername"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Mobile Number</span>
                            <span id="phone"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Domiciled Branch</span>
                            <span id="domicilebranch"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Account Type</span>
                            <span id="accounttype"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Gender</span>
                            <span id="gender"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Date Opened</span>
                            <span id="dateopened"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Marketer</span>
                            <span id="marketer"></span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid rgb(225, 227, 230, 0.3);">
                            <span style="font-weight:500;">Agreed Deposit</span>
                            <span id="agreed"></span>
                        </div>
                    </div>
                </div>
                <div class="customer-images"></div>
            </div>
            <div class="child">
                <form id="depositform">
                    <div >
                    <div style="padding:0 10px 20px 10px">
                        <div>
                            <div class="formcontrol" style="padding:0;margin:0">
                                <label>Account Number</label>
                                <input onblur="fetchDepositCustomerAccount()" type="number" class="accountnumber" id="accountnumber">
                            </div>
                        </div>
                    </div>
                    <div class="wrapper formsection hidden">
                        <p class="topformsection">Deposit Control</p>
                        <div class="split3">
                            <div class="formcontrol">
                                <label for="postinglimit">Posting Limit</label>
                                <input type="text" name="postinglimit" id="postinglimit" class="" readonly="readonly">
                            </div>

                            <div class="formcontrol">
                                <label for="counter">Counter</label>
                                <input type="text" name="counter" id="counter" class="" readonly="readonly">
                            </div>

                            <div class="formcontrol">
                                <label for="accountofficer">Account officer</label>
                                <select disabled name="accountofficer" id="accountofficer" class="">
                                    <option value=""></option>
                                </select>
                                <button class="sortarrow  iconbtns btnicon">
                                    <span class="userroll">
                                        <img src="images/icons/sort-arrows.png" alt="" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper formsection">
                        <p class="topformsection">Transaction Details</p>
                        <div class="split">
                            <div class="formcontrol">
                                <label for="transactiondate">Transaction Date</label>
                                <input disabled type="date" name="transactiondate" class=""
                                    id="transactiondate">
                            </div>
                            <div class="formcontrol">
                                <label for="valuedate">Value Date</label>
                                <input disabled type="date" name="valuedate" class="" id="valuedate">
                            </div>
                        </div>
    
                        <div class="split">
                            <div class="formcontrol">
                                <label>Depositor</label>
                                <input type="text" name="depositby" id="depositby" class="">
                            </div>
                            <div class="formcontrol">
                                <label>Amount Paid</label>
                                <input type="number" name="credit" id="amount" class="comma">
                            </div>
                        </div>
                            <div class="formcontrol">
                                <label for="valuedate">Type of deposit</label>
                                <select name="typeofdeposit" class="" id="typeofdeposit">
                                    <option>NORMAL</option>
                                    <option>NOT IN ACCOUNT</option>
                                </select>
                            </div>
                        <div class="split">
                            <div class="formcontrol hidden">
                                <label for="valuedate">Date of actual transaction</label>
                                <input type="date" name="dateofactualtransaction" class="" id="dateofactualtransaction">
                            </div>
                            <div class="formcontrol hidden">
                                <label for="valuedate">Marketer</label>
                                <select type="text" name="marketer" class="" id="marketer1">
                                    
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="formsection">
                        <div class="formcontrol" style="margin-bottom: 10px;">
                            <label>Upload voucher <span style="font-size:small;color:red"> (*Not more than 50kb)</span></label>
                            <input type="file"  id="voucher" accept=".png, .jpg, .jpeg">
                        </div>
                    </div>
                    <div class="btns btnend">
                        <button type="button" class=" btn btnmedium btnblue" id="submit">Submit</button>
                    </div>
                </div>
                </form>
            </div>
        </section>
    </div>
</div>