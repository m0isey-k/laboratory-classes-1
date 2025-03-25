// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
const logoutRouting = (method, response) => {
    if (method !== "GET") {
        response.writeHead(405, { "Content-Type": "text/html" });
        return response.end("<html><body><h1>405 - Method Not Allowed</h1></body></html>");
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(`
        <html>
            <head><title>Shop - Logout</title></head>
            <body>
                <h1>Logout</h1>
                <nav>
                    <a href="/">Home</a> |
                    <a href="/kill">Logout from application</a>
                </nav>
            </body>
        </html>
    `);
};

// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
module.exports = { logoutRouting };