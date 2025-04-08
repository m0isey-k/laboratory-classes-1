// 📦 Musisz zaimportować tutaj moduł 'http'.
// 📦 Żeby użyć tutaj PORT, musisz zaimportować go z modułu konfiguracyjnego z pliku 'config.js'.
// 📦 Zaimportuj funkcję 'requestRouting' z modułu 'routing/routing.js'.
const http = require('http');
const { PORT } = require('./config');
const requestRouting = require('./routing/routing'); 
// 🏗 Tutaj, stwórz funkcję 'requestListener, która przekazuje 'request' i 'response' do 'requestRouting'.
function requestListener(req, res) {
    requestRouting(req, res);
}
// 🏗 Tutaj, stwóz serwer Node.js. Pamiętaj przypisać go do stałej i przekazać mu 'requestListener'.
const server = http.createServer(requestListener);
// 🏗 Uruchom serwer na porcie PORT.
// Podpowiedź: server.listen(???);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});