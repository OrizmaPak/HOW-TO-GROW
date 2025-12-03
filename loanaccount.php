<?php session_start() ?>

<div class="jcontainer">
    <div>
        <h1 class="jpageheader"> loan account </h1>
    </div>
    <div class="jpagecontent">
        <div>
            <form class="jform" id="loanaccountform">

                <div class="section-header">
                    <h1>account info</h1>
                </div>
                <div class="jformcontainer">
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> borrower: </label>
                            <input placeholder="Enter Borrower Name" autocomplete="on" type="text"
                                class="jformcontrol jmargin-top" id="customerids" name="customerids" list="customers">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> loan product: </label>
                            <input list="loanproductss" class="jformcontrol jmargin-top" id="loanproduct" name="loanproduct" autocomplete="on">
                                
                        </div>
                    </div>
                </div>

                <!-- load terms -->

                <div class="section-header">
                    <h1> loan terms </h1>
                </div>
                <div class="col-form-group">
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Loan Principal: </label>
                            <input type="number" placeholder="Principal Amount" class="jformcontrol jmargin-top"
                                id="principalamount" name="principalamount">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> loan begin date: </label>
                            <input type="date" class="jformcontrol jmargin-top" id="begindate" name="begindate">
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> interest method: </label>
                            <select class="jformcontrol jmargin-top" name="interestmethod" id="interestmethod">
                                <option value="" selected=""> -- Select Interest Method --</option>
                                <option value="No Interest">No Interest</option>
                                <option value="Flat Rate">Flat Rate</option>
                                <option value="One Off Interest">One Off Interest</option>
                                <option value="Interest Only">Interest Only</option>
                                <option value="Equal Installments (Reducing Balance)">Equal Installments
                                    (Reducing Balance)</option>

                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> interest type: </label>
                            <select class="jformcontrol jmargin-top" id="interesttype">
                                <option value="" selected="">None</option>
                                <option value="Percentage Based">Percentage Based (%)</option>
                                <option value="Fixed Amount Per Cycle">Fixed Amount Per Cycle</option>
                                <option value="One Off Amount">One Off Amount</option>
                            </select>
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> interest: </label>
                            <div class="col-form-group">
                                <input placeholder="interest (%)" type="number" class="jformcontrol jmargin-top" value="0"
                                    id="interestrate" name="interestrate">
                                <select autocomplete="on" class="jformcontrol" id="interestperiod">
                                    <option value="" selected="">--Select&nbsp;Interest&nbsp;Period--&nbsp;
                                    </option>
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Every 2 Weeks">Every 2 Weeks</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Every 2 Months">Every 2 Months</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Every 4 Months">Every 4 Months</option>
                                    <option value="Semi-Annually">Semi-Annually</option>
                                    <option value="Annually">Annually</option>
                                </select>
                            </div>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Duration: </label>
                                <div class="col-form-group">
                                    <input placeholder="Duration" type="number" class="jformcontrol jmargin-top"
                                        id="loanduration" name="loanduration">
                                    <select autocomplete="on" class="jformcontrol" id="loandurationfactor"
                                        name="loandurationfactor">
                                        <option value="" selected="">--Select&nbsp;Loan&nbsp;Duration--&nbsp;
                                        </option>
                                        <option value="Day">Day</option>
                                        <option value="Week">Week</option>
                                        <option value="Month">Month</option>
                                        <option value="Year">Year</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Repayment Frequency: </label>
                            <select class="jformcontrol jmargin-top" id="frequency" name="frequency">
                                <option value="" selected="">--Select&nbsp;Repayment&nbsp;Frequency--&nbsp;
                                </option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Every 2 Weeks">Every 2 Weeks</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Every 2 Months">Every 2 Months</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Every 4 Months">Every 4 Months</option>
                                <option value="Semi-Annually">Semi-Annually</option>
                                <option value="Annually">Annually</option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Number Of Repayments: </label>
                            <input placeholder="Number Of Repayments" type="text" class="jformcontrol jmargin-top"
                                id="no_repayments" name="no_repayments" readonly="readonly">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Type Of Facility: </label>
                            <select class="jformcontrol jmargin-top" id="loantype" name="loantype">
                                <option value="" selected="">--Select&nbsp;Facility&nbsp;Type--&nbsp;
                                </option>
                                <option value="I-Instalment">I-Instalment</option>
                                <option value="R-Revolving Credit">R-Revolving Credit</option>
                                <option value="O-Open ">O-Open </option>
                                <option value="C-Credit Card">C-Credit Card</option>
                                <option value="P-Personal Cash">P-Personal Cash</option>
                                <option value="H-Home Loan">H-Home Loan</option>
                                <option value="S-Short Term Insurance">S-Short Term Insurance</option>
                                <option value="L-Long Term Insurance">L-Long Term Insurance</option>
                                <option value="G-Garage Card">G-Garage Card</option>
                                <option value="E-Single Credit Facility">E-Single Credit Facility</option>
                                <option value="U-Utility">U-Utility</option>
                                <option value="N-Pension Backed Lending">N-Pension Backed Lending</option>
                                <option value="B-Building Loan">B-Building Loan</option>
                                <option value="T-Student Loan">T-Student Loan</option>
                                <option value="J-Revolving Unsecured Credit">J-Revolving Unsecured Credit
                                </option>
                                <option value="D-Debt Recovery Account">D-Debt Recovery Account</option>
                                <option value="F-Open Account Without Credit Limit">F-Open Account Without
                                    Credit
                                    Limit</option>
                                <option value="V-Overdraft">V-Overdraft</option>
                                <option value="MICRO-LOANS">MICRO-LOANS</option>
                                <option value="HIRE PURCHASE">HIRE PURCHASE</option>
                                <option value="MICRO-LEASES">MICRO-LEASES</option>
                                <option value="STAFF LOANS">STAFF LOANS</option>
                            </select>
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Installment Amount: </label>
                            <input type="text" class="jformcontrol jmargin-top" placeholder="Installment Amount"
                                id="installmentamount" readonly="readonly">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Currency: </label>
                            <input placeholder="Currency" value="Naira" type="text" class="jformcontrol jmargin-top"
                                id="lcurrency" name="lcurrency" readonly="readonly">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Sector/Purpose of Facility: </label>
                            <select class="jformcontrol jmargin-top" id="purpose" name="purpose">
                                <option value="" selected="">
                                    --Select&nbsp;Purpose&nbsp;Of&nbsp;Facility&nbsp;--&nbsp;
                                </option>
                                <option value="AGRICULTURE">AGRICULTURE</option>
                                <option value="CONSUMER/PERSONAL">CONSUMER/PERSONAL</option>
                                <option value="COMMERCE">COMMERCE</option>
                                <option value="MANUFACTURING">MANUFACTURING</option>
                                <option value="REAL ESTATE/CONSTRUCTION">REAL ESTATE/CONSTRUCTION</option>
                                <option value="COMMUNICATION">COMMUNICATION</option>
                                <option value="HOSPITALITY">HOSPITALITY</option>
                                <option value="MEDICAL">MEDICAL</option>
                                <option value="EDUCATION">EDUCATION</option>
                                <option value="OTHERS">OTHERS</option>
                            </select>
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Security: </label>
                            <input type="text" class="jformcontrol jmargin-top" placeholder="Security" id="security"
                                name="security">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> previous account number: </label>
                            <input placeholder="Previous account number" type="number" class="jformcontrol jmargin-top"
                                name="previousaccount" id="previousaccount">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> previous branch: </label>
                            <input placeholder="Previous branch" type="text" class="jformcontrol jmargin-top"
                                name="previousbranch" id="previousbranch">
                        </div>
                    </div>
                    <div>
                        <button type="button" class="j-action-btn float-left jmargin-top hidden"> calulate </button>
                    </div>
                </div>
                <div class="jformgroup jmargin-top" style="justify-content:start">
                    <button type="button" class="j-action-btn jmargin-top" 
                        id="calculatebtn">Calculate </button>
                </div>

                <!-- other info -->

                <div class="section-header">
                    <h1 class="jmargin-top"> other info </h1>
                </div>
                <div class="col-form-group">
                    <div class="loan-set"></div>
                    <div>
                        <button type="button" class="j-action-btn jmargin-top float-right" id="feeappendbtn">
                            add loan fee </button>
                    </div>
                </div>

                <div class="col-form-group">
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel">Link loan to the customers savings | current account?:
                            </label>
                            <select class="jformcontrol jmargin-top" id="connectcustomeraccount"
                                name="connectcustomeraccount">
                                <option value="No" selected> No</option>
                                <option value="Yes"> Yes</option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Loan Officer: </label>
                            <select class="jformcontrol jmargin-top" name="loanofficer" id="loanofficer"></select>
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel">Customer Account Number: </label>
                            <input type="text" placeholder="Account Number" class="jformcontrol jmargin-top"
                                id="customeraccount" name="customeraccount" title="Enter Account Number to be linked">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Customer Account Name: </label>
                            <input type="text" placeholder="Customer Account Name" class="jformcontrol jmargin-top"
                                id="customeraccountname" name="customeraccountname" readonly="readonly">
                        </div>
                    </div>
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel">GL Cash Account: </label>
                            <select class="jformcontrol jmargin-top" id="glcashaccount" name="glcashaccount">
                                <option value="" selected=""> -- Select GL Cash Account --</option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> GL Loan Account: </label>
                            <select class="jformcontrol jmargin-top" name="glloanaccount" id="glloanaccount">
                                <option value="" selected=""> -- Select Loan Account --</option>
                            </select>
                        </div>
                    </div>

                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel">Description: </label>
                        <textarea class="jformcontrol jmargin-top" rows="5" resize="none" id="loanaccountdecription"
                            name="description"></textarea>
                    </div>

                    <!-- authorization -->
                    <div class="section-header">
                    </div>
                    <div class="col-form-group">
                        <div class="jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel">Approve Transaction: </label>
                                <input type="password" placeholder="Authorizing officer password"
                                    class="jformcontrol jmargin-top" id="authorisation" name="authorisation">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel">Send for Approval: </label>
                                <label class="switch j-slider jmargin-top">
                                    <input type="checkbox" id="sendforapproval" name="sendforapproval" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="section-header">
                        <h1 class="jmargin-top"> </h1>
                    </div>

                    <div class="jmargin-top">
                        <button type="button" style="background-color: #c82333" class="j-action-btn-alt jmargin-top"
                            id="resetloanaccountbtn"> reset </button>
                        <button type="button" class="j-action-btn-alt jmargin-top jmargin-left"
                            id="saveloanaccountbtn">save </button>
                    </div>

                </div>

            </form>
        </div>
    </div>

</div>