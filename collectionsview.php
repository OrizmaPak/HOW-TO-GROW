<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>COLLECTIONS VIEW</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="" style="display: flex;flex-direction: column;">';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr style="background: green;color:white">
                                <th> s/n </th>
                                <th style="width:300px"> Full name </th>
                                <th> email </th>
                            </tr>
                        </thead>
                        <tbody id="collectionviewtablemarketer">
 
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">'; 
$displayhtml .= '<label for="stockledgreceivedfrom">Marketer </label>';
$displayhtml .= '<input list="collectionviewmarketername" class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionviewsmarketer"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">'; 
$displayhtml .= '<label for="stockledgreceivedfrom">Payment Method </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="paymentmethod"';
$displayhtml .= ' class="stockledgreceivedfrom ">
                    <option>ALL</option>
                    <option>CASH</option>
                    <option>TRANSFER</option>
                    </select>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol hidden">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot" disabled';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionviewslocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="collectionviewstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="collectionviewenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="collectionviewview">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr>
                                <th style="width:40px"> Approved </th>
                                <th > Account number </th>
                                <th style="width:300px"> account name  </th>
                                <th> daily unit  </th>
                                <th> transaction date </th>
                                <th style="width: 100px;"> credit (&#x20A6;) </th>
                                <th style="width: 200px;"> action </th>
                            </tr>
                        </thead>
                        <tbody id="collectionviewtable">

                        </tbody>
                        <tbody id="">
                            <tr>
                                <td style="border: none">   </td>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="font-weight: bold;text-align: right"> Total Credit:  </td>
                                <td style="font-weight: bold;" id="collectionviewtotal">  </td>
                                <td style="border: none">  </td>
                            </tr>
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div class="btns btncenter">
                        <button type="button" class="btnsizetwo btn " style="color: black" id="collectionviewcheckall">Check All</button>
                        <button type="button" class="btnsizetwo btn" style="color:black" id="collectionviewuncheckall">Uncheck All</button>
                        <button type="button" class="btnsizetwo btn" style="background:green" id="collectionviewapprove">Approve</button>
                        <button type="button" class="btnsizetwo btn btnred" id="collectionviewdecline">Decline</button>
                </div>';


$displayhtml .= '<div class="hidden" style="position: fixed; width: 100%; height: 100%;background: #151A1570;top:0;display: flex;justify-content: center; align-items:center">
                        <div style="width: 50%; min-width: 400px;height: 70%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '</div><datalist id="collectionviewaccountname"></datalist>';
$displayhtml .= '</div><datalist id="collectionviewmarketername"></datalist>';
echo $displayhtml;
?>


