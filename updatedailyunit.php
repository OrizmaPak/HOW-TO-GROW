<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>update daily unit</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="stockledgreceivedfrom">Filter by Account Number </label>';
$displayhtml .= '<input type="number" class="stockledgdate" id="updatedailyunitstartdate" onkeyup="filterupdatedailyunit()"/>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="">';
$displayhtml .=  '<div class="formcontrol hidden">';
$displayhtml .=  '<div class="wrapbtn" style="justify-content: flex-end">';
$displayhtml .=  '<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="updatedailyunitfetchview">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="jtable-content">
                    <table class="jmargin-top" id="updatedailyunitoretable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Account Number </th>
                                <th> Account Name  </th>
                                <th> Current Daily Unit  </th>
                                <th> Change Daily Unit to:  </th>
                                <th style="width: 150px"> Action </th>
                            </tr>
                        </thead>
                        <tbody id="updatedailyunitorehistorytablecontent">
                            
                        </tbody>
                    </table>
                </div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>
