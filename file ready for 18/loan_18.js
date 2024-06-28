console.log("loan js ver 18")
gLoanForm=document.getElementById("LoanFormId")
document.getElementById("form-field-Shamur1").style.display="none"
document.getElementById("form-field-Shamur2").style.display="none"
document.getElementById("form-field-Shamur3").style.display="none"
document.getElementById("form-field-Shamur4").style.display="none"
document.getElementById("form-field-Shamur5").style.display="none"
document.getElementById("form-field-Shamur6").style.display="none"
document.getElementById("form-field-Shamur7").style.display="none"
document.getElementById("form-field-LoanSnId").style.display="none"
document.getElementById("form-field-LoanReturnTypeId").style.display="none"
document.getElementById("form-field-LoanUserNameId").style.display="none"
document.getElementById("form-field-loanGraceMonthNumId").style.display="none"
tmp=document.getElementById("form-field-loanGraceMonthNumId")
var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

document.getElementById("form-field-LoanMadaTzafiId").style.display="none"
tmp=document.getElementById("form-field-LoanMadaTzafiId")
var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

document.getElementById("form-field-LoanRibitChangeId").style.display="none"
tmp=document.getElementById("form-field-LoanRibitChangeId")
var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

document.getElementById("form-field-LoanRibitChangeNumOfMonthId").style.display="none"
tmp=document.getElementById("form-field-LoanRibitChangeNumOfMonthId")
var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}


gGraceSelectField=document.getElementById('form-field-LoanGraceYesNoId')
gGraceSelectField.addEventListener('change', function() {
    tmp=document.getElementById("form-field-loanGraceMonthNumId")
    mlabel = tmp.closest('.elementor-field-group').querySelector('label');

    if (gGraceSelectField.value === 'כן') {
        // document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'block';
        
        document.getElementById("form-field-loanGraceMonthNumId").style.display = 'block'; // Show element
       
        mlabel.style.display = 'block';
        // console.log("yes")


      } else {
        // document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'none';
        // console.log("no")
        document.getElementById("form-field-loanGraceMonthNumId").style.display = 'none'; // Hide element
        mlabel.style.display = 'none';
      }
});

gMadadSelectField=document.getElementById('form-field-LoanMadadYesNoId')
gMadadSelectField.addEventListener('change', function() {
    tmp=document.getElementById("form-field-LoanMadaTzafiId")
    mlabel = tmp.closest('.elementor-field-group').querySelector('label');

    if (gMadadSelectField.value === 'כן') {
        
        document.getElementById("form-field-LoanMadaTzafiId").style.display = 'block'; // Show element
       
        mlabel.style.display = 'block';


      } else {
        document.getElementById("form-field-LoanMadaTzafiId").style.display = 'none'; // Hide element
        mlabel.style.display = 'none';
      }
});
// Format amortization table as HTML table
function formatAmortizationTable(amortizationTable) {
    // let html = '<table>';
    // html += '<tr style="background-color: lightblue;"><th>החזר מספר</th><th>תאריך</th><th>החזר חודשי</th><th>על חשבון קרן</th><th>על חשבון ריבית</th><th>יתרה</th></tr>';
    // amortizationTable.forEach(entry => {
    //     html += `<tr><td>${entry.month}</td><td>${entry.date}</td><td>${entry.installment}</td><td>${entry.principal}</td><td>${entry.interest}</td><td>${entry.balance}</td></tr>`;
    // });
    // html += '</table>';
    // return html;


    // Create the table element
    let table = document.createElement('table');

    // Create the table header row
    let headerRow = table.insertRow();
    let headers = ['החזר מספר', 'תאריך', 'החזר חודשי', 'על חשבון קרן', 'על חשבון ריבית', 'יתרה'];
    headers.forEach(headerText => {
        let headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });
    // Apply light blue background color to header row
    headerRow.style.backgroundColor = 'lightblue';

    // Create table rows for each entry in the amortization table
    amortizationTable.forEach(entry => {
        let row = table.insertRow();
        Object.values(entry).forEach(value => {
            let cell = row.insertCell();
            cell.textContent = value;
        });
    });

    // Append the table to the document body or wherever you want to display it
    return (table);
}

function fLoanCalculateLoan(ribit, startValue, startValueDate, endValueDate, graceNumOfMonth, madadTzafuy, whenribitChange, ribitChange , bBalon) {
    // Convert dates to Date objects
    const startDate = new Date(startValueDate);
    const endDate = new Date(endValueDate);

    // Calculate number of months
    console.log("b startValueDate:",startValueDate,startDate)
    console.log("b endValueDate:",startValueDate,endDate)
    var monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
    console.log("monthsDiff:",monthsDiff,"max:",gmaxmonth)    
    // if (monthsDiff>gmaxmonth){
    //     monthsDiff=0
    //     console.log("month langth out of range")
    //     alert("תקופת ההלוואה לא תואמת את תקופת הסימולציה")
    // }
    var lfromStartToCurrentInMonth=fCalcDateDiffInMonth(new Date(startValueDate),new Date())
        if (isNaN(lfromStartToCurrentInMonth)) {
            lfromStartToCurrentInMonth = 0;
        }
    console.log("lfromStartToCurrentInMonth:",lfromStartToCurrentInMonth)
    // Calculate monthly inflation
    const monthlyInflation = madadTzafuy / 12 /100
    
    // Convert annual interest rate to monthly rate
    var monthlyInterest = ribit / 12;

    // Initialize variables
    let totalInterest = 0;
    let totalMonthly = 0;
    let totalPrinciple = 0;
    let installment = 0;
    let currentBalance = startValue;
    let amortizationTable = [];
    var monthlyPaymantsList=[]
    let MonthlycurrentBalanceList = []
    let prevCurrent=0

   
    if (bBalon==true)
    {
        let totalAmount = startValue;
        // Calculate loan
        for (let i = 0; i < monthsDiff; i++) {
            
            //if last iteration
            if (i==monthsDiff-1)
            {
                totalMonthly=parseInt(totalAmount.toFixed(0))+parseInt((totalAmount * monthlyInterest/100).toFixed(0))
                totalPrinciple=totalAmount
                monthlyPaymantsList.push(totalMonthly)
                MonthlycurrentBalanceList.push(totalAmount)
                amortizationTable.push({
                    month: i + 1,
                    date: new Date(startDate.getFullYear(), startDate.getMonth() + i, 1).toISOString().slice(0, 7),
                    installment:  totalMonthly,
                    principal:totalAmount.toFixed(0),
                    interest:(totalAmount * monthlyInterest/100).toFixed(0),
                    balance: totalAmount.toFixed(0)
                        
                });

            }else{
                monthlyPaymantsList.push(0)
                MonthlycurrentBalanceList.push(totalAmount)
                amortizationTable.push({
                    month: i + 1,
                    date: new Date(startDate.getFullYear(), startDate.getMonth() + i, 1).toISOString().slice(0, 7),
                    installment: 0,
                    principal: 0,
                    interest: 0,
                    balance: totalAmount.toFixed(0)
                        
                });
            }
            // Calculate interest for the month
            totalAmount = totalAmount *(1+monthlyInflation)
            console.log("from calc balon totalAmount with inflasion:",totalAmount)
                      
            const interest = totalAmount * monthlyInterest/100;
            console.log("from calc balon itrest:",interest)
            totalInterest=totalInterest+interest
            // Calculate inflation for the month
            // const inflation = totalAmount * monthlyInflation;
            // // Add interest and inflation to the total amount
           
            totalAmount = totalAmount + interest;
            console.log("from calc balon total+intrest:",totalAmount)
        }
    }
    else{
        console.log("from calc:",bBalon)
        // Loop through each month
        console.log("from calc monthsDiff:",monthsDiff)
        for (let i = 0; i < monthsDiff; i++) {
        
            // Apply inflation to installment
            currentBalance *= (1 + monthlyInflation);
            prevCurrent=currentBalance
            // Check if interest rate needs to be changed
            if ((whenribitChange-1) === i) {
                monthlyInterest += ribitChange/12;
            }

            // Calculate interest for this period
            const interest = currentBalance * (monthlyInterest /100);
            if (isNaN(interest)) {
                interest = 0;
            }

            // Calculate installment (principal + interest)
            if (i < graceNumOfMonth) {
                installment = interest; // Grace period
            } else {
                installment = currentBalance * (monthlyInterest / 100) / (1 - Math.pow(1 + (monthlyInterest / 100), -monthsDiff + i));
                if (isNaN(installment)) {
                    installment = startValue/monthsDiff;
                }
            }
            console.log("loan intrest:",monthlyInterest)
            

            var principal
            if (i < graceNumOfMonth) {
                principal = 0
                
            } else {
                principal = installment - interest;
                // Calculate new balance
                currentBalance -= principal;
            }
            
            // Calculate total interest
            totalInterest += interest;

            totalMonthly=totalMonthly+installment
            totalPrinciple=totalPrinciple+principal
            monthlyPaymantsList.push(installment.toFixed(0))
            MonthlycurrentBalanceList.push(currentBalance.toFixed(0))
            // Push data to amortization table
            amortizationTable.push({
                month: i + 1,
                date: new Date(startDate.getFullYear(), startDate.getMonth() + i, 1).toISOString().slice(0, 7),
                installment: installment.toFixed(0),
                principal: principal.toFixed(0),
                interest: interest.toFixed(0),
                balance: prevCurrent.toFixed(0)
                    
            });
        }

    }
    
    // Calculate return ratio
    const returnRatio = totalMonthly / startValue;
    monthlyPaymantsList=monthlyPaymantsList.slice(lfromStartToCurrentInMonth)
    MonthlycurrentBalanceList=MonthlycurrentBalanceList.slice(lfromStartToCurrentInMonth)
    return {
        amortizationTable: amortizationTable,
        totalInterest: totalInterest.toFixed(0),
        returnRatio: returnRatio.toFixed(2),
        totalMonthly : totalMonthly.toFixed(0),
        totalKeren : totalPrinciple.toFixed(0),
        monthlyPaymantsList,
        MonthlycurrentBalanceList

    };
}

document.getElementById("LoanInnerFormId").addEventListener('change', function(){
	// console.log("form change")
	fCalcLoanRecForPreview()
})


function fLoanCalcFromDbRecord(record)
{
    
    var bBalon=false
    var lReturType = record.ReturnType
    if (lReturType.includes("בלון")) 
       bBalon=true

    var ribit = parseFloat(record.YearRibit)
    if (isNaN(ribit)) {
    // Set myVariable to zero if it is NaN
        ribit = 0;
    }
    
    var startvalue = parseFloat( record.CurrentBallance )
    if (isNaN(startvalue)) {
    // Set myVariable to zero if it is NaN
        startvalue = 0;
    }
    
    var startValueDate=record.YitraRelevantDate
    var endValueDate=record.EndDate
    
    
    var lIsGrace = record.GraceYesNo

    if(lIsGrace =="כן")
		{
            var graceNumOfMonth = parseFloat(record.GraceNumMonth
                )
            if (isNaN(graceNumOfMonth)) {
            // Set myVariable to zero if it is NaN
                graceNumOfMonth = 0;
            }
		}
        else{
            graceNumOfMonth = 0;
        }

    var lIsMadad = record.MadadYesNo
    

    if(lIsMadad =="כן")
        {
            var madadTzafuy = parseFloat(record.MadadTzefi)
            if (isNaN(madadTzafuy)) {
            // Set myVariable to zero if it is NaN
                madadTzafuy = 0;
            }
        }else{
            madadTzafuy = 0;
        }

    var lIsRibitChange = record.RibitChangeYesNo
    

    if(lIsRibitChange =="כן")
        {
            var ribitChange = parseFloat(record.RibitChaneValue)
            if (isNaN(ribitChange)) {
            // Set myVariable to zero if it is NaN
                ribitChange = 0;
            }
            var whenribitChange = parseFloat(record.RibitChaneNumOfMonth
                )
            if (isNaN(whenribitChange)) {
            // Set myVariable to zero if it is NaN
                whenribitChange = 0;
            }
        }
        else{
            whenribitChange = 0;
            ribitChange = 0;
        }
    
        var result = fLoanCalculateLoan(ribit, startvalue, startValueDate, endValueDate, graceNumOfMonth, madadTzafuy, whenribitChange, ribitChange,bBalon)
        // result.returnRatio
       
        var lRatio=result.returnRatio
        if (isNaN(lRatio)) {
            lRatio = 0;
        }

        var lFristMonthly=result.monthlyPaymantsList[0]
        if (isNaN(lFristMonthly)) {
            lFristMonthly = 0;
        }

        var lMaxMonthly=Math.max(...result.monthlyPaymantsList)
        if (isNaN(lMaxMonthly)) {
            lMaxMonthly = 0;
        }

        


        return{
            ratio:lRatio,
            Monthly:lFristMonthly,
            MaxMonthly:lMaxMonthly,
            MonthBallance:result.MonthlycurrentBalanceList,
            MonthPaymant: result.monthlyPaymantsList
        }

    
    
    
    
    
    
     
}


function fCalcLoanRecForPreview()	{
console.log("start function fCalcLoanRecForPreview()")
	
	var current_list=[]
	var paymants_list=[]

    var bBalon=false

    var lReturType = document.getElementById("form-field-LoanReturnTypeId").value
    if (lReturType.includes("בלון")) {
        console.log("The string contains 'בלון'.");
        bBalon=true
       
        
        var selectElement = document.getElementById("form-field-LoanribitChanfeYesnoId")
        // Check if the select element exists
        if (selectElement) {
            // Apply styles to make it gray
            //selectElement.style.color = '#ccc'; // Change color to gray
            selectElement.style.backgroundColor = '#f2f2f2'; // Change background color to light gray

            // Disable the select element
            selectElement.disabled = true;
        }

        selectElement =  document.getElementById("form-field-LoanGraceYesNoId")
        // Check if the select element exists
        if (selectElement) {
            // Apply styles to make it gray
           // selectElement.style.color = '#ccc'; // Change color to gray
            selectElement.style.backgroundColor = '#f2f2f2'; // Change background color to light gray

            // Disable the select element
            selectElement.disabled = true;
        }
        
    } else {
        var selectElement = document.getElementById("form-field-LoanribitChanfeYesnoId")
        // Check if the select element exists
        if (selectElement) {
            // Apply styles to make it gray
           // selectElement.style.color = '#ffff'; // Change color to gray
            selectElement.style.backgroundColor = '#ffff'; // Change background color to light gray

            // Disable the select element
            selectElement.disabled = false;
        }

        selectElement =  document.getElementById("form-field-LoanGraceYesNoId")
        // Check if the select element exists
        if (selectElement) {
            // Apply styles to make it gray
            //selectElement.style.color = '#ffff'; // Change color to gray
            selectElement.style.backgroundColor = '#ffff'; // Change background color to light gray

            // Disable the select element
            selectElement.disabled = false;
        }
    }

    
    
    var ribit = parseFloat(document.getElementById("form-field-LoanRibitId").value)
	if (isNaN(ribit)) {
    // Set myVariable to zero if it is NaN
        ribit = 0;
    }
	
	var startvalue = parseFloat(  document.getElementById("form-field-LoanYitraId").value  )
	if (isNaN(startvalue)) {
  // Set myVariable to zero if it is NaN
        startvalue = 0;
	}
	
 	var startValueDate=document.getElementById("form-field-LoanYitraRelevantDateId").value
    var endValueDate=document.getElementById("form-field-LoanEndDateId").value
    
	
	var lIsGrace = document.getElementById("form-field-LoanGraceYesNoId").value
	
	if(lIsGrace =="כן")
		{
            var graceNumOfMonth = parseFloat(document.getElementById("form-field-loanGraceMonthNumId").value)
            if (isNaN(graceNumOfMonth)) {
            // Set myVariable to zero if it is NaN
                graceNumOfMonth = 0;
            }
		}
        else{
            graceNumOfMonth = 0;
        }

    var lIsMadad = document.getElementById("form-field-LoanMadadYesNoId").value
	
	if(lIsMadad =="כן")
		{
			var madadTzafuy = parseFloat(document.getElementById("form-field-LoanMadaTzafiId").value)
            if (isNaN(madadTzafuy)) {
            // Set myVariable to zero if it is NaN
                madadTzafuy = 0;
            }
		}else{
            madadTzafuy = 0;
        }

    

    var lIsRibitChange = document.getElementById("form-field-LoanribitChanfeYesnoId").value
	
	if(lIsRibitChange =="כן")
		{
            var ribitChange = parseFloat(document.getElementById("form-field-LoanRibitChangeId").value)
            if (isNaN(ribitChange)) {
            // Set myVariable to zero if it is NaN
             ribitChange = 0;
            }
            var whenribitChange = parseFloat(document.getElementById("form-field-LoanRibitChangeNumOfMonthId").value)
            if (isNaN(whenribitChange)) {
            // Set myVariable to zero if it is NaN
                whenribitChange = 0;
            }
		}
        else{
            whenribitChange = 0;
            ribitChange = 0;
        }
   
	
    console.log("parameters of loan:")
    console.log("ribit:",ribit)
    console.log("startvalue:",startvalue)
    console.log("startValueDate:",startValueDate)
    console.log("endValueDate:",endValueDate)
    console.log("graceNumOfMonth:",graceNumOfMonth)
    console.log("madadTzafuy:",madadTzafuy)
    console.log("ribitChange:",ribitChange)
    console.log("whenribitChange:",whenribitChange)

    var result = fLoanCalculateLoan(ribit, startvalue, startValueDate, endValueDate, graceNumOfMonth, madadTzafuy, whenribitChange, ribitChange,bBalon)
    const divElement = document.getElementById('LoanAmortizationTableId');
    // divElement.innerHTML = formatAmortizationTable(result.amortizationTable);
    
    // *******
    // const tableElement = document.createElement('table');
    // tableElement.innerHTML = formatAmortizationTable(result.amortizationTable);
    // **************
    tableElement = formatAmortizationTable(result.amortizationTable);
    // tableElement.classList.add('scroll-table');
    // Apply CSS to the container to add scroll
//     divElement.style.overflowX = "auto";
//     divElement.style.maxWidth = "100%";
      divElement.style.overflowY = "auto";
        divElement.style.maxHeight = "50px";
//     divElement.style.overflowY = "auto";
    while (divElement.firstChild) {
        divElement.removeChild(divElement.firstChild);
    }
    divElement.appendChild(tableElement);
    console.log(result)
    // gPlotValuesOverTime(result.monthlyPaymantsList,'החזר חודשי','LoanBarChartPreviewId')
    // gPlotValuesOverTime(result.MonthlycurrentBalanceList,'יתרת הלוואה','LoanBarChartPreviewId2')
    // Sample data
    // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    // var monthValues = [100, 150, 200, 250, 300, 350]; // Sample month data
    // var balanceValues = [2000, 2100, 2200, 2300, 2400, 2500]; // Sample balance data

    // Create traces
    var trace1 = {
        x:  generateDateList(gmaxmonth),
        y: result.MonthlycurrentBalanceList,
        name: ' יתרה',
        type: 'bar',
        yaxis: 'y1'
    };

    var trace2 = {
        x: generateDateList(gmaxmonth),
      
        y: result.monthlyPaymantsList,
        name: 'חודשי',
        type: 'scatter',
        yaxis: 'y2'
    };

    var data = [trace1, trace2];

    // Define layout
    var layout = {
        // title: 'החזר חודשי ויתרת הלוואה על פני זמן',
        legend: {
            x: 1,  // Adjust the x position of the legend
            y: 1.2  // Adjust the y position of the legend
            // Other attributes like 'xanchor', 'yanchor', 'orientation', etc. can also be used
          },
        yaxis: {
            title: ' יתרה',
            side: 'left'
        },
        yaxis2: {
            title: 'החזר חודשי',
            overlaying: 'y',
            side: 'right'
        },
        xaxis: {
            title: 'תאריך',
            side: 'midle'
        },
        height: 450,
    };

    // Plot the chart
    temp=result.monthlyPaymantsList
    
     if(temp.length>1){
        // Plotly.newPlot('LoanBarChartPreviewId', data, layout);
    }
    else{
        var parentDiv=document.getElementById("LoanBarChartPreviewId")
        // console.log("tables clear:",parentDiv)
        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }
    }
     
     
    
    // Create a table for loan summery element

    // var parentDiv = document.getElementById('LoanSummeryTableId');






    // var table = document.createElement('table');
    // // Create a table header row
    // var headerRow = document.createElement('tr');
    // // Array of header names
    // var headerNames = ["יחס החזר לשקל","סך החזר ריבית", "סך החזר כולל","תשלום חודשי מירבי","תשלום חודשי ראשון"," סך החזר קרן"];
    // // Loop through the header names array to create table headers
    // headerNames.forEach(function(headerName) {
    //     var th = document.createElement('th');
    //     th.textContent = headerName;
    //     headerRow.appendChild(th);
    // });
    // // Append the header row to the table
    // table.appendChild(headerRow);
    // var rowValues = [result.returnRatio,result.totalInterest, result.totalMonthly, Math.max(...result.monthlyPaymantsList), result.monthlyPaymantsList[0],result.totalKeren];
    // // Create a table row for the values
    // var valueRow = document.createElement('tr');
    // // Loop through the row values array to create table cells
    // rowValues.forEach(function(value) {
    //     var td = document.createElement('td');
    //     td.textContent = value;
    //     valueRow.appendChild(td);
    // });
    // // Append the value row to the table
    // table.appendChild(valueRow);

    lRatio=result.returnRatio
    if (isNaN(lRatio)) {
        lRatio = 0;
    }

    lTotal=result.totalMonthly
    if (isNaN(lTotal)) {
        lTotal = 0;
    }

    lTotalIntrest=result.totalInterest
    if (isNaN(lTotalIntrest)) {
        lTotalIntrest = 0;
    }

    lTotalKeren=result.totalKeren
    if (isNaN(lTotalKeren)) {
        lTotalKeren = 0;
    }

    lFristMonthly=result.monthlyPaymantsList[0]
    if (isNaN(lFristMonthly)) {
        lFristMonthly = 0;
    }

    lMaxMonthly=Math.max(...result.monthlyPaymantsList)
    if (isNaN(lMaxMonthly)) {
        lMaxMonthly = 0;
    }

    document.getElementById("loanCalculateReturnValueId").children[0].children[0].innerHTML=lRatio
    document.getElementById("loanCalculateTotalId").children[0].children[0].innerHTML=lTotal
    document.getElementById("loanCalculateTotalRibitId").children[0].children[0].innerHTML=lTotalIntrest
    document.getElementById("loanCalculateTotalKerenId").children[0].children[0].innerHTML=lTotalKeren
    document.getElementById("loanCalculateMonthlyId").children[0].children[0].innerHTML=lFristMonthly
    document.getElementById("loanCalculateMonthlyMaxId").children[0].children[0].innerHTML=lMaxMonthly
    
     
    
    // while (parentDiv.firstChild) {
    //     parentDiv.removeChild(parentDiv.firstChild);
    // }
    // Append the table to the parent div
    //  parentDiv.appendChild(table);
// 	var monthly = parseFloat(document.getElementById("form-field-hafkadaHodshitId").value)
// 	if (isNaN(monthly)) {
//   // Set myVariable to zero if it is NaN
//   monthly = 0;
// 	}
	
// 	var lEndOfMonthpaymantDate = document.getElementById("form-field-endMonthPaymantId").value
	

		
// 	var nazild = document.getElementById("form-field-taarichNezilutId").value;
	
//  	[current_list,current_list_nezilut,paymants_list] = fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild);

}

gRibityesNoSelectField=document.getElementById('form-field-LoanribitChanfeYesnoId')
gRibityesNoSelectField.addEventListener('change', function() {
    tmp=document.getElementById("form-field-LoanRibitChangeId")
    tmp1=document.getElementById("form-field-LoanRibitChangeNumOfMonthId")
    mlabel = tmp.closest('.elementor-field-group').querySelector('label');
    mlabel1 = tmp1.closest('.elementor-field-group').querySelector('label');

    if (gRibityesNoSelectField.value === 'כן') {
        
        document.getElementById("form-field-LoanRibitChangeId").style.display = 'block'; // Show element
        document.getElementById("form-field-LoanRibitChangeNumOfMonthId").style.display = 'block'; // Show element
       
        mlabel.style.display = 'block';
        mlabel1.style.display = 'block';


      } else {
        document.getElementById("form-field-LoanRibitChangeId").style.display = 'none'; // Hide element
        document.getElementById("form-field-LoanRibitChangeNumOfMonthId").style.display = 'none'; // Show element
        mlabel.style.display = 'none';
        mlabel1.style.display = 'none';
      }
});




gcancelLoanBtn=document.getElementById("cancelFormLoanid")
gcancelLoanBtn.addEventListener('click', function() {
    document.getElementById("masterofAllLoanDivId").style.display='block'
    document.getElementById("LoanFormId").style.display="none"
  })



var gselectLoanSaveBtn = document.getElementById('selectLoanSaveBtn');//get id of the ok button of the form that user sellect an asset to add
gselectLoanSaveBtn.addEventListener('click', function(event) {
		
    event.preventDefault();
    gState="new_loan"
    console.log("state:",gState,"select:",document.getElementById("form-field-LoanSelectTypeId").value)

    // set header  label of the form
    document.getElementById("LoanFormHeaderId").children[0].children[0].innerHTML="הלוואה עם החזר מסוג: " + document.getElementById("form-field-LoanSelectTypeId").value
   
       
    //set the description of the record to be as the user selected
    document.getElementById("form-field-LoanDescriptionId").value=document.getElementById("form-field-LoanSelectTypeId").value

    // set default values
    document.getElementById("form-field-LoanSnId").value=gGetCurrentTimeAsnumberString()
    document.getElementById("form-field-LoanReturnTypeId").value=document.getElementById("form-field-LoanSelectTypeId").value
    document.getElementById("form-field-LoanReturnTypeId").style.display="none"
    document.getElementById("form-field-LoanRibitId").value=0
    document.getElementById("form-field-LoanmakorHafkataHodshitId").value="חשבון עובר ושב"
    document.getElementById("form-field-LoanYitraId").value=0

    document.getElementById("form-field-LoanGraceYesNoId").value="לא"
    document.getElementById("form-field-loanGraceMonthNumId").value=0
    tmp=document.getElementById("form-field-loanGraceMonthNumId")
    mlabel = tmp.closest('.elementor-field-group').querySelector('label');
    tmp.style.display = 'none';
    mlabel.style.display = 'none';



    document.getElementById("form-field-LoanMadadYesNoId").value="לא"
    document.getElementById("form-field-LoanMadaTzafiId").value=0
    tmp=document.getElementById("form-field-LoanMadaTzafiId")
    mlabel = tmp.closest('.elementor-field-group').querySelector('label');
    tmp.style.display = 'none';
    mlabel.style.display = 'none';


    document.getElementById("form-field-LoanribitChanfeYesnoId").value="לא"
    document.getElementById("form-field-LoanRibitChangeId").value=0
    document.getElementById("form-field-LoanRibitChangeNumOfMonthId").value=0
    tmp=document.getElementById("form-field-LoanRibitChangeId")
    mlabel = tmp.closest('.elementor-field-group').querySelector('label');
    tmp1=document.getElementById("form-field-LoanRibitChangeNumOfMonthId")
    mlabel1 = tmp1.closest('.elementor-field-group').querySelector('label');
    tmp.style.display = 'none';
    mlabel.style.display = 'none';
    tmp1.style.display = 'none';
    mlabel1.style.display = 'none';



    
    var currentDate = new Date();
	var lformattedDate = currentDate.toISOString().split('T')[0];
    document.getElementById("form-field-LoanYitraRelevantDateId").value=lformattedDate
    document.getElementById("form-field-LoanEndDateId").value=lformattedDate
    document.getElementById("masterofAllLoanDivId").style.display='none'
    document.getElementById("LoanFormId").style.display="block"


    // set step size for controlers in the form
	document.getElementById("form-field-LoanYitraId").step = 1000
	document.getElementById("form-field-loanGraceMonthNumId").step = 1
	document.getElementById("form-field-LoanRibitId").step = 0.1
    document.getElementById("form-field-LoanMadaTzafiId").step = 0.1
    document.getElementById("form-field-LoanRibitChangeId").step = 0.1
    document.getElementById("form-field-LoanRibitChangeNumOfMonthId").step = 1

    fCalcLoanRecForPreview()
    
})

function gReadFromDbAllLoanRecords(){
	console.log("in loan read")
	fSendCommandToBackEnd("","actionReadUserRecsLoan")
		
}


// add eventlistner to check box that hide loan icons area
// gLoanAreaCheckbobShowhideid= document.getElementById("CurrentStatusHovotCheckBoxId")
// gLoanAreaCheckbobShowhideid.addEventListener("change", function() {
//     if (gLoanAreaCheckbobShowhideid.checked) 
//     {
    
//         if (gLoanRecordsList.length===0)
//         {
//             gReadFromDbAllLoanRecords()
//             //after function above will be implmanted to loans reading from DB this line should be deleted
//             //document.getElementById("masterofAllLoanDivId").style.display='block'
//         }
//         else{
//             document.getElementById("masterofAllLoanDivId").style.display='block'
//         }
//         // gShowHideAssetIconsArea("block")
        
        
        

//     }
//     else{
//         document.getElementById("masterofAllLoanDivId").style.display='none'
//         document.getElementById("LoanFormId").style.display="none"
        
//     }
// });

gLoanAreaCheckbobShowhideid=document.getElementById("CurrentStatusHovotCheckBoxId")

gLoanAreaCheckbobShowhideid.addEventListener("click", function() {

	
	if( gLoanAreaCheckbobShowhideid.src =="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/leftRed.png")
		{
			console.log("1")
            gLoanAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/Red-down.png"
			if(gAssetRecordsList.length === 0)
				console.log("2")
                if (gState=="before_load")
				{
					// gReadFromDbAllAssetRecords()
                    console.log("3")
				}
				else{
					document.getElementById("masterofAllLoanDivId").style.display='block'
                    document.getElementById("LoanFormId").style.display="none"
                    console.log("4")
				}
		}
		else{
			gLoanAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/leftRed.png"
			document.getElementById("masterofAllLoanDivId").style.display='none'
            document.getElementById("LoanFormId").style.display="none"
            console.log("5")
		}

});

function fInsertIconIntoLoanArea(InId,inAssetName,inassetDiscription){
	
	// duplicate dummy loan div
	const cloneAssetFromDummy = document.getElementById("LoanDummyId").cloneNode(true);
	
	//give the div serial number
	cloneAssetFromDummy.id=InId

	//write id of loan into delete img and connect a click function	
	lretElemant=fGetImageEllemantById(cloneAssetFromDummy,"deletedummyloanid")
	//console.log("elementfound delete:",lretElemant)
	lretElemant.id=InId
	lretElemant.addEventListener('click',fHandleDeleteIconPresses);

	//write id of asset into edit img and connect a click function	
	lretElemant=fGetImageEllemantById(cloneAssetFromDummy,"editdummyloanid")
	//console.log("elementfound edit:",lretElemant)
	lretElemant.id=InId
	lretElemant.addEventListener('click',fHandleEditIconPresses);
	
	// display the new asset on the page
	cloneAssetFromDummy.style.display="block"
	
	lretElemant=fGetH6EllemantById(cloneAssetFromDummy,"LoanNameId")
	lretElemant.innerHTML=inAssetName

	lretElemant=fGetH6EllemantById(cloneAssetFromDummy,"LoanDescriptionId")
	lretElemant.innerHTML=inassetDiscription
    console.log("element:",lretElemant,"description:",inassetDiscription)
	
	
	document.getElementById("loanAreaContainerId").appendChild(cloneAssetFromDummy)
	
}	

// var checkboxManagerLoanStatus = document.getElementById("LoanSectionManagerStatusId");
// checkboxManagerLoanStatus.addEventListener("change", function() {
//     // Check if the checkbox is checked
//     if (checkboxManagerLoanStatus.checked) {
//         // If checked, show the div
//         document.getElementById("Loan-tables-container").style.display = "block";
//     } else {
//         // If unchecked, hide the div
//         document.getElementById("Loan-tables-container").style.display = "none";
//     }
// });
function fAddLoanToTable(containerId, tableId, loan, tableTitle) {
    // Check if the container exists
    var container = document.getElementById(containerId);
    if (!container) {
        console.error("Container with id '" + containerId + "' not found.");
        return;
    }

    var returnValues=fLoanCalcFromDbRecord(loan)

    // Mapping of field names to translated names
    const translatedFieldNames = {
        'Description':'תיאור',
        'ReturnType': 'סוג החזר',
        'YitraRelevantDate': 'תאריך נכונות יתרה',
        'CurrentBallance': 'יתרה',
        'EndDate': 'תאריך סיום',
        'YearRibit': 'ריבית שנתית',
        'MadadTzefi': 'מדד צפוי',
        'GraceNumMonth': 'מספר חודשי גרייס',
        'RibitChangeYesNo': 'ריבית משתנה',
        'החזר חודשי מקסימלי': 'החזר חודשי מקסימלי',
        'החזר חודשי': 'החזר חודשי',
        'יחס החזר': 'יחס החזר'
    };

    // List of field names
    const fieldNames = [
        'Description','ReturnType', 'YitraRelevantDate', 'CurrentBallance', 'EndDate',
        'YearRibit', 'MadadTzefi', 'GraceNumMonth', 'RibitChangeYesNo'
    ];

    // Additional field names to add
    const additionalFieldNames = ['החזר חודשי מקסימלי', 'החזר חודשי', 'יחס החזר'];

    // Extracting translated field names
    var translatedFieldNamesList = fieldNames.map(fieldName => translatedFieldNames[fieldName]);
    // Adding additional translated field names
    translatedFieldNamesList.push(...additionalFieldNames);

    // console.log("loan:",loan)
    // console.log("fieldnames:",fieldNames)
    // Extracting field values
    var fieldValues = fieldNames.map(fieldName => loan[fieldName]);
    // console.log("field values:",fieldValues)
    // Adding additional field values
    fieldValues.push(returnValues.MaxMonthly, returnValues.Monthly,returnValues.ratio );

    // Check if the table already exists
    var table = document.getElementById(tableId);
    var tableCreated = false;

    // If table doesn't exist, create it
    if (!table) {
        table = document.createElement('table');
        table.id = tableId;
        tableCreated = true;

        var caption = document.createElement('caption');
        caption.textContent = 'התחייבויות';
        caption.style.fontSize = "200%"; // Double size
        caption.style.fontWeight = "bold"; // Bold
        table.appendChild(caption);
    }

    translatedFieldNamesList.reverse()
    if(tableCreated==true)    {
        // Create the header row
        const headerRow = document.createElement('tr');
        headerRow.style.backgroundColor = "lightblue";
        translatedFieldNamesList.forEach(fieldName => {
            const th = document.createElement('th');
            th.textContent = fieldName;
            th.classList.add('right-align'); 
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow)

    }
    ;
    
    fieldValues.reverse()
    // Create the data rows
    const dataRow = document.createElement('tr');
    fieldValues.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        console.log("cellvalue:",value)
        // Add a class to the cell for alignment
        td.classList.add('right-align'); 
        dataRow.appendChild(td);
    });
    table.appendChild(dataRow);

    // Add the table to the document body
    container.appendChild(table);
    
    

        // // Select the header row
        // var headerRow = table.rows[0];
        
        // // Select all the cells in the header row
        // var headerCells = Array.from(headerRow.cells);
        
        // // Reverse the order of the header cells
        // headerCells.reverse();
        
        // // Append each header cell back to the header row
        // headerCells.forEach(function (cell) {
        //     headerRow.appendChild(cell);
        // });

                // Loop through each row in the table
                for (var i = 0, row; row = table.rows[i]; i++) {
                    console.log("rowToReverse:",row)
                    
                    // // Select all the cells in the row
                    // var cells = Array.from(row.cells);

                    // // Reverse the order of the cells
                    // cells.reverse();

                    // // Append each cell back to the row
                    // cells.forEach(function (cell) {
                    //     row.appendChild(cell);
                    // });
                }
        
   
    // Apply CSS to the container to add scroll
    container.style.overflowX = "auto";
    container.style.maxWidth = "100%";
}




function fBuildLoanSummerytables(inArray){

	// clear asset table div
	var parentDiv=document.getElementById("Loan-tables-container")
	// console.log("tables clear:",parentDiv)
	while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }

	for (let i = 0; i < inArray.length ; i++) {
		fAddLoanToTable("Loan-tables-container","LoanSummerytableNadlanInvestId",inArray[i],"התחייבויות")
		}
		
}


function fHandaleLoanRecords(TempinArray,lInsertIconsYesNo)
{

    document.getElementById("LoanFormId").style.display="none"
    // 	//save list to global variable (clone and not reference)
    gLoanRecordsList = TempinArray.slice();
        
        
    // 	// clear total loan osh effect list
    gAllLoansOshEffect.fill(0);

    // 	//copy(clone,not reference) function input array into inArray, this is done in ordere not to effect the original array
    var inArray = TempinArray.slice();
    console.log("in array fron handle loan:",inArray)

    // remove last element that is not an rec object 
    inArray.pop();
    // Sorting the array based on the "Type" property alphabetically
    inArray.sort((a, b) => {
        return a.ReturnType.localeCompare(b.ReturnType);
    });
        
    if(lInsertIconsYesNo==true)
    {
        // clear asset icons area
        parentDiv=document.getElementById("loanAreaContainerId")
        while (parentDiv.firstChild) {
            parentDiv.removeChild(parentDiv.firstChild);
        }

        //insert icons into icons area
        for (let i = 0; i < inArray.length; i++) {
            // console.log("rec Sn:",inArray[i].Sn);
            // console.log("rec Type:",inArray[i].Type);
            fInsertIconIntoLoanArea(inArray[i].Sn,inArray[i].ReturnType,inArray[i].Description)
        
            
        }
        //show icons area
        document.getElementById("masterofAllLoanDivId").style.display="block"
    }
        
        
    // 	//build hon symmery tables		
    fBuildLoanSummerytables(inArray)
    let lTotalBalanceList=[]
    let lDiscriptionsArray=[]
    let lratiosArray=[]
    for (let i = 0; i < inArray.length ; i++) {
            returLists = fLoanCalcFromDbRecord(inArray[i])
            lTotalBalanceList=sumLists(lTotalBalanceList,returLists.MonthBallance)
            console.log("inaray:",inArray[i].SourceOfMonthly)
            if(inArray[i].SourceOfMonthly=='חשבון עובר ושב'){
                gAllLoansOshEffect=sumLists(gAllLoansOshEffect,returLists.MonthPaymant)
            }
           
            lDiscriptionsArray.push(inArray[i].Description)
            lratiosArray.push(parseFloat(returLists.ratio))


            console.log("lb:",lDiscriptionsArray,lratiosArray)
		}



    // Count occurrences of each description
var counts = {};
for (var i = 0; i < lDiscriptionsArray.length; i++) {
    var description = lDiscriptionsArray[i];
    if (!counts[description]) {
        counts[description] = 0;
    }
    counts[description]++;
}

// Create an array to hold the x-axis values
var xValues = [];
for (var description in counts) {
    for (var i = 1; i <= counts[description]; i++) {
        xValues.push(description + ' ' + i);
    }
}

// Create the trace
var trace = {
    x: xValues,
    y: lratiosArray,
    type: 'bar',
    text: lratiosArray.map(String),  // Convert each value to string for display
    textposition: 'auto'  // Automatically position the text on top of bars
};

// Create the data array
var data4 = [trace];

// Set the layout
var layout4 = {
    title: 'יחס החזר לשקל',
    titlefont: {
        size: 26,
        
    },
    xaxis: {
        title: 'תיאור',
        
    },
    yaxis: {
        title: 'יחס'
    },
    height:400
};

// Plot the chart
Plotly.newPlot('LoanReturnrateBarId', data4, layout4);


    gPlotValuesOverTime(gAllLoansOshEffect,'החזר חודשי של כלל ההתחיבויות על פני זמן','LoanMontlyChartId')
    gCopyChartAndaddTitleToReport("LoanMontlyChartId","LoanReturnoverTimeReportId","OshSummery4StateId","LoanReturnoverTimeReportIdText",true,"החזר חודשי של כלל ההתחייבויות לאורך זמן")

    // Multiply each element by -1 becouse it is mony comeing out of the bank
    gAllLoansOshEffect = gAllLoansOshEffect.map(value => value * -1);
    lTotalBalanceList = lTotalBalanceList.map(value => value * -1);
    gfcalcTotalOshAndplot()
    gLoanBallanceSum= lTotalBalanceList
    // gPlotHonAndLoanOverTime('testAsetTotalHonChartId')
    // console.log("tl:",lTotalBalanceList)
    // console.log("gAllLoansOshEffect:",gAllLoansOshEffect)

    
    
    let lMaskantaSum=0
    
    
    let lmadadSum=0
    let ltotalSum=0
    let lmadadRatio=0
    let lNomadadRatio=0
    for (let i = 0; i < inArray.length ; i++) {
        ltotalSum = parseInt(inArray[i].CurrentBallance)+ltotalSum
        if(inArray[i].MadadYesNo=='כן'){
          
            lmadadSum = parseInt(inArray[i].CurrentBallance)+lmadadSum
        }     
        if (inArray[i].ReturnType.includes("משכנתא")) {
          
            lMaskantaSum = parseInt(inArray[i].CurrentBallance)+lMaskantaSum
        }
    }

    let lNoMaskantaSum=ltotalSum-lMaskantaSum
    // console.log("maskanta sum:",lMaskantaSum,"no maskanta sum:",lNoMaskantaSum)

    lmadadRatio=lmadadSum/ltotalSum*100
    lNomadadRatio=100-lmadadRatio
    const data = [{
        values: [lmadadRatio, lNomadadRatio],
        labels: ['צמוד', 'לא צמוד'],
        type: 'pie'
      }];
      // Layout for the pie chart
      const layout = {
        title: 'יחס הלוואות צמודות/לא צמודות',
        titlefont: {
			size: 26,
			
		},
        height:400
      };
      // Render the pie chart
      Plotly.newPlot('LoanMadadTypePieId', data, layout);

    let lRibitChaneSum=0
    ltotalSum=0
    let lRibitChangeRatio=0
    let lNoRibitChangeRatio=0
    for (let i = 0; i < inArray.length ; i++) {
        ltotalSum = parseInt(inArray[i].CurrentBallance)+ltotalSum
        if(inArray[i].RibitChangeYesNo=='כן'){
          
            lRibitChaneSum = parseInt(inArray[i].CurrentBallance)+lRibitChaneSum
        }        
    }
    lRibitChangeRatio=lRibitChaneSum/ltotalSum*100
    lNoRibitChangeRatio=100-lRibitChangeRatio
    const data1 = [{
        values: [lRibitChangeRatio, lNoRibitChangeRatio],
        labels: ['ריבית משתנה', 'ריבית קבוע'],
        type: 'pie'
      }];
      // Layout for the pie chart
      const layout1 = {
        title: 'יחס הלוואות ריבית קבוע/ריבית משתנה',
        titlefont: {
			size: 26,
			
		},
        height:400
      };
      // Render the pie chart
      Plotly.newPlot('LoanRibitTypePieId', data1, layout1);


      const dataLoantype = [{
        values: [lMaskantaSum,lNoMaskantaSum],            
        labels: ["הלוואה רגילה","הלוואת משכנתא"],
        type: 'pie',
        text: [lNoMaskantaSum.toLocaleString(),lMaskantaSum.toLocaleString()], // Display values
	    textinfo:'label + text', // Display label and percentage
      }];
      // Layout for the pie chart
      const layoutLoanType = {
        title:" חלוקת הלוואות משכנתא/רגיל",
        titlefont: {
			size: 26,
			
		},
        height:400
      };
      // Render the pie chart
      Plotly.newPlot('LoanReturnTypeChartId', dataLoantype, layoutLoanType);
      gCopyChartAndaddTitleToReport("LoanReturnTypeChartId","LoanReturnTypeReportId","OshSummery4StateId","LoanReturnTypeRportIdText",true," חלוקת הלוואות משכנתא/רגיל")




    let lReturnTypeBalonSum=0
    ltotalSum=0
    let lReturnTypeBalonRatio=0
    let lNReturnTypeMonthly=0
    for (let i = 0; i < inArray.length ; i++) {
        ltotalSum = parseInt(inArray[i].CurrentBallance)+ltotalSum
        if (inArray[i].ReturnType.includes("בלון")) {
          
            lReturnTypeBalonSum = parseInt(inArray[i].CurrentBallance)+lReturnTypeBalonSum
        }        
    }
    lReturnTypeBalonRatio=lReturnTypeBalonSum/ltotalSum*100
    lNReturnTypeMonthly=100-lReturnTypeBalonRatio
    const data2 = [{
        values: [lReturnTypeBalonRatio, lNReturnTypeMonthly],
        labels: [' הלוואות בלון', 'הלוואות החזר חודשי'],
        type: 'pie'
      }];
      // Layout for the pie chart
      const layout2 = {
        title: 'יחס הלוואות בלון/החזר חודשי',
        titlefont: {
			size: 26,
			
		},
        height:400
      };
      // Render the pie chart
      Plotly.newPlot('LoanReturnTypePieId', data2, layout2);


        
        
    // 	//calc all hon records total sum and monthly paymants
    // 	var lTempRetValue=[]
    // 	var lAssetHonTtypesSum=[]
    // 	var lAssetHonTtypesOshEffect=[]
    // 	lTempRetValue = fAssetCalcRecords(3,0,"",1,inArray)
    // 	lAssetHonTtypesSum=lTempRetValue[0]
    // 	lAssetHonTtypesOshEffect=lTempRetValue[1]
    // 	// Multiply each element by -1 becouse it is mony comeing out of the bank
    // 	lAssetHonTtypesOshEffect = lAssetHonTtypesOshEffect.map(value => value * -1);
    // 	console.log("osh effect by hon asset:",lAssetHonTtypesOshEffect)
        

    // 	gPlotValuesOverTime(lAssetHonTtypesSum,'שווי נכסים הוניים צפוי על פני זמן ','FutherAssetStatus')
        

    // 	//calc all pension records total sum and monthly paymants
    // 	lTempRetValue = fAssetCalcRecords(3,0,"",2,inArray)
    // 	console.log("ret value:",lTempRetValue)
    // 	lAssetPensionTtypesSum=lTempRetValue[0]
    // 	lAssetPensionTtypesOshEffect=lTempRetValue[1]
    // 	// Multiply each element by -1 becouse it is mony comeing out of the bank
    // 	lAssetPensionTtypesOshEffect = lAssetPensionTtypesOshEffect.map(value => value * -1);

    // 	console.log("os effect by pension assets:",lAssetPensionTtypesOshEffect)


    // 	gPlotValuesOverTime(lAssetPensionTtypesSum,'שווי נכסים קצבתיים צפוי על פני זמן ','FutherAssetPensionStatus')

        
    // 	//calc all nadlan invest records total sum and monthly paymants
    // 	lTempRetValue = fAssetCalcRecords(3,0,"",4,inArray)
    // 	lAssetHonTtypesSum=lTempRetValue[0]
    // 	lAssetNadlanInvestTtypesOshEffect=lTempRetValue[1]
    // 	console.log("os effect by nadlan invest assets:",lAssetNadlanInvestTtypesOshEffect)
    // 	// console.log("nadlan invest assets over time:",lAssetHonTtypesSum)


    // 	// calc hon, pension and nadlan iinvest total effect on osh
    // 	for (let i = 0; i < gAllAssetsOshEffect.length; i++) {
    // 		if( isNaN(lAssetHonTtypesOshEffect[i])){
    // 			lAssetHonTtypesOshEffect[i]=0
    // 		}
    // 		if( isNaN(lAssetPensionTtypesOshEffect[i])){
    // 			lAssetPensionTtypesOshEffect[i]=0
    // 		}
    // 		if( isNaN(lAssetNadlanInvestTtypesOshEffect[i])){
    // 			lAssetNadlanInvestTtypesOshEffect[i]=0
    // 		}
            
    // 		gAllAssetsOshEffect[i]= gAllAssetsOshEffect[i]+lAssetHonTtypesOshEffect[i]+lAssetPensionTtypesOshEffect[i]+lAssetNadlanInvestTtypesOshEffect[i];
    // 		console.log("t,h,p,n:",gAllAssetsOshEffect[i],lAssetHonTtypesOshEffect[i],lAssetPensionTtypesOshEffect[i],lAssetNadlanInvestTtypesOshEffect[i])
    // 	}
    // 	console.log("total osh effect by all assets:",gAllAssetsOshEffect)


    // 	// calc osh total after the change of asset on osh
    // 	gfcalcTotalOshAndplot()
    // 	//gPlotValuesOverTime(gAllAssetsOshEffect,'יתרת חשבון בנק על פני זמן ','OshgraphInGridId')

    // 	// calc hon assets per type
    // 	var lAssetHonListPerTypeNames=[]
    // 	var lAssetHonListPerTypeCurrentValue=[]
    // 	for (let value of globalAssetsHonSet) {
    // 		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
    // 		//console.log("mode2:",lTempRetValue)	
    // 		if(lTempRetValue[1]!=0)
    // 		{
    // 			lAssetHonListPerTypeNames.push(lTempRetValue[0])
    // 			lAssetHonListPerTypeCurrentValue.push(lTempRetValue[1])
    // 		}
    // 	}
    // 	// console.log("mode2:",lAssetHonListPerTypeNames,lAssetHonListPerTypeCurrentValue)	

    // 	// calc pension assets per type
    // 	var lAssetPensionListPerTypeNames=[]
    // 	var lAssetPensionListPerTypeCurrentValue=[]
    // 	for (let value of globalAssetsPensionSet) {
    // 		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
    // 		//console.log("mode2:",lTempRetValue)	
    // 		if(lTempRetValue[1]!=0)
    // 		{
    // 			lAssetPensionListPerTypeNames.push(lTempRetValue[0])
    // 			lAssetPensionListPerTypeCurrentValue.push(lTempRetValue[1])
    // 		}
    // 	}

    // 	// calc nadlan invest assets per type
    // 	var lAssetNadlanInvestSetListPerTypeNames=[]
    // 	var lAssetNadlanInvestSetListPerTypeCurrentValue=[]
    // 	for (let value of globalAssetsNadlanInvestSet) {
    // 		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
    // 		//console.log("mode2:",lTempRetValue)	
    // 		if(lTempRetValue[1]!=0)
    // 		{
    // 			lAssetNadlanInvestSetListPerTypeNames.push(lTempRetValue[0])
    // 			lAssetNadlanInvestSetListPerTypeCurrentValue.push(lTempRetValue[1])
    // 		}
    // 	}
    // 	// calc nadlan  assets per type
    // 	var lAssetNadlanSetListPerTypeNames=[]
    // 	var lAssetNadlanSetListPerTypeCurrentValue=[]
    // 	for (let value of globalAssetsNadlanSet) {
    // 		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
            
    // 		if(lTempRetValue[1]!=0)
    // 		{
    // 			lAssetNadlanSetListPerTypeNames.push(lTempRetValue[0])
    // 			lAssetNadlanSetListPerTypeCurrentValue.push(lTempRetValue[1])
    // 		}

    // 	}
    // 	// console.log("mode2 nadlan:",lAssetNadlanSetListPerTypeNames,lAssetNadlanSetListPerTypeCurrentValue)	
        
    
    //   // Function to create traces from keys and values
    //   function createTraces(keys, values, barName) {
    // 	var traces = [];
    // 	for (var i = 0; i < keys.length; i++) {
    // 		//var yaxis = 'y' + yAxisIndex;
    // 		traces.push({
    // 		x: [barName],
    // 		y: [values[i]],

    // 		marker: {
    // 			//color: 'rgb(55, 83, 109)',
    // 			width: 2 // Adjust the width of the bars here
    // 		},
    // 		name: keys[i],
    // 		type: 'bar',
    // 		hoverinfo: 'skip', // Disable hover
    // 		text: keys[i] + '\n'+ values[i].toLocaleString(), // Displaying key and value on the bar 
    // 		textposition: 'inside', // Displaying text inside the bar
    // 		//texttemplate:'%{y:,}'
            
    // 		// textfont: {
    //         //     size: 18, // Define the font size here (in pixels)
    //         // }
            
    // 	  });
    // 	}
    // 	return traces;
    //   }
    
    
    //  ///////////////////////////////////////////////////////////// ////////////////////////////////////////////////////
    
    // var keysArray = lAssetHonListPerTypeNames;
    // var valuesArray = lAssetHonListPerTypeCurrentValue;
    // var sum = 0;

    // // Calculate the sum of valuesArray
    // for (var i = 0; i < valuesArray.length; i++) {
    //     sum += valuesArray[i];
    // }

    // var data = [{
    //     values: valuesArray,
    //     labels: keysArray,
    //     type: 'pie',
    //     hole: 0.4,
    // 	textinfo: 'label+percent', // Display label and percentage
    //     textposition: 'inside', // Position text inside the pie slice // Hole size to create a donut chart, set to 0 for a pie chart
    // }];

    // var layout = {
    //     title: 'נכסי הון נכון להיום',
    //     annotations: [
    //         {
    //             text: "סך הכל:" + sum.toLocaleString(),
    //             showarrow: false,
    //             font: {
    //                 size: 14,
    //                 color: 'blue',
    //                 family: 'Arial',
    //                 weight: 'bold'
    //             }
    //         }
    //     ],
    //     height: 500,
        
    // };

    // Plotly.newPlot('CurrentAssetHonStatus', data, layout);


    // ///////////////////////////////////////////////////////////// ////////////////////////////////////////////////////
    
    // ///////////////////////////////////////////////////////////// 

    // var keysArray = lAssetPensionListPerTypeNames;
    // var valuesArray = lAssetPensionListPerTypeCurrentValue;
    // var sum = 0;

    // // Calculate the sum of valuesArray
    // for (var i = 0; i < valuesArray.length; i++) {
    //     sum += valuesArray[i];
    // }

    // var data = [{
    //     values: valuesArray,
    //     labels: keysArray,
    //     type: 'pie',
    //     hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
    // 	textinfo: 'label+percent', // Display label and percentage
    //     textposition: 'inside', // Position text inside the pie slice
    // }];

    // var layout = {
    //     title: {
    // 		text:'נכסי הון קצבתיים נכון להיום',
    // 		// x: 2.5
    // 	},
    //     annotations: [
    //         {
    //             // x: 0.5,
    //             // y: 1.1,
    //             xref: 'paper',
    //             yref: 'paper',
    //             text: "סך הכל:" + sum.toLocaleString(),
    //             showarrow: false,
    //             font: {
    //                 size: 14,
    //                 color: 'blue',
    //                 family: 'Arial',
    //                 weight: 'bold'
    //             }
    //         }
    //     ],
    //     height: 500,
        
    // };

    // Plotly.newPlot('CurrentAssetPensionStatus', data, layout);


    //   ///////////////////////////////////////////////////////////// 


    // var keysArray = lAssetNadlanSetListPerTypeNames;
    // var valuesArray = lAssetNadlanSetListPerTypeCurrentValue;
    // var sum = 0;

    // // Calculate the sum of valuesArray
    // for (var i = 0; i < valuesArray.length; i++) {
    //     sum += valuesArray[i];
    // }

    // var data = [{
    //     values: valuesArray,
    //     labels: keysArray,
    //     type: 'pie',
    //     hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
    // 	textinfo: 'label+percent', // Display label and percentage
    //     textposition: 'inside', // Position text inside the pie slice
    // }];

    // var layout = {
    //     title: {
    // 		text:'נכסי נדלן נכון להיום',
    // 		// x: 2.5
    // 	},
    //     annotations: [
    //         {
    //             // x: 0.5,
    //             // y: 1.1,
    //             xref: 'paper',
    //             yref: 'paper',
    //             text: "סך הכל:" + sum.toLocaleString(),
    //             showarrow: false,
    //             font: {
    //                 size: 14,
    //                 color: 'blue',
    //                 family: 'Arial',
    //                 weight: 'bold'
    //             }
    //         }
    //     ],
    //     height: 500,
        
    // };

    // Plotly.newPlot('CurrentAssetNadlanStatus', data, layout);

    //   ///////////////////////////////////////////////////////////// 
    // var keysArray = lAssetNadlanInvestSetListPerTypeNames;
    // var valuesArray = lAssetNadlanInvestSetListPerTypeCurrentValue;
    // var sum = 0;

    // // Calculate the sum of valuesArray
    // for (var i = 0; i < valuesArray.length; i++) {
    //     sum += valuesArray[i];
    // }

    // var data = [{
    //     values: valuesArray,
    //     labels: keysArray,
    //     type: 'pie',
    //     hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
    // 	textinfo: 'label+percent', // Display label and percentage
    //     textposition: 'inside', // Position text inside the pie slice
    // }];

    // var layout = {
    //     title: {
    // 		text:'נכסי נדלן להשקעה נכון להיום',
    // 		// x: 2.5
    // 	},
    //     annotations: [
    //         {
    //             // x: 0.5,
    //             // y: 1.1,
    //             xref: 'paper',
    //             yref: 'paper',
    //             text: "סך הכל:" + sum.toLocaleString(),
    //             showarrow: false,
    //             font: {
    //                 size: 14,
    //                 color: 'blue',
    //                 family: 'Arial',
    //                 weight: 'bold'
    //             }
    //         }
    //     ],
    //     height: 500,
        
    // };

    // Plotly.newPlot('CurrentAssetNadlanInvestStatus', data, layout);


    // var legendItems = document.querySelectorAll('.legendtext');
    // console.log("ttt:",legendItems)
    // for (var i = 0; i < legendItems.length; i++) {
    //     // legendItems[i].setAttribute('text-anchor', 'start');
    // 	// legendItems[i].setAttribute('x', '130');
    // 	legendItems[i].style.textAlign = 'left';
    // }





}

function formatDate(dateString) {
    var parts = dateString.split('/');
    var date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
    return date.toISOString().split('T')[0];
}

function prepareToDm(resultList) {
    let outputList = resultList.map(item => {
        
        
        //calc grace length
        let lGraceNumMonth = 0;
        if (item.dachuy !== undefined) {
            // console.log("item dachuy:",item.dachuy)
            let startDate = new Date(item.start_date.split('/').reverse().join('-'));
            let endDate = new Date(item.dachuy.split('/').reverse().join('-'));
            let diffInMilliseconds = endDate - startDate;
            let diffInMonths = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30));
            lGraceNumMonth = diffInMonths;
        }
        
        if(item.tadiroot=="תשלום בלון")
            {
                lTypeStartText="בלון"
            }
            else{
                lTypeStartText="החזר חודשי"
            }
        
        
        
        let outputItem = {
            Sn: item.Id ,  //String(item.Id), // Map 'Id' field to 'Sn' and convert to string
            ReturnType:item.title+" "+lTypeStartText,
            Description: item.reportownername + " " + item.title + " " + item.Source, // Map 'Description' field to 'Description'
            CurrentBallance : item.yitra,
            GraceYesNo: item.dachuy === undefined ? 'לא' : 'כן',
            GraceNumMonth: lGraceNumMonth,
            MadadYesNo: item.Hatznada === "לא צמוד" ? 'לא' : 'כן',
            YearRibit:item.ribit,
            EndDate:formatDate(item.end_date),
            YitraRelevantDate:formatDate(item.nechonutdate),
            RibitChangeYesNo:item.ribittype === "ריבית משתנה" ? 'כן' : 'לא',
        };
        return outputItem;
    });

    return JSON.stringify(outputList); // Convert to JSON string
}
document.getElementById('excelFile').addEventListener('change', function(evt) {
    console.log("live")
    var lFileError=false
    var file = evt.target.files[0];
    console.log("evt loan:",evt.target.files[0])
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        // Get the date and report owner name from the other sheet
        var otherWorksheet = workbook.Sheets["מכתב מקדים"];
        console.log("otherWorksheet:",otherWorksheet)
        if(!otherWorksheet){
            console.log("no other worksheet")
            alert("קובץ לא תקין")
            return
            
        }
        document.getElementById("form-field-OwnerNameAshrayDileId").value=evt.target.files[0].name
        var cellValue = otherWorksheet['A1'].v;
        
        var dateMatch = cellValue.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/);
        if(!dateMatch){
            console.log("no dateMatch")
            alert("קובץ לא תקין")
            return
        }
        
        if (dateMatch) {
            var date = dateMatch[0];
        }
        console.log("dateMatch " + dateMatch);
        var reportOwnerNameCell = otherWorksheet['A3'];
        console.log("reportOwnerNameCell: " + reportOwnerNameCell);
        var reportOwnerName = reportOwnerNameCell ? reportOwnerNameCell.v : '';

        console.log("Report owner name: " + reportOwnerName);



        var worksheet = workbook.Sheets["מידע מפורט על עסקאות פעילות"];
        var jsonData = XLSX.utils.sheet_to_json(worksheet, {header:1});

        
        
        
        
        
        let result = [];

        const columnMapping = {
            "start_date": {row: 4, col: 2},
            "end_date": {row: 5, col: 2},
            "Id": {row: 0, col: 5},
            "yitra": {row: 12, col: 5},
            "type": {row: 13, col: 5},
            "balonDate": {row: 16, col: 5},
            "ribittype": {row: 28, col: 1},
            "Hatznada": {row: 28, col: 2},
            "ribit": {row: 28, col: 6},
            "tadiroot": {row: 13, col: 2},
            "monthly": {row: 14, col: 2}
        };
        let Source = '';
        // Iterate over the rows
        for(let i = 0; i < jsonData.length; i++) {
            if(jsonData[i][2] === "משכנתה" || jsonData[i][2] === "הלוואה") {
               
                if (jsonData[i-2][0].includes("שם מקור המידע המדווח")) {
                    Source = jsonData[i-2][0].split(":")[1].trim();
                }
                console.log("Source: " + Source)
                // Store the data in an object
                let obj = {};
                console.log("mishoon:", jsonData[i+19][0])  
                for (let key in columnMapping) {
                    
                    // if no mishkoon
                    if (jsonData[i+19][0] !== "בטחונות הקשורים לעסקה" && jsonData[i][2] === "הלוואה" && (key === "ribittype" || key === "Hatznada" || key === "ribit")) {
                        console.log("no mishkoon")
                        obj[key] = jsonData[i + 22][columnMapping[key].col];
                    } else {
                        console.log("yes mishkoon")
                        obj[key] = jsonData[i + columnMapping[key].row][columnMapping[key].col];
                    }
                }
                obj["title"] = jsonData[i][2]; // Add the title
                obj["dachuy"] = jsonData[i + 16][2]; // Add the dachuy
                obj["nechonutdate"] = date; // Add the date from the other sheet
                obj["reportownername"] = reportOwnerName; // Add the report owner name from the other sheet
                obj["Source"] = Source;
                // add sn of mine to id to avoid duplicate of id that we can have inthe file
                obj["Id"]=  obj["Id"] +" " + i
                // obj["Id"]=  obj["Id"] +" " + gGetCurrentTimeAsnumberString()
                // console.log("obj:",obj,"tedirrot:",obj.tadiroot);
                // all other types not supported
                if(obj.tadiroot=="חודשי" || obj.tadiroot=="תשלום בלון" || obj.tadiroot=="תשלום דחוי")
                {
                    result.push(obj);
                }

            }
        }
        
        
        let jsonString = prepareToDm(result);
        displayJsonInTable(jsonString);
        
        console.log(jsonString);
        // Print the object to the console
        console.log(result);
    };
    reader.readAsArrayBuffer(file);
}, false);


function displayJsonInTable(jsonString) {
    // Parse the JSON string into an object
    var data = JSON.parse(jsonString);

    // Create a table
    var table = document.createElement('table');

    // Create table header row
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    // Define your headers
    var headers = [
        { key: 'checkbox', value: 'בחר לשמירה' },
        { key: 'Sn', value: "מספר סידורי" },
        { key: 'ReturnType', value: 'סוג הלוואה' },
        { key: 'Description', value: 'תאור' },
        { key: 'CurrentBallance', value: 'יתרה' },
        { key: 'GraceYesNo', value: 'האם גרייס' },
        { key: 'GraceNumMonth', value: 'מספר חודשי גרייס' },
        { key: 'MadadYesNo', value: 'האם צמוד' },
        { key: 'YearRibit', value: 'ריבית' },
        { key: 'EndDate', value: 'תאריך סיום' },
        { key: 'YitraRelevantDate', value: 'תאריך נכונות נתונים' },
        { key: 'RibitChangeYesNo', value: 'האם ריבית משתנה' }
    ];
    // Reverse the headers array
    headers.reverse();
    
    headers.forEach(header => {
        var th = document.createElement('th');

        if (header.key === 'checkbox') {
			// Step 2: Create a checkbox in the header
			var headerCheckbox = document.createElement('input');
			headerCheckbox.type = 'checkbox';
			headerCheckbox.style.transform = 'scale(2)';
			headerCheckbox.addEventListener('change', function() {
				// Step 4: Select all row checkboxes
				var rowCheckboxes = table.querySelectorAll('tbody tr input[type="checkbox"]');
				// Step 5: Iterate and update each row checkbox's checked state
				rowCheckboxes.forEach(function(checkbox) {
					checkbox.checked = headerCheckbox.checked;
				});
			});
			th.appendChild(headerCheckbox);
		} else {
			th.textContent = header.value;
		}

        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    table.appendChild(thead);

    // Create table body
    var tbody = document.createElement('tbody');
    data.forEach(item => {
        var row = document.createElement('tr');
        headers.forEach(header => {
            var td = document.createElement('td');
            if (header.key === 'checkbox') {
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.Sn;
                checkbox.style.transform = "scale(2)";
                td.appendChild(checkbox);
            } else {
                td.textContent = item[header.key];
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);



    // Get all th elements within the table
	var theaders = table.querySelectorAll('th');
	// Apply sticky style to each header
	theaders.forEach(function(theader) {
		theader.style.position = 'sticky';
		theader.style.top = '0';
		theader.style.backgroundColor = '#fff'; // Ensure the header is visible over any content that might scroll under it
		theader.style.zIndex = '1'; // Ensure the header is above other content
	});

    var container = document.getElementById("loanLoadFileTableId");
    container.innerHTML = '';
    container.appendChild(table);

    // Create a button
    var button = document.createElement('button');
    button.textContent = 'שמור הלוואות שנבחרו';
    container.appendChild(button);
    button.addEventListener('click', function() {
        var selectedRows = [];
        var checkboxes = container.querySelectorAll('tbody input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            var row = checkbox.parentElement.parentElement;
            var rowData = {};
            headers.forEach((header, index) => {
                if (header.key !== 'checkbox') {
                    rowData[header.key] = row.children[index].textContent;
                }
            });
            selectedRows.push(rowData);
        });
        var jsonString = JSON.stringify(selectedRows);
        console.log(jsonString);
        
       
        
        document.getElementById('LoadLoanFileCheckBoxId').checked = false;
        document.getElementById("form-field-ToDbArrayCommandId").value="SaveLoanArray"
        document.getElementById("form-field-ToDbArrayCommanDataId").value=jsonString
        document.getElementById("DataBaseArrayActionClickBtnId").click();
        document.getElementById("readNetunayAshrayId").style.display="none"  

        // fSendCommandToBackEnd("","actionReadUserRecsLoan")
       
               
        
    });
}
document.getElementById("readnetunayAshrasyButtonId").addEventListener("click", function() {
   

    lstatus=document.getElementById("readNetunayAshrayId").style.display
    console.log("status99:",lstatus)
    if(lstatus=="none"){
        document.getElementById("readNetunayAshrayId").style.display="block" 
        console.log("status99:",lstatus)

    }
    else{
        document.getElementById("readNetunayAshrayId").style.display="none"  
    }
});

document.getElementById("LoadOshFileFormButtonId").addEventListener("click", function(event) {
    event.preventDefault();
    
    document.getElementById('excelFile').click();
})