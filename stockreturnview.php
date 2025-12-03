<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>RETURN VIEW</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Select Item [for filter]</label>';
$displayhtml .= '<select';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="returnviewitemlistelement"';
$displayhtml .= ' class="stockledgreceivedfrom">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="returnviewlocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="returnviewstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="returnviewenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="returnviewfetchview">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="returnvieworetable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Item Name </th>
                                <th> Model  </th>
                                <th> Item Type  </th>
                                <th> Quantity Returned </th>
                                <th> Unit Cost  </th>
                                <th> Product Value </th>
                                <th> Return Date </th>
                                <th> Service Charge </th>
                                <th> Reason </th>
                                <th> Stock Balance </th>
                                <th> Account Name </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="returnvieworehistorytablecontent">
                            
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
$displayhtml .= '<div id="returnvieworefulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="returnvieworetable2">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Item Name </th>
                                <th> Model  </th>
                                <th> Item Type  </th>
                                <th> Quantity Returned </th>
                                <th> Unit Cost  </th>
                                <th> Product Value </th>
                                <th> Return Date </th>
                                <th> Service Charge </th>
                                <th> Reason </th>
                                <th> Stock Balance </th>
                                <th> Account Name </th>
                            </tr>
                        </thead>
                        <tbody id="returnview2orehistorytablecontent">
                            
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewreturnprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="viewreturnexport">Export Excel</div>
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





<!--$displayhtml .=  '<div class="formcontainer overflowcontainer">';-->
<!--$displayhtml .=  '<div class="formheader">';-->
<!--$displayhtml .=  '<h5>STOCK LEDGER VIEW</h5>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formmain ">';-->
<!--$displayhtml .=  '<form action="">';-->
<!--$displayhtml .=  '<div class="split">';-->
<!--$displayhtml .=  '<div class="formcontrol ">';-->
<!--$displayhtml .=  '<label for="selectitem">Select Item</label>';-->
<!--$displayhtml .=  '<select name="selectitem" id="matstockledgeritemname" class="selectitem">';-->
<!--$displayhtml .=  '<option value=""></option>';-->
<!--$displayhtml .=  '</select>';-->
<!--$displayhtml .=  '<button class="sortarrow btnicon">';-->
<!--$displayhtml .=  '<span>';-->
<!--$displayhtml .=  '<img src="images/icons/sort-arrows.png" alt="" />';-->
<!--$displayhtml .=  '</span>';-->
<!--$displayhtml .=  '</button>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="model"> Model</label>';-->
<!--$displayhtml .=  '<input type="text" class="model" id="matstockledgermodel">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .= '</div>';-->

<!--// $displayhtml .=  '<div class="formcontrol">';-->

<!--// $displayhtml .=  '</div>';-->

<!--$displayhtml .=  '<div class="split4">';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="savinsellingprice">Saving Selling Price</label>';-->
<!--$displayhtml .=  '<input type="number" class="savinsellingprice" id="matstockledgersavingselling">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="cashsellingprice">Cash Selling Price</label>';-->
<!--$displayhtml .=  '<input type="number" class="cashsellingprice" id="matstockledgercashselling">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="marketingprice">Marketing Price</label>';-->
<!--$displayhtml .=  '<input type="number" class="marketingprice" id="matstockledgermarketingprice">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="controlbalance">Control Balance</label>';-->
<!--$displayhtml .=  '<input type="number" class="controlbalance" id="matstockledgercontrolbalance">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</form>';-->
<!--$displayhtml .=  '<div class="split5">';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="totalqtyin">Total Quantity In</label>';-->
<!--$displayhtml .=  '<input type="number" class="totalqtyin" id="matstockledgerqtyin">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="totalqtyout">Total Quantity Out</label>';-->
<!--$displayhtml .=  '<input type="number" class="totalqtyout" id="matstockledgerqtyout">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="totalrevenued">Total Revenued</label>';-->
<!--$displayhtml .=  '<input type="number" class="totalrevenued" id="matstockledgertotalrevenued">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="totalgift">Total Gift</label>';-->
<!--$displayhtml .=  '<input type="number" class="totalgift" id="matstockledgertotalgift">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="actualbalance">Actual Balance</label>';-->
<!--$displayhtml .=  '<input type="number" class="actualbalance" id="matstockledgeractualbalance">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '';-->


<!--$displayhtml .=  '<div class="wrapbtn  ">';-->
<!--$displayhtml .=  '<button class="createbranchbtn btn btnmedium btnblue mb " id="matstockledgerviewbtn">View</button></div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<div class="generaltableholder">';-->
<!--$displayhtml .=  '<table id="matstockledgertable">';-->
<!--$displayhtml .=  '<tr class="fixedrow">';-->
<!--$displayhtml .=  '<th></th>';-->
<!--$displayhtml .=  '<th>Trandate</th>';-->
<!--$displayhtml .=  '<th>Item</th>';-->
<!--$displayhtml .=  '<th>Particulars</th>';-->
<!--$displayhtml .=  '<th>RefNo</th>';-->
<!--$displayhtml .=  '<th>QtyIn</th>';-->
<!--$displayhtml .=  '<th>QtyOut</th>';-->
<!--$displayhtml .=  '<th>Gift</th>';-->
<!--$displayhtml .=  '</tr>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<!-- <tr>';-->
<!--$displayhtml .=  '<td>1</td>';-->
<!--$displayhtml .=  '<td>22/09/2022</td>';-->
<!--$displayhtml .=  '<td>Surulere Branch</td>';-->
<!--$displayhtml .=  '<td>02456810345</td>';-->
<!--$displayhtml .=  '<td>Egbedokun matthew</td>';-->
<!--$displayhtml .=  '<td>Niyi Osungbade</td>';-->
<!--$displayhtml .=  '<td>Provision</td>';-->
<!--$displayhtml .=  '<td>43021</td>';-->
<!--$displayhtml .=  '</tr> -->';-->
<!--$displayhtml .=  '</table>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->

<!--echo $displayhtml;-->