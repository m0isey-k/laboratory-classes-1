// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
const homeRouting = require('./home');
const productRouting = require('./product');
const logoutRouting = require('./logout');
// 📦 Zaimportuj obiekt STATUS_CODE.
const STATUS_CODE = require('../constants/statusCode');

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
    const requestRouting = (req, res) => {
// 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
console.log(`INFO [${new Date().toISOString()}]: ${req.method} - ${req.url}`);
// 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.
if (req.url === '/' && req.method === 'GET') {
    homeRouting(req.method, res);
} else if (req.url.startsWith('/product')) {
    productRouting(req, res);
} else if (req.url === '/logout') {
    logoutRouting(req.method, res);
} 
// 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.
else if (req.url === '/kill') {
    console.log(`PROCESS [${new Date().toISOString()}]: logout initiated and the application will be closed.`);
    process.exit(); // Aplikacja się zamknie
} 
// 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
//  };
else {
    res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
    res.end('<html><body><h1>404 - Not Found</h1></body></html>');
    console.error(`ERROR [${new Date().toISOString()}]: requested url ${req.url} doesn’t exist.`);
}
};
// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = requestRouting;