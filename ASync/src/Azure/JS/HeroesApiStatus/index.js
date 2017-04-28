'use strict';


const ASyncMngClass = require('../ASyncMng').ASyncMngClass;

//GET
module.exports = function (context, req) {
    context.log('JavaScript API GET trigger function processed a request.');

    const id = context.bindingData.id;
    let apiCallList = null;

    if (id === null) {
        apiCallList = ASyncMngClass.getAsyncMng().getApiList();
        context.res = {
            status: 200, 
            body: apiCallList
        };
    }
    else {
        apiCallList = ASyncMngClass.getAsyncMng().getApiCall(id);
        if (apiCallList) {
            context.res = {
                status: 200, 
                body: apiCallList
            };
        }
        else {
            context.res = {
                status: 404,
                body: {"error" : "cant find call with id=",id}
            };
        }
    }



    context.done();
};