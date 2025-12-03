<?php session_start() ?>
<div class="jcontainer">
    <h1 class="jpageheader"> Supply Booklet </h1>
    <div class="jpagecontent">
        <form class="jform" id="supplybookletform">
            <div class="col-form-group"> 
                <div class="jformgroup form_row"> 
                   <!-- <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Location From: </label>
                        <select type="text" class="jformcontrol jmargin-top" id="locationfrom" name="locationfrom">
                        </select>
                    </div>-->
                    <div class="jformgroup jformgroupcol">
                        <label class="jcontrollabel"> Supply To: </label>
                        <select type="text" class="jformcontrol jmargin-top" id="locationto" name="locationto">
                        </select>
                    </div>
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Quantity: </label> 
                        <input  type="number"  class="jformcontrol jmargin-top" id="qty" name="qty">
                    </div> 
                    <!--<div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Qty Received: </label> 
                        <input  type="number"  class="jformcontrol jmargin-top" id="qtyin" name="qtyin">
                    </div> 
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Qty Supplied: </label> 
                        <input  type="number"  class="jformcontrol jmargin-top" id="qtyout" name="qtyout">
                    </div> -->
                    <div class="jformgroup jformgroupcol jmargin-left">
                        <label class="jcontrollabel"> Received By: </label>
                        <input type="text"  class="jformcontrol jmargin-top" id="receivedby" name="receivedby">
                    </div>
                </div>
                <div class="jflex jcontent-between no-pr" style="margin-top: 30px">
                    <span class="jcontent-between">
                        <button type="button" class="j-action-btn" style="padding:10px; text-transform: capitalize;width:inherit;" id="submit"> Submit </button>
                    </span>
                </div>
                </div>
            </div>
        </form>
         <div class="jtable-content">
            <table class="jmargin-top" id="supplybooklettable">
                <thead>
                    <tr>
                        <th>s/n </th>
                        <th>Supplied From</th>
                        <th>Supplied To</th>
                        <th> Quantity </th>
                        <th>Recieved By</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="jtabledata"></tbody>
            </table>
        </div>
        <div class="j-table-status jflex jcontent-between jmargin-top no-pr">
                <span class="jcontrollabel" style="text-transform: none" id="pagination-status"> </span>
                <span class="jflex jcontent-between">
                    <span>
                        <select id="pagination-limit" class="jmargin-left jformcontrol jmargin-right">
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="35">35</option>
                            <option value="40">40</option>
                            <option value="70">70</option>
                            <option value="100">100</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                            <option value="250">250</option>
                            <option value="500">500</option>
                            <option value="750">750</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                        </select>
                    </span>
                    <span class="jflex jpagination">
                        <button class="j-no-bg disabled" type="button" id="jprev-button" disabled="true">previous</button>
                        <span id="pagination-numbers"></span>
                        <button class="j-no-bg disabled" type="button" id="jnext-button" disabled="true">next</button>
                    </span>
                </span>
            </div>
    </div>
    <datalist id="accountofficerlist"></datalist>
</div>