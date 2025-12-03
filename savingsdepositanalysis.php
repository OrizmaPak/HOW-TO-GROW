<?php
session_start();
    $displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .='<h5>SAVINGS DEPOSIT ANALYSIS</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain" style="height: 900px">';
$displayhtml .='<div class="chart_panel">'; 
$displayhtml .='<select name="" id="threedselectmonth3">';
$displayhtml .='<option>FULL YEAR</option>';
$displayhtml .='<option>1ST HALF OF THE YEAR</option>';
$displayhtml .='<option>2ND HALF OF THE YEAR</option>';
$displayhtml .='<option>1ST QUARTER OF THE YEAR</option>';
$displayhtml .='<option>2ND QUARTER OF THE YEAR</option>';
$displayhtml .='<option>3RD QUARTER OF THE YEAR</option>';
$displayhtml .='<option>LAST QUARTER OF THE YEAR</option>';
$displayhtml .='</select>';
$displayhtml .='<select name="" id="threedselectyear3">';
$displayhtml .='</select>';
$displayhtml .='<select name="" id="threedselectchart3">';
$displayhtml .='<option value="line">LINE</option>';
$displayhtml .='<option value="bar">BAR</option>';
$displayhtml .='<option value="doughnut">DOUGHNUT</option>';
$displayhtml .='<option value="pie">PIE</option>';
$displayhtml .='<option value="polarArea">POLARAREA</option>';
$displayhtml .='<option value="radar">RADAR</option>';
$displayhtml .='</select>';
$displayhtml .='</div>';
$displayhtml .='<canvas style="max-height: 600px;" id="myChartthree"></canvas>';
$displayhtml .= '</div>';
echo $displayhtml;
?>



