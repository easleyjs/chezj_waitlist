// Get input values, create a new customer table object, add to array.
function addTableToArr() {
    let custName = document.getElementById('custName').value;
    let partySize = document.getElementById('partySize').value;
    let tablePref = document.getElementById('inOutPref').value;
    let notes = document.getElementById('notes').value;
    let custObj = {name: custName,
                   partySize: partySize,
                   tablePref: tablePref,
                   notes: notes
                  };
    custTablesArr.push(custObj);
    //console.log(custTablesArr);
    localStorage.setItem("tables",JSON.stringify(custTablesArr));
    custName = '';
    partySize = '';
    tablePref = '';
    notes = '';
}

// Remove selected table from array of tables and local storage.
function removeTableFromArr(index) {
  custTablesArr.splice(index,1);
  localStorage.setItem('tables',JSON.stringify(custTablesArr));
}

// Use the array of table objects to generate div cards for each table.
function refreshTableDiv() {
  const custTablesDiv = document.getElementById('cust-tables-div');
  // Remove existing tables
  while (custTablesDiv.hasChildNodes()) {
    custTablesDiv.removeChild(custTablesDiv.firstChild)
  }
  // Create a customer table div and appened to parent customer tables div
  for (let i=0;i<custTablesArr.length;i++) {
  //console.log(table.name);
     const table = custTablesArr[i];       
     custTablesDiv.appendChild(makeTableDiv(table.name,table.partySize,table.tablePref,table.notes,i));
  }
}

// Make a div card for each individual table with info about the party and a delete button.
function makeTableDiv(custNameStr,partySizeInt,custPrefStr,custNotesStr,idx) {
  let table = document.createElement("div");
  table.setAttribute('id',idx);
  let custName = document.createElement("p");
  let partySize = document.createElement("p");
  let custPref = document.createElement("p");
  let custNotes = document.createElement("p");
  // Assign values to fields
  custName.innerHTML = '<span>Customer Name: </span>' + custNameStr;
  partySize.innerHTML = '<span>Party Size: </span>' + partySizeInt;
  custPref.innerHTML = '<span>Inside/Outside: </span>' + custPrefStr;
  custNotes.innerHTML = '<span>Notes: </span>' + custNotesStr;
  // Assign classes to div and fields
  table.classList.add("cust-table-div");
  custName.classList.add("cust-name");
  partySize.classList.add("cust-party-size");
  custPref.classList.add("cust-pref");
  custNotes.classList.add("cust-notes");
  // Append fields to div node
  const custFieldsArr = [custName,partySize,custPref,custNotes];
  custFieldsArr.forEach((field) =>{
    table.appendChild(field);
  });
  //Create remove table svg icon
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //svg.setAttribute('style', 'border: 1px solid black');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.classList.add('deleteIcon');

var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
   circle.setAttribute('cx', '14');
   circle.setAttribute('cy', '14');
   circle.setAttribute('r', '12');
svg.appendChild(circle);

var rightLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
   rightLine.setAttribute('x1', '10');
   rightLine.setAttribute('x2', '18');
   rightLine.setAttribute('y1', '10');
   rightLine.setAttribute('y2', '18');
svg.appendChild(rightLine);

var leftLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
   leftLine.setAttribute('x1', '10');
   leftLine.setAttribute('x2', '18');
   leftLine.setAttribute('y1', '18');
   leftLine.setAttribute('y2', '10');
svg.appendChild(leftLine);
 
// Add an event listener to enable item removal
  svg.addEventListener('click',(e) =>{
    let idx = e.target.parentNode.parentNode.id;
    removeTableFromArr(idx);
    refreshTableDiv();
  })
  table.appendChild(svg);  
  return table;
};

// When page first loads, check to see if tables already exist in local storage. If so, load. If not, create empty array.
//const custTablesArr = JSON.parse(localStorage.getItem('tables')) || [];

let custTablesArr = [];

if (localStorage.getItem("tables")) {
  custTablesArr = JSON.parse(localStorage.getItem("tables"));
}

if (custTablesArr.length > 0) {
   refreshTableDiv();
};

// Add event listener to form to create new table on submit.
document.getElementById('custForm').addEventListener("submit", function(e) {
    e.preventDefault();
    addTableToArr();
    alert('Table Added.');
    refreshTableDiv();
});