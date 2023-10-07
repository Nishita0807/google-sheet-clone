const header=document.getElementById("header");
const body=document.getElementById("body");

const div1=document.createElement("div");
for(let i=65;i<=90;i++){
    let char=String.fromCharCode(i);
   
    const bold=document.createElement("b");
    bold.innerHTML=char;
    div1.appendChild(bold);
    header.appendChild(div1);
}
body.appendChild(header);

function create(rowNumber){
    const row=document.createElement("div");
row.className="row";

for(let i=64;i<=90;i++){
    if(i===64){
        //represent row number 
        const b=document.createElement("b");
        b.innerText=rowNumber;
        row.appendChild(b);

    }
    else{
        //empty cell
        const cell=document.createElement("div");
        cell.id=`${String.fromCharCode(i)}${rowNumber}`;
        cell.dataset.row=rowNumber;
        cell.dataset.col=i;

        cell.className="cell";
        cell.contentEditable="true";
        cell.addEventListener("focus",onCellFocus);
        

        row.appendChild(cell);
        
    }
}

body.appendChild(row);
}




//create 100 rows called above for 100 times

for(let i=1;i<=100;i++){
create(i);
}








//select multiple // Select
let isMouseDown = false;
let startCell = null;
let endCell = null;

document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function handleMouseDown(event) {
    if (event.target.classList.contains('cell')) {
        isMouseDown = true;
        startCell = event.target;
        endCell = event.target;
        selectCell(startCell);
    }
}

function handleMouseMove(event) {
    if (isMouseDown && event.target.classList.contains('cell')) {
        endCell = event.target;
        selectCellsInRange(startCell, endCell);
    }
}

function handleMouseUp() {
    isMouseDown = false;
}

function selectCell(cell) {
    cell.classList.add('selected');
}

function deselectCell(cell) {
    cell.classList.remove('selected');
}

function selectCellsInRange(start, end) {
    const cells = document.querySelectorAll('.cell');
    const startRow = parseInt(start.dataset.row);
    const startCol = start.dataset.col;
    const endRow = parseInt(end.dataset.row);
    const endCol = end.dataset.col;

    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = cell.dataset.col;

        if (
            row >= Math.min(startRow, endRow) &&
            row <= Math.max(startRow, endRow) &&
            col >= Math.min(startCol, endCol) &&
            col <= Math.max(startCol, endCol)
        ) {
            selectCell(cell);
        } else {
            deselectCell(cell);
        }
    });
}









//for empty cell to input field content
function updateInputField() {
    if (activeCell) {
        const inputField = document.getElementById("form");
        inputField.value = activeCell.innerText;
        console.log(inputField.value);
    }
}

// Get an array of cell elements from the HTMLCollection
const Cells = Array.from(document.getElementsByClassName('cell'));

// Add input event listeners to each data cell
Cells.forEach((cell) => {
    cell.addEventListener("input", () => {
        updateInputField();
    });
});
