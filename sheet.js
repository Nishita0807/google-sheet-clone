
    // Function to navigate between sheets
    function navigateTo(sheetId) {
        // Hide all sheets
        const sheets = document.querySelectorAll('.sheet');
        sheets.forEach(sheet => sheet.classList.remove('active'));

        // Highlight the selected button
        document.getElementById('sheet1Button').classList.remove('highlighted');
        document.getElementById('sheet2Button').classList.remove('highlighted');

        // Show the selected sheet
        const selectedSheet = document.getElementById(sheetId);
        selectedSheet.classList.add('active');

        // Highlight the corresponding button
        document.getElementById(sheetId + 'Button').classList.add('highlighted');

        if(sheetId=='sheet2'){
           
        }
    }

    navigateTo('sheet1');

        const header2 = document.getElementById("header-1");
        const body2 = document.getElementById("body-1");
        const div3=document.createElement("div");
for(let i=65;i<=90;i++){
    let char=String.fromCharCode(i);
   
    const bold=document.createElement("b");
    bold.innerHTML=char;
    div3.appendChild(bold);
    header2.appendChild(div3);
}
body2.appendChild(header2);
        function createSheet2(rowNumber) {
            const row = document.createElement("div");
            row.className = "row";

            for (let i = 64; i <= 90; i++) {
                if (i === 64) {
                    // Represent row number
                    const b = document.createElement("b");
                    b.innerText = rowNumber;
                    row.appendChild(b);
                } else {
                    // Empty cell
                    const cell = document.createElement("div");
                    cell.id = `${String.fromCharCode(i)}${rowNumber}`;
                    cell.dataset.row = rowNumber;
                    cell.dataset.col = i;

                    cell.className = "cell";
                    cell.contentEditable = "true";
                    cell.addEventListener("focus", onCellFocus);

                    row.appendChild(cell);
                }
            }

            body2.appendChild(row);
        }

        // Create 100 rows for sheet2 (same as sheet1)
        for (let i = 1; i <= 100; i++) {
            createSheet2(i);
        }

    function updateInputField() {
    if (activeCell) {
        const inputField = document.getElementById("form");
        inputField.value = activeCell.innerText;
        console.log(inputField.value);
    }
}




