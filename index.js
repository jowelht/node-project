const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// App object - module scaffolding
const app = {};

// Configuration
app.config = {
    port: 3000,
};

// Create Server

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listing to port ${app.config.port}`);
    });
};
// Handler Request and Response
app.handleReqRes = handleReqRes;
app.createServer();
