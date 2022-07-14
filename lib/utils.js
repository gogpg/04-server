////bendrinio pobudzio darbines funkcijos, kuriu mums gali prireikti. Pagalbines funkcijos, kurioms nesvarbus kontekstas, kur jos dirba, svarbu dirba.
import crypto from 'crypto';
import config from '../config.js';

const utils = {};

utils.hash = (str) => {
    if (typeof str === 'string' && str !== '') {
        const hashedStr = crypto
            .createHmac('sha512', config.hashingSecret)
            .update(str)
            .digest('hex');
        return [false, hashedStr];
    }
    return [true, 'Uzsifruoti galima tik ne tuscia teksta'];
}

utils.fileExtension = (URL) => {
    // services -> undefined
    // services/design -> undefined
    // css/main.css -> css
    return URL.split('.')[1];
}

utils.parseJSONtoObject = (str) => {
    try {
        return [false, JSON.parse(str)];
    } catch (error) {
        return [true, 'ERROR'];
    }
}

/**
 * Duomenu objekto validatorius, kuris tikrina, ar duomenu objekte yra tik leistini raktazodziai.
 * 
 * Objekte gali buti ir papildomu neprivalomu, bet vis vien leistinu raktazodziu (optional keys)
 * @param {Object} obj Duomenu objektas
 * @param {Object} rules Nustatymu objektas
 * @param {[]?} rules.required Privalomu raktazodziu sarasas
 * @param {[]?} rules.optional Neprivalomu raktazodziu sarasas
 * @returns {[boolean, string]} Rezultatas, kur pirmasis parametras reiskia ar buvo rasta klaida, o antrasis - zinute (aprasanti klaida)
 */
utils.objectValidator = (obj, rules) => {
    if (typeof obj !== 'object'
        || obj === null
        || Array.isArray(obj)) {
        return [true, 'Neduotas objektas'];
    }

    if (typeof rules !== 'object'
        || rules === null
        || Array.isArray(rules)) {
        return [true, 'Neduotas strukturos objektas'];
    }

    if (!('required' in rules)) {
        rules.required = [];
    }
    if (!('optional' in rules)) {
        rules.optional = [];
    }

    const objKeys = Object.keys(obj);
    const { required, optional } = rules;
    const totalRulesKeys = [...required, ...optional];

    for (const reqKey of required) {
        if (!objKeys.includes(reqKey)) {
            return [true, `Truksta privalomo key "${reqKey}"`];
        }
    }

    for (const objKey of objKeys) {
        if (!totalRulesKeys.includes(objKey)) {
            return [true, `Pateiktas netinkamas/perteklinis key "${objKey}"`];
        }
    }

    return [false, 'OK'];
}

utils.detectedBrowser = (userAgent) => {
    if (userAgent.includes('Trident/')) {
        return 'ie';
    }
    if (userAgent.includes('Firefox/')) {
        return 'firefox';
    }
    if (userAgent.includes('Edg/')) {
        return 'edge';
    }
    if (userAgent.includes('Chrome/')) {
        return 'chrome';
    }
    if (userAgent.includes('Safari/')) {
        return 'safari';
    }
    if (userAgent.includes('OPR/')
        || userAgent.includes('Opera/')) {
        return 'opera';
    }
    return 'other';
}

utils.randomString = (size = 20) => {
    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const inter = abc.length;
    let text = '';

    for (let i = 0; i < size; i++) {
        const index = Math.floor(Math.random() * inter);
        text += abc[index];
    }

    return text;
}

utils.parseCookiesFancy = (str) => {
    if (typeof str !== 'string' || str === '') {
        return '';
    }
    return str
        .split(';')
        .map(s => s.trim().split('='))
        .reduce((obj, item) => {
            obj[item[0]] = item[1];
            return obj;
        }, {});
}

utils.parseCookies = (str) => {
    const obj = {};

    if (typeof str === 'string' && str !== '') {
        const cookieParts = str.split(';').map(s => s.trim());
        for (const cookie of cookieParts) {
            const [key, value] = cookie.split('=');
            obj[key] = value;
        }
    }

    return obj;
}

export { utils };

