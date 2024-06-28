console.log("pension js ver 18")
//console.log("start pension.js")
var gAssetPensionFormIsAMonthlyPaymant = document.getElementById("form-field-IsAMonthlyPaymantPensionId");

var gAssetPensionHafkadaHodshit = document.getElementsByClassName("elementor-field-group-hafkadaHodshitPensionId")
var gAssetPensionEndHafkada = document.getElementsByClassName("elementor-field-group-endMonthPaymantPensionId")
var gAssetPensionMakorHafkada = document.getElementsByClassName("elementor-field-group-makorHafkataHodshitPensiaId")
var gAssetPensionFormMakorHafkada = document.getElementById("form-field-makorHafkataHodshitPensiaId");

AssetPensionForm = document.getElementById("AssetPensionFormID");

var gAssetPensionTypeUserInputFormButton=document.getElementById("assetPensionTypeUserInputFormButtonID")


gAssetPensionTypeUserInputFormButton.style.display = "none";//hide asset Hon Type User Input Form Button

gAssetPensionFormIsAMonthlyPaymant.addEventListener("click", function() {
    // Check if there are any options in the select element
    if (gAssetPensionFormIsAMonthlyPaymant.options.length > 0) {
        // Remove the first option (index 0) from the select element's options
        gAssetPensionFormIsAMonthlyPaymant.children[0].hidden="true"
    }
});
////////////////////////////////////////////////////////////////////////////////

// Add an event listener to the IsAMonthlyPaymant select and hide and show all nedded fields
gAssetPensionFormIsAMonthlyPaymant.addEventListener('change', function() {

    // Check the value of the select element
    if (gAssetPensionFormIsAMonthlyPaymant.value === "No") { // Change 'SomeValue' to the value you want to trigger the hiding
        gAssetPensionHafkadaHodshit[0].style.visibility = 'hidden';// Hide the element
        gAssetPensionEndHafkada[0].style.visibility = 'hidden';// Hide the element
        gAssetPensionMakorHafkada[0].style.visibility = 'hidden';// Hide the element
    } else {
    
        gAssetPensionHafkadaHodshit[0].style.visibility = 'visible';// Hide the element
        gAssetPensionEndHafkada[0].style.visibility = 'visible';// Hide the element
        gAssetPensionMakorHafkada[0].style.visibility = 'visible';// Hide the element
    }
});


//function fCalcAssetPensionRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue)
function fCalcAssetPensionRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,BituachPrecentage,NihulFromP1aymant,NihulFromTotal,GidulSachar)
{
	// console.log("new:",BituachPrecentage,NihulFromP1aymant,NihulFromTotal)
    var lpaymantnmonthfromStart=fCalcDateDiffInMonth(new Date(startValueDate),new Date(lEndOfMonthpaymantDate))
    if (isNaN(lpaymantnmonthfromStart)) {
        paymantnmonthfromcurrent = 0;
    }

    // var nazildinmonthfromcurrent=fCalcDateDiffInMonth(new Date(startValueDate),new Date(nezilutDate))
    // if (isNaN(nazildinmonthfromcurrent)) {
    //     nazildinmonthfromcurrent = 0;
    // }

    var lfromStartToCurrentInMonth=fCalcDateDiffInMonth(new Date(startValueDate),new Date())
    if (isNaN(lfromStartToCurrentInMonth)) {
        lfromStartToCurrentInMonth = 0;
    }
    // console.log("from start to current:",lfromStartToCurrentInMonth)

    var startd = new Date(startValueDate);
    var endd = new Date();lfromStartToCurrentInMonth
    endd.setFullYear(endd.getFullYear() + (gmaxmonth/12));
    // console.log("3:","s:",startd,"e:",endd)
    var numberOfMonth=fCalcDateDiffInMonth(startd,endd)

    var current_list=[]
    var current_list_nezilut=[]
    var paymants_list=[]
    var PrevTotal=0
    var total=0
    var TotalNazil=0
    var effectivRevenue=0
    var PamentVale=0
    var InitValue=0
    var MontlyGidulSachar=monthly

    //remove dmei nihul from total by substract  from revenue
    revenue=revenue-NihulFromTotal

    for (let j = 0; j < numberOfMonth; j++) {
                         MontlyGidulSachar = MontlyGidulSachar * (1+GidulSachar/12/100)
                         monthly=MontlyGidulSachar
                        //  console.log("GidulSachar",1+GidulSachar/12/100,"MontlyGidulSachar:",MontlyGidulSachar,"monthly:",monthly)

                        if (0==j)
                        {
                                InitValue=startvalue
                        }
                        else{
                                InitValue=0
                        }

                        if (j>=0 && (lIsMonthlypaymantBoolean==true) && (j < lpaymantnmonthfromStart) )
                            {
                                PamentVale=monthly
                                
                            }
                        else
                                {
                                PamentVale=0
                               
                                }
                        
                        

                        //remove dmei nihul from paymant
                        PamentValeAfterNihul=(1-NihulFromP1aymant/100)*PamentVale
                        //console.log("p after nihul:",PamentValeAfterNihul)

                        //remove insurance cost
                        PamentValeAfterNihulAndInsurance=(1-BituachPrecentage/100)*PamentValeAfterNihul
                        //console.log("p after nihul and bituach:",PamentValeAfterNihulAndInsurance)

                        paymants_list.push(Math.round(PamentVale))				
        
                        if(revenue != 0){
                            
                            // console.log("rreevvveennnuueee:",revenue)
                            //calc efective month revenue
                            effectivRevenue=(revenue/100+1)**(1/12)-1	
                            
                            

                        }
                        else{
                            effectivRevenue=0
                        }

                        //console.log("BEFORE:","revenue:",revenue,"Eff:",effectivRevenue,"startv:",InitValue,"prevtoal:",PrevTotal,"pamant:",PamentVale)
                        //Total=PrevTotal*(1+revenue/100/12)+StartValue+PamentVale
                        Total=PrevTotal*(1+effectivRevenue)+InitValue+PamentValeAfterNihulAndInsurance

                        
                        

                        PrevTotal=Total

                        TotalNazil=0


                        //console.log("prevtotal:",PrevTotal)
                        current_list.push(Math.round(Total))
                        //current_list.push((Total))
                        current_list_nezilut.push(Math.round(TotalNazil))
                        //console.log("AFTER:","revenue:",revenue,"Eff:",effectivRevenue,"startv:",InitValue,"prevtoal:",PrevTotal,"total:",Total,"pamant:",PamentVale)

                }
                // console.log("in function:",current_list,current_list_nezilut,paymants_list);
                
                //return only values from today till the end of simulation
                return [current_list.slice(lfromStartToCurrentInMonth),
                                current_list_nezilut.slice(lfromStartToCurrentInMonth),
                                paymants_list.slice(lfromStartToCurrentInMonth)];
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
function fCalcAssetPensionRecForPreview()	{
	// console.log("1")
	
	var current_list=[]
	var current_list_nezilut=[]
	var paymants_list=[]
	var startd = new Date();
	
	var startvalue = parseFloat(  document.getElementById("form-field-assetPensiaYitraId").value  )
	if (isNaN(startvalue)) {
  // Set myVariable to zero if it is NaN
  startvalue = 0;
	}
	
	var startValueDate=document.getElementById("form-field-YitraPensionRelevantDateId").value
	
	var lIsMonthlypaymant = document.getElementById("form-field-IsAMonthlyPaymantPensionId").value
	var lIsMonthlypaymantBoolean = false
	if(lIsMonthlypaymant =="Yes")
		{
			lIsMonthlypaymantBoolean = true
		}
	
	var monthly = parseFloat(document.getElementById("form-field-hafkadaHodshitPensionId").value)
	if (isNaN(monthly)) {
  // Set myVariable to zero if it is NaN
  monthly = 0;
	}
	
	var lEndOfMonthpaymantDate = document.getElementById("form-field-endMonthPaymantPensionId").value
	
	var revenue = parseFloat(document.getElementById("form-field-tzefiTsuaShnatiPensionId").value)
	if (isNaN(revenue)) {
        // Set myVariable to zero if it is NaN
        revenue = 0;
	}
		
	var BituachPrecentage= parseFloat(document.getElementById("form-field-AssetPensionBituachYearCostId").value)
	if (isNaN(BituachPrecentage)) {
        // Set myVariable to zero if it is NaN
        BituachPrecentage = 0;
	}

    var NihulFromPaymant= parseFloat(document.getElementById("form-field-AssetPensionDmeiNiulpaymantId").value)
	if (isNaN(BituachPrecentage)) {
        // Set myVariable to zero if it is NaN
        NihulGromPaymant = 0;
	}

    var NihulFromTotal= parseFloat(document.getElementById("form-field-AssetPensionDmeiNiulTotalId").value)
	if (isNaN(BituachPrecentage)) {
        // Set myVariable to zero if it is NaN
        NihulFromTotal = 0;
	}

    var GidulSachar= parseFloat(document.getElementById("form-field-AssetPensionGidulSachar").value)
	if (isNaN(GidulSachar)) {
        // Set myVariable to zero if it is NaN
        GidulSachar = 0;
	}



    //mode 1 - include dmei
    [current_list,current_list_nezilut,paymants_list] = fCalcAssetPensionRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,BituachPrecentage,NihulFromPaymant,NihulFromTotal,GidulSachar);
 	//[current_list,current_list_nezilut,paymants_list] = fCalcAssetPensionRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue);
	
    document.getElementById("AssetPensionKitzbaTzfuyaId").style.display = "block";
            
    nezilutDate = document.getElementById("form-field-taarichpensiaId").value
    var nazildinmonthfromcurrent=fCalcDateDiffInMonth(new Date(startValueDate),new Date(nezilutDate))
    if (isNaN(nazildinmonthfromcurrent)) {
        nazildinmonthfromcurrent = 0;
    }

    // get array value at kitzba date
    lValueAtRetirmant=current_list[nazildinmonthfromcurrent]
    lMekadem=document.getElementById("form-field-AssetPensionMekademId").value
    lMekademInt=parseInt(lMekadem)
    lKitba=Math.round(lValueAtRetirmant/lMekademInt)
    lString="קיצבה צפויה:"+lKitba.toString() + " שח "
    document.getElementById("AssetPensionKitzbaTzfuyaId").innerText =lString
    document.getElementById("AssetPensionKitzbaTzfuyaId").style.color = "blue";
    document.getElementById("AssetPensionKitzbaTzfuyaId").style.paddingRight = "50px";
    document.getElementById("AssetPensionKitzbaTzfuyaId").style.fontSize = "40px";
    
    
    // console.log("kitzba:",lKitba)
	
	// Create a new chart container element
	// 	console.log("current_list:",current_list)
	// 	console.log("current_list_nezilut:",current_list_nezilut)
	// 	console.log("paymants_list:",paymants_list)

	var data = [
		{
			y: current_list,
			x: generateDateList(gmaxmonth),
			type: 'scatter',
			mode: 'lines',
			name: 'ללא התחשבות בנזילות',
			line: {
				color: 'blue' // Set line color to blue
			}
		},
	];

	// Layout configuration for the line chart
	var layout = {
		plot_bgcolor: '#e8ebed', // Set the background color of the plot area
		paper_bgcolor: '#f5f5f5',
		border: {
			color: 'blue',  // Border color
			width: 10,        // Border width
			dash: 'solid'    // Border style (solid, dashed, dotted, etc.)
		},
		margin: {
			l: 80,  // left margin
			r: 50,  // right margin
			b: 70,  // bottom margin
			t: 90   // top margin
		},

		title: {
			//
            text: 'שווי נכס צפוי',
			font: {
				size: 18,   // Font size for the title
				family: 'Frank Ruhl Libre',  // Font family (optional)
				color: 'black',  // Font color (optional)
				weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
			},
            

           
		},

		xaxis: {
			// title: 'חודשים' // X-axis name
			type:'date',
			tickfont: {
				family: 'Georgia Pro Cond',
      	size: 14, // Set font size
     	 weight: 'bold' // Set font weight to bold
   		 },
			title: {
				text: 'תאריך',
				font: {
					size: 20,   // Font size for the title
					//family: 'Frank Ruhl Libre',  // Font family (optional)
					family: 'Georgia',
					color: 'black',  // Font color (optional)
					weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
				}
			}
		},

		yaxis: {
			tickfont: {
				family: 'Georgia Pro Cond',
      	size: 14, // Set font size
     	 weight: 'bold' // Set font weight to bold
   		 },
			title: {
				text: 'שווי בש"ח',
				font: {
					size: 20,   // Font size for the title
					//family: 'Frank Ruhl Libre',  // Font family (optional)
					family: 'Georgia',
					color: 'black',  // Font color (optional)
					weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
				}
			}
		},

		height: 500
	};


	// Plot the chart
	Plotly.newPlot('AssetHonFormPreviewgraphId', data, layout,{scrollZoom: true,responsive: true});
}


AssetPensionForm.addEventListener('change', function(){
	// console.log("pension form change")
	fCalcAssetPensionRecForPreview()
})

//hide first option from list of makorHafkataHodshitId when the select is clicked
gAssetPensionFormMakorHafkada.addEventListener("click", function() {
        // Check if there are any options in the select element
        if (gAssetPensionFormMakorHafkada.options.length > 0) {
            // console.log("makorChange in pensia if",gAssetPensionFormMakorHafkada)
            // Remove the first option (index 0) from the select element's options
            gAssetPensionFormMakorHafkada.children[0].hidden="true"
        }
    });