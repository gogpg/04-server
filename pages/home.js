import { PageTemplate } from "../lib/PageTemplate.js";


class PageHome extends PageTemplate {
    constructor(data) {
        super(data);
        
    }

    mainHTML() {
        return `<div class = "row">
                    <h1>Home page 🎅</h1>
                 </div>`
    }
}

export { PageHome };