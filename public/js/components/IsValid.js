///Metodai, kurie gali patikrinti ar suvesti duomenys yra tinkami

class IsValid {
    static fullname(str) {
        if (str === undefined) {
            return [true, 'Neduotas parametras'];
        }
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
        }

        str = str.trim().replace(/\s+/g, ' ');
        // str = str.trim().replaceAll('  ', ' '); // galimas ir sitas variantas

        const minWordsCount = 2;
        const minWordLength = 2;
        const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);
        if (str.length < minTextLength) {
            return [true, `Per trumpas tekstas, turi buti minimum ${minTextLength} simboliai`];
        }

        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const words = str.split(' ');
        if (words.length < minWordsCount) {
            return [true, `Tekstas turi tureti ${minWordsCount} arba daugiau zodziu`];
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

    static email(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas email tekstas'];
        }

        return [false, 'OK'];
    }

    static password(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas password tekstas'];
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