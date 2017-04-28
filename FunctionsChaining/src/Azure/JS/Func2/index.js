'use strict';

//
function doWork(msg) {
    
    msg["func2"] = "new string from Function 2";

    return msg;
}


module.exports = function (context, myQueueItem) {
     context.log('JavaScript Func 2 received --> Q Item = ', myQueueItem);

    if (myQueueItem) {

        const workDone = doWork(myQueueItem);

        // write to Azure Q to be picked up by next function
        context.bindings.outputQueueItem = workDone;
    }
    else{
        // log error
        // handle error
    }

    context.done();
};