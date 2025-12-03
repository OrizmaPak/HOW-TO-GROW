<?php
session_start();

$displayhtml .='<div class="formcontainer overflowcontainer">';
$displayhtml .='<div class="formheader">';
$displayhtml .='<h5>VIEW ARCHIVED INVENTORY LIST</h5>';
$displayhtml .='</div>';
$displayhtml .='<div class="formmain">';
$displayhtml .='<form action="" id="archiveinventoryform">';
$displayhtml .= '<div id="viewglfulltableparant" class="jtable-content">
                    <table class="jmargin-top" id="archiveinventoryfulltable">
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
                                <th> Last Updated </th>
                            </tr>
                        </thead>
                        <tbody id="archiveinventorytabledata"></tbody>
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
// $displayhtml .='<script src="js/itemregistration.js"></script>';

echo $displayhtml;
?>
