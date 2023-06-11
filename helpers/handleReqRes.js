const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
    notFoundHandler,
} = require("../handlers/routesHandlers/notFoundHandler");

const handler = {};

handler.handleReqRes = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headerObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headerObject,
    };

    const decoder = new StringDecoder("utf-8");
    let realData = "";

    const chosenHandler = routes[trimmedPath]
        ? routes[trimmedPath]
        : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof statusCode === "number" ? statusCode : 500;
        payload = typeof payload === "object" ? payload : {};
        const payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString);
    });

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

module.exports = handler;
