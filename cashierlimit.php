<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= "<h5>CASHIER LIMIT</h5>";
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Cashier</label>';
$displayhtml .= '<input type="text" class="stockledgdate" id="cashierlimitcashier" onchange="checkcashieremail(this.value)"  list="cashieruserlist"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Cashier Full name</label>';
$displayhtml .= '<input type="text" class="stockledgdate" disabled id="cashierlimitcashiername"/>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Deposit Limit</label>';
$displayhtml .= '<input type="number" class="stockledgdate" id="cashierlimitdepositlimit"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Withdrawal limit</label>';
$displayhtml .= '<input type="number" class="stockledgdate" id="cashierlimitwithdrawallimit"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="cashierlimitsubmitbtn">Submit</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="cashierlimitoretable"> 
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> first name </th>
                                <th> last name </th>
                                <th> email  </th>
                                <th> deposit limit </th>
                                <th> withdrawal limit  </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="cashierlimittablecontent">
                            
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
// $displayhtml .= '<div id="cashierlimitorefulltableparant" class="jtable-content hidden">
//                     <table class="jmargin-top" id="cashierlimitoretable2">
//                         <thead>
//                             <tr>
//                                 <th>s/n </th>
//                                 <th> branch </th>
//                                 <th> GROUP  </th>
//                                 <th> TARGET </th>
//                                 <th> START PERIOD  </th>
//                                 <th> END PERIOD </th>
//                             </tr>
//                         </thead>
//                         <tbody id="cashierlimittablecontent2">
                            
//                         </tbody>
//                     </table>
//                 </div>';

$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="hidden" style="position: fixed; width: 100%; height: 100%;background: #151A1570;top:0;display: flex;justify-content: center; align-items:center">
                        <div style="width: 50%; min-width: 400px;height: 70%; min-height: 200px; background: white;border-radius: 20px;padding: 15px">
                            Modal content goes here
                        </div>
                </div>';
$displayhtml .= '</div><datalist id="cashieruserlist"></datalist>';
echo $displayhtml;
?>
