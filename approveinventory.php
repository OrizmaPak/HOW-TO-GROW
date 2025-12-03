<?php
session_start();

$displayhtml .='<div class="formcontainer overflowcontainer" style="paddin-left: 20px; padding-right:20px">';
$displayhtml .='<div class="formheader" style="margin-bottom:100px">';
$displayhtml .='<h5>APPROVE INVENTORY</h5>';
$displayhtml .='</div>';

$displayhtml .= '<div id="viewglfulltableparant" class="jtable-content">
                    <table class="jmargin-top" id="approveinventorylistfulltable">
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
                                <th> OLD VALUES </th>
                                <th> Edited </th>
                                <th> Status </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody id="approveinventorylisttabledata"></tbody>
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
