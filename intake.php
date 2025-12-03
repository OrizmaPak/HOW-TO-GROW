<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>INTAKES</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matintakereceivedfrom">Supplier </label>';
$displayhtml .= '<input';
$displayhtml .= ' type="text" list="supplierdata"';
$displayhtml .= ' id="intakesupplier" onchange="checksupplierpersonnel(this)"';
$displayhtml .= ' class="matintakereceivedfrom orejot"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matintakedate">Date</label>';
$displayhtml .= '<input type="date" class="matintakedate orejot" id="matintakedate"/>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matintakedate">Document No/Description (optional)</label>';
$displayhtml .= '<input type="input" class="matintakedate" id="matintakedescription"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matintakereferenceno">Reference Number</label>';
$displayhtml .= '<input readonly';
$displayhtml .= ' type="number"';
$displayhtml .= ' class="matintakereferenceno"';
$displayhtml .= 'id="matintakereferenceno"';
$displayhtml .= ' />';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';

$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="matgridholder">';
$displayhtml .= '<div class="takegridheader ">';
$displayhtml .= '<div class="grid1" style="width:340px">ITEM</div>';
$displayhtml .= '<div class="grid2" style="width:190px">ITEM INFO</div>';
$displayhtml .= '<div class="grid3">UNIT&nbsp;COST</div>';
$displayhtml .= '<div class="grid4">QTY</div>';
$displayhtml .= '<div class="grid7">VALUE</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="rowContainerintake">';
$displayhtml .= '<div class="intakegridrow" id="intakegridrow_0">
<input type="hidden" name="rowid" >
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled name="selectitem"  style="width:350px" onchange="matintakeselectitem(this.id, this.value)" id="matintakeselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item"  style="width:200px">
                        <p>Type: <span id="intaketype_0"></span></p>
                        <p>Model: <span id="intakemodel_0"></span></p>
                        <p>Stock Balance: <span id="intakestockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakeunitcost_0" name="intakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalter(this.id)" onchange="itemalter(this.id)" id="intakequantity_0" name="intakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="intakevalue_0" name="intakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addintakerow(this.id)" class="intakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="btns wrapbtn">';
$displayhtml .= '<button type="button" class="btnlarge btn btnblue mt" style="cursor: pointer; margin-left: auto" id="matintakebtnsubmit">';
$displayhtml .= ' Submit';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<datalist id="supplierdata">';
$displayhtml .= '</datalist>';
echo $displayhtml;
?>

<!--$displayhtml .=  '<div class="formcontainer overflowcontainer">';-->
<!--$displayhtml .=  '<div class="formheader">';-->
<!--$displayhtml .=  '<h5>INTAKE</h5>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formmain">';-->
<!--$displayhtml .=  '<form action="">';-->
<!--// $displayhtml .=  '<div class="split">';-->
<!--// $displayhtml .=  '<div class="formcontrol">';-->
<!--// $displayhtml .=  '<label for="matintakereceivedfrom">Received From</label>';-->
<!--// $displayhtml .=  '<select';-->
<!--// $displayhtml .=  ' type="text"';-->
<!--// $displayhtml .=  ' name="matintakereceivedfrom"';-->
<!--// $displayhtml .=  ' id="matintakereceivedfrom"';-->
<!--// $displayhtml .=  ' class="matintakereceivedfrom"';-->
<!--// $displayhtml .=  ' >';-->
<!--// $displayhtml .=  '<option value=""></option>';-->
<!--// $displayhtml .=  '<option value=""></option>';-->
<!--// $displayhtml .=  '</select>';-->
<!--// $displayhtml .=  '</div>';-->
<!--// $displayhtml .=  '';-->
<!--// $displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="split">';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="matintakedate">Date</label>';-->
<!--$displayhtml .=  '<input type="date" class="matintakedate" id="matintakedate" />';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="matintakedate">Document No/Description</label>';-->
<!--$displayhtml .=  '<input type="input" class="matintakedate" id="matintakedate" />';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<input type="hidden" value="1" id="batchid">';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<div class="split">';-->
<!--$displayhtml .=  '<div class="formcontrol">';-->
<!--$displayhtml .=  '<label for="matintakereferenceno">Reference Number</label>';-->
<!--$displayhtml .=  '<input readonly';-->
<!--$displayhtml .=  ' type="number"';-->
<!--$displayhtml .=  ' class="matintakereferenceno"';-->
<!--$displayhtml .=  ' id="matintakereferenceno"';-->
<!--$displayhtml .=  ' />';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<div class="split">';-->
<!--$displayhtml .=  '<div class="formcontrol"></div>';-->
<!--$displayhtml .=  '<div class="btns wrapbtn">';-->
<!--$displayhtml .=  '<button';-->
<!--$displayhtml .=  'type="button"';-->
<!--$displayhtml .=  ' class="btnlarge btn btnblue mt"';-->
<!--$displayhtml .=  ' id="matintakebtnsubmit"';-->
<!--$displayhtml .=  ' >';-->
<!--$displayhtml .=  ' Submit';-->
<!--$displayhtml .=  '</button>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<!-- <button class="createbranchbtn btn btnblue">Enter Branch </button> -->';-->
<!--$displayhtml .=  '</form>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '<div class="matgridholder">';-->
<!--$displayhtml .=  '<div class="takegridheader">';-->
<!--$displayhtml .=  '<div class="grid1">ITEM</div>';-->
<!--$displayhtml .=  '<div class="grid2">ITEM INFO</div>';-->
<!--$displayhtml .=  '<div class="grid3">UNIT COST</div>';-->
<!--$displayhtml .=  '<div class="grid4">QUANTITY</div>';-->
<!--$displayhtml .=  '<div class="grid5">VALUE</div>';-->
<!--// $displayhtml .=  '<div class="grid6">DESCRIPTION</div>';-->
<!--// $displayhtml .=  '<div class="grid7">VALUE</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="intakegridrow">';-->
<!--$displayhtml .=  '<div class="grid__item">';-->
<!--$displayhtml .=  '<select name="selectitem" id="matintakeselectitem">';-->
<!--$displayhtml .=  '<option value="" disabled selected>select item</option>';-->
<!--$displayhtml .=  '';-->
<!--$displayhtml .=  '</select>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="grid__item">';-->
<!--$displayhtml .=  '<p>Type: <span id="intaketype"></span></p>';-->
<!--$displayhtml .=  '<p>Model: <span id="intakemodel"></span></p>';-->
<!--$displayhtml .=  '<p>Stock Balance: <span id="intakestockbalance"></span></p>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="grid__item">';-->
<!--$displayhtml .=  '<input type="number" id="intakeunitcost" name="intakeunitcost" />';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="grid__item">';-->
<!--$displayhtml .=  '<input type="number" id="intakequantity" name="intakequantity" />';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="grid__item">';-->
<!--$displayhtml .=  '<input type="text" id="intakevalue" name="intakevalue" disabled value="" />';-->
<!--$displayhtml .=  '</div>';-->
<!--// $displayhtml .=  '<div class="grid__item">';-->
<!--// $displayhtml .=  '<input type="text" id="intakedescription" name="intakedescription" disabled />';-->
<!--// $displayhtml .=  '<input type="hidden" id="intakeitemid" name="intakeitemid" disabled  />';-->
<!--// $displayhtml .=  '<input type="hidden" id="intakeitemname" name="intakeitemname" disabled  />';-->
<!--// $displayhtml .=  '</div>';-->
<!--$displayhtml .=  '<div class="grid__item">';-->
<!--$displayhtml .=  '<button class="intakeplusbtn">+ <span class="mattooltip"> Add new row </span></button>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->
<!--$displayhtml .=  '</div>';-->


<!--echo  $displayhtml;-->

