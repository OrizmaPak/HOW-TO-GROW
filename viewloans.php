<?php
$displayhtml .='<div class="jcontainer">';
$displayhtml .='<div>';
$displayhtml .='<h1 class="jpageheader"> loans </h1>';
$displayhtml .='</div>';
$displayhtml .='<div class="jpagecontent" id="jpagecontent">';
$displayhtml .='<div>';
$displayhtml .='
        <form class="jform no-pr" id="filterloansform" style="margin-bottom: 30px;padding:10px;border-radius:5px;background-color: rgb(235, 237, 237)">
            <div class="col-form-group"> 
                <div class="jformgroup form_row"> 
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Loan officer: </label>
                        <input list="officers" type="text" class="jformcontrol jmargin-top" id="loanofficer" name="loanofficer">
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Loan Status: </label> 
                        <select list="lstatus" type="text" class="jformcontrol jmargin-top" id="loanstatus" name="loanstatus">
                            <option value="NOT APPROVED">NOT APPROVED</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="PAID">PAID</option>
                        </select>
                    </div>
                    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report </button>&nbsp;
                    </div>
                </div>
            </div>
        </form>
';
$displayhtml .='<div class="jflex jcontent-between">';
$displayhtml .='<span class="jcontent-between no-pr">';
$displayhtml .='<button type="button" class="j-action-btn jborder" style="border-color: #007bff;text-transform:capitalize;" id="loan-print-action">print</button> &nbsp;';
$displayhtml .='<button class="j-action-btn jborder" style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;" id="export-list-excel">export excel</button>';
$displayhtml .='</span>';
$displayhtml .='<span>';
$displayhtml .='<span class="jformgroup jformgrouprow" id="loan-search-wrapper">';
$displayhtml .='<label class="jcontrollabel"> search: &nbsp;&nbsp; </label>';
$displayhtml .='<input type="search" placeholder="Type account number" id="filterviewloans" class="jformcontrol">';
$displayhtml .='</span>';
$displayhtml .='</span>';
$displayhtml .='</div>';
$displayhtml .='<div class="jmargin-top">';
$displayhtml .='<div class="jtable-content">';
$displayhtml .='<table class="jmargin-top" id="viewloanstable">';
$displayhtml .= '<thead>';
$displayhtml .= '<tr>';
$displayhtml .= '<th>s/n </th>';
$displayhtml .= '<th> account&nbsp;number </th>';
$displayhtml .= '<th> account&nbsp;name  </th>';
$displayhtml .= '<th> opening&nbsp;date </th>';
$displayhtml .= '<th> maturity&nbsp;date </th>';
$displayhtml .= '<th> loan&nbsp;type </th>';
$displayhtml .= '<th> loan&nbsp;duration </th>';
$displayhtml .= '<th> amount </th>';
$displayhtml .= '<th> interest&nbsp;rate </th>';
$displayhtml .= '<th> interest&nbsp;type </th>';
$displayhtml .= '<th> interest&nbsp;period </th>';
$displayhtml .= '<th> interest&nbsp;method </th>';
$displayhtml .= '<th> reference&nbsp;number </th>';
$displayhtml .= '<th> installment&nbsp;amount </th>';
$displayhtml .= '<th> loan&nbsp;officer </th>';
$displayhtml .='</tr>';
$displayhtml .='</thead>';
$displayhtml .='<tbody id="jtabledata"></tbody>';
$displayhtml .='</table>';
$displayhtml .='</div>';
$displayhtml .='<div class="j-table-status jflex jcontent-between jmargin-top">';
$displayhtml .='<span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>';
$displayhtml .='<span class="jflex jpagination">';
$displayhtml .='<button class="j-no-bg" type="button" id="jprev-button">previous</button>';
$displayhtml .='<span id="pagination-numbers"></span>';
$displayhtml .='<button  class="j-no-bg" type="button" id="jnext-button">next</button>';
$displayhtml .='</span>';
$displayhtml .='</div>';
$displayhtml .='</div>';
$displayhtml .='</div>';
$displayhtml .='</div>';
$displayhtml .='</div>';
echo $displayhtml;
?>