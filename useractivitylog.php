

<div class="formcontainer overflowcontainer">
<div class="formheader">
<h5>USER ACTIVITY LOG</h5>
</div>
<div class="formmain ">



<div class="formcontrol">
<label for="startdate">User Name</label>
<input list="allusers" type="text" name="startdate" id="userlogusers">
<datalist id="allusers">
</datalist>
</input>
</div>

<div style="display: flex" class="split">
    <div class="formcontrol">
        <label for="startdate">Start Date</label>
        <input type="date" name="startdate" id="userlogstartdate">
    </div>
    '
    <div class="formcontrol">
        <label for="enddate">End Date</label>
        <input type="date" name="enddate" id="userlogenddate">
    </div>
</div>

<div class="formcontrol">
<div class="wrapbtn btns ">
<button type="button" class="createbranchbtn btn btnmedium btnblue mb " id="matuserlogviewbtn">View</button>
<button onclick="printDiv('printabletalble')" type="button" class="createbranchbtn btn btnmedium btnblue mb " id="">Print</button>
</div>
</div>


</div>


<div class="useralscreen">
<p>User Activity</p>
<div id="useraldisplaycontent">


</div>


<div class="jmargin-top">
                <div id="printabletalble" class="jtable-content">
                    <table class="jmargin-top" id="">
                        <thead>
                            <tr>
                                <th>s/n </th>
                                <th> Description</th>
                                <th> Status </th>
                                <th> time</th>
                                <th> date</th>

                            </tr>
                        </thead>
                        <tbody id="useractivitylogtablecontent"></tbody>
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




