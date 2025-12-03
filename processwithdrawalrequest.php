<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>PROCESS WITHDRAWAL REQUEST</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="" id="processwithdrawalrequestform">';
$displayhtml .= '<div class="" style="display: flex;flex-direction: column;">';
$displayhtml .= '<div class="formcontrol">'; 
$displayhtml .= '<label for="stockledgreceivedfrom">Marketer </label>';
$displayhtml .= '<input list="collectionviewmarketername" class="orejot"';
$displayhtml .= ' type="text" onchange="checkdatalist(this)"';
$displayhtml .= ' id="collectionviewsmarketer"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
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
// $displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="startdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Date</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="enddate"/>';
$displayhtml .= '</div>';

$displayhtml .= '</div>'; 
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end;gap:15px">';
$displayhtml .=  '<button type="button" class="j-action-btn jborder hidden" style="border-color: #007bff;text-transform:capitalize;" id="print-vwr">print</button>
                        <button type="button" class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-vwr">export excel</button>
                        <button type="button" class="createbranchbtn btn btnmedium btnblue  " id="processwithdrawalrequestview">View</button>
                    </div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="jpagecontent">
                        <thead>
                            <tr>
                                <th> s/n  </th>
                                <th style="width:300px"> Account name </th>
                                <th style="width:300px"> Account number </th>
                                <th> account officer  </th>
                                <th> reference </th>
                                <th> request date </th>
                                <th> disbursement officer </th>
                                <th> amount  </th>
                                <th style="width: 380px;"> action </th>
                            </tr>
                        </thead>
                        <tbody id="processwithdrawalrequesttable">

                        </tbody>
                    </table>
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


