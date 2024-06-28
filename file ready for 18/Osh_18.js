console.log("osh js ver 18")
// the following fields hidden, each field id has has a prefix text form-field-XXXXXX
// the fileds names are: OshSamur1,OahSnId,oshUserNameId,OshSamur2,OshSamur3

document.getElementById("totalinId").style.display="none"
document.getElementById("totaloutId").style.display="none"
document.getElementById("OshballanceId").style.display="none"
document.getElementById("OshloanreturnId").style.display="none"
document.getElementById("OshassetsavingsId").style.display="none"
document.getElementById("oshInFromrevenuesId").style.display="none"
document.getElementById("totalbalanceId").style.display="none"
document.getElementById("OshFormfooterId").style.display="none"

// hide osh form fields of ribit related
// OshRibitMinus1ID,OshribitMinusRamp1Id,OshRibitMinus2ID,OshribitMinusRamp2Id,OshRibitMinus3ID,OshribitMinusRamp3Id
function fShowHideOshRibitFields(bStatus){
    let ids = ['OshRibitMinus1ID', 'OshribitMinusRamp1Id', 'OshRibitMinus2ID', 'OshribitMinusRamp2Id', 'OshRibitMinus3ID', 'OshribitMinusRamp3Id'];
    //hide type id field
    ids.forEach(id => {
        let field = document.getElementById("form-field-"+id);
        let label = field.closest('.elementor-field-group').querySelector('label');

        if (field) {
            field.style.display = bStatus;
        }

        if (label) {
            label.style.display = bStatus;
        }
    });
}
fShowHideOshRibitFields("none")

document.getElementById('form-field-OshRibyotDetailId').addEventListener('change', function() {
    if (this.value === 'הצג') {
        fShowHideOshRibitFields("block");
    }
    else {
        fShowHideOshRibitFields("none");
    }
});

// List of field names
let fieldNames = ['OshSamur1', 'OahSnId', 'oshUserNameId', 'OshSamur2','OshSamur4','OshSamur5'];

// Loop over the field names
fieldNames.forEach(fieldName => {
    // Select the field by its ID
    let field = document.querySelector('#form-field-' + fieldName);

    // Hide the field
    if (field) {
        field.style.display = 'none';
    }
});

// document.getElementById("form-field-OshOutAvgField").addEventListener("mouseover", function() {
//     document.getElementById("tempp").innerText ="הוצאה חודשית כוללת ממוצעת - מומלץ לפחות 3 חודשים"
//     console.log("hover")
// });
// document.getElementById("form-field-OshOutAvgField").addEventListener("mouseout", function() {
//     document.getElementById("tempp").innerText = "כאן מוצגת עזרה לשדות הטופס, עמוד על השדה המבוקש והעזרה תוצג כאן"
//     console.log("out")
// });

// document.getElementById("SaveOshPropertiesButtonId").addEventListener("click", function(event){
//     event.preventDefault();
//     // Your code here
//   });

  function gReadFromDbAllOsh() {
    console.log("fd:","gReadFromDbAllOsh")
    console.log("in osh read")
	fSendCommandToBackEnd("","actionReadUserRecsOsh")
}

function fsetOshFormFieldsSteps()
{
    console.log("fd:","fsetOshFormFieldsSteps")
    document.getElementById("form-field-OshOutAvgField").step = 100
    document.getElementById("form-field-OshYitraId").step = 100
    
    document.getElementById("form-field-OshInAvgField").step = 100
    document.getElementById("form-field-OshRibitMinus1ID").step = 0.1
    document.getElementById("form-field-OshribitMinusRamp1Id").step = 100
    document.getElementById("form-field-OshRibitMinus2ID").step = 0.1
    document.getElementById("form-field-OshribitMinusRamp2Id").step = 100
    document.getElementById("form-field-OshRibitMinus3ID").step = 0.1
    document.getElementById("form-field-OshribitMinusRamp3Id").step = 100
    document.getElementById("form-field-OshrevenuePlusID").step = 0.1
}


function fSetOshPrpetiesToDefault(){
    console.log("fd:","fSetOshPrpetiesToDefault")
    console.log("in set default")
    document.getElementById("form-field-OshOutAvgField").value = 11000
    document.getElementById("form-field-OshYitraId").value =0
    
    // set dafault date as today to date controls  inthe form
	var currentDate = new Date();
	var lformattedDate = currentDate.toISOString().split('T')[0];
    // document.getElementById("form-field-OshnechonutDateId").value =lformattedDate
    document.getElementById("form-field-OshInAvgField").value =12000
    document.getElementById("form-field-OshRibitMinus1ID").value =0
    document.getElementById("form-field-OshribitMinusRamp1Id").value =0
    document.getElementById("form-field-OshribitMinusRamp1Id").step = 100
    document.getElementById("form-field-OshRibitMinus2ID").value =8
    document.getElementById("form-field-OshribitMinusRamp2Id").value =0
    document.getElementById("form-field-OshRibitMinus3ID").value =8
    document.getElementById("form-field-OshribitMinusRamp3Id").value =1000
    document.getElementById("form-field-OshrevenuePlusID").value =8

    fsetOshFormFieldsSteps()
}

// jQuery(document).ready(function($) {
//     $('#OshFormpropertiesId').on('submit_success', function(){
//         return false;
//     });
// });


gOshAreaCheckbobShowhideid=document.getElementById("CurrentStatusOshCheckBoxId")

gOshAreaCheckbobShowhideid.addEventListener("click", function() {
    
    console.log("fd:","gOshAreaCheckbobShowhideid")
	
	if( gOshAreaCheckbobShowhideid.src =="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/leftBlue.png")
		{
			console.log("1")
            gOshAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/Blue-Down.png"
			
			document.getElementById("OshFormId").style.display='block'
            fHandaleOsh(true)
           
		}
		
		else{
			gOshAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/leftBlue.png"
			document.getElementById("OshFormId").style.display='none'
            console.log("5")
		}
    

});




function fSetOshPrpeties(inArray){
    console.log("fd:","fSetOshPrpeties")
    
    console.log("in set properties",inArray,"data:",inArray[0].DBOshOutAvgField)
    document.getElementById("form-field-OshOutAvgField").value = inArray[0].DBOshOutAvgField

    document.getElementById("form-field-OshYitraId").value = inArray[0].DBOshYitraId
    // document.getElementById("form-field-OshnechonutDateId").value = inArray[0].DBOshnechonutDateId
    document.getElementById("form-field-OshInAvgField").value = inArray[0].DBOshInAvgField
    document.getElementById("form-field-OshRibitMinus1ID").value = inArray[0].DBOshRibitMinus1ID
    document.getElementById("form-field-OshribitMinusRamp1Id").value = inArray[0].DBOshribitMinusRamp1Id	

    document.getElementById("form-field-OshRibitMinus2ID").value = inArray[0].DBOshRibitMinus2ID
    document.getElementById("form-field-OshribitMinusRamp2Id").value = inArray[0].DBOshribitMinusRamp2Id	

    document.getElementById("form-field-OshRibitMinus3ID").value = inArray[0].DBOshRibitMinus3ID
    document.getElementById("form-field-OshribitMinusRamp3Id").value = inArray[0].DBOshribitMinusRamp3Id	
   
    document.getElementById("form-field-OshrevenuePlusID").value = inArray[0].DBOshrevenuePlusID
    document.getElementById("form-field-OshCommantsId").value = inArray[0].DBOshCommantsId

    fsetOshFormFieldsSteps()
    
}

function fCalcOshCashFlow(){
    console.log("fd:","fCalcOshCashFlow")
    var lOut = parseFloat(document.getElementById("form-field-OshOutAvgField").value);
    var lYitra = parseFloat(document.getElementById("form-field-OshYitraId").value);
    var lIn = parseFloat(document.getElementById("form-field-OshInAvgField").value);
    var lRevenuePlus = parseFloat(document.getElementById("form-field-OshrevenuePlusID").value) / 12 / 100; // yearly to monthly

    var lRamp1 = parseFloat(document.getElementById("form-field-OshribitMinusRamp1Id").value);
    var lRamp2 = parseFloat(document.getElementById("form-field-OshribitMinusRamp2Id").value);
    var lRamp3 = parseFloat(document.getElementById("form-field-OshribitMinusRamp3Id").value);

    var lRibitMinus1 = parseFloat(document.getElementById("form-field-OshRibitMinus1ID").value) / 12 / 100; // yearly to monthly
    var lRibitMinus2 = parseFloat(document.getElementById("form-field-OshRibitMinus2ID").value) / 12 / 100; // yearly to monthly
    var lRibitMinus3 = parseFloat(document.getElementById("form-field-OshRibitMinus3ID").value) / 12 / 100; // yearly to monthly

    var balance = lYitra;
    var cashFlows = [];
    var balances = [];

    for (var i = 0; i < gmaxmonth; i++) {
        var monthlyInflow = lIn;
        
        var cashFlow = monthlyInflow - lOut;

        if(   isNaN(gOshTotal[i]     )   ){
            gOshTotal[i]=0
        }
        cashFlow = cashFlow + gOshTotal[i]

        cashFlows.push(cashFlow);

    
        balance += cashFlow;
        // console.log("balance before:",balance,"gOshTotal[i]:",gOshTotal[i])
        if (balance > 0) {
            balance *= (1 + lRevenuePlus);
        }
        // console.log("balance before:",balance,"gOshTotal[i]:",gOshTotal[i])

        // Apply interest if balance is negative
        if (balance < 0) {
            // console.log("b<0","balance:",balance,"-ramp1:",-lRamp1,"-ramp2:",-lRamp2)
            if (  (balance <0 ) && (balance > -lRamp1)  ) {
                console.log("range1")
                balance *= (1 + lRibitMinus1);
            } else if ( (balance <-lRamp1 ) && (balance > -lRamp2)) {
                console.log("range2")
                balance *= (1 + lRibitMinus2);
            } else if ((balance <-lRamp2 ) && (balance > -lRamp3)) {
                console.log("range3")
                balance *= (1 + lRibitMinus3);
            }else if ((balance < -lRamp3)) {
                console.log("range4")
                balance *= (1 + lRibitMinus3);
            }
        }

        balances.push(balance);
        console.log("nan error:","i:",i,"balance:",balance,"gtotal:",gOshTotal[i],"casf:",cashFlow)      
    }
    // if there are nana due to the fact that simulation length greater then loans it cleras to 0
    // gfcleanNansWithZeros(balances)
    //copy balances list into into gOshRecordsSum list

   
    // console.log("Cash Flows:", cashFlows);
    // console.log("Balances:", balances,"gOshRecordsSum:",gOshRecordsSum,"cashFlows:",cashFlows);
    gPlotTotalOshAndLimit(balances,'יתרת חשבון בנק על פני זמן ','OshgraphInGridId')
    // barak
    gPlotTotalOshAndLimit(balances,'יתרת חשבון בנק על פני זמן ','testTotalOshChartId')
    

    
    // Find the minimum value in the balances list and its index
    var minBalance = Math.min(...balances);
    console.log("no graph change bug:",balances,"monhs:",gmaxmonth,"minbalance:",minBalance,"gOshTotal[i]:",gOshTotal.length)
    var minIndex = balances.indexOf(minBalance);
    minBalance = Math.round(minBalance);
    // Generate the x list
    var x = generateDateList(gmaxmonth);
    // Find the value in the x list at the minIndex
    var valueAtMinIndex = x[minIndex];
    let date = new Date(valueAtMinIndex);
    let month = date.getMonth() + 1; // getMonth() is zero-based
    let year = date.getFullYear();

    // Ensure month is 2-digits by padding with 0 if necessary
    month = month < 10 ? '0' + month : month;

    lDateString= `${month}-${year}`;


    if(minBalance>=0){
        var lText= lTextPositive}
    else{
        var lText= lTextNegative
    }
    var lTextNegative= ` יתרת העוש המינימלית היא  <span style="color: red;"> מינוס ${Math.abs(minBalance)}</span> בתאריך: ${lDateString} . המסגרת היא: ${lRamp3} `;
    var lTextPositive= `בתאריך: ${lDateString}  יתרת העוש המינימלית היא  <span style="color: green ;"> פלוס ${Math.abs(minBalance)} </span> . המסגרת היא: ${lRamp3} `;
    if(minBalance>=0){
        var lText= lTextPositive}
    else{
        var lText= lTextNegative
    }
    // var lText= "בתאריך:"+lDateString+ " יתרת העוש המינימלית היא: " + minBalance;
    gCopyChartAndaddTitleToReport("testTotalOshChartId","OshOverTimeReportId","OshSummery4StateId","OshSummeryOverTimeIdText",true,lText)
    

    document.getElementById('OshTotalInDisId').innerText = lIn;
    document.getElementById('OshTotalOutDisId').innerText = lOut;
    document.getElementById('OshBalanceDisId').innerText = lIn-lOut;
    document.getElementById('OshInFromRevenuesId').innerText=gAssetNadlanInvestTtypesOshEffect[0]
    document.getElementById('OshLoanDisId').innerText = (-1)*gAllLoansOshEffect[0];
    document.getElementById('OshAssetDisId').innerText =(-1)*gAssetHonTtypesOshEffect[0];
    document.getElementById('OshTotalAllDisId').innerText = lIn-lOut+gAllLoansOshEffect[0]+gAllAssetsOshEffect[0];

    // var lfactorWidth =1

    var trace10 = {
        x: ['הכנסות'], 
        y: [gAssetNadlanInvestTtypesOshEffect[0]], 
        name: 'הכנסות מנכסים', 
        type: 'bar',
        text: 'הכנסות מנכסים'+"<br>"+[gAssetNadlanInvestTtypesOshEffect[0]],
        textposition: 'auto',
        marker: {
            color: '#49b035' // change color to blue
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
      };
      
      var trace11 = {
        x: ['הכנסות'], 
        y: [lIn], 
        name: 'הכנסות שוטפות', 
        type: 'bar',
        text: 'הכנסות שוטפות'+"<br>"+[lIn],
        textposition: 'auto',
        marker: {
            color: '#71d95d' // change color to blue
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
        
      };
      
      var trace12 = {
        x: ['הוצאות'], 
        y: [lOut], 
        name: 'הוצאות שוטפות', 
        type: 'bar',
        text: 'הוצאות שוטפות'+"<br>"+[lOut],
        textposition: 'auto',
        marker: {
            color: '#eb5252' // change color to blue
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
      };
      
      if (isNaN(gAssetNadlanInvestTtypesOshEffect[0])) {
        linvestosheffect = 0; // or any other default value
        }
        else{
            linvestosheffect=gAssetNadlanInvestTtypesOshEffect[0]
        }
        if (isNaN(gAllLoansOshEffect[0])) {
            lloantosheffect = 0; // or any other default value
            }
            else{
                lloantosheffect=gAllLoansOshEffect[0]
            }
            if (isNaN(gAssetHonTtypesOshEffect[0])) {
                lassetosheffect = 0; // or any other default value
                }
                else{
                    lassetosheffect=gAssetHonTtypesOshEffect[0]
                }

       
      var data = [trace11,trace10, trace12];
      var maxYIn = Math.max(linvestosheffect+lIn);
      var maxYOut = Math.max(lOut,-lloantosheffect,-lassetosheffect);
      var maxY=Math.max(maxYIn,maxYOut);
      var layout = {
        barmode: 'relative',
        showlegend: false,
        title: ':יתרה ללא הוצאות על חובות וחסכונות'+'<br>' + (lIn-lOut+linvestosheffect),
        yaxis: {
            range: [0, maxY * 1.1] // add 10% padding at the top
        },
                   
      };
      
     var config = { displayModeBar: true };     
    //   Plotly.newPlot('OshBarGraphId', data, layout,config);


    var trace1 = {
        x: ['הכנסות'], 
        y: [gAssetNadlanInvestTtypesOshEffect[0]], 
        name: 'הכנסות מנכסים', 
        type: 'bar',
        width: 0.6,
        text: 'הכנסות מנכסים'+"<br>"+[gAssetNadlanInvestTtypesOshEffect[0]],
        textposition: 'auto',
        marker: {
            color: '#49b035' // change color to blue
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
      };
      
      var trace2 = {
        x: ['הכנסות'], 
        y: [lIn], 
        name: 'הכנסות שוטפות', 
        type: 'bar',
        width: 0.6,
        text: 'הכנסות שוטפות'+"<br>"+[lIn],
        textposition: 'auto',
        marker: {
            color: '#71d95d' // change color to blue
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
        
      };
      
      var trace3 = {
        x: ['הוצאות'], 
        y: [lOut], 
        name: 'הוצאות שוטפות', 
        type: 'bar',
        width: 0.6,
        text: 'הוצאות שוטפות'+"<br>"+[lOut],
        textposition: 'auto',
        marker: {
            color: '#eb5252' // change color to blue
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
      };
      var  lSumOfLoanAndSaveOsh=-gAllLoansOshEffect[0]   +   -gAssetHonTtypesOshEffect[0]
    //   console.log("xxx lSumOfLoanAndSaveOsh:",lSumOfLoanAndSaveOsh) 
    //   console.log("xxx gAllLoansOshEffect:",gAllLoansOshEffect) 
    //   console.log("xxx gAssetHonTtypesOshEffect:",gAssetHonTtypesOshEffect) 
      var trace4 = {
        x: ['הוצאות'], 
        y: [lSumOfLoanAndSaveOsh], 
        name: 'הוצאות החזר חוב וחיסכון', 
        type: 'bar',
        width: 0.6,
        // text: 'החזר חוב וחיסכון'+"<br>"+lSumOfLoanAndSaveOsh,
        text: 'החזר חוב וחיסכון'+ " " +lSumOfLoanAndSaveOsh,
        textposition: 'auto',
        marker: {
            // color: '#e37474' // change color to blue
            color: '#EAA586' // change color to blue
            
        },
        hovertemplate: '%{y}',
        // width: [lfactorWidth]
      };
      
    //   var trace5 = {
    //     x: ['הוצאות'], 
    //     y: [-gAssetHonTtypesOshEffect[0]], 
    //     name: 'הפקדה לחיסכון', 
    //     type: 'bar',
    //     text: 'הפקדה לחיסכון'+"<br>"+[-gAssetHonTtypesOshEffect[0]],
    //     textposition: 'auto',
    //     marker: {
    //         color: '#f52f2f' // change color to blue
    //         // color: 'blue' // change color to blue
    //     },
    //     hovertemplate: '%{y}',
    //     // width: [lfactorWidth]
    //   };
           

      if (isNaN(gAssetNadlanInvestTtypesOshEffect[0])) {
        linvestosheffect = 0; // or any other default value
        }
        else{
            linvestosheffect=gAssetNadlanInvestTtypesOshEffect[0]
        }
        if (isNaN(gAllLoansOshEffect[0])) {
            lloantosheffect = 0; // or any other default value
            }
            else{
                lloantosheffect=gAllLoansOshEffect[0]
            }
            if (isNaN(gAssetHonTtypesOshEffect[0])) {
                lassetosheffect = 0; // or any other default value
                }
                else{
                    lassetosheffect=gAssetHonTtypesOshEffect[0]
                }

      var data = [trace2, trace1, trace3, trace4];
      var maxYIn = Math.max(linvestosheffect+lIn);
      var maxYOut = Math.max(lOut,-lloantosheffect,-lassetosheffect);
      var maxY=Math.max(maxYIn,maxYOut);
     console.log("maxY:",maxY)
      if (isNaN(gAllLoansOshEffect[0])) {
        lloanosheffect = 0; // or any other default value
        }
        else{
            lloanosheffect=gAllLoansOshEffect[0]
        }

        if (isNaN(gAllAssetsOshEffect[0])) {
            lassetosheffect = 0; // or any other default value
            }
            else{
                lassetosheffect=gAllAssetsOshEffect[0]
            }

      var layout = {
        barmode: 'relative',
        showlegend: false,
        // title: ':יתרה כוללת הוצאות על חובות וחסכונות'+'<br>' + (lIn-lOut+lloanosheffect+lassetosheffect)+'<br>'+
        // ':יתרה ללא הוצאות על חובות וחסכונות'+'<br>' + (lIn-lOut+linvestosheffect),
        title:"מצב התזרים החודשי נכון להיום",
        xaxis: {
            fixedrange: true
          },
        yaxis: {
            range: [0, maxY * 1.5] ,// add 10% padding at the top
            fixedrange: true
        },
        // height: 300, // set the height of the chart to 600 pixels
        autosize: true,
        titlefont: {
            size: 26  // Set the font size
        }   
           
        
                   
      };
      var config = { displayModeBar: false,responsive: true };       
      Plotly.newPlot('OshSummeryId', data, layout,config);
      
    //   to report osh bars
      
      
    //   Plotly.newPlot('nowayitworksid', data, layout,config);
      


      fCalacSummeryOfOsh4StatesAndUpdateSummeryArea(lIn,lOut,gAssetNadlanInvestTtypesOshEffect[0],lSumOfLoanAndSaveOsh)
      gCopyChartAndaddTitleToReport('OshSummeryId',"OshBarCharReportId","OshSummery4StateId","OshSummery4StateIdText",false,"no")  
    
    
    // Select the widget by its CSS ID
    // var widget = document.getElementById('oshYitrawithId');
    // var lvalue = lIn-lOut+lloanosheffect+lassetosheffect;
   
    // widget.style.textAlign = 'right'; // or 'left', 'right', 'justify'
    // // Set the font size and weight
    // widget.style.fontSize = '18px';
    // widget.style.fontWeight = 'bold';
    // if((lvalue)>=0)
    //     {
    //         // Change the color
    //         widget.style.color = '#22d65e';
           
    //         var ltext = 'א: הפרש בין סך כל ההכנסות לסך כל ההוצאות הינו פלוס' + " " + lvalue; 
    //         widget.innerText = ltext;
    //     }
    //     else{
    //         // Change the color
    //         widget.style.color = 'red';
    //         var ltext ='א: הפרש בין סך כל ההכנסות לסך כל ההוצאות הינו מינוס' + " " + Math.abs(lvalue); 
    //         widget.innerText = ltext;
    //     }

    //  // Select the widget by its CSS ID
    // var widget = document.getElementById('oshYitrawithoutId');
    // var lvalue = lIn-lOut+linvestosheffect;
   
    // widget.style.textAlign = 'right'; // or 'left', 'right', 'justify'
    // // Set the font size and weight
    // widget.style.fontSize = '18px';
    // widget.style.fontWeight = 'bold';
    // if((lvalue)>=0)
    //     {
    //         // Change the color
    //         widget.style.color = '#22d65e';
           
    //         var ltext = 'ב: ההפרש ללא הוצאות על חובות וחסכונות הינו פלוס' + " " + lvalue; 
    //         widget.innerText = ltext;
    //     }
    //     else{
    //         // Change the color
    //         widget.style.color = 'red';
    //         var ltext = 'ב: ההפרש ללא הוצאות על חובות וחסכונות הינו מינוס' + " " + Math.abs(lvalue); 
    //         widget.innerText = ltext;
    //     }
    






     
   
      
    


}

document.getElementById("OshFormpropertiesId").addEventListener('change', function(){
	console.log("fd:","OshFormpropertiesId")
    // console.log("form change")
    fCalcOshCashFlow()
})


function fHandaleOsh(BoolReadDataFromGlobal){

    console.log("fd:","fHandaleOsh")
    console.log("in handle osh","length:",gOshRecordsList.length,gOshRecordsList)
    // console.log("array:",inArray,"length:",inArray.length)
    if (gOshRecordsList.length < 2) {
        console.log("no records")
        fSetOshPrpetiesToDefault()
        // gReadFromDbAllOsh()
    }
    else {
        console.log("records")
        if(BoolReadDataFromGlobal==true){
            fSetOshPrpeties(gOshRecordsList)
        }
    }

    fCalcOshCashFlow()
    gfcalcTotalOshAndplot()

}
document.getElementById("LoadOshFileCheckBoxId").addEventListener("click", function() {
   
    console.log("fd:","LoadOshFileCheckBoxId")
    lstatus=document.getElementById("LoadOshFileId").style.display
    console.log("status99:",lstatus)
    if(lstatus=="none"){
        document.getElementById("LoadOshFileId").style.display="block" 
        console.log("status99:",lstatus)

    }
    else{
        document.getElementById("LoadOshFileId").style.display="none"  
    }
});


function dateDiffInDays(date1, date2) {
    console.log("fd:","dateDiffInDays")
    var msPerDay = 1000 * 60 * 60 * 24;
    var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / msPerDay);
}

function fParseDiscontOshFile(workbook){
    console.log("fd:","fParseDiscontOshFile")
    // open relevat workseet
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    var jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}); // convert worksheet to JSON
    var rowNumber = 8; // replace with your actual row number
    var row = jsonData[rowNumber - 1]; 
    console.log("discont: row header",row, gDiscontBankHeadr)


    if( typeof(row) === 'undefined' )
        {
            alert("קובץ לא של עוש")
            return false
        }

    if( ! garraysEqual (gDiscontBankHeadr, row) ){
        alert("כותרת הקובץ לא תואמת את הקובץ המותר להעלאה") 
        return false
    }   



    // read dates into array
    const desiredColumn = 'A'; // Change this to your desired column letter
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    var dates=[]
    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const cellAddress = desiredColumn + (rowNum + 1); // Adjust row number for 1-based index
      const cell = worksheet[cellAddress];
        // part of the xlsx library in JavaScript. It's used to parse Excel date codes.
      if (cell && cell.t === 'n' && XLSX.SSF.parse_date_code(cell.v)) {
        const date = XLSX.SSF.parse_date_code(cell.v);
        const jsDate = new Date(date.y, date.m - 1, date.d);
        // console.log(`Row: ${rowNum + 1}, Date: ${jsDate}`);
        dates.push(jsDate)
        console.log("discont:",jsDate)
      }
    }


    // read incomes into array
    const desiredColumnIncomes = 'D'; 
    const rangeIncomes = XLSX.utils.decode_range(worksheet['!ref']);
    var incomesAndExpenses = [];
    for (let rowNum = rangeIncomes.s.r; rowNum <= rangeIncomes.e.r; rowNum++) {
      const cellAddress = desiredColumnIncomes + (rowNum + 1); // Adjust row number for 1-based index
      const cell = worksheet[cellAddress];
      if (cell && cell.t === 'n') {
        const incomeAndExpanseValue = cell.v;
        // console.log(`Row: ${rowNum + 1}, Income: ${income}`);
        incomesAndExpenses.push(incomeAndExpanseValue);
        console.log("discont:",incomeAndExpanseValue);
      }
    }

    var incomes = incomesAndExpenses.filter(function(value) {
        return value >= 0;
    });
    

    var expenses = incomesAndExpenses.filter(function(value) {
        return value < 0;
    }).map(function(value) {
        return Math.abs(value);
    });


    // calc how many months in file
    var firstDate = new Date(Math.min.apply(null, dates.map(date => new Date(date).getTime())));
    console.log("discont fd:",firstDate
    )
   var lastDate = new Date(Math.max.apply(null, dates.map(date => new Date(date).getTime())));
   console.log("discont ld:",lastDate
    )
    var months = (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + lastDate.getMonth() - firstDate.getMonth() + 1;
     console.log("discont mo:",months
    )
    
    //calc how many days in file        
    days=dateDiffInDays(firstDate, lastDate)
    console.log("discont num of days:",days)

    
    // calac total income and total expense
    var totalIncome = incomes.reduce((a, b) => Number(a) + Number(b), 0);
    var totalExpense = expenses.reduce((a, b) => Number(a) + Number(b), 0);
     console.log("discont totalIncome:",totalIncome
    )
      console.log("discont totalExpense:",totalExpense
    )
    
    // calc month average income and average expense
    var averageIncome = totalIncome / months;
    var averageExpense = totalExpense / months;

    
    return [averageIncome,averageExpense]
}

function fParsePoalimOshFile(workbook){
    console.log("fd:","fParsePoalimOshFile")
    // open relevat workseet
    var worksheet = workbook.Sheets[workbook.SheetNames[0]];

    var jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1}); // convert worksheet to JSON
    var lrowNumber =3; 
    var row = jsonData[lrowNumber - 1]; 
    console.log("poalim: row header",jsonData,row, gPoalimBankHeadr)


    if( typeof(row) === 'undefined' )
        {
            alert("קובץ לא של עוש")
            return false
        }

    if( ! garraysEqual (gPoalimBankHeadr, row) ){
        alert("כותרת הקובץ לא תואמת את הקובץ המותר להעלאה") 
        return false
    }  
        
    // read dates into array
    const desiredColumn = 'A'; // Change this to your desired column letter
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    var dates=[]
    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const cellAddress = desiredColumn + (rowNum + 1); // Adjust row number for 1-based index
      const cell = worksheet[cellAddress];
        // part of the xlsx library in JavaScript. It's used to parse Excel date codes.
      if (cell && cell.t === 'n' && XLSX.SSF.parse_date_code(cell.v)) {
        const date = XLSX.SSF.parse_date_code(cell.v);
        const jsDate = new Date(date.y, date.m - 1, date.d);
        // console.log(`Row: ${rowNum + 1}, Date: ${jsDate}`);
        dates.push(jsDate)
        console.log(jsDate)
      }
    }
     
    // read incomes into array
    const desiredColumnIncomes = 'F'; 
    const rangeIncomes = XLSX.utils.decode_range(worksheet['!ref']);
    var incomes = [];
    for (let rowNum = rangeIncomes.s.r; rowNum <= rangeIncomes.e.r; rowNum++) {
      const cellAddress = desiredColumnIncomes + (rowNum + 1); // Adjust row number for 1-based index
      const cell = worksheet[cellAddress];
      if (cell && cell.t === 'n') {
        const income = cell.v;
        // console.log(`Row: ${rowNum + 1}, Income: ${income}`);
        incomes.push(income);
        console.log(income);
      }
    }
                    
    // read expenses into array        
    const desiredColumnExpanses = 'E'; // Change this to your desired column letter
    const rangeExpensess = XLSX.utils.decode_range(worksheet['!ref']);
    var expenses = [];
    for (let rowNum = rangeExpensess.s.r; rowNum <= rangeExpensess.e.r; rowNum++) {
      const cellAddress = desiredColumnExpanses + (rowNum + 1); // Adjust row number for 1-based index
      const cell = worksheet[cellAddress];
    
      if (cell && cell.t === 'n') {
        const expense = cell.v;
        // console.log(`Row: ${rowNum + 1}, Income: ${income}`);
        expenses.push(expense);
        console.log(expense);
      }
    }
    
    // calc how many months in file
    var firstDate = new Date(Math.min.apply(null, dates.map(date => new Date(date).getTime())));
    console.log("fd:",firstDate
    )
   var lastDate = new Date(Math.max.apply(null, dates.map(date => new Date(date).getTime())));
   console.log("ld:",lastDate
    )
    var months = (lastDate.getFullYear() - firstDate.getFullYear()) * 12 + lastDate.getMonth() - firstDate.getMonth() + 1;
     console.log("mo:",months
    )
    
    //calc how many days in file        
    days=dateDiffInDays(firstDate, lastDate)
    console.log("num of days:",days)

    
    // calac total income and total expense
    var totalIncome = incomes.reduce((a, b) => Number(a) + Number(b), 0);
    var totalExpense = expenses.reduce((a, b) => Number(a) + Number(b), 0);
     console.log("totalIncome:",totalIncome
    )
      console.log("totalExpense:",totalExpense
    )
    
    // calc month average income and average expense
    var averageIncome = totalIncome / months;
    var averageExpense = totalExpense / months;

    
    return [averageIncome,averageExpense]

}

document.getElementById("LoadOshFileButtonId").addEventListener("click", function(event) {
    console.log("fd:","LoadOshFileButtonId")
    event.preventDefault();
    document.getElementById("OshexcelFileId").click();
});


document.getElementById('OshFormpropertiesId').addEventListener('change', function() {
    console.log("fd:","OshFormpropertiesId")
    document.getElementById('LoadOshFileId').style.display = 'none';
    document.getElementById("form-field-OshFIleNameLoadedId").value=""
});

document.getElementById('OshexcelFileId').addEventListener('change', function(evt) {
    console.log("fd:","OshexcelFileId")
    var file = evt.target.files[0];
    console.log("evt osh:",evt.target.files[0].name)
    // save file name becouse evt is chaned in the onload function later
    var lFname=evt.target.files[0].name
    var reader = new FileReader();
    var lBankReturnValue = []
    var lBollBankSupport = true
    reader.onload = function(e) {
        
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
        
        
        var lBankName = document.getElementById("form-field-OshSelectBankNameId").value
        console.log("bank name:",lBankName)

        if (lBankName === "פועלים") {
            lBankReturnValue = fParsePoalimOshFile(workbook);
            if(!lBankReturnValue){
             return
            }
        } else if (lBankName === "דיסקונט") {
            lBankReturnValue = fParseDiscontOshFile(workbook);
            if(!lBankReturnValue){
                return
               }
        } else {
            alert("בנק לא נתמך כרגע");
            lBollBankSupport = false
        }

        if(lBollBankSupport){
            console.log("Bank ret value:",lBankReturnValue)
            console.log("Bank ret value incomes:",lBankReturnValue[0])
            averageIncome = lBankReturnValue[0];
            console.log("Bank ret value incomes:",averageIncome)
            averageExpense = lBankReturnValue[1];
            // return [averageIncome,averageExpense]
    
            
            console.log(`Average monthly income: ${averageIncome}`);
            console.log(`Average monthly expense: ${averageExpense}`);
            
            // updat osh form fields
            document.getElementById("form-field-OshOutAvgField").value = Math.round(averageExpense)
            document.getElementById("form-field-OshInAvgField").value = Math.round(averageIncome)

            // document.getElementById("LoadOshFileId").style.display="none"
            document.getElementById("LoadOshFileCheckBoxId").checked = false;
            console.log("event name:",lFname)
            document.getElementById("form-field-OshFIleNameLoadedId").value=lFname                                                            
            
            // run function thta calc cash flow
            // fHandaleOsh(false)

        }
        // console.log("lPoalimReturnValue:",lPoalimReturnValue)
        // console.log("BarakaverageIncome:",lPoalimReturnValue[0])
        // averageIncome = lPoalimReturnValue[0];
        // averageExpense = lPoalimReturnValue[1];
        // // return [averageIncome,averageExpense]

        
        // console.log(`Average monthly income: ${averageIncome}`);
        // console.log(`Average monthly expense: ${averageExpense}`);
        
        // // updat osh form fields
        // document.getElementById("form-field-OshOutAvgField").value = Math.round(averageExpense)
        // document.getElementById("form-field-OshInAvgField").value = Math.round(averageIncome)
        
        // run function thta calc cash flow
        // fHandaleOsh(gOshRecordsList)
         

       
    };
    reader.readAsArrayBuffer(file);

    // Clear the file input to trigger change event if the same file is sellected again next time
    evt.target.value = null;
});

function fCalacSummeryOfOsh4StatesAndUpdateSummeryArea(lIn,lOut,lInFromNadlan,lOutOnSaveAndloan)
{
    console.log("fd:","fCalacSummeryOfOsh4StatesAndUpdateSummeryArea")
    if (isNaN(lIn) ) {
        lIn = 0; // or any other default value
    }

    if (isNaN(lOut)) {
        lOut = 0; // or any other default value
    }

    if (isNaN(lInFromNadlan)) {
        lInFromNadlan = 0; // or any other default value
    }

    if (isNaN(lOutOnSaveAndloan)) {
        lOutOnSaveAndloan = 0; // or any other default value
    }
    
    var lTotalIncome = lIn+lInFromNadlan;
    var lDifferentBetweenAllIncomToOut_Without_AssetAndSave = lTotalIncome-lOut;
    var lDifferentBetweenAllIncomToOut_With_AssetAndSave = lTotalIncome-lOut-lOutOnSaveAndloan;

    var widget = document.getElementById('OshSummery4StateId');
    widget.style.textAlign = 'right'; // or 'left', 'right', 'justify'
    // Set the font size and weight
    widget.style.fontSize = '18px';
    widget.style.fontWeight = 'bold';

    lmabatAl=document.getElementById("oshYitrawithId")  
    lmabatAl.style.textAlign = 'right'; // or 'left', 'right', 'justify'
    // Set the font size and weight
    lmabatAl.style.fontSize = '18px';
    lmabatAl.style.fontWeight = 'bold';  

    lTitle=document.getElementById("OshSummeytitleId")  
    lTitle.style.textAlign = 'right'; // or 'left', 'right', 'justify'
    // Set the font size and weight
    lTitle.style.fontSize = '18px';
    lTitle.style.fontWeight = 'bold'; 
    lTitle.style.color = 'blue'; 
    lTitle.innerHTML="סיכום מצב המוצג מטה מבוסס על נתוני העוש וכן על נתוני ההתחייבויות והנכסים, במידה ולא הוגדרו ההתחייבויות והנכסים אנא השלימו זאת במהרה"
    
    
    


    if(lDifferentBetweenAllIncomToOut_Without_AssetAndSave>=0 && lDifferentBetweenAllIncomToOut_With_AssetAndSave>=0)
        {
            // plus plus state 1
            widget.innerHTML = `מצבכם מצויין, גם לאחר שלוקחים בחשבון את ההוצאות על החזר התחייבויות וההפקדות לחיסכון בסך של   <span style="color: green;"> ${lOutOnSaveAndloan}</span>  שח, המאזן הכולל שלכם חיובי ועומד על  <span style="color: green;">${lDifferentBetweenAllIncomToOut_With_AssetAndSave}</span> ${"שח"}`;
            // widget.innerText = `מצבכם הכללי מצויין, גם לאחר שלוקחים בחשבון את ההוצאות על החזר התחייבויות וההפקדות לחיסכון בסך של  ${lOutOnSaveAndloan}  שח, המאזן הכולל שלכם חיובי ועומד על  <span style="color: red;">${lDifferentBetweenAllIncomToOut_With_AssetAndSave}</span> ${".שח "}`;
            widget.style.color = 'black';
            lmabatAl.innerHTML = widget.innerHTML;
            lmabatAl.style.color = 'black';
            document.getElementById('OshSummerySpacerId').style.backgroundColor = 'green';
            document.getElementById('OshSummeryDownSpacerId').style.backgroundColor = 'green';
        }
    if(lDifferentBetweenAllIncomToOut_Without_AssetAndSave>=0 && lDifferentBetweenAllIncomToOut_With_AssetAndSave<0)
        {
            // minus plus state2
            lstring="מצב טוב אך דרוש התערבות,בלי הוצאות על הלוואות וחסכונות יש לכם יתרה חיובית המאפשרת צמיחה,דרוש התאמת החזר חוב ותכנון חיסכון כך שהמאזן הכללי גם יהיה חיובי"
            // widget.innerHTML = `מצבכם טוב אך דרושה התערבות, מבלי שלוקחים בחשבון את הוצאות על החזר התחייבויות וההפקדות לחיסכון בסך של   <span style="color: black;"> ${lOutOnSaveAndloan}</span>  שח, יש לכם יתרה חיובית על סך   <span style="color: green;">${lDifferentBetweenAllIncomToOut_Without_AssetAndSave}</span> ${"המאפשרת צמיחה, דרוש צמצום של ההוצאה על החזר התחייבויות וההפקדות לחיסכון בסך של"} <span style="color: black;"> ${Math.abs(lDifferentBetweenAllIncomToOut_With_AssetAndSave)}</span> ${"שח"}`;
            widget.innerHTML = `מצבכם טוב אך דרושה התערבות,מבלי שלוקחים בחשבון את הוצאות על החזר התחייבויות וההפקדות לחיסכון בסך של<span style="color: black;"> ${lOutOnSaveAndloan}</span>  שח, יש לכם יתרה חיובית על סך   <span style="color: green;">${lDifferentBetweenAllIncomToOut_Without_AssetAndSave}</span> ${"המאפשרת צמיחה, דרוש צמצום של ההוצאה על החזר התחייבויות וההפקדות לחיסכון בסך של"} <span style="color: black;"> ${Math.abs(lDifferentBetweenAllIncomToOut_With_AssetAndSave)}</span> ${"שח"}`;
            widget.style.color = 'black';
            lmabatAl.innerHTML = widget.innerHTML;
            lmabatAl.style.color = 'black';
            document.getElementById('OshSummerySpacerId').style.backgroundColor = 'orange';
            document.getElementById('OshSummeryDownSpacerId').style.backgroundColor = 'orange';
        }
    if(lDifferentBetweenAllIncomToOut_Without_AssetAndSave<0 && lDifferentBetweenAllIncomToOut_With_AssetAndSave>=0)
        {
            widget.innerText = "ERROR"
        }
    if(lDifferentBetweenAllIncomToOut_Without_AssetAndSave<0 && lDifferentBetweenAllIncomToOut_With_AssetAndSave<0)
        {
            // minus plus state 4
              
            widget.innerHTML = `המצב דורש טיפול מהיר מכוון שגם ללא החזר חוב וההפקדות לחיסכון בסך של  <span style="color: black;">${lOutOnSaveAndloan}</span> שח, המאזן החודשי שלילי ועומד על יתרת חובה של  <span style="color: red;">${Math.abs(lDifferentBetweenAllIncomToOut_With_AssetAndSave)}</span>     ` ; 
            
            widget.style.color = 'black';
            lmabatAl.innerHTML = widget.innerHTML;
            lmabatAl.style.color = 'black';
            document.getElementById('OshSummerySpacerId').style.backgroundColor = 'red';
            document.getElementById('OshSummeryDownSpacerId').style.backgroundColor = 'red';
        }

      

       
    
}




