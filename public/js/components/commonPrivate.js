console.log('paleistas bendrinis prisijungusio vartotojo JS...');

const logoutDOM = document.querySelector('.main-header button');
logoutDOM.addEventListener('click', async () => {
    const response = await fetch('/api/token', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const resBody = await response.json();

    switch (resBody.msgType) {
        case 'redirect':
            location.href = resBody.href;
            break;

        default:
            console.log('Toks msgType nerastas:', resBody.msgType);
            break;
    }
})