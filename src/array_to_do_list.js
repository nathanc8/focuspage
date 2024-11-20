var addBtn = document.getElementById('AddButton');
var inputEntry = document.getElementById('entry');
function getDatas() {
    var toDosString = localStorage.getItem('to_do_list');
    var toDoArray;
    if (toDosString) {
        toDoArray = JSON.parse(toDosString);
    }
    else {
        toDoArray = [];
    }
    return toDoArray;
}
var toDoArray = getDatas();
function buttonAddListener() {
    addBtn.addEventListener('click', createEntry);
    inputEntry.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            createEntry();
            inputEntry.value = '';
        }
    });
}
buttonAddListener();
function initializeToDoList() {
    for (var i = 0; i < toDoArray.length; i++) {
        var entryValue = toDoArray[i];
        if (entryValue != null)
            displayEntry(i, entryValue);
    }
}
initializeToDoList();
var entryCount = toDoArray.length;
function createEntry() {
    var entryToStock = inputEntry.value;
    stockEntry(entryCount, entryToStock);
    entryCount++;
}
function stockEntry(count, entry) {
    toDoArray.push(entry);
    localStorage.setItem('to_do_list', JSON.stringify(toDoArray));
    displayEntry(count, entry);
}
function displayEntry(count, entry) {
    var divEntries = document.getElementById('displayEntries');
    var entryToDisplay = document.createElement('div');
    entryToDisplay.id = "taskItem".concat(count);
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "check".concat(count);
    checkbox.addEventListener('change', function () {
        updateDisplay("task".concat(count));
    });
    entryToDisplay.appendChild(checkbox);
    var entryParagraph = document.createElement('label');
    entryParagraph.innerText = entry;
    entryParagraph.id = "task".concat(count);
    entryParagraph.setAttribute('for', "check".concat(count));
    divEntries.appendChild(entryToDisplay);
    entryToDisplay.appendChild(entryParagraph);
    var idToImpact = entryParagraph.id;
    var divButton = document.createElement('div');
    divButton.id = "divBtn";
    entryToDisplay.appendChild(divButton);
    var editButton = document.createElement('button');
    editButton.classList.add('toDoButton');
    editButton.innerHTML = "<img src='../public/assets/edit_logo.png' width = 100% />";
    editButton.id = "editBtn".concat(count);
    editButton.addEventListener('click', function () {
        editEntry("task".concat(count));
    });
    var removeButton = document.createElement('button');
    removeButton.classList.add('toDoButton');
    removeButton.innerHTML = "<img src='../public/assets/remove_logo.png' width = 100% />";
    removeButton.id = "rmvBtn".concat(count);
    removeButton.addEventListener('click', function (element) {
        removeItem(idToImpact);
    });
    var acceptButton = document.createElement('button');
    acceptButton.style.display = 'none';
    acceptButton.classList.add('toDoButton');
    acceptButton.innerHTML = "<img src='../public/assets/confirm_logo.png' width = 100% />";
    acceptButton.id = "task".concat(count, "Acc");
    if (divButton) {
        divButton.appendChild(acceptButton);
        divButton.appendChild(editButton);
        divButton.appendChild(removeButton);
    }
}
function removeItem(id) {
    var element = document.getElementById("".concat(id));
    element.remove();
    var index = parseInt(id.substring(4));
    toDoArray.splice(index, 1);
    localStorage.setItem('to_do_list', JSON.stringify(toDoArray));
    var divEntries = document.getElementById('displayEntries');
    if (divEntries)
        divEntries.innerHTML = '';
    initializeToDoList();
}
function updateDisplay(id) {
    var updateEntry = document.getElementById("".concat(id));
    if (updateEntry.classList.contains('finishedTask') == true) {
        updateEntry.classList.remove('finishedTask');
    }
    else {
        updateEntry.classList.add('finishedTask');
    }
}
function editEntry(id) {
    var acceptButton = document.getElementById("".concat(id, "Acc"));
    acceptButton.removeAttribute('style');
    var entryTextToEdit = document.getElementById("".concat(id));
    var entryEditor = document.createElement('textarea');
    entryEditor.innerText = entryTextToEdit.innerText;
    entryTextToEdit.innerText = '';
    entryTextToEdit.appendChild(entryEditor);
    entryEditor.setAttribute('rows', '1');
    acceptButton.addEventListener('click', function () {
        entryTextToEdit.innerText = entryEditor.value;
        entryEditor.remove();
        acceptButton.style.display = 'none';
        var indexOfEntry = id.match(/(\d+)/);
        indexOfEntry = indexOfEntry[0];
        toDoArray.splice(indexOfEntry, 1, entryTextToEdit.innerText);
        localStorage.setItem('to_do_list', JSON.stringify(toDoArray));
    });
}
