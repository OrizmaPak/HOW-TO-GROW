<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5> APPROVED COLLECTIONS</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Marketer </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionapproveviewsmarketer"';
$displayhtml .= ' class="stockledgreceivedfrom " disabled>';
$displayhtml .= '</select>';
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
$displayhtml .= '<div class="formcontrol hidden">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot" disabled';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionapproveviewslocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="collectionapproveviewstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="collectionapproveviewenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">'; 
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="collectionapproveviewview">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr>
                                <th style="width:300px"> Account number </th>
                                <th> account name  </th>
                                <th> transaction date </th>
                                <th style="width: 100px;"> credit (&#x20A6;) </th>
                            </tr>
                        </thead>
                        <tbody id="collectionapproveviewtable">

                        </tbody>
                        <tbody id="">
                            <tr>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="font-weight: bold;text-align: right"> Total Credit:  </td>
                                <td style="font-weight: bold;" id="collectionapproveviewtotal">  </td>
                            </tr>
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div class="btns btncenter hidden">
                        <button type="button" class="btnsizetwo btn " style="color: black" id="collectionapproveviewcheckall">Check All</button>
                        <button type="button" class="btnsizetwo btn" style="color:black" id="collectionapproveviewuncheckall">Uncheck All</button>
                        <button type="button" class="btnsizetwo btn" style="background:green" id="collectionapproveviewapprove">Approve</button>
                        <button type="button" class="btnsizetwo btn btnred" id="collectionapproveviewdecline">Decline</button>
                </div>';


$displayhtml .= '<div class="hidden" style="position: fixed; width: 100%; height: 100%;background: #151A1570;top:0;display: flex;justify-content: center; align-items:center">
                        <div style="width: 50%; min-width: 400px;height: 70%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '</div><datalist id="collectionapproveviewaccountname"></datalist>';
echo $displayhtml;
?>


