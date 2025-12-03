<?php
session_start();

$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>SERIAL NUMBER CHECK</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '';
// $displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="branch">Branch</label>';
$displayhtml .= '<select disabled readonly name="branch" class="matbranch" id="matbranch">';
$displayhtml .= '</select >';

$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .=  '<div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label for="enteraccountno">Enter Account Number</label>';
$displayhtml .=  '<input type="number" name="enteraccountno" id="mataccountnumber" onfocusout="mataccoutnumberchecker(this.value, this.parentElement.parentElement.children[1].children[1], this)">';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<label class="matgreenlabel" for="accountname">Account Name</label>';
$displayhtml .=  '<p id="chxxxx"></p>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';

$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="complain">Complaint</label>';
$displayhtml .= '<textarea  class="complain" name="complain" id="matcomplain">';
$displayhtml .= '</textarea>';
$displayhtml .= '</div>';
// $displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="serialno"> Serial No</label>';
$displayhtml .= '<input type="number" class="serialno" name="serialno" id="matserialnumber">';
$displayhtml .= '</div>';

$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="serialno" style="visibliti:hidden">Request Date</label>';
$displayhtml .= '<input type="date" id="matdate">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<div class="btns">';
$displayhtml .= '<button id="matviewbtn" type="button" class="createbranchbtn btnmedium btn btnblue mt">Save </button>';
/*$displayhtml .= '<button  type="button" class="createbranchbtn btnmedium btn btnblue mt">Look Up</button>';
$displayhtml .= '<button type="button" class="createbranchbtn btnmedium btn btnblue mt">View</button>';*/
$displayhtml .= '</div>';
$displayhtml .= '</div>';
// $displayhtml .= '';
// $displayhtml .= '<div class="split3">';
// $displayhtml .= '<div class="split">';

// $displayhtml .= '</div>';
// $displayhtml .= '';
// $displayhtml .= '<div class="wrapbtn">';
// $displayhtml .= '<button type="button" id="matviewbtn" class="createbranchbtn btnmedium btn btnblue mt">View</button></div>';
// $displayhtml .= '<div class="wrapbtn">';
// $displayhtml .= '<button type="button" class="createbranchbtn btnmedium btn btnblue mt">Save Complain</button></div>';
// $displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '</div>';

$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="serialnumberlookuporetable"> 
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> branch </th>
                                <th> account name  </th> 
                                <th> account number  </th>
                                <th> complaint </th>
                                <th> date  </th>
                                <th> serial number  </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="serialnumberchecktablecontent">
                            
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

echo $displayhtml;
?>
