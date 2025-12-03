<?php
session_start();

$displayhtml .= '<div class="orecontainer">';
$displayhtml .= '<div class="oresubcontianer">';
$displayhtml .= '<div class="oremainheadercontainer">';
$displayhtml .= '<p class="oremainheader">GENERAL LEDGER ACCOUNTS</p>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orecardcontainer">';
$displayhtml .= '<div class="oregenledacc">';
$displayhtml .= '<div class="oreblueheadd">';
$displayhtml .= '';
$displayhtml .= '<div style="max-width:200px;" class="inputcontainermn icsn">';
$displayhtml .= '<p class="normaltext white">Account Name:</p>';
$displayhtml .= '<input placeholder="Account No." onfocusout="checkInputwithdatalist(this.id, this.list.id);this.nextElementSibling.innerHTML = getLabelFromValue(this.value, this.list.id)" list="accountlistglaccountdata" id="gltranshisaccountnumber" type="text">';
$displayhtml .= '<p id="acc__name" style="color: white">-</p>';
$displayhtml .= '<input readonly type="text" style="background: none; border: none; outline: none;">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div style="max-width:200px;" class="inputcontainermn icsn">';
$displayhtml .= '<label for="stockledgreceivedfrom" class="normaltext white">Location </label>';
$displayhtml .= '<select class="orejot"';
$displayhtml .= ' type="text"';
$displayhtml .= ' id="gllocation"';
$displayhtml .= ' class="stockledgreceivedfrom ">';
$displayhtml .= '<option value=""></option>';
$displayhtml .= '</select>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div style="max-width:200px;" class="inputcontainermn icsn">';
$displayhtml .= '<p class="normaltext white">Start Date</p>';
$displayhtml .= '<input type="date" id="gltranshisstartdate">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div style="max-width:200px;" class="inputcontainermn icsn">';
$displayhtml .= '<p class="normaltext white">End Date</p>';
$displayhtml .= '<input type="date" id="gltranshisenddate">';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '<div class="orebluehead">';
$displayhtml .= '<div style="cursor: pointer" class="orebtnblluue" id="viewglhisviewer">View</div>';
$displayhtml .= '<div style="cursor: pointer" class="orebtnblluue" id="viewglhisprinter">Print</div>';
$displayhtml .= '<div style="cursor: pointer" class="orebtnblluue" id="viewglhisexporter">Export</div>';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jtable-content mtt" id="viewgltranstabledataparent">
                    <div id="reportdetails" style="padding: 20px; border: 1px solid #ddd; margin-bottom: 20px; background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        
                    </div> 
                    <table class="jmargin-top" id="dueloans" style="width: 100%; border-collapse: collapse;"> 
                        <thead>
                            <tr style="background-color: #f0f0f0; border-bottom: 2px solid #ddd;">
                                <th style="padding: 10px; text-align: left;">T.date</th>
                                <th style="padding: 10px; text-align: left;">Description</th>
                                <th style="padding: 10px; text-align: left;">Reference</th>
                                <th style="padding: 10px; text-align: left;">Debit</th>
                                <th style="padding: 10px; text-align: left;">Credit</th>
                                <th style="padding: 10px; text-align: left;">Balance</th>
                            </tr>
                        </thead>
                        <tbody id="viewgltranstabledata" style="background-color: #fff;">
                        </tbody>
                        <tfoot id="viewgltranstabledatafoot"></tfoot>
                    </table>
                </div>
                
                <div class="j-table-status jflex jcontent-between jmargin-top" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                    <span class="jcontrollabel" style="text-transform: none; font-size: 14px; color: #555;" id="pagination-status">Page 1 of 10</span>
                    <span class="jflex jpagination" style="display: flex; gap: 10px;">
                        <button class="j-no-bg" type="button" id="jprev-button" style="border: none; background-color: #f0f0f0; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Previous</button>
                        <span id="pagination-numbers" style="font-size: 14px; color: #555;"></span>
                        <button class="j-no-bg" type="button" id="jnext-button" style="border: none; background-color: #f0f0f0; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Next</button>
                    </span>
                </div>';

$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div><datalist id="accountlistglaccountdata">';
$displayhtml .= '<div id="viewgltranstabledataparent2" class="jtable-content mtt">
                    <table class="jmargin-top" id="dueloans">
                        <thead>
                            <tr>
                                <th> account number </th>
                                <th> credit total </th>
                                <th> debit total </th>
                                <th> description </th>
                                <th> payment method </th>
                                <th> reference </th>
                            </tr>
                        </thead>
                        <tbody id="viewgltranstabledata2"></tbody>
                    </table>
                </div>';

echo $displayhtml;
?>