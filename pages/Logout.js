import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogout extends PageTemplate {
    constructor(data) {
        super(data);
    }

    mainHTML() {
        const cookies = [
            'login-token=' + this.data.cookies['login-token'],
            'path=/',
            'domain=localhost',
            'max-age=-1000',
            'expires=Sun, 16 Jul 3567 06:23:41 GMT',
            // 'Secure',
            'SameSite=Lax',
            'HttpOnly',
        ];
        this.responseHeaders = {
            'Set-Cookie': cookies.join('; '),
        }

        return `<div class="row">
                    <h1>Logout page 🎅</h1>
                </div>
                <script>location.href='/';</script>`;
    }
}

export { PageLogout };