<div class="jcontainer">
    <h1 class="jpageheader">Property Stock Outtakes Report</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform" id ="propertystockoutform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <!--<div class="jformgroup jformgroup form_row">-->
                    <!--    <div class="jformgroup jformgroupcol">-->
                    <!--        <label  class="jcontrollabel">select item</label>-->
                    <!--        <select class="jformcontrol jmargin-top" name="selectitem" id="matpropertystockoutitemname">-->
                    <!--            <option value=""> -- Select item -- </option>-->
                    <!--        </select>-->
                    <!--    </div>-->
                    <!--    <div class="jformgroup jformgroupcol  jmargin-left">-->
                    <!--        <label  class="jcontrollabel">Total Quantity</label>-->
                    <!--        <input type="number" name="totalquantity" id="matpropertystockouttotalqty"  value="1000" class="jformcontrol jmargin-top" />-->
                    <!--    </div>-->
                    <!--</div>-->
                    <div class="jformgroup jformgroup form_row">
                         <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Start Date</label>
                            <input type="date" class="jformcontrol jmargin-top" name="startdate" id="matpropertystockoutfrom">
                        </div>
                        <div class="jformgroup jformgroupcol  jmargin-left">
                            <label  class="jcontrollabel">End Date</label>
                            <input type="date" name="enddate" id="matpropertystockoutto" class="jformcontrol jmargin-top">
                        </div>
                    </div>
                </div>

                <div class="jflex" style="margin: 30px 0;">
                    <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="matpropertystockoutviewbtn"> Submit </button>
                </div>
            </form>
            
            <div class="jtable-content" style="margin-top:50px">
                <table class="jmargin-top" id="propertystockouttable">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Account&nbsp;NO</th>
                            <th>Name</th>
                            <th>Del.&nbsp;Date</th>
                            <th>
                                Inventory&nbsp;detail
                            </th>
                        </tr>
                    </thead>
                    <tbody id="jtabledata"></tbody>
                </table>
            </div>
            <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
                <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                <span class="jflex jpagination">
                    <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                    <span id="pagination-numbers"></span>
                    <button  class="j-no-bg" type="button" id="jnext-button">next</button>
                </span>
            </div>
            
        </div>
    </div>
</div>



<?php
session_start();


$displayhtml .= '<div class="formcontainer overflowcontainer" id="mcontent">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>PROPERTY STOCKOUT VIEW/REPORT</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain registeredviewmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="selectitem">Select item</label>';
$displayhtml .= '<select name="selectitem" id="matpropertystockoutitemname" class="selectitem">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '<button class="sortarrow btnicon">';
$displayhtml .= '<span>';
$displayhtml .= '<img src="images/icons/sort-arrows.png" alt="" />';
$displayhtml .= '</span>';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="from">Date From</label>';
$displayhtml .= '<input type="date" name="from" class="from" id="matpropertystockoutfrom">';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol ">';
$displayhtml .= '<label for="dateto">Date To</label>';
$displayhtml .= '<input type="date" name="to" class="to" id="matpropertystockoutto">';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="totalqty">Total Quantity</label>';
$displayhtml .= '<input type="number"  class="totaquantity" id="matpropertystockouttotalqty" value=13494940 >';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="wrapbtn">';
$displayhtml .= '<button  type="button" class="createbranchbtn btn btnblue mb btnmedium" id="matpropertystockoutviewbtn">View</button>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="generaltableholder">';
$displayhtml .= '<table id="propertystockouttable">';
$displayhtml .= '<tr class="fixedrow">';
$displayhtml .= '<th></th>';
$displayhtml .= '<th>Date</th>';
$displayhtml .= '<th>Branch</th>';
$displayhtml .= '<th>Account No</th>';
$displayhtml .= '<th>Name</th>';
$displayhtml .= '<th>Invoice No</th>';
$displayhtml .= '<th>Account officer</th>';
$displayhtml .= '<th>Product</th>';
$displayhtml .= '<th>Quantity</th>';
$displayhtml .= '</tr>';
$displayhtml .= '';
$displayhtml .= '<!-- <tr>';
$displayhtml .= '<td>1</td>';
$displayhtml .= '<td>22/09/2022</td>';
$displayhtml .= '<td>Surulere Branch</td>';
$displayhtml .= '<td>02456810345</td>';
$displayhtml .= '<td>Egbedokun matthew</td>';
$displayhtml .= '<td>Niyi Osungbade</td>';
$displayhtml .= '<td>67</td>';
$displayhtml .= '<td>Provision</td>';
$displayhtml .= '<td>43021</td>';
$displayhtml .= '</tr> -->';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';

echo $displayhtml;
?>