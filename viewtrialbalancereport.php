<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">TRIAL BALANCE REPORT</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="oregenledacc" style="background: #EDEBEC">';
$displayhtml .= '<div class="oreblueheadd" style="background: #EDEBEC">';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '<div class="inputcontainermn icsn">';
$displayhtml .= '<p class="normaltext">DATE</p>';
$displayhtml .= '<input type="date" id="viewtrialbalrepdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orebluehead mtt">';
$displayhtml .= '<div class="orebtnblluue" id="viewtrialbalrepdateviewbtn">View</div>';
$displayhtml .= '<div class="orebtnblluue" id="viewtrialbalrepprint">Print</div>';
$displayhtml .= '<div class="orebtnblluue" id="viewtrialbalrepexport">Export</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content" id="viewstaffadvancetabledatacontainerwrapper">
                    <table class="jmargin-top" id="viewstaffadvancetabledatacontainer"> 
                        <thead>
                            <tr>
                               <th>item/decription</th>
                               <th>debit</th>
                               <th>credit</th>
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
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>