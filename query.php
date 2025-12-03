<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<input id="id" type="hidden">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">QUERY</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="orecardcontainer" style="margin-top: 30px;">';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Personnel</p>';
$displayhtml .= '<input id="query_personnel" list="querypersonnelnames" class="" onchange="checkqpersonnel(this)" placeholder="Personnel" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Entry Date</p>';
$displayhtml .= '<input id="query_entrydate" type="date">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="inputcontainerln icsnf">';
$displayhtml .= '<p class="normaltext">Title</p>';
$displayhtml .= '<input id="query_title" type="text">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcnsection1">';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf hidden">';
$displayhtml .= '<p class="normaltext">Start Date</p>';
$displayhtml .= '<input id="query_startdate" type="date">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="stcs1a">';
$displayhtml .= '<div class="inputcontainerln icsnf hidden">';
$displayhtml .= '<p class="normaltext">End Date</p>';
$displayhtml .= '<input id="query_enddate" type="date">'; 
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jformgroup">';
$displayhtml .= '<div id="querypreview">'; 
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="jformgroup jformgroupcol file-action" style="display: block;">'; 
$displayhtml .= '<input id="query_file" onchange="queryloadimg(this)" type="file" accept=".png, .jpeg, .jpg, .pdf, .docx" class="jformcontrol jmargin-top hidden" >';
$displayhtml .= '<div onclick="this.previousElementSibling.click()" class="">';
$displayhtml .= '<p>click to add files</p>';
$displayhtml .= '<p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg | .pdf | .docx </p>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="query_fileholder" class="fileholder"> 
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="oresubmitcontainer">';
$displayhtml .= '<div id="query_submitbtn" class="orerbtn">Submit</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="querypersonneltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> personnel </th>
                                <th> entry date  </th>
                                <th> title  </th>
                                <th> action </th>
                            </tr>
                        </thead>
                        <tbody id="querypersonneltablecontent">
                            
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
$displayhtml .= '<datalist id="querypersonnelnames"></datalist>';
echo $displayhtml;
?>