<div class="jcontainer">
    <h1 class="jpageheader">ORGANISATION INFORMATION</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <div class="flex" style="align-items:center;justify-content:space-beween;">
                <input id="profile-image-upload-input" type="file" hidden="">
                <img id="profile-image" class="first-section-image" src="" alt="logo" width="70"
                    height="70">
                <svg style="border:1px solid black;border-radius:50%;background-color:white;transform:translate(-50px, 10px);border:4px solid white;" class="pencil-upload-image" id="profile-img-edit-icon" xmlns="http://www.w3.org/2000/svg" x="0px"
                    y="0px" width="20" height="20" viewBox="0 0 30 30" style=" fill:#f5f5f5;">
                    <path
                        d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z">
                    </path>
                </svg>
            </div>
            <div class="">
                <div class="subpages-header" style="border-bottom:1px solid lightgray;width:100%;margin-bottom:50px">
                    <p class="subpages-header-active" id="basic-info-toggler">Basic Info</p>
                    <p id="account-prefix-toggler">Account Prefix</p>
                    <p id="default-accounts-toggler">Default Accounts</p>
                </div>
                <form class="jform" style="margin-top: 15px;" id="organisation-info-div-basic-info">
                    <div class="col-form-group" >
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Company Name<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="company-name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">SMS Sender ID<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="sms-sender-id" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Number of users</label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="number-of-users">
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Telephone<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="tel" name="" id="telephone" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Mobile</label>
                                <input class="jformcontrol jmargin-top" type="tel" name="" id="mobile">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Email<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="email" required>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Address<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="address" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">SMS Charge<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="sms-charge" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">SMS Charge Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="sms-charge-account" name="smschargeaccount" class="jformcontrol jmargin-top" required>
                                    <option selected="" value="" disabled>Select style="max-width: 300px" SMS charge account to credit</option>
                                    <option> 8001000010 | LOAN FEES</option>
                                    <option> 8001000026 | LOAN PROVISIONING</option>
                                    <option> 8001000009 | COMMISSIONS</option>
                                    <option> 8001000011 | PENALTIES</option>
                                    <option> 8001000012 | CHARGES</option>
                                    <option> 8001000021 | GENERAL INCOME</option>
                                    <option> 8001000008 | LOAN INTEREST</option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">VAT Rate (%)<span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="vat-rate" name="vatrate" class="jformcontrol jmargin-top" required>
                                    <option selected value="" disabled></option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6">6</option>
                                    <option value="6.5">6.5</option>
                                    <option value="7">7</option>
                                    <option value="7.5">7.5</option>
                                    <option value="8">8</option>
                                    <option value="8.5">8.5</option>
                                    <option value="9">9</option>
                                    <option value="9.5">9.5</option>
                                    <option value="10">10</option>
                                    <option value="10.5">10.5</option>
                                    <option value="11">11</option>
                                    <option value="11.5">11.5</option>
                                    <option value="12">12</option>
                                    <option value="12.5">12.5</option>
                                    <option value="13">13</option>
                                    <option value="13.5">13.5</option>
                                    <option value="14">14</option>
                                    <option value="14.5">14.5</option>
                                    <option value="15">15</option>
                                    <option value="15.5">15.5</option>
                                    <option value="16">16</option>
                                    <option value="16.5">16.5</option>
                                    <option value="17">17</option>
                                    <option value="17.5">17.5</option>
                                    <option value="18">18</option>
                                    <option value="18.5">18.5</option>
                                    <option value="19">19</option>
                                    <option value="19.5">19.5</option>
                                    <option value="20">20</option>
                                    <option value="20.5">20.5</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">WHT Rate (%)<span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="wht-rate" name="whtrate" class="jformcontrol jmargin-top" required>
                                    <option selected value="" disabled></option>
                                    <option value="4">4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="5">5</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6">6</option>
                                    <option value="6.5">6.5</option>
                                    <option value="7">7</option>
                                    <option value="7.5">7.5</option>
                                    <option value="8">8</option>
                                    <option value="8.5">8.5</option>
                                    <option value="9">9</option>
                                    <option value="9.5">9.5</option>
                                    <option value="10">10</option>
                                    <option value="10.5">10.5</option>
                                    <option value="11">11</option>
                                    <option value="11.5">11.5</option>
                                    <option value="12">12</option>
                                    <option value="12.5">12.5</option>
                                    <option value="13">13</option>
                                    <option value="13.5">13.5</option>
                                    <option value="14">14</option>
                                    <option value="14.5">14.5</option>
                                    <option value="15">15</option>
                                    <option value="15.5">15.5</option>
                                    <option value="16">16</option>
                                    <option value="16.5">16.5</option>
                                    <option value="17">17</option>
                                    <option value="17.5">17.5</option>
                                    <option value="18">18</option>
                                    <option value="18.5">18.5</option>
                                    <option value="19">19</option>
                                    <option value="19.5">19.5</option>
                                    <option value="20">20</option>
                                    <option value="20.5">20.5</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Allow Back-Dated Transaction<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px" id="allow-back-dated-transaction" class="jformcontrol jmargin-top" required>
                                    <option selected value="" disabled></option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Allow Future Transaction<span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="allow-future-transaction" class="jformcontrol jmargin-top" required>
                                    <option selected value="" disabled></option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Automate Memorandum<span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="automate-memorandum" class="jformcontrol jmargin-top" required>
                                    <option selected value="" disabled></option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Automate SMS Charges<span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="automate-sms-charge" class="jformcontrol jmargin-top" required>
                                    <option selected value="" disabled></option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Set Accounting Year End<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="date" name="" id="set-accounting-year-end" required>
                            </div>
                        </div>
                         <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">No of Days for Property Notice<span class="required-span"></span></label>
                                <input class="jformcontrol jmargin-top" type="text" value="15" name="" id="noofdaysforpropertynotice" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">No of Days to Set Aside Property Stock<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" value="30" name="" id="noofdaystosetasidepropertystock" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Schedule Maintenance Charge<span class="required-span">*</span></label>
                                <select style="max-width: 300px" required id="schedulemaintenancecharge" class="jformcontrol jmargin-top">
                                    <option selected>NO</option>
                                    <option>BEGINING OF MONTH</option>
                                    <option>END OF MONTH</option>
                                </select>
                            </div>
                        </div>
                         <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Maintenance Charge<span class="required-span"></span></label>
                                <input class="jformcontrol jmargin-top" type="text" value="0" name="" id="maintenancecharge" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Schedule Savings Interest <span class="required-span">*</span></label>
                                <select style="max-width: 300px" required id="schedulesavingsinterest" class="jformcontrol jmargin-top">
                                    <option selected>NO</option>
                                    <option>BEGINING OF MONTH</option>
                                    <option>END OF MONTH</option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Schedule Loan Repayment <span class="required-span">*</span></label>
                                <select style="max-width: 300px" id="scheduleloanrepayment" class="jformcontrol jmargin-top" required>
                                    <option selected>NO</option>
                                    <option>END OF MONTH</option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Registration Charge<span class="required-span"></span></label>
                                <input class="jformcontrol jmargin-top" type="text" value="0" name="" id="registrationcharge" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Renewal Charge<span class="required-span"></span></label>
                                <input class="jformcontrol jmargin-top" type="text" value="0" name="" id="renewalcharge" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Replacement Charge<span class="required-span"></span></label>
                                <input class="jformcontrol jmargin-top" type="text" value="0" name="" id="replacementcharge" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Multi-factor Auth.<span class="required-span"></span></label>
                                <select style="max-width: 300px" id="mfa" class="jformcontrol jmargin-top" required>
                                    <option>OFF</option>
                                    <option>ON</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <form class="jform" style="margin-top: 15px;" id="organisation-info-div-account-prefix" hidden="">
                    <div class="col-form-group" >
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Savings Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="savings-account-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Isusu Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="isusu-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Personal Account Current Prefix</label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="personal-account-current-prefix">
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Group Current Account Prefix<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="tel" name="" id="group-current-account-prefix"
                                    required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Loan Account Prefix</label>
                                <input class="jformcontrol jmargin-top" type="tel" name="" id="loan-account-prefix">
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Loan Transaction Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="loan-transaction-prefix" required>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">OD Transaction Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="od-transaction-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Customer Transaction Prefix<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="customer-transaction-prefix"
                                    required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">General Ledger<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="general-ledger-account-prefix"
                                    required>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Fixed Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="general-ledger-transaction-prefix"
                                    required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Asset GL Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="fixed-account-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Cash GL Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="asset-gl-account-prefix" required>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Expense GL Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="cash-gl-account-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Equity GL Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="expense-gl-account-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Payable GL Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="equity-gl-account-prefix" required>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Recievable GL Account Prefix<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="payable-gl-account-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Liabilities GL Account Prefix<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="receivable-gl-account-prefix"
                                    required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">Income GL Account Prefix<span class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="liabilities-gl-account-prefix" required>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Depreciation GL Account Prefix<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="income-gl-account-prefix" required>
                            </div>
                            <div class="jformgroup jformgroupcol  jmargin-left">
                                <label for="company-name" class="jcontrollabel">General Ledger Account Prefix<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="depreciation-gl-account-prefix"
                                    required>
                            </div>
                        </div>
                    </div>
                </form>
                <form class="jform" style="margin-top: 15px;" id="organisation-info-div-default-accounts" hidden="">
                    <div class="col-form-group">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default GL Income Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-income-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left"> 
                                <label for="company-name" class="jcontrollabel">Default GL Asset Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-asset-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Loan Provisioning Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="loan-provisioning-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default GL Savings Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-savings-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default GL Esusu Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-esusu-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default GL Cash Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-cash-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default GL Teller Cash Account<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-teller-cash-account"
                                    required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default GL OD Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-od-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Current Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-current-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default GL Tax Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-tax-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Fixed Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-fixed-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Fixed Interest Account<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-fixed-interest-account"
                                    required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default Expense Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-expense-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Loan Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-loan-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Non-Cash Account (Bank Account)<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-non-cash-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default Sales Account<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-mandatory-savings-account"
                                    required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Mandatory Savings Account Rate<span
                                        class="required-span">*</span></label>
                                <input class="jformcontrol jmargin-top" type="text" name="" id="mandatory-savings-account-rate"
                                    required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default GL staff Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-gl-staff-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default RRR Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-rrr-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Property Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-property-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Branch Cash Account<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-branch-cash-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default Excess Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-excess-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Return Cash Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-return-cash-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default NIA Account<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="Default-nia-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">Default Bank Account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-bank-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Inventory<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-inventory" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Default Payable Account<span
                                        class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-payable-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroup form_row" >
                            <div class="jformgroup jformgroupcol">
                                <label for="company-name" class="jcontrollabel">default-receivable-account<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default-receivable-account" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label for="company-name" class="jcontrollabel">Cash to bank account.<span class="required-span">*</span></label>
                                <select style="max-width: 300px"  class="jformcontrol jmargin-top" type="text" name="" id="default_cashtobankaccount" required>
                                    <option value =""> --Select default account -- </option>
                                </select>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                            </div>
                        </div>
                    </div>
                </form>
                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="btnSaveChanges"> Submit </button>
                </div>
                <div style="height: 150px;width:100%"></div>
                
            </div>
        </div>
    <div>
</div>