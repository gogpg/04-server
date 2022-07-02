
/*import http from 'http'; ///modulis, kuri importuojame.
import { utils } from './utils.js';
import config from '../config.js';
import { file } from './file.js';
import { router } from './router.js';





const server = {}; //serverio objektas, kuri kuriame.

server.httpServer = http.createServer(async (req, res) => {  //funkcija, kuri perima internetini srauta ir iskviecia musu paciu pasirinkta serverio veikimo logika.
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`; //randame savo domena (domain)
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method;
    const parsedPathName = parsedURL.pathname;//viskas kas yra uz domeno (domain), uz / - pasvirojo bruksnelio, slash.
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex// arba replaceAll('/', '') //panaikiname pasviruosius bruksnelius, slashus is priekio ir galo.

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt']; //tekstiniai failai
    const binaryFileExtensions = ['jpg', 'png', 'ico'];                    //binariniai, sudetiniai failai.
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.indexOf('api/') === 0;
    const isPage = !isTextFile && !isBinaryFile && !isAPI;


    const MIMES = {     //failu tipai
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'application/vnd.ms-fontobject',
        webmanifest: 'application/manifest+json',
        pdf: 'application/pdf',
        json: 'application/json',
    };

    const defaultCachePeriod = 60 * 60;// visiems kitiems failams, kuriems nera specialiai nustatyta.
    const maxAge = config.cache.periods[fileExtension] ?? config.cache.default //perpanaudoja failus nurodyta laika. Nesiuncia ju is naujo. Po || ima default reiksme, is config.js failiuko.
 
    let responseContent = "";

    ///info apie vartotoja. Duomenys kitoms funkcijoms.
    const dataForHandlers = {
        baseURL,
        trimmedPath,
        httpMethod,
        user: {
            isLoggedIn: false,     ///defaultu sakome, kad neprisijunges vartotjas.
            email: '',
            browser: '',
        },

    }

    if (isTextFile) {
        responseContent = await file.readPublic(trimmedPath);
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] || MIMES.html,
                'Cache-Control': `max-age=${maxAge}`,
            })
        }
    }

    if (isBinaryFile) {
        responseContent = await file.readPublicBinary(trimmedPath);
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] || MIMES.html,
                'Cache-Control': `max-age=${maxAge}`,
            })
        }
    }

    if (isAPI) {
        res.writeHead(503, {
            'Content-Type': MIMES.json,
        })
        responseContent = JSON.stringify('STAI TAU API ATSAKYMAS...');
    }

   

    if (isPage) {
        res.writeHead(200, {
            'Content-Type': MIMES.html,
        })
        const pageClass = router.getRoute(dataForHandlers);  //issiaiskinam kokios klases reikia
        const pageObj = new pageClass(dataForHandlers);    //ta klse duoda objekta
        responseContent = pageObj.render();                //objektas generuoja rezultata.

    }

    return res.end(responseContent);
});

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };*/

    /*
    Tekstiniai failai:
        - css
        - js
        - svg
    Binary failai:
        - jpg, png, gif, ico (nuotraukos)
        - woff, eot, ttf (sriftai)
        - audio, video
    API (formos, upload file, t.t.)
    HTML turinys (puslapis)
    */

     // trimmedPath
    // jeigu '' -> pageHome()
    //jeigu 'register' -> pageRegister()
    // leigu'login' -> pageLogin()
    // jeigu ........(nesvarbu kas, visa kita, kas neisvardinta virsuj) ->page404()

import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';
import { router } from './router.js';
import config from '../config.js';
import { StringDecoder } from 'string_decoder';

import APIaccount from '../api/account.js';    ///serveris zino, kad yra funkcijos API, APIaccount  yra paciu sugalvotas pavadinimas.

const server = {};

server.httpServer = http.createServer((req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method.toLowerCase();
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex arba galima naudoti replaceAll

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt'];
    const binaryFileExtensions = ['jpg', 'png', 'ico'];
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.indexOf('api/') === 0;
    const isPage = !isTextFile && !isBinaryFile && !isAPI;

    const maxAge = config.cache.periods[fileExtension] ?? config.cache.default;
    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'application/vnd.ms-fontobject',
        webmanifest: 'application/manifest+json',
        pdf: 'application/pdf',
        json: 'application/json',
    };

    const decoder = new StringDecoder('utf8');  //decodavimo irankis, siunciamu duomenu.
    let buffer = '';                            //buferis-duomenu talpykla, ispradziu tuscias stringas. jaison, kai ateina, jis buna sting tipo, turinys uzsifruotas stringe. Kai buferis prisikaupia, bandome isparsinti normalu javascriptini objekta.
    req.on('data', (data) => {        //per sia dali suzinome, ka mums siuncia
        buffer += decoder.write(data);  //buffer-duomenu talpykloje kaupiame turini, kuris ateina.
    })

    req.on('end', async () => {
        buffer += decoder.end();  ///kaupiamas stringas sustabdomas.
        const [parsedErr, parsedContent] = utils.parseJSONtoObject(buffer); //paduodamas turinys, gali buti arba klaida arba isparsintas turinys.

        let responseContent = '';

        const dataForHandlers = {    ///duomenu ateinanciu i serveri formatas?
            baseURL,
            trimmedPath,
            httpMethod,
            payload: parsedErr ? {} : parsedContent,  //jeigu klaida, tai atejes turinys bus tuscias objektas, jei nera klaidos, tai isparsintas turinys.
            user: {
                isLoggedIn: false,
                email: '',
                browser: '',
            }
        }

        if (isTextFile) {
            responseContent = await file.readPublic(trimmedPath);
            if (responseContent === false) {
                res.writeHead(404);
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension] || MIMES.html,
                    'Cache-Control': `max-age=${maxAge}`,
                })
            }
        }

        if (isBinaryFile) {
            responseContent = await file.readPublicBinary(trimmedPath);
            if (responseContent === false) {
                res.writeHead(404);
            } else {
                res.writeHead(200, {
                    'Content-Type': MIMES[fileExtension] || MIMES.html,
                    'Cache-Control': `max-age=${maxAge}`,
                })
            }
        }

        if (isAPI) {
            const APIroute = trimmedPath.split('/')[1]; ///gauname masyva is dvieju daliu [appi, ir dar viena dalis(account pvz)] , imame antra masyvo dali, nes pirma yra tiesiog zodis api.
            if (server.API[APIroute] && server.API[APIroute][APIroute]) {
                const APIhandler = server.API[APIroute][APIroute];

                APIhandler(dataForHandlers, res);
            } else {

            }
            return
        }

        if (isPage) {
            res.writeHead(200, {
                'Content-Type': MIMES.html,
            })

            const pageClass = router.getRoute(dataForHandlers);
            const pageObj = new pageClass(dataForHandlers);
            responseContent = pageObj.render();
        }

        return res.end(responseContent);
    })
});

server.API = {                  ///Api funkcijos.
    'account': APIaccount,
}

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };




