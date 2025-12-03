<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<input id="id"  type="hidden">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">REFEREE</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="orecardcontainer" style="margin-top: 30px;">';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Personnel</p>';
$displayhtml .= '<input id="referees_personnel" list="refereespersonnelnames" class="" onchange="checkrefpersonnel(this)" placeholder="Personnel" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= "<p class='normaltext'>Referee's Full Name</p>";
$displayhtml .= '<input id="referees_name" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Occupation</p>';
$displayhtml .= '<input id="referees_occupation" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Relationship</p>';
$displayhtml .= '<input id="referees_relationship" type="text">'; 
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Phone Number</p>';
$displayhtml .= '<input id="referees_phonenumber" type="phone">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="inputcontainerln icsnf" style="width: 97%">';
$displayhtml .= '<p class="normaltext">Address</p>';
$displayhtml .= '<input id="referees_address" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup">';
$displayhtml .= '<div id="refereespreview">'; 
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="jformgroup jformgroupcol file-action" style="display: block;">'; 
$displayhtml .= '<input id="referees_file" onchange="refereesloadimg(this)" type="file" accept=".png, .jpeg, .jpg, .pdf, .docx" class="jformcontrol jmargin-top hidden" >';
$displayhtml .= '<div onclick="this.previousElementSibling.click()" class="">';
$displayhtml .= '<p>click to add files</p>';
$displayhtml .= '<p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg | .pdf | .docx </p>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="referees_fileholder" class="fileholder"> 
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oresubmitcontainer">';
$displayhtml .= '<div id="referees_submitbtn" class="orerbtn">Submit</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="refereespersonneltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> personnel </th>
                                <th> Referees Full Name  </th>
                                <th> Relationship  </th>
                                <th> Occupation  </th>
                                <th> Phone Number </th>
                                <th> Address </th>
                                <th style="width: 100px"> action </th>
                            </tr>
                        </thead>
                        <tbody id="refereespersonneltablecontent">
                            
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
$displayhtml .= '<datalist id="refereespersonnelnames"></datalist>';
echo $displayhtml;
?>