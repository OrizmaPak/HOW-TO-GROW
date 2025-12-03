<style>
    .content {
        display: flex;
        width: 100%;
    }

    .content .child {
        padding: 10px;
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
        display: flex;
        margin-top: 10px;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
    }

    .customer-images span {
        max-width: 32%;
        height: auto;
        border-radius: 5px;
        border: 1px solid lightgray;
        cursor: pointer;
        transition: all 0.4sec;
        overflow: hidden;
    }

    .customer-images span img {
        width: 100%;
    }

    .customer-images img:hover {
        opacity: 0.8;
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
        <h5>WITHDRAWAL</h5>
    </div>
    <div class="formmain" style="padding: 20px 0">
        <section class="content">
            <div class="child">
                <div class="profile" style="
            padding: 15px;
            border-radius: 10px;
            border: 1px solid rgb(50, 156, 97);
            max-height: auto;
            background-color: rgb(10, 64, 34);
          ">
                    <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: white;
            ">
                        <strong>Customer Profile</strong>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              ">
                            <span id="balance"></span>
                        </div>
                    </div>
                    <div style="
              display: flex;
              flex-direction: column;
              margin-top: 15px;
              text-transform: capitalize;
              font-size: 13px;
              font-weight: 400;
              color: white;
            ">
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
              ">
                            <span style="font-weight: 500">First Name</span>
                            <span id="firstname"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">last Name</span>
                            <span id="lastname"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Other Name</span>
                            <span id="othername"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Mobile Number</span>
                            <span id="phone"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Domiciled Branch</span>
                            <span id="domicilebranch"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Account Type</span>
                            <span id="accounttype"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Gender</span>
                            <span id="gender"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Date Opened</span>
                            <span id="dateopened"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Marketer</span>
                            <span id="marketer"></span>
                        </div>
                        <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-top: 1px solid rgb(225, 227, 230, 0.3);
              ">
                            <span style="font-weight: 500">Agreed Deposit</span>
                            <span id="agreed"></span>
                        </div>
                    </div>
                </div>
                <div class="customer-images"></div>
            </div>
            <div class="child">
                <form id="widthdrwalform">
                    <div>
                        <div style="padding: 0 10px 20px 10px">
                            <div>
                                <div class="formcontrol" style="padding: 0; margin: 0">
                                    <label>Account Number</label>
                                    <input onblur="fetchWithdrawalCustomerAccount();" type="number" class=""
                                        id="accountnumber" />
                                </div>
                                <div class="formcontrol" style="padding: 0; margin: 20px 0 40px 0"></div>

                <div id="propertytable" class="jtable-content hidden">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr>
                                <th> <input id="checkerall" type="checkbox" /> </th>
                                <th> row id </th>
                                <th> item name  </th>
                                <th> qty  </th>
                                <th> price </th>
                                <th style="
    min-width: 100px;
"> amount </th>
                            </tr>
                        </thead>
                        <tbody id="withdrwltabledata">
                            <!--
                            <tr>
                             <td> <input id="selectall" type="checkbox" /> </td>
                                <td> item id </td>
                                <td> item name  </td>
                                <td> qty  </td>
                                <td> price </td>
                                <td> amount </td>
                                <td> action </td>
                            </tr>
                            <tr>
                             <td> <input id="selectall" type="checkbox" /> </td>
                                <td> item id </td>
                                <td> item name  </td>
                                <td> qty  </td>
                                <td> price </td>
                                <td> amount </td>
                                <td> action </td>
                            </tr>-->
                        </tbody>
                        <tbody id="">
                            <tr>
                                <td style="border: none">   </td>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="font-weight: bold;text-align: right"> Total Amount:  </td>
                                <td style="font-weight: bold;" id="withdrawalviewtotal">  </td>
                                <td style="border: none">  </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                                <div id="propertytoggles" class="hidden" style="
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    margin-top: 10px;
                  ">
                                    <!--<div class="col-md-6 mt-lg-4" style="border-right: 1px solid lightgray;padding: 0 10px">-->
                                    <!--    <div class="checkbox switchergrey oresec9 mt-lg-2">-->
                                    <!--        <label for="customertogl" class="my-1 chekk">-->
                                    <!--            <input style="width: 95%" class="hidden" type="checkbox" id="orecustomertogl9" value="customertogl" name="customertogl">-->
                                    <!--            <div style="transform: scale(0.7);" id="swittchhtr9"><small class="" id="whiteball9"></small></div>-->
                                    <!--            Bank with #100-->
                                    <!--        </label>-->
                                    <!--    </div>-->
                                    <!--</div>-->

                                    <div class="col-md-6 mt-lg-4 mll"
                                        style="border-right: 1px solid lightgray; padding: 0 10px">
                                        <div class="checkbox switchergrey oresec10 mt-lg-2">
                                            <label for="customertogl" class="my-1 chekk">
                                                CASH
                                                <input style="width: 95%" class="hidden" type="checkbox"
                                                    id="orecustomertogl10" value="customertogl" name="customertogl" />
                                                <div style="transform: scale(0.7)" id="swittchhtr10">
                                                    <small class="" id="whiteball8"></small>
                                                </div>
                                                TRANSFER
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-md-6 mt-lg-4 mll">
                                        <div class="checkbox switchergrey oresec8 mt-lg-2">
                                            <label for="customertogl" class="my-1 chekk">
                                                <input style="width: 95%" class="hidden" type="checkbox"
                                                    id="orecustomertogl8" value="customertogl" name="customertogl" />
                                                <div style="transform: scale(0.7)" id="swittchhtr8">
                                                    <small class="" id="whiteball8"></small>
                                                </div>
                                                (3rd party)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: none; background-color: rgb(225, 227, 230, 0.5)" id="thirdparty"
                            class="wrapper formsection">
                            <p class="topformsection">ENTER NEW BANK DETAILS</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                                <div class="formcontrol">
                                    <label for="bankaccount3">Bank Name</label>
                                    <select type="text" id="bankaccount3"></select>
                                </div>
                                <div class="formcontrol">
                                    <label for="bank3">Bank account number</label>
                                    <input type="number" id="bank3" />
                                </div>
                            </div>
                                <div class="formcontrol">
                                    <label for="bank3">Beneficiary Name</label>
                                    <input type="text" id="beneficiaryname" readonly style="background: transparent;border:none"/>
                                </div>
                        </div>

                        <div class="wrapper formsection hidden">
                            <p class="topformsection">WITHDRAWAL CONTROL</p>

                            <div class="split3">
                                <div class="formcontrol">
                                    <label for="postinglimit">Posting Limit</label>
                                    <input type="text" name="postinglimit" id="postinglimit" class=""
                                        readonly="readonly" />
                                </div>

                                <div class="formcontrol">
                                    <label for="counter">Counter</label>
                                    <input type="text" name="counter" id="counter" class="" readonly="readonly" />
                                </div>

                                <div class="formcontrol hidden">
                                    <label for="accountofficer">Account officer</label>
                                    <select name="accountofficer" id="accountofficer" class="" disabled>
                                        <option value=""></option>
                                    </select>
                                    <button class="sortarrow iconbtns btnicon">
                                        <span class="userroll">
                                            <img src="images/icons/sort-arrows.png" alt="" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="wrapper formsection">
                            <p class="topformsection">TRANSACTION DETAILS</p>
                            <div class="split3">
                                <div class="formcontrol">
                                    <label for="transactiondate">Transaction Date</label>
                                    <input type="date" name="transactiondate" class="" id="transactiondate"
                                        readonly="readonly" />
                                </div>
                                <div class="formcontrol">
                                    <label for="valuedate">Value Date</label>
                                    <input type="date" name="valuedate" class="" id="valuedate" readonly="readonly" />
                                </div>
                                <div class="formcontrol">
                                    <label for="withdrawalid">Withdrawal By</label>
                                    <input type="text" name="withdrawalby" class="" readonly="readonly"
                                        id="withdrawalby" />
                                </div>
                            </div>

                            <div class="split">
                                <div class="formcontrol">
                                    <label for="debitslipno">Debit Slip No</label>
                                    <input type="number" name="debitslipno" class="" id="debitslipno" />
                                </div>
                                <div class="formcontrol">
                                    <label for="serialno">Serial No</label>
                                    <input type="number" name="serialnumber" class="" id="serialno" />
                                </div>
                            </div>

                            <div>
                                <div class="formcontrol">
                                    <label for="amountdebited">Amount Debited</label>
                                    <input type="number" name="debit" id="amountdebited" class="comma" />
                                </div>

                                <div class="formcontrol hidden">
                                    <label for="servicecharge">Service Charge</label>
                                    <input readonly="readonly" type="number" name="servicecharge" id="servicecharge"
                                        class="" />
                                </div>
                                <div class="formcontrol hidden">
                                    <label for="totalamount">Total Amount</label>
                                    <input readonly="readonly" type="number" name="debittotal" id="totalamount"
                                        class="" />
                                </div>
                            </div>
                        </div>
                        <div id="bankdetails" class="formsection" style="display: none">
                            <p class="topformsection">BANK DETAILS</p>
                            <div>
                                <div class="split">
                                    <div class="formcontrol">
                                        <label for="bank1">Bank - 1</label>
                                        <input type="text" name="bank1" class="" id="bank1" readonly="readonly" />
                                        <p style="color: blue" id="bank1name"></p>
                                    </div>
    
                                    <div class="formcontrol">
                                        <label>Account Number - 1</label>
                                        <input type="text" name="bankaccount1" class="" id="bankaccount1"
                                            readonly="readonly" />
                                    </div>
                                </div>
                                <input type="checkbox" title="Click to select this bank">
                            </div>
                            <div>
                                <div class="split">
                                    <div class="formcontrol">
                                        <label for="bank2">Bank - 2</label>
                                        <input type="text" name="bank2" class="" id="bank2" readonly="readonly" />
                                        <p style="color: blue" id="bank2name"></p>
                                    </div>
    
                                    <div class="formcontrol">
                                        <label>Account Number - 2</label>
                                        <input type="text" name="bankaccount2" class="" id="bankaccount2"
                                            readonly="readonly" />
                                    </div>
                                </div>
                                <input type="checkbox" title="Click to select this bank">
                            </div>
                        </div>
                        <div class="formsection">
                            <div class="formcontrol" style="margin-bottom: 10px">
                                <label>Upload voucher
                                    <span style="font-size: small; color: red">
                                        (*Not more than 50kb)</span></label>
                                <input type="file" id="voucher" accept=".png, .jpg, .jpeg" />
                            </div>
                        </div>

                        <div style="display: flex;align-items: center;justify-content: space-between;">
                            <div style="display: flex; align-items: center">
                                <div>
                                    <label class="jcontrollabel">Send&nbsp;for&nbsp;Approval:&nbsp;</label>
                                    <label class="switch j-slider jmargin-top">
                                        <input type="checkbox" id="sendforapproval" name="sendforapproval"
                                            disabled="disabled" checked />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                                <div class="jmargin-left">
                                    <label class="jcontrollabel">Transfer to customer's commercial bank account
                                    </label>
                                    <label class="switch j-slider jmargin-top">
                                        <input type="checkbox" id="transfertocustomercbank"
                                            name="transfertocustomercbank" />
                                        <span class="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <button type="button" class="j-action-btn" id="submit" style="width: max-content">
                                Debit Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </div>
</div>