<?php
session_start();

$displayhtml .='<div class="formcontainer overflowcontainer">';
$displayhtml .='<div class="formheader">';
$displayhtml .='<h5>VIEW INVENTORY LIST</h5>';
$displayhtml .='</div>';
$displayhtml .='<div class="formmain">';
$displayhtml .='<form action="" id="viewinventorylistform">';

$displayhtml .='<div class="split3">';
$displayhtml .='<div class="formcontrol ">';
$displayhtml .='<label for="itemclass">Filter by Item Class</label>';
$displayhtml .='<select name="itemclass" id="itemclass" class="selectitem">';
$displayhtml .='<option  value="" disabled  >Select Item Class</option>';
$displayhtml .='<option  value="Consumable" selected>Consumable</option>';
$displayhtml .='<option  value="Non-Consumable">Non-Consumable</option>';
$displayhtml .='</select>';
$displayhtml .='</div>';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="savingselling">Filter by Item type</label>';
$displayhtml .='<input type="text" id="itemtype" name="itemtype" list="viewinventoryitemtypedatalist" class="savingselling">';
$displayhtml .='</div>';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="savingselling">Filter by Item Name</label>';
$displayhtml .='<input type="text" id="itemname" name="itemname" list="viewinventoryitemnamedatalist" class="savingselling">';
$displayhtml .='</div>';
$displayhtml .='</div>';

$displayhtml .='<div class="split3">';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="cashselling">filter by Status</label>';
$displayhtml .='<select name="status" id="status" class="selectitem">';
$displayhtml .='<option  value="" disabled  >-- Select status --</option>';
$displayhtml .='<option>ACTIVE</option>';
$displayhtml .='<option>DELETED</option>';
$displayhtml .='<option>ARCHIVED</option>';
$displayhtml .='</select>';
$displayhtml .='</div>';
$displayhtml .='<div class="formcontrol">';
$displayhtml .='<label for="marketingprice">Filter by Composite</label>';
$displayhtml .='<select name="composite" id="composite" class="selectitem">';
$displayhtml .='<option  value="" disabled  >-- Select option --</option>';
$displayhtml .='<option>NO</option>';
$displayhtml .='<option>YES</option>';
$displayhtml .='</select>';
$displayhtml .='</div><div class="btns btncenter"><button style="width: 100%;height: fit-content;margin-top: 29px" type="button" class="btnsizetwo btn btnblue " id="viewinventoryfetch">Fetch</button></div>';
$displayhtml .='</div>';

$displayhtml .='</form>';
$displayhtml .='</div>';

$displayhtml .= '<div id="viewglfulltableparant" class="jtable-content">
                    <table class="jmargin-top" id="viewinventorylistfulltable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Item Name &nbsp </th>
                                <th> Item Type &nbsp</th>
                                <th> Model </th>
                                <th> Cost </th>
                                <th>Saving Selling Price </th>
                                <th> Cash Selling price </th>
                                <th> Marketing Price </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody id="viewinventorylisttabledata"></tbody>
                    </table>
                </div>


                <div class="j-table-status jflex jcontent-between jmargin-top">
                    <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                    <span class="jflex jpagination"> 
                        <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                        <span id="pagination-numbers"></span>
                        <button  class="j-no-bg" type="button" id="jnext-button">next</button>
                    </span>
                </div>
';
$displayhtml .='<datalist id="viewinventoryitemnamedatalist"></datalist>';
$displayhtml .='<datalist id="viewinventoryitemtypedatalist"></datalist>';
// $displayhtml .='<script src="js/itemregistration.js"></script>';

echo $displayhtml;
?>
