const ChainQMsg = require('../ChainQMsg').ChainQMsg;

//
function doWork(funcRes) {
    const res = funcRes.input * 2;

    return res;
}

//
function undoWork(input) {
    const res = input / 2;

    return res;
}


module.exports = function (context, myQueueItem) {
    context.log('JavaScript Func 3 received --> Q Item = ', myQueueItem);
    if (myQueueItem && myQueueItem.undo === false) {

        try {

            const randVal = Math.random() * 100;
            if (randVal > (100 - myQueueItem.funcRes.errorratio)) {
                throw  {
                    "error" : "Bad luck on Function 3 randVal=" + randVal + " error ratio= " +myQueueItem.funcRes.errorratio,
                    "chainMsg" : myQueueItem
                };
            }
            const work = doWork(myQueueItem.funcRes);
            const updatedMsg = ChainQMsg.updateChainQMsg(myQueueItem, work, "Func3");

            //work for Func3 is complete
            context.log('JavaScript Func 3 completed ', workDone);
        }
        catch (e) {
            // log error
            // consider undoing anything in this function (if needed)

            myQueueItem.undo = true;
            // write to Azure Q to undo prev function 
            context.bindings.errorQueueItem = myQueueItem;
        }

        //do something to complete the chain... 
    }
    context.done();
};