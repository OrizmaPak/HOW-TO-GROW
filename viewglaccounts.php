<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">LIST OF GENERAL LEDGER ACCOUNT</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div style="position: relative;" class="orecardcontainer">';
$displayhtml .= '<div class="oreglaccrow">';
$displayhtml .= '<div class="suboreglaccrow">';
$displayhtml .= '<!-- <div class="inputcontainermsn "> -->';
$displayhtml .= '<input id="viewgl_select" class="ma0 oresel" placeholder="Search Account Type" list="viewgl_selectlist" />';
// $displayhtml .= '<option value="">--select--</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '<option>sfdfsdfdsf</option>';
// $displayhtml .= '</select>';
$displayhtml .= '<!-- </div> -->';
$displayhtml .= '</div>';
$displayhtml .= '<div style="display: flex;" class="">'; 
$displayhtml .= '<div class="orerbtn" id="viewglaccountprint">Print</div>';
$displayhtml .= '<div style="background: green; width: 90px" class="orerbtn" id="viewglaccountexport">Export Excel</div>';
$displayhtml .= '<p class="normaltext hidden">Search</p>';
$displayhtml .= '<input id="viewgl_search" type="hidden">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div id="viewglfulltableparant" class="jtable-content">
                    <table class="jmargin-top" id="viewglfulltable">
                        <thead>
                            <tr>
                                <th> ACCOUNT NUMBER  </th>
                                <th> DESCRIPTION  </th>
                                <th> ACCOUNT TYPE  </th>
                                <th> GROUP NAME  </th>
                                <th>  </th>
                            </tr>
                        </thead>
                        <tbody id="viewgltabledata"></tbody>
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
// $displayhtml .= '<div class="glaccounttableheader">';
// $displayhtml .= '<p>ACCOUNT NUMBER</p>';
// $displayhtml .= '<p>DESCRIPTION</p>';
// $displayhtml .= '<p>ACCOUNT TYPE</p>';
// $displayhtml .= '<p>GROUP NAME</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="glaccounttablebodycontainer">';
// $displayhtml .= '<div class="glaccounttablebody">';
// $displayhtml .= '<p>65595265625</p>';
// $displayhtml .= '<p>BUILDING</p>';
// $displayhtml .= '<p>FIXED ASSET</p>';
// $displayhtml .= '<p>ASSET</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="glaccounttablebody">';
// $displayhtml .= '<p>65595265625</p>';
// $displayhtml .= '<p>BUILDING</p>';
// $displayhtml .= '<p>FIXED ASSET</p>';
// $displayhtml .= '<p>ASSET</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="glaccounttablebody">';
// $displayhtml .= '<p>65595265625</p>';
// $displayhtml .= '<p>BUILDING</p>';
// $displayhtml .= '<p>FIXED ASSET</p>';
// $displayhtml .= '<p>ASSET</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="glaccounttablebody">';
// $displayhtml .= '<p>65595265625</p>';
// $displayhtml .= '<p>BUILDING</p>';
// $displayhtml .= '<p>FIXED ASSET</p>';
// $displayhtml .= '<p>ASSET</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '';
// $displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<datalist id="viewgl_selectlist">';
$displayhtml .= '<option value="" disabled selected>--Select&nbsp;Account Type--</option>';
$displayhtml .= '<option value="ASSET">ASSET</option>';
$displayhtml .= '<option value="CASH">CASH</option>';
$displayhtml .= '<option value="CURRENT ASSETS">CURRENT ASSETS</option>';
$displayhtml .= '<option value="EXPENSE">EXPENSE</option>';
$displayhtml .= '<option value="INCOME">INCOME</option>';
$displayhtml .= '<option value="EQUITY RETAINED EARNINGS">EQUITY RETAINED EARNINGS</option>';
$displayhtml .= '<option value="EQUITY DOES NOT CLOSE">EQUITY DOES NOT CLOSE</option>';
$displayhtml .= '<option value="INVENTORY">INVENTORY</option>';
$displayhtml .= '<option value="OTHER ASSET">OTHER ASSET</option>';
$displayhtml .= '<option value="COST OF SALES">COST OF SALES</option>';
$displayhtml .= '<option value="FIXED ASSET">FIXED ASSET</option>';
$displayhtml .= '<option value="OTHER CURRENT ASSET">OTHER CURRENT ASSET</option>';
$displayhtml .= '<option value="ACCOUNTS PAYABLE">ACCOUNTS PAYABLE</option>';
$displayhtml .= '<option value="ACCOUNTS RECEIVABLE">ACCOUNTS RECEIVABLE</option>';
$displayhtml .= '<option value="ACCUMULATED DEPRECIATION">ACCUMULATED DEPRECIATION</option>';
$displayhtml .= '<option value="LIABILITIES">LIABILITIES</option>';
$displayhtml .= '<option value="OTHER CURRENT LIABILITIES">OTHER CURRENT LIABILITIES</option>';
$displayhtml .= '<option value="LONG TERM LIABILITIES">LONG TERM LIABILITIES</option>';
$displayhtml .= '<option value="EQUITY">EQUITY</option>';
$displayhtml .= '</datalist>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content hidden">
                    <table class="jmargin-top" id="viewglfulltable2">
                        <thead>
                            <tr>
                                <th> ACCOUNT NUMBER  </th>
                                <th> DESCRIPTION  </th>
                                <th> ACCOUNT TYPE  </th>
                                <th> GROUP NAME  </th>
                            </tr>
                        </thead>
                        <tbody id="viewgltabledata2"></tbody>
                    </table>
                </div>';

echo $displayhtml;
?>