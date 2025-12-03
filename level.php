<?php
session_start();

$displayhtml .= '<form id="levelform" class="formcontainer" style="overflow: auto;height: 100vh">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>LEVEL</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain ">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="level">level </label>';
$displayhtml .= '<input type="text" id="matlevel" class="comp">';
$displayhtml .= '</div>';
/*$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="location">Location</label>';
$displayhtml .= '<select  id="matlevellocation" class="matlevellocation">';
$displayhtml .='</select>';
$displayhtml .= '</div>';*/
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="location">Basic Salary</label>';
$displayhtml .= '<input type="number"  id="matlevellocationbasicsalary" class="matlevellocationbasicsalary comp" />';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<input type="hidden"  class="id" id="matlevelid">';
$displayhtml .= '<input type="hidden"  class="status" id="matlevelstatus">';

$displayhtml .= '<div class="section-header mtt" style="display:flex; gap:6px;margin-top: 30px; align-items:center;">';
$displayhtml .= '<h3>Allowances</h3>';
$displayhtml .= '</div>';

$displayhtml .= '<div name="allowancepersonnelcontainer">';
$displayhtml .= '<div class="jformgroup jformgroup form_row">';
$displayhtml .= '<div class="jformgroup jformgroupcol">';
$displayhtml .= '<input class="jformcontrol jmargin-top pervfy comp allowancename" type="text" id="allowancename0" placeholder="Allowance name" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<input class="jformcontrol jmargin-top pervfy comp allowancepercent" type="number" id="allowancepercent0" placeholder="Percentage %" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<div id="personneladdallowance" style="font-size: small;margin-left: 0px" class="mt oreadddebit1"> Add More </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div id="allowancepersonnelcontainer">';
// $displayhtml .= '<div name="allowancepersonnelcontainer">';
// $displayhtml .= '<div class="jformgroup jformgroup form_row">';
// $displayhtml .= '<div class="jformgroup jformgroupcol">'; 
// $displayhtml .= '<input class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Allowance name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<input class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Percentage %" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div class="section-header mtt" style="display:flex; gap:6px;margin-top: 30px; align-items:center;">';
$displayhtml .= '<h3>Deductions</h3>';
$displayhtml .= '</div>';

$displayhtml .= '<div name="deductionspersonnelcontainer">';
$displayhtml .= '<div class="jformgroup jformgroup form_row">';
$displayhtml .= '<div class="jformgroup jformgroupcol">';
$displayhtml .= '<input class="jformcontrol jmargin-top pervfy comp deductionname" type="text" id="deductionname0" placeholder="Deductions name" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<input class="jformcontrol jmargin-top pervfy comp deductionpecent" type="number" id="deductionpecent0" placeholder="Percentage %" required>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
$displayhtml .= '<div id="personneladddeductions" style="font-size: small;margin-left: 0px" class="mt oreadddebit1"> Add More </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div id="deductionspersonnelcontainer">';
// $displayhtml .= '<div name="allowancepersonnelcontainer">';
// $displayhtml .= '<div class="jformgroup jformgroup form_row">';
// $displayhtml .= '<div class="jformgroup jformgroupcol">'; 
// $displayhtml .= '<input class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Allowance name" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<input class="jformcontrol jmargin-top pervfy" type="text" id="" placeholder="Percentage %" required>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="jformgroup jformgroupcol jmargin-left">';
// $displayhtml .= '<div id="" class="oreadddebit oreremove mt" onclick="this.parentElement.parentElement.parentElement.remove();">Remove</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
// $displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '<div class="formcontrol" style="display:flex;justify-content:flex-end">';
$displayhtml .= '<div class="btns ">';
$displayhtml .= '<button type="submit" class="btnmedium btn btnblue" id="matlevelsubmitbtn">';
$displayhtml .= 'Save';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '';

$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> level  </th>';
$displayhtml .= '<th> Basic Salary  </th>';
$displayhtml .= '<th> No. of Allowances </th>';
$displayhtml .= '<th> No. of Deductions </th>';
$displayhtml .= '<th> Action </th>';

$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="leveltabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';

$displayhtml .= '</form>';

echo $displayhtml;
?>