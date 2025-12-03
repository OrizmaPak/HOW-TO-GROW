<?php
$displayhtml .= '<input id="profile-image-upload-input" type="file" hidden=""><div class="organisation-info-container item-types-first-section">';
$displayhtml .= '<div class="organisation-info-first-section">';
$displayhtml .= '<center>';
$displayhtml .= '<h5>STOCK - GIFT</h5>';
$displayhtml .= '</center>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="">
        <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id="savingsaccountform">
         <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none;margin-top: 50px">
                    <h1>select Branch</h1>
                </div>
         <div class="jformgroup jformgroup form_row">
                       <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Branch: </label>
                            <select class="jformcontrol jmargin-top" disabled id="giftlocation" name="location">
                            <option> -- Select Branch </option>
                        </select>
                        </div>
                    </div>
                    </form>
            <div>
                <form class="jform" id="savingsaccountform">
                    <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none;margin-top: 50px">
                        <h1>Item information</h1>
                    </div>
                    <div class="col-form-group">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Item: </label>
                                <select class="jformcontrol jmargin-top" id="giftitemlistgiftelement" onchange="fetchgiftstatus(this.value)" name="location" onchange="fetchgiftitemstatus(this.value)">
                                    <option> -- Select Item -- </option>
                                </select>
                            </div>
                        </div>

                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Type: </label>
                                <input type="text" class="jformcontrol jmargin-top" readonly id="gifttype" name="accountnumber">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Model: </label>
                                <input type="text" readonly class="jformcontrol jmargin-top" id="giftmodel" name="accountcode">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Unit Cost: </label>
                                <input type="text" class="jformcontrol jmargin-top" readonly id="giftunitcost" name="accountnumber">
                            </div>
                        </div>

                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Stock Balance: </label>
                                <input type="text" class="jformcontrol jmargin-top" id="giftstockbalance" readonly name="accountcode">
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Quantity Issued: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="giftstockqty" name="accountcode"
                                onchange="solveproductvalue(this.value)"
                                >
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <label class="jcontrollabel"> Product Value: </label>
                                <input type="text" class="jformcontrol jmargin-top" id="giftstockprodvalue" readonly name="accountcode">
                            </div>
                        </div>

                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Reason: </label>
                                <textarea type="date" class="jformcontrol jmargin-top" id="giftreason" name="accountcode"></textarea>
                            </div>
                        </div>

                    </div>

                    <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none;margin-top: 50px">
                        <h1>Receiving Details</h1>
                    </div>
                    <div class="col-form-group">

                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Particulars (Recipients Name) </label>
                            <input type="text" class="jformcontrol jmargin-top" id="giftgiftreceiptno" name="accountcode">
                        </div>
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> Date Issued: </label>
                                <input type="date" class="jformcontrol jmargin-top" id="giftgiftdate" name="accountcode">
                            </div>
                        </div>
                    </div>

                </div>

                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="giftsubmit"> Submit </button>
                    <button id="giftgiftbtn" type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background: red" class="j-action-btn orerbtn hidden" id="submit"> cancel </button>
                </div>

            </form>
        </div>
        <datalist id="accountgiftdetails">
            <!-- Options for the datalist here -->
        </datalist>
    </div>';
$displayhtml .= '</div>';

$displayhtml .= '</div>';

echo  $displayhtml;



// $displayhtml .= '<input id="profile-image-upload-input" type="file" hidden=""><div class="organisation-info-container">';
// $displayhtml .= '<div class="organisation-info-first-section">';
// $displayhtml .= '<center>';
// $displayhtml .= '<img id="profile-image" class="first-section-image" src="../images/logo.png" alt="logo" width="100" height="100">';
// $displayhtml .= '<svg class="pencil-upload-image" id="profile-img-edit-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30" style=" fill:#000000;">    <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path></svg>';
// $displayhtml .= '</center>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-second-section">';
// $displayhtml .= '<div class="vicol-display-flex-between">';
// $displayhtml .= '<h5>ORGANISATION INFORMATION</h5>';
// $displayhtml .= '<button class="vicol-btn-primary">Save Changes <i class="fas fa-save"></i></button>';
// $displayhtml .= '</div>';
// $displayhtml .= '';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-third-section">';
// $displayhtml .= '<div class="subpages-header">';
// $displayhtml .= '<p class="subpages-header-active" id="basic-info-toggler">Basic Info</p>';
// $displayhtml .= '<p id="account-prefix-toggler">Account Prefix</p>';
// $displayhtml .= '<p id="default-accounts-toggler">Default Accounts</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '<form class="organisation-info-form" id="organisation-info-div-basic-info">';
// $displayhtml .= '<div class="organisation-info-div organisation-info-div-border-top-left-radius-0">';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Company Name<span class="required-span">*</span></label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="text" name="" id="company-name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">SMS Sender ID<span class="required-span">*</span></label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="text" name="" id="company-name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Number of users</label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="text" name="" id="company-name">';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Telephone<span class="required-span">*</span></label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="tel" name="" id="company-name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Mobile</label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="tel" name="" id="company-name">';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Email<span class="required-span">*</span></label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="text" name="" id="company-name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Address<span class="required-span">*</span></label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="text" name="" id="company-name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">SMS Charge<span class="required-span">*</span></label><br>';
// $displayhtml .= '<input class="organisation-info-input" type="text" name="" id="company-name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">SMS Charge Account<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select id="smschargeaccount" name="smschargeaccount" class="organisation-info-input" required>';
// $displayhtml .= '<option selected="" disabled>Select SMS charge account to credit</option>';
// $displayhtml .= '<option> 8001000010 | LOAN FEES</option>';
// $displayhtml .= '<option> 8001000026 | LOAN PROVISIONING</option>';
// $displayhtml .= '<option> 8001000009 | COMMISSIONS</option>';
// $displayhtml .= '<option> 8001000011 | PENALTIES</option>';
// $displayhtml .= '<option> 8001000012 | CHARGES</option>';
// $displayhtml .= '<option> 8001000021 | GENERAL INCOME</option>';
// $displayhtml .= '<option> 8001000008 | LOAN INTEREST</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">VAT Rate (%)<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select id="vatrate" name="vatrate" class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="4">4</option>';
// $displayhtml .= '<option value="4.5">4.5</option>';
// $displayhtml .= '<option value="5">5</option>';
// $displayhtml .= '<option value="5.5">5.5</option>';
// $displayhtml .= '<option value="6">6</option>';
// $displayhtml .= '<option value="6.5">6.5</option>';
// $displayhtml .= '<option value="7">7</option>';
// $displayhtml .= '<option value="7.5">7.5</option>';
// $displayhtml .= '<option value="8">8</option>';
// $displayhtml .= '<option value="8.5">8.5</option>';
// $displayhtml .= '<option value="9">9</option>';
// $displayhtml .= '<option value="9.5">9.5</option>';
// $displayhtml .= '<option value="10">10</option>';
// $displayhtml .= '<option value="10.5">10.5</option>';
// $displayhtml .= '<option value="11">11</option>';
// $displayhtml .= '<option value="11.5">11.5</option>';
// $displayhtml .= '<option value="12">12</option>';
// $displayhtml .= '<option value="12.5">12.5</option>';
// $displayhtml .= '<option value="13">13</option>';
// $displayhtml .= '<option value="13.5">13.5</option>';
// $displayhtml .= '<option value="14">14</option>';
// $displayhtml .= '<option value="14.5">14.5</option>';
// $displayhtml .= '<option value="15">15</option>';
// $displayhtml .= '<option value="15.5">15.5</option>';
// $displayhtml .= '<option value="16">16</option>';
// $displayhtml .= '<option value="16.5">16.5</option>';
// $displayhtml .= '<option value="17">17</option>';
// $displayhtml .= '<option value="17.5">17.5</option>';
// $displayhtml .= '<option value="18">18</option>';
// $displayhtml .= '<option value="18.5">18.5</option>';
// $displayhtml .= '<option value="19">19</option>';
// $displayhtml .= '<option value="19.5">19.5</option>';
// $displayhtml .= '<option value="20">20</option>';
// $displayhtml .= '<option value="20.5">20.5</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">WHT Rate (%)<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select id="whtrate" name="whtrate" class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="4">4</option>';
// $displayhtml .= '<option value="4.5">4.5</option>';
// $displayhtml .= '<option value="5">5</option>';
// $displayhtml .= '<option value="5.5">5.5</option>';
// $displayhtml .= '<option value="6">6</option>';
// $displayhtml .= '<option value="6.5">6.5</option>';
// $displayhtml .= '<option value="7">7</option>';
// $displayhtml .= '<option value="7.5">7.5</option>';
// $displayhtml .= '<option value="8">8</option>';
// $displayhtml .= '<option value="8.5">8.5</option>';
// $displayhtml .= '<option value="9">9</option>';
// $displayhtml .= '<option value="9.5">9.5</option>';
// $displayhtml .= '<option value="10">10</option>';
// $displayhtml .= '<option value="10.5">10.5</option>';
// $displayhtml .= '<option value="11">11</option>';
// $displayhtml .= '<option value="11.5">11.5</option>';
// $displayhtml .= '<option value="12">12</option>';
// $displayhtml .= '<option value="12.5">12.5</option>';
// $displayhtml .= '<option value="13">13</option>';
// $displayhtml .= '<option value="13.5">13.5</option>';
// $displayhtml .= '<option value="14">14</option>';
// $displayhtml .= '<option value="14.5">14.5</option>';
// $displayhtml .= '<option value="15">15</option>';
// $displayhtml .= '<option value="15.5">15.5</option>';
// $displayhtml .= '<option value="16">16</option>';
// $displayhtml .= '<option value="16.5">16.5</option>';
// $displayhtml .= '<option value="17">17</option>';
// $displayhtml .= '<option value="17.5">17.5</option>';
// $displayhtml .= '<option value="18">18</option>';
// $displayhtml .= '<option value="18.5">18.5</option>';
// $displayhtml .= '<option value="19">19</option>';
// $displayhtml .= '<option value="19.5">19.5</option>';
// $displayhtml .= '<option value="20">20</option>';
// $displayhtml .= '<option value="20.5">20.5</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Allow Back-Dated Transaction<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="YES">YES</option>';
// $displayhtml .= '<option value="NO">NO</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Allow Future Transaction<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="YES">YES</option>';
// $displayhtml .= '<option value="NO">NO</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Automate Memorandum<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="YES">YES</option>';
// $displayhtml .= '<option value="NO">NO</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Automate SMS Charges<span class="required-span">*</span></label><br>';
// $displayhtml .= '<select class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="YES">YES</option>';
// $displayhtml .= '<option value="NO">NO</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="organisation-info-div-sub-container">';
// $displayhtml .= '<label for="company-name">Set Accounting Year End<span class="required-span">*</span></label><br>';
// $displayhtml .= '<div class="vicol-display-flex-between vicol-width-70">';
// $displayhtml .= '<select class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="01">01</option>';
// $displayhtml .= '<option value="02">02</option>';
// $displayhtml .= '<option value="03">03</option>';
// $displayhtml .= '<option value="04">04</option>';
// $displayhtml .= '<option value="05">05</option>';
// $displayhtml .= '<option value="06">06</option>';
// $displayhtml .= '<option value="07">07</option>';
// $displayhtml .= '<option value="08">08</option>';
// $displayhtml .= '<option value="09">09</option>';
// $displayhtml .= '<option value="10">10</option>';
// $displayhtml .= '<option value="11">11</option>';
// $displayhtml .= '<option value="12">12</option>';
// $displayhtml .= '<option value="13">13</option>';
// $displayhtml .= '<option value="14">14</option>';
// $displayhtml .= '<option value="15">15</option>';
// $displayhtml .= '<option value="16">16</option>';
// $displayhtml .= '<option value="17">17</option>';
// $displayhtml .= '<option value="18">18</option>';
// $displayhtml .= '<option value="19">19</option>';
// $displayhtml .= '<option value="20">20</option>';
// $displayhtml .= '<option value="21">21</option>';
// $displayhtml .= '<option value="22">22</option>';
// $displayhtml .= '<option value="23">23</option>';
// $displayhtml .= '<option value="24">24</option>';
// $displayhtml .= '<option value="25">25</option>';
// $displayhtml .= '<option value="26">26</option>';
// $displayhtml .= '<option value="27">27</option>';
// $displayhtml .= '<option value="28">28</option>';
// $displayhtml .= '<option value="29">29</option>';
// $displayhtml .= '<option value="30">30</option>';
// $displayhtml .= '<option value="31">31</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '<select class="organisation-info-input" required>';
// $displayhtml .= '<option selected disabled></option>';
// $displayhtml .= '<option value="January">January</option>';
// $displayhtml .= '<option value="February">February</option>';
// $displayhtml .= '<option value="March">March</option>';
// $displayhtml .= '<option value="April">April</option>';
// $displayhtml .= '<option value="May">May</option>';
// $displayhtml .= '<option value="June">June</option>';
// $displayhtml .= '<option value="July">July</option>';
// $displayhtml .= '<option value="August">August</option>';
// $displayhtml .= '<option value="September">September</option>';
// $displayhtml .= '<option value="October">October</option>';
// $displayhtml .= '<option value="November">November</option>';
// $displayhtml .= '<option value="December">December</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</form>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';

// echo  $displayhtml;
?>