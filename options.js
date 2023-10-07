const activecell=document.getElementById("active-cell");

const textAlignElements=document.getElementsByClassName("text-align");
const boldButton=document.getElementById("bold");
const ItalicButton=document.getElementById("italic");
const UnderlineButton=document.getElementById("underlined");
let activeCell=null;
let activeOptionsState;

function toogleButtonStyle(button,isSelected){
    if(isSelected){
        button.classList.add("active-options");
    }
    else{
        button.classList.remove("active-options"); 
    }
}

function highlightOptionButtonOnFocus(){
//check if cell is in the bold state or not
// if(activeOptionsState.isBoldSelected && !boldButton.classList.contains("active-options")){
//     //currently selected cell in the bold state
  
// boldButton.classList.add("active-options");
   
// }
// else{
//  boldButton.classList.remove("active-options");       
// }


toogleButtonStyle(boldButton,activeOptionsState.isBoldSelected);
//check if the selected cell is italic
// if(activeOptionsState.isItalicSelected && !ItalicButton.classList.contains("active-options")){
//     //currently selected cell in the bold state
  
// ItalicButton.classList.add("active-options");
   
// }
// else{
//     ItalicButton.classList.remove("active-options");       
//    }

toogleButtonStyle(ItalicButton,activeOptionsState.isItalicSelected);






   //for underlined
//    if(activeOptionsState.isUnderlineSelected && !UnderlineButton.classList.contains("active-options")){
//     //currently selected cell in the bold state
  
// UnderlineButton.classList.add("active-options");
   
// }
// else{
//  UnderlineButton.classList.remove("active-options");       
//    }
toogleButtonStyle(UnderlineButton,activeOptionsState.isUnderlineSelected);

// console.log(activeOptionsState.textAlign);

   highlightTextAlignButtons(activeOptionsState.textAlign);
}
function onCellFocus(e){
    //whener a cell is focused change the activecell value to be the id value
    if( activeCell && activeCell.id===e.target.id){
        //previously selected cell === to currently selected cells
        return;
    }
    activeCell=e.target;
    activecell.innerText=e.target.id;
    //initialize the state of this cell
    const computedStyle=getComputedStyle(activeCell);
    activeOptionsState={
        fontFamily:computedStyle.fontFamily,
    isBoldSelected:computedStyle.fontWeight==="600",
    isItalicSelected:computedStyle.fontStyle==="italic",
    isUnderlineSelected:computedStyle.textDecoration.includes("underline"),
    textAlign:computedStyle.textAlign,
    textColor:computedStyle.color,
    backgroundColor:computedStyle.backgroundColor,
    fontSize:computedStyle.fontSize,
    };
    highlightOptionButtonOnFocus();
  }


  function onClickBold(boldButton){
    boldButton.classList.toggle("active-options");
   if(activeCell){
    activeOptionsState;
   
    if(activeOptionsState.isBoldSelected===false){
        activeCell.style.fontWeight="600";
       
    }
    else{
        activeCell.style.fontWeight="400";
    
    }
    activeOptionsState.isBoldSelected=! activeOptionsState.isBoldSelected;
   }

  }


  function onClickItalic(italicButton){
    italicButton.classList.toggle("active-options");
    if(activeCell){
        activeOptionsState;
        if(activeOptionsState.isItalicSelected){
            activeCell.style.fontStyle="normal";
           
        }
        else{
            activeCell.style.fontStyle="italic";
            
        }
        activeOptionsState.isItalicSelected=! activeOptionsState.isItalicSelected;
    }
  }



  function onClickUnderlined(UnderlinedButton){
    UnderlinedButton.classList.toggle("active-options");
    if(activeCell){
        activeOptionsState;
        if(activeOptionsState.isUnderlineSelected){
            activeCell.style.textDecoration="none";
           
        }
        else{
            activeCell.style.textDecoration="underline";
          
        }
        activeOptionsState.isUnderlineSelected=! activeOptionsState.isUnderlineSelected;
    }
  }





//task is to take the textalign value and decides whuch alignment button needs to be highlighted or not
function highlightTextAlignButtons(textAlignvalue){
   
    for(let i=0;i<textAlignElements.length;i++){
        if(textAlignElements[i].getAttribute("data-value")===textAlignvalue){
            textAlignElements[i].classList.add("active-options");
        }
        else{
            textAlignElements[i].classList.remove("active-options");
        }
        
    }
}

  function onClickTextAlign(textAlignButton){
    let selectedButtonvalue=textAlignButton.getAttribute("data-value");
    highlightTextAlignButtons(selectedButtonvalue);

    if(activeCell){
        activeCell.style.textAlign=selectedButtonvalue;
        activeOptionsState.textAlign=selectedButtonvalue;
    }
  }



  function onChangeTextColor(textColour){
    let selectedColor=textColour.value;
    if(activeCell){
        activeCell.style.color=selectedColor;
        activeOptionsState.color=selectedColor;
    }
  }


  function onChangeBgColor(textColour){
    let selectedColor=textColour.value;
    if(activeCell){
        activeCell.style.backgroundColor=selectedColor;
        activeOptionsState.backgroundColor=selectedColor;
    }
  }


  // JavaScript code to handle arrow key navigation
  function handleKeyNavigation(sheetId) {
    document.addEventListener("keydown", function (event) {
        const activeElement = document.activeElement;

        if (activeElement && activeElement.contentEditable === "true") {
            const cellId = activeElement.id;
            const [column, row] = cellId.match(/([A-Z]+)(\d+)/).slice(1);

            let targetCellId;

            switch (event.key) {
                case "ArrowUp":
                    targetCellId = `${column}${Number(row) - 1}`;
                    break;
                case "ArrowDown":
                    targetCellId = `${column}${Number(row) + 1}`;
                    break;
                case "ArrowLeft":
                    targetCellId = `${String.fromCharCode(column.charCodeAt(0) - 1)}${row}`;
                    break;
                case "ArrowRight":
                    targetCellId = `${String.fromCharCode(column.charCodeAt(0) + 1)}${row}`;
                    break;
                default:
                    return; // Do nothing if a different key is pressed
            }

            const targetCell = document.querySelector(`#${sheetId} #${targetCellId}`);
            if (targetCell) {
                targetCell.focus();
            }
        }
    });
}

// Call the function for Sheet1 and Sheet2
handleKeyNavigation("sheet1");
handleKeyNavigation("sheet2");

// Reference to the input field
const inputField = document.getElementById('form');

// Event listener for input field
inputField.addEventListener('input', function (e) {
    if (activeCell) {
        // Update the content of the active cell with the input field value
        activeCell.innerText = e.target.value;
    }
});

// ... (The rest of your existing code)





//data dropdown
let dropdownVisible = false;

function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownVisible = !dropdownVisible;
    
    if (dropdownVisible) {
        dropdownContent.style.display = 'block';
        dropdownVisible="true";
    } else {
        dropdownContent.style.display = 'none';
    }
}




function sortData() {
    // Implement your sorting logic here
    dropdownVisible = false;
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display = 'none';
   
    // You can replace the alert with your actual sorting code.
}










//sort selected elemnts
// Add this function to sort the selected cells
// Function to sort selected cells within the active sheet
function sortSelectedCells() {
    const activeSheet = document.querySelector('.sheet.active');
    const selectedCells = activeSheet.querySelectorAll('.selected');
    let valuesToSort = [];

    selectedCells.forEach(cell => {
        valuesToSort.push(cell.innerText);
    });

    // Sort the values in ascending order
    valuesToSort.sort((a, b) => a.localeCompare(b));

    // Update the selected cells with sorted values
    selectedCells.forEach((cell, index) => {
        cell.innerText = valuesToSort[index];
    });
}


// Add an event listener to the sort button
const sortButton = document.getElementById('sort-button'); // Replace 'sort-button' with the actual ID of your sort button
sortButton.addEventListener('click', sortSelectedCells);



const s=document.getElementById("search");


//for seraching 

const input=document.getElementById("s-input");
function search(){
    input.style.display="inline";
    
}









function handleEnter(event) {
    if (event.key === "Enter") {
        const searchText = event.target.value.trim().toLowerCase();
        const cells = document.querySelectorAll('.cell ');
        let found = false;
        const searchInput = document.getElementById("s-input");

        // Close dropdown and hide the input field
        searchInput.style.display = "none";
        isSearching = false;
        toggleDropdown();

        cells.forEach(cell => {
            const cellText = cell.innerText.toLowerCase();

            if (cellText.includes(searchText)) {
                found = true;

                // Highlight the matching content
                cell.innerHTML = cellText.replace(new RegExp(searchText, 'gi'), match => `<span class="highlight">${match}</span>`);

                // Scroll to and focus on the cell
                cell.scrollIntoView({ behavior: "smooth" });
                cell.focus();

                // Exit the loop after the first match is found
                return;
            } else {
                // Remove previous highlighting
                cell.innerHTML = cellText;
            }
        });

        if (!found) {
            // If no match is found, you can display a message or perform other actions here.
            alert("Element not found");
        }
        event.target.value = '';
    }
}







function performAction(action) {
    // Replace this with your logic for each action
    switch (action) {
        case 'count':
            calculateSelectedCellsCount();
            break;
        case 'max':
            calculateSelectedCellsMax();
            break;
        case 'min':
            calculateSelectedCellsMin();
            break;
        case 'average':
            calculateSelectedCellsAverage() ;
            break;
        case 'sum':
            calculateSelectedCellsSum();
            break;
        default:
            break;
    }

    // Close the dropdown
    toggleDropdown1();
}




function toggleDropdown1() {
    const dropdownContent = document.querySelector('#dropdown-content-1');
    dropdownVisible = !dropdownVisible;
    
    if (dropdownVisible) {
        dropdownContent.style.display = 'block';
        dropdownVisible="true";
    } else {
        dropdownContent.style.display = 'none';
    }
}




//sum functiom
// Function to calculate and display the sum of selected cells
// Function to calculate the sum of selected cells and display the formula
function calculateSelectedCellsSum() {
    const activeSheet = document.querySelector('.sheet.active');
    const selectedCells = activeSheet.querySelectorAll('.selected');
    let sum = 0;
    let formula = '';

    selectedCells.forEach((cell, index) => {
        const cellValue = parseFloat(cell.innerText);
        if (!isNaN(cellValue)) {
            sum += cellValue;
        }

        // Build the formula
        if (index === 0) {
            formula += `${cell.id}`;
        } else {
            formula += `:${cell.id}`;
        }
    });

    // Create a new cell after the last selected cell to display the sum
    if (selectedCells.length > 0) {
        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        const resultCell = document.createElement('div');
        resultCell.classList.add('cell', 'selected','sum');
        resultCell.innerText = sum;

        lastSelectedCell.parentNode.insertBefore(resultCell, lastSelectedCell.nextSibling);
    }

    // Check if there's an active cell
    if (activeCell) {
        // Create the formula string
        formula = `=SUM(${formula})`;

        // Insert the formula in the input field with ID 'form'
        const inputField = document.getElementById('form');
        inputField.value = formula;

        // Update the active cell with the calculated sum
       
        
        
        // Update the activecell.innerText with the row and column index of the active cell
    }
}




//count of selected cells
function calculateSelectedCellsCount() {
    const activeSheet = document.querySelector('.sheet.active');
    const selectedCells = activeSheet.querySelectorAll('.selected');    
    const count = selectedCells.length; // Count the number of selected cells

    // Display the count in a new cell
    if (selectedCells.length > 0) {
        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        const resultCell = document.createElement('div');
        resultCell.classList.add('cell', 'selected', 'count'); // You can add a 'count' class to style the cell differently if needed
        resultCell.innerText = count;

        lastSelectedCell.parentNode.insertBefore(resultCell, lastSelectedCell.nextSibling);
    }

    // Check if there's an active cell
   
    const inputField = document.getElementById('form');
        inputField.value = `=(COUNT)::${count}`;
}




//calculate selected cells maximum
function calculateSelectedCellsMax() {
    const activeSheet = document.querySelector('.sheet.active');
    const selectedCells = activeSheet.querySelectorAll('.selected');
        let max = Number.MIN_SAFE_INTEGER; // Initialize max with the smallest possible integer value

    selectedCells.forEach((cell) => {
        const cellValue = parseFloat(cell.innerText);
        if (!isNaN(cellValue)) {
            max = Math.max(max, cellValue);
        }
    });

    // Create a new cell after the last selected cell to display the maximum
    if (selectedCells.length > 0) {
        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        const resultCell = document.createElement('div');
        resultCell.classList.add('cell', 'selected', 'max');
        resultCell.innerText = max;

        lastSelectedCell.parentNode.insertBefore(resultCell, lastSelectedCell.nextSibling);
    }

    // Check if there's an active cell
    if (activeCell) {
        // Create the formula string
        const formula = `=MAX(${max})`;

        // Insert the formula in the input field with ID 'form'
        const inputField = document.getElementById('form');
        inputField.value = formula;

        // Update the active cell with the calculated maximum
        
    }
}


//minimum of selected cells
function calculateSelectedCellsMin() {
    const activeSheet = document.querySelector('.sheet.active');
    const selectedCells = activeSheet.querySelectorAll('.selected');
        let min = Number.MAX_SAFE_INTEGER; // Initialize max with the smallest possible integer value

    selectedCells.forEach((cell) => {
        const cellValue = parseFloat(cell.innerText);
        if (!isNaN(cellValue)) {
            min = Math.min(min, cellValue);
        }
    });

    // Create a new cell after the last selected cell to display the maximum
    if (selectedCells.length > 0) {
        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        const resultCell = document.createElement('div');
        resultCell.classList.add('cell', 'selected', 'min');
        resultCell.innerText = min;

        lastSelectedCell.parentNode.insertBefore(resultCell, lastSelectedCell.nextSibling);
    }

    // Check if there's an active cell
    if (activeCell) {
        // Create the formula string
        const formula = `=MIN(${min})`;

        // Insert the formula in the input field with ID 'form'
        const inputField = document.getElementById('form');
        inputField.value = formula;

        // Update the active cell with the calculated maximum
        
    }
}




//average of selectde cells
function calculateSelectedCellsAverage() {
    const activeSheet = document.querySelector('.sheet.active');
    const selectedCells = activeSheet.querySelectorAll('.selected');
        let sum = 0;
    let count = 0;

    selectedCells.forEach((cell) => {
        const cellValue = parseFloat(cell.innerText);
        if (!isNaN(cellValue)) {
            sum += cellValue;
            count++;
        }
    });

    let average = 0;
    if (count > 0) {
        average = sum / count;
    }

    // Create a new cell after the last selected cell to display the average
    if (selectedCells.length > 0) {
        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        const resultCell = document.createElement('div');
        resultCell.classList.add('cell', 'selected', 'average'); // You can add an 'average' class to style the cell differently if needed
        resultCell.innerText = average.toFixed(2); // Display average with 2 decimal places

        lastSelectedCell.parentNode.insertBefore(resultCell, lastSelectedCell.nextSibling);
    }

    // Check if there's an active cell
    if (activeCell) {
        // Create the formula string
        const formula = `=AVERAGE(${average.toFixed(2)})`;

        // Insert the formula in the input field with ID 'form'
        const inputField = document.getElementById('form');
        inputField.value = formula;

        
    }
}
