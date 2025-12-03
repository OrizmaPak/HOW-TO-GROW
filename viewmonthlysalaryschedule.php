<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">VIEW MONTHLY SALARY SCHEDULE</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="staffloancontainer">';
$displayhtml .= '<div class="inputcontainermsn icsn">';
$displayhtml .= '<p class="normaltext">Select by Branch</p>';
$displayhtml .= '<select id="appconbranch2">';
$displayhtml .= '<option value="">--select branch--</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainersmn icsn">';
$displayhtml .= '<p class="normaltext">Select Month</p>';
$displayhtml .= '<select id="confirmmonthpayrollmonth">';
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
$displayhtml .= '<select id="confirmmonthpayrollyear">';
$displayhtml .= '<option value="">--year--</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainermsn hidden  icsn">';
$displayhtml .= '<p class="oresubheader bold">Total Salary</p>';
$displayhtml .= '<input type="text">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oresubmitcontainer">';
$displayhtml .= '<div id="confirmmonthsalary_submitbtn" class="orerbtn">Fetch</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';


$displayhtml .= '
<div class="jflex jcontent-between no-pr jmargin-top" style="margin-bottom: 20px">
                <span class="jcontent-between">
                    <button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="pc-btn">print</button> &nbsp;    
                    <button class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="ec-btn">export excel</button>
                </span>
            </div>
          ';

$displayhtml .= '';
$displayhtml .= '<!-- content here -->';
$displayhtml .= '';
$displayhtml .= '<div id="viewmonthlysalaryschedulecontainer" class="jmargin-top">  
        <div style="">
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; gap: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; font-family: Arial, sans-serif; font-size: 14px;">
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        TOTAL NET PAYABLES: 
        <span style="margin-left: 5px; color: blue; font-weight: bold;" id="payrolltotalsalaries"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        TOTAL ALLOWANCE: 
        <span style="margin-left: 5px; color: blue; font-weight: bold;" id="totalallowance"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        TOTAL DEDUCTIONS: 
        <span style="margin-left: 5px; color: red; font-weight: bold;" id="totaldeductions"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        TOTAL BASIC SALARY: 
        <span style="margin-left: 5px; color: blue; font-weight: bold;" id="totalbasicsalary"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        MONTH: 
        <span style="margin-left: 5px; color: black; font-weight: bold;" id="pmonth"></span>
    </p>
    <p style="margin: 0; display: flex; align-items: center; flex: 1;">
        YEAR: 
        <span style="margin-left: 5px; color: black; font-weight: bold;" id="pyear"></span>
    </p>
</div>';

$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top " id="viewmonthlysalaryscheduletable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th></th>';
$displayhtml .= '<th> first&nbsp;name </th>';
$displayhtml .= '<th> other&nbsp;names </th>';
$displayhtml .= '<th> last&nbsp;name  </th>';
$displayhtml .= '<th> department </th>';
$displayhtml .= '<th> level </th>';
$displayhtml .= '<th> net&nbsp;payable </th>';
$displayhtml .= '<th> total&nbsp;allowance </th>';
$displayhtml .= '<th> total&nbsp;deduction </th>';
$displayhtml .= '<th> allowances </th>';
$displayhtml .= '<th> deductions </th>'; 
$displayhtml .= '<th> entry&nbsp;date </th>'; 
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="confirmmonthpayrolltablecontent"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jflex jitems-left jmargin-top" style="margin-top:35px">';
$displayhtml .= '<div class="jflex jitems-left" style="width: 100%;">';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="width: 15%;text-transform: capitalize;background-color: rgb(34, 33, 33);"';
$displayhtml .= 'onclick="checkallconfirmmonthpayrolltoapprove(this)">select all</button>&nbsp;';
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
$displayhtml .= '<div style="display: flex;" class="hidden"><div class="orerbtn" id="viewmonthprint">Print</div><div style="background: blue; width: 90px" class="orerbtn" id="viewmonthexport">Export Excel</div></div>';
$displayhtml .= '<div id="viewpersonnelfulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="viewmonthtabledatafull2">
                        <thead>
                            <tr>
                                 <th>s/n </th>
                                <th> first&nbsp;name </th>
                                <th> last&nbsp;name  </th>
                                <th> level </th>
                                <th> net&nbsp;payable </th>
                                <th> total&nbsp;allowance </th>
                                <th> total&nbsp;deduction </th>
                                <th> allowances </th>
                                <th> deductions </th>
                                <th> entry&nbsp;date </th>
                            </tr>
                        </thead>
                        <tbody id="viewmonthtabledata2"></tbody>
                    </table>
                </div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>