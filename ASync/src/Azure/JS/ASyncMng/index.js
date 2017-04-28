'use strict';

// Generate a v4 UUID (random) 
const uuidV4 = require('uuid/v4');


let ASyncMngClassSingletonRef = null;
let ASyncMngClassSingletonFlag = false;

// per async API create the following entry <id, runningState, runResult>
// running state: Running; Completed (which mean success); Failed
// run result: object returned from the API run
// TODO: add time to API data struct - created (to help with timeout in the future)
class ASyncMng {
    constructor() {
        if (ASyncMngClassSingletonFlag & !ASyncMngClassSingletonRef) {
            this.ASyncApiCallList = {};

            this.ASyncApiCallList["1"] = { "runningState": "Running", "runResult": "" };
            this.ASyncApiCallList["2"] = { "runningState": "Completed", "runResult": "some object here... " };
        }
    }

    static getAsyncMng() {
        if (ASyncMngClassSingletonFlag === false) {
            ASyncMngClassSingletonFlag = true;
            if (ASyncMngClassSingletonRef === null) {
                ASyncMngClassSingletonRef = new ASyncMng();
            }
        }
        return ASyncMngClassSingletonRef;
    }

    // get all API list 
    // TODO: need to support paging
    getApiList() {
        return this.ASyncApiCallList;
    }

    // get single API call
    getApiCall(ApiCallId) {
        return this.ASyncApiCallList[ApiCallId];
    }

    // create a new API call entry in the APICallList with default state
    newApiCall() {
        const ApiCallId = uuidV4();
        this.ASyncApiCallList[ApiCallId] = { "runningState": "Running", "runResult": "" };

        return ApiCallId;
    }


    // update API status
    updateApiCall(ApiCallId, newRunningState, newRunResult) {
        if (this.ASyncApiCallList[ApiCallId]) {
            this.ASyncApiCallList[ApiCallId].runningState = newRunningState;
            this.ASyncApiCallList[ApiCallId].runResult = newRunResult;

            return this.ASyncApiCallList[ApiCallId];
        }
        else {
            return false;
        }
    }

    // should not be used other than for demo purposes 
    ClearApiList() {
        this.ASyncApiCallList = {};
    }

    // should not be used other than for demo purposes 
    SeedApiList() {
            this.ASyncApiCallList["1"] = { "RunningState": "Running", "runResult": "" };
            this.ASyncApiCallList["2"] = { "RunningState": "Completed", "runResult": "some object here... " };
    }

}

module.exports = {
    ASyncMngClass: ASyncMng
}