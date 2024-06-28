
//console.log("start main.js")
// document.addEventListener("DOMContentLoaded", function() {
//     // Get the element with the id "greeting"
//     var greetingElement = document.getElementById("greeting");

//     // Set the text content to "Hello Barak"
//     greetingElement.textContent = "Hello Barak the king";
// });




//<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

//<script>
console.log("main js ver 18")



//loan
//hide at start
document.getElementById("LoanFormId").style.display="none"
document.getElementById("masterofAllLoanDivId").style.display="none"  
document.getElementById("LoanGraphsId").style.display = "none";  
//show at start
document.getElementById("LoanDummyId").style.display="none"
document.getElementById("Loan-tables-container").style.display="none"
document.getElementById("readNetunayAshrayId").style.display="none" 
document.getElementById('LoadLoanFileCheckBoxId').style.display = "block";
document.getElementById('excelFile').style.display = "none";

//asset
//hide at start
var gAssetHonFormContainer= document.getElementById("newAssetHonFormId")
gAssetHonFormContainer.style.display="block"	// hide container of the asset hon form	
var gAssedAreaSectionId =	document.getElementById("masterofAllAssetDivId"); // 
gAssedAreaSectionId.style.display="none"
document.getElementById("AssetGraphsId").style.display="none"
document.getElementById("Asset-tables-container").style.display="none"
document.getElementById("AssetReadMislakaAreaId").style.display="none"
document.getElementById("BituachFormButtonID").style.display = "none";


//show at start

document.getElementById("testnewdummy").style.display="none"

//osh
//hide at start
document.getElementById("OshgraphInGridId").style.display="none"
document.getElementById("oshHoverhelpId").style.display="none"
document.getElementById("OshBarGraphId").style.display="none"
document.getElementById("LoadOshFileId").style.display="none"
// hide select bank form button
document.getElementById("OshSelectBankFieldButtonId").style.display = "none";
document.getElementById("LoadOshFileId").style.display = "none";
document.getElementById('OshexcelFileId').style.display="none"

// reportSummery

document.getElementById("ReportToFamilyId").style.display="block"
// 


function createPdfFromElements(id1, id2) {
    var element1 = document.getElementById(id1);
    var element2 = document.getElementById(id2);

    if (!element1 || !element2) {
        console.error('One or both elements could not be found');
        return;
    }

    // Add spinner
    var loadingSpinner = document.createElement('div');
    loadingSpinner.style.position = 'fixed';
    loadingSpinner.style.top = '50%';
    loadingSpinner.style.left = '50%';
    loadingSpinner.style.transform = 'translate(-50%, -50%)';
    loadingSpinner.style.border = '16px solid #f3f3f3';
    loadingSpinner.style.borderTop = '16px solid #3498db';
    loadingSpinner.style.borderRadius = '50%';
    loadingSpinner.style.width = '120px';
    loadingSpinner.style.height = '120px';
    loadingSpinner.style.animation = 'spin 2s linear infinite';
    document.body.appendChild(loadingSpinner);

    // Add spinner text
    var spinnerText = document.createElement('div');
    spinnerText.textContent = 'Generating report...';
    spinnerText.style.position = 'fixed';
    spinnerText.style.top = 'calc(50% + 60px)'; // position it below the spinner
    spinnerText.style.left = '50%';
    spinnerText.style.transform = 'translate(-50%, -50%)';
    spinnerText.style.color = '#3498db';
    document.body.appendChild(spinnerText); // append it to the body, not the spinner

    // Add spinner animation
    var style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    var doc = new jsPDF();

    var pageWidth = doc.internal.pageSize.getWidth();
    var imgWidth = pageWidth * 0.45; // 45% of page width for each image

    var x1 = pageWidth * 0.05; // 5% from left
    var x2 = pageWidth * 0.5; // 50% from left

    // Add title
    doc.setFontSize(20);
    doc.text('Summery Report', pageWidth / 2, 20, { align: 'center' });
	// setTimeout(function() {console.log("wait")}, 1000);

    html2canvas(element1).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var scale = imgWidth / canvas.width;
        var imgHeight = canvas.height * scale;

        doc.addImage(imgData, 'PNG', x1, 30, imgWidth, imgHeight);
		console.log("imgData",imgData)

        return html2canvas(element2);
    }).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var scale = imgWidth / canvas.width;
        var imgHeight = canvas.height * scale;

        doc.addImage(imgData, 'PNG', x2, 30, imgWidth, imgHeight);

        var pdfData = doc.output('datauristring');

        var newWindow = window.open("", "_blank");
        newWindow.document.write('<iframe src="' + pdfData + '" width="100%" height="100%"></iframe>');
        newWindow.document.close();

        // Remove spinner and text
        document.body.removeChild(loadingSpinner);
        document.body.removeChild(spinnerText);
    });
}
function createPdfFromOneElement(id) {
    var element = document.getElementById(id);
	console.log("id:",id,"element",element)

    if (!element) {
        console.error('Element could not be found');
        return;
    }

    // Create a modal element to display the message
    var modalElement = document.createElement('div');
    modalElement.textContent = 'Creating PDF...';
    modalElement.style.position = 'fixed';
    modalElement.style.width = '300px';
    modalElement.style.height = '300px';
    modalElement.style.top = '50%';
    modalElement.style.left = '50%';
    modalElement.style.transform = 'translate(-50%, -50%)';
    modalElement.style.backgroundColor = '#fff';
    modalElement.style.padding = '20px';
    modalElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    modalElement.style.textAlign = 'center';
    document.body.appendChild(modalElement);

    var doc = new jsPDF('p', 'pt', 'a4');

    // Add title
    doc.setFontSize(20);
    doc.text('Summery Report', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    html2canvas(element).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');

        var pageWidth = doc.internal.pageSize.getWidth();
        var pageHeight = doc.internal.pageSize.getHeight() - 30; // Subtracting 30 to accommodate for the title

        var imgWidth = canvas.width;
        var imgHeight = canvas.height;

        var widthRatio = (pageWidth * 0.9) / imgWidth; // Adjusting for 5% margin on each side

        var scaledWidth = imgWidth * widthRatio;
        var scaledHeight = imgHeight * widthRatio;

        var x = (pageWidth - scaledWidth) / 2;
        var y =  30; // Adding 30 to accommodate for the title

        console.log("pageWidth",pageWidth,"pageHeight",pageHeight,"imgWidth",imgWidth,"imgHeight",imgHeight,"widthRatio",widthRatio,"scaledWidth",scaledWidth,"scaledHeight",scaledHeight,"x",x,"y",y)
        doc.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

        var pdfData = doc.output('datauristring');

        var newWindow = window.open("", "_blank");
        newWindow.document.write('<iframe src="' + pdfData + '" width="100%" height="100%"></iframe>');
        newWindow.document.close();

        // Remove the modal
        document.body.removeChild(modalElement);
    });
}

// // add event listener to a button
// document.getElementById("ReportSummerryOpenButtonId").addEventListener("click", function() {
//     createPdfFromOneElement("ReportSummerryId");
// });
// add event listener to a button
// document.getElementById("ReportSummerryOpenButtonId").addEventListener("click", function() {
	
// 	// Calculate the position for the new window to be in the center
//     var left = (screen.width/2)-400;
//     var top = (screen.height/2)-400;

//     // Open a new window in the center of the screen
//     var newWindow = window.open("", "", "width=800,height=800,left="+left+",top="+top);

//     // Show a message in the new window
//     newWindow.document.body.innerHTML = '<p style="font-size:36px; color:blue; text-align:center; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">Building report...</p>';

// 	// createPdfFromOneElement("ReportToFamilyId")
// 	var element = document.getElementById('ReportToFamilyId');
// 	element.style.display = "block";
// 	html2canvas(element).then(function(canvas) {
//     var imgData = canvas.toDataURL('image/png');
//     var pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
	
// 	var width = pdf.internal.pageSize.getWidth();
//     var height = pdf.internal.pageSize.getHeight();
//     pdf.addImage(imgData, 'PNG', 0, 0, width, height);
	
// 	pdf.save('download.pdf');
// 	// Create a Blob from the PDF stream
//     var blob = pdf.output('blob');

//     // Create an object URL from the Blob
//     var url = URL.createObjectURL(blob);

//     // Open the URL in a new window
//     window.open(url, '_blank');
// 	element.style.display = "none";
// 	newWindow.close();
// });

// })

document.getElementById("ReportSummerryOpenButtonId").addEventListener("click", function() {
    // Calculate the position for the new window to be in the center
    var left = (screen.width/2)-400;
    var top = (screen.height/2)-400;

    // Open a new window in the center of the screen
    var newWindow = window.open("", "", "width=800,height=800,left="+left+",top="+top);

    // Show a message in the new window
    newWindow.document.body.innerHTML = '<p style="font-size:36px; color:blue; text-align:center; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);">Building report...</p>';

    // createPdfFromOneElement("ReportToFamilyId")
    var element = document.getElementById('ReportToFamilyId');
    element.style.display = "block";
    html2canvas(element).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);

        // Add a new page for the AssetGraphs section
        pdf.addPage();

        // Capture and add the AssetGraphs section
        var assetGraphsElement = document.getElementById('AssetGraphsId');
        assetGraphsElement.style.display = "block";
        
		html2canvas(assetGraphsElement,{scale:2}).then(function(canvas) {
        
			var imgData = canvas.toDataURL('image/png');
			console.log("imgData",imgData)
            pdf.addImage(imgData, 'PNG', 0, 0, width, height); // Add the image to the new page

            // Finalize the PDF after adding all content
            pdf.save('download.pdf');

            // Clean up: Hide elements and close the new window
            assetGraphsElement.style.display = "none";
            element.style.display = "none";
            newWindow.close();

            // Optionally, open the PDF in a new tab (similar to before)
            var blob = pdf.output('blob');
            var url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        });
    });
});


//general

document.getElementById("SendCommandToDbArrayFormId").style.display="none"
document.getElementById("allgraphsTogetherId").style.display="block"
// document.getElementById("loading-overlay").style.display="none"
document.getElementById("loading-overlay").style.visibility = "hidden";
document.getElementById("testbuttonid").style.display="none"

// // global variables //////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////	
console.log("first line of js")
// var gAssetHonFormContainer= document.getElementById("newAssetHonFormId")
// gAssetHonFormContainer.style.display="none"	// hide container of the asset hon form	

// TTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEMMMMMMMMMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPPPPPPP delete soon as possible
// ltemp=document.getElementById("testnewdummy")  
// const lmyimageElements = ltemp.querySelectorAll('.elementor-widget-image'); 

// lmyimageElements.forEach(function(imageElement) {
//     // Log the ID of each image element
//     console.log(imageElement.id);
// });
// TTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEEEEMMMMMMMMMMMMMMMMMMPPPPPPPPPPPPPPPPPPPPPPPPPP delete soon as possible




//general related
document.getElementById("click-to-add").addEventListener("click", function() {
    // Open a new window with the form
	// <title>windowTitle</title>
	var windowTitle="Insert title here"
    var newWindow = window.open("", windowTitle, "width=600,height=400");
	
	newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${windowTitle}</title> <!-- Set the window title -->
        </head>
        <body>
            <form id="myForm">
                <!-- Your form fields here -->
                <input type="text" name="inputField">
                <button type="submit">Submit</button>
            </form>

            <script>
                document.getElementById("myForm").addEventListener("submit", function(event) {
                    event.preventDefault(); // Prevent the default form submission

                    // Get form data
                    var formData = new FormData(this);

                    // Pass form data back to the opener (Page 1)
                    window.opener.handleFormSubmission(formData);

                    // Close the current window
                    window.close();
                });
            </script>
        </body>
        </html>
    `);

    // Pass a reference of the current window to the new window
    newWindow.opener = window;
});
// Function to handle form submission data
function handleFormSubmission(formData) {
    // Access and process the form data here
    console.log("Form data submitted:", formData);
	var inputValue = formData.get("inputField");
    
    // Log the input field value to the console
    console.log("Input field value:", inputValue);
    // You can perform further actions with the form data, such as updating the page content, etc.
}


// possible values: "after_load","after_server_answer","new_record","delete_record","edit_pension_rec","edit_hon_rec"
var gState = "before_load"


//var gDispalyUserDataGraphArea= document.getElementById("displayAreaForUserId")

// backend and db related
var gDataBaseActionTypeId =  document.getElementById ("form-field-DataBaseActionTypeId")// field to define to server what action to take
var gToDbRecSnId = document.getElementById("form-field-ToDbRecSnId")
var gDataBaseActionTypeId = document.getElementById("form-field-DataBaseActionTypeId")
var gDataBaseActionClickBtnId = document.getElementById("DataBaseActionClickBtnId")	
var gDbComunicationFormId = document.getElementById("DbComunicationFormId")	


//asset related
// var gAssedAreaSectionId =	document.getElementById("masterofAllAssetDivId"); // 
// gAssedAreaSectionId.style.display="none"
const assetList = []; // Define the initial assetList array

const globalAssetsHonSet = new Set(["ביטוח מנהלים הוני","נכס כללי","פיקדון בנקאי","קרן השתלמות","קופת גמל הונית","תוכנית ביטוח לחיסכון","תיק השקעות","מטבע דיגיטלי","תוכנית חיסכון","חיסכון לכל ילד","קופת גמל להשקעה"]);
const globalAssetsPensionSet = new Set(["קופת גמל לקצבה","קרן פנסיה","ביטוח מנהלים קצבתי"]);	
const globalAssetsNadlanSet = new Set(["רכב","דירה למגורים","נכס נדלן"]);	
const globalAssetsNadlanInvestSet = new Set(["דירה להשקעה","נכס דיגיטלי מניב","נדלן מניב"]);
const globalAssetsBituachSet = new Set([  "ביטוח-פנסית נכות","ביטוח-כיסוי למקרה מוות","ביטוח-נכות מקצועית","ביטוח-מוות מתאונה","ביטוח-נכות מתאונה","ביטוח-אבדן כושר עבודה","ביטוח-שחרור","ביטוח-מחלות קשות","ביטוח-תוכנית משולבת חיסכון","ביטוח- מוות + אכ\"ע","ביטוח- אחר"])
      

const globalAssetsSet = new Set();
globalAssetsHonSet.forEach(element => globalAssetsSet.add(element));
globalAssetsPensionSet.forEach(element => globalAssetsSet.add(element));
globalAssetsNadlanSet.forEach(element => globalAssetsSet.add(element));
globalAssetsNadlanInvestSet.forEach(element => globalAssetsSet.add(element));

var gdummyAssetElement=document.getElementById("dummyAsset")//dummy Column for row 1 in asset icons
var gdummyAsset2Element=document.getElementById("dummyAsset2")//dummy Column for row 2 in asset icons
var gdummyAsset3Element=document.getElementById("dummyAsset3")//dummy Column for row 3 in asset icons
// var gAssetAreaCheckbobShowhideid = document.getElementById("AssetAreaCheckbobShowhideid");//check box for hide asset section
var gAssetSellectAssetToAddFormElement = document.getElementById("assetSellectAssetToAddFormId");//select asset to add into asset area
var gAssetSectionIconArea = document.getElementById("AssetIconsAreaParentdivId");// row 1 in asset icons
var gassetSectionIconArea2 = document.getElementById("AssetIconsAreaParentdiv2Id");// row 1 in asset icons
var gassetSectionIconArea3 = document.getElementById("AssetIconsAreaParentdiv3Id");// row 1 in asset icons
var gAssetNameToInsert =  document.getElementById("form-field-assetName"); 

// asset type hon related
var gAssetHonTypeUserInputFormButton=document.getElementById("assetHonTypeUserInputFormButtonID")
var gAssetHonFormMakorHafkada = document.getElementById("form-field-makorHafkataHodshitId");
var gAssetHonFormIsAMonthlyPaymant = document.getElementById("form-field-IsAMonthlyPaymantId");
var gAssetHonHafkadaHodshit = document.getElementsByClassName("elementor-field-group-hafkadaHodshitId");
var gAssetHonEndHafkada = document.getElementsByClassName("elementor-field-group-endMonthPaymantId");
var gAssetHonMakorHafkada = document.getElementsByClassName("elementor-field-group-makorHafkataHodshitId");
var gAssetHonFormContainer= document.getElementById("newAssetHonFormId")


// asset type pension related
var gAssetPensionTypeUserInputFormButton=document.getElementById("assetPensionTypeUserInputFormButtonID")						
var gAssetPensionHafkadaHodshit = document.getElementsByClassName("elementor-field-group-hafkadaHodshitPensionId");
var gAssetPensionEndHafkada = document.getElementsByClassName("elementor-field-group-endMonthPaymantPensionId");
var gAssetPensionMakorHafkada = document.getElementsByClassName("elementor-field-group-makorHafkataHodshitPensiaId");

const gAsstHonForm = document.getElementById('AssetHonFormID'); // the asstHon Form id
const gAsstNadlanForm = document.getElementById('AssetNadlanFormID'); // the asstHon Form id
const gAsstNadlanInvestForm = document.getElementById('AssetNadlanInvestFormID'); // the asstHon Form id
const	gAssetPensionForm = document.getElementById('AssetPensionFormID'); // the asstHon Form id
	
var gcancelAssetHonBtn = document.getElementById('cancelFormAssethonId'); // the X icon to close the form
var gsaveFormAssethonId=document.getElementById('saveFormAssethonId');//asset hon form "styled" button (the original form button hard to style)
var gselectAssetHonSaveBtn = document.getElementById('selectAssetHonSaveBtn');//get id of the ok button of the form that user sellect an asset to add
	

// setup  all needed elements on loading/////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//general related
gDbComunicationFormId.style.display = "none"; //hide communcation with db form 
gDataBaseActionClickBtnId.style.display= "none";//hide Data Base Action Click Btn 
//gDispalyUserDataGraphArea.style.display="none"	//hide graph area

//asset related
// gdummyAssetElement.style.display = "none"; //hide dummy Column for row 1 in asset icons
// gdummyAsset2Element.style.display = "none";//hide dummy Column for row 2 in asset icons
// gdummyAsset3Element.style.display = "none";//hide dummy Column for row 3 in asset icons
// hide first select of assetnameToInsert select	
if (gAssetNameToInsert && gAssetNameToInsert.options.length > 0) {
  gAssetNameToInsert.options[0].hidden = true;
}

//asset hon related

//document.getElementById("AssetChartsAreaId").style.display="none"

// 



gSummeryAreaCheckbobShowhideid=document.getElementById("CurrentStatusSummeryCheckBoxId")  

// document.getElementById("allgraphsTogetherId").style.display="none"
gSummeryAreaCheckbobShowhideid.addEventListener("click", function() {

	// Check if the checkbox is checked
    if (gSummeryAreaCheckbobShowhideid.src == "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/zinger_black_down_arrow.jpeg") {
        // If checked, show the div
        gSummeryAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/05/zinger_black_left_arrow.jpg"
		document.getElementById("allgraphsTogetherId").style.display = "none";
    } else {
        // If unchecked, hide the div
		gSummeryAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/05/zinger_black_down_arrow.jpeg"
        document.getElementById("allgraphsTogetherId").style.display = "block";
    }
});


// "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/blue-left-arrow.jpg"
// https://barofi.dreamhosters.com/wp-content/uploads/2024/05/blue-right-arrow.jpg

var CheckBoxAssetGraphsCheckBoxId = document.getElementById("AssetGraphsCheckBoxId");
CheckBoxAssetGraphsCheckBoxId.addEventListener("click", function() {
    console.log("SRC:",CheckBoxAssetGraphsCheckBoxId.src)	
	if(gAssetRecordsList.length>0)
	{
		// Check if the checkbox is checked
		if (CheckBoxAssetGraphsCheckBoxId.src =="https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftArrowBAW.jpeg") {
			// If checked, show the div
			document.getElementById("AssetGraphsId").style.display = "block";
			document.getElementById("Asset-tables-container").style.display = "block";
			CheckBoxAssetGraphsCheckBoxId.src = "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/downArrow-1-e1715253798502.jpeg"
			
			console.log("checkeed")
		} else {
			// If unchecked, hide the div
			document.getElementById("AssetGraphsId").style.display = "none";
			document.getElementById("Asset-tables-container").style.display = "none";
			console.log("not checkeed")
			CheckBoxAssetGraphsCheckBoxId.src = "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftArrowBAW.jpeg"
		}
		fHandaleAssetRecords(gAssetRecordsList,false)
	}
});

// https://barofi.dreamhosters.com/wp-content/uploads/2024/05/blue-left-arrow.jpg
// ttps://barofi.dreamhosters.com/wp-content/uploads/2024/05/blue-right-arrow.jpg
var CheckBoxLoanGraphsCheckBoxId = document.getElementById("LoanGraphsCheckBoxId");
CheckBoxLoanGraphsCheckBoxId.addEventListener("click", function() {
    	
	if(gLoanRecordsList.length>0)
	{
		// Check if the checkbox is checked
		if (CheckBoxLoanGraphsCheckBoxId.src == "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftArrowBAW.jpeg") {
			// If checked, show the div
			document.getElementById("LoanGraphsId").style.display = "block";
			document.getElementById("Loan-tables-container").style.display = "block";
			CheckBoxLoanGraphsCheckBoxId.src = "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/downArrow-1-e1715253798502.jpeg"
			
			console.log("checkeed")
		} else {
			// If unchecked, hide the div
			document.getElementById("LoanGraphsId").style.display = "none";
			document.getElementById("Loan-tables-container").style.display = "none";
			CheckBoxLoanGraphsCheckBoxId.src = "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftArrowBAW.jpeg"
			console.log("not checkeed")
		}
		fHandaleLoanRecords(gLoanRecordsList,false)
	}
});





var CheckBoxAssetOshCheckBoxId = document.getElementById("OshGraphsCheckBoxId");
CheckBoxAssetOshCheckBoxId.addEventListener("click", function() {
    
	
	// console.log("is osh zero?",gfAllZero(gOshTotal))

	if(gfAllZero(gOshTotal)==false)
	{
		// Check if the checkbox is checked
		if (CheckBoxAssetOshCheckBoxId.src == "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftArrowBAW.jpeg") {
			// If checked, show the div
			document.getElementById("OshgraphInGridId").style.display = "block";
			console.log("checkeed")
			CheckBoxAssetOshCheckBoxId.src = "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/downArrow-1-e1715253798502.jpeg"
		} else {
			// If unchecked, hide the div
			document.getElementById("OshgraphInGridId").style.display = "none";
			console.log("not checkeed")
			CheckBoxAssetOshCheckBoxId.src = "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftArrowBAW.jpeg"
		}
		fHandaleAssetRecords(gAssetRecordsList,false)
	}
	


});







// var checkboxManagerStatus = document.getElementById("AssetSectionManagerStatusId");
// checkboxManagerStatus.addEventListener("change", function() {
//     // Check if the checkbox is checked
//     if (checkboxManagerStatus.checked) {
//         // If checked, show the div
//         document.getElementById("Asset-tables-container").style.display = "block";
//     } else {
//         // If unchecked, hide the div
//         document.getElementById("Asset-tables-container").style.display = "none";
//     }
// });




gAssetHonTypeUserInputFormButton.style.display = "none";//hide asset Hon Type User Input Form Button
	


// utility functions/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function gSetAssetFormToBeBituachType(){
	
	gShowHideAssetIconsArea("none")
	document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML="קליטת נכס ביטוח"
	gselectAssetHonSaveBtn.disabled = true;
	gAsstNadlanForm.style.display="none"
	gAsstNadlanInvestForm.style.display="none"
	gAsstHonForm.style.display="none"
	gAssetPensionForm.style.display="none"
	document.getElementById("BituachtFormID").style.display = "block";
							 
	
	document.getElementById("form-field-BituachDummy3").style.display = "none";
	document.getElementById("form-field-BituachDummy4").style.display = "none";
	document.getElementById("form-field-BituachSnId").style.display = "none";
	document.getElementById("form-field-BituachUserNameId").style.display = "none";	
	document.getElementById("form-field-BituachTypeId").style.display = "none";

	//get the value of the sellect asset element and put it in the form description field as default value
	document.getElementById("form-field-BituachDescriptionId").value=gAssetNameToInsert.value 

	// // set step size for controlers in the form
	document.getElementById("form-field-BituachHatPeami").step = 10000
	document.getElementById("form-field-BituachKitzbaId").step = 1000

	// // set dafault date as today to date controls  in the form
	// var currentDate = new Date();
	// var lformattedDate = currentDate.toISOString().split('T')[0];
	// document.getElementById("form-field-YitraNadlanRelevantDateId").value = lformattedDate
	// document.getElementById("form-field-taarichNezilutNadlanId").value = lformattedDate

	document.getElementById("form-field-BituachHatPeami").value=10000
	document.getElementById("form-field-BituachKitzbaId").value=1000
	document.getElementById("form-field-BituachSnId").value=""
	document.getElementById("form-field-BituachMisparPolisaId").value=""
	document.getElementById("form-field-BituachNameOwnerId").value=""

}

function gSetAssetFormToBeNadlanType()
{
	gShowHideAssetIconsArea("none")
	document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML="קליטת נכס נדלן"
	gselectAssetHonSaveBtn.disabled = true;
	gAsstNadlanForm.style.display="block"
	gAsstNadlanInvestForm.style.display="none"
	gAsstHonForm.style.display="none"
	gAssetPensionForm.style.display="none"
	
	document.getElementById("BituachtFormID").style.display = "none";

	//get the value of the sellect asset element and put it in the form description field as default value
	document.getElementById("form-field-assetNadlanDescriptionId").value=gAssetNameToInsert.value

	//hide type id field
	document.getElementById("form-field-AssetNadlanTypeId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetNadlanTypeId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

	//hide user name field
	document.getElementById("form-field-AssetNadlanUserNameId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetNadlanUserNameId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}
	// hide the serial number field
	document.getElementById("form-field-AssetNadlanSnId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetNadlanSnId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}
	
	//hide field that are not in use
	document.getElementById("form-field-AssetNadlandummy4").style.display = "none"; 
	document.getElementById("form-field-AssetNadlandummy5").style.display = "none"; 
	document.getElementById("form-field-AssetNadlandummy7").style.display = "none"; 
	document.getElementById("form-field-AssetNadlandummy8").style.display = "none";
	document.getElementById("form-field-AssetNadlandummy11").style.display = "none";
	document.getElementById("form-field-AssetNadlandummy12").style.display = "none";
	
	
	// set step size for controlers in the form
	document.getElementById("form-field-assetNadlanYitraId").step = 10000
	document.getElementById("form-field-tzefiTsuaShnatiNadlanId").step = 0.1

	// set dafault date as today to date controls  in the form
	var currentDate = new Date();
	var lformattedDate = currentDate.toISOString().split('T')[0];
	document.getElementById("form-field-YitraNadlanRelevantDateId").value = lformattedDate
	document.getElementById("form-field-taarichNezilutNadlanId").value = lformattedDate

	document.getElementById("form-field-assetNadlanYitraId").value=1000000
	document.getElementById("form-field-tzefiTsuaShnatiNadlanId").value=3
	document.getElementById("form-field-AssetNadlanSnId").value=""

	document.getElementById("AssetPensionKitzbaTzfuyaId").style.display = "none";
	
	fCalcAssetNadlanRecForPreview()
		
}
	
function gSetAssetFormToBeNadlanInvestType()
{
	gShowHideAssetIconsArea("none")
	document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML="קליטת נכס נדלן להשקעה"
	gselectAssetHonSaveBtn.disabled = true;
	gAsstNadlanForm.style.display="none"
	gAsstNadlanInvestForm.style.display="block"
	gAsstHonForm.style.display="none"
	gAssetPensionForm.style.display="none"
	document.getElementById("BituachtFormID").style.display = "none";


	//get the value of the sellect asset element and put it in the form description field as default value
	document.getElementById("form-field-assetNadlanInvestDescriptionId").value=gAssetNameToInsert.value

	//hide type id field
	document.getElementById("form-field-AssetNadlanInvestTypeId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetNadlanInvestTypeId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

	//hide user name field
	document.getElementById("form-field-AssetNadlanInvestUserNameId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetNadlanInvestUserNameId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}
	//hide the serial number field
	document.getElementById("form-field-AssetNadlanInvestSnId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetNadlanInvestSnId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}
	

	//hide field that are not in use
	document.getElementById("form-field-AssetNadlanInvestdummy4").style.display = "none"; 
	document.getElementById("form-field-AssetNadlanInvestdummy5").style.display = "none"; 
	document.getElementById("form-field-AssetNadlanInvestdummy7").style.display = "none"; 
	document.getElementById("form-field-AssetNadlanInvestdummy8").style.display = "none";
	document.getElementById("form-field-AssetNadlanInvestdummy9").style.display = "none";
	document.getElementById("form-field-AssetNadlanInvestdummy10").style.display = "none";


	// set step size for controlers in the form
	document.getElementById("form-field-assetNadlanInvestYitraId").step = 10000
	document.getElementById("form-field-tzefiMonthIncomeNadlanInvestId").step =  100      
	document.getElementById("form-field-tzefiTsuaShnatiNadlanInvestId").step = 0.1

	// set dafault date as today to date controls  in the form
	var currentDate = new Date();
	var lformattedDate = currentDate.toISOString().split('T')[0];
	document.getElementById("form-field-YitraNadlanInvestRelevantDateId").value = lformattedDate
	document.getElementById("form-field-taarichNezilutNadlanInvestId").value = lformattedDate
	//set defaukt values
	document.getElementById("form-field-assetNadlanInvestYitraId").value=1000000
	document.getElementById("form-field-tzefiMonthIncomeNadlanInvestId").value =  2000   
	document.getElementById("form-field-tzefiTsuaShnatiNadlanInvestId").value=3
	document.getElementById("form-field-AssetNadlanInvestSnId").value=""

	document.getElementById("AssetPensionKitzbaTzfuyaId").style.display = "none";


	fCalcAssetNadlanInvestRecForPreview()

}

	
function gSetAssetFormToBePensionType()
{
	gShowHideAssetIconsArea("none")
	gselectAssetHonSaveBtn.disabled = true;
	
	gAsstNadlanForm.style.display="none"
	gAsstNadlanInvestForm.style.display="none"
	gAsstHonForm.style.display="none"
	gAssetPensionForm.style.display="block"
	document.getElementById("BituachtFormID").style.display = "none";

	
	//get the value of the sellect asset element and put it in the form description field as default value
	document.getElementById("form-field-assetPensionDescriptionId").value=	gAssetNameToInsert.value
	
	//hide type id field
	document.getElementById("form-field-AssetPensionTypeId").style.display = "none"; 
	tmp=document.getElementById("form-field-AssetPensionTypeId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

	document.getElementById("form-field-AssetPensionUserNameId").style.display = "none"; 
	document.getElementById("form-field-AssetPensionSnId").style.display = "none";
	tmp=document.getElementById("form-field-AssetPensionSnId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}

	// document.getElementById("form-field-AssetPensionDummy4").style.display = "none"; 
	// document.getElementById("form-field-AssetPensiondummy10").style.display = "none"; 
	// set step size for controlers in the form
	document.getElementById("form-field-assetPensiaYitraId").step = 10000
	document.getElementById("form-field-hafkadaHodshitPensionId").step = 100
	document.getElementById("form-field-tzefiTsuaShnatiPensionId").step = 0.1
	document.getElementById("form-field-AssetPensionGidulSachar").step = 0.1
	document.getElementById("form-field-AssetPensionBituachYearCostId").step = 1
	document.getElementById("form-field-AssetPensionDmeiNiulpaymantId").step = 0.1
	document.getElementById("form-field-AssetPensionDmeiNiulTotalId").step = 0.1
	// set dafault date as today to date controls  inthe form
	var currentDate = new Date();
	var lformattedDate = currentDate.toISOString().split('T')[0];
	document.getElementById("form-field-YitraPensionRelevantDateId").value = lformattedDate
	document.getElementById("form-field-endMonthPaymantPensionId").value = lformattedDate
	document.getElementById("form-field-taarichpensiaId").value = lformattedDate
	//dispaly kitba calculation area
	document.getElementById("AssetPensionKitzbaTzfuyaId").style.display = "block";
	//change form title to ="קליטת נכס קצבתי חדש"
	document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML="קליטת נכס קצבתי קיים"
	lString="קיצבה צפויה: 0"
	document.getElementById("AssetPensionKitzbaTzfuyaId").innerText =lString
	document.getElementById("AssetPensionKitzbaTzfuyaId").style.color = "blue";	
	// console.log("hide pension")
	document.getElementById("form-field-IsAMonthlyPaymantPensionId").value="No"
	document.getElementsByClassName("elementor-field-group-hafkadaHodshitPensionId")[0].style.visibility = 'hidden';// Hide the element
	//gAssetPensionHafkadaHodshit[0].style.visibility = 'hidden';// Hide the element
	document.getElementsByClassName("elementor-field-group-endMonthPaymantPensionId")[0].style.visibility = 'hidden';// Hide the element
	//gAssetPensionEndHafkada[0].style.visibility = 'hidden';// Hide the element
	document.getElementsByClassName("elementor-field-group-makorHafkataHodshitPensiaId")[0].style.visibility = 'hidden';// Hide the element
	//gAssetPensionMakorHafkada[0].style.visibility = 'hidden';// Hide the element
	document.getElementById("form-field-assetPensiaYitraId").value=100000
	document.getElementById("form-field-hafkadaHodshitPensionId").value=500
	document.getElementById("form-field-AssetPensionBituachYearCostId").value=12
	document.getElementById("form-field-AssetPensionDmeiNiulpaymantId").value=6
	document.getElementById("form-field-AssetPensionDmeiNiulTotalId").value=0.5
	document.getElementById("form-field-AssetPensionMekademId").value=200
	document.getElementById("form-field-tzefiTsuaShnatiPensionId").value=3


	document.getElementById("form-field-AssetPensionGidulSachar").value=1
	document.getElementById("form-field-AssetPensionSnId").value=""

	document.getElementById("form-field-AssetPensionCommantsId").value=""
	
	
	fCalcAssetPensionRecForPreview()
	
}
		
//hide elements from asset form that fit hon type and change label of nezilut date to mekadem kitzba
function gSetAssetFormToBeHonType()
{
	gShowHideAssetIconsArea("none")
	document.getElementById("AssetPensionKitzbaTzfuyaId").style.display = "none";
	//get the value of the sellect asset element and put it in the form description field as default value
	document.getElementById("form-field-assetDescriptionId").value=	gAssetNameToInsert.value
	// dispaly asset hon form
	//				gAssetHonFormContainer.style.display="block"
	// set as default IsAMonthlyPaymantId to no
	
	// show the save button of the form
	gselectAssetHonSaveBtn.disabled = true;
	//hide the complete area of the assets icons
	//gAssedAreaSectionId.style.display="none"
		
	gAsstNadlanForm.style.display="none"
	gAsstNadlanInvestForm.style.display="none"
	gAssetPensionForm.style.display="none"
	gAsstHonForm.style.display="block"
	document.getElementById("BituachtFormID").style.display = "none";

		
	document.getElementById("form-field-AssetHonSnId").style.display = "none";
	tmp=document.getElementById("form-field-AssetHonSnId")	
	var mlabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (mlabel) {
							// Hide the label.
							mlabel.style.display = 'none';
					}
	document.getElementById("form-field-AssetHonUserNameId").style.display = "none";
	tmp=document.getElementById("form-field-AssetHonUserNameId")	
	var myUserNamelabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (myUserNamelabel) {
							// Hide the label.
							myUserNamelabel.style.display = 'none';
					}
	
	document.getElementById("form-field-AssetHonTypeId").style.display = "none";
	tmp=document.getElementById("form-field-AssetHonTypeId")	
	var myTypelabel = tmp.closest('.elementor-field-group').querySelector('label');
	if (myTypelabel) {
							// Hide the label.
							myTypelabel.style.display = 'none';
					}
	
	document.getElementById("form-field-AssetHondummy12").style.display = "none"; 
	document.getElementById("form-field-AssetHondummy5").style.display = "none";
	document.getElementById("form-field-AssetHondummy7").style.display = "none";
	document.getElementById("form-field-AssetHondummy8").style.display = "none";
	//document.getElementById("form-field-AssetHondummy9").style.display = "none";
	document.getElementById("form-field-AssetHondummy10").style.display = "none";
	document.getElementById("form-field-AssetHondummy11").style.display = "none";

	document.getElementById("form-field-IsAMonthlyPaymantId").value="No"
	gAssetHonHafkadaHodshit[0].style.visibility = 'hidden';// Hide the element
	gAssetHonEndHafkada[0].style.visibility = 'hidden';// Hide the element
	gAssetHonMakorHafkada[0].style.visibility = 'hidden';// Hide the element

	// set step size for controlers in the form
	document.getElementById("form-field-assetYitraId").step = 10000
	document.getElementById("form-field-hafkadaHodshitId").step = 100
	document.getElementById("form-field-tzefiTsuaShnatiId").step = 0.1
	
	
	// set dafault date as today to date controls  inthe form
	var currentDate = new Date();
	var lformattedDate = currentDate.toISOString().split('T')[0];
	document.getElementById("form-field-YitraRelevantDateId").value = lformattedDate
	document.getElementById("form-field-endMonthPaymantId").value = lformattedDate
	document.getElementById("form-field-taarichNezilutId").value = lformattedDate

	
	// set defult values
	document.getElementById("form-field-assetYitraId").value=10000
	document.getElementById("form-field-hafkadaHodshitId").value=500
	// console.log("makor hafkada::::::::::",document.getElementById("form-field-makorHafkataHodshitId").value)
	document.getElementById("form-field-makorHafkataHodshitId").value="Bank"
	// document.getElementById("form-field-AssetHonTypeId").value=
	document.getElementById("form-field-tzefiTsuaShnatiId").value=3
	document.getElementById("form-field-AssetHonSnId").value=""
	document.getElementById("form-field-MaslulHaskahaId").value=""

	document.getElementById("form-field-AssetHonCommantsId").value=""
	
	document.getElementById('form-field-YitraRelevantDateId').style.resize = 'none';
	
	fCalcAssetHonRecForPreview()
}
/////////////////////////////////////////////////////////////////////////////////////
	
// generate list of dates from today, this is for plotly x axies 
function generateDateList(numberOfMonths) {
        var dates = [];
        var currentDate = new Date();

        for (var i = 0; i < numberOfMonths; i++) {
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            var day = ('0' + currentDate.getDate()).slice(-2);

            var formattedDate = year + '-' + month + '-' + day;
            dates.push(formattedDate);

            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return dates;
}
///////////////////////////////////////////////
	
// calc diff between 2 dated in terms of month	
function fCalcDateDiffInMonth(startdate, endDate) {
	// console.log("fs:",startdate,"fe:",endDate)
  const months = (endDate.getFullYear() - startdate.getFullYear()) * 12;
  const monthDifference = endDate.getMonth() - startdate.getMonth();
  return months + monthDifference;
}
/////////////////////////////////////////////

function fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nezilutDate)
{
	
												var lpaymantnmonthfromStart=fCalcDateDiffInMonth(new Date(startValueDate),new Date(lEndOfMonthpaymantDate))
												if (isNaN(lpaymantnmonthfromStart)) {
													paymantnmonthfromcurrent = 0;
												}
	
												var nazildinmonthfromcurrent=fCalcDateDiffInMonth(new Date(startValueDate),new Date(nezilutDate))
												if (isNaN(nazildinmonthfromcurrent)) {
													nazildinmonthfromcurrent = 0;
												}
	
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
												// console.log("s:",startd,"e:",endd,"numberofpoints:",numberOfMonth)
												var current_list=[]
												var current_list_nezilut=[]
												var paymants_list=[]
												var PrevTotal=0
												var total=0
												var TotalNazil=0
												var effectivRevenue=0
												var PamentVale=0
												var InitValue=0

												for (let j = 0; j < numberOfMonth; j++) {
																	if (0==j)
																	{
																			InitValue=startvalue
																	}
																	else{
																			InitValue=0
																	}

																	if (j>=0 && (lIsMonthlypaymantBoolean==true) && (j < lpaymantnmonthfromStart) )
																			PamentVale=monthly
																	else
																			PamentVale=0

																	paymants_list.push(Math.round(PamentVale))				
													
																	if(revenue != 0){
																		effectivRevenue=(revenue/100+1)**(1/12)-1	
																	}
																	else{
																		effectivRevenue=0
																	}

																	//console.log("BEFORE:","revenue:",revenue,"Eff:",effectivRevenue,"startv:",InitValue,"prevtoal:",PrevTotal,"pamant:",PamentVale)
																	//Total=PrevTotal*(1+revenue/100/12)+StartValue+PamentVale
																	Total=PrevTotal*(1+effectivRevenue)+InitValue+PamentVale
																	PrevTotal=Total

																	if (j>=nazildinmonthfromcurrent)
																			TotalNazil=Total
																	else
																			TotalNazil=0


																	//console.log("prevtotal:",PrevTotal)
																	current_list.push(Math.round(Total))
																	//current_list.push((Total))
																	current_list_nezilut.push(Math.round(TotalNazil))
																	//console.log("AFTER:","revenue:",revenue,"Eff:",effectivRevenue,"startv:",InitValue,"prevtoal:",PrevTotal,"total:",Total,"pamant:",PamentVale)

															}
															// console.log("in function:",current_list,current_list_nezilut,paymants_list);
															// console.log("lfromStartToCurrentInMonth",lfromStartToCurrentInMonth)
															
															//return only values from today till the end of simulation
															return [current_list.slice(lfromStartToCurrentInMonth),
																			current_list_nezilut.slice(lfromStartToCurrentInMonth),
																			paymants_list.slice(lfromStartToCurrentInMonth)];
}
	
///////////////////////////////////////////////////////////////////////////////////////
	
	
// when a field in the asset hom form is changged this function is called and calculate the span of the rec over time
function fCalcAssetHonRecForPreview()	{
	// console.log("1")
	
	var current_list=[]
	var current_list_nezilut=[]
	var paymants_list=[]
	var startd = new Date();
	
	var startvalue = parseFloat(  document.getElementById("form-field-assetYitraId").value  )
	if (isNaN(startvalue)) {
  // Set myVariable to zero if it is NaN
  startvalue = 0;
	}
	
	var startValueDate=document.getElementById("form-field-YitraRelevantDateId").value
	
	var lIsMonthlypaymant = document.getElementById("form-field-IsAMonthlyPaymantId").value
	var lIsMonthlypaymantBoolean = false
	if(lIsMonthlypaymant =="Yes")
		{
			lIsMonthlypaymantBoolean = true
		}
	
	var monthly = parseFloat(document.getElementById("form-field-hafkadaHodshitId").value)
	if (isNaN(monthly)) {
  // Set myVariable to zero if it is NaN
  monthly = 0;
	}
	
	var lEndOfMonthpaymantDate = document.getElementById("form-field-endMonthPaymantId").value
	
	var revenue = parseFloat(document.getElementById("form-field-tzefiTsuaShnatiId").value)
	if (isNaN(revenue)) {
  // Set myVariable to zero if it is NaN
  revenue = 0;
	}
		
	var nazild = document.getElementById("form-field-taarichNezilutId").value;
	
 	[current_list,current_list_nezilut,paymants_list] = fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild);
	// console.log("after function:",current_list,current_list_nezilut,paymants_list);
		
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
			text: 'שווי נכס צפוי',
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


function fCalcAssetNadlanRecForPreview()	{
	// console.log("2")
	
	var current_list=[]
	var current_list_nezilut=[]
	var paymants_list=[]
	var startd = new Date();
	
	var startvalue = parseFloat(  document.getElementById("form-field-assetNadlanYitraId").value  )
	if (isNaN(startvalue)) {
  // Set myVariable to zero if it is NaN
  startvalue = 0;
	}
	
	var startValueDate=document.getElementById("form-field-YitraNadlanRelevantDateId").value
	
	
	var lIsMonthlypaymantBoolean = false
		
	var monthly = 0;
	
	//there is no monthly so he function that get this paramere is not using this value
	var lEndOfMonthpaymantDate = "2999-02-20"
	var revenue = parseFloat(document.getElementById("form-field-tzefiTsuaShnatiNadlanId").value)
	if (isNaN(revenue)) {
  // Set myVariable to zero if it is NaN
  revenue = 0;
	}
		
	var nazild = document.getElementById("form-field-taarichNezilutNadlanId").value;

	
	retv=fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild)
	current_list=retv[0]
	current_list_nezilut=retv[1]
	paymants_list=retv[2]
	// console.log("after function:",current_list,current_list_nezilut,paymants_list);
		
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
			text: 'שווי נכס צפוי',
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

function fCalcAssetNadlanInvestRecForPreview()	{
	// console.log("3")
	
	var current_list=[]
	var current_list_nezilut=[]
	var paymants_list=[]
	var startd = new Date();
	
	var startvalue = parseFloat(  document.getElementById("form-field-assetNadlanInvestYitraId").value  )
	if (isNaN(startvalue)) {
  // Set myVariable to zero if it is NaN
  startvalue = 0;
	}
	
	var startValueDate=document.getElementById("form-field-YitraNadlanInvestRelevantDateId").value
	
	
	var lIsMonthlypaymantBoolean = false
		
	var monthly = 0;
	
	//there is no monthly so he function that get this paramere is not using this value
	var lEndOfMonthpaymantDate = "2999-02-20"
	var revenue = parseFloat(document.getElementById("form-field-tzefiTsuaShnatiNadlanInvestId").value)
	if (isNaN(revenue)) {
  // Set myVariable to zero if it is NaN
  revenue = 0;
	}
		
	var nazild = document.getElementById("form-field-taarichNezilutNadlanInvestId").value;

	
	retv=fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild)
	current_list=retv[0]
	current_list_nezilut=retv[1]
	paymants_list=retv[2]
	// console.log("after function:",current_list,current_list_nezilut,paymants_list);
		
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
			text: 'שווי נכס צפוי',
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


function findImgInDiv(divElement) {
    
	// const imageWidget = divElement.querySelector('.elementor-widget-image');

	// Get the img element within the image widget
	const imgElement = divElement .querySelector('img');

	return(imgElement)
}
function findTxtElementInDiv(divElement) {
    
	// const imageWidget = divElement.querySelector('.elementor-widget-image');

	// Get the img element within the image widget
	// console.log("element to h6:",divElement.children[0].children[0])
	const imgElement = divElement .querySelector('h6');

	return(divElement.children[0].children[0])
}
// this function get 3 parameters:1) rec Id - the rec SN 2)rec name 3)re discription
// the id is transfered to the del and edit icons.
// nabe and discription is given to the rec icon bellow the icon
// filtering: 1-hon types,1-pension types,3=nadlan types,4-nadlan invest
// function fInsertIconIntoAssetArea(InId,inAssetName,inassetDiscription){
//         // console.log("insert icon to icon area:",inAssetName)
    
//         // duplicate dummy asset div
//         const cloneAssetFromDummy = gdummyAssetElement.cloneNode(true);
        
//         //console.log("del id",cloneAssetFromDummy)
//         //give the div serial number
//         cloneAssetFromDummy.id=InId

//         //get del icon 
//         delIconEllement=cloneAssetFromDummy.children[0].children[1].children[0].children[0]

//         //give the del icon in the div the same serial number
//         delIconEllement.id=InId
//         // add to the del icon the event listner function
//         delIconEllement.addEventListener('click',fHandleDeleteIconPresses);
//         //get edit icon ellement
//         editIconEllement=cloneAssetFromDummy.children[0].children[0].children[0].children[0]
//         //give the edit icon in the div the same serial number
//         editIconEllement.id=InId
//         // add to the ellmemt the event listner function
//         editIconEllement.addEventListener('click',fHandleEditIconPresses);
// 		// display the new asset on the page
//         cloneAssetFromDummy.style.display="block"
// 		//console.log("clone:",cloneAssetFromDummy)

//         // add to the new asset the asset name
// 		cloneEllementTxtllement=findElementInContainer(cloneAssetFromDummy,"assetTextId")
//         cloneEllementTxtllement.children[0].children[0].textContent=inAssetName
				
// 				// add to the new asset the asset discription
//         cloneEllementDiscriptionTxtllement=findElementInContainer(cloneAssetFromDummy,"assetDiscriptionTxtId")
//         cloneEllementDiscriptionTxtllement.children[0].children[0].textContent=inassetDiscription
        
// 		limgElement=findImgInDiv(cloneAssetFromDummy)

// 		if(inAssetName=="תוכנית חיסכון")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/תוכנית-חסכון.jpg"
// 		if(inAssetName=="מטבע דיגיטלי")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/מטבע-דיגטלי.jpg"
// 		if(inAssetName=="תיק השקעות")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/תיק-השקעות.jpg"
// 		if(inAssetName=="תוכנית ביטוח לחיסכון")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/תוכנית-ביטוח-לחסכון.jpg"
// 		if(inAssetName=="קופת גמל הונית")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/קופת-גמל-הונית.jpg"
// 		if(inAssetName=="קרן השתלמות")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/קרן-השתלמות.jpg"
// 		if(inAssetName=="פיקדון בנקאי")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/פקדון-בנקאי-1.jpg"
// 		if(inAssetName=="espp")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/ESPP.jpg"
// 		if(inAssetName=="קרן פנסיה")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/פנסיה.jpg"
// 		if(inAssetName=="ביטוח מנהלים")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/ביטוח-מנהלים.jpg"
// 		if(inAssetName=="קופת גמל לקצבה")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/פנסיה.jpg"
// 		if(inAssetName=="מזומן בכספת")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/מזומן.jpg"
// 		if(inAssetName=="דירה למגורים")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/בית-למגורים.jpg"
// 		if(inAssetName=="רכב")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/רכב.jpg"
// 		if(inAssetName=="דירה להשקעה")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/נדלן-להשקעה.jpg"
// 		if(inAssetName=="נכס דיגיטלי")
// 						limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/נכס-דיגיטלי.jpg"
		
// 		var lerror=""
// 		if(gAssetSectionIconArea.children[0].childElementCount<12)
// 		{//1
// 			gAssetSectionIconArea.children[0].appendChild(cloneAssetFromDummy);
// 		}//1
// 		else{//2
// 				if(AssetIconsAreaParentdiv2Id.children[0].childElementCount<12)
// 							{//3
// 								AssetIconsAreaParentdiv2Id.children[0].appendChild(cloneAssetFromDummy);
// 							}//3
// 				else{//4
// 						if(gassetSectionIconArea3.children[0].childElementCount<12)
// 										{//5
// 											gassetSectionIconArea3.children[0].appendChild(cloneAssetFromDummy);
// 										}//5
// 						else{//6
// 								alert("לא יותר מ 33 נכסים")
// 								lerror="error"
// 							}//6

// 						}//4
			
// 				}//2
// 		return("error:",lerror)
// }	


function fGetH6EllemantById(inElemant,Id){
	const lmyH6Elements = inElemant.querySelectorAll('.elementor-widget-heading'); 
	var reretelemant=null
	lmyH6Elements.forEach(function(DivH6Element) {
		// Log the ID of each image element
		// console.log("inH6id:",DivH6Element.id);
		if(DivH6Element.id==Id)
		{
			
			// the id found is of the div holding the img becouse elementor set the id to the div holding and not the imf element in him
			reretelemant=findTxtElementInDiv(DivH6Element)
			
			
		}
	});
	return(reretelemant)

}



function fGetImageEllemantById(inElemant,Id){
	const lmyimageElements = inElemant.querySelectorAll('.elementor-widget-image'); 
	var reretelemant=null
	lmyimageElements.forEach(function(DivImageElement) {
		// Log the ID of each image element
		// console.log("inimageid:",DivImageElement.id);
		if(DivImageElement.id==Id)
		{
			
			// the id found is of the div holding the img becouse elementor set the id to the div holding and not the imf element in him
			reretelemant=findImgInDiv(DivImageElement)
			
			
		}
	});
	return(reretelemant)

}
function fInsertIconIntoAssetArea(InId,inAssetName,inassetDiscription){
	// console.log("insert icon to icon area:",inAssetName)
	// ltemp=document.getElementById("testnewdummy")  
	// const lmyimageElements = ltemp.querySelectorAll('.elementor-widget-image'); 
	
	// lmyimageElements.forEach(function(imageElement) {
	// 	// Log the ID of each image element
	// 	console.log(imageElement.id);
	// });

	// duplicate dummy asset div
	//const cloneAssetFromDummy = gdummyAssetElement.cloneNode(true);
	const cloneAssetFromDummy = document.getElementById("testnewdummy").cloneNode(true);
	console.log("ss",document.getElementById("testnewdummy"))
	console.log("cs",cloneAssetFromDummy)
	//console.log("del id",cloneAssetFromDummy)
	//give the div serial number
	cloneAssetFromDummy.id=InId

	//write id of asset into delete img and connect a click function	
	lretElemant=fGetImageEllemantById(cloneAssetFromDummy,"deletedummytestid")
	//console.log("elementfound delete:",lretElemant)
	lretElemant.id=InId
	lretElemant.addEventListener('click',fHandleDeleteIconPresses);

	//write id of asset into edit img and connect a click function	
	lretElemant=fGetImageEllemantById(cloneAssetFromDummy,"editdummytestid")
	//console.log("elementfound edit:",lretElemant)
	lretElemant.id=InId
	lretElemant.addEventListener('click',fHandleEditIconPresses);
	
	// display the new asset on the page
	cloneAssetFromDummy.style.display="block"
	
	lretElemant=fGetH6EllemantById(cloneAssetFromDummy,"assetNameId")
	lretElemant.innerHTML=inAssetName

	lretElemant=fGetH6EllemantById(cloneAssetFromDummy,"asseDescriptionId")
	lretElemant.innerHTML=inassetDiscription
	

	limgElement=fGetImageEllemantById(cloneAssetFromDummy,"assetimagedummyid")



	if(inAssetName=="תוכנית חיסכון")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/תוכנית-חסכון.jpg"
	if(inAssetName=="מטבע דיגיטלי")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/מטבע-דיגטלי.jpg"
	if(inAssetName=="תיק השקעות")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/תיק-השקעות.jpg"
	if(inAssetName=="תוכנית ביטוח לחיסכון")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/תוכנית-ביטוח-לחסכון.jpg"
	if(inAssetName=="קופת גמל הונית")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/קופת-גמל-הונית.jpg"
	if(inAssetName=="קרן השתלמות")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/קרן-השתלמות.jpg"
	if(inAssetName=="פיקדון בנקאי")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/פקדון-בנקאי-1.jpg"
	if(inAssetName=="espp")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/ESPP.jpg"
	if(inAssetName=="קרן פנסיה")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/פנסיה.jpg"
	if(inAssetName=="ביטוח מנהלים")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/ביטוח-מנהלים.jpg"
	if(inAssetName=="קופת גמל לקצבה")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/פנסיה.jpg"
	if(inAssetName=="מזומן בכספת")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/מזומן.jpg"
	if(inAssetName=="דירה למגורים")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/בית-למגורים.jpg"
	if(inAssetName=="רכב")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/רכב.jpg"
	if(inAssetName=="דירה להשקעה")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/נדלן-להשקעה.jpg"
	if(inAssetName=="נכס דיגיטלי")
					limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/נכס-דיגיטלי.jpg"

	if(fisInglobalAssetBituachSet(inAssetName))
	{
		limgElement.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/01/נכס-דיגיטלי.jpg"
	}		
	
	


	
	document.getElementById("assetAreaContainerId").appendChild(cloneAssetFromDummy)
	// console.log("HHHEELLLPPPP:",assetAreaContainerId)
					// var lerror=""
	// if(gAssetSectionIconArea.children[0].childElementCount<12)
	// {//1
	// 	gAssetSectionIconArea.children[0].appendChild(cloneAssetFromDummy);
	// }//1
	// else{//2
	// 		if(AssetIconsAreaParentdiv2Id.children[0].childElementCount<12)
	// 					{//3
	// 						AssetIconsAreaParentdiv2Id.children[0].appendChild(cloneAssetFromDummy);
	// 					}//3
	// 		else{//4
	// 				if(gassetSectionIconArea3.children[0].childElementCount<12)
	// 								{//5
	// 									gassetSectionIconArea3.children[0].appendChild(cloneAssetFromDummy);
	// 								}//5
	// 				else{//6
	// 						alert("לא יותר מ 33 נכסים")
	// 						lerror="error"
	// 					}//6

	// 				}//4
		
	// 		}//2
	
}	
// ////////////////////////////////////////////////////////////////////////////////////////////////
// Function to check if a string is in the globalAssetsHonSet set
function fisInglobalAssetsHonSet(str) {
	// console.log("hon str:",str,globalAssetsHonSet.has(str))
  return globalAssetsHonSet.has(str);
}
// Function to check if a string is in the globalAssetsPensionSet set
function fisInglobalAssetsPensionSet(str) {

	// console.log("pension str:",str,globalAssetsPensionSet.has(str))
  return globalAssetsPensionSet.has(str);
}

// Function to check if a string is in the globalAssetsPensionSet set
function fisInglobalAssetsNadlanSet(str) {
  return globalAssetsNadlanSet.has(str);
}
// Function to check if a string is in the globalAssetsPensionSet set
function fisInglobalAssetsNadlanInvestSet(str) {
  return globalAssetsNadlanInvestSet.has(str);
}
// Function to check if a string is in the globalAssetsPensionSet set
function fisInglobalAssetsSet(str) {
  return globalAssetsSet.has(str);
}
function fisInglobalAssetBituachSet(str){
	return globalAssetsBituachSet.has(str);

}
	
	
// this function is called when a edit icon on an asset/hon/osh element is pressed
// the asset icons area is hide and an action to the backend is sent with the rec id
function fHandleEditIconPresses(e){
	
			
			console.log("state:",gState)
			//Get the element that was preseed
				 	var clickedElement = e.target;
         	//Get the element id
				 	var clickedElementId=clickedElement.id

					 console.log("state from edit :",gState,"element id:",e.target.id)

					 if (clickedElement.id) {
						// get the ID of the clicked element
						var clickedElementId = clickedElement.id;
						//here remove from list of assets
						//send to back end the rec id to be edit from db
						fSendCommandToBackEnd(clickedElementId,"actionEditAssetHonRecord")
					}
}	
	
	
//send to back end the rec id and action
function fSendCommandToBackEnd(Id,Action){
	 		gToDbRecSnId.value=Id
    	  	gDataBaseActionTypeId.value=Action
			//    document.getElementById('loading-overlay').style.display = 'block';
			document.getElementById("loading-overlay").style.visibility = "visible";
	 		gDataBaseActionClickBtnId.click()
}
// ////////////////////////////////////////////////////////////////
																	
// this function is called when a delete icon on an asset/hon/osh element is pressed
// the element is deleted from the container that hold him and also
// send to back end the id of the rec to be deleted from DB
function fHandleDeleteIconPresses(e) {
		//Get the element that was preseed
		gState="delete_record"
		console.log("state from delete:",gState,"element id:",e.target.id)
		var clickedElement = e.target;
		// Check if the clickedElement has an ID
		if (clickedElement.id) {
			// get the ID of the clicked element
			var clickedElementId = clickedElement.id;
			//here remove from list of assets
			//get the hosting div ellement
			// divHosellement=e.target.parentNode.parentNode.parentNode.parentNode
			// //delete hosting div from frontend
			// divHosellement.remove()
			//send to back end the rec id to be deleted from db
			console.log("id:",clickedElementId)
			fSendCommandToBackEnd(clickedElementId,"actionDeleteAssetHonRecord")
		}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////

	
// add to the asset list(global variable) an asset by getting id as string and ballance as number
function fAddAsset(id = "0", balance = 0) {
  // Create a new asset object with the provided id and balance
  const asset = {
    id: id.toString(), // Ensure id is a string
    balance: parseInt(balance), // Ensure balance is an integer
  };

  // Push the new asset object into the assetList array
  assetList.push(asset);
}

// delete an asset from asset list(global variable) by getting the id as input1
function fDelAsset(id) {
  // Find the index of the asset with the specified id
  const index = assetList.findIndex((asset) => asset.id === id);

  // If the asset exists, remove it from the assetList
  if (index !== -1) {
    assetList.splice(index, 1);
  }
}

// plot assets ids and bullance for all assets in asset list 
// function fDrawPie() {
//   // Extract the 'id' and 'balance' properties from assetList
//   const assetIds = assetList.map((asset) => asset.id);
//   const assetBalances = assetList.map((asset) => asset.balance);

//   // Create data for the pie chart
//   const data = [{
//     labels: assetIds,
//     values: assetBalances,
//     type: 'pie',
//   }];

//   // Create layout for the pie chart
//   const layout = {
//     title: 'Asset Pie Chart',
//   };

//   // Use Plotly to display the pie chart
//   Plotly.newPlot('pie-chart', data, layout);
// }	

// gets a container and an element  id and return the element if exsit
function findElementInContainer(container, elementId) {
  // Check if the container exists
  if (container) {
	// console.log("clone in function:",container)
	// console.log("search:",'#' + elementId)
    // Use querySelector to find the element within the container
    var element = container.querySelector('#' + elementId);
	// console.log("found:",element)

    // Return the found element or null if not found
    return element;
  } else {
    // Return null if the container doesn't exist
    return null;
  }
}	
	
	
// Create a number string by concatenating the time components
function gGetCurrentTimeAsnumberString(){
        const currentTime = new Date();
        // Get the individual time components
        const year = currentTime.getYear();
				const month = currentTime.getMonth();
				const day = currentTime.getDay();
				const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const milliseconds = currentTime.getMilliseconds();
        
        // Create a number string by concatenating the components
        const timeString = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
        
        return (timeString)
}	
	

// show or hide the complete asset icon area,status can be "block" or "Hide"
function gShowHideAssetIconsArea(status){
    // gAssetSellectAssetToAddFormElement.style.display = status
    // gAssetSectionIconArea.style.display = status
    // gassetSectionIconArea2.style.display = status
    // gassetSectionIconArea3.style.display = status
	
	// document.getElementById("assetAreaContainerId").style.display=status
	// document.getElementById("AssetManagertableDivId").style.display=status
	// document.getElementById("AssetGraphsDivId").style.display=status
	// console.log("SSSTTTTAAAATTTUUUSSS:",status)
	document.getElementById("masterofAllAssetDivId").style.display=status


	
	


							 

	
}
/////////////////////////////////////////////////////////////////////////////////////////

// send to server request to read all assets records
function gReadFromDbAllAssetRecords(){
		
	fSendCommandToBackEnd("","actionReadUserRecsAsset")
		
}
/////////////////////////////////////////////////////////////////////////////////////////

// Event Listeners///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// Attach the event listener to a field change in asset hon form
gAsstHonForm.addEventListener('change', function(){
	// console.log("form change")
	fCalcAssetHonRecForPreview()
})

gAsstNadlanForm.addEventListener('change', function(){
	// console.log("form change")
	fCalcAssetNadlanRecForPreview()
})

gAsstNadlanInvestForm.addEventListener('change', function(){
	// console.log("form change")
	fCalcAssetNadlanInvestRecForPreview()
})
	

// "https://barofi.dreamhosters.com/wp-content/uploads/2024/05/downgreenbackground-black-arrow-1.jpg"
// https://barofi.dreamhosters.com/wp-content/uploads/2024/05/leftgreenbackground-black-arrow.jpg

gAssetAreaCheckbobShowhideid=document.getElementById("AssetAreaCheckbobShowhideid")

gAssetAreaCheckbobShowhideid.addEventListener("click", function() {
	
	
	if( gAssetAreaCheckbobShowhideid.src =="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/leftGreen.png")
		{
			gAssetAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/Green-Down.png"
			if(gAssetRecordsList.length === 0)
				//if (gState=="before_load")
				{
					gReadFromDbAllAssetRecords()
				}
				else{
					gShowHideAssetIconsArea("block")
				}
		}
		else{
			gAssetAreaCheckbobShowhideid.src="https://barofi.dreamhosters.com/wp-content/uploads/2024/06/leftGreen.png"
			gShowHideAssetIconsArea("none")
			gAssetHonFormContainer.style.display="none"
		}

});



// add eventlistner to check box that hide asset icons area
// gAssetAreaCheckbobShowhideid.addEventListener("change", function() {
// 		// Hide the "asset add asset Form" and assetSectionIconArea elements
// 	// console.log("DDDDDDDDDDDDDDDDDYYYYYYYYYYYYYY:",gAssetAreaCheckbobShowhideid.checked)
// 	if (gAssetAreaCheckbobShowhideid.checked) 
//     {
       
// 		if(gAssetRecordsList.length === 0)
// 		//if (gState=="before_load")
// 		{
// 			gReadFromDbAllAssetRecords()
// 		}
// 		else{
// 			gShowHideAssetIconsArea("block")
// 		}
// 		// gShowHideAssetIconsArea("block")
		
		
		

//     }
//     else{
//         gShowHideAssetIconsArea("none")
// 		gAssetHonFormContainer.style.display="none"	// hide container of the asset hon form	
		
//     }
// });
/////////////////////////////////////////////////////////////////////////////////////////
	
//on documant ready prevent enter key submmiting the form
$(document).ready(function() {
    $('input').on('keydown', function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            console.log("enter pressed");

            // Check if the input is inside a form
            if (this.form) {
                // Get the element
                var element = document.getElementById(this.form.parentNode.parentNode.id);

                // Create a new 'change' event
                var event = new Event('change');

                // Dispatch the event
                element.dispatchEvent(event);
                console.log("change trigger",this.form.parentNode.parentNode.id);
            } else {
                console.log("The input is not inside a form");
            }

            return false;
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////////////
// $(document).ready(function() {
//     $('form').on('keydown', 'input', function(event) {
//         // Check if the pressed key is Enter (key code 13)
//         if (event.key === 13) {
// 			console.log("enter pressed")
//             // Prevent form submission
//             event.preventDefault();
//             // Trigger any input change event if necessary
//             $(this).trigger('change');
//         }
//     });
// });
// document.addEventListener("DOMContentLoaded", function(event) {
//     // Your code here
// 	gShowHideAssetIconsArea("none")
   
// });




// Code to run after the entire page (including external resources) has been loaded
window.addEventListener("load", function() {
    //send form to server with action get all user rec
	console.log("window load")
	
	setTimeout(function() {
        gReadFromDbAllAssetRecords();
    }, 500); // 2000 milliseconds = 2 seconds
	// elements= document.querySelectorAll('.showhover');
	// elements[10].children[0].style.opacity = "0";
	// console.log("elements:",elements[10].children[0].style)
	// gReadFromDbAllAssetRecords()
	
	// for(i=0; i<10000 ;i++)
	// 	{
	// 		console.log("gstate:",i,gState)
	// 	}
		
	// setTimeout(function() {
	// 	// Your code to be executed after 5 seconds
	// }, 5000);
	// console.log("after delay")
	// gReadFromDbAllLoanRecords()
//   gReadFromDbAllAssetRecords()
});
/////////////////////////////////////////////////////////////////////////////////////////

// hide first option from list of makorHafkataHodshitId when the select is clicked
gAssetHonFormMakorHafkada.addEventListener("click", function() {
		// console.log("makorChange")
        // Check if there are any options in the select element
        if (gAssetHonFormMakorHafkada.options.length > 0) {
			// console.log("makorChange in if",gAssetHonFormMakorHafkada)
            // Remove the first option (index 0) from the select element's options
            gAssetHonFormMakorHafkada.children[0].hidden="true"
        }
    });
////////////////////////////////////////////////////////////////////////////////

// hide first option from list of IsAMonthlyPaymantId when the select is clicked
gAssetHonFormIsAMonthlyPaymant.addEventListener("click", function() {
        // Check if there are any options in the select element
        if (gAssetHonFormIsAMonthlyPaymant.options.length > 0) {
            // Remove the first option (index 0) from the select element's options
            gAssetHonFormIsAMonthlyPaymant.children[0].hidden="true"
        }
    });
////////////////////////////////////////////////////////////////////////////////
	
// Add an event listener to the IsAMonthlyPaymant select and hide and show all nedded fields
gAssetHonFormIsAMonthlyPaymant.addEventListener('change', function() {
    
    // Check the value of the select element
    if (gAssetHonFormIsAMonthlyPaymant.value === "No") { // Change 'SomeValue' to the value you want to trigger the hiding
        gAssetHonHafkadaHodshit[0].style.visibility = 'hidden';// Hide the element
        gAssetHonEndHafkada[0].style.visibility = 'hidden';// Hide the element
        gAssetHonMakorHafkada[0].style.visibility = 'hidden';// Hide the element
    } else {
       
        gAssetHonHafkadaHodshit[0].style.visibility = 'visible';// Hide the element
        gAssetHonEndHafkada[0].style.visibility = 'visible';// Hide the element
        gAssetHonMakorHafkada[0].style.visibility = 'visible';// Hide the element
    }
});
//////////////////////////////////////////////////////////////////////////////////

//this event listner is waiting to an AJAX response from the server after a submit form has been done on the front hand
//in the function.php file in the theme file editor there is an hook that catce the submit form and it looks like this:
// add_action( 'elementor_pro/forms/new_record', function( $record, $ajax_handler ) 
// the function above return in the respond array with size 2, the first element is the specific answer that is expexted (like list of assssets or record to edit) and the second // element is a string describig what action was done. possible actions are:
// "edit asset hon rec" - when an edit icon is pressed on one of the asset of the hon in thr front hand
// "read all user asset rec" - when window on browser is loaded


// mode: 1 per Sn, 2 per type, 3 per group
// Sn is the serial number of a record
// type is a type of a rec(תוכנית חיסכון,תיק השקעות וכד)
// group is : 1-hon,2-pension,3-nadlan,4-nadlanInvest
function fAssetCalcRecords(mode,sn,type,group,inArray)
{
	// console.log("bugvalue:","start func","value",value)
	// per group of assets
	if(mode==3)
	{
		//group of Hon
		if(group==1)
		{
			var lTotalSum=[]
			var lTotalPaymant=[]
			for (let i = 0; i < inArray.length; i++) {
				if ( fisInglobalAssetsHonSet(inArray[i].Type)  )    
				{
					// console.log("hon asset number:",i,"is:",inArray[i])
					
					var startvalue = parseFloat(inArray[i].CurrentBallance)
					if (isNaN(startvalue)) {
						// Set myVariable to zero if it is NaN
						startvalue = 0;
					}
					
					var startValueDate=inArray[i].YitraRelevantDate
					
					var lIsMonthlypaymant = inArray[i].MonthlyYesNo

					var lIsMonthlypaymantBoolean = false
					if(lIsMonthlypaymant =="Yes")
						{
							lIsMonthlypaymantBoolean = true
						}
					
					var monthly = parseFloat(inArray[i].MonthlyPaymant)
					if (isNaN(monthly)) {
						// Set myVariable to zero if it is NaN
						monthly = 0;
					}
					
					var lEndOfMonthpaymantDate = inArray[i].MonthlyPaymantEnd
					
					var revenue = parseFloat(inArray[i].YearRevenue)
					if (isNaN(revenue)) {
						// Set myVariable to zero if it is NaN
						revenue = 0;
					}
						
					var nazild = inArray[i].NezilutDate

					let lretValue = fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild);
					//console.log("i:",i,lretValue[1])
					
					// console.log("rec description:",inArray[i].Description,"record span over time:",lretValue[0].slice(330, 340))
					//sum into totalsum the hon
					for (let i = 0; i < lretValue[0].length; i++) {
						if (isNaN(lTotalSum[i])) {
							lTotalSum[i]=(0 + lretValue[0][i]);
						}
						else{
							lTotalSum[i]=(lTotalSum[i] + lretValue[0][i]);
						}
						
					}
					// console.log("sum:",lTotalSum.slice(330, 340))
					
					if(inArray[i].SourceOfMonthly=="Bank" && lIsMonthlypaymantBoolean)
					{
						// console.log("PAYMANTS:",lretValue[2])
						//sum into totalpaymant the paymant
						for (let i = 0; i < lretValue[2].length; i++) {
							if (isNaN(lTotalPaymant[i])) {
								lTotalPaymant[i]=(0 + lretValue[2][i]);
							}
								else{
									lTotalPaymant[i]=lTotalPaymant[i]+lretValue[2][i]
								}
							
						
						}
						// console.log("TOTAL PAYMANTS:",lTotalPaymant)
					}
					

					//console.log("sum:",i,lTotalSum,lTotalPaymant)
					
				}
			}
		return [lTotalSum,lTotalPaymant]	
		}
		if(group==2)
		{
			var lTotalSum=[]
			var lTotalPaymant=[]
			for (let i = 0; i < inArray.length ; i++) {
				if ( fisInglobalAssetsPensionSet(inArray[i].Type)  )    
				{
					// console.log("hon asset number:",i,"is:",inArray[i])
					
					var startvalue = parseFloat(inArray[i].CurrentBallance)
					if (isNaN(startvalue)) {
						// Set myVariable to zero if it is NaN
						startvalue = 0;
					}
					
					var startValueDate=inArray[i].YitraRelevantDate
					
					var lIsMonthlypaymant = inArray[i].MonthlyYesNo

					var lIsMonthlypaymantBoolean = false
					if(lIsMonthlypaymant =="Yes")
						{
							lIsMonthlypaymantBoolean = true
						}
					
					var monthly = parseFloat(inArray[i].MonthlyPaymant)
					if (isNaN(monthly)) {
						// Set myVariable to zero if it is NaN
						monthly = 0;
					}
					
					var lEndOfMonthpaymantDate = inArray[i].MonthlyPaymantEnd
					
					var revenue = parseFloat(inArray[i].YearRevenue)
					if (isNaN(revenue)) {
						// Set myVariable to zero if it is NaN
						revenue = 0;
					}
						
					var nazild = inArray[i].NezilutDate



					var BituachPrecentage= parseFloat(inArray[i].InsuranceCost)
					if (isNaN(BituachPrecentage)) {
						// Set myVariable to zero if it is NaN
						BituachPrecentage = 0;
					}

					var NihulFromPaymant= parseFloat(inArray[i].NihulFromPaymant)
					if (isNaN(BituachPrecentage)) {
						// Set myVariable to zero if it is NaN
						NihulGromPaymant = 0;
					}

					var NihulFromTotal= parseFloat(inArray[i].NihulFromTotal)
					if (isNaN(BituachPrecentage)) {
						// Set myVariable to zero if it is NaN
						NihulFromTotal = 0;
					}

					//mode 1 - include dmei
					let lretValue = fCalcAssetPensionRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,BituachPrecentage,NihulFromPaymant,NihulFromTotal);

					//console.log("pension rec description:",inArray[i].Description,"record span over time:",lretValue[0])
					//sum into totalsum the hon
					for (let i = 0; i < lretValue[0].length; i++) {
						if (isNaN(lTotalSum[i])) {
							lTotalSum[i]=(0 + lretValue[0][i]);
						}
						else{
							lTotalSum[i]=(lTotalSum[i] + lretValue[0][i]);
						}
						
					}
					// console.log("sum:",lTotalSum.slice(330, 340))
					// console.log("SOURCE OF PAYMANT IS:",inArray[i].SourceOfMonthly)
					if(inArray[i].SourceOfMonthly=="Bank")
					{
						//sum into totalpaymant the paymant
						for (let i = 0; i < lretValue[2].length; i++) {
						if (isNaN(lTotalPaymant[i])) {
							lTotalPaymant[i]=(0 + lretValue[2][i]);
						}
						else{
							lTotalPaymant[i]=(lTotalPaymant[i] + lretValue[2][i]);
						}
						
					}
					}
					

					//console.log("sum:",i,lTotalSum,lTotalPaymant)
					
				}
			}
		return [lTotalSum,lTotalPaymant]	
		}
		console.log("if group4" )
		if(group==4)
		{
			
			var lTotalSum=[]
			var lTotalPaymant=[]
			for (let i = 0; i < inArray.length; i++) {
				// console.log("group 4 nadlan invest array,i:",inArray,i)
				if ( fisInglobalAssetsNadlanInvestSet(inArray[i].Type)  )    
				{
					// console.log("nadlan invest is:",inArray[i])
					
					var startvalue = parseFloat(inArray[i].CurrentBallance)
					if (isNaN(startvalue)) {
						// Set myVariable to zero if it is NaN
						startvalue = 0;
					}
					
					var startValueDate=inArray[i].YitraRelevantDate
					
					var lIsMonthlypaymantBoolean = true
										
					var monthly = parseFloat(inArray[i].MonthlyIncome
						)
					if (isNaN(monthly)) {
						// Set myVariable to zero if it is NaN
						monthly = 0;
					}
					
					

					//end date of nadlan invest is end of simulation
					const endDate = new Date();
					// Add the number of months
					endDate.setMonth(endDate.getMonth() + gmaxmonth);
					// Now givenDate contains the date which is current date + gmaxmonth months
					// console.log("end date:",endDate);
					// Get the year, month, and day from the date
					const year = endDate.getFullYear();
					const month = String(endDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
					const day = String(endDate.getDate()).padStart(2, '0');
					// Format the date
					const formattedDate = `${year}-${month}-${day}`;
					// console.log("end date formatted:",formattedDate);
					var lEndOfMonthpaymantDate = formattedDate



					
					var revenue = parseFloat(inArray[i].YearRevenue)
					if (isNaN(revenue)) {
						// Set myVariable to zero if it is NaN
						revenue = 0;
					}
						
					var nazild = inArray[i].NezilutDate

					let lretValue = fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild);
					// //console.log("i:",i,lretValue[1])
					
					// // console.log("rec description:",inArray[i].Description,"record span over time:",lretValue[0].slice(330, 340))
					// //sum into totalsum the hon
					for (let i = 0; i < lretValue[0].length; i++) {
						if (isNaN(lTotalSum[i])) {
							lTotalSum[i]=(0 + lretValue[0][i]);
						}
						else{
							lTotalSum[i]=(lTotalSum[i] + lretValue[0][i]);
						}
						
					 }
					// // console.log("sum:",lTotalSum.slice(330, 340))
					
					// 	console.log("PAYMANTS:",lretValue[2])
					//sum into totalpaymant the paymant
					for (let i = 0; i < lretValue[2].length; i++) {
							if (isNaN(lTotalPaymant[i])) {
								lTotalPaymant[i]=(0 + lretValue[2][i]);
							}
								else{
									lTotalPaymant[i]=lTotalPaymant[i]+lretValue[2][i]
								}
							
						
					
					// 	console.log("TOTAL PAYMANTS:",lTotalPaymant)
					// }
					

					// //console.log("sum:",i,lTotalSum,lTotalPaymant)
					
					}
				}
					
			}
			return [lTotalSum,lTotalPaymant]
	
		}
	}
	if(mode==2){
			var lTotalSum=0
			for (let i = 0; i < inArray.length ; i++) {
				if ( inArray[i].Type==type)     
				{
					console.log("bugvalue:",inArray[i].CurrentBallance,"type:",inArray[i].Type)
					var startvalue = parseFloat(inArray[i].CurrentBallance)
					if (isNaN(startvalue)) {
						// Set myVariable to zero if it is NaN
						startvalue = 0;
					}
					
					var startValueDate=inArray[i].YitraRelevantDate
					
					var lIsMonthlypaymant = inArray[i].MonthlyYesNo
					//console.log("nadlan is monthly?",lIsMonthlypaymant,"type:",inArray[i].Type)

					var lIsMonthlypaymantBoolean = false
					if(lIsMonthlypaymant =="Yes")
						{
							lIsMonthlypaymantBoolean = true
						}
					
					var monthly = parseFloat(inArray[i].MonthlyPaymant)
					if (isNaN(monthly)) {
						// Set myVariable to zero if it is NaN
						monthly = 0;
					}
					
					var lEndOfMonthpaymantDate = inArray[i].MonthlyPaymantEnd
					
					var revenue = parseFloat(inArray[i].YearRevenue)
					if (isNaN(revenue)) {
						// Set myVariable to zero if it is NaN
						revenue = 0;
					}
						
					var nazild = inArray[i].NezilutDate

					let lretValue = fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild);	
					
					lTotalSum=lTotalSum+lretValue[0][0]
				}
			}
			return [type,lTotalSum]
		}
	
}

function fAddAssetToTable(containerId, tableId, asset, tableTitle) {
    // Check if the container exists
    var container = document.getElementById(containerId);
    if (!container) {
        console.error("Container with id '" + containerId + "' not found.");
        return;
    }

    // Check if the table already exists
    var table = document.getElementById(tableId);
    var tableCreated = false;

    // If table doesn't exist, create it
    if (!table) {
        table = document.createElement('table');
        table.id = tableId;

        // Add table title
        if (tableTitle) {
            var caption = document.createElement('caption');
            caption.textContent = tableTitle;
            caption.style.fontSize = "200%"; // Double size
            caption.style.fontWeight = "bold"; // Bold
            table.appendChild(caption);
			
        }

        container.appendChild(table);
        tableCreated = true;
    }

    // Add asset data to the table body
    var tbody = document.createElement('tbody');
    var row = document.createElement('tr');

	// console.log("asset:",asset,"aset type:",typeof(asset))
    
			// Get the keys of the object
			var keys = Object.keys(asset);

			// Reverse the array of keys
			keys.reverse();

			// Create a new object with the keys in the reversed order
			var reversedObjasset = {};
			keys.forEach(function(key) {
				reversedObjasset[key] = asset[key];
			});
	
	for (var key in reversedObjasset) {
        if (!["NezilutDate","Sn", "UserName", "IncludeYesNo", "MonthlyYesNo", "MonthlyPaymantEnd", "SourceOfMonthly", "YitraRelevantDate", "RetirmantDate"].includes(key)) {
            var cell = document.createElement('td');
            var value = key === 'MonthlyPaymant' && asset['MonthlyYesNo'] === 'No' ? '0' : asset[key];
			cell.style.color = 'black';
			// cell.style.fontWeight = 'bold'; 
			cell.style.fontSize = '16px';
            cell.textContent = value;

			
			
			
			// Add a class to the cell for alignment
            cell.classList.add('right-align'); 

            
			
			row.appendChild(cell);
        }
    }
    tbody.appendChild(row);

    // Add table headings
    if (tableCreated) {
        var thead = document.createElement('thead');
        var headRow = document.createElement('tr');

        const translations = {
            "Type": "סוג",
            "Description": "תאור",
            "CurrentBallance": "יתרה בשח",
            "MonthlyPaymant": "הפקדה חודשית",
            "YearRevenue": "תשואה צפויה",
            "InsuranceCost": "עלות ביטוח באחוזים מהפקדה",
            "NihulFromPaymant": "דמי ניהול מהפקדה באחוזים",
            "NihulFromTotal": "דמי ניהול מצבירה באחוזים",
            "MekademHamara": "מקדם המרה",
            "MaslulHaskaha": "מסלול השקעה",
            "Commants": "הערה",
			"MonthlyIncome":"הכנסה חודשית",
			"GidulSachar":"גידול שכר שנתי",
			"PensionNameOwner":"מבוטח",
			
        };


			// // Get the keys of the object
			// var keys = Object.keys(asset);

			// // Reverse the array of keys
			// keys.reverse();

			// // Create a new object with the keys in the reversed order
			// var reversedObjasset = {};
			// keys.forEach(function(key) {
			// 	reversedObjasset[key] = asset[key];
			// });

        for (var key in reversedObjasset) {
            if (!["NezilutDate","Sn", "UserName", "IncludeYesNo", "MonthlyYesNo", "MonthlyPaymantEnd", "SourceOfMonthly", "YitraRelevantDate", "RetirmantDate"].includes(key)) {
                var th = document.createElement('th');
                th.textContent = translations[key] || key;
				
				
				// Add a class to the header cell for alignment. the class is define in the elementor seting
                th.classList.add('right-align'); // Add this line
                headRow.appendChild(th);
            }
        }

        thead.appendChild(headRow);
        table.appendChild(thead);

        // Add CSS style to header row
        headRow.style.backgroundColor = "lightblue";
    }

    // Append the row to the table body
    table.appendChild(tbody);

    // Apply CSS to the container to add scroll
    // container.style.overflowX = "auto";
    // container.style.maxWidth = "100%";
}

function fBuildHonSummerytables(inArray){

	// clear asset table div
	var parentDiv=document.getElementById("Asset-tables-container")
	// console.log("tables clear:",parentDiv)
	while (parentDiv.firstChild) {
        parentDiv.removeChild(parentDiv.firstChild);
    }

	for (let i = 0; i < inArray.length ; i++) {
		if ( fisInglobalAssetsNadlanInvestSet(inArray[i].Type)  )  
		{
			fAddAssetToTable("Asset-tables-container","AssetSummerytableNadlanInvestId",inArray[i],"נכסי נדלן להשקעה")
		}
		if ( fisInglobalAssetsNadlanSet(inArray[i].Type)  )  
		{
			fAddAssetToTable("Asset-tables-container","AssetSummerytableNadlanId",inArray[i],"נכסי נדלן")
		}
		if ( fisInglobalAssetsPensionSet(inArray[i].Type)  )  
		{
			fAddAssetToTable("Asset-tables-container","AssetSummerytablePensionId",inArray[i],"נכסים קיצבתיים")
		}
		if ( fisInglobalAssetsHonSet(inArray[i].Type)  )  
		{
			fAddAssetToTable("Asset-tables-container","AssetSummerytableHonId",inArray[i],"נכסים הוניים")
		}
	}
}

function fHandaleAssetRecords(TempinArray,lInsertIconsYesNo)
{
	//save list to global variable (clone and not reference)
	gAssetRecordsList = TempinArray.slice();
	
	// clear total asset osh effect lisr
	gAllAssetsOshEffect.fill(0);

	//copy(clone,not reference) function input array into inArray, this is done in ordere not to effect the original array
	inArray = TempinArray.slice();

	// remove last element that is not an rec object 
	inArray.pop();
	// Sorting the array based on the "Type" property alphabetically
	inArray.sort((a, b) => {
		return a.Type.localeCompare(b.Type);
	});
	
	if(lInsertIconsYesNo==true)
	{
		// clear asset icons area
		parentDiv=document.getElementById("assetAreaContainerId")
		while (parentDiv.firstChild) {
			parentDiv.removeChild(parentDiv.firstChild);
		}

		//insert icons into icons area
		for (let i = 0; i < inArray.length; i++) {
			// console.log("rec Sn:",inArray[i].Sn);
			// console.log("rec Type:",inArray[i].Type);
			fInsertIconIntoAssetArea(inArray[i].Sn,inArray[i].Type,inArray[i].Description)
			
		}
		//show icons area
		gShowHideAssetIconsArea("block")
	}
	
	fBuildBituachSummerytables(inArray)
	fBuildPensionSummeryTables(inArray)


	//build hon symmery tables		
	fBuildHonSummerytables(inArray)
	
	
	//calc all hon records total sum and monthly paymants
	var lTempRetValue=[]
	var lAssetHonTtypesSum=[]
	var lAssetHonTtypesOshEffect=[]
	lTempRetValue = fAssetCalcRecords(3,0,"",1,inArray)
	lAssetHonTtypesSum=lTempRetValue[0]
	lAssetHonTtypesOshEffect=lTempRetValue[1]
	// Multiply each element by -1 becouse it is mony comeing out of the bank
	lAssetHonTtypesOshEffect = lAssetHonTtypesOshEffect.map(value => value * -1);
	// console.log("osh effect by hon asset:",lAssetHonTtypesOshEffect)
	

	gPlotValuesOverTime(lAssetHonTtypesSum,'שווי נכסים הוניים צפוי על פני זמן ','FutherAssetStatus')
	gAssetHonTtypesSum=lAssetHonTtypesSum
	// gPlotHonAndLoanOverTime('testAsetTotalHonChartId')
	
	

	//calc all pension records total sum and monthly paymants
	lTempRetValue = fAssetCalcRecords(3,0,"",2,inArray)
	console.log("ret value:",lTempRetValue)
	lAssetPensionTtypesSum=lTempRetValue[0]
	lAssetPensionTtypesOshEffect=lTempRetValue[1]
	// Multiply each element by -1 becouse it is mony comeing out of the bank
	lAssetPensionTtypesOshEffect = lAssetPensionTtypesOshEffect.map(value => value * -1);

	console.log("os effect by pension assets:",lAssetPensionTtypesOshEffect)


	gPlotValuesOverTime(lAssetPensionTtypesSum,'שווי נכסים קצבתיים צפוי על פני זמן ','FutherAssetPensionStatus')

	
	//calc all nadlan invest records total sum and monthly paymants
	lTempRetValue = fAssetCalcRecords(3,0,"",4,inArray)
	lAssetHonTtypesSum=lTempRetValue[0]
	lAssetNadlanInvestTtypesOshEffect=lTempRetValue[1]


	gAssetNadlanInvestTtypesOshEffect=lAssetNadlanInvestTtypesOshEffect.slice()
	// console.log("lAssetHonTtypesOshEffect length:",lAssetHonTtypesOshEffect.length)
	if(lAssetHonTtypesOshEffect.length>0){
		gAssetHonTtypesOshEffect=lAssetHonTtypesOshEffect.slice()
	}
	// gAssetHonTtypesOshEffect=lAssetHonTtypesOshEffect.slice()
	
	
	// console.log("os effect by nadlan invest assets:",lAssetNadlanInvestTtypesOshEffect)
	// console.log("nadlan invest assets over time:",lAssetHonTtypesSum)


	// calc hon, pension and nadlan iinvest total effect on osh
	for (let i = 0; i < gAllAssetsOshEffect.length; i++) {
		if( isNaN(lAssetHonTtypesOshEffect[i])){
			lAssetHonTtypesOshEffect[i]=0
		}
		if( isNaN(lAssetPensionTtypesOshEffect[i])){
			lAssetPensionTtypesOshEffect[i]=0
		}
		if( isNaN(lAssetNadlanInvestTtypesOshEffect[i])){
			lAssetNadlanInvestTtypesOshEffect[i]=0
		}
		
		gAllAssetsOshEffect[i]= gAllAssetsOshEffect[i]+lAssetHonTtypesOshEffect[i]+lAssetPensionTtypesOshEffect[i]+lAssetNadlanInvestTtypesOshEffect[i];
		// console.log("t,h,p,n:",gAllAssetsOshEffect[i],lAssetHonTtypesOshEffect[i],lAssetPensionTtypesOshEffect[i],lAssetNadlanInvestTtypesOshEffect[i])
	}
	// console.log("lAssetNadlanInvestTtypesOshEffect:",lAssetNadlanInvestTtypesOshEffect)
	// console.log("lAssetHonTtypesOshEffect:",lAssetHonTtypesOshEffect)


	// calc osh total after the change of asset on osh
	gfcalcTotalOshAndplot()
	//gPlotValuesOverTime(gAllAssetsOshEffect,'יתרת חשבון בנק על פני זמן ','OshgraphInGridId')

	// calc hon assets per type
	var lAssetHonListPerTypeNames=[]
	var lAssetHonListPerTypeCurrentValue=[]
	for (let value of globalAssetsHonSet) {
		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
		//console.log("mode2:",lTempRetValue)	
		if(lTempRetValue[1]!=0)
		{
			lAssetHonListPerTypeNames.push(lTempRetValue[0])
			lAssetHonListPerTypeCurrentValue.push(lTempRetValue[1])
		}
	}
	// console.log("mode2:",lAssetHonListPerTypeNames,lAssetHonListPerTypeCurrentValue)	

	// calc pension assets per type
	var lAssetPensionListPerTypeNames=[]
	var lAssetPensionListPerTypeCurrentValue=[]
	for (let value of globalAssetsPensionSet) {
		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
		//console.log("mode2:",lTempRetValue)	
		if(lTempRetValue[1]!=0)
		{
			lAssetPensionListPerTypeNames.push(lTempRetValue[0])
			lAssetPensionListPerTypeCurrentValue.push(lTempRetValue[1])
		}
	}

	// calc nadlan invest assets per type
	var lAssetNadlanInvestSetListPerTypeNames=[]
	var lAssetNadlanInvestSetListPerTypeCurrentValue=[]
	for (let value of globalAssetsNadlanInvestSet) {
		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
		//console.log("mode2:",lTempRetValue)	
		if(lTempRetValue[1]!=0)
		{
			lAssetNadlanInvestSetListPerTypeNames.push(lTempRetValue[0])
			lAssetNadlanInvestSetListPerTypeCurrentValue.push(lTempRetValue[1])
		}
	}
	// calc nadlan  assets per type
	var lAssetNadlanSetListPerTypeNames=[]
	var lAssetNadlanSetListPerTypeCurrentValue=[]
	for (let value of globalAssetsNadlanSet) {
		lTempRetValue = fAssetCalcRecords(2,0,value,1,inArray)
		
		if(lTempRetValue[1]!=0)
		{
			lAssetNadlanSetListPerTypeNames.push(lTempRetValue[0])
			lAssetNadlanSetListPerTypeCurrentValue.push(lTempRetValue[1])
		}

	}
	// console.log("mode2 nadlan:",lAssetNadlanSetListPerTypeNames,lAssetNadlanSetListPerTypeCurrentValue)	
	
  
  // Function to create traces from keys and values
  function createTraces(keys, values, barName) {
	var traces = [];
	for (var i = 0; i < keys.length; i++) {
		//var yaxis = 'y' + yAxisIndex;
		traces.push({
		x: [barName],
		y: [values[i]],

		marker: {
			//color: 'rgb(55, 83, 109)',
			width: 2 // Adjust the width of the bars here
		},
		name: keys[i],
		type: 'bar',
		hoverinfo: 'skip', // Disable hover
		text: keys[i] + '\n'+ values[i].toLocaleString(), // Displaying key and value on the bar 
		textposition: 'inside', // Displaying text inside the bar
		//texttemplate:'%{y:,}'
		
		// textfont: {
        //     size: 18, // Define the font size here (in pixels)
        // }
		
	  });
	}
	return traces;
  }
  
  
 ///////////////////////////////////////////////////////////// ////////////////////////////////////////////////////
 
var keysArray = lAssetHonListPerTypeNames;
var valuesArray = lAssetHonListPerTypeCurrentValue;
var sum = 0;

// Calculate the sum of valuesArray
for (var i = 0; i < valuesArray.length; i++) {
    sum += valuesArray[i];
}
gTotalAssetHon=sum
var data = [{
    values: valuesArray,
    labels: keysArray,
    type: 'pie',
    hole: 0.4,
	textinfo: 'label+percent', // Display label and percentage
    textposition: 'inside', // Position text inside the pie slice // Hole size to create a donut chart, set to 0 for a pie chart
}];

var layout = {
    title: 'נכסים הוניים נכון להיום',
	titlefont: {
		size: 26,
		
	},
    annotations: [
        {
            text: 'סה"כ:' + sum.toLocaleString(),
            showarrow: false,
            font: {
                size: 14,
                color: 'blue',
                family: 'Arial',
                weight: 'bold'
            }
        }
    ],
    height: 500,
	// width:550
	
};

Plotly.newPlot('CurrentAssetHonStatus', data, layout);
gCopyChartAndaddTitleToReport("CurrentAssetHonStatus","AssetHonPieCharReportId","OshSummery4StateId","AssetHonPieCharReportIdText",true,"נכסי הון נכון להיום")
// Plotly.newPlot('testAssrtPylugPieId', data, layout);
// Plotly.newPlot('testAssetGraphsId', data, layout);


///////////////////////////////////////////////////////////// ////////////////////////////////////////////////////
 
///////////////////////////////////////////////////////////// 

var keysArray = lAssetPensionListPerTypeNames;
var valuesArray = lAssetPensionListPerTypeCurrentValue;
console.log("valuesArray:",valuesArray,"keysArray:",keysArray)
var sum = 0;

// Calculate the sum of valuesArray
for (var i = 0; i < valuesArray.length; i++) {
    sum += valuesArray[i];
}
gTotalPensionHon=sum
var data = [{
    values: valuesArray,
    labels: keysArray,
    type: 'pie',
    hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
	textinfo: 'label+percent', // Display label and percentage
    textposition: 'inside', // Position text inside the pie slice
}];

var layout = {
    title: {
		text:'נכסים קצבתיים נכון להיום',
		font: {
			size: 26,
			
		}
		// x: 2.5
	},
    annotations: [
        {
            // x: 0.5,
            // y: 1.1,
            xref: 'paper',
            yref: 'paper',
            text: 'סה"כ:' + sum.toLocaleString(),
            showarrow: false,
            font: {
                size: 14,
                color: 'blue',
                family: 'Arial',
                weight: 'bold'
            }
        }
    ],
    height: 500,
	
};

Plotly.newPlot('CurrentAssetPensionStatus', data, layout);


  ///////////////////////////////////////////////////////////// 


var keysArray = lAssetNadlanSetListPerTypeNames;
var valuesArray = lAssetNadlanSetListPerTypeCurrentValue;
var sum = 0;

// Calculate the sum of valuesArray
for (var i = 0; i < valuesArray.length; i++) {
    sum += valuesArray[i];
}
gTotalAssetNadlan=sum

var data = [{
    values: valuesArray,
    labels: keysArray,
    type: 'pie',
    hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
	textinfo: 'label+percent', // Display label and percentage
    textposition: 'inside', // Position text inside the pie slice
}];

var layout = {
    title: {
		text:'נכסי נדלן נכון להיום',
		font: {
			size: 26,
			
		}
		// x: 2.5
	},
    annotations: [
        {
            // x: 0.5,
            // y: 1.1,
            xref: 'paper',
            yref: 'paper',
            text: "סך הכל:" + sum.toLocaleString(),
            showarrow: false,
            font: {
                size: 14,
                color: 'blue',
                family: 'Arial',
                weight: 'bold'
            }
        }
    ],
    height: 500,
	
};

Plotly.newPlot('CurrentAssetNadlanStatus', data, layout);

  ///////////////////////////////////////////////////////////// 
var keysArray = lAssetNadlanInvestSetListPerTypeNames;
var valuesArray = lAssetNadlanInvestSetListPerTypeCurrentValue;
var sum = 0;

// Calculate the sum of valuesArray
for (var i = 0; i < valuesArray.length; i++) {
    sum += valuesArray[i];
}
gTotalAssetNadlanInvest=sum
var data = [{
    values: valuesArray,
    labels: keysArray,
    type: 'pie',
    hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
	textinfo: 'label+percent', // Display label and percentage
    textposition: 'inside', // Position text inside the pie slice
}];

var layout = {
    title: {
		text:'נכסי נדלן להשקעה נכון להיום',
		font: {
			size: 26,
			
		}
		// x: 2.5
	},
    annotations: [
        {
            // x: 0.5,
            // y: 1.1,
            xref: 'paper',
            yref: 'paper',
            text: "סך הכל:" + sum.toLocaleString(),
            showarrow: false,
            font: {
                size: 14,
                color: 'blue',
                family: 'Arial',
                weight: 'bold'
            }
        }
    ],
    height: 500,
	
};

Plotly.newPlot('CurrentAssetNadlanInvestStatus', data, layout);


var data = [{
    values: [gTotalAssetHon,gTotalPensionHon,gTotalAssetNadlan,gTotalAssetNadlanInvest],
    labels: ['נכסי הון','נכסי קצבתיים','נכסי נדלן','נכסי נדלן להשקעה'],
    type: 'pie',
    hole: 0.4 ,// Hole size to create a donut chart, set to 0 for a pie chart
	// textinfo: 'label+percent', // Display label and percentage
	text: [gTotalAssetHon.toLocaleString(),gTotalPensionHon.toLocaleString(),gTotalAssetNadlan.toLocaleString(),gTotalAssetNadlanInvest.toLocaleString()], // Display values
	textinfo: 'label + text', // Display label and percentage

    textposition: 'inside', // Position text inside the pie slice
}];

var layout = {
    title: {
		text:'סך כל הנכסים נכון להיום',
		font: {
			size: 26,
			
		}
		// x: 2.5
	},
    annotations: [
        {
            // x: 0.5,
            // y: 1.1,
            xref: 'paper',
            yref: 'paper',
            text: "סך הכל:" + (gTotalAssetHon + gTotalPensionHon + gTotalAssetNadlan + gTotalAssetNadlanInvest).toLocaleString(),
            showarrow: false,
            font: {
                size: 14,
                color: 'blue',
                family: 'Arial',
                weight: 'bold'
            }
        }
    ],
    height: 500,
	
};

Plotly.newPlot('TotalOfAllAssetIdGraph', data, layout);
gCopyChartAndaddTitleToReport("TotalOfAllAssetIdGraph","AssetTotalPieCharReportId","OshSummery4StateId","AssetTotalPieCharReportIdText",true,"סך הכל נכסים נכון להיום")
console.log("total asset invest:",gTotalAssetNadlanInvest)

var legendItems = document.querySelectorAll('.legendtext');
// console.log("ttt:",legendItems)
for (var i = 0; i < legendItems.length; i++) {
    // legendItems[i].setAttribute('text-anchor', 'start');
	// legendItems[i].setAttribute('x', '130');
	legendItems[i].style.textAlign = 'left';
}





}


jQuery( document ).ready(function( $ )
{
        			jQuery( document ).on('submit_success', function(event, response)
					{
									
									// document.getElementById('loading-overlay').style.display = 'none';
									document.getElementById("loading-overlay").style.visibility = "hidden";
									gState="after_server_answer"
									console.log("in quary state:",gState)
									console.log( "type of respond from server:",typeof (response.data) ,"data is:",response.data)
									
									inArray=response.data[1]
									lastElement = inArray[inArray.length - 1];
									console.log("command from server:", lastElement);

									if(lastElement=="edit bituach rec")		
										{
											gSetAssetFormToBeBituachType()
											gState="edit_bituach_rec"
											console.log("editbituach")
											document.getElementById("BituachtFormID").style.display="block"
											document.getElementById("LoanFormHeaderId").children[0].children[0].innerHTML=response.data["1"]["0"]["Type"]	

											document.getElementById("form-field-BituachSnId").value=response.data["1"]["0"]["Sn"]
											document.getElementById("form-field-BituachDescriptionId").value=response.data["1"]["0"]["Description"]
											document.getElementById("form-field-BituachMisparPolisaId").value=response.data["1"]["0"]["BituachMisparPolisa"]
											document.getElementById("form-field-BituachTypeId").value=response.data["1"]["0"]["Type"]
											document.getElementById("form-field-BituachNameOwnerId").value=response.data["1"]["0"]["BituachNameOwner"]
											document.getElementById("form-field-BituachKitzbaId").value=response.data["1"]["0"]["BituachKitzba"]
											document.getElementById("form-field-BituachHatPeami").value=response.data["1"]["0"]["BituachHatPeami"]
											document.getElementById("form-field-BituachCommantsId").value=response.data["1"]["0"]["Commants"]

											gAssetHonFormContainer.style.display="block"



										}			
									if(lastElement=="edit loan rec"){
										document.getElementById("LoanFormId").style.display="block"
										document.getElementById("masterofAllLoanDivId").style.display="none"
										// todo:
										
										// set header  label of the form
										//document.getElementById("LoanFormHeaderId").children[0].children[0].innerHTML="הלוואה עם החזר מסוג: " + response.data["1"]["0"]["ReturnType"]
										document.getElementById("LoanFormHeaderId").children[0].children[0].innerHTML=response.data["1"]["0"]["ReturnType"]									
										
										document.getElementById("form-field-LoanDescriptionId").value=response.data["1"]["0"]["Description"]

										document.getElementById("form-field-LoanSnId").value=response.data["1"]["0"]["Sn"]
										document.getElementById("form-field-LoanReturnTypeId").value=response.data["1"]["0"]["ReturnType"]
										document.getElementById("form-field-LoanRibitId").value=response.data["1"]["0"]["YearRibit"]

										document.getElementById("form-field-LoanmakorHafkataHodshitId").value=response.data["1"]["0"]["SourceOfMonthly"]
										document.getElementById("form-field-LoanYitraId").value=response.data["1"]["0"]["CurrentBallance"]
										document.getElementById("form-field-LoanGraceYesNoId").value=response.data["1"]["0"]["GraceYesNo"]
										document.getElementById("form-field-loanGraceMonthNumId").value=response.data["1"]["0"]["GraceNumMonth"]
										document.getElementById("form-field-LoanMadadYesNoId").value=response.data["1"]["0"]["MadadYesNo"]
										document.getElementById("form-field-LoanMadaTzafiId").value=response.data["1"]["0"]["MadadTzefi"]
										document.getElementById("form-field-LoanribitChanfeYesnoId").value=response.data["1"]["0"]["RibitChangeYesNo"]
										document.getElementById("form-field-LoanRibitChangeId").value=response.data["1"]["0"]["RibitChaneValue"]
										document.getElementById("form-field-LoanRibitChangeNumOfMonthId").value=response.data["1"]["0"]["RibitChaneNumOfMonth"]
										document.getElementById("form-field-LoanYitraRelevantDateId").value=response.data["1"]["0"]["YitraRelevantDate"]
										document.getElementById("form-field-LoanEndDateId").value=response.data["1"]["0"]["EndDate"]
										document.getElementById("form-field-LoanCommantsId").value=response.data["1"]["0"]["Commants"]

										 // set step size for controlers in the form
										document.getElementById("form-field-LoanYitraId").step = 1000
										document.getElementById("form-field-loanGraceMonthNumId").step = 1
										document.getElementById("form-field-LoanRibitId").step = 0.1
										document.getElementById("form-field-LoanMadaTzafiId").step = 0.1
										document.getElementById("form-field-LoanRibitChangeId").step = 0.1
										document.getElementById("form-field-LoanRibitChangeNumOfMonthId").step = 1

										// Check the value of the GraceYesNo element
										tmp=document.getElementById("form-field-loanGraceMonthNumId")
										mlabel = tmp.closest('.elementor-field-group').querySelector('label');
										if (response.data["1"]["0"]["GraceYesNo"] === "כן") { // Change 'SomeValue' to the value you want to trigger the hiding
											// document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'block';// Hide the element;
											
											// 1document.getElementById("form-field-loanGraceMonthNumId").style.visibility = 'visible';// Hide the element
											document.getElementById("form-field-loanGraceMonthNumId").style.display = 'block'; // Show element
       
											mlabel.style.display = 'block';
										} //of if
										else{
											// document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'none';// Hide the element;
											document.getElementById("form-field-loanGraceMonthNumId").style.display = 'none'; // Show element
       
											mlabel.style.display = 'none';
										}

										// Check the value of the GraceYesNo element
										tmp=document.getElementById("form-field-LoanMadaTzafiId")
										mlabel = tmp.closest('.elementor-field-group').querySelector('label');
										if (response.data["1"]["0"]["MadadYesNo"] === "כן") { // Change 'SomeValue' to the value you want to trigger the hiding
											// document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'block';// Hide the element;
											
											// 1document.getElementById("form-field-loanGraceMonthNumId").style.visibility = 'visible';// Hide the element
											document.getElementById("form-field-LoanMadaTzafiId").style.display = 'block'; // Show element
       
											mlabel.style.display = 'block';
										} //of if
										else{
											// document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'none';// Hide the element;
											document.getElementById("form-field-LoanMadaTzafiId").style.display = 'none'; // Show element
       
											mlabel.style.display = 'none';
										}

										// Check the value of the LoanribitChanfeYesnoId element
										tmp=document.getElementById("form-field-LoanRibitChangeId")
										mlabel = tmp.closest('.elementor-field-group').querySelector('label');
										tmp=document.getElementById("form-field-LoanRibitChangeNumOfMonthId")
										mlabel1 = tmp.closest('.elementor-field-group').querySelector('label');
										if (response.data["1"]["0"]["RibitChangeYesNo"] === "כן") { // Change 'SomeValue' to the value you want to trigger the hiding
											// document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'block';// Hide the element;
											
											// 1document.getElementById("form-field-loanGraceMonthNumId").style.visibility = 'visible';// Hide the element
											document.getElementById("form-field-LoanRibitChangeId").style.display = 'block'; // Show element
											mlabel.style.display = 'block';
											document.getElementById("form-field-LoanRibitChangeNumOfMonthId").style.display = 'block'; // Show element
											mlabel1.style.display = 'block';
										} //of if
										else{
											// document.getElementsByClassName("elementor-field-group-loanGraceMonthNumId")[0].style.display = 'none';// Hide the element;
											document.getElementById("form-field-LoanRibitChangeId").style.display = 'none'; // Show element
											mlabel.style.display = 'none';
											document.getElementById("form-field-LoanRibitChangeNumOfMonthId").style.display = 'none'; // Show element
											mlabel1.style.display = 'none';
										}
										fCalcLoanRecForPreview()
									}
									
									
									
									if(lastElement=="save netunay ashray file" || lastElement=="add loan record" || lastElement=="delete loan rec" || lastElement=="read all user loan rec"){
										fHandaleLoanRecords(inArray,true)
										
										// console.log("got all loan rec",inArray,"gAllLoansOshEffect:",gAllLoansOshEffect)
										//if read all user loan it means it is when page load after all hon and then we need to read osh
										if (lastElement=="read all user loan rec") {
											gReadFromDbAllOsh()
											return
										}

									}

									if(lastElement=="read all osh rec" || lastElement == 'save osh properties'){
										console.log("got all osh rec",gOshRecordsList)
										gOshRecordsList = inArray.slice();
										if(lastElement=="save osh properties"){
											//click element id:CurrentStatusOshCheckBoxId
											document.getElementById("CurrentStatusOshCheckBoxId").click()
										}
										fHandaleOsh(true)
									}


									//if new asset (or edit) was saved in the DB then update charts status area
									if( lastElement == "save bituach file" ||  lastElement=="add bituach record" ||  lastElement=="add hon record" || lastElement=="add pension record" || lastElement=="add nadlan invest record" || lastElement=="add nadlan record" || lastElement=="delete rec")    
									{
										fHandaleAssetRecords(inArray,true)
									}
									
									
									//this respond from server will reach here if the edit icon on an asset hon icon is presses
									///////////////////////////////////////////////////////////////////////////////////////////
									///////////////////////////////////////////////////////////////////////////////////////////
									if(lastElement=="edit asset hon rec")
									{
										gState="edit_hon_rec"
										//hide all sections that only record to be edited will be seen
										gAssedAreaSectionId.style.display="none"
										/////////////////////////////////////////////////////////////
										
										
										gSetAssetFormToBeHonType()
										document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML=response.data["1"]["0"]["Type"]

										
										document.getElementById("form-field-assetYitraId").value=response.data["1"]["0"]["CurrentBallance"]
										document.getElementById("form-field-YitraRelevantDateId").value=response.data["1"]["0"]["YitraRelevantDate"]
										document.getElementById("form-field-assetDescriptionId").value=response.data["1"]["0"]["Description"]
										document.getElementById("form-field-hafkadaHodshitId").value=response.data["1"]["0"]["MonthlyPaymant"]
										document.getElementById("form-field-endMonthPaymantId").value=response.data["1"]["0"]["MonthlyPaymantEnd"]
										document.getElementById("form-field-IsAMonthlyPaymantId").value=response.data["1"]["0"]["MonthlyYesNo"]
										document.getElementById("form-field-taarichNezilutId").value=response.data["1"]["0"]["NezilutDate"]
										document.getElementById("form-field-AssetHonSnId").value=response.data["1"]["0"]["Sn"]
										console.log(   "form field before updated from db",document.getElementById("form-field-makorHafkataHodshitId").value    )   
										console.log(    "source from db",response.data["1"]["0"]["SourceOfMonthly"])
										document.getElementById("form-field-makorHafkataHodshitId").value=response.data["1"]["0"]["SourceOfMonthly"]
										console.log("form field after updated from db",document.getElementById("form-field-makorHafkataHodshitId").value)
										document.getElementById("form-field-AssetHonTypeId").value=response.data["1"]["0"]["Type"]
										// Check the value of the select element
										if (value=response.data["1"]["0"]["MonthlyYesNo"] === "Yes") { // Change 'SomeValue' to the value you want to trigger the hiding
												gAssetHonHafkadaHodshit[0].style.visibility = 'visible';// Hide the element
												gAssetHonEndHafkada[0].style.visibility = 'visible';// Hide the element
												gAssetHonMakorHafkada[0].style.visibility = 'visible';// Hide the element
										} //of if
										else{
												gAssetHonHafkadaHodshit[0].style.visibility = 'hidden';// Hide the element
												gAssetHonEndHafkada[0].style.visibility = 'hidden';// Hide the element
												gAssetHonMakorHafkada[0].style.visibility = 'hidden';// Hide the element
												}//of else
										document.getElementById("form-field-tzefiTsuaShnatiId").value=response.data["1"]["0"]["YearRevenue"] 

										document.getElementById("form-field-MaslulHaskahaId").value=response.data["1"]["0"]["MaslulHaskaha"] 
										document.getElementById("form-field-AssetHonCommantsId").value=response.data["1"]["0"]["Commants"]


										

										
										gAssetHonFormContainer.style.display="block"
										fCalcAssetHonRecForPreview()
									}
										
											
								
									//end of "edit rec"////////////////////////////////////////////////////////////////////////
									///////////////////////////////////////////////////////////////////////////////////////////
									///////////////////////////////////////////////////////////////////////////////////////////
									else
									{
										//this respond from server will reach here after the front hand window is loaded  
										///////////////////////////////////////////////////////////////////////////////////////////
										///////////////////////////////////////////////////////////////////////////////////////////
										if(lastElement=="read all user asset rec" || lastElement=="save asset hon file"  || lastElement=="save asset pension file"   )
										{
												gState="read all user asset rec or save file"
												
												for (let i = 0; i < inArray.length - 1; i++) {
													// console.log("rec Sn:",inArray[i].Sn);
													// console.log("rec Type:",inArray[i].Type);
													fInsertIconIntoAssetArea(inArray[i].Sn,inArray[i].Type,inArray[i].Description)
													gShowHideAssetIconsArea("block")
												}// of dorf
												fHandaleAssetRecords(inArray,true)
												gReadFromDbAllLoanRecords()
												return
										}//of if
										else
										{
											if(lastElement=="edit pension hon rec")
											{
												gState="edit_pension_rec"
												// console.log("in pension edit")
												//hide all sections that only record to be edited will be seen
												gAssedAreaSectionId.style.display="none"
												/////////////////////////////////////////////////////////////
												
												
												gSetAssetFormToBePensionType()
												// console.log("got an asset pension rec to edit")
												document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML=response.data["1"]["0"]["Type"]
												console.log("editbug:",response.data)
												document.getElementById("form-field-AssetpensionOwnerNameId").value=response.data["1"]["0"]["PensionNameOwner"]
																																             
	
												document.getElementById("form-field-assetPensiaYitraId").value=response.data["1"]["0"]["CurrentBallance"]
												document.getElementById("form-field-YitraPensionRelevantDateId").value=response.data["1"]["0"]["YitraRelevantDate"]
												document.getElementById("form-field-assetPensionDescriptionId").value=response.data["1"]["0"]["Description"]
												document.getElementById("form-field-hafkadaHodshitPensionId").value=response.data["1"]["0"]["MonthlyPaymant"]
												document.getElementById("form-field-endMonthPaymantPensionId").value=response.data["1"]["0"]["MonthlyPaymantEnd"]
												document.getElementById("form-field-IsAMonthlyPaymantPensionId").value=response.data["1"]["0"]["MonthlyYesNo"]
												document.getElementById("form-field-AssetPensionSnId").value=response.data["1"]["0"]["Sn"]
												document.getElementById("form-field-makorHafkataHodshitPensiaId").value=response.data["1"]["0"]["SourceOfMonthly"]
												document.getElementById("form-field-AssetPensionTypeId").value=response.data["1"]["0"]["Type"]
												document.getElementById("form-field-AssetPensionBituachYearCostId").value=response.data["1"]["0"]["InsuranceCost"]
												document.getElementById("form-field-AssetPensionDmeiNiulpaymantId").value=response.data["1"]["0"]["NihulFromPaymant"]
												document.getElementById("form-field-AssetPensionDmeiNiulTotalId").value=response.data["1"]["0"]["NihulFromTotal"]
												document.getElementById("form-field-taarichpensiaId").value=response.data["1"]["0"]["RetirmantDate"]
												document.getElementById("form-field-AssetPensionMekademId").value=response.data["1"]["0"]["MekademHamara"]
												// Check the value of the select element
												if (value=response.data["1"]["0"]["MonthlyYesNo"] === "Yes") { 
														gAssetPensionHafkadaHodshit[0].style.visibility = 'visible';// Hide the element
														gAssetPensionEndHafkada[0].style.visibility = 'visible';// Hide the element
														gAssetPensionMakorHafkada[0].style.visibility = 'visible';// Hide the element
												} //of if
												else{
														gAssetPensionHafkadaHodshit[0].style.visibility = 'hidden';// Hide the element
														gAssetPensionEndHafkada[0].style.visibility = 'hidden';// Hide the element
														gAssetPensionMakorHafkada[0].style.visibility = 'hidden';// Hide the element
														}//of else
												document.getElementById("form-field-tzefiTsuaShnatiPensionId").value=response.data["1"]["0"]["YearRevenue"] 


												
												document.getElementById("form-field-AssetPensionGidulSachar").value=response.data["1"]["0"]["GidulSachar"]

												document.getElementById("form-field-AssetPensionmaslulHaskahaId").value=response.data["1"]["0"]["MaslulHaskaha"] 
												document.getElementById("form-field-AssetPensionCommantsId").value=response.data["1"]["0"]["Commants"] 


												 
												 

												
												gAssetHonFormContainer.style.display="block"
												fCalcAssetPensionRecForPreview()
												
											}
											else
											{
												if(lastElement=="edit nadlan hon rec")
												{
													gState="edit_nadlan_rec"
													console.log("in nadlan edit")
													//hide all sections that only record to be edited will be seen
													gAssedAreaSectionId.style.display="none"
													/////////////////////////////////////////////////////////////
													
													
													gSetAssetFormToBeNadlanType()
													// console.log("got an asset nadlan rec to edit")
													document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML=response.data["1"]["0"]["Type"]
													document.getElementById("form-field-AssetNadlanCommants").value=response.data["1"]["0"]["Commants"]
													document.getElementById("form-field-assetNadlanYitraId").value=response.data["1"]["0"]["CurrentBallance"]
													document.getElementById("form-field-YitraNadlanRelevantDateId").value=response.data["1"]["0"]["YitraRelevantDate"]
													document.getElementById("form-field-assetNadlanDescriptionId").value=response.data["1"]["0"]["Description"]
													document.getElementById("form-field-AssetNadlanSnId").value=response.data["1"]["0"]["Sn"]
													document.getElementById("form-field-AssetNadlanTypeId").value=response.data["1"]["0"]["Type"]
													document.getElementById("form-field-taarichNezilutNadlanId").value=response.data["1"]["0"]["NezilutDate"]
													
													document.getElementById("form-field-tzefiTsuaShnatiNadlanId").value=response.data["1"]["0"]["YearRevenue"] 
													
													gAssetHonFormContainer.style.display="block"
													fCalcAssetNadlanRecForPreview()
												
												}
												else
												{
													if(lastElement=="edit nadlan invest hon rec")
													{
														gState="edit_nadlan_invest_rec"
														// console.log("in nadlan invest edit")
														//hide all sections that only record to be edited will be seen
														gAssedAreaSectionId.style.display="none"
														/////////////////////////////////////////////////////////////
														
														
														gSetAssetFormToBeNadlanInvestType()
														// console.log("got an asset nadlan invest rec to edit")
														document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML=response.data["1"]["0"]["Type"]
														document.getElementById("form-field-AssetNadlanInvestCommants").value=response.data["1"]["0"]["Commants"]
														document.getElementById("form-field-assetNadlanInvestYitraId").value=response.data["1"]["0"]["CurrentBallance"]
														document.getElementById("form-field-YitraNadlanInvestRelevantDateId").value=response.data["1"]["0"]["YitraRelevantDate"]
														document.getElementById("form-field-assetNadlanInvestDescriptionId").value=response.data["1"]["0"]["Description"]
														document.getElementById("form-field-AssetNadlanInvestSnId").value=response.data["1"]["0"]["Sn"]
														document.getElementById("form-field-AssetNadlanInvestTypeId").value=response.data["1"]["0"]["Type"]
														document.getElementById("form-field-taarichNezilutNadlanInvestId").value=response.data["1"]["0"]["NezilutDate"]
														document.getElementById("form-field-tzefiMonthIncomeNadlanInvestId").value=response.data["1"]["0"]["MonthlyIncome"]
														
														document.getElementById("form-field-tzefiTsuaShnatiNadlanInvestId").value=response.data["1"]["0"]["YearRevenue"] 
														
														gAssetHonFormContainer.style.display="block"
														fCalcAssetNadlanInvestRecForPreview()
													
													}
													
													
													
												}
											}
										}
										//end of "read user asset rec"////////////////////////////////////////////////////////////////////////
												///////////////////////////////////////////////////////////////////////////////////////////
												///////////////////////////////////////////////////////////////////////////////////////////
									}//of else
									
									
										
									
        			});
}); 
///////////////////////////////////////////////////////////////////////////////////////////
	
// Add an event listener to the gcancelAssetHonBtn "X" icon to close the asset hon form
gcancelAssetHonBtn.addEventListener('click', function() {
			
  // hide and show elements on the page
	 gAssetHonFormContainer.style.display="none"	
	// gDispalyUserDataGraphArea.style.display="block"
	 gselectAssetHonSaveBtn.disabled = false;
  	// gAssedAreaSectionId.style.display="block"
	console.log("CCCLLLIICCCCKKKK")
	  gShowHideAssetIconsArea("block")
	  
})
////////////////////////////////////////////////////////////////////////////////////////////////////
			
function fValidateBituachForm(){
	let lerror=""
	
	if (document.getElementById("form-field-BituachDescriptionId").value == ""){
		lerror="חובה למלא תיאור"
	}
	if (document.getElementById("form-field-BituachNameOwnerId").value == ""){
		lerror="חובה למלא שם"
	}
	if (document.getElementById("form-field-BituachHatPeami").value == ""){
		lerror="חובה למלא סכום חד פעמי"
	}
	if (document.getElementById("form-field-BituachKitzbaId").value == ""){
		lerror="חובה למלא סכום קיצבה"
	}
	if(document.getElementById("form-field-BituachMisparPolisaId").value ==""){
		lerror="חובה למלא מספר פוליסה"
	}
	return lerror
	
}
// when the save button of asset hon  (styled one, the םriginal form nutton is hard to styled) is pressed this function is called
gsaveFormAssethonId.addEventListener('click', function() {

	var lError=""
	console.log("from after save pressed state:",gState)

	//hide forms area
	gAssetHonFormContainer.style.display="none"	
	// display graph area
	//gDispalyUserDataGraphArea.style.display="block"
	//enable the select asset form save button
	gselectAssetHonSaveBtn.disabled = false;
	// show the complete asset area
	gAssedAreaSectionId.style.display="block"
	gShowHideAssetIconsArea("block")


	var lAssetType=""
	// if the user press save afre creating new record
	if(gState == "new_record")
	{
		lAssetType=gAssetNameToInsert.value
		console.log("TTYYYPPEEE:",lAssetType)
		if (fisInglobalAssetsPensionSet(lAssetType))
		{
			document.getElementById("form-field-AssetPensionTypeId").value=lAssetType
		}
		else {
			if (fisInglobalAssetsHonSet(lAssetType))
			{
				document.getElementById("form-field-AssetHonTypeId").value=lAssetType
			}
			else{
				if (fisInglobalAssetsNadlanSet(lAssetType))
				{
					document.getElementById("form-field-AssetNadlanTypeId").value=lAssetType
				}
				else{
					if (fisInglobalAssetsNadlanInvestSet(lAssetType))
					{
						document.getElementById("form-field-AssetNadlanInvestTypeId").value=lAssetType
					}
					else{
						if(fisInglobalAssetBituachSet(lAssetType)){
							document.getElementById("form-field-BituachTypeId").value=lAssetType
							console.log("from save bituach",lAssetType)
							let lerror=""
							lerror=fValidateBituachForm()
							if(lerror!=""){
								alert(lerror)
								return
							}
						}
						
					}
	
				}

			}
		}
		// console.log("new reord type:",lAssetType)
		
	}
	// if the user press save after editing hon rec
	if(gState == "edit_hon_rec")
	{
		lAssetType=document.getElementById("form-field-AssetHonTypeId").value
	}
	// if the user press save after editing pension rec
	if(gState == "edit_pension_rec")
	{
		lAssetType=document.getElementById("form-field-AssetPensionTypeId").value
	}
	if(gState == "edit_nadlan_rec")
	{
		lAssetType=document.getElementById("form-field-AssetNadlanTypeId").value
	}
	if(gState == "edit_nadlan_invest_rec")
	{
		lAssetType=document.getElementById("form-field-AssetNadlanInvestTypeId").value
													   
	}

	if(gState == "edit_bituach_rec")
		{
			lAssetType=document.getElementById("form-field-BituachTypeId").value
														   
		}


	console.log("from save press state:",gState,"type:",lAssetType)

	if (fisInglobalAssetsPensionSet(lAssetType))
	{
		// console.log("from save pension")
		var lAssetSn = document.getElementById("form-field-AssetPensionSnId")
		var lAssetDiscription = document.getElementById("form-field-assetPensionDescriptionId")
		var lButtonToClickOn=gAssetPensionTypeUserInputFormButton
	}
	else{
		if (fisInglobalAssetsHonSet(lAssetType))
		{	
		
		var lAssetSn = document.getElementById("form-field-AssetHonSnId")
		var lAssetDiscription = document.getElementById("form-field-assetDescriptionId")
		var lButtonToClickOn=gAssetHonTypeUserInputFormButton
		console.log("from save hon:","Sn:",lAssetSn,"description:",lAssetDiscription)
		}
		else{
			if(fisInglobalAssetsNadlanSet(lAssetType)){
				 console.log("from save nadlan")
				var lAssetSn = document.getElementById("form-field-AssetNadlanSnId")
				var lAssetDiscription = document.getElementById("form-field-assetNadlanDescriptionId")
				var lButtonToClickOn=gAssetNadlanTypeUserInputFormButton

			}
			else{
				if(fisInglobalAssetsNadlanInvestSet(lAssetType)){
					 console.log("from save nadlan invest")
					var lAssetSn = document.getElementById("form-field-AssetNadlanInvestSnId")
					var lAssetDiscription = document.getElementById("form-field-assetNadlanInvestDescriptionId")
					var lButtonToClickOn=gAssetNadlanInvestTypeUserInputFormButton
				}
				else{
					if(fisInglobalAssetBituachSet(lAssetType)){
						console.log("from save bituach")
						var lAssetSn = document.getElementById("form-field-BituachSnId")
						var lAssetDiscription = document.getElementById("form-field-BituachDescriptionId") 
						var lButtonToClickOn=document.getElementById("BituachFormButtonID")
					}
					else{
						lError="error"
					}					
				}
			}
			
		}
		
	}
	
	//if SN exist it means we are in an update phaze so skip all code that create new asset and just send the form to server
	if( lAssetSn.value == "" )
	{
		//create uniq SN for the new record
		timestamp=gGetCurrentTimeAsnumberString()
		
		//get the discription that user give to the new asset
		assetDiscription = lAssetDiscription.value; 
		console.log("from save bituach no SN before fix",assetDiscription)
		if(fisInglobalAssetBituachSet(lAssetType)){
			assetDiscription= document.getElementById("form-field-BituachNameOwnerId").value + " " + assetDiscription + " " + document.getElementById("form-field-BituachMisparPolisaId").value
			lAssetDiscription.value=assetDiscription
			console.log("from save bituach no SN after fix",assetDiscription)
		}
			

		// insert into the form the SN
		lAssetSn.value=timestamp
		//add new icon into asset hon section
		//fInsertIconIntoAssetArea(timestamp,lAssetType,assetDiscription)

		// document.getElementById('loading-overlay').style.display = 'block';
		document.getElementById("loading-overlay").style.visibility = "visible";
		lButtonToClickOn.click()
	}
	else{
		console.log("click on form button after edit",lButtonToClickOn)
		// document.getElementById('loading-overlay').style.display = 'block';
		document.getElementById("loading-overlay").style.visibility = "visible";
		
		
		
		// if(fisInglobalAssetBituachSet(lAssetType)){
		// 	assetDiscriptionvalue = document.getElementById("form-field-BituachDescriptionId").value
		// 	console.log("from save bituach yes SN before fix",assetDiscriptionvalue)
		// 	assetDiscriptionvalue= assetDiscriptionvalue + " " + document.getElementById("form-field-BituachMisparPolisaId").value
		// 	document.getElementById("form-field-BituachDescriptionId").value=assetDiscriptionvalue
		// 	console.log("from save bituach yes SN after fix",assetDiscriptionvalue)
		// }
		lButtonToClickOn.click()

	}
	
	
	
													 
})
//////////////////////////////////////////////////////////////////////////////////////////

////add a fuction that run when selectAssetHonSaveBtn is clicked (user select new asset hon to add)
gselectAssetHonSaveBtn.addEventListener('click', function() {
		
		gState="new_record"
		console.log("state:",gState)


		gShowHideAssetIconsArea("none")
		gAssetHonFormContainer.style.display="block"
		//hide graph area
		// gDispalyUserDataGraphArea.style.display="none"
		//hide the complete area of the assets icons
		gAssedAreaSectionId.style.display="none"
		
		if (fisInglobalAssetsHonSet(gAssetNameToInsert.value))
		{
			gSetAssetFormToBeHonType()
			console.log("hon")
			//change form title to ="קליטת נכס הון חדש"
			document.getElementById("AssetHonFormLabelId").children[0].children[0].innerHTML="קליטת נכס הוני קיים"
		}
		else{
			// check if asset is in the set of pension
			console.log("str:",gAssetNameToInsert.value)
			console.log( fisInglobalAssetBituachSet(gAssetNameToInsert.value),globalAssetsBituachSet)
			if(fisInglobalAssetsPensionSet(gAssetNameToInsert.value))
				{
					//gSetAssetFormToBeHonType()
					gSetAssetFormToBePensionType()
				}
			if(fisInglobalAssetsNadlanSet(gAssetNameToInsert.value))
				{
					gSetAssetFormToBeNadlanType()
				}
			if(fisInglobalAssetsNadlanInvestSet(gAssetNameToInsert.value))
				{
					gSetAssetFormToBeNadlanInvestType()
				}
			if(fisInglobalAssetBituachSet(gAssetNameToInsert.value))
				{
					
					gSetAssetFormToBeBituachType()
				}
			
		}
})

// check box for open laod file div
	// LoadMislakaFileCheckBoxId

// read mislaka area
	// AssetReadMislakaAreaId

// select file button
	// AssetexcelFile
	
document.getElementById("LoadMislakaFileCheckBoxId").addEventListener("click", function() {


	lstatus=document.getElementById("AssetReadMislakaAreaId").style.display
	console.log("status99:",lstatus)
	if(lstatus=="none"){
		document.getElementById("AssetReadMislakaAreaId").style.display="block" 
		console.log("status99:",lstatus)

	}
	else{
		document.getElementById("AssetReadMislakaAreaId").style.display="none"  
	}
});

document.getElementById('AssetexcelFile').addEventListener('change', function(evt) {
    console.log("read asset file")
	
	
	
	var lFileOwner = document.getElementById('form-field-AssetFileOwnerNameFieldId').value;
	gFileowner=lFileOwner
	console.log("file owner:",lFileOwner)											  	
    // If the input field is empty, return from the function
    if (!lFileOwner) {
        console.log('No user name provided');
		alert('הכנס שם בעל הקובץ'); 
		evt.target.value = '';
        return;
    }
	document.getElementById("form-field-AssetFileNameOwnerNameFieldI").value=evt.target.files[0].name
	document.getElementById('form-field-AssetFileOwnerNameFieldId').value = ''
	
	console.log("file owner:",lFileOwner)
	
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        var worksheet = workbook.Sheets["פרטי המוצרים שלי"];
        var jsonData = XLSX.utils.sheet_to_json(worksheet, {header:1});
		console.log("assetjson:",jsonData);

		console.log("assetjson:",jsonData[0],gMislakaHeader,typeof(jsonData[0]));
		
		if( typeof(jsonData[0]) === 'undefined' )
			{
				alert("קובץ לא נתמך")
				return
			}

		if((! garraysEqual(jsonData[0],gMislakaHeader)) || (typeof(jsonData[0]) === 'undefined') )
			{
				alert("קובץ לא תקין")
				return
			}


		const AssetHoncolumnMapping = {
            "Sn": {col: 2},
			"CurrentBallance": {col: 4},
        };
		const AssetPensionMapping = {
            "Sn": {col: 2},
			"CurrentBallance": {col: 4},
			"NihulFromPaymant": {col: 11},
			"NihulFromTotal": {col: 12},
        };

		let AssetHonResult = [];
		let AssetPensionResult = [];
		// start from i=1, i-0 is heading of table in excel file
		for(let i = 1; i < jsonData.length; i++) {
			let lKitzbaTzfuya= jsonData[i][7]
			// pension type
			
			let obj = {};
			// if pension
			if (lKitzbaTzfuya >0) {
				for (let key in AssetPensionMapping) {
                    
					obj[key] = jsonData[i][AssetPensionMapping[key].col];
					console.log("key:",key,"AssetPensionMapping[key].col",AssetPensionMapping[key].col)
				}
				obj["Sn"]=obj["Sn"]+"_"+i

				obj["Type"]=jsonData[i][0]
				var lSupportedTypes=["קרן פנסיה","פנסיה חדשה כללית","פנסיה חדשה מקיפה","פוליסת ביטוח חיים משולב חיסכון","פוליסת חיסכון טהור","קופת גמל"]
				if ( !(lSupportedTypes.includes( obj["Type"]) ) ) {
					console.log("נכס קיצבתי:",  obj["Type"],"לא נתמך")
					obj["Type"] = "לא נתמך";
					
				}
				else{
					
					console.log("נכס קיצבתי:",  obj["Type"],"נתמך")
					// obj["Type"]=jsonData[i][0]
					if (obj["Type"] === "פוליסת ביטוח חיים משולב חיסכון") {
						obj["Type"] = "ביטוח מנהלים קצבתי";
					} else if (obj["Type"] === "פוליסת חיסכון טהור") {
						obj["Type"] = "ביטוח מנהלים קצבתי";
					} else if (obj["Type"] === "קופת גמל") {
						obj["Type"] = "קופת גמל לקצבה";
					}else if (obj["Type"] === "פנסיה חדשה כללית") {
						obj["Type"] = "קרן פנסיה";
					}
					else if (obj["Type"] === "פנסיה חדשה מקיפה") {
						obj["Type"] = "קרן פנסיה";
					}
					
					

					obj["Description"]=lFileOwner+ "-" + jsonData[i][1]+" " +jsonData[i][0] +" " + jsonData[i][3] 

					lHafkatot=jsonData[i][14]+jsonData[i][15]
					if(lHafkatot>0){
						obj["MonthlyYesNo"]="Yes"
						obj["MonthlyPaymant"]=lHafkatot
					}
					else{
						obj["MonthlyYesNo"]="No"
						obj["MonthlyPaymant"]=0	
					}
				
					obj["MonthlyPaymantEnd"]=""
					obj["SourceOfMonthly"]=""
					obj["YearRevenue"]=0
					console.log("value:",jsonData[i][5],"type:",typeof(jsonData[i][5]))
					if(jsonData[i][5]!=""){
						obj["NezilutDate"]=jsonData[i][5]
					}else{
						obj["NezilutDate"]=""
					}

					obj["YitraRelevantDate"]=jsonData[i][29]

					obj["MaslulHaskaha"]=""
					obj["Commants"]=""


					obj["InsuranceCost"]=0
					obj["MekademHamara"]=200
					obj["RetirmantDate"]=""
					obj["PensionNameOwner"]=lFileOwner

					AssetPensionResult.push(obj);
				}



				
			}
			// Hon type
			else{
				for (let key in AssetHoncolumnMapping) {
                    
					obj[key] = jsonData[i][AssetHoncolumnMapping[key].col];
					// console.log("key:",key,"AssetPensionMapping[key].col",AssetPensionMapping[key].col)
				}
				obj["Sn"]=obj["Sn"]+"_"+i
				obj["Type"]=jsonData[i][0]

				var lSupportedTypes=["פוליסת ביטוח חיים משולב חיסכון","פוליסת חיסכון טהור","קופת גמל","קופת גמל","קרן השתלמות","חיסכון לכל ילד","פוליסת ביטוח חיים משולב חיסכון","קופת גמל להשקעה"]
				if ( !(lSupportedTypes.includes( obj["Type"]) ) ) {
					console.log("נכס הוני:",  obj["Type"],"לא נתמך")
					obj["Type"] = "לא נתמך";
					
				}
				else{
					
					console.log("נכס הוני:",  obj["Type"],"נתמך")
					if (obj["Type"] === "פוליסת חיסכון טהור") {
						obj["Type"] = "תוכנית ביטוח לחיסכון";
					} else if (obj["Type"] === "קופת גמל") {
						obj["Type"] = "קופת גמל הונית";
					}else if (obj["Type"] === "פוליסת ביטוח חיים משולב חיסכון") {
						obj["Type"] = "ביטוח מנהלים הוני";}
					obj["Description"]=lFileOwner+ "-" + jsonData[i][1]+" " +jsonData[i][0] +" " + jsonData[i][3] 
	
					lHafkatot=jsonData[i][14]+jsonData[i][15]
					if(lHafkatot>0){
						obj["MonthlyYesNo"]="Yes"
						obj["MonthlyPaymant"]=lHafkatot
					}
					else{
						obj["MonthlyYesNo"]="No"
						obj["MonthlyPaymant"]=0	
					}
					obj["MonthlyPaymantEnd"]=""
					obj["SourceOfMonthly"]=""
					obj["YearRevenue"]=0
					
					console.log("value:",jsonData[i][5],"type:",typeof(jsonData[i][5]))
					if(jsonData[i][5]!=""){
						obj["NezilutDate"]=jsonData[i][5]
					}else{
						obj["NezilutDate"]=""
					}
	
					obj["YitraRelevantDate"]=jsonData[i][29]
					obj["MaslulHaskaha"]=""
					obj["Commants"]=""				 
					AssetHonResult.push(obj);
				}


				
			}
		}
		// console.log("honassetresult:",AssetHonResult);
		// console.log("pensionassetresult:",AssetPensionResult);

		let AssetPensionResultJson = JSON.stringify(AssetPensionResult);
		displayAssetPenssionJsonInTable(AssetPensionResultJson)
		let AssetHonResultJson = JSON.stringify(AssetHonResult);
		displayAssetHonJsonInTable(AssetHonResultJson)

		var Bituachworksheet = workbook.Sheets["כיסויים ביטוחיים"]
        var BituachjsonData = XLSX.utils.sheet_to_json(Bituachworksheet, {header:1});
		// console.log("raw bituach:",BituachjsonData)
		
		var bituachJsonString = JSON.stringify(BituachjsonData);
		displayBituachJsonInTable(bituachJsonString)
       
    };
    reader.readAsArrayBuffer(file);
	evt.target.value = '';
}, false);

function displayAssetPenssionJsonInTable(jsonString) {
    // Parse the JSON string into an object
    var keysToExclude = ['NihulFromPaymant', 'NihulFromTotal', 'InsuranceCost', 'YearRevenue'];
	var data = JSON.parse(jsonString, function(key, value) {
		if (keysToExclude.includes(key)) {
			return value;
		}
		return typeof value === 'number' ? Math.round(value) : value;
	});

    // Create a table
    var table = document.createElement('table');

    // Create table header row
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    // Define your headers
    var headers = [
        { key: 'checkbox', value: 'בחר לשמירה' },
        { key: 'Description', value: 'תאור' },
        { key: 'CurrentBallance', value: 'יתרה' },
		{ key: 'RetirmantDate', value: 'תאריך פרישה' },
		{ key: 'MonthlyYesNo', value: 'הפקדה חודשית?' },
        { key: 'MonthlyPaymant', value: 'סכום הפקדה' },
        { key: 'MonthlyPaymantEnd', value: 'תאריך סיום הפקדה' },
        { key: 'SourceOfMonthly', value: 'מקור תשלום הפקדה' },
		{ key: 'YearRevenue', value: ' תשואה שנתית צפויה' },
		{ key: 'MaslulHaskaha', value: 'מסלול השקעה' },
		{ key: 'MekademHamara', value: 'מקדם המרה' },
        { key: 'Commants', value: 'הערות' },
        { key: 'InsuranceCost', value: 'עלות ביטוח' },
		{ key: 'Sn', value: 'מספר סידורי' },
        { key: 'Type', value: 'סוג' },
		{ key: 'NihulFromPaymant', value: 'אחוז דמי ניהול מהפקדה' },
        { key: 'NihulFromTotal', value: 'אחוז דמי ניהול מצבירה' },
		{ key: 'YitraRelevantDate', value: 'תאריך נכונות נתונים' },
		{ key: 'PensionNameOwner', value: 'שם מבוטח' },
    ];

    headers.reverse()

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
				if (header.key === 'MekademHamara' ) {
					var input = document.createElement('input');
					input.type = 'number';
					input.style.width = '50px'; // Set the width of the input field
					input.value = item[header.key];
					input.size = '3'; 
					td.appendChild(input);
				} else {
					if (header.key === 'MonthlyPaymant' && item.MonthlyYesNo === 'Yes') {
						var input = document.createElement('input');
						input.type = 'number';
						input.style.width = '100px'; 
						input.value = item[header.key];
						
						td.appendChild(input);
					} else {	
						if (header.key === 'MonthlyPaymantEnd' || header.key === 'RetirmantDate' ){
							var input = document.createElement('input');
							input.type = 'date';
							var today = new Date();
							var dd = String(today.getDate()).padStart(2, '0');
							var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
							var yyyy = today.getFullYear();

							today = yyyy + '-' + mm + '-' + dd;
							input.value = today;
							td.appendChild(input);
						} 
						else {
							if (header.key === 'SourceOfMonthly') {
								var select = document.createElement('select');
								select.style.direction = "rtl"; // Add this line
								var option1 = document.createElement('option');
								var option2 = document.createElement('option');
							
								option2.text = "עובר ושב";
								option2.value = "Bank";
								option1.text = "מעסיק/חיצוני";
								option1.value = "Out";
							
								select.appendChild(option1);
								select.appendChild(option2);
								// td.style.textAlign="right"
								td.appendChild(select);
							} else {
								if (header.key === 'Commants' || header.key === 'MaslulHaskaha' ) {
									console.log("Commants")
									// var linput = document.createElement('input');
									// linput.type = 'text';
									// linput.value = "999"
									var linput = document.createElement('input');
									linput.type = 'text';
									linput.value = "";
									// linput.size = '3'; 
									td.appendChild(linput);
									// td.appendChild(linput);
								} else {
									if (header.key === 'YearRevenue' ) {
										var input = document.createElement('input');
										input.type = 'number';
										input.value = 0;
										input.style.width = '50px';
										td.appendChild(input);
									} else {

										if (header.key === 'YitraRelevantDate' ){
											var dateParts = item[header.key].split("/");
											var newDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
											td.textContent = newDate;
										} else {
										td.textContent = item[header.key];
										}
									}
								}
							}
						}
					}
				}
            }
            row.appendChild(td);
        });
		// console.log("row created:",row)
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
	// // ***********************************************************************************************
	// ***********************************************************************************************
	// ********************************styling table*********************************
	// ***********************************************************************************************
	// ***********************************************************************************************
    var container = document.getElementById("AssetPensionTableFromFileId");
	container.style.display = "block";
	container.style.overflow = "auto";	
	container.style.overflowX = "auto";
	container.style.overflowY = "auto";
    container.style.height = "400px";

	

	// Get all th elements within the table
	var theaders = table.querySelectorAll('th');
	// Apply sticky style to each header
	theaders.forEach(function(theader) {
		theader.style.position = 'sticky';
		theader.style.top = '0';
		theader.style.backgroundColor = '#fff'; // Ensure the header is visible over any content that might scroll under it
		theader.style.zIndex = '1'; // Ensure the header is above other content
	});
	// // ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************

    var container = document.getElementById("AssetPensionTableFromFileId");
	// container.style.height = "400px";
	
    container.innerHTML = '';

	var title = document.createElement('h1');
	title.textContent = 'נכסים פנסיוניים';
	title.style.color = '#557848';
	title.style.fontWeight = 'bold';
	title.style.fontSize = '28px';
	title.style.textAlign = 'center';

	let lTitle= document.getElementById("AsstPensionFromFileTitleId")	
	lTitle.innerHTML = '';
	lTitle.appendChild(title);
    container.appendChild(table);

    // Create a button
    var button = document.createElement('button');
	button.textContent = 'שמור נכסים פנסיוניים שנבחרו';
	// button.style.backgroundColor = '#B5D9BC';
	// button.style.color = 'black';
	
	let lbuttonContainer = document.getElementById("AsstHonFromFileTitleId")
	
	
	lbuttonContainer.innerHTML = '';
	lbuttonContainer.appendChild(button);
	button.addEventListener('click', function() {
		var selectedRows = [];
		var checkboxes = container.querySelectorAll('tbody input[type="checkbox"]:checked');
		// console.log("checkboxes:",checkboxes,"container:",container)	
		checkboxes.forEach(checkbox => {
			var row = checkbox.parentElement.parentElement;
			// console.log("row:",row)	
			var rowData = {};
			headers.forEach((header, index) => {
				if (header.key !== 'checkbox') {
					var cell = row.children[index];
					// console.log("cell:",cell.tagName,cell,"index:",index)
					var inputElement = cell.querySelector('input');
					var selectElement = cell.querySelector('select');
					if (inputElement) {
						// console.log("before:","inputElement.value:",inputElement.value,"rowData[header.key]",header.key)
						rowData[header.key] = inputElement.value;
						// console.log("afer:","inputElement.value:",inputElement.value,"rowData[header.key]",header.key)
					} else if (selectElement) {
						rowData[header.key] = selectElement.options[selectElement.selectedIndex].value;
					} else {
						rowData[header.key] = cell.textContent;

						console.log("header:",header,"afer normal:","cell.textContent:",cell.textContent,"rowData[header.key]",rowData[header.key])
					}
				}
			});
			selectedRows.push(rowData);
		});
		var PensionjsonString = JSON.stringify(selectedRows);
		console.log("pension to db:",PensionjsonString);
			
		
        
        // document.getElementById('LoadLoanFileCheckBoxId').checked = false;
        document.getElementById("form-field-ToDbArrayCommandId").value="SaveAssetPensionArray"
        document.getElementById("form-field-ToDbArrayCommanDataId").value=PensionjsonString
        document.getElementById("DataBaseArrayActionClickBtnId").click();
        document.getElementById("AssetReadMislakaAreaId").style.display="none"  
		document.getElementById("LoadMislakaFileCheckBoxId").checked = false;

        // fSendCommandToBackEnd("","actionReadUserRecsLoan")
       
               
        
    });
	container.scrollLeft = container.scrollWidth;
}


function displayAssetHonJsonInTable(jsonString) {
    // Parse the JSON string into an object
    var keysToExclude = ['NihulFromPaymant', 'NihulFromTotal','YearRevenue'];
	var data = JSON.parse(jsonString, function(key, value) {
		if (keysToExclude.includes(key)) {
			return value;
		}
		return typeof value === 'number' ? Math.round(value) : value;
	});
	console.log("data:",data)
    // Create a table
    var table = document.createElement('table');

    // Create table header row
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    // Define your headers
    var headers = [
        { key: 'checkbox', value: 'בחר לשמירה' },
        { key: 'Description', value: 'תאור' },
        { key: 'CurrentBallance', value: 'יתרה' },
		{ key: 'NezilutDate', value: 'תאריך נזילות' },
		{ key: 'MonthlyYesNo', value: 'הפקדה חודשית?' },
        { key: 'MonthlyPaymant', value: 'סכום הפקדה' },
        { key: 'MonthlyPaymantEnd', value: 'תאריך סיום הפקדה' },
        { key: 'SourceOfMonthly', value: 'מקור תשלום הפקדה' },
		{ key: 'YearRevenue', value: ' תשואה שנתית צפויה' },
		{ key: 'MaslulHaskaha', value: 'מסלול השקעה' },
        { key: 'Commants', value: 'הערות' },
		{ key: 'Sn', value: 'מספר סידורי' },
        { key: 'Type', value: 'סוג' },
		{ key: 'YitraRelevantDate', value: 'תאריך נכונות נתונים' },
    ];

    headers.reverse()
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

	var lSaveMonthlyYesNo="No"	
    // Create table body
    var tbody = document.createElement('tbody');
    data.forEach(item => {
		lSaveMonthlyYesNo=item["MonthlyYesNo"]
		// console.log("lSaveMonthlyYesNo:",lSaveMonthlyYesNo)
        var row = document.createElement('tr');
        headers.forEach(header => {

			// console.log("hontype:",item.Type)
			


            var td = document.createElement('td');
            if (header.key === 'checkbox') {
                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.Sn;
                checkbox.style.transform = "scale(2)";
                td.appendChild(checkbox);
            } else {
				if (false ) {
					// var input = document.createElement('input');
					// input.type = 'number';
					// input.style.width = '50px'; // Set the width of the input field
					// input.value = item[header.key];
					// input.size = '3'; 
					// td.appendChild(input);
				} 
				else {
					
					if (header.key === 'MonthlyPaymant' && item.MonthlyYesNo === 'Yes') {
						var input = document.createElement('input');
						input.type = 'number';
						input.style.width = '100px'; 
						input.value = item[header.key];
						
						td.appendChild(input);
					} else {	
						if (header.key === 'MonthlyPaymantEnd' ){
							var input = document.createElement('input');
							input.type = 'date';
							var today = new Date();
							var dd = String(today.getDate()).padStart(2, '0');
							var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
							var yyyy = today.getFullYear();

							today = yyyy + '-' + mm + '-' + dd;
							input.value = today;
							td.appendChild(input);
						} else {
							if (header.key === 'SourceOfMonthly') {
								var select = document.createElement('select');
								select.style.direction = "rtl"; // Add this line
								var option1 = document.createElement('option');
								var option2 = document.createElement('option');
							
								option2.text = "עובר ושב";
								option2.value = "Bank";
								option1.text = "מעסיק/חיצוני";
								option1.value = "Out";
							
								select.appendChild(option1);
								select.appendChild(option2);
								select.value = "Out"; 
								// td.style.textAlign="right"
								td.appendChild(select);
							} else {
								if (header.key === 'Commants' || header.key === 'MaslulHaskaha' ) {
									console.log("Commants")
									// var linput = document.createElement('input');
									// linput.type = 'text';
									// linput.value = "999"
									var linput = document.createElement('input');
									linput.type = 'text';
									linput.value = "";
									// linput.size = '3'; 
									td.appendChild(linput);
									// td.appendChild(linput);
								} else {
									if (header.key === 'YearRevenue' ) {
										var input = document.createElement('input');
										input.type = 'number';
										input.value = 0;
										input.style.width = '50px';
										td.appendChild(input);
									} else {
										if (header.key === 'NezilutDate' || header.key === 'YitraRelevantDate' ){
											var dateParts = item[header.key].split("/");
											var newDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
											td.textContent = newDate;
										} else {
											td.textContent = item[header.key];
										}
										
									}
								}
							}
						}
					}
				}
            }
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

	// // ***********************************************************************************************
	// ***********************************************************************************************
	// ********************************styling table*********************************
	// ***********************************************************************************************
	// ***********************************************************************************************
    var container = document.getElementById("AssetHonTableFromFileNewId");
	container.style.display = "block";
	container.style.overflow = "auto";	
	container.style.overflowX = "auto";
	container.style.overflowY = "auto";
    container.style.height = "400px";

	// Get all th elements within the table
	var theaders = table.querySelectorAll('th');
	// Apply sticky style to each header
	theaders.forEach(function(theader) {
		theader.style.position = 'sticky';
		theader.style.top = '0';
		theader.style.backgroundColor = '#fff'; // Ensure the header is visible over any content that might scroll under it
		theader.style.zIndex = '1'; // Ensure the header is above other content
	});
	// // ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	
    // container.innerHTML = '';

	var title = document.createElement('h1');
	title.textContent = 'נכסים הוניים';
	title.style.color = '#786b48';
	title.style.fontWeight = 'bold';
	title.style.fontSize = '28px';
	title.style.textAlign = 'center';
	title.style.marginTop = '30px';
	let lTitle= document.getElementById("AsstHonFromFileTitleId")	
	lTitle.appendChild(title);



	let lbutton = document.getElementById("AssethonButtonBottonContainerId")
	
	
	

	container.innerHTML = '';

	

	container.appendChild(table);   

    // Create a button
    var button = document.createElement('button');
	button.textContent = 'שמור נכסים הוניים שנבחרו';
	// lTitle.innerHTML = '';
	
	
	
	lbutton.innerHTML = '';
	lbutton.appendChild(button);
	
	
	button.addEventListener('click', function() {
		var selectedRows = [];
		var checkboxes = container.querySelectorAll('tbody input[type="checkbox"]:checked');
		checkboxes.forEach(checkbox => {
			var row = checkbox.parentElement.parentElement;
			var rowData = {};
			headers.forEach((header, index) => {
				if (header.key !== 'checkbox') {
					var cell = row.children[index];
					var inputElement = cell.querySelector('input');
					var selectElement = cell.querySelector('select');
					if (inputElement) {
						rowData[header.key] = inputElement.value;
					} else if (selectElement) {
						rowData[header.key] = selectElement.options[selectElement.selectedIndex].value;
					} else {
						rowData[header.key] = cell.textContent;
					}
				}
			});
			// rowData["MonthlyYesNo"]=lSaveMonthlyYesNo
			console.log("lSaveMonthlyYesNo:",lSaveMonthlyYesNo)
			console.log("rowData:",rowData	)

			selectedRows.push(rowData);
		});
		var HonjsonString = JSON.stringify(selectedRows);
		console.log("Hon to db:",HonjsonString);
			
		
        
        document.getElementById('LoadMislakaFileCheckBoxId').checked = false;
        document.getElementById("form-field-ToDbArrayCommandId").value="SaveAssetHonArray"
        document.getElementById("form-field-ToDbArrayCommanDataId").value=HonjsonString
        document.getElementById("DataBaseArrayActionClickBtnId").click();
        document.getElementById("AssetReadMislakaAreaId").style.display="none"  
		document.getElementById("LoadMislakaFileCheckBoxId").checked = false;

        // fSendCommandToBackEnd("","actionReadUserRecsLoan")
       
               
        
    });
	container.scrollLeft = container.scrollWidth;
}

const customButton = document.getElementById("LoadAssetFileDummyButtonId");

// Add event listener to the custom button
customButton.addEventListener("click", function(event) {
	event.preventDefault();
	console.log("click on file button")
  document.getElementById("AssetexcelFile").click();
});


function displayBituachJsonInTable(jsonString) {
	console.log("json string:",jsonString)
    // Parse the JSON string into an object
    var data = JSON.parse(jsonString);

    // Define the list of colors in hexadecimal format
    // var colors = ['#c1e3ca',"#b3e3c0","#98d4a8","#88d19b",'#6ec484',"#62c47b"];
	var colors = ['#f0eeeb',"#dedad5","#cfcbc6","#b5b1ac"];
	// var colors = ['#c1e3ca',"#b3e3c0"];
    var colorMap = {};

    // Create a table
    var table = document.createElement('table');

    // Get the headers from the first item in the array
    var headers = data[0];
    // headers.unshift('Select'); // Add a new header for the checkboxes at the beginning

    // Create the table header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

	headers.reverse()

    headers.forEach(function(header) {
        var th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    var tbody = document.createElement('tbody');
    for (var i = 1; i < data.length; i++) {
        if (data[i][0] && !(data[i][4] == 0 && data[i][5] == 0 ) && data[i][3] != "הורה נתמך"  && data[i][3] != "ילד/ה") {
            data[i].reverse()
			var row = document.createElement('tr');
            var checkboxCell = document.createElement('td');
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'checkbox' + i;
            checkbox.style.transform = "scale(2)"; // Scale the checkbox
            checkboxCell.appendChild(checkbox);
            // row.appendChild(checkboxCell); // Add the checkbox cell to the row first
            headers.slice(0).forEach(function(header, index) { // Start from the second header
                var td = document.createElement('td');
                if (index === 1 || index === 2) {
                    td.textContent = Number(data[i][index]).toLocaleString();
                } else {
                    td.textContent = data[i][index];
                }
                row.appendChild(td);
            });
			row.appendChild(checkboxCell); // Add the checkbox cell to the row first

            if (!colorMap[data[i][0]]) {
                colorMap[data[i][0]] = colors[Object.keys(colorMap).length % colors.length];
            }

            row.style.backgroundColor = colorMap[data[i][0]];

            tbody.appendChild(row);
        }
    }
    table.appendChild(tbody);

	 // Add a checkbox to the header that checks or unchecks all checkboxes
	 var headerCheckboxCell = document.createElement('th');
	 var headerCheckbox = document.createElement('input');
	 headerCheckbox.type = 'checkbox';
	 headerCheckbox.style.transform = "scale(2)"; // Scale the checkbox
	 headerCheckbox.addEventListener('change', function() {
		 var checkboxes = table.querySelectorAll('input[type="checkbox"]');
		 checkboxes.forEach(function(checkbox) {
			 checkbox.checked = headerCheckbox.checked;
		 });
	 });
	 headerCheckboxCell.appendChild(headerCheckbox);
	//  headerRow.insertBefore(headerCheckboxCell, headerRow.firstChild); // Add the checkbox cell to the header row first
	 headerRow.appendChild(headerCheckboxCell);
	// // ***********************************************************************************************
	// ***********************************************************************************************
	// ********************************styling table*********************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	var headers = table.querySelectorAll('th');
	// Apply sticky style to each header
	headers.forEach(function(header) {
		header.style.position = 'sticky';
		header.style.top = '0';
		header.style.backgroundColor = '#fff'; // Ensure the header is visible over any content that might scroll under it
		header.style.zIndex = '1'; // Ensure the header is above other content
	});
	// // ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************
	// ***********************************************************************************************


	var title = document.createElement('h1');
	title.textContent = 'ביטוחיי חיים נכות ושארים';
	title.style.color = '#786b48';
	title.style.fontWeight = 'bold';
	title.style.fontSize = '28px';
	title.style.textAlign = 'center';
	title.style.marginTop = '30px';
	let lTitle= document.getElementById("AsstBituachFromFileTitleId")	
	lTitle.appendChild(title);

    var container = document.getElementById("AssetBituachTableFromFileId");
    
	container.innerHTML = '';
    container.appendChild(table);

    // Create a button that, when pressed, creates a list of all checked rows
    var button = document.createElement('button');
    button.textContent = 'שמור תוכניות ביטוח שנבחרו';
    button.onclick = function() {
        var checkedRows = [];
        for (var i = 1; i < data.length; i++) {
            var checkbox = document.getElementById('checkbox' + i);
            if (checkbox && checkbox.checked) {
                var obj = {
                    Type: "ביטוח-" + data[i][6],
                    BituachHatPeami: data[i][2],
                    BituachKitzba: data[i][1],
                    Sn: data[i][0] + "_" + i + "_" + gFileowner,
                    Description:  gFileowner +"_" +  data[i][5] + "_" + data[i][6] + "_" +  data[i][0] + "_" + data[i][4],
                    BituachNameOwner: gFileowner,
					BituachMisparPolisa: data[i][0],
                };
                checkedRows.push(obj);
            }
        }
        checkedRowsStr = JSON.stringify(checkedRows);
        document.getElementById("form-field-ToDbArrayCommandId").value="SaveBituachArray"
        document.getElementById("form-field-ToDbArrayCommanDataId").value=checkedRowsStr
        document.getElementById("DataBaseArrayActionClickBtnId").click();
        document.getElementById("AssetReadMislakaAreaId").style.display="none"  
		document.getElementById("LoadMislakaFileCheckBoxId").checked = false;
		
    };
    container.appendChild(button);

    // // Add a checkbox to the header that checks or unchecks all checkboxes
    // var headerCheckboxCell = document.createElement('th');
    // var headerCheckbox = document.createElement('input');
    // headerCheckbox.type = 'checkbox';
    // headerCheckbox.style.transform = "scale(2)"; // Scale the checkbox
    // headerCheckbox.addEventListener('change', function() {
    //     var checkboxes = table.querySelectorAll('input[type="checkbox"]');
    //     checkboxes.forEach(function(checkbox) {
    //         checkbox.checked = headerCheckbox.checked;
    //     });
    // });
    // headerCheckboxCell.appendChild(headerCheckbox);
    // headerRow.insertBefore(headerCheckboxCell, headerRow.firstChild); // Add the checkbox cell to the header row first
}


function fBuildBituachSummerytables(inArray) {
    
	// console.log("build bit table:",inArray)	
	// Get the div
    // var div = document.getElementById('BituachtableId');
    // // Clear the div
    // div.innerHTML = '';

    // Group the "bituach" objects by the "BituachNameOwner" property
    var groups = {};
    inArray.forEach(function(item) {
        if (fisInglobalAssetBituachSet(item.Type)) {
            var groupName = item.BituachNameOwner;
			// console.log("groupName:",groupName)
            if (!groups[groupName]) {
                groups[groupName] = [];
            }
            groups[groupName].push(item);
        }
    });
	// console.log("groups:",groups)
    // Create a summary object
    var summary = {};

    // Iterate over the groups
    for (var groupName in groups) {
        // Create a new table
        var table = document.createElement('table');

        // Create a title for the table
		// currently dont show
        // var title = document.createElement('h2');
        // title.textContent = groupName;
		// title.style.textAlign = "center";
        // div.appendChild(title);

        // Iterate over the items in the group
        groups[groupName].forEach(function(item) {
            // Create a new row
            var row = document.createElement('tr');

            // Iterate over the properties of the object
            for (var prop in item) {
                // Create a new cell
                var cell = document.createElement('td');
                // Set the text of the cell to the value of the property
                // console.log("prop:",prop,item[prop])
				if(  prop == "BituachKitzba" && item[prop]=="" ){
					// console.log("item:",item)
					// console.log("prop empty:",item[prop])
					item[prop]=0
				}
				if (!isNaN(item[prop])) {
					cell.textContent = Number(item[prop]).toLocaleString();
				} else {
					cell.textContent = item[prop];
				}

				// cell.textContent = item[prop].toLocaleString('en-US');
				// console.log("prop:",item[prop],"type:",typeof item[prop], "prop after coma",item[prop].toLocaleString('en-US'))
				cell.style.textAlign = "center";
                // Add the cell to the row
                row.appendChild(cell);
            }

            // Add the row to the table
            table.appendChild(row);

            // Update the summary
            if (!summary[groupName]) {
                summary[groupName] = {};
            }
            if (!summary[groupName][item.Type]) {
                summary[groupName][item.Type] = { BituachHatPeami: 0, BituachKitzba: 0 };
            }
            // console.log("item:",item,item.BituachHatPeami,item.BituachKitzba)
			summary[groupName][item.Type].BituachHatPeami += parseFloat(item.BituachHatPeami);
            summary[groupName][item.Type].BituachKitzba += parseFloat(item.BituachKitzba);
        });

        // Add the table to the 
		// currently dont show detail table, only summery table(ahead) is shown in pdf
        // div.appendChild(table);
    }
// {
//     // Create the summary table
//     var summaryTable = document.createElement('table');

//     // Create a title for the summary table
//     // var summaryTitle = document.createElement('h2');
//     // summaryTitle.textContent = 'סיכום משפחתי';
// 	// summaryTitle.style.textAlign = "center";
//     // div.appendChild(summaryTitle);

//     // Create a header row
//     var headerRow = document.createElement('tr');
// 	headerRow.style.fontSize = "36px";
//     var nameHeader = document.createElement('th');
//     nameHeader.textContent = 'מבוטח';
// 	nameHeader.style.textAlign = "center";
	
//     headerRow.appendChild(nameHeader);
//     var typeHeader = document.createElement('th');
//     typeHeader.textContent = 'סוג ביטוח';
// 	typeHeader.style.textAlign = "center";
//     headerRow.appendChild(typeHeader);
//     var sumHeader1 = document.createElement('th');
//     sumHeader1.textContent = 'סכום חד פעמי';
// 	sumHeader1.style.textAlign = "center";
//     headerRow.appendChild(sumHeader1);
//     var sumHeader2 = document.createElement('th');
//     sumHeader2.textContent = ' סכום חודשי';
// 	sumHeader2.style.textAlign = "center";
//     headerRow.appendChild(sumHeader2);
//     summaryTable.appendChild(headerRow);
	

//     // Iterate over the summary
//     for (var name in summary) {
//         for (var type in summary[name]) {
//             // Create a new row
//             var row = document.createElement('tr');
// 			row.style.fontSize = "36px";

//             // Create a cell for the name
//             var nameCell = document.createElement('td');
//             nameCell.textContent = name;
// 			nameCell.style.textAlign = "center";
// 			// nameCell.style.fontSize = "128px";
//             row.appendChild(nameCell);

//             // Create a cell for the type
//             var typeCell = document.createElement('td');
//             typeCell.textContent = type;
// 			typeCell.style.textAlign = "center";
// 			// typeCell.style.fontSize = "28px";
//             row.appendChild(typeCell);

//             // Create a new cell for BituachHatPeami
// 			var cell1 = document.createElement('td');
// 			cell1.textContent = summary[name][type].BituachHatPeami.toLocaleString('en-US');
// 			cell1.style.textAlign = "center";
// 			// cell1.style.fontSize = "28px";
//             row.appendChild(cell1);

//             // Create a new cell for BituachKitzba
//             var cell2 = document.createElement('td');
// 			console.log("typeof:",typeof summary[name][type].BituachKitzba)
//             cell2.textContent = summary[name][type].BituachKitzba.toLocaleString('en-US');
// 			cell2.style.textAlign = "center";
// 			// cell2.style.fontSize = "28px";
//             row.appendChild(cell2);

//             // Add the row to the summary table
//             summaryTable.appendChild(row);
//         }
//     }
// }
    // Add the summary table to the div
    // div.appendChild(summaryTable);
	
	// Create the summary table
	var summaryTable = document.createElement('table');

// Create a header row
var headerRow = document.createElement('tr');
headerRow.style.fontSize = "36px";


var sumHeader2 = document.createElement('th');
sumHeader2.textContent = ' סכום חודשי';
sumHeader2.style.textAlign = "center";
headerRow.appendChild(sumHeader2);

var sumHeader1 = document.createElement('th');
sumHeader1.textContent = 'סכום חד פעמי';
sumHeader1.style.textAlign = "center";
headerRow.appendChild(sumHeader1);

var typeHeader = document.createElement('th');
typeHeader.textContent = 'סוג ביטוח';
typeHeader.style.textAlign = "center";
headerRow.appendChild(typeHeader);

var nameHeader = document.createElement('th');
nameHeader.textContent = 'מבוטח';
nameHeader.style.textAlign = "center";
headerRow.appendChild(nameHeader);



summaryTable.appendChild(headerRow);

// Define your list of colors
var colors = ['#e6e4e1', '#bab8b5']; // replace with your actual colors
var colorIndex = 0;
var nameColors = {};

// Iterate over the summary
for (var name in summary) {
    for (var type in summary[name]) {
        // Create a new row
        var row = document.createElement('tr');
        row.style.fontSize = "36px";

        // Assign a color to the name if it doesn't have one yet
        if (!nameColors[name]) {
            nameColors[name] = colors[colorIndex % colors.length];
            colorIndex++;
        }

        // Set the row color
        row.style.backgroundColor = nameColors[name];

		// Create a new cell for BituachKitzba
        var cell2 = document.createElement('td');
        cell2.textContent = summary[name][type].BituachKitzba.toLocaleString('en-US');
        cell2.style.textAlign = "center";
        row.appendChild(cell2);

		// Create a new cell for BituachHatPeami
        var cell1 = document.createElement('td');
        cell1.textContent = summary[name][type].BituachHatPeami.toLocaleString('en-US');
        cell1.style.textAlign = "center";
        row.appendChild(cell1);

		// Create a cell for the type
        var typeCell = document.createElement('td');
        typeCell.textContent = type;
        typeCell.style.textAlign = "center";
        row.appendChild(typeCell);


        // Create a cell for the name
        var nameCell = document.createElement('td');
        nameCell.textContent = name;
        nameCell.style.textAlign = "center";
        row.appendChild(nameCell);

		
		// Add the row to the summary table
        summaryTable.appendChild(row);
    }
}
	
	document.getElementById("BituachTableReportId").innerHTML = '';
	document.getElementById("BituachTableReportId").appendChild(summaryTable)
	
	
}
			
function fBuildPensionSummeryTables(objects) {
    //     // Ensure fisInGlobalAssetsPensionSet is correctly defined and accessible

    // Step 1: Filter objects
    const filteredObjects = objects.filter(obj => fisInglobalAssetsPensionSet(obj.Type));

    // Step 2: Group objects by PensionNameOwner
    const groupedByOwner = filteredObjects.reduce((acc, obj) => {
        acc[obj.PensionNameOwner] = acc[obj.PensionNameOwner] || [];
        acc[obj.PensionNameOwner].push(obj);
        return acc;
    }, {});

    // Step 3: Sum values and build tables for each group
    Object.entries(groupedByOwner).forEach(([owner, objs]) => {
        const sum = objs.reduce((acc, obj) => {
			
			console.log("bugvalue:","cv:",fcurrentbalanceToday(obj))
			
			
			
			// console.log("obj:",obj,"obj.CurrentBalance:",obj.CurrentBallance)
            return acc + parseFloat(fcurrentbalanceToday(obj));
        }, 0);
        createTable(owner, sum); // Ensure createTable is correctly defined and accessible
    });
}

function createTable(owner, sum) {
    // Create table element
    const table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');

    // Create header row
    const headerRow = table.insertRow();
    const headers = ["שם", "סכום"];
    headers.forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    // Insert data row
    const row = table.insertRow();
    const nameCell = row.insertCell();
    nameCell.textContent = owner;
    const sumCell = row.insertCell();
    sumCell.textContent = sum.toLocaleString(); // Format number with commas

    // Append table to the document body or a specific element
    document.body.appendChild(table); // Adjust this to append the table to a specific element if needed
}

function fcurrentbalanceToday(obj){

	
	var startvalue = parseFloat(obj.CurrentBallance)
					if (isNaN(startvalue)) {
						// Set myVariable to zero if it is NaN
						startvalue = 0;
					}
	
	var startValueDate=obj.YitraRelevantDate
					
	var lIsMonthlypaymant = obj.MonthlyYesNo
	//console.log("nadlan is monthly?",lIsMonthlypaymant,"type:",inArray[i].Type)

	var lIsMonthlypaymantBoolean = false
	if(lIsMonthlypaymant =="Yes")
		{
			lIsMonthlypaymantBoolean = true
		}
	
	var monthly = parseFloat(obj.MonthlyPaymant)
	if (isNaN(monthly)) {
		// Set myVariable to zero if it is NaN
		monthly = 0;
	}
	
	var lEndOfMonthpaymantDate = obj.MonthlyPaymantEnd
	
	var revenue = parseFloat(obj.YearRevenue)
	if (isNaN(revenue)) {
		// Set myVariable to zero if it is NaN
		revenue = 0;
	}
		
	var nazild = obj.NezilutDate

	let lretValue = fCalcAssetHonRecCore(startvalue,startValueDate,lIsMonthlypaymantBoolean,monthly,lEndOfMonthpaymantDate,revenue,nazild);
	return lretValue[0][0]
}
