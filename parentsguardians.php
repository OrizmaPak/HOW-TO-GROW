<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<input id="id" type="hidden">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">Parents/Guardian</p>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="orecardcontainer" style="margin-top: 30px;padding-right: 20px">';
$displayhtml .= '<form id="parentsguardiansform" style="" class="jform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" style="padding-right:10px" > 
                    <div class="jformgroup jformgroupcol ">
                        <label class="jcontrollabel"> Staff: </label>
                        <input type="text" class="jformcontrol jmargin-top" list="parentsguardianspersonnelnames" onchange="checkparentspersonnel(this)" id="parentsguardians_personnel" name="staffid">
                    </div>
                    </div>
                <div class="jformgroup form_row" style="padding-right:10px" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Parent/Guardian (One): </label>
                        <input type="text" class="jformcontrol jmargin-top" id="parentsguardians_parentone" name="parentone">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Parent/Guardian (Two): </label>
                        <input type="text" class="jformcontrol jmargin-top" id="parentsguardians_parenttwo" name="parenttwo">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Parent/Guardian (One) Occupation: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="parentsguardians_parentoneoccupation" name="parentoneoccupation">
                    </div>
                </div>
                <div class="jformgroup form_row" style="padding-right:10px" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Parent/Guardian (Two) Occupation: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="parentsguardians_parenttwooccupation" name="parenttwooccupation">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Parent/Guardian (One) Phone: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="parentsguardians_parentonephone" name="parentonephone">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Parent/Guardian (Two) Phone: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="parentsguardians_parenttwophone" name="parenttwophone">
                    </div>
                </div>
                <div class="jformgroup form_row" style="padding-right:10px" > 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Home Address: </label>
                        <textarea class="jformcontrol jmargin-top" id="parentsguardians_homeaddress" name="homeaddress"></textarea>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> office address: </label>
                        <textarea class="jformcontrol jmargin-top" id="parentsguardians_officeaddress" name="officeaddress"></textarea>
                    </div>
                </div>
                <div class="jformgroup">
                    <div id="warningpreview">
                    </div>
                        <div class="jformgroup jformgroupcol file-action" style="display: block;">
                            <input id="parentsguardians__file" onchange="warningloadimg(this)" type="file" accept=".png, .jpeg, .jpg, .pdf, .docx" class="jformcontrol jmargin-top hidden" >
                                <div onclick="this.previousElementSibling.click()" class="">
                                    <p>click to add files</p>
                                    <p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg | .pdf | .docx </p>
                                </div>
                            <div id="warning_fileholder" class="fileholder">
                        </div>
                    </div>
                </div>
                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn orerbtn" id="parentsguardians_submitbtn"> Submit </button>
                </div>
            </div>
        </form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="parentsguardianspersonneltable">
                        <thead>
                            <tr>
                            <th> s/n </th>
                                <th> personnel </th>
                                <th> parent one </th>
                                <th> parent two </th>
                                <th> parent one occupation </th>
                                <th> parent two occupation </th>
                                <th> parent one phone </th>
                                <th> parent two phone </th>
                                <th> home address </th>
                                <th> office address </th>
                                <th> action </th>
                            </tr>
                        </thead>
                        <tbody id="parentsguardianspersonneltablecontent">
                            
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
$displayhtml .= '<datalist id="parentsguardianspersonnelnames"></datalist>';
echo $displayhtml;
?>