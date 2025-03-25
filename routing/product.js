// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const { STATUS_CODE} = require('../constants/statusCode')
// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.

const fs = require("fs");
const path = require("path");

const productFile = path.join(__dirname, "product.txt");

const productRouting = (request, response) => {
    const { url, method } = request
    if (url === "/product/add" && method === "GET") {
        response.writeHead(200, { "Content-Type": "text/html" });
        return response.end(`
            <html>
                <head><title>Shop - Add product</title></head>
                <body>
                    <h1>Add product</h1>
                    <form action="/product/add" method="POST">
                        <label>Name: <input type="text" name="name"></label><br>
                        <label>Description: <input type="text" name="description"></label><br>
                        <button type="submit">Add</button>
                    </form>
                    <nav>
                        <a href="/">Home</a> |
                        <a href="/product/new">Newest product</a> |
                        <a href="/logout">Logout</a>
                    </nav>
                </body>
            </html>
        `);
    }

    if (url === "/product/add" && method === "POST") {
        let body = "";
        request.on("data", chunk => (body += chunk));
        request.on("end", () => {
            const params = new URLSearchParams(body);
            const name = params.get("name") || "Unknown";
            const description = params.get("description") || "No description";

            fs.writeFileSync(productFile, `${name} - ${description}`);

            response.writeHead(302, { Location: "/product/new" });
            response.end();
        });
        return;
    }

    if (url === "/product/new") {
        response.writeHead(200, { "Content-Type": "text/html" });

        if (!fs.existsSync(productFile)) {
            return response.end("<html><body><h1>No new products</h1></body></html>");
        }

        const productData = fs.readFileSync(productFile, "utf-8");

        return response.end(`
            <html>
                <head><title>Shop - Newest product</title></head>
                <body>
                    <h1>Newest product</h1>
                    <p>${productData}</p>
                    <nav>
                        <a href="/">Home</a> |
                        <a href="/product/add">Add product</a> |
                        <a href="/logout">Logout</a>
                    </nav>
                </body>
            </html>
        `);
    }

    console.warn(`ERROR: requested URL ${url} doesn’t exist`);
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end("<html><body><h1>404 - Not Found</h1></body></html>");
};

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.

// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = { productRouting };