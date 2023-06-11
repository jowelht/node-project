const handler = {};
handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: "Your request URL is not Found",
    });
};
module.exports = handler;
