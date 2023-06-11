const handler = {};
handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties.trimmedPath);
    callback(200, {
        message: "this is sample page url",
    });
};
module.exports = handler;
