<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> Group System Cash Position  </h1>
    <div class="jpagecontent">
        <form class="jform" id="filtergroupsystemcashpositionform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row" > 
                     <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> date: </label>
                        <input type="date" class="jformcontrol jmargin-top" id="currentdate" name="currentdate">
                    </div>
                    <div class="jformgroup jmargin-left" style="display:flex;align-items:end ">
                        <button type="button" class="j-action-btn"  style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Generate Report </button>&nbsp;
                    </div>
                </div>
            </div>
        </form>
        <div class="jtable-content" style="margin-top:30px">
            <table class="jmargin-top" id="groupsystemcashpositiontable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> Group ID </th>
                        <th> Group Name </th>
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
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
    </div>
</div>