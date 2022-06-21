
////register.js front endinis failas

import { IsValid } from "../components/IsValid.js";

/////issitraukiame elementus is html

const formDOM = document.querySelector('.form');         //formos DOM elementas. Susirandame forma.
const inputsDOM = formDOM.querySelectorAll('input');      ////formos DOM inputai. Susirandame visus laukus. Galime matyti visa info juose.
const submitDOM = formDOM.querySelector('button');        ////susirandame mygtuka.
const notificationsDOM = formDOM.querySelector('.notifications');///notifikations elementas.

if (submitDOM) {  //patikriname ar mygtukas yra
    submitDOM.addEventListener('click', (e) => {   //sukuriame eventa, kas ivyks paspaudus buttona
        e.preventDefault();                        //perimame kontrole, rasome logika

        notificationsDOM.classList.remove('show'); //is pradziu nesimato "show klases elemento", pries naujai pradedant suvesti duomenis notification elemento nerodo.

        const data = {};    //objektas kaupti duomenims.                     
        const errors = [];   //turiu tuscia masyva, kaupti klaidoms

        for (const inputDOM of inputsDOM) {  //einu per laukus, inputus ciklas.
            if (inputDOM.type !== 'checkbox') { //patikriname tipa, ar nera checkbox
                const rule = inputDOM.dataset.validation;  //jeigu ne checkbox, issitraukiame validuojancios funkcijos pavadinima.
                const [err, msg] = IsValid[rule](inputDOM.value);  //destrukturizavimas, masyvo iskonstravimas.pravaliduoju.Grazina ar istiko klaida ir jeigu taip, tai kokia.

                if (err) {    //jei buvo klaida, tai i klaidu masyva itraukiu zinute.
                    errors.push(msg);
                } else {
                    data[inputDOM.name] = inputDOM.value;  //jei klaidos nebuvo, kaupiame duomenis i duomenu objekta.
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;  ///jei yra checkbox, tada pazymi, kad checked.
            }
        }

        if (errors.length) {   ///prasisukus ciklus, ziurime kiek klaidu rado.
            notificationsDOM.classList.add('show');  //atsiranda notifications langas.
            // notificationsDOM.innerHTML = errors.map(e => `<p>${e}.</p>`).join('');
            notificationsDOM.innerText = errors.join('.\n') + '.'; //erorus sujungiame .n (per enter, new line) ir atvaizduojame notification elemente.
        }

        // tikriname ar laukai ne tusti
        // tikriname ar geros vertes:
        //      ar vardas "tinkamas" (minimum 2 zodziai)
        //      ar email "tinkamas"
        //      ar password "tinkamas"
        //      ar repeat-password "tinkamas"
        //      ar password === repeat-password
        //      ar TOS pazymetas (check)
        //  JEI yra klaidu:
        //      klaidas atvaizduojame pranesimu bloke
        //  JEI klaidu nera:
        //      sekmes pranesima atvaizduojame pranesimu bloke

        // siunciam i backend'a (API)
        //      JEI grazino klaida
        //          klaidas atvaizduojame pranesimu bloke
        //      JEI klaidu nera:
        //          sekmes pranesima atvaizduojame pranesimu bloke
    })
}