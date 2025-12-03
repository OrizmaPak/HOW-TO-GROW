<?php
session_start();

$displayhtml .=  '<div class="formcontainer overflowcontainer">';
$displayhtml .=  '<div class="formheader">';
$displayhtml .=  '<h5>REGISTERED ITEMS VIEW/REPORT</h5>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="formmain registeredviewmain">';
$displayhtml .=  '<form action="">';
$displayhtml .=  '<div class="split">';
$displayhtml .=  '<div class="formcontrol ">';
$displayhtml .=  '<label for="selectitem">Select by item</label>';
$displayhtml .=  '<select name="selectitem" id="selectitem" class="selectitem">';
$displayhtml .=  '<option value=""></option>';
$displayhtml .=  '</select>';
$displayhtml .=  '<button class="sortarrow btnicon">';
$displayhtml .=  '<span>';
$displayhtml .=  '<img src="images/icons/sort-arrows.png" alt="" />';
$displayhtml .=  '</span>';
$displayhtml .=  '</button>';
$displayhtml .=  '</div>';
$displayhtml .=  '<div class="wrapbtn">';
$displayhtml .=  '<button class="createbranchbtn btn btnmedium btnblue">View</button></div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</form>';
$displayhtml .=  '<div class="generaltableholder">';
$displayhtml .=  '<table id="registereditemviewtable">';
$displayhtml .=  '<tr class="fixedrow">';
$displayhtml .=  '<th>NO</th>';
$displayhtml .=  '<th>Product Names........</th>';
$displayhtml .=  '<th>Product Model</th>';
$displayhtml .=  '<th>Warehouse Price</th>';
$displayhtml .=  '<th>Selling Price</th>';
$displayhtml .=  '<th>Marketing Price</th>';
$displayhtml .=  '</tr>';
$displayhtml .=  '';
$displayhtml .=  '<!-- <tr class="repeatrow">';
$displayhtml .=  '<td>1</td>';
$displayhtml .=  '<td>STORAGE TANK 250 GALLONS</td>';
$displayhtml .=  '<td>250 GALLONS</td>';
$displayhtml .=  '<td>44,500.00</td>';
$displayhtml .=  '<td>44,500.00</td>';
$displayhtml .=  '<td>0.00</td>';
$displayhtml .=  '';
$displayhtml .=  '</tr> -->';
$displayhtml .=  '</table>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '</div>';
$displayhtml .=  '';


echo $displayhtml;
?>