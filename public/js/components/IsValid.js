///Metodai, kurie gali patikrinti ar suvesti duomenys yra tinkami

class IsValid {      ///tikrinimo klase ir metodai

    ////FULLNAME\\\\\\

    static fullname(str) {
        if (str === undefined) {    ///jei nieko neivesta
            return [true, 'Neduotas parametras'];
        }
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }

        str = str.trim().replace(/\s+/g, ' ');  //pakeicia visus didesnius tarpus i viena tarpa viduje stringo, pries tai su trim panaikinus tuscias vietas is abieju pusiu.
        // str = str.trim().replaceAll('  ', ' '); // galimas ir toks budas.

        const minWordsCount = 2;
        const minWordLength = 2;
        const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);

        if (str.length < minTextLength) {
            return [true, `Per trumpas tekstas, turi buti minimum ${minTextLength} simboliai`];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const words = str.split(' ');

        if (words.length < minWordsCount) {
            return [true, `Tekstas turi tureti ${minWordsCount} arba daigiau zodziu`];
        }
        for (const word of words) {
            if (word.length < minWordLength) {
                return [true, `Visos vardo dalys turi buti minimum ${minWordLength} simboliu`];
            }

            // pirma raide
            if (word[0].toUpperCase() !== word[0]) {
                return [true, `Pirma zodzio raide turi buti didzioji`];
            }

            // kitos raides
            const otherLetters = word.slice(1);
            if (otherLetters.toLowerCase() !== otherLetters) {
                return [true, `Ne pirma zodzio raide turi buti mazoji`];
            }

            // ar tik leistinos raides
            for (const s of word) {
                if (!allowedSymbols.includes(s)) {
                    return [true, `Neleistinas simbolis "${s}"`];
                }
            }
        }

        return [false, 'OK'];
    }

    ////////EMAI\\\\\\\\\\

    static email(str) {
        if (typeof str !== 'string') {    ////jei ivesta reiksme nera stringas.
            return [true, 'Netinkamas tipas, turi buti "string"'];  //rasta klaida. true.
        }
        str = str.trim();  ///nutrimindami gautus vien tik tai tarpus, pamatome, kad nieko nebuvo irasyta. Jei buvo ivesta tik daug tarpu.
        if (str === '') {
            return [true, 'Neivestas email adresas'];
        }

        const parts = str.split('@');  
        if (parts.length !== 2) {  //jeigu gautu nariu ilgis nera du (jei yra vienas @ bus dvi dalys splitinus, jei keli @ tai bus daugiau daliu, jei nera @ tai nesisplitins, taip ir liks tik viena dalis)
            return [true, 'El pasto adresas privalo tureti tik viena @ simboli'];
        }

        const [locale, domain] = parts;  //locale - email dalis iki @, domen - uz @ simbolio.
        if (locale === '') {
            return [true, 'Truksta dalies pries @ simboli'];
        }
        if (domain === '') {
            return [true, 'Truksta dalies uz @ simboli'];
        }

        if (str.includes('..')) {
            return [true, 'El pastas negali tureti dvieju tasku is eiles'];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.';

        if (locale[0] === '.'      //negali prasideti tasku ir negali prasideti skaiciumi, pirma eilute pagauna klaida, jei prasideda su tasku emailas.
            || !isNaN(+locale[0])) {   ///antra eilute jeigu, arba prasideda skaiciumi. Klaida.
            return [true, 'El pastas turi prasideti raide'];
        }
        for (const symbol of locale) {
            if (!allowedSymbols.includes(symbol)) {
                return [true, `Pries @ neleistinas naudoti simbolis "${symbol}"`];
            }
        }

        const domainParts = domain.split('.');  //splitinam domaina per taska arba taskus, jei ju daugiau.
        if (domainParts.length === 1) {
            return [true, 'Uz @ simbolio truksta tasko (netinkamas domenas)'];
        }
        if (domainParts[0] === '') {
            return [true, `Uz @ dalies tekstas negali prasideti tasku`];
        }
        if (domainParts[domainParts.length - 1].length < 2) {  //domain dalyje, kreipiames i paskutini nari, tikrinu koks jo ilgis. Domain yra pries tai issplitintas per taska arba taskus.
            return [true, `Uz @ dalies domenas turi baigtis bent dviejomis raidemis`];
        }
        for (const symbol of domain) {
            if (!allowedSymbols.includes(symbol)) {
                return [true, `Uz @ neleistinas naudoti simbolis "${symbol}"`];
            }
        }

        return [false, 'OK'];
    }

    ///////PASWORD\\\\\\

    static password(str) {
        const minPasswordLength = 12;

        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }
        if (str.length < minPasswordLength) {
            return [true, `Per trumpas password tekstas, turi buti minimum ${minPasswordLength} simboliai`];
        }

        return [false, 'OK'];
    }
}

export { IsValid }

/*IsValid.fullname(44444); //jeigi i fullname inputa bus suvetsa skaiciai, tikimes gauti masyva [true, 'err'] -true, ivyko klaida ir klaidos pranesimas.
IsValid.fullname('')     //nieko nesuvesta //kiti variantai, kada butu klaida, suvedus i fullname inputa
IsValid.fullname('petras') //tik vienas vardas-zodis
IsValid.fullname('petras petraitis')
IsValid.fullname('Petras petraitis')    ///kuriame galimus klaidu variantus.
IsValid.fullname('petras Petraitis') 
IsValid.fullname('Petras PetraitiS')  

IsValid.fullname('Petras Petraitis')*/ //nebera klaidos [false, 'ok'] Yra klaida? false -klaidos nera.

///////////ISAISKINIMAS 90 EILUTES\\\\\\

//petras@mail.com    //petras-locale dalis, mail.com-domain dalis. Geras email variantas.

//1petras@mail.com  //blogas variantas, prasideda skaiciumi.
//.petras@mail.com  //blogas email varianatas, prasideda su tasku

/*if (locale[0] === '.'      //negali prasideti tasku ir negali prasideti skaiciumi, pirma eilute pagauna klaida, jei prasideda su tasku emailas.
|| !isNaN(+locale[0])) {   ///antra eilute jeigu, arba prasideda skaiciumi. Klaida.
return [true, 'El pastas turi prasideti raide'];

+'a' gausiu NaN
+'1' gausiu 1          //+zenklas pakeicia skaiciu, kuris iyra stringas i skaicius, kuris yra number. Pakeicia tipa.
                       //jeigu stringe minusinis skaicius, tai jo tipa pakeicia ne pliusas, o minusas priekyje.
parseInt('1') gaunu 1   //taip pat kakeicia skaiciaus tipa is stringo i number.

parseInt('1asd') gausiu 1; Skaito iki artimiausio ne skaiciaus ir ka randa ta atiduoda.
parseInt('asd') gausiu NaN; Nepavyko rasti jokio skaiciaus.

+'1asd' gausiu NaN;


1petras@mail.com        ///tikriname email su skaiciumi priekyje.
!isNaN(+locale[0])     ///is pradziu turime tokia eilute
!isNaN(+1petras[0])    //isistato locale reiksme
!isNaN(+'1')           //is stringo pirma reiksme yra '1'
!isNaN(1)              //pliusas pakeicia tipa is stringo i number
!false              //kai isNaN paklausia ar vienetas yra NaN, grazina atsakyma false
true                //sauktukas !false yra true. Randama klaida.

petras@mail.com        ///tikriname email be skaiciaus priekyje.
!isNaN(+locale[0])     ///is pradziu turime tokia eilute
!isNaN(+petras[0])    //isistato locale pirmo simbolio reiksme
!isNaN(+'p')           //is stringo pirma reiksme yra 'p'
!isNaN(NaN)              //pliusas pakeicia tipa is stringo i number, nera skaiciaus, gauname NaN;
!true             //kai isNaN paklausia ar NaN yra NaN, grazina atsakyma true
true                //sauktukas !true yra false. Klaidos nerandame.*/








