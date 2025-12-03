<?php
session_start();
$displayhtml .= '<div class="formcontainer overflowcontainer">';
$displayhtml .= '<div class="formheader">';
$displayhtml .= '<h5>WAREHOUSE SALES</h5>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formmain" style"padding:0 !important">';
$displayhtml .= '<form action="">';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesreceivedfrom">Supply To </label>';
$displayhtml .= '<input type="text" onchange="whsaleschecktoopen()" list="supplierwhsalesdata" class="matwhsalesdate orejot" id="matwhsalesreceivedto"/>';
// $displayhtml .= '<input type="text" onchange="checkInputwithdatalist(this.id, this.list.id);whsaleschecktoopen()" list="supplierwhsalesdata" class="matwhsalesdate orejot" id="matwhsalesreceivedto"/>';
// $displayhtml .= '<input type="text" list="supplierwhsalesdata" class="matwhsalesdate orejot" id="matwhsalesreceivedto"/>';
$displayhtml .= '</div>';
// $displayhtml .= '<div class="formcontrol">';   
// $displayhtml .= '<label for="matwhsalesreceivedto">Supply To </label>';
// $displayhtml .= '<select class="orejot"';
// $displayhtml .= ' type="text"';
// $displayhtml .= ' id="matwhsalesreceivedto" onchange="whsalesrerunoutaketable(this);whsaleschecktoopen()"';
// $displayhtml .= ' class="matwhsalesreceivedto orejot">';
// $displayhtml .= '<option value=""></option>';
// $displayhtml .= '</select>';
// $displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesreceivedfrom">Supply From </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="matwhsalesreceivedfrom" onchange="whsalesrerunoutaketable(this);whsaleschecktoopen()"';
$displayhtml .= ' class="matwhsalesreceivedfrom orejot">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesdate">Date</label>';
$displayhtml .= '<input type="date" readonly class="matwhsalesdate orejot" id="matwhsalesdate"/>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesdate">Document/Description/Phone (optional)</label>';
$displayhtml .= '<input type="input" class="matwhsalesdate" id="matwhsalesdescription"/>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="split">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesreferenceno">Reference Number</label>';
$displayhtml .= '<input readonly';
$displayhtml .= ' type="number"';
$displayhtml .= ' class="matwhsalesreferenceno"';
$displayhtml .= 'id="matwhsalesreferenceno"';
$displayhtml .= ' />';
$displayhtml .= '</div>';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesreferenceno">Payment Method</label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="matwhsalespaymentmethod"';
$displayhtml .= ' class="matwhsalesreceivedfrom orejot">';
$displayhtml .= '<option></option>';
$displayhtml .= '<option>CASH</option>';
$displayhtml .= '<option>TRANSFER</option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="">';
$displayhtml .= '<div class="formcontrol">';
$displayhtml .= '<label for="matwhsalesreferenceno">Other Details</label>';
$displayhtml .= '<textarea';
$displayhtml .= ' class="matwhsalesotherdetail"';  
$displayhtml .= 'id="matwhsalesotherdetail"';
$displayhtml .= ' ></textarea>';
$displayhtml .= '</div>';;
$displayhtml .= '</div>';
$displayhtml .= '</form>';
$displayhtml .= '<div id="whsalessupplydata" class="hidden">';
$displayhtml .= '<div class="matgridholder" style="margin-top:50px">';
$displayhtml .= '<div class="takegridheader ">';
$displayhtml .= '<div class="grid1" style="width: 350px">ITEM</div>';
$displayhtml .= '<div class="grid2" style="width:125px">ITEM INFO</div>';
$displayhtml .= '<div class="grid3">PRICE(&#x20A6;)</div>';
$displayhtml .= '<div class="grid4">QUANTITY</div>';
$displayhtml .= '<div class="grid7">AMOUNT(&#x20A6;)</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="rowContainerwhsales">';
$displayhtml .= '<div class="outtakegridrow whsalesouttakegridrow" id="whsalesgridrow_0">
                    <input type="hidden" name="rowid" value="">
                    <div class="grid__item" style="width: 350px">
                    <p class="hidden">Item</p>
                        <select disabled name="whsalesselectitemout" onchange="matwhsalesselectitemout(this.id, this.value)" id="matwhsalesselectitem_0" class="orejot"  style="width: 350px">
                            <option value="" disabled selected >select item</option>
                        </select>
                    </div>
                    <div class="grid__item"  style="width:150px">
                        <p>Type: <span id="whsalestype_0"></span></p>
                        <p>Model: <span id="whsalesmodel_0"></span></p>
                        <p>Stock Balance: <span id="whsalesstockbalance_0"></span></p>
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Unit cost</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="itemalterout(this.id)" id="whsalesunitcost_0" name="whsalesunitcost" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Quantity</p>
                        <input type="number" onkeypress="itemalterout(this.id)" onchange="whsalesitemalterout(this.id)" id="whsalesquantity_0" name="whsalesquantity" class="orejot">
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Amount</p>
                        <input type="text" readonly id="whsalesvalue_0" name="whsalesvalue" disabled value="" class="orejot">
                    </div>
                    <div class="grid__item">
                        <button id="addnewrowbelow_0" onclick="addwhsalesrowout(this.id)" class="outtakeplusbtn"> + <span class="mattooltip"> Add new row </span> </button>
                    </div>
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '<div id="rowContainerwhsales2">';
$displayhtml .= '<div class="outtakegridrow" id="whsalesgridrow2_0">
                    <input type="hidden" name="rowid2" value="">
                    <div class="grid__item">
                    </div>
                    <div class="grid__item">
                    </div>
                    <div class="grid__item">
                    </div>
                    <div class="grid__item" style="display: flex;justify-content: flex-end;align-items: flex-end;font-size: 16px;">
                    Total Amount:
                    </div>
                    <div class="grid__item">
                    <p class="hidden">Amount</p>
                        <input id="whsalestotalamount" type="text" readonly value="" class="" style="visibility: hidden">
                        <div style="display:flex;margin-top: 19px;font-size: 14px;font-weight: bold">&#x20A6<p id="whsalestotalamountformat" style="font-size: 14px;font-weight: bold"></p></div>
                    </div>
                    <div class="grid__item" style="display: flex;justify-content: flex-end;align-items: flex-end;font-size: 16px;">
                    Total Amount Paid: &#x20A6;
                    </div>
                    <div class="grid__item flex">
                    <p class="hidden">Amount Paid</p>
                        <p id="" style="font-size: 14px;font-weight: bold;visibility: hidden">Total Amount Paid</p>
                        <input id="whsalestotalamountpaidformat" type="text" readonly onchange="this.nextElementSibling.value = this.value;this.value = formatCurrency(this.value);" value="" class="orejot" style="font-size: 14px;font-weight: bold">
                        <input id="whsalestotalamountpaid" type="number" readonly value="" class="hidden">
                    </div>
                    <div class="grid__item">
                    </div>
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="btns wrapbtn">';
$displayhtml .= '<button type="button" class="btnlarge btn mt" style="color: black; border: 1px solid white;cursor: pointer; margin-left: auto" onclick="resetPage()" id="">Reset</button>';
$displayhtml .= '<button type="button" class="btnlarge btn btnblue mt" style="cursor: pointer; margin-left: auto" id="matwhsalesbtnsubmit">Submit</button>';
$displayhtml .= '<button type="button" class="btnlarge btn btnblue mt hidden" style="cursor: pointer; margin-left: auto" onclick="generatwhsalesreceipt(salesresult, \'DOWNLOAD\')" id="matwhsalesbtndownload">Download&nbsp;Receipt</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div id="whsalesinvoicecontainer" class="hidden" style="display: none">
                       
                </div>';
$displayhtml .= '</div>';
$displayhtml .= '</div><datalist id="supplierwhsalesdata"></datalist><datalist id="supplierwhsalesdata2"></datalist>';
echo $displayhtml;
?>