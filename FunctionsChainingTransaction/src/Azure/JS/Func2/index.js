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
    context.log('JavaScript Func 2 received --> Q Item = ', myQueueItem);

    if (myQueueItem && myQueueItem.undo === false) {

        try {
            const work = doWork(myQueueItem.funcRes);
            const updatedMsg = ChainQMsg.updateChainQMsg(myQueueItem, work, "Func2");

            // write to Azure Q to be picked up by next function
            context.bindings.outputQueueItem = updatedMsg;
        }
        catch (e) {
            // log error
            // consider undoing anything in this function (if needed)

            myQueueItem.undo = true;
            // write to Azure Q to undo prev function 
            context.bindings.errorQueueItem = myQueueItem;
        }
    }
    else if (myQueueItem && myQueueItem.undo === true) {
        const lastFunc = myQueueItem.history[myQueueItem.history.length - 1];

        if (lastFunc.from === "Func2") {
            const undoRes = undoWork(myQueueItem.funcRes);
            if (undoRes === lastFunc.input.input) {
                context.log('Func2 undo successful! undoRes =  ' + undoRes);

                //clear current func history after undo
                myQueueItem.history.pop();
                myQueueItem.funcRes = lastFunc.input;
                // write to Azure Q to undo prev function 
                context.bindings.errorQueueItem = myQueueItem;
            }

        }
    }


    context.done();
};