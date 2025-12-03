<div class="jcontainer">
    <div>
        <h1 class="jpageheader"> Collateral </h1>
    </div>
    <div class="jpagecontent">
        <div>
            <form class="jform" id="collateralform" >
                <div class="section-header">
                    <h1>Collateral details</h1>
                </div>
                <div class="col-form-group">
                    <div class="jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label class="jcontrollabel"> account number: </label>
                            <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> document title: </label>
                            <input class="jformcontrol jmargin-top" id="documenttitle" name="documenttitle">
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label class="jcontrollabel"> document ID: </label>
                            <input class="jformcontrol jmargin-top" id="documentid" name="documentid">
                        </div>
                    </div>
                    <div class="jformgroup">
                        <div class="file-area"></div>
                    </div>
                    <div class="jformgroup">
                        <div class="jformgroup jformgroupcol file-action">
                            <input type="file" placeholder="Enter title" class="jformcontrol jmargin-top hidden" id="document">
                            <div class="">
                                <p>click to add files</p>
                                <p style="text-transform: none;font-weight: 400;font-size: x-small;">.png | .jpeg | .jpg | .pdf | .docx </p>
                            </div>
                        </div>
                    </div>
                    <div class="jmargin-top flex jitems-right" style="display:flex;justify-content:end">
                        <button type="button" class="j-action-btn-alt jmargin-top"id="submit">upload</button>
                        <button type="button" class="j-action-btn-alt jmargin-top jmargin-left"id="resetbtn" style="background-color:red;">reset</button>
                    </div>
                </div>
            </form>
            
            <div class="jtable-content" >
                <div class="section-header" style="padding:50px 0 30px 0;border-bottom:1px solid lightgray">
                    <h1 style="text-transform:uppercase;font-size:13px">Collateral reports</h1>
                </div>
                
                <form id="filtercollateralform" style="margin: 30px 0;padding:10px;border-radius:5px;background-color: rgb(235, 237, 237)">
                     <div class="col-form-group">
                        <div class="jformgroup form_row">
                            <div class="jformgroup jformgroupcol">
                                <label class="jcontrollabel"> account number: </label>
                                <input type="number" class="jformcontrol jmargin-top" id="accountnumber" name="accountnumber">
                            </div>
                            <div class="jformgroup jmargin-left" style="display:flex;align-items:end">
                                <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> filter Report </button>&nbsp;
                            </div>
                        </div>
                    </div>
                </form>
                
                <table class="jmargin-top" id="collateralstable">
                    <thead>
                        <tr>
                            <th>s/n </th>
                            <th> account number </th>
                            <th> document id </th>
                            <th> document title </th>
                            <th> action </th>
                        </tr>
                    </thead>
                    <tbody id="jtabledata"></tbody>
                </table>
            </div>
            
            <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
                <span class="jcontrollabel" style="text-transform: none" id="pagination-status"></span>
                <span class="jflex jpagination">
                    <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
                    <span id="pagination-numbers"></span>
                    <button class="j-no-bg disabled" type="button" id="jnext-button" disabled="true">next</button>
                </span>
            </div>
            
        </div>
    </div>
</div>