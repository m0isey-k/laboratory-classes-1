// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
const { homeRouting } = require('./home');
const { productRouting } = require('./product');
const { logoutRouting } = require('./logout');
// 📦 Zaimportuj obiekt STATUS_CODE.
const { STATUS_CODE} = require('../constants/statusCode')

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
    const requestRouting = (request, response) => {
        const { url, method } = request;
        console.log(`INFO (${new Date().toUTCString()}): ${method} - ${url}`);
    
        if (url === "/") {
            return homeRouting(method, response);
        } else if (url.startsWith("/product")) {
            return productRouting(request, response);
        } else if (url === "/logout") {
            return logoutRouting(method, response);
        } else if (url === "/kill") {
            console.log(`PROCESS (${new Date().toUTCString()}): Application will be closed`);
            process.exit();
        }
    
        console.warn(`ERROR (${new Date().toUTCString()}): requested url ${url} doesn’t exist`);
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end("<html><body><h1>404 - Not Found</h1></body></html>");
    };
    
    

// 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
// 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.

// 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.

// 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
//  };

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = { requestRouting };