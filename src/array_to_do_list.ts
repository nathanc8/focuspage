let addBtn = document.getElementById('AddButton') as HTMLButtonElement;
let inputEntry = document.getElementById('entry') as HTMLInputElement;

function getDatas() {
    let toDosString: any = localStorage.getItem('to_do_list');
    let toDoArray: Array<string>;
    if (toDosString) {
        toDoArray = JSON.parse(toDosString);
    } else {
        toDoArray = [];
    }
    return toDoArray;
}
let toDoArray: Array<string> = getDatas();

function buttonAddListener() {
    addBtn.addEventListener('click', createEntry);
    inputEntry.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            createEntry();
            inputEntry.value = '';
        }
    });
}
buttonAddListener();

function initializeToDoList(): void {
    for (let i: number = 0; i < toDoArray.length; i++) {
        let entryValue: string | null = toDoArray[i];
        if (entryValue != null) displayEntry(i, entryValue);
    }
}
initializeToDoList();

let entryCount: number = toDoArray.length;

function createEntry(): string | void {
    let entryToStock: string = inputEntry.value;
    stockEntry(entryCount, entryToStock);
    entryCount++;
}

function stockEntry(count: number, entry: string): void {
    toDoArray.push(entry);
    localStorage.setItem('to_do_list', JSON.stringify(toDoArray));
    displayEntry(count, entry);
}

function displayEntry(count: number, entry: string): void {
    let divEntries = document.getElementById(
        'displayEntries'
    ) as HTMLDivElement;
    let entryToDisplay = document.createElement('div') as HTMLDivElement;
    entryToDisplay.id = `taskItem${count}`;

    let checkbox = document.createElement('input') as HTMLInputElement;
    checkbox.type = 'checkbox';
    checkbox.id = `check${count}`;
    checkbox.addEventListener('change', () => {
        updateDisplay(`task${count}`);
    });

    entryToDisplay.appendChild(checkbox);

    let entryParagraph = document.createElement('label') as HTMLLabelElement;
    entryParagraph.innerText = entry;
    entryParagraph.id = `task${count}`;
    entryParagraph.setAttribute('for', `check${count}`);

    divEntries.appendChild(entryToDisplay);
    entryToDisplay.appendChild(entryParagraph);

    let idToImpact: string = entryParagraph.id;

    let divButton = document.createElement('div') as HTMLDivElement;
    divButton.id = `divBtn`;
    entryToDisplay.appendChild(divButton);

    let editButton = document.createElement('button') as HTMLButtonElement;
    editButton.classList.add('toDoButton');
    editButton.innerHTML = `<img src='../public/assets/edit_logo.png' width = 100% />`;
    editButton.id = `editBtn${count}`;
    editButton.addEventListener('click', () => {
        editEntry(`task${count}`);
    });

    let removeButton = document.createElement('button') as HTMLButtonElement;
    removeButton.classList.add('toDoButton');
    removeButton.innerHTML = `<img src='../public/assets/remove_logo.png' width = 100% />`;
    removeButton.id = `rmvBtn${count}`;
    removeButton.addEventListener('click', (element) => {
        removeItem(idToImpact);
    });

    let acceptButton = document.createElement('button') as HTMLButtonElement;
    acceptButton.style.display = 'none';
    acceptButton.classList.add('toDoButton');
    acceptButton.innerHTML = `<img src='../public/assets/confirm_logo.png' width = 100% />`;
    acceptButton.id = `task${count}Acc`;

    if (divButton) {
        divButton.appendChild(acceptButton);
        divButton.appendChild(editButton);
        divButton.appendChild(removeButton);
    }
}

function removeItem(id: string): any {
    const element: any = document.getElementById(`${id}`);
    element.remove();
    let index: number | string = parseInt(id.substring(4));
    toDoArray.splice(index, 1);
    localStorage.setItem('to_do_list', JSON.stringify(toDoArray));
    let divEntries = document.getElementById('displayEntries');
    if (divEntries) divEntries.innerHTML = '';
    initializeToDoList();
}

function updateDisplay(id: string) {
    let updateEntry = document.getElementById(`${id}`) as HTMLLabelElement;
    if (updateEntry.classList.contains('finishedTask') == true) {
        updateEntry.classList.remove('finishedTask');
    } else {
        updateEntry.classList.add('finishedTask');
    }
}

function editEntry(id) {
    let acceptButton = document.getElementById(`${id}Acc`) as HTMLButtonElement;
    acceptButton.removeAttribute('style');
    let entryTextToEdit = document.getElementById(`${id}`) as HTMLDivElement;
    let entryEditor = document.createElement('textarea') as HTMLTextAreaElement;
    entryEditor.innerText = entryTextToEdit.innerText;
    entryTextToEdit.innerText = '';
    entryTextToEdit.appendChild(entryEditor);
    entryEditor.setAttribute('rows', '1');

    acceptButton.addEventListener('click', () => {
        entryTextToEdit.innerText = entryEditor.value;
        entryEditor.remove();
        acceptButton.style.display = 'none';
        let indexOfEntry: number = id.match(/(\d+)/);
        indexOfEntry = indexOfEntry[0];
        toDoArray.splice(indexOfEntry, 1, entryTextToEdit.innerText);
        localStorage.setItem('to_do_list', JSON.stringify(toDoArray));
    });
}
