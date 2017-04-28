'use strict';

const ChainQMsg = require('../ChainQMsg').ChainQMsg;

//
function doWork(funcRes) {
    const res = funcRes.input * 2;

    return res;
}

//
function undoWork(funcRes) {
    const res = funcRes.input / 2;

    return res;
}

module.exports = function (context, myQueueItem) {
    context.log('JavaScript Func 1 received --> Q Item = ', myQueueItem);

    if (myQueueItem && myQueueItem.undo === false) {

        const work = doWork(myQueueItem.funcRes);
        const updatedMsg = ChainQMsg.updateChainQMsg(myQueueItem, work, "Func1");

        // write to Azure Q to be picked up by next function
        context.bindings.outputQueueItem = updatedMsg;
    }
    else if (myQueueItem && myQueueItem.undo === true) {
        const lastFunc = myQueueItem.history[myQueueItem.history.length - 1];
        
        if (lastFunc.from === "Func1") {
            const undoRes = undoWork(myQueueItem.funcRes);
            if (undoRes === lastFunc.input.input) {
                context.log('Func1 undo successful! undoRes =  ' +undoRes);
            }

            //clear history
            myQueueItem.history.pop();
        }
    }

    context.done();
};