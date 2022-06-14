
import http from 'http'; ///modulis, kuri importuojame.
import { utils } from './utils.js';
import config from '../config.js';
import { file } from './file.js'

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

    const cachePeriod = {
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
    };

    let responseContent = "";

    if (isTextFile) {
        responseContent = await file.readPublic(trimmedPath);
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] || MIMES.html,
                'Cache-Control': `max-age=${cachePeriod[fileExtension] || defaultCachePeriod}`, //perpanaudoja failus nurodyta laika. Nesiuncia ju is naujo.
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
                'Cache-Control': `max-age=${cachePeriod[fileExtension] || defaultCachePeriod}`,
            })
        }
    }

    if (isAPI) {
        res.writeHead(503, {
            'Content-Type': MIMES.json,
        })
        responseContent = 'STAI TAU API ATSAKYMAS...';
    }

    if (isPage) {
        res.writeHead(200, {
            'Content-Type': MIMES.html,
        })
        responseContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Server</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
                <link rel="manifest" href="/favicon/site.webmanifest">
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
                <meta name="msapplication-TileColor" content="#da532c">
                <meta name="theme-color" content="#ffffff">
                <link rel="stylesheet" href="/css/base/base.css">
            </head>
            <body>
                <h1>Labas rytas 🎅</h1>
                <img src="/img/logo.png" alt="Logo">
                <img src="https://raw.githubusercontent.com/front-end-by-rimantas/39-grupe-ufo/master/ufo.png" alt="UFO">
                <script src="/js/pages/home.js" defer></script>
            </body>
            </html>`;
    }

    return res.end(responseContent);
});


server.init = () => {
    server.httpServer.listen(config.httpPort, () => {
        console.log(`Sveikiname, tavo serveris sukasi ant http://localhost:${config.httpPort}`);
    });
}

export { server };



