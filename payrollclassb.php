<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">Payroll Class B</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="staffloancontainer">';
$displayhtml .= '<div class="inputcontainermsn icsn">';
$displayhtml .= '<p class="normaltext">Select by Branch</p>';
$displayhtml .= '<select id="appconbranch">';
$displayhtml .= '<option value="">--select branch--</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainersmn icsn">';
$displayhtml .= '<p class="normaltext">Select Month</p>';
$displayhtml .= '<select id="payrollclassbmonth">';
$displayhtml .= '<option value="">--select month--</option>
<option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainersn icsn">';
$displayhtml .= '<p class="normaltext">Year</p>';
$displayhtml .= '<select id="payrollclassbyear">';
$displayhtml .= '<option value="">--year--</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainermsn hidden  icsn">';
$displayhtml .= '<p class="oresubheader bold">Total Salary</p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oresubmitcontainer">';
$displayhtml .= '<div id="payrollclassb_submitbtn" class="orerbtn">Fetch</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';


$displayhtml .= '
';

$displayhtml .= '';
$displayhtml .= '<!-- content here -->';
$displayhtml .= '';
$displayhtml .= '<div id="payrollclassbcontainer" class="jmargin-top">
<div class="jflex jcontent-between no-pr jmargin-top" style="margin-bottom: 20px">
                <span class="jcontent-between">
                    <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="pc-btn">print</button> &nbsp;    
                    <button class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="ec-btn">export excel</button>
                </span>
            </div>
<div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; font-family: Arial, sans-serif; font-size: 14px;">
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        TOTAL NET PAYABLES: 
        <span style="margin-left: 5px; color: blue; font-weight: bold;" id="payrolltotalnetpayables"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        TOTAL ALLOWANCES: 
        <span style="margin-left: 5px; color: red; font-weight: bold;" id="totaldeductions"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        MONTH: 
        <span style="margin-left: 5px; color: green; font-weight: bold;" id="pmonth"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        YEAR: 
        <span style="margin-left: 5px; color: green; font-weight: bold;" id="pyear"></span>
    </p>
</div>';
$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="payrollclassbtable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> first&nbsp;name </th>';
$displayhtml .= '<th> last&nbsp;name  </th>';
$displayhtml .= '<th> other&nbsp;names  </th>';
$displayhtml .= '<th> bank number </th>';
$displayhtml .= '<th> bank name </th>';
$displayhtml .= '<th> department </th>';
$displayhtml .= '<th> total allowance </th>';
$displayhtml .= '<th> net payable </th>';
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="payrollclassbtablecontent"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jflex hidden jitems-left jmargin-top" style="margin-top:35px">';
$displayhtml .= '<div class="jflex jitems-left" style="width: 100%;">';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="width: 15%;text-transform: capitalize;background-color: rgb(34, 33, 33);"';
$displayhtml .= 'onclick="checkallconfirmpayrolltoapprove(this)">select all</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="margin-left: 4px;width: 15%;text-transform: capitalize;background-color: green;"';
$displayhtml .= 'onclick="confirmpayrolltoapprove()">Approve</button>';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="margin-left: 6px;width: 15%;text-transform: capitalize;background-color: red;"';
$displayhtml .= 'onclick="confirmpayrolltodelete()">Delete</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '
<div style="margin-top:25px" class="j-table-status hidden jflex jcontent-between jmargin-top">
    <span class="jcontrollabel" style="text-transform: none;" id="pagination-status"></span>
    <span class="jflex jpagination">
        <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
        <span id="pagination-numbers"></span>
        <button class="j-no-bg" type="button" id="jnext-button">next</button>
    </span>
</div>
';
$displayhtml .= '</div>';


$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>