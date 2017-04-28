'use strict';

//const heroes = require('../heroes');
const HeroesClass = require('../heroes').HeroesClass;
const ASyncMngClass = require('../ASyncMng'). ASyncMngClass;

//PUT
module.exports = function (context, req) {
    context.log('JavaScript API PUT trigger function processed a request.');

    const body = req.body;
    let returnedHeros = null;

    //validate
    if (req.body.id && req.body.name && req.body.superPower) {

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
            body: { "msg": "Update hero request accepted", "uri": ApiCallId },
            headers: {
                'location': ApiCallId
            }
            
        };
       
        /*
                returnedHeros = HeroesClass.getHeroesClass().updateHero(req.body.id, req.body.name, req.body.superPower);
                if (returnedHeros) {
                    context.log('Updated a new hero ', JSON.stringify(returnedHeros));
        
                    context.res = {
                        status: 200,
                        body: { "msg": "successfully updated hero", "hero": returnedHeros }
                    };
                }*/
        // else handle failure at data store 
    }
    else {
        context.res = {
            status: 422,
            body: { "error": "To update a new supper hero, pass existing super hero id, new name and superpower" }
        };

    }

    context.done();
};