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















/*
    ------------Esercizio 3------------
    Data una tabella con l'id 'second-table-unique-id', aggiungere una nuova riga alla tabella.

    Dettagli riga:
    Microsoft - Satya Nadella - Washington
*/















/*
    ------------Esercizio 4------------
    Avendo una form di registrazione semplice, 
    fare un controllo per vedere se la password coincide con il campo
    di conferma della password.
    Nel caso non coincidano far vedere un messaggio di errore.
*/