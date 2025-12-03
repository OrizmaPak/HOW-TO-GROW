<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>APPROVE WAREHOUSE SALES REVERSAL</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="" style="display: none">';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id=""';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="viewwhsalesstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="viewwhsalesenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="viewwhsalesfetchview1">Refresh</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="viewwhsalesoretable">
                        <thead>
                            <tr>
                                <th> s/n </th>
                                <th> ref  </th>
                                <th> transaction date </th>
                                <th> sales person  </th>
                                <th> details </th> 
                                <th> total item </th>
                                <th> total qty </th>
                                <th class="sadmin hidde"> cost </th>
                                <th> PRICE </th>
                                <th class="sadmin hidde"> gross profit </th>
                                <th> amount paid </th>
                                <th> payment method</th>
                                <th>description</th>
                                <th> other details</th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="viewwhsalesorehistorytablecontent">
                            
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
// $displayhtml .= '<div id="viewwhsalesorefulltableparant" class="jtable-content hidden">
//                     <table class="jmargin-top" id="viewwhsalesoretable2">
//                         <thead>
//                             <tr>
//                                  <th>s/n </th>
//                                 <th> ref  </th>
//                                 <th> transaction date </th>
//                                 <th> sales person  </th>
//                                 <th> details </th> 
//                                 <th> total qty </th>
//                                 <th> total cost  </th>
//                                 <th>  amount paid </th>
//                                 <th> payment method</th>
//                             </tr>
//                         </thead>
//                         <tbody id="viewwhsales2orehistorytablecontent">
                            
//                         </tbody>
//                     </table>
//                 </div>';
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewgiftprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="viewgiftexport">Export Excel</div>
                </div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div id="whsalesviewmodalcontainer" onclick="removewhsalesviewmodal(event)" class="hidden bgwhsales" style="overflow:auto;position: fixed; width: 100%; height: 100%;background: #151A1570;top:0%;display: flex;justify-content: center; align-items:center">
                        <div id="whsalesviewmodal" style="position:relative;top:10%;width: 70%; min-width: 400px;height: 100%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '<div id="whsalesviewmodalcontainerprint" onclick="removewhsalesviewmodal(event)" class="hidden bgwhsales" style="overflow:auto;position: fixed; width: 100%; height: 100%;background: #151A1570;top:0%;display: flex;justify-content: center; align-items:center">
                        <div id="whsalesviewmodalprint" style="position:relative;top:10%;width: 70%; min-width: 400px;height: 100%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                           
                        </div>
                </div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>
