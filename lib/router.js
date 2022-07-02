import { PageHome } from '../pages/Home.js';
import { Page404 } from '../pages/404.js';
import { PageRegister } from '../pages/Register.js';
import { PageLogin } from '../pages/Login.js';
import { PageAccount } from '../pages/Account.js';
import { PageLogout } from '../pages/Logout.js';

///serverio puslapiai.

const router = {};

router.commonRoutes = {     //jei galune nuorodos nera suvesta, papildomu duomenu nera, rodomas home puslapis.
    '': PageHome,          //visas sitas objektas naudojamas, rodomas, nepriklausomai nuo to, ar vartotojas yra prisijunges, ar ne. Bendriniai dalykai.
    '404': Page404,

}

router.publicRoutes = {    ///objektas, kuriame yra sumapinta, susieta key value poros, kur key, kartu yra reiksme, ka suvede vartotojas, esmine dalis, ne visas kelias, o trimmed path, kelias uz domeno. key-kelias, value, ta kelia aptarnaujancios funkcijos.
    //objektas rodomas, kol vartotojas nera prisijunges.
    ...router.commonRoutes,      //naudojama taip pat ir viskas is commonRoutes objekto.Spred operatorius.
    'register': PageRegister,
    'login': PageLogin,

}

router.privateRoutes = {    ///objektas, kuriame yra sumapinta, susieta key value poros, kur key, kartu yra reiksme, ka suvede vartotojas, esmine dalis, ne visas kelias, o trimmed path, kelias uz domeno. key-kelias, value, ta kelia aptarnaujancios funkcijos.
    //visas sis objektas naudojamas, kai vartotojas yra prisijunges.
    ...router.commonRoutes,      //naudojama taip pat ir viskas is commonRoutes objekto. Spred operatorius.
    'account': PageAccount,
    'logout': PageLogout,
}

router.getRoute = (data) => {
    let pageClass = router.commonRoutes[404];   //jei nera nieko geresnio, tada bent 404.
    const routes = data.user.isLoggedIn ? router.privateRoutes : router.publicRoutes;
    if (data.trimmedPath in routes) {
        pageClass = routes[data.trimmedPath];
    }
    return pageClass;
}

export { router };


