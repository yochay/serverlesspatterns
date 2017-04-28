'use strict';

const ChainQMsg = require('../ChainQMsg').ChainQMsg;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.number && req.query.errorratio ) {

        const inputNumber = parseInt(req.query.number, 10);
        const inputErrorRatio = parseInt(req.query.errorratio, 10);
        
        if (inputNumber != NaN && inputErrorRatio != NaN) {
            const msg = ChainQMsg.newChainQMsg(inputNumber, inputErrorRatio);
            
            // write to Azure Q to be picked up by next function
            context.bindings.outputQueueItem = msg;

            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Hello " + inputNumber
            };
        }
        else {
            context.res = {
                status: 422,
                body: "Please pass a number value and errorratio on the query string or in the request body"
            };

        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass  a number value and errorratio on the query string or in the request body"
        };
    }
    context.done();
};