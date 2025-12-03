<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<input id="id" type="hidden">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">EMPLOYMENT RECORD</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="orecardcontainer" style="margin-top: 30px;">';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Personnel</p>';
$displayhtml .= '<input id="employerrecord_personnel" list="employerrecordpersonnelnames" class="" onchange="checkemprpersonnel(this)" placeholder="Personnel" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Employer</p>';
$displayhtml .= '<input id="employerrecord_employer" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Position</p>';
$displayhtml .= '<input id="employerrecord_position" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Basic</p>';
$displayhtml .= '<input id="employerrecord_basic" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Years Employed</p>';
$displayhtml .= '<input id="employerrecord_yearsemployed" type="number">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a" style="width: 98%">';
$displayhtml .= '<div class="inputcontainerln icsnf" style="width: 100%">';
$displayhtml .= '<p class="normaltext">Reason For Leaving </p>';
$displayhtml .= '<input id="employerrecord_reasonforleaving" type="text">'; 
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup">';
$displayhtml .= '<div id="employerrecordpreview">'; 
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="jformgroup jformgroupcol file-action" style="display: block;">'; 
$displayhtml .= '<input id="employerrecord_file" onchange="employerrecordloadimg(this)" type="file" accept=".png, .jpeg, .jpg, .pdf, .docx" class="jformcontrol jmargin-top hidden" >';
$displayhtml .= '<div onclick="this.previousElementSibling.click()" class="">';
$displayhtml .= '<p>click to add files</p>';
$displayhtml .= '<p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg | .pdf | .docx </p>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="employerrecord_fileholder" class="fileholder"> 
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oresubmitcontainer">';
$displayhtml .= '<div id="employerrecord_submitbtn" class="orerbtn">Submit</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="employerrecordpersonneltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> personnel </th>
                                <th> employer  </th>
                                <th> position  </th>
                                <th> basic </th>
                                <th> years employed </th>
                                <th> reason for leaving  </th>
                                <th> action </th>
                            </tr>
                        </thead>
                        <tbody id="employerrecordpersonneltablecontent">
                            
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
$displayhtml .= '</div>';
$displayhtml .= '<datalist id="employerrecordpersonnelnames"></datalist>';
echo $displayhtml;
?>