'use strict';

//const heroes = require('../heroes');
const HeroesClass = require('../heroes').HeroesClass;
const ASyncMngClass = require('../ASyncMng'). ASyncMngClass;

//Delete
module.exports = function (context, req) {
    context.log('JavaScript API DELETE trigger function processed a request.');

    const body = req.body;
    let returnedHeros = null;

    //validate
    if (req.body.id) {

        //get ASync context --> AsyncID
        const ApiCallId = ASyncMngClass.getAsyncMng().newApiCall();

        // TODO: get method from request obj
        const qMsg = {
            "apiId": ApiCallId,
            "method": req.method,
            "body": req.body
        }
        //push msg to q for async processing 
        context.bindings.outputQueueItem = qMsg;

        // return location for 202 pattern
        context.res = {
            status: 202,
            body: { "msg": "delete hero request captured", "uri": ApiCallId },
            headers: {
                'location': ApiCallId
            }            
        };
       

        /*
        returnedHeros = HeroesClass.getHeroesClass().removeHero(req.body.id);
        if (returnedHeros) {
            context.log('deleted hero ', req.body.id);

            context.res = {
                status: 200,
                body: { "msg": "successfully deleted hero", "id": req.body.id }
            };
        }*/
        // else handle failure at data store 
    }
    else {
        context.res = {
            status: 422,
            body: { "error": "To delete a hero, pass id" }
        };

    }

    context.done();
};