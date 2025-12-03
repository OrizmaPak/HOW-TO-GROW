<?php
session_start();
$displayhtml .= '<input id="profile-image-upload-input" type="file" hidden=""><div class="organisation-info-container item-types-first-section">';
$displayhtml .= '<div class="organisation-info-first-section">';
$displayhtml .= '<center>';
$displayhtml .= '<h5>STOCK - RETURN</h5>';
$displayhtml .= '</center>';
$displayhtml .= '<div class="jcontainer">
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id="savingsaccountform">
         <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none;margin-top: 50px">
                    <h1>select Branch</h1>
                </div>
         <div class="jformgroup jformgroup form_row">
                       <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Branch: </label>
                            <select class="jformcontrol jmargin-top" disabled id="returnlocation" name="location">
                            <option> -- Select Branch </option>
                        </select>
                        </div>
                    </div>
                    </form>
            <form class="jform" id="savingsaccountform">
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none;margin-top: 50px">
                    <h1>Item information</h1>
                </div>
                <div class="col-form-group">
                
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Item: </label>
                            <select class="jformcontrol jmargin-top" id="returnitemlistelement" name="location" onchange="fetchreturnitemstatus(this.value)">
                            <option> -- Select Branch </option>
                        </select>
                        </div> 
                    </div>
                    
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Type: </label>
                            <input type="text" class="jformcontrol jmargin-top" readonly
                                id="returntype" name="accountnumber" >
                        </div> 
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Model: </label>
                            <input type="text" readonly class="jformcontrol jmargin-top" id="returnmodel" name="accountcode">
                        </div>
                    </div>
                    
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Unit Cost: </label>
                            <input type="text" class="jformcontrol jmargin-top" readonly
                                id="returnunitcost" name="accountnumber" >
                        </div> 
                         <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Stock Balance: </label>
                            <input type="text" class="jformcontrol jmargin-top" id="returnstockbalance" readonly name="accountcode">
                        </div>
                    </div>
                    
                </div>
                
                <div class="section-header" style="display:flex; gap:6px; align-items:center;border:none;margin-top: 50px">
                    <h1>Return Details</h1>
                </div>
                <div class="col-form-group">
                
                    <div class="jformgroup jformgroup form_row">
                       <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Return Date: </label>
                            <input type="date" class="jformcontrol jmargin-top" id="returnreturndate" name="accountcode">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Return Receipt No: </label>
                            <input type="text" class="jformcontrol jmargin-top" id="returnreturnreceiptno" name="accountcode">
                        </div>
                    </div>
                
                    <div class="jformgroup jformgroup form_row">
                       <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Account No: </label>
                            <input type="text" class="jformcontrol jmargin-top" list="accountreturndetails" id="returnaccountnumber" onchange="checkInputwithdatalist(this.id, this.list.id) ? populatereturnaccountdetails(this.value) : clearpopulatereturn()" name="accountcode">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Account Name: </label>
                            <input type="text" class="jformcontrol jmargin-top" readonly id="returnaccountname" name="accountcode">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Account Balance: </label>
                            <input type="text" class="jformcontrol jmargin-top" readonly id="returnaccountbalance" name="accountcode">
                        </div>
                    </div>
                
                    <div class="jformgroup jformgroup form_row">
                       <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Return (Qty): </label>
                            <input type="number" class="jformcontrol jmargin-top" 
                            onchange="changesomethingreturn(this)"
                            id="returnreturnqty" name="accountcode">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Product Value: </label>
                            <input type="text" class="jformcontrol jmargin-top" readonly id="returnproductvalue" name="accountcode">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> Service Charge: </label>
                            <input type="text" class="jformcontrol jmargin-top" id="returnservicecharge" name="accountcode">
                        </div>
                    </div>
                
                    <div class="jformgroup jformgroup form_row">
                       <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> Reason: </label>
                            <textarea type="date" class="jformcontrol jmargin-top" id="returnreason" name="accountcode"></textarea>
                        </div>
                    </div>
                    
                   
                </div>
               
                
                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="submit"> Ledger </button>
                    <button id="returnreturnbtn" type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="submit"> Return </button>
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="submit"> Report </button>
                </div>
                
        </div>
            </form>
    </div>
    <datalist id="accountreturndetails">
    </datalist>
</div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>


<!--$displayhtml .= '<div class="organisation-info-third-section item-type-organisation-info-third-section">';-->
<!--$displayhtml .= '<form class="organisation-info-form" id="organisation-info-div-basic-info">';-->
<!--$displayhtml .= '<div class="stock-gift-div stock-return-div organisation-info-div-border-top-left-radius-0 item-types-organisation-info-div">';-->
<!--// $displayhtml .= '<div class="organisation-info-div-sub-container">';-->
<!--// $displayhtml .= '<label for="company-name">Select</label><br>';-->
<!--$displayhtml .= '<div class="organisation-info-div-sub-container container-with-before container-with-before-select">';-->
<!--$displayhtml .= '<label for="company-name">Item &nbsp;</label>';-->
<!--$displayhtml .= '<select class="stock-gift-input" type="text" name="" id="company-name" required>';-->
<!--$displayhtml .= '<option value="" selected disabled></option>';-->
<!--$displayhtml .= '<option value="">Example 1</option>';-->
<!--$displayhtml .= '<option value="">Example 2</option>';-->
<!--$displayhtml .= '<option value="">Example 3</option>';-->
<!--$displayhtml .= '</select>';-->
<!--$displayhtml .= '</div><br>';-->
<!--$displayhtml .= '<div class="organisation-info-div-sub-container container-with-before container-with-before-itemdetails vicol-width-70">';-->
<!--$displayhtml .= '<label for="company-name">Type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Model&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Unit Cost&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Stock Balance &nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '</div><br>';-->
<!--$displayhtml .= '<div class="vicol-display-flex-between">';-->
<!--$displayhtml .= '<div class="organisation-info-div-sub-container container-with-before container-with-before-returndetails vicol-width-70">';-->
<!--$displayhtml .= '<label for="company-name">Return Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="date" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Return Receipt No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Account No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Account Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Balance Amount&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Return (Qty)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Product Value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Service Charge&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Reason&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '<label for="company-name">Branch&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>';-->
<!--$displayhtml .= '<input class="stock-gift-input-70" type="text" name="" id="company-name" required><br>';-->
<!--$displayhtml .= '</div>';-->
<!--$displayhtml .= '<div class="stock-return-button-15">';-->
<!--$displayhtml .= '<center><button class="vicol-btn-primary">&nbsp; Ledger &nbsp;</button></center>';-->
<!--$displayhtml .= '<center><button class="vicol-btn-primary">&nbsp; Return &nbsp;</button></center>';-->
<!--$displayhtml .= '<center><button class="vicol-btn-primary">&nbsp; Report &nbsp;</button></center>';-->
<!--$displayhtml .= '</div>';-->
<!--$displayhtml .= '</div><br>';-->
<!--$displayhtml .= '</div>';-->
<!--$displayhtml .= '</form>';-->
<!--$displayhtml .= '</div>';-->
<!--$displayhtml .= '</div>';-->
