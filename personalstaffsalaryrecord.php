<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">STAFF SALARY RECORD</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="inputcontainerln icsn">';
$displayhtml .= '<p class="normaltext">Personnel</p>';
$displayhtml .= '<div style="display:flex"><input id="stafsalinput" onkeyup="checkstaffsalrecpersonnel(this)" onchange="checkstaffsalrecpersonnel(this)" list="personneldatanames" placeholder="Search Personnel name" type="text"><button id="staffsalrecsearchbtn" onclick="personnelstaffrecordsearchclick()" class="orerbtn" style="height: 32px;position: relative;top: -6px;display: none;margin-left:10px">Search<search></div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="warningpersonneltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> personnel </th>
                                <th> entry&nbsp;date  </th>
                                <th> month  </th>
                                <th> year  </th>
                                <th> total&nbsp;allowance  </th>
                                <th> total&nbsp;deduction  </th>
                                <th> with&nbsp;attendance  </th>
                                <th> net&nbsp;payable  </th>
                            </tr>
                        </thead>
                        <tbody id="staffsalaryrecordtablecontent">
                            
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
$displayhtml .= '<div style="display: flex;" class=""><div class="orerbtn" id="staffsalprint">Print</div><div style="background: green; width: 90px" class="orerbtn" id="staffsalexport">Export Excel</div></div>';
$displayhtml .= '<div id="viewpersonnelfulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="stafsalrectabledatafull2">
                        <thead>
                            <tr>
                                 <th>s/n </th>
                                <th> personnel </th>
                                <th> entry&nbsp;date  </th>
                                <th> month  </th>
                                <th> year  </th>
                                <th> total&nbsp;allowance  </th>
                                <th> total&nbsp;deduction  </th>
                                <th> with&nbsp;attendance  </th>
                                <th> net&nbsp;payable  </th>
                            </tr>
                        </thead>
                        <tbody id="stafsalrectabledata2"></tbody>
                    </table>
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<datalist id="personneldatanames"></datalist>';
$displayhtml .= '</div>';

echo  $displayhtml;
?>