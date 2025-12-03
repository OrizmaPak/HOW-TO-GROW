<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>GIFT VIEW</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="giftviewlocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="giftviewstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="giftviewenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="giftviewfetchview">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="giftvieworetable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Item Name </th>
                                <th> Model  </th>
                                <th> Item Type  </th>
                                <th> Quantity gifted </th>
                                <th> Unit Cost  </th>
                                <th> Product Value </th>
                                <th> Date Issued </th>
                                <th> Stock Balance </th>
                                <th> Reason </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="giftvieworehistorytablecontent">
                            
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
$displayhtml .= '<div id="giftvieworefulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="giftvieworetable2">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Item Name </th>
                                <th> Model  </th>
                                <th> Item Type  </th>
                                <th> Quantity gifted </th>
                                <th> Unit Cost  </th>
                                <th> Product Value </th>
                                <th> Date Issued </th>
                                <th> Stock Balance </th>
                                <th> Reason </th>
                            </tr>
                        </thead>
                        <tbody id="giftview2orehistorytablecontent">
                            
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewgiftprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="viewgiftexport">Export Excel</div>
                </div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="hidden" style="position: fixed; width: 100%; height: 100%;background: #151A1570;top:0;display: flex;justify-content: center; align-items:center">
                        <div style="width: 50%; min-width: 400px;height: 70%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>
