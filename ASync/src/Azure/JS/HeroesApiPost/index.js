'use strict';

const HeroesClass = require('../heroes').HeroesClass;
const ASyncMngClass = require('../ASyncMng').ASyncMngClass;

//POST
//TODO update a reutn URI to correct path
module.exports = function (context, req) {
    context.log('Heroes API POST  trigger function processed a request.');

    const body = req.body;
    let returnedHeros = null;

    //validate
    if (req.body.name && req.body.superPower) {

        //get ASync context --> AsyncID
        const ApiCallId = ASyncMngClass.getAsyncMng().newApiCall();

        const qMsg = {
            "apiId": ApiCallId,
            "method": req.method,
            "body": req.body
        }
        //push msg to q
        context.bindings.outputQueueItem = qMsg;

        context.res = {
            status: 202,
            body: { "msg": "Create hero request accepted", "uri": ApiCallId },
            headers: {
                'location': ApiCallId
            }
        };

        /*
                returnedHeros = HeroesClass.getHeroesClass().addHero(req.body.name, req.body.superPower);
        
                if (returnedHeros) {
                    context.log('added a new hero ', JSON.stringify(returnedHeros));
        
                    context.res = {
                        status: 200,
                        body: { "msg": "successfully added a new super hero", "hero": returnedHeros, "uri": "/UID" }
                    };
                }*/
        // else handle failure at data store 
    }
    else {
        context.res = {
            status: 422,
            body: { "error": "To add a new supper hero, pass name and superpower" }
        };

    }

    context.done();
};