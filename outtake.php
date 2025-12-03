<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>OUTTAKE</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matouttakereceivedfrom">Supply To </label>';
$displayhtml .= '<select';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="matouttakereceivedto"';
$displayhtml .= ' class="matouttakereceivedfrom orejot">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matouttakereceivedfrom">Supply From </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="matouttakereceivedfrom" onchange="rerunoutaketable(this)"';
$displayhtml .= ' class="matouttakereceivedfrom orejot">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matouttakedate">Date</label>';
$displayhtml .= '<input type="date" class="matouttakedate orejot" id="matouttakedate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matouttakedate">Document No/Description (optional)</label>';
$displayhtml .= '<input type="input" class="matouttakedate" id="matouttakedescription"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matouttakereferenceno">Reference Number</label>';
$displayhtml .= '<input readonly';
$displayhtml .= ' type="number"';
$displayhtml .= ' class="matouttakereferenceno"';
$displayhtml .= 'id="matouttakereferenceno"';
$displayhtml .= ' />';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '</div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div class="matgridholder">';
$displayhtml .= '<div class="takegridheader ">';
$displayhtml .= '<div class="grid1" style="width: 400px">ITEM</div>';
$displayhtml .= '<div class="grid2">ITEM INFO</div>';
$displayhtml .= '<div class="grid3">UNIT COST</div>';
$displayhtml .= '<div class="grid4">QUANTITY</div>';
$displayhtml .= '<div class="grid7">VALUE</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="rowContainerouttake">';
$displayhtml .= '<div class="outtakegridrow" id="outtakegridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item">
                    <p class="hidden">Item</p>
                        <select disabled style="width: 400px" name="selectitemout" onchange="matouttakeselectitemout(this.id, this.value)" id="matouttakeselectitem_0" class="orejot">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item">
                        <p>Type: <span id="outtaketype_0"></span></p>
                        <p>Model: <span id="outtakemodel_0"></span></p>
                        <p>Stock Balance: <span id="outtakestockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakeunitcost_0" name="outtakeunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="outtakequantity_0" name="outtakequantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Value</p>
                        <input type="text" readonly id="outtakevalue_0" name="outtakevalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addouttakerowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="btns wrapbtn">';
$displayhtml .= '<button type="button" class="btnlarge btn btnblue mt" style="cursor: pointer; margin-left: auto" id="matouttakebtnsubmit">';
$displayhtml .= ' Submit';
$displayhtml .= '</button>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>