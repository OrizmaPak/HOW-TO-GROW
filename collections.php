<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>COLLECTIONS</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="" style="display: flex;flex-direction: column-reverse;">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Marketer </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionsmarketer"';
$displayhtml .= ' class="stockledgreceivedfrom " disabled>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot" disabled';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="collectionslocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr>
                                <th> Account number </th>
                                <th> account name  </th>
                                <th> daily unit  </th>
                                <th> payment method  </th>
                                <th style="width: 100px;"> credit (&#x20A6;) </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="collectiontable">
                            <tr>
                                <td><p class="hidden">Account Number</p> <input name="collectionaccountnumber" id="collectionfirst" class="orecot" placeholder="Enter Account Number" list="collectionaccountname" onchange="checkInputwithdatalist(this.id, this.list.id) ? docollectionlabel(this) : this.parentElement.parentElement.children[1].textContent = null" style="width: 97%; height: 23px;text-align: center;" /> </td>
                                <td> account name  </td>
                                <td> 0  </td>
                                <td><select name="paymentmethod"  id="paymentmethod-1" class="orecot " style="width: 100px; height: 23px;text-align: center;"><option>CASH</option><option>TRANSFER</option></select> </td>
                                <td><p class="hidden">Credit</p> <input name="collectioncreditt" type="number" placeholder="Enter Credit" onchange="caltotalcollectioncredit()" id="collectiondfjs" class="orecot comma caltotalcollectioncredit" style="width: 100px; height: 23px;text-align: center;" /> </td>
                                <td style="width: 150px"> 
                                    <button onclick="addcollectionsrow()" style="padding: 5px 6px;cursor:pointer;border:none;outline:none;font-size:10px;color:white;background-color:green;border-radius:3px">Add</button>
                                </td>
                            </tr>

                        </tbody>
                        <tbody id=""> 
                            <tr>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="border: none">  </td>
                                <td style="font-weight: bold;"> Total:  </td>
                                <td style="font-weight: bold;" id="collectiontotal">  </td>
                                <td style="border: none">   </td>
                            </tr>
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="collectionsubmit">Submit</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="hidden" style="position: fixed; width: 100%; height: 100%;background: #151A1570;top:0;display: flex;justify-content: center; align-items:center">
                        <div style="width: 50%; min-width: 400px;height: 70%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '</div><datalist id="collectionaccountname"></datalist>';
echo $displayhtml;
?>


