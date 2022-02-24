/*
    ------------Esercizio 1------------
    a) Sostituisci tutte le parole 'Lorem Ipsum', con un testo 
    alternativo 'sample text'.

    OPTIONAL
    b) Sostituisci tutte le parole 'Lorem Ipsum', indipendemente dal fatto
    che iniziano o meno con la maiuscola, con un testo alternativo 'sample text'.
*/

// 1. Assegnato <p id="target-paragraph"> a paragrafo dal quale prelevare la frase

// 2. Salvare contenuto di paragraph in una variabile 
let paragraph = document.getElementById("target-paragraph");
let paragraphText = paragraph.textContent;

// 3. Elimina spazi addizionali della stringa
let cleanParagraphText = paragraphText.replace(/\s+/g, ' ');

//  5. Oggetto con le parole da sostituire
let mapObj = {
    lorem: "awesome",
    ipsum: "react",
};

// 6. Funzione per il replace
function replaceAll(str, mapObj) {
    // 6. regular expression
    var re = new RegExp(Object.keys(mapObj).join("|"), "gi");

    // 7. Replace delle parole 
    return str.replace(re, function(matched) {
        return mapObj[matched.toLowerCase()];
    });
}

let result = replaceAll(cleanParagraphText, mapObj);

document.getElementById('target-paragraph').insertAdjacentHTML("afterend", '<h4 id = "res1-tag"> Risultato Esercizio 1 </h4>');

document.getElementById('res1-tag').insertAdjacentHTML("afterend", `<p> ${result} </p>`);


/*
    ------------Esercizio 2------------
    Data una tabella con l'id 'table-unique-id', rendere di un colore diverso le righe con indice pari.

    English tip:
    Even - Pari
    Odd - Dispari
*/

// Ho considerato solo le righe pari effettive della Tabella, l'Header (row_ind = 0) sebbene sebbene risulti
// pari, l'ho lasciato con background invariato.
let table = document.getElementById('table-unique-id');

// Oggetto contenente i colori 
let colorObject = {
    evenRowColor: '#54d9eb',
    oddRowColor: '#ffffff', // Colore per righe dispari: #53d484
    headerRowColor: '#ffffff' // Colore per header: #e843a9
}


function colorTableRowFunction(table, colorObject) {
    // Ciclo con forEach sulle varie row della tabella e poi applico logica con il Ternary Operator
    if (table) {
        Array.from(table.rows).forEach((tr, row_ind) => {
            (row_ind % 2 === 0 && row_ind !== 0) ?
            tr.style.background = colorObject.evenRowColor:
                ((row_ind === 0) ? tr.style.background = colorObject.headerRowColor :
                    tr.style.background = colorObject.oddRowColor)
        });
    }
}

colorTableRowFunction(table, colorObject);

/*
    ------------Esercizio 3------------
    Data una tabella con l'id 'second-table-unique-id', aggiungere una nuova riga alla tabella.

    Dettagli riga:
    Microsoft - Satya Nadella - Washington
*/

let tableTwo = document.getElementById('second-table-unique-id');

// Indice per inserimento riga (deve essere maggiore di 0, così da evitare di spostare l'header)
let newRowIndex = 1;

let employeeInfoObject = {
    company: "Microsoft",
    contact: "Satya Nadella",
    country: "Washington-USA"
}

function doTheInsert(tableTwo, newRowIndex, employeeInfoObject) {
    if (tableTwo) {
        Array.from(tableTwo.rows).forEach((tr, row_ind) => {
            // Se l'indice in cui inserire la nuova riga va oltre la lunghezza della tabella 
            // effettua un append alla fine della stessa
            if (row_ind === tableTwo.rows.length - 1 && newRowIndex > tableTwo.rows.length - 1) {
                let newRow = tableTwo.insertRow(-1);
                newRow.innerHTML = `<td>${employeeInfoObject.company}</td>
                                    <td>${employeeInfoObject.contact}</td>
                                    <td>${employeeInfoObject.country}</td>`;
            }
            // Se l'indice è nel range della righe, inserisce in quella determinata posizione
            else if (row_ind === newRowIndex && row_ind > 0) {
                let newRow = tableTwo.insertRow(row_ind);
                newRow.innerHTML = `<td>${employeeInfoObject.company}</td>
                                    <td>${employeeInfoObject.contact}</td>
                                    <td>${employeeInfoObject.country}</td>`;
            }
        });
    }
};

// Richiamo la funzione per inserire
doTheInsert(tableTwo, newRowIndex, employeeInfoObject);

/*
    ------------Esercizio 4------------
    Avendo una form di registrazione semplice, 
    fare un controllo per vedere se la password coincide con il campo
    di conferma della password.
    Nel caso non coincidano far vedere un messaggio di errore.
*/

let messageObj = {
    unmatchedPass: "Passwords doesn't match",
    matchedPass: "Passwords match",
    emptyPassFields: "No password typed",
    wrongEmail: "Invalid email (use gmail account)"
}

// Funzione per verifica email
const validRegistrationEmail = (email) => {
    // regex for valid gmail
    const GMAIL_REGEX = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g

    // regex for generic email
    const EMAIL_REGEX = /(\<|^)[\w\d._%+-]+@(?:[\w\d-]+\.)+(\w{2,})(\>|$)/i;

    return GMAIL_REGEX.test(String(email).toLowerCase());
};


// Effettua il check sulle password
const passwordCheck = (pass, passToCheck) => {
    // Regex min 6 max 10 caratteri (almeno 1 uppercase, 1 lowercase 1 numero e 1 car. speciale)
    const PASS_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/

    // Esempio di password per test : 123456@Ad
    if (PASS_REGEX.test(String(pass)) && PASS_REGEX.test(String(passToCheck))) {
        return (pass === passToCheck) ? true : false;
    }
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function createDivItemDetail(renderTextMessage, isError) {
    if (document.getElementById('message-box')) {
        document.getElementById('message-box').remove();
    }

    let divMessageBox = document.createElement('div');
    divMessageBox.id = "message-box";

    if (isError) {
        divMessageBox.style = "text-align: left ; margin-top: 20px; color: red; font-style: italic"
    } else {
        divMessageBox.style = "text-align: left ; margin-top: 20px; color: green; font-style: italic"
    }

    divMessageBox.innerHTML = renderTextMessage;

    return divMessageBox;
}



function loginSubmit(event) {
    event.preventDefault();

    let isError = false;

    // Prelevo i 3 campi dal DOM
    let emailInput = document.getElementById('email').value;
    let passwordInput = document.getElementById('password').value;
    let passwordInputConfirm = document.getElementById('password-confirmation').value;

    let formContainer = document.getElementById('inputs-div');

    // Effettuo un check sulla email usata per la registrazione
    if (validRegistrationEmail(emailInput)) {
        if (passwordInput !== '' && passwordInputConfirm !== '') {
            if (passwordCheck(passwordInput, passwordInputConfirm)) {

                let name = createDivItemDetail(messageObj.matchedPass, isError);
                formContainer.appendChild(name);

            } else {
                isError = true;
                let name = createDivItemDetail(messageObj.unmatchedPass, isError);
                formContainer.appendChild(name);
            }
        } else {
            isError = true;
            let name = createDivItemDetail(messageObj.emptyPassFields, isError);
            formContainer.appendChild(name);
        }

    } else {
        isError = true;
        let name = createDivItemDetail(messageObj.wrongEmail, isError);
        formContainer.appendChild(name);
    }
}