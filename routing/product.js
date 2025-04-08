// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fs = require('fs');
const STATUS_CODE = require('../constants/statusCode');
// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.
const productRouting = (req, res) => {
    if (req.url === '/product/add' && req.method === 'GET') {
        renderAddProductPage(res);
    } else if (req.url === '/product/add' && req.method === 'POST') {
        addNewProduct(req, res);
    } else if (req.url === '/product/new') {
        renderNewProductPage(res);
    } else {
        res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>404 - Not Found</h1></body></html>');
    }
};
// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
function renderAddProductPage(res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <head><title>Shop – Add product</title></head>
            <body>
                <h1>Add product</h1>
                <form method="POST" action="/product/add">
                    <label>Name: <input type="text" name="name"></label>
                    <label>Description: <input type="text" name="description"></label>
                    <button type="submit">Add</button>
                </form>
            </body>
        </html>
    `);
}
// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);
function renderNewProductPage(res) {
    fs.readFile('product.txt', 'utf-8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head><title>Shop – Newest product</title></head>
                <body>
                    <h1>Newest product</h1>
                    <p>${data || 'No new products available'}</p>
                </body>
            </html>
        `);
    });
}
// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");
function addNewProduct(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        const decodedBody = decodeURIComponent(body);
        fs.writeFile('product.txt', decodedBody, () => {
            res.writeHead(STATUS_CODE.FOUND, { 'Location': '/product/new' });
            res.end();
        });
    });
}
// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = productRouting;