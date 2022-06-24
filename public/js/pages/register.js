
////register.js front endinis failas

import { IsValid } from "../components/IsValid.js";

/////issitraukiame elementus is html

const formDOM = document.querySelector('.form');         //formos DOM elementas. Susirandame forma.
const inputsDOM = formDOM.querySelectorAll('input');      ////formos DOM inputai. Susirandame visus laukus. Galime matyti visa info juose.
const submitDOM = formDOM.querySelector('button');        ////susirandame mygtuka.
const notificationsDOM = formDOM.querySelector('.notifications');///notifikations elementas.

if (submitDOM) {  //patikriname ar mygtukas yra
    submitDOM.addEventListener('click', async (e) => {   //sukuriame eventa, kas ivyks paspaudus buttona
        e.preventDefault();                        //perimame kontrole, rasome logika

        notificationsDOM.classList.remove('show'); //is pradziu nesimato "show klases elemento", pries naujai pradedant suvesti duomenis notification elemento nerodo.

        const data = {};    //objektas kaupti duomenims. Konstruojamas duomenu objektas                     
        const errors = [];   //turiu tuscia masyva, kaupti klaidoms. Kaupiamos klaidos.

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
                if (!inputDOM.checked) {                 //jeigu nera checked
                    errors.push('Privaloma sutikti su TOS') //TOS - terms of service;
                }
            }
        }

        //console.log(inputsDOM)   ///matome forma, ir kokioje pozicijoje yra konkretus inputai objekte. password ir repeat pasword yra 2 oje 3 ioje pozicijose.

        if (inputsDOM[2].value !== inputsDOM[3].value) {   ///jeigu pasword inputas antroje pozicijoje inputu grupeje nesutampa su repeat password esanciu 3 pozicijoje.
            errors.push('Slaptazodziai nesutampa');   ///i errors masyva ipushiname zinute.
        }



        if (errors.length) {   ///prasisukus ciklui, ziurime kiek klaidu rado.
            notificationsDOM.classList.add('show');  //atsiranda notifications langas.
            // notificationsDOM.innerHTML = errors.map(e => `<p>${e}.</p>`).join('');   ///siat eilute naudotume, jei noretume kiekviena zinute klaidos ivilkti paragrafa, del stiliaus pvz.
            notificationsDOM.innerText = errors.join('.\n') + '.'; //erorus sujungiame .n (per enter, new line) ir atvaizduojame notification elemente.
        } else {
            delete data.repass;
            delete data.tos;


            // async/await//visada eina kartu.
            //is front end informacija iskeliauja i backa.

            const response = await fetch(formDOM.action, {     ///kodas asinchroninins - kurio reikia laukti- await. Prie tevinio elemento turi buti async.
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            console.log(res);
        }

    })
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