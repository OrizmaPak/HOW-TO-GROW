<?php
session_start();

$displayhtml .= '<div id="personnelhistorycontainer" class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">PERSONNEL HISTORY</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="personnelhistorymodal" style="width: 98%;height: 90vh;position: absolute;left: 14px;top: -949px;padding-bottom: 60px;background: red;">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">'; 
$displayhtml .= '<div class="oreglaccrow">';
$displayhtml .= '<div class="suboreglaccrow">';
$displayhtml .= '<!-- <div class="inputcontainermsn "> -->';
$displayhtml .= '<input id="personnelhistory_select" style="width:400px" placeholder="Select Personnel" onchange="checkdatalist(this);loadpersonnelhistory(this)" class="ma0" list="personnelhistorynamedatalist" />';

// $displayhtml .= '<option value="">--select--</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '</select>';
$displayhtml .= '<!-- </div> -->';
$displayhtml .= '</div>'; 
$displayhtml .= '<div style="display: flex;" class="">'; 
$displayhtml .= '<div class="orerbtn" id="personnelhistoryprint">Print</div>';
$displayhtml .= '<div style="background: green; width: 90px" class="orerbtn" id="personnelhistorypdf">Export pdf</div>';
$displayhtml .= '<p class="normaltext hidden">Search</p>';
$displayhtml .= '<input id="viewgl_search" placeholder="Personnel name" type="hidden">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="personneldata" class="hidden">';
$displayhtml .= '<div class="" id="personenlformdata">
            <div style="background: #195819;padding: 20px;border-radius: 14px;border-top-left-radius: 0px;padding-bottom: 30px;" class="jpagecontent" id="jpagecontent">
                <div>
                    <div class="section-header mbb" style="display:flex; gap:6px; align-items:center;">
                        <h3 style="color: white; font-weight: bolder;">BIO DATA</h3>
                    </div>
                    <form class="jform" id ="">
                    <div class="jformgroup jformgroupcol">
                            <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Profile Image</label>
                            <img id="phprofileimg" src="" style="width:150px;height:150px;margin:10px"/>
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
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewmaritalstatus" required />
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
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewgender" required />
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
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewdepartment" required/>
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
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol ">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">lga</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  onfocusout="personnelgetlga(this)" id="personelviewlga" list="orelga" required>
                                </div>
                                <div class="jformgroup jformgroupcol jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">deformity</label>
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewdeformity" required/>
                                </div>
                            </div>
                            <div class="jformgroup jformgroup form_row">
                                <div class="jformgroup jformgroupcol ">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">eye glasses</label>
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelvieweyeglasses" required/>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Others</label>
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewotherdeformity" required/>
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
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Level</label>
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewlevel" required/>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left"> 
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Group</label>
                                    <input readonly style="width: 200px;padding: 5px 10px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" class="jformcontrol jmargin-top pervfy"  id="personelviewgroup" required/>
                                </div>
                                <div class="jformgroup jformgroupcol  jmargin-left hidden">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel"></label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="date" class="jformcontrol jmargin-top pervfy"  id="" required>
                                </div>
                            </div>
                            <div class="section-header mtt" style="display:flex; gap:6px;margin-top: 30px; align-items:center;">
                                <h1 style="color: white; font-weight: bolder;">Level</h1>
                            </div>
                                <div class="jformgroup jformgroupcol hidden">
                                    <label style="color: white; font-weight: bolder;"  class="jcontrollabel">Basic Salary</label>
                                    <input readonly style="width: 200px;background: #195819;border: none;outline: none;border-bottom:2px solid white;color: #e0ff6e !important;" type="text" class="jformcontrol jmargin-top pervfy"  id="personelviewbasicsalary" required>
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
        </div>
';
/*<div class="orerbtn" id="">Print</div>*/
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4 style="display:flex;justify-content: between;width: 100%;align-items:center"><span>Advance</span> </h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> s/n  </th>
                                <th> title</th>
                                <th> amount  </th>
                                <th> entry date </th>
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataadvance"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Employee Records</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> s/n  </th>
                                <th> employer name</th>
                                <th> position  </th>
                                <th> years employed </th>
                                <th> reason for leaving </th>
                                <th> document </th>
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataemployeerecords"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Guarantors</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> s/n  </th>
                                <th> guarantor name</th>
                                <th> years known </th>
                                <th> occupation  </th>
                                <th> phone number </th>
                                <th> address </th>
                                <th> document </th>
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataguarantors"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Leave</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> title  </th>
                                <th> entry date  </th>
                                <th> start date </th>
                                <th> end date </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataleave"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Promotion</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th> s/n </th>
                                <th> title  </th>
                                <th> level </th>
                                <th> entry date  </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledatapromotion"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Qualifications</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> s/n </th>
                                <th> institution  </th>
                                <th> qualification  </th>
                                <th> certification date </th>
                                <th> document </th>
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataqualifications"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Query</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th>s/n </th>
                                <th> title  </th>
                                <th> entry date  </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataquery"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Referees</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th>s/n </th>
                                <th> Referees Full Name  </th>
                                <th> Relationship  </th>
                                <th> Occupation  </th>
                                <th> Phone Number </th>
                                <th> Address </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledatareferees"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Suspension</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th>s/n </th>
                                <th> title  </th>
                                <th> entry date  </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledatasuspension"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Termination</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th>s/n </th>
                                <th> title  </th>
                                <th> entry date  </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledatatermination"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>Warning</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th>s/n </th>
                                <th> title  </th>
                                <th> entry date  </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledatawarning"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>MONITOR/EVALUATION</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                               <th>s/n </th>
                                <th> title  </th>
                                <th> entry date  </th>
                                <th> document </th> 
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataevaluation"></tbody>
                    </table>
                </div>
';
$displayhtml .= '<div id="personnelhistoryfulltableparant" style="margin-bottom: 40px;border-radius: 10px;border: 1px solid #00000029; border-opacity: 0.5;color:#030A05;padding:6px" style="overflow-y: auto;min-height: 400px"  class="jtable-content">
                    <h4>MONITOR/EVALUATION</h4>
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> s/n </th>
                                <th> parent one </th>
                                <th> parent two </th>
                                <th> parent one occupation </th>
                                <th> parent two occupation </th>
                                <th> parent one phone </th>
                                <th> parent two phone </th>
                                <th> home address </th>
                                <th> office address </th>
                                <th> doc </th>
                            </tr>
                        </thead>
                        <tbody id="personnelhistorytabledataparents"></tbody>
                    </table>
                </div>
';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<datalist id="personnelhistorynamedatalist"></datalist>';

echo $displayhtml;
?>