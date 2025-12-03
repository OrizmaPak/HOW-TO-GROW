<?php
$displayhtml .= '<div class="jcontainer">';
$displayhtml .= '<div>';
$displayhtml .= '<h1 class="jpageheader"> approve loans </h1>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jpagecontent" id="jpagecontent">';
$displayhtml .= '<div>';
$displayhtml .= '';
$displayhtml .= '<!-- content here -->';
$displayhtml .= '';
$displayhtml .= '<div class="jmargin-top">';
$displayhtml .= '<div class="jtable-content">';
$displayhtml .= '<table class="jmargin-top" id="approveloanstable">';
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
// $displayhtml .= '<th> fees&nbsp;/&nbsp;charges </th>';
// $displayhtml .= '<th> location </th>';
$displayhtml .= '</tr>';
$displayhtml .= '</thead>';
$displayhtml .= '<tbody id="jtabledata"></tbody>';
$displayhtml .= '</table>';
$displayhtml .= '</div>';
$displayhtml .= '<div class="jflex jitems-left jmargin-top" style="margin-top:35px">';
$displayhtml .= '<div class="jflex jitems-left" style="width: 100%;">';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="width: 15%;text-transform: capitalize;background-color: rgb(34, 33, 33);"';
$displayhtml .= 'id="selectall-l">select all</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn" style="width: 15%;text-transform: capitalize; background-color: green"';
$displayhtml .= 'id="approve-l">approve</button>&nbsp;';
$displayhtml .= '<button type="button" class="j-action-btn"';
$displayhtml .= 'style="width: 15%;text-transform: capitalize;background-color: red;"';
$displayhtml .= 'id="decline-l">decline</button>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '
<div style="margin-top:25px" class="j-table-status jflex jcontent-between jmargin-top">
    <span class="jcontrollabel" style="text-transform: none;" id="pagination-status"></span>
    <span class="jflex jpagination">
        <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
        <span id="pagination-numbers"</span>
        <button class="j-no-bg" type="button" id="jnext-button">next</button>
    </span>
</div>
';
$displayhtml .= '</div>';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
$displayhtml .= '</div>';
echo $displayhtml;
?>