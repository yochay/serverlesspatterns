'use strict';

//
function doWork(msg) {

    msg["func3"] = "new string from Function 3";

    return msg;
}


module.exports = function (context, myQueueItem) {
    context.log('JavaScript Func 3 received --> Q Item = ', myQueueItem);

    if (myQueueItem) {

        const workDone = doWork(myQueueItem);

        // nothing else to to. Maybe update some datastore about compliting this task

        context.log('JavaScript Func 3 completed ', workDone);
    }
    else {
        // log error
        // handle error
    }
    context.done();
};