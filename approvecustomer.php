<div class="jcontainer">
    <div>
        <h1 class="jpageheader"> Approve customers </h1>
    </div>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <!--<form class="jform no-pr" id="filterviewcustomers">-->
            <!--    <div class="col-form-group"> -->
            <!--        <div class="jformgroup form_row" > -->
            <!--             <div class="jformgroup jformgroupcol">-->
            <!--                <label class="jcontrollabel"> customer name </label>-->
            <!--                <input type="text"-->
            <!--                    class="jformcontrol jmargin-top" id="customername" name="customername" placeholder="Enter Customer Name">-->
            <!--            </div>-->
            <!--             <div class="jformgroup jformgroupcol jmargin-left">-->
            <!--                <label class="jcontrollabel"> start date: </label>-->
            <!--                <input type="date"-->
            <!--                    class="jformcontrol jmargin-top" id="startdate" name="startdate">-->
            <!--            </div>-->
            <!--             <div class="jformgroup jformgroupcol jmargin-left">-->
            <!--                <label class="jcontrollabel"> end date: </label>-->
            <!--                <input type="date"-->
            <!--                    class="jformcontrol jmargin-top" id="enddate" name="enddate">-->
            <!--            </div>-->
                        
            <!--        </div>-->
            <!--    </div>-->
            <!--</form>-->
            <!--<div class="jflex jcontent-between no-pr jmargin-top">-->
            <!--    <span class="jcontent-between">-->
            <!--        <button type="button" class="j-action-btn jborder"-->
            <!--            style="border-color: #007bff;text-transform:capitalize;" id="submit">Generate Report</button> &nbsp;-->
            <!--        <button type="button" class="j-action-btn jborder"-->
            <!--            style="border-color: #007bff;text-transform:capitalize;" id="pc-btn">print</button> &nbsp;    -->
            <!--        <button class="j-action-btn jborder"-->
            <!--            style="background-color: transparent;border-color: rgb(2, 77, 30);color: rgb(2, 77, 30);text-transform:capitalize;"-->
            <!--            id="ec-btn">export excel</button>-->
            <!--    </span>-->
            <!--</div>-->
            <div class="jmargin-top">
                <div class="jtable-content">
                    <table class="jmargin-top" id="viewcustomertable">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Last&nbsp;Name</th>
                                <th> First&nbsp;Name </th>
                                <th> Other&nbsp;Names&nbsp;</th>
                                <th> Phone&nbsp;Number </th>
                                <th> Home&nbsp;Address </th>
                                <th> Office&nbsp;Address </th>
                                <th> Gender </th>
                                <th> Occupation </th>
                                <th> State </th>
                                <th> Birthdate </th>
                                <th> Town </th>
                                <th> Lga </th>
                                <th> State&nbsp;of&nbsp;Residence </th>
                                <th> Lga&nbsp;of&nbsp;Residence </th>
                                <th> updated&nbsp;at </th>
                                <th class="no-pr"> image </th>
                                <th class="no-pr"> action </th>

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
                        <button class="j-no-bg" type="button" id="jnext-button">next</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>