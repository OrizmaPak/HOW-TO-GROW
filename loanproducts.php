<div class="jcontainer">
    <div>
        <h1 class="jpageheader"> loan product </h1>
    </div>
    <div class="jpagecontent">
        <div>
            <form class="jform" id="loanproductform">
                <div class="col-form-group">
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> product name: </label>
                        <input type="text" class="jformcontrol jmargin-top" id="loanproduct" name="loanproductname">
                    </div>
                </div>
                <div class="jformgroup jmargin-top"  style="justify-content:start">
                    <button type="button" class="j-action-btn"> submit</button>
                </div>
            </form>
            <div class="jtable-content" style="margin-top:50px">
                <table class="jmargin-top" id="loanproducttable">
                    <thead>
                        <tr>
                            <th>s/n </th>
                            <th> Product name</th>
                            <th> action </th>
                        </tr>
                    </thead>
                    <tbody id="jtabledata"></tbody>
                </table>
            </div>
            <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
                <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                <span class="jflex jpagination">
                    <button class="j-no-bg" type="button" id="jprev-button">previous</button>
                    <span id="pagination-numbers"></span>
                    <button  class="j-no-bg" type="button" id="jnext-button">next</button>
                </span>
            </div>
        </div>
    </div>
</div>