const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

// App object - module scaffolding
const app = {};

// Configuration
app.config = {
    port: 3000,
};

// Create Server

app.createServer = () => {
    const server = http.createServer(app.handlerReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listing to port ${app.config.port}`);
    });
};
// Handler Request and Response
app.handlerReqRes = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;

    const decoder = new StringDecoder("utf-8");
    let realData = "";

    req.on("data", (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on("end", () => {
        realData += decoder.end();

        console.log(realData);
        // Response Handle
        res.end("Hello Programmer");
    });
};
app.createServer();
