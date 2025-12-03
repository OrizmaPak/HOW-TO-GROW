<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .='<h5 style="text-transform:uppercase">aggregated branch deposits</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain" style="height: 900px">';
$displayhtml .='<div class="chart_panel">'; 
$displayhtml .='<select class="threedselectmonth" name="" id="fivedselectmonth5">';
$displayhtml .='<option>FULL YEAR</option>';
// $displayhtml .='<option>1ST HALF OF THE YEAR</option>';
// $displayhtml .='<option>2ND HALF OF THE YEAR</option>';
// $displayhtml .='<option>1ST QUARTER OF THE YEAR</option>';
// $displayhtml .='<option>2ND QUARTER OF THE YEAR</option>';
// $displayhtml .='<option>3RD QUARTER OF THE YEAR</option>';
// $displayhtml .='<option>LAST QUARTER OF THE YEAR</option>';
$displayhtml .='</select>';
$displayhtml .='<select class="threedselectyear" name="" id="fivedselectyear5">';
$displayhtml .='</select>';
$displayhtml .='<select class="threedselectchart" name="" id="fivedselectchart5">';
$displayhtml .='<option value="line">LINE</option>';
$displayhtml .='<option value="bar">BAR</option>';
$displayhtml .='<option value="doughnut">DOUGHNUT</option>';
$displayhtml .='<option value="pie">PIE</option>';
$displayhtml .='<option value="polarArea">POLARAREA</option>';
$displayhtml .='<option value="radar">RADAR</option>';
$displayhtml .='</select>';
$displayhtml .='</div>';
$displayhtml .= '<div class="jtable-content" style="padding: 40px 0;background: #f1f1f1;" id="aggregatedbranchdepositstabledatacontainerwrapper">
                    <table class="jmargin-top" id="aggregatedbranchdepositstabledatacontainer" style="display: flex;flex-direction:row;justify-content: center;width: %;background: white;width: fit-content;margin: auto;"> 
                        <thead>
                            <tr style="display: flex;flex-direction:column;" id="aggregatedbranchdepositstabledataheader">
                               <th>Branch</th>
                            </tr>
                        </thead>
                        <tbody id="aggregatedbranchdepositstabledata" style="display: flex;flex-direction:column;">
                        
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
$displayhtml .= '<div style="display: flex;justify-content: flex-end;margin-top: 40px" class="">
                    <div class="orerbtn" id="viewaggregatedbranchdepositsprint">Print</div>
                    <div style="background: green; width: 90px" class="orerbtn" id="viewaggregatedbranchdepositsexport">Export Excel</div>
                </div>';
$displayhtml .='<canvas style="max-height: 600px;" id="myChartfive"></canvas>';
$displayhtml .= '</div>';
echo $displayhtml;
?>



