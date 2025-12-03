<div class="jcontainer">
    <h1 class="jpageheader">Collection Approval Settings (NET)</h1>
    <div class="jpagecontent" id="jpagecontent">
        <div>
            <form class="jform no-pr" id ="collectionapprovalsettingsnetform" style="margin-top: 15px;">
                <div class="col-form-group" >
                    <div class="jformgroup jformgroup form_row">
                        <div class="jformgroup jformgroupcol">
                            <label  class="jcontrollabel">Mode</label>
                            <select name="mode" id="mode" class="jformcontrol jmargin-top">
                                <option>NORMAL</option>
                                <option>ADJUSTED</option>
                            </select>
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Set Approval Date</label>
                           <input type="datetime-local" name="settingdate" id="date" class="jformcontrol jmargin-top" />
                        </div>
                        <div class="jformgroup jformgroupcol jmargin-left">
                            <label  class="jcontrollabel">Location</label>
                           <select name="location" id="location" class="jformcontrol jmargin-top">
                               <option value=""> -- Select Location -- </option>
                           </select>
                        </div>
                    </div>
                     <div class="jflex" style="margin: 30px 0;">
                        <button type="button" style="padding:10px; min-width: 15%; text-transform: capitalize" class="j-action-btn" id="collectionapprovalsettingsnetsubmit"> Submit </button>
                    </div>
                </div>
            </form>
            
              <div class="jtable-content">
                     <table class="jmargin-top" id="collectionapprovalsettingsnettable">
                         <thead>
                             <tr>
                                 <th> s/n </th>
                                 <th> mode </th>
                                 <th> setting date </th>
                                 <th> location </th>
                             </tr>
                         </thead>
                         <tbody id="collectionapprovalsettingsnettablecontent">
                            
                         </tbody>
                     </table>
                 </div>
            
        </div>
    </div>
</div>

