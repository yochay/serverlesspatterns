'use strict';


// Generate a v4 UUID (random) 
const uuidV4 = require('uuid/v4');


let singleton = null;

class ChainQMsg {
    constructor() {
        this.objs = {}
    }

    static newChainQMsg(triggerInputValue, triggerInputErrorRatio) {
        return {
            "history": [],
            "funcRes": {
                "input": triggerInputValue || 42,
                "errorratio": triggerInputErrorRatio || 100
            },
            "undo": false,
            "correlationId" : uuidV4()
        };
    }

    static updateChainQMsg(msg, doneWork, funcName) {
        if (!msg) {
            //TODO handle error! 
        }
        //else

        msg.history.push(
            {
                "from": funcName,
                "input": {
                    "input":  msg.funcRes.input,
                    "errorratio":  msg.funcRes.errorratio
                }
            }
        );

        msg.funcRes.input = doneWork;

        return msg;
    }


    static getChainQMsg() {
        if (singleton === null) {
            singleton = new ChainQMsg();
        }
        return singleton;
    }
}


module.exports = {
    ChainQMsg
}