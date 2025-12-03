<div id="forsupadmin" class="formcontainer overflowcontainer hidden">
    <div class="formheader">
        <h5>DASHBOARD</h5>
    </div>
    <div class="dashboardmain">
        <div class="dashboardcard">
            <div class="dashboardicon loans"><i class="fa-sharp fa-solid fa-scale-balanced iconsize"></i> </div>
            <div class="dashboardcontent">
                <h6 class="dashboardcardheader">LOANS</h6>
                <p class="dashboardcarddata"><span class="cardkey">Total</span> <span class="cardvalue">0</span></p>
                <p class="dashboardcarddata"><span class="cardkey">Active</span> <span class="cardvalue">0</span></p>
            </div>
        </div>

        <div id="cardsavings" class="dashboardcard">
            <div class="dashboardicon savings"><i class="fa-solid fa-landmark iconsize"></i></div>
            <div class="dashboardcontent ">
                <h6 class="dashboardcardheader">SAVINGS</h6>
                <p class="dashboardcarddata"><span class="cardkey">Total</span> <span id="msavings"class="cardvalue">0</span></p>
                <p class="dashboardcarddata"><span class="cardkey">Active</span> <span id="msavings2" class="cardvalue">0</span></p>
            </div>
        </div>

        <div id="cardconsumable" class="dashboardcard supadmin">
            <div class="dashboardicon consumable"><i class="fa-solid fa-database iconsize"></i></i></div>
            <div class="dashboardcontent">
                <h6 class="dashboardcardheader">INVENTORY CONSUMABLE</h6>
                <p class="dashboardcarddata"><span class="cardkey">Total</span> <span id="mconsumable" class="cardvalue">0</span></p>
                <p class="dashboardcarddata"><span class="cardkey">Active</span> <span id="mconsumable2" class="cardvalue">0</span></p>
            </div>
        </div>

        <div id="cardnonconsumable" class="dashboardcard supadmin">
            <div class="dashboardicon nonconsumable"><i class="fa-sharp fa-solid fa-server iconsize"></i></i></div>
            <div class="dashboardcontent">
                <h6 class="dashboardcardheader">INVENTORY NON-CONSUMABLE</h6>
                <p class="dashboardcarddata"><span class="cardkey">Total</span> <span id="mnonconsumable" class="cardvalue">0</span></p>
                <p class="dashboardcarddata"><span class="cardkey">Active</span> <span  id="mnonconsumable2" class="cardvalue">0</span></p>
            </div>
        </div>

        <div id="cardpropertyaccount" class="dashboardcard ">
            <div class="dashboardicon property"><i class="fa-sharp fa-solid fa-house iconsize"></i></div>
            <div class="dashboardcontent">
                <h6 class="dashboardcardheader">PROPERTY ACCOUNT</h6>
                <p class="dashboardcarddata"><span class="cardkey">Total</span> <span id="mPropertyAccounts" class="cardvalue">0</span></p>
                <p class="dashboardcarddata"><span class="cardkey">Active</span> <span id="mPropertyAccounts2" class="cardvalue">0</span></p>
            </div>
        </div>

        <div id="cardpersonnel" class="dashboardcard supadmin">
            <div class="dashboardicon personnel"><i class="fa-solid fa-users iconsize"></i></div>
            <div class="dashboardcontent">
                <h6 class="dashboardcardheader">PERSONNEL</h6>
                <p class="dashboardcarddata"><span class="cardkey">Total</span> <span id="mpersonnel" class="cardvalue">0</span></p>
                <p class="dashboardcarddata"><span class="cardkey">Active</span> <span id="mpersonnel2" class="cardvalue">0</span></p>
            </div>
        </div>
    </div>
    <div class="wholechartcontainer" style="padding: 0 50px">
        <div class="chart_panel hidden">
            <select name="" id="threedselectmonth">
                <option>FULL YEAR</option>
                <option>1ST HALF OF THE YEAR</option>
                <option>2ND HALF OF THE YEAR</option>
                <option>1ST QUARTER OF THE YEAR</option>
                <option>2ND QUARTER OF THE YEAR</option>
                <option>3RD QUARTER OF THE YEAR</option>
                <option>LAST QUARTER OF THE YEAR</option>
                </select>
            <select name="" id="threedselectyear">
                <option>2023</option>
                </select>
            <select name="" id="threedselectchart">
                <option value="line">LINE</option>
                <option value="bar">BAR</option>
                <option value="doughnut">DOUGHNUT</option>
                <option value="pie">PIE</option>
                <option value="polarArea">POLARAREA</option>
                <option value="radar">RADAR</option>
                </select>
            </div>

        <div class="chart_panel">
            <select name="" id="threedselectyear">
                <option>2027</option>
                <option>2026</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
            </select>
            <select name="" id="threedselectmonth">
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            <select name="" id="threedselectchart">
                <option value="line">LINE</option>
                <option value="bar">BAR</option>
                <option value="doughnut">DOUGHNUT</option>
                <option value="pie">PIE</option>
                <option value="polarArea">POLARAREA</option>
                <option value="radar">RADAR</option>
            </select>
        </div>
        <canvas style="max-height: 600px;" id="myChartone"></canvas>
        <div class="chart_panel hidden" style="display: none">
            <select name="" id="threedselectmonth2">
                <option>FULL YEAR</option>
                <option>1ST HALF OF THE YEAR</option>
                <option>2ND HALF OF THE YEAR</option>
                <option>1ST QUARTER OF THE YEAR</option>
                <option>2ND QUARTER OF THE YEAR</option>
                <option>3RD QUARTER OF THE YEAR</option>
                <option>LAST QUARTER OF THE YEAR</option>
            </select>
            <select name="" id="threedselectyear2">
                <option>2023</option>
            </select>
            <select name="" id="threedselectchart2">
                <option value="line">LINE</option>
                <option value="bar">BAR</option>
                <option value="doughnut">DOUGHNUT</option>
                <option value="pie">PIE</option>
                <option value="polarArea">POLARAREA</option>
                <option value="radar">RADAR</option>
            </select>
        </div>
        <canvas style="max-height: 600px; visibility: hidden" id="myCharttwo"></canvas>
    </div>
</div>

     <div id="forusers"  style="background: url(https://png.pngtree.com/thumb_back/fw800/background/20231006/pngtree-secure-online-banking-and-mobile-payment-illustration-of-money-transfer-deposit-image_13548646.png);
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-color: rgba(255, 255, 255, 0.65);
    align-items: center;
    display: flex;
    justify-content: center;
    background-blend-mode: overlay;
    background-size: cover;" class="formcontainer overflowcontainer">
         <div style="display:flex;flex-direction: column;gap:17px;align-items:center">
            <img src="../images/logohtg.png" alt="Welcome Image" id="welcome-img1"/>
            <img src="../images/welcome.png" alt="Welcome Image" id="welcome-img"/>
            <p>Welcome <span id="dashname"></span>! We are thrilled to have you here. Let's make your experience amazing!</p>
        </div>
    </div>
    
    <style>
        #forusers {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    /*max-width: 400px;*/
    width: 100%;
}

#welcome-img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
}
#welcome-img1 {
    max-width: 150px;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
}

#forusers p {
    font-size: 1.2em;
    color: #333;
    line-height: 1.6;
}
    </style>

<template id="template">
    <div id="cardpersonnel" class="dashboardcard">
        <div class="dashboardicon personnel"><i class="fa fa-suitcase iconsize"></i></div>
        <div class="dashboardcontent">
            <h6 class="dashboardcardheader">PERSONNEL</h6>
            <p class="dashboardcarddata">
                <span class="cardkey">Total</span> 
                <span class="cardvalue">0</span>
            </p>
            <p class="dashboardcarddata">
                <span class="cardkey">Active</span> 
                <span class="cardvalue">0</span>
            </p>
        </div>
    </div>
</template>