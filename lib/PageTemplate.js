class PageTemplate {          ///bazinis veikimas, sablonas.
    constructor(data) {
        this.data = data;
        this.title = 'Server';
        this.content = '<h1>Template page 🎅</h1>';
        this.isLoggedIn = false;

    }

    headHTML() {
        return `  <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${this.title}</title>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
                <link rel="manifest" href="/favicon/site.webmanifest">
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
                <meta name="msapplication-TileColor" content="#da532c">
                <meta name="theme-color" content="#ffffff">
                <link rel="stylesheet" href="/css/pages/home.css">`  //sitas css bus uzkraunamas pagal nutylejima.
    }

    headerHTML() {
        let accountMenuHTML = ` <a href = "/register">Register</a>  
                                <a href = "/login">Login</a>`;
                     if (this.data.user.isLoggedIn) {
                        accountMenuHTML = `<a href = "/account">Account</a>
                                          <a href = "/logout">Logout</a>`
                     }

        return ` <header class = "container">
                    <div class = "row main-header">
                        <img src = "#" alt = "Logo">
                        <nav>
                            <a href = "/">Home</a>
                            <a href = "/404">404</a>
                            ${accountMenuHTML}
                            
                        </nav>
                    </div>
                 </header>`
    }

    mainHTML() {
        return `<div class = "row">
                    Main Content
                </div>`
    }

    footerHTML() {
        const initialYear = 2022; //kada projektas buvo sukurtas
        const currentYear = (new Date()).getFullYear();  //dabartiniai metai.
        const formatedYear = initialYear === currentYear ? currentYear : initialYear + '-' + currentYear;
        return `<footer class = "container">
                <div class = "row main-footer">
                  &copy; ${formatedYear}&nbsp;-&nbsp; <a href="https://github.com/front-end-by-rimantas" target= "_blank"> Rimantas </a>
                </div>
                </footer>`
    }

    render() {   //atvaizdavimo klase, jos esme yra surankioti atskiras dalis ir paprasyti, kad kiekviena karta jas atskirai sugeneruotu.
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                   ${this.headHTML()}
                </head>
                <body>
                   ${this.headerHTML()}
                   <main class = "container">
                      ${this.mainHTML()}
                   </main>
                   ${this.footerHTML()}
         
                </body>
            </html>`;
    }
}

export { PageTemplate }