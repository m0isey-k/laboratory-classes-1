// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
function logoutRouting(method, res) {
    // 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
    // Podpowiedź: response.setHeader("Content-Type", "text/html");
    res.setHeader('Content-Type', 'text/html');
    // 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
    // Podpowiedź: return response.end();
    res.end(`
        <html>
            <head><title>Shop – Logout</title></head>
            <body>
                <h1>Logout</h1>
                <nav>
                    <a href="/">Home</a>
                    <a href="/kill">Logout from application</a>
                </nav>
            </body>
        </html>
    `);
    }
    // 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
    module.exports = logoutRouting;