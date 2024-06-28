// // the following fields hidden, each field id has has a prefix text form-field-XXXXXX
// // the fileds names are: OshSamur1,OahSnId,oshUserNameId,OshSamur2,OshSamur3

// // List of field names
// let fieldNames = ['OshSamur1', 'OahSnId', 'oshUserNameId', 'OshSamur2', 'OshSamur3','OshSamur4'];

// // Loop over the field names
// fieldNames.forEach(fieldName => {
//     // Select the field by its ID
//     let field = document.querySelector('#form-field-' + fieldName);

//     // Hide the field
//     if (field) {
//         field.style.display = 'none';
//     }
// });

// document.getElementById("form-field-OshOutAvgField").addEventListener("mouseover", function() {
//     document.getElementById("tempp").innerText ="הוצאה חודשית כוללת ממוצעת - מומלץ לפחות 3 חודשים"
//     console.log("hover")
// });
// document.getElementById("form-field-OshOutAvgField").addEventListener("mouseout", function() {
//     document.getElementById("tempp").innerText = "כאן מוצגת עזרה לשדות הטופס, עמוד על השדה המבוקש והעזרה תוצג כאן"
//     console.log("out")
// });

// document.getElementById("form-field-OutDiscription2").addEventListener("mouseover", function() {
//     document.getElementById("tempp").innerText = "סך החיובים והעברות הכספים דרך אפליקציות תשלומים (ביט,פייבוקס וכד')"
//     console.log("hover")
// });
// document.getElementById("form-field-OutDiscription2").addEventListener("mouseout", function() {
//     document.getElementById("tempp").innerText = "כאן מוצגת עזרה לשדות הטופס, עמוד על השדה המבוקש והעזרה תוצג כאן"
//     console.log("out")
// });
var gFileowner=""
var gTotalPensionHon = 0
var gTotalAssetHon = 0
var gTotalAssetNadlanInvest = 0
var gTotalAssetNadlan = 0


var gDiscontBankHeadr = ['תאריך', 'יום ערך', 'תיאור התנועה', '₪ זכות/חובה ', '₪ יתרה ', 'אסמכתה', 'עמלה', 'ערוץ ביצוע']
var gPoalimBankHeadr = ['תאריך', 'הפעולה', 'פרטים', 'אסמכתא', 'חובה', 'זכות', "יתרה בש''ח", 'תאריך ערך', 'לטובת', 'עבור']
var gMislakaHeader = ['שם מוצר', 'שם חברה מנהלת', 'מספר פוליסה', 'סטטוס', 'סך הכל חיסכון', 'תחנת משיכה קרובה', 'חיסכון צפוי לגיל פרישה לא כולל פרמיות', 'קיצבה חודשית לגיל פרישה לא כולל פרמיות', 'חיסכון צפוי לגיל פרישה', 'קיצבה חודשית לגיל פרישה', 'שיעור פנסיה זקנה צפויה', 'שיעור דמי ניהול מהפקדות', 'שיעור דמי ניהול שנתי מחיסכון צבור', 'תשואה מתחילת השנה', 'הפקדות מעסיק', 'הפקדות חוסך', 'שארים - בן/בת זוג', 'שארים - הורה נתמך', 'שארים - ילדים', 'פנסיית נכות', 'סכום ביטוח אובדן כושר עבודה - חודשי', 'סכום ביטוח אובדן כושר עבודה - חד פעמי', 'תאריך הצטרפות לראשונה', 'מוטבים - בן/בת זוג', 'מוטבים - ילדים', 'סכום ביטוח למקרה מוות - חודשי', 'סכום ביטוח למקרה מוות – חד פעמי', 'סוג מוצר', 'תאריך פתיחת תוכנית', 'תאריך נכונות נתונים']

console.log("global js ver 18")
var gmaxmonth=24;//simulation langth
// var gMAxMonthForCalculation = 0
var gAssetRecordsList=[]
var gLoanRecordsList=[]
var gOshRecordsList=[]

var gLoanRecordsList=[]

var gAllAssetsOshEffect=new Array(gmaxmonth).fill(0);
var gAllLoansOshEffect=new Array(gmaxmonth).fill(0);
// var gOshBallance=new Array(gmaxmonth).fill(0);
var gAssetHonTtypesOshEffect=new Array(gmaxmonth).fill(0);
var gAssetNadlanInvestTtypesOshEffect=new Array(gmaxmonth).fill(0);
var gOshRecordsSum=new Array(gmaxmonth).fill(0);
var gOshTotal=new Array(gmaxmonth).fill(0);
var gAssetHonTtypesSum=new Array(gmaxmonth).fill(0);
var gLoanBallanceSum=new Array(gmaxmonth).fill(0);



function fSetAllListPergmaxmonth(){
     gAllAssetsOshEffect=new Array(gmaxmonth).fill(0);
    // var gOshBallance=new Array(gmaxmonth).fill(0);
    gAssetHonTtypesOshEffect=new Array(gmaxmonth).fill(0);
    gAssetNadlanInvestTtypesOshEffect=new Array(gmaxmonth).fill(0);

     gOshRecordsSum=new Array(gmaxmonth).fill(0);
     gOshTotal=new Array(gmaxmonth).fill(0);


     gAssetHonTtypesSum=new Array(gmaxmonth).fill(0);
     gLoanBallanceSum=new Array(gmaxmonth).fill(0);

}
fSetAllListPergmaxmonth()

function gfcleanNansWithZeros(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(arr[i])) {
      arr[i] = 0;
    }
  }
}

// ****************update end date simulation control in ui
const currentDate = new Date(); // Step 1: Get the current date
currentDate.setMonth(currentDate.getMonth() + gmaxmonth); // Step 2: Add gmaxmonth to the current date

// Step 3: Format the date to YYYY-MM-DD
const formattedDate = currentDate.toISOString().split('T')[0];

// Step 4: Set the value of the date input
document.getElementById('form-field-SimulationEndDateId').value = formattedDate;

EndDateSimilaionDateFormButtonId
document.getElementById('EndDateSimilaionDateFormButtonId').style.display = 'none'; // Hide the button1
// ****************update end date simulation control in ui




document.getElementById('form-field-SimulationEndDateId').addEventListener('blur', function() {
    const selectedDate = new Date(this.value);
    const currentDate = new Date();
    
    // Calculate the difference in months
    let months;
    months = (selectedDate.getFullYear() - currentDate.getFullYear()) * 12;
    months -= currentDate.getMonth();
    months += selectedDate.getMonth();
    months = months <= 0 ? 0 : months; // Ensure the difference is not negative
    
    // Update gmaxmonth
    if( isNaN(months) || months<=0)
        {
            alert("תאריך לא תקין")
        }
        else{
            gmaxmonth = months;
            //call function that updated all listd depending on gmaxtotal
            fSetAllListPergmaxmonth()
            console.log("gmaxmonth:",gmaxmonth)
            gReadFromDbAllAssetRecords();
        }
       
    // If you have any functions that need to be called to update UI or calculations based on the new gmaxmonth, call them here
});

function garraysEqual(a, b) {
    console.log("fd:","garraysEqual")
    if (a.length !== b.length) return false;

    return a.every((val, index) => val === b[index]);
}
function gPlotHonAndLoanOverTime(lDivChart){
    console.log("fd:","gPlotHonAndLoanOverTime")
    console.log("HONNN:", gAssetHonTtypesSum)
   console.log("HONNN:", gAssetHonTtypesSum)
   
   const difference = [];
   for (let i = 0; i < gAssetHonTtypesSum.length; i++) {
       difference.push(gAssetHonTtypesSum[i] + gLoanBallanceSum[i]);
   }

   // Plotly chart for gAssetHonTtypesSum (green)
   var trace1 = {
    x: generateDateList(gmaxmonth),
    y: gAssetHonTtypesSum,
    type: 'scatter',
    mode: 'lines',
    line: {
        color: 'green'
    },
    name: 'נכסי הון'
    };
    
    // Plotly chart for gLoanBallanceSum (red)
    var trace2 = {
        x: generateDateList(gmaxmonth),
        y: gLoanBallanceSum,
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'red'
        },
        name: 'התחייבויות'
    };

    // Plotly chart for gLoanBallanceSum (red)
    var trace3 = {
        x: generateDateList(gmaxmonth),
        y: difference,
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'orange'
        },
        name: 'הון נטו'
    };

    var layout = {
       
        title: {
            text:'הון והתחייבויות',
           
            font: {
                size: 18,   // Font size for the title
                family: 'Frank Ruhl Libre',  // Font family (optional)
                color: 'black',  // Font color (optional)
                weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
            }
        },
        xaxis: {
            // title: 'חודשים' // X-axis name
            type:'date',
            tickfont: {
                family: 'Frank Ruhl Libre',
          size: 14, // Set font size
          weight: 'bold' // Set font weight to bold
            },
            title: {
                text: 'תאריך',
                font: {
                    size: 20,   // Font size for the title
                    //family: 'Frank Ruhl Libre',  // Font family (optional)
                    family: 'Frank Ruhl Libre',
                    color: 'black',  // Font color (optional)
                    weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                }
            }
        },
    
        yaxis: {
            tickfont: {
                family: 'Frank Ruhl Libre',
          size: 14, // Set font size
          weight: 'bold' // Set font weight to bold
            },
            title: {
                text: 'שווי בש"ח',
                font: {
                    size: 20,   // Font size for the title
                    //family: 'Frank Ruhl Libre',  // Font family (optional)
                    family: 'Frank Ruhl Libre',
                    color: 'black',  // Font color (optional)
                    weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                }
            }
        },
        height: 400,
        autosize: true,
        // width:500
        // Your layout options
    };

    // Combine traces into a data array
    var data = [trace1, trace2,trace3];

    // Plot the charts
    Plotly.newPlot(lDivChart, data, layout,{responsive: true});
        
}

function gPlotLoanOverTime(lDivChart){
    
     console.log("fd:","gPlotLoanOverTime")
     // Plotly chart for gLoanBallanceSum (red)
     var trace2 = {
         x: generateDateList(gmaxmonth),
         y: gLoanBallanceSum,
         type: 'scatter',
         mode: 'lines',
         line: {
             color: 'red'
         },
         name: 'התחייבויות'
     };
 
     
 
     var layout = {
        
         title: {
             text:'יתרת התחייבויות לאורך זמן',
            
             font: {
                 size: 18,   // Font size for the title
                 family: 'Frank Ruhl Libre',  // Font family (optional)
                 color: 'black',  // Font color (optional)
                 weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
             }
         },
         xaxis: {
             // title: 'חודשים' // X-axis name
             type:'date',
             tickfont: {
                 family: 'Frank Ruhl Libre',
           size: 14, // Set font size
           weight: 'bold' // Set font weight to bold
             },
             title: {
                 text: 'תאריך',
                 font: {
                     size: 20,   // Font size for the title
                     //family: 'Frank Ruhl Libre',  // Font family (optional)
                     family: 'Frank Ruhl Libre',
                     color: 'black',  // Font color (optional)
                     weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                 }
             }
         },
     
         yaxis: {
             tickfont: {
                 family: 'Frank Ruhl Libre',
           size: 14, // Set font size
           weight: 'bold' // Set font weight to bold
             },
             title: {
                 text: 'שווי בש"ח',
                 font: {
                     size: 20,   // Font size for the title
                     //family: 'Frank Ruhl Libre',  // Font family (optional)
                     family: 'Frank Ruhl Libre',
                     color: 'black',  // Font color (optional)
                     weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                 }
             }
         },
         height: 400,
         autosize: true,
         // width:500
         // Your layout options
     };
 
     // Combine traces into a data array
     var data = [trace2];
 
     // Plot the charts
     Plotly.newPlot(lDivChart, data, layout,{responsive: true});
         
 }



function gPlotHonAndLoanOverTime1(lDivChart){
    console.log("fd:","gPlotHonAndLoanOverTime1")
    // Plotly chart for gAssetHonTtypesSum (green)
    var trace1 = {
     x: generateDateList(gmaxmonth),
     y: gAssetHonTtypesSum,
     type: 'scatter',
     mode: 'lines',
     line: {
         color: 'green'
     },
     name: 'נכסי הון'
     };
    
     var layout = {
        
         title: {
             text:'הון והתחייבויות',
            
             font: {
                 size: 18,   // Font size for the title
                 family: 'Frank Ruhl Libre',  // Font family (optional)
                 color: 'black',  // Font color (optional)
                 weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
             }
         },
         xaxis: {
             // title: 'חודשים' // X-axis name
             type:'date',
             tickfont: {
                 family: 'Frank Ruhl Libre',
           size: 14, // Set font size
           weight: 'bold' // Set font weight to bold
             },
             title: {
                 text: 'תאריך',
                 font: {
                     size: 20,   // Font size for the title
                     //family: 'Frank Ruhl Libre',  // Font family (optional)
                     family: 'Frank Ruhl Libre',
                     color: 'black',  // Font color (optional)
                     weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                 }
             }
         },
     
         yaxis: {
             tickfont: {
                 family: 'Frank Ruhl Libre',
           size: 14, // Set font size
           weight: 'bold' // Set font weight to bold
             },
             title: {
                 text: 'שווי בש"ח',
                 font: {
                     size: 20,   // Font size for the title
                     //family: 'Frank Ruhl Libre',  // Font family (optional)
                     family: 'Frank Ruhl Libre',
                     color: 'black',  // Font color (optional)
                     weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                 }
             }
         },
        //  height: 380,
         autosize: true,
         // width:500
         // Your layout options
     };
 
     // Combine traces into a data array
     var data = [trace1];
    //  var data = [trace1, trace2,trace3];
 
     // Plot the charts
     Plotly.newPlot(lDivChart, data, layout,{responsive: true});
         
 }

function sumLists(list1, list2) {
    console.log("fd:","sumLists")
    const maxLength = Math.max(list1.length, list2.length);
    const sum = [];

    for (let i = 0; i < maxLength; i++) {
        const value1 = i < list1.length ? list1[i] : 0;
        const value2 = i < list2.length ? list2[i] : 0;
        sum.push(parseInt(value1) + parseInt(value2));
    }

    return sum;
}

function gfAllZero(list) {
    console.log("fd:","gfAllZero")
    // Iterate over the elements of the list
    for (var i = 0; i < list.length; i++) {
        // If any element is not equal to zero, return false
        if (list[i] !== 0) {
            return false;
        }
    }
    // If all elements are zero, return true
    return true;
}

function gfcalcTotalOshAndplot(){
    console.log("fd:","gfcalcTotalOshAndplot")
    // console.log("gOshRecordsSum in calc total:",gOshRecordsSum)
    for (var i = 0; i < gOshTotal.length; i++) {
        // Add the corresponding elements and store the result in the sum list
        gOshTotal[i] = gAllAssetsOshEffect[i] + gAllLoansOshEffect[i];
    }
    
    fCalcOshCashFlow()
  
    // gPlotValuesOverTime(gOshTotal,'יתרת חשבון בנק על פני זמן ','OshgraphInGridId')
    // // barak
    // gPlotValuesOverTime(gOshTotal,'יתרת חשבון בנק על פני זמן ','testTotalOshChartId')
    // gPlotHonAndLoanOverTime('zingermarkerid')
    gPlotLoanOverTime('loanOverTimeSumId')

    
    // console.log("gOshTotal:",gOshTotal)

}


function gPlotValuesOverTime(lAssetHonTtypesSum,lTitleText,lDivId)
{
    console.log("fd:","gPlotValuesOverTime")
    var data = [
        {
            y: lAssetHonTtypesSum,
            x: generateDateList(gmaxmonth),
            type: 'scatter',
            mode: 'lines',
            // name: 'ללא התחשבות בנזילות',
            line: {
                color: 'blue' // Set line color to blue
            }
        },
    ];
    
    // Layout configuration for the line chart
    var layout = {
        // plot_bgcolor: '#e8ebed', // Set the background color of the plot area
        // paper_bgcolor: '#f5f5f5',
        // border: {
        //     // color: 'blue',  // Border color
        //     // width: 10,        // Border width
        //     // dash: 'solid'    // Border style (solid, dashed, dotted, etc.)
        // },
        // margin: {
        //     // l: 80,  // left margin
        //     // r: 50,  // right margin
        //     // b: 70,  // bottom margin
        //     // t: 90   // top margin
        // },
    
        title: {
            text: lTitleText,
           
            font: {
                size: 26,   // Font size for the title
                family: 'Frank Ruhl Libre',  // Font family (optional)
                color: 'black',  // Font color (optional)
                weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
            }
        },
    
        xaxis: {
            // title: 'חודשים' // X-axis name
            type:'date',
            tickfont: {
                family: 'Frank Ruhl Libre',
          size: 14, // Set font size
          weight: 'bold' // Set font weight to bold
            },
            title: {
                text: 'תאריך',
                font: {
                    size: 20,   // Font size for the title
                    //family: 'Frank Ruhl Libre',  // Font family (optional)
                    family: 'Frank Ruhl Libre',
                    color: 'black',  // Font color (optional)
                    weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                }
            }
        },
    
        yaxis: {
            tickfont: {
                family: 'Frank Ruhl Libre',
          size: 14, // Set font size
          weight: 'bold' // Set font weight to bold
            },
            title: {
                text: 'שווי בש"ח',
                font: {
                    size: 20,   // Font size for the title
                    //family: 'Frank Ruhl Libre',  // Font family (optional)
                    family: 'Frank Ruhl Libre',
                    color: 'black',  // Font color (optional)
                    weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                }
            }
        },
    
        //  height: 380,
         autosize: true,
        //  width:500
        // height: '100%'
         //width:'100%'
    };
    
    // lCurrentStyle=document.getElementById(lDivId).style.display
    // document.getElementById(lDivId).style.display="blobk"
    // document.getElementById(lDivId).style.width = '100%'
   
    // Plot the chart
    Plotly.newPlot(lDivId, data, layout,{scrollZoom: true,responsive: true});
    // document.getElementById(lDivId).style.display=lCurrentStyle
}


function gPlotTotalOshAndLimit(lAssetHonTtypesSum,lTitleText,lDivId)
{
    console.log("fd:","gPlotTotalOshAndLimit")
    var lOshLimit=parseInt(document.getElementById("form-field-OshribitMinusRamp3Id").value)
    // console.log("lOshLimit:",lOshLimit)
    var data = [
        {
            y: lAssetHonTtypesSum,
            x: generateDateList(gmaxmonth),
            type: 'scatter',
            mode: 'lines',
            name: 'יתרה  ',
            line: {
                color: 'blue' // Set line color to blue
            }
        },
        {
            y: new Array(lAssetHonTtypesSum.length).fill(-lOshLimit),
            x: generateDateList(gmaxmonth),
            type: 'scatter',
            mode: 'lines',
            name:'מסגרת',
            line: {
                color: 'red', // Set line color to red
                dash: 'dot' // Set line style to dotted
            }
        }
    ];
    
    // Layout configuration for the line chart
    var layout = {
           
        title: {
            text: lTitleText,
           
            font: {
                size: 26,   // Font size for the title
                family: 'Frank Ruhl Libre',  // Font family (optional)
                color: 'black',  // Font color (optional)
                weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
            }
        },
    
        xaxis: {
            // title: 'חודשים' // X-axis name
            type:'date',
            tickfont: {
                family: 'Frank Ruhl Libre',
          size: 14, // Set font size
          weight: 'bold' // Set font weight to bold
            },
            title: {
                text: 'תאריך',
                font: {
                    size: 20,   // Font size for the title
                    //family: 'Frank Ruhl Libre',  // Font family (optional)
                    family: 'Frank Ruhl Libre',
                    color: 'black',  // Font color (optional)
                    weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                }
            }
        },
    
        yaxis: {
            tickfont: {
                family: 'Frank Ruhl Libre',
          size: 14, // Set font size
          weight: 'bold' // Set font weight to bold
            },
            title: {
                text: 'שווי בש"ח',
                font: {
                    size: 20,   // Font size for the title
                    //family: 'Frank Ruhl Libre',  // Font family (optional)
                    family: 'Frank Ruhl Libre',
                    color: 'black',  // Font color (optional)
                    weight: 'bold'  // Font weight (e.g., 'normal', 'bold')
                }
            }
        },
    
        //  height: 380,
        autosize: true,
       
    };
    
       
    // Plot the chart
    Plotly.newPlot(lDivId, data, layout,{scrollZoom: true,responsive: true});
    // document.getElementById(lDivId).style.display=lCurrentStyle
   
}

function gCopyChartAndaddTitleToReport(SourceChart,DestinationChart,SourceText,DestinationText,bUpdatetext,Newtext)
{
    console.log("fd:","gCopyChartAndaddTitleToReport")
             // Get the SourceChart element
        var sourceChartElement = document.getElementById(SourceChart);

        
        
        Plotly.toImage(SourceChart, {format: 'png'}).then(function(dataUrl) {
            // Create an img element
            var img = document.createElement('img');
        
            // Set the src attribute to the data URL
            img.src = dataUrl;
        
            
           // Get the DestinationChart element
            var destinationChartelement = document.getElementById(DestinationChart);

            // Append the new image to the DestinationChart
            destinationChartelement.innerHTML = '';
            destinationChartelement.appendChild(img);
        }).catch(function(error) {
            // Handle any errors
            console.error(error,SourceChart,DestinationChart);
        });
        

        

        // Get the SourceText element
        var sourceTextElement = document.getElementById(SourceText);
        // console.log("newtext:",Newtext)
        // console.log("1sourceTextElement:",sourceTextElement.style)       // Clone the SourceText element
        var clonedText = sourceTextElement.cloneNode(true);
        


        // If bUpdatetext is true, update the cloned text element with Newtext
        if (bUpdatetext) {
            // clonedText.textContent = Newtext;
            clonedText.innerHTML = Newtext;
        }
        clonedText.style.fontSize = '26px';
        // clonedText.style.textAlign = 'left';

        

                // var style1 = sourceTextElement.style
                // var style2 = clonedText.style
                
                // // // Convert CSSStyleDeclaration to object
                // // var style1Obj = {};
                // // var style2Obj = {};
                // // for (var i = 0; i < style1.length; i++) {
                // //     style1Obj[style1[i]] = style1.getPropertyValue(style1[i]);
                // // }
                // // for (var i = 0; i < style2.length; i++) {
                // //     style2Obj[style2[i]] = style2.getPropertyValue(style2[i]);
                // // }
                
                // // // Initialize an object to store the differences
                // // var differences = {};
                
                // // Iterate over the properties of the first element's style
                // for (var property in style1) {
                //     // If the property exists in the style of the second element and its value is different
                //     // if (style2Obj[property] && style1Obj[property] !== style2Obj[property]) {
                //     //     // Add the property and its values in both elements to the differences object
                //     //     differences[property] = {
                //     //         element1: style1Obj[property],
                //     //         element2: style2Obj[property]
                //     //     };
                //     // }
                //     if (style1[property] !== style2[property])
                //         {
                //             console.log("s1 property:",style1[property])
                //             console.log("s2 property:",style2[property])
                //         }
                         
                // }
                // console.log("differences:", differences);

        // Append the cloned text to the DestinationChart
        DestinationTextelement= document.getElementById(DestinationText);
        DestinationTextelement.innerHTML = '';
        DestinationTextelement.appendChild(clonedText);
 }