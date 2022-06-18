
import http from 'http'; ///modulis, kuri importuojame.
import { utils } from './utils.js';
import config from '../config.js';
import { file } from './file.js';

import { PageHome } from '../pages/Home.js';
import { Page404 } from '../pages/404.js';
import { PageRegister } from '../pages/Register.js';
import { PageLogin } from '../pages/Login.js';




const server = {}; //serverio objektas, kuri kuriame.

server.httpServer = http.createServer(async (req, res) => {  //funkcija, kuri perima internetini srauta ir iskviecia musu paciu pasirinkta serverio veikimo logika.
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`; //randame savo domena (domain)
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method;
    const parsedPathName = parsedURL.pathname;//viskas kas yra uz domeno (domain), uz / - pasvirojo bruksnelio, slash.
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex// arba replaceAll('/', '') //panaikiname pasviruosius bruksnelius, slashus is priekio ir galo.
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
   /* const cachePeriod = {
        //html: 'text/html',html negakima uzdeti
        css: 60 * 60,
        js: 60 * 60,
        svg: 60 * 60,
        png: 60 * 60,
        jpg: 60 * 60,
        ico: 60 * 60,
        woff2: 60 * 60,
        woff: 60 * 60,
        ttf: 60 * 60,
        otf: 60 * 60,
        eot: 60 * 60,
        webmanifest60: 60 * 60 ,
        pdf: 60 * 60,
        json: 60 * 60,
    };*/                // iskelem i config.js

    let responseContent = "";

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
        responseContent = 'STAI TAU API ATSAKYMAS...';
    }

    // trimmedPath
    // jeigu '' -> pageHome()
    //jeigu 'register' -> pageRegister()
    // leigu'login' -> pageLogin()
    // jeigu ........(nesvarbu kas, visa kita, kas neisvardinta virsuj) ->page404()

    if (isPage) {
        res.writeHead(200, {
            'Content-Type': MIMES.html,
        })
      
        let pageClass = server.routes[404];   //jei nera nieko geresnio, tada bent 404.
        if (trimmedPath in server.routes) {
            pageClass = server.routes[trimmedPath];
        }
        const pageObj = new pageClass();
        responseContent = pageObj.render();
    
    }

    return res.end(responseContent);
});

server.routes = {    ///objektas, kuriame yra sumapinta, susieta key value poros, kur key, kartu yra reiksme, ka suvede vartotojas, esmine dalis, ne visas kelias, o trimmed path, kelias uz domeno. key-kelias, value, ta kelia aptarnaujancios funkcijos.
    '': PageHome,
    '404': Page404,
    'register': PageRegister,
   'login': PageLogin,
}

server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };



