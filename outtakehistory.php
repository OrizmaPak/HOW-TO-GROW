<?php
session_start();

$displayhtml .=  '<div class="formcontainer overflowcontainer">';
$displayhtml .=  '<div class="formheader">';
$displayhtml .=  '<h5>OUTTAKE HISTORY</h5>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formmain ">';
$displayhtml .=  '';
$displayhtml .=  '<div class="split">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="startdate">Start Date</label>';
$displayhtml .=  '<input type="date" name="startdate" id="matstockinhistorystartdate">';
$displayhtml .=  '</div>';
$displayhtml .=  '';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="enddate">End Date</label>';
$displayhtml .=  '<input type="date" name="enddate" id="matstockinhistoryenddate">';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';

$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn  ">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="matstockinhistoryviewbtn">View</button></div>';
$displayhtml .=  '</div>';

$displayhtml .= '<div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="guarantorpersonneltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th style="width: 5px"> Items No </th>
                                <th> Item Name - [cost] - [quantity] </th>
                                <th> Total Quantity  </th>
                                <th> Total Cost  </th>
                                <th> Transaction Date  </th>
                                <th> Location </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody id="outtakehistorytablecontent">
                            
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


$displayhtml .=  '</div>';

$displayhtml .=  '<div id="modalmat" class="matmodal matmodalhidde">';
$displayhtml .=  '<div class="matmodaltext">';
$displayhtml .=  '<div class="matmodal__header">';
$displayhtml .= '<strong class="matcancelmodal" onclick="document.getElementById(\'modalmat\').classList.add(\'matmodalhidde\')">X</strong>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="matmodalbody">';
$displayhtml .= '<div class="jtable-content">
                    <p>Transaction Date: <span id="outtaketdmodal" style="font-weight: bold"></span> <p style="marginLeft: 20px;">Description: <span id="outtakedesmodal" style="font-weight: bold"></span> </p></p>
                    <p>Location: <span id="outtakelocationmodal" style="font-weight: bold"></span></p>
                    <table class="jmargin-top" id="guarantorpersonneltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Item ID </th>
                                <th> Item Name </th>
                                <th> Quantity </th>
                                <th> Cost </th>
                            </tr>
                        </thead>
                        <tbody id="outtakehistorytablecontentmodal">
                            
                        </tbody>
                    </table>
                </div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';



$displayhtml .=  '</div>';

echo $displayhtml;
?>

