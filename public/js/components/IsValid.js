///Metodai, kurie gali patikrinti ar suvesti duomenys yra tinkami

/*class IsValid {
    static fullname(str) {
        if (str.length < 2) {
            return [true, 'Per trumpas fullname tekstas'];  //ar iskilo klaida, iskilo-true
        }

        const parts = str.split(' ');
        if (parts.length < 2) {
            return [true, 'Per mazai fullname zodziu'];  //iskilo klaida, true
        }

        return [false, 'OK'];    //ar iskilo klaida? ne-false.
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

export { IsValid }*/



class IsValid {
    static fullname(str) {
        if (str === undefined) {
            return [true, 'Neduotas parametras'];
        }
        if (typeof str !== 'string') {
            return [true, 'Netinkamas tipas, turi buti "string"'];
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