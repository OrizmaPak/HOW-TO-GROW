<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= "<h5>MARKETER'S TARGET</h5>";
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgitem">Select Branch</label>';
$displayhtml .= '<select disabled';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="marketerstargetlocation"';
$displayhtml .= ' class="stockledgreceivedfrom">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Group</label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="marketerstargetmarketers"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Target</label>';
$displayhtml .= '<input type="number" class="stockledgdate" id="marketerstargettarget"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">Start Period</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="marketerstargetstartdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgdate">End Period</label>';
$displayhtml .= '<input type="date" class="stockledgdate" id="marketerstargetenddate"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>'; 
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="marketerstargetsubmitbtn">Submit</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="marketerstargetoretable"> 
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> branch </th>
                                <th> marketers  </th>
                                <th> TARGET </th>
                                <th> START PERIOD  </th>
                                <th> END PERIOD </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="marketerstargettablecontent">
                            
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
$displayhtml .= '<div id="marketerstargetorefulltableparant" class="jtable-content hidden">
                    <table class="jmargin-top" id="marketerstargetoretable2">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> branch </th>
                                <th> marketers  </th>
                                <th> TARGET </th>
                                <th> START PERIOD  </th>
                                <th> END PERIOD </th>
                            </tr>
                        </thead>
                        <tbody id="marketerstargettablecontent2">
                            
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="marketerstargetprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="marketerstargetexport">Export Excel</div>
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


