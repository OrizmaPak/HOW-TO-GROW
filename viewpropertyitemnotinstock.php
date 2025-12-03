<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> view property not in stock </h1>
    <div class="jpagecontent">
        <!--<form class="jform" id="viewpropertyitemnotinstockform">-->
        <!--    <div class="col-form-group"> -->
        <!--        <div class="jformgroup form_row" > -->
        <!--             <div class="jformgroup jformgroupcol ">-->
        <!--                <label class="jcontrollabel"> start date: </label>-->
        <!--                <input type="date"-->
        <!--                    class="jformcontrol jmargin-top" id="startdate" name="startdate">-->
        <!--            </div>-->
        <!--             <div class="jformgroup jformgroupcol jmargin-left">-->
        <!--                <label class="jcontrollabel"> end date: </label>-->
        <!--                <input type="date" class="jformcontrol jmargin-top" id="enddate" name="enddate">-->
        <!--            </div>-->
        <!--        </div>-->
        <!--        <div class="jflex jcontent-between no-pr" style="margin-top: 30px">-->
        <!--            <span class="jcontent-between">-->
        <!--                <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>-->
        <!--            </span>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</form>-->
         <div class="jtable-content">
            <table class="jmargin-top" id="">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th> t.date </th>
                        <th> Maturity date </th>
                        <th> account&nbsp;number </th>
                        <th> account&nbsp;name </th>
                        <th> item id </th>
                        <th> item name </th>
                        <th> property id </th>
                        <th> required stock </th>
                        <th> stock balance </th>
                    </tr>
                </thead>
                <tbody id="viewpropertyitemnotinstocktabledata"></tbody>
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
    <datalist id="accountofficerlist"></datalist>
</div>