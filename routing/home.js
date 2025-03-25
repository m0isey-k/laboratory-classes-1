// 🏗 Stwórz funkcję 'homeRouting', która obsłuży stronę główną.
const homeRouting = (method, response) => {
    // 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
    // Podpowiedź: response.setHeader("Content-Type", "text/html");
    response.writeHead(200, { 'Content-Type': 'text/html' });
    // 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
    // Podpowiedź: return response.end();
    response.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Shop - Home</title>
        </head>
        <body>
            <h1>Home</h1>
            <nav>
                <a href="/product/add">Add product</a> |
                <a href="/product/new">Newest product</a> |
                <a href="/logout">Logout</a>
            </nav>
        </body>
        </html>
    `);
};




// 🔧 Wyeksportuj funkcję 'homeRouting', aby inne moduł mogły jej używać.
module.exports = { homeRouting };