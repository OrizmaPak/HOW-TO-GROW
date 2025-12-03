<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>COMMISSION CATEGORIES</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol hidden">';
$displayhtml .= '<label for="stockledgreceivedfrom">Location </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="commissioncategorieslocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Commission</label>';
$displayhtml .= '<input type="numbers" class="stockledgdate" id="commissioncategoriescommission"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Range of Property Value</label>';
$displayhtml .= '<div style="display: flex;justify-content:center;align-items:center">';
$displayhtml .= '<label class="hidden" for="stockledgdate">Start Range of Property Value</label><input type="number" class="stockledgdate" id="commissioncategoriesstartrange"/>';
$displayhtml .= '<p style="padding:10px">to</p>';
$displayhtml .= '<label class="hidden" for="stockledgdate">End Range of Property Value</label><input type="number" class="stockledgdate" id="commissioncategoriesendrange"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="commissioncategoriesfetchview">Save</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="commissioncategoriesoretable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Commission </th>
                                <th> Range  </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="commissioncategoriesorehistorytablecontent">
                            
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
$displayhtml .= '<div id="commissioncategoriesorefulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="commissioncategoriesoretable2">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Commission </th>
                                <th> Range  </th>
                            </tr>
                        </thead>
                        <tbody id="commissioncategories2orehistorytablecontent">
                            
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="commissioncategoriesprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="commissioncategoriesexport">Export Excel</div>
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
