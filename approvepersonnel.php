<?php
$displayhtml .= '<div id="approvepersonnelmodal" style="width: 98%;height: 90vh;position: absolute;left: 14px;top: -949px;padding-bottom: 60px;background: red;">';
$displayhtml .= '<div class="jcontainer">
            <h1 class="jpageheader">PERSONNNEL</h1>
            <div class="jflex" style="position: relative;top: 23px;">
                <button type="button" style="padding: 10px;min-width: 100px;border-top-left-radius: 14px;border-top-right-radius: 14px;text-transform: capitalize;background: rgb(40 76 30);color: white;" class="j-action-btn" id="approvepersonnelmodalbtn"> BACK </button>
            </div>
            <div style="background: #195819;padding: 20px;border-radius: 14px;border-top-left-radius: 0px;padding-bottom: 30px;" class="jpagecontent" id="jpagecontent">
                <div>
                    <div class="section-header mbb" style="display:flex; gap:6px; align-items:center;">
                        <h3 style="color: white; font-weight: bolder;">BIO DATA</h3>
                    </div>
                    <form class="jform" id ="">
                        <div class="col-form-group" >
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">first Name</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" id="personelviewfirstname" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Last name</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewlastname" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">other names</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewothernames" required>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">phone number</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="tel" id="personelviewphonenumber" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">work status</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewworkstatus" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">marital status</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewmaritalstatus" required>
                                        <option disabled value=""> -- Select Status --</option>
                                        <option disabled> SINGLE </option>
                                        <option disabled> MARRIED </option>
                                        <option disabled> SEPERATED </option>
                                        <option disabled> WIDOW </option>
                                        <option disabled> WIDOWER </option>
                                    </select>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">residential address</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" id="personelviewresidentialaddress" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">permanent home address</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewpermanenthome" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">gender</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewgender" required>
                                        <option disabled value="">--select gender--</option>
                                        <option disabled>MALE</option>
                                        <option disabled>FEMALE</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div style="margin-top:20px"></div>
                            <div class="section-header" style="display:flex; gap:6px; align-items:center;">
                                <h1 style="color: white; font-weight: bolder;">General details</h1>
                            </div>
                            
                            <div style="background: #585858;display: flex;padding: 10px 0px;border-radius: 14px;" class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label style="color: white; font-weight: bolder;" class="jcontrollabel">Bank Account No. [Basic]</label>
                                    <input readonly style="width: 200px;background: #585858;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" value="456789456789" class="jformcontrol jmargin-top"  list="" type="text" style="color: white; font-weight: bolder;"id="personelviewbasicaccountnumber" readonly required>
                                    <label style="color: white; font-weight: bolder;" class="jcontrollabel mtt">Bank Name</label>
                                    <input readonly style="width: 200px;background: #585858;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" value="First Bank" class="jformcontrol jmargin-top"  list="" type="text" style="color: white; font-weight: bolder;"id="personelviewbasicbankname" readonly required>
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label style="color: white; font-weight: bolder;" class="jcontrollabel">Bank Account No. [allowances]</label>
                                    <input readonly style="width: 200px;background: #585858;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" value="456789456789" class="jformcontrol jmargin-top"  list="" type="text" style="color: white; font-weight: bolder;"id="personelviewallowaccountnumber" readonly required>
                                    <label style="color: white; font-weight: bolder;" class="jcontrollabel mtt">Bank Name</label>
                                    <input readonly style="width: 200px;background: #585858;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" value="Sterling Bank" class="jformcontrol jmargin-top"  list="" type="text" style="color: white; font-weight: bolder;"id="personelviewallowbankname" readonly required>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Username/Email</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" list="personelallemail" type="text" id="personelviewusernameemail" required>
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Department</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewdepartment" required>
                                        <option disabled value="">--select--</option>
                                    </select>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">birth date</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="date" id="personelviewbirthdate" required>
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">nationality</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" type="text" onfocusout="personnelgetstate(this)" list="orecountry" id="personnelnationalityy" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">state</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy" onfocusout="personnelgetcity(this)"  id="personelviewstate" list="orestate" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">lga</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  onfocusout="personnelgetlga(this)" id="personelviewlga" list="orelga" required>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">deformity</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewdeformity" required>
                                        <option disabled value="">--select--</option>
                                        <option disabled value="0">NO</option>
                                        <option disabled value="1">YES</option>
                                    </select>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">eye glasses</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelvieweyeglasses" required>
                                        <option disabled value="">--select--</option>
                                        <option disabled value="0">NO</option>
                                        <option disabled value="1">YES</option>
                                    </select>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Others</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewotherdeformity" required>
                                        <option disabled value="">--select--</option>
                                        <option disabled value="0">NO</option>
                                        <option disabled value="1">YES</option>
                                    </select>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">height</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="number" class="jformcontrol jmargin-top pervfy"  id="personelviewheight" required>
                                </div>
                                
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">weight</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="number" class="jformcontrol jmargin-top pervfy"  id="personelviewweight" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">employment date</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="date" class="jformcontrol jmargin-top pervfy"  id="personelviewemplymentdate" required>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol ">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Basic Salary</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="text" class="jformcontrol jmargin-top pervfy"  id="personelviewbasicsalary" required>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Level</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewlevel" required>
                                        <option disabled value="">--select--</option>
                                    </select>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Group</label>
                                    <select style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewgroup" required>
                                        <option disabled value="">--select--</option>
                                    </select>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left hidden">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel"></label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="date" class="jformcontrol jmargin-top pervfy"  id="" required>
                                </div>
                            </div>
                            <div class="section-header mtt" style="display:flex; gap:6px;margin-top: 30px; align-items:center;">
                                <h1 style="color: white; font-weight: bolder;">Allowances</h1>
                            </div>
                            
                            <div name="allowancepersonnelcontainer">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input readonly style="width: 200px;background: #195819;border: none;outline: none;color: white !important;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top pervfy" type="text" id="" value="Allowance name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input readonly style="width: 200px;background: #195819;border: none;outline: none;color: white !important;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top pervfy" type="text" id="" value="Percentage %" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <div id="" class="oreadddebit oreremove mt hidden" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                                        </div>
                                    </div>
                            </div>
                            
                            <div id="allowanceviewpersonnelcontainer">
                            
                            </div>
                        </div>
                        <div class="section-header mtt" style="display:flex; gap:6px;margin-top: 30px; align-items:center;">
                            <h1 style="color: white; font-weight: bolder;">Deductions</h1>
                        </div>
                        
                        <div name="allowancepersonnelcontainer">
                                    <div class="jformgroup jformgroup form_row">
                                        <div class="jformgroup jformgroupcol">
                                            <input readonly style="width: 200px;background: #195819;border: none;outline: none;color: white !important;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top pervfy" type="text" id="" value="Deduction name" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <input readonly style="width: 200px;background: #195819;border: none;outline: none;color: white !important;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top pervfy" type="text" id="" value="Percentage %" required>
                                        </div>
                                        <div class="jformgroup jformgroupcol jmargin-left">
                                            <div id="" class="oreadddebit oreremove mt hidden" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                                        </div>
                                    </div>
                            </div>
                        
                    <div id="deductionsviewpersonnelcontainer">
                        
                        
                        
                    </div>
                    
                    </div>
                </form>
            </div>
            <div class="jflex" style="margin: 30px 0;">
                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" id="approvepersonnelmodalbtn2"> BACK </button>
            </div>
        </div>
        </div>
';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jcontainer">';
$displayhtml .= '<div>';
$displayhtml .= '<h1 class="jpageheader"> approve personnel </h1>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jpagecontent" id="jpagecontent">';
$displayhtml .= '<div>';
$displayhtml .= '';
$displayhtml .= '<!-- content here -->';
$displayhtml .= '';
$displayhtml .= '<div class="jmargin-top">';
$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th></th>';
$displayhtml .= '<th> first&nbsp;name </th>';
$displayhtml .= '<th> last&nbsp;name  </th>';
$displayhtml .= '<th> phone&nbsp;number </th>';
$displayhtml .= '<th> gender </th>';
$displayhtml .= '<th> residential&nbsp;address </th>';
$displayhtml .= '<th> username&nbsp;/&nbsp;email </th>';
$displayhtml .= '<th> emplyment&nbsp;date </th>';
$displayhtml .= '<th> basic&nbsp;salary </th>';
$displayhtml .= '<th> action </th>';
// $displayhtml .= '<th> fees&nbsp;/&nbsp;charges </th>';
// $displayhtml .= '<th> location </th>';
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="approvepersonnelpersonneltablecontent"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jflex jitems-left jmargin-top" style="margin-top:35px">';
$displayhtml .= '<div class="jflex jitems-left" style="width: 100%;">';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="width: 15%;text-transform: capitalize;background-color: rgb(34, 33, 33);"';
$displayhtml .= 'onclick="checkallpersonneltoapprove(this)">select all</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn" style="width: 15%;text-transform: capitalize; background-color: green"';
$displayhtml .= 'onclick="personneltoapprove()">approve</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="width: 15%;text-transform: capitalize;background-color: red;"';
$displayhtml .= 'onclick="personneltodecline()">decline</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '
<div style="margin-top:25px" class="j-table-status jflex jcontent-between jmargin-top">
    <span class="jcontrollabel" style="text-transform: none;" id="pagination-status"></span>
    <span class="jflex jpagination">
        <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
        <span id="pagination-numbers"></span>
        <button class="j-no-bg" type="button" id="jnext-button">next</button>
    </span>
</div>
';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>