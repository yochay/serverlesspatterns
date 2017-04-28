'use strict';

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.input || (req.input && req.body.input)) {

        const msg = {
            "input": req.query.input || ""
        };

        // write to Azure Q to be picked up by next function
        context.bindings.outputQueueItem = msg;
        //outputQueueItem = msg;

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "received " +msg.input + " sending down the pipe --> " + JSON.stringify(msg)
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass input on the query string"
        };
    }
    context.done();
};