<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">VIEW STAFF ADVANCE</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="vslcontainer">';
$displayhtml .= '<div class="inputcontainermsn icsn">';
$displayhtml .= '<label style="margin-bottom: 7px">Person Name</label>';
$displayhtml .= '<select id="selectuserviewstaffadvance" onchange="runviewstaffadvance(this.value)"><option value=""> --Select Personnel-- </option></select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="viewstaffadvancetabledatacontainer"> 
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Personnel </th> 
                                <th> title  </th>
                                <th> amount </th>
                                <th> entry date </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="viewstaffadvancetabledata">
                            
                        </tbody>
                    </table>
                </div>
                
                <div class="j-table-status jflex jcontent-between jmargin-top">
                    <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                    <span class="jflex jpagination">
                        <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                        <span id="pagination-numbers"></span>
                        <button  class="j-no-bg" type="button" id="jnext-button">next</button>
                    </span>
                </div>';
// $displayhtml .= '<div class="vsltableheader">';
// $displayhtml .= '<P>S/N</P>';
// $displayhtml .= '<P>Dates</P>';
// $displayhtml .= '<p>Staff Name</p>';
// $displayhtml .= '<p>Department</p>';
// $displayhtml .= '<p>Level</p>';
// $displayhtml .= '<p>Group</p>';
// $displayhtml .= '<p>Account User</p>';
// $displayhtml .= '<p>Monthly Deduction</p>';
// $displayhtml .= '<p>Loan Amount</p>';
// $displayhtml .= '</div>';
// $displayhtml .= '<div class="vsltablebodycontainer">';
// // $displayhtml .= '<div class="vsltablebody">';
// // $displayhtml .= '<P>S/N</P>';
// // $displayhtml .= '<P>Dates</P>';
// // $displayhtml .= '<p>Staff Name</p>';
// // $displayhtml .= '<p>Department</p>';
// // $displayhtml .= '<p>Level</p>';
// // $displayhtml .= '<p>Group</p>';
// // $displayhtml .= '<p>Account User</p>';
// // $displayhtml .= '<p>Monthly Deduction</p>';
// // $displayhtml .= '<p>Loan Amount</p>';
// // $displayhtml .= '</div>';
// $displayhtml .= '';
// $displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oretwobtncontainer">';
$displayhtml .= '<p class="ma0">ROYALTY</p>';
$displayhtml .= '<div class="orewrbtn">Back</div>';
$displayhtml .= '<div class="inputcontainermsn icsn">';
$displayhtml .= '<input type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div><datalist id="personelviewstaffadvance"></datalist>';

echo  $displayhtml;
?>