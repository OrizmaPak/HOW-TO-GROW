<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">LIST OF PERSONNEL</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="viewpersonnelmodal" style="width: 98%;height: 90vh;position: absolute;left: 14px;top: -949px;padding-bottom: 60px;background: red;">';
$displayhtml .= '<div class="jcontainer">
            <h1 class="jpageheader">PERSONNNEL</h1>
            <div class="jflex" style="position: relative;top: 23px;">
                <button type="button" style="padding: 10px;min-width: 100px;border-top-left-radius: 14px;border-top-right-radius: 14px;text-transform: capitalize;background: rgb(40 76 30);color: white;" class="j-action-btn" id="viewpersonnelmodalbtn"> BACK </button>
                <button type="button" style="margin-left: 20px;padding: 10px;min-width: 100px;border-top-left-radius: 14px;border-top-right-radius: 14px;text-transform: capitalize;background: red;color: white;visibility:hidden" class="j-action-btn" id="viewpersonneldeletebtn1"> DELETE </button>
            </div>
            <div style="background: #195819;padding: 20px;border-radius: 14px;border-top-left-radius: 0px;padding-bottom: 30px;" class="jpagecontent" id="jpagecontent">
                <div>
                    <div class="section-header mbb" style="display:flex; gap:6px; align-items:center;">
                        <h3 style="color: white; font-weight: bolder;">BIO DATA</h3>
                    </div>
                    <form class="jform" id ="">
                        <div class="jformgroup jformgroupcol">
                            <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Profile Image</label>
                            <img id="pvprofileimg" src="" style="width:150px;height:150px;margin:10px"/>
                        </div>
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
                <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(35, 84, 22);color:white" class="j-action-btn" id="viewpersonnelmodalbtn2"> BACK </button>
                <button type="button" style="margin-left: 20px;padding:10px; min-width: 15%; text-transform: capitalize;background:rgb(255, 0, 0);color:white;visibility:hidden" class="j-action-btn " id="viewpersonneldeletebtn2"> DELETE </button>
            </div> 
        </div>
        </div>
';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">'; 
$displayhtml .= '<div class="oreglaccrow">';
$displayhtml .= '<div class="suboreglaccrow">';
$displayhtml .= '<!-- <div class="inputcontainermsn "> -->';
$displayhtml .= '<input id="viewpersonnel_select" placeholder="Personnel name" class="ma0 oresel" list="personnelnamedatalist" />';
// $displayhtml .= '<option value="">--select--</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '</select>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<select class="orejot" style="margin-top: 10px; margin-left: 20px"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionviewslocation"'; 
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value="">--SELECT LOCATION--</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol" style="margin-left: 50px">';
$displayhtml .= '<select class="orejot" style="margin-top: 10px; margin-right: 20px"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="staffstatus"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value="">--SELECT STAFF STATUS--</option>';
$displayhtml .= '<option>ACTIVE</option>';
$displayhtml .= '<option>INACTIVE</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<!-- </div> -->';
$displayhtml .= '</div>'; 
$displayhtml .= '<div style="display: flex;" class="">'; 
$displayhtml .= '<div class="orerbtn" id="viewpersonnelprint">Print</div>';
$displayhtml .= '<div style="background: green; width: 90px" class="orerbtn" id="viewpersonnelexport">Export Excel</div>';
$displayhtml .= '<p class="normaltext hidden">Search</p>';
$displayhtml .= '<input id="viewgl_search" placeholder="Personnel name" type="hidden">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div id="viewpersonnelfulltableparant" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> s/n  </th>
                                <th> staff id  </th>
                                <th> first name  </th>
                                <th> last name  </th>
                                <th> department  </th>
                                <th> status  </th>
                                <th> level  </th>
                                <th> basic salary  </th>
                                <th> gender  </th>
                                <th> nationality  </th>
                                <th> state  </th>
                                <th> lga  </th>
                                <th> Profile image  </th>
                                <th style="width: 100px"> residential address  </th>
                                <th> action  </th>
                            </tr>
                        </thead>
                        <tbody id="viewpersonneltabledata"></tbody>
                    </table>
                </div>


                <div class="j-table-status jflex jcontent-between jmargin-top">
                    <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                    <span class="jflex jpagination"> 
                        <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                        <span id="pagination-numbers"></span>
                        <button  class="j-no-bg" type="button" id="jnext-button">next</button>
                    </span>
                </div>
';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="viewpersonnelfulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="viewpersonnelfulltable2">
                        <thead>
                            <tr>
                                <th> ACCOUNT NUMBER  </th>
                                <th> first name  </th>
                                <th> last name  </th>
                                <th> status  </th>
                                <th> level  </th>
                                <th> basic salary  </th>
                                <th> gender  </th>
                                <th> nationality  </th>
                                <th> state  </th>
                                <th> lga  </th>
                                <th> residential address  </th>
                            </tr>
                        </thead>
                        <tbody id="viewpersonneltabledata2"></tbody>
                    </table>
                </div>';
$displayhtml .= '<datalist id="personnelnamedatalist"></datalist>';

echo $displayhtml;
?>