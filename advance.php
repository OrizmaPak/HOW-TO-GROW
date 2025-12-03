<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<input id="id" type="hidden">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">ADVANCE</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="orecardcontainer" style="margin-top: 30px">';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Personnel</p>';
$displayhtml .= '<input id="advances_personnel" list="advancespersonnelnames" class="promvrfy promvrfy2" onchange="checkadvanersonnel(this)" placeholder="Personnel" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Entry Date</p>';
$displayhtml .= '<input id="advances_entrydate" class="promvrfy promvrfy2" type="date">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Title</p>';
$displayhtml .= '<input id="advances_title" class="promvrfy promvrfy2" placeholder="Enter title" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Amount</p>';
$displayhtml .= '<input id="advances_amount" class="promvrfy promvrfy2" placeholder="Enter Amount" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Monthly Installment</p>';
$displayhtml .= '<input id="advances_monthlyinstallment" type="number" placeholder="Enter installment amount">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol  jmargin-left">';
// $displayhtml .= '<label  class="jcontrollabel">Level</label>';
// $displayhtml .= '<select class="jformcontrol jmargin-top promvrfy" name="" id="advanceslevel" required>';
// $displayhtml .= '<option value="">--select--</option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="stcs1a">';
// $displayhtml .= '<div class="inputcontainerln icsnf">';
// $displayhtml .= '<p class="normaltext">End Date</p>';
// $displayhtml .= '<input id="advances_enddate" type="date">'; 
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup">';
$displayhtml .= '<div id="advancespreview">'; 
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="jformgroup jformgroupcol file-action" style="display: block;">'; 
$displayhtml .= '<input id="advances_file" onchange="advancesloadimg(this)" type="file" accept=".png, .jpeg, .jpg, .pdf, .docx" class="jformcontrol jmargin-top hidden" >';
$displayhtml .= '<div onclick="this.previousElementSibling.click()" class="">';
$displayhtml .= '<p>click to add files</p>';
$displayhtml .= '<p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg | .pdf | .docx </p>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="advances_fileholder" class="fileholder"> 
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
// $displayhtml .= '<div class="oresubmitcontainer">';
// $displayhtml .= '<div id="advances_submitbtn" class="orerbtn">Submit</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '<p id="advancestaffcompensation" style="color: green; cursor: pointer;" onmouseout="this.style.textDecoration=\'none\'"  onmouseover="this.style.textDecoration=\'underline\'">Click to update the staff compensation</p>';
$displayhtml .= '<div class="mtt" style="transition: height 0.5s ease; overflow: hidden;height: 0px">';

$displayhtml .= '<div class="jformgroup jformgroup form_row">';
$displayhtml .= '<div class="jformgroup jformgroupcol">';
$displayhtml .= '<label style="font-weight: bolder;font-size: small;" class="jcontrollabel">Basic Salary</label>';
$displayhtml .= '<input type="text" style="width: 200px;" class="promvrfy jformcontrol jmargin-top promvrfy" name="" id="advancepersonelbasicsalary" required>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div id="advancesallowancededuct" style="margin-bottom:30px;">';

$displayhtml .= '<div class="" style="display:flex; gap:6px;margin:30px 0px 12px 0px; align-items:center;border-bottom: 1px solid #bab9b9">';
$displayhtml .= '<p style="font-size:smaller;font-weight:bold;padding-bottom:12px;color:#646262">Allowance</p>';
$displayhtml .= '</div>';

$displayhtml .= '<div name="allowancepersonnelcontainer">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <input readonly style="width: 200px;border: none;outline: none;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top promvrfy" type="text" id="" value="Allowance name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <input readonly style="width: 200px;border: none;outline: none;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top promvrfy" type="text" id="" value="Percentage %" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <div id="" class="oreadddebit oreremove mt hidden" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                            </div>
                        </div>
                </div>';
                
$displayhtml .= '<div name="allowancepersonnelcontainer">';
$displayhtml .= '<div class="jformgroup jformgroup form_row">';
$displayhtml .= '<div class="jformgroup jformgroupcol">';
$displayhtml .= '<input class="jformcontrol jmargin-top promvrfy allowancename" type="text" id="advanceallowancename0" placeholder="Allowance name" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<input class="jformcontrol jmargin-top promvrfy allowancepercent" type="number" id="advanceallowancepercent0" placeholder="Percentage %" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<div id="advanceaddallowance" style="font-size: small;margin-left:0px" class="mt oreadddebit1"> Add More </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div id="advancesallowance">';

// $displayhtml .= '<div name="allowancepersonnelcontainer">';
// $displayhtml .= '<div class="jformgroup jformgroup form_row">';
// $displayhtml .= '<div class="jformgroup jformgroupcol">'; 
// $displayhtml .= '<input class="jformcontrol jmargin-top promvrfy" type="text" id="" placeholder="Allowance name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<input class="jformcontrol jmargin-top promvrfy" type="text" id="" placeholder="Percentage %" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';

$displayhtml .= '</div>';

$displayhtml .= '<div class="" style="display:flex; gap:6px;margin:30px 0px 12px 0px; align-items:center;border-bottom: 1px solid #bab9b9">';
$displayhtml .= '<p style="font-size:smaller;font-weight:bold;padding-bottom:12px;color:#646262">Deductions</p>';
$displayhtml .= '</div>';

$displayhtml .= '<div name="allowancepersonnelcontainer">
                        <div class="jformgroup jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <input readonly style="width: 200px;border: none;outline: none;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top promvrfy" type="text" id="" value="Deduction name" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <input readonly style="width: 200px;border: none;outline: none;font-size: medium;font-weight:bolder" class="jformcontrol jmargin-top promvrfy" type="text" id="" value="Percentage %" required>
                            </div>
                            <div class="jformgroup jformgroupcol jmargin-left">
                                <div id="" class="oreadddebit oreremove mt hidden" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>
                            </div>
                        </div>
                </div>';
                
$displayhtml .= '<div name="allowancepersonnelcontainer">';
$displayhtml .= '<div class="jformgroup jformgroup form_row">';
$displayhtml .= '<div class="jformgroup jformgroupcol">';
$displayhtml .= '<input class="jformcontrol jmargin-top promvrfy deductionname" type="text" id="advancedeductionname0" placeholder="Deduction name" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<input class="jformcontrol jmargin-top promvrfy deductionpecent" type="number" id="advancedeductionpercent0" placeholder="Percentage %" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<div id="advanceadddeduction" style="font-size: small;margin-left:0px" class="mt oreadddebit1"> Add More </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div id="advancesdeduction">';

// $displayhtml .= '<div name="allowancepersonnelcontainer">';
// $displayhtml .= '<div class="jformgroup jformgroup form_row">';
// $displayhtml .= '<div class="jformgroup jformgroupcol">'; 
// $displayhtml .= '<input class="jformcontrol jmargin-top promvrfy" type="text" id="" placeholder="Allowance name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<input class="jformcontrol jmargin-top promvrfy" type="text" id="" placeholder="Percentage %" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<div id="" style="font-size: small;margin-left:0px" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';

$displayhtml .= '</div>';


$displayhtml .= '</div>';

$displayhtml .= '</div>';

$displayhtml .= '<div class="oresubmitcontainer">';
$displayhtml .= '<div id="advances_submitbtn" class="orerbtn">Submit</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div>';
// $displayhtml .= '<div class="jtable-content">
//                     <table class="jmargin-top" id="advancespersonneltable">
//                         <thead>
//                             <tr>
//                                 <th> s/n </th>
//                                 <th> personnel </th>
//                                 <th> level </th>
//                                 <th> title  </th>
//                                 <th> entry date  </th>
//                                 <th> action </th>
//                             </tr>
//                         </thead>
//                         <tbody id="advancespersonneltablecontent">
                            
//                         </tbody>
//                     </table>
//                 </div>
                
//                 <div class="j-table-status jflex jcontent-between jmargin-top">
//                     <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
//                     <span class="jflex jpagination">
//                         <button class="j-no-bg" type="button" id="jprev-button">previous</button>
//                         <span id="pagination-numbers"></span>
//                         <button  class="j-no-bg" type="button" id="jnext-button">next</button>
//                     </span>
//                 </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<datalist id="advancespersonnelnames"></datalist>';

echo $displayhtml;
?>
