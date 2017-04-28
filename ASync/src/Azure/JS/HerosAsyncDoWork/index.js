'use strict';

const HeroesClass = require('../heroes').HeroesClass;
const ASyncMngClass = require('../ASyncMng').ASyncMngClass;


var myVar;   //used for delay callback TODO: change to promise

//fake timeout to show async nature
function fakeDelayDoWork(myQueueItem, context) {
    let returnedHeros = null;

    try {

        if (myQueueItem.method === "POST") {
            returnedHeros = HeroesClass.getHeroesClass().addHero(myQueueItem.body.name, myQueueItem.body.superPower);

            if (returnedHeros) {
                context.log('added a new hero ', JSON.stringify(returnedHeros));

                const temp = ASyncMngClass.getAsyncMng().updateApiCall(myQueueItem.apiId, "Completed", { "msg": "successfully added new hero", "id": returnedHeros });
            }
            else {
                context.log('FAILD to create a hero ', myQueueItem.body);
                const temp = ASyncMngClass.getAsyncMng().updateApiCall(myQueueItem.apiId, "Faild", { "msg": "Faild to add new hero", "id": "" });
                //TODO: handle temp error
            }

        }
        else if (myQueueItem.method === "PUT") {
            returnedHeros = HeroesClass.getHeroesClass().updateHero(myQueueItem.body.id, myQueueItem.body.name, myQueueItem.body.superPower);
            if (returnedHeros) {
                context.log('Updated a new hero ', JSON.stringify(returnedHeros));

                const temp = ASyncMngClass.getAsyncMng().updateApiCall(myQueueItem.apiId, "Completed", { "msg": "successfully update hero", "id": myQueueItem.body.id });
            }
            else {
                context.log('FAILD to update hero ', myQueueItem.body.id);
                const temp = ASyncMngClass.getAsyncMng().updateApiCall(myQueueItem.apiId, "Faild", { "msg": "Faild to update hero", "id": myQueueItem.body.id });
                //TODO: handle temp error
            }
        }
        else if (myQueueItem.method === "DELETE") {
            returnedHeros = HeroesClass.getHeroesClass().removeHero(myQueueItem.body.id);
            if (returnedHeros) {
                context.log('deleted hero ', myQueueItem.body.id);

                const temp = ASyncMngClass.getAsyncMng().updateApiCall(myQueueItem.apiId, "Completed", { "msg": "successfully deleted hero", "id": myQueueItem.body.id });
                //TODO: handle temp error
            }
            else {
                context.log('FAILD to deleted hero ', myQueueItem.body.id);
                const temp = ASyncMngClass.getAsyncMng().updateApiCall(myQueueItem.apiId, "Faild", { "msg": "Faild to deleted hero", "id": myQueueItem.body.id });
                //TODO: handle temp error

            }
        }
        else {
            //handle error no method
            context.log('JavaScript Heros Api ASync Do Work error: no valid method ', myQueueItem.method);
        }
    }
    catch (e) {
        //TODO: handle error

    }
    finally {
        // once deply is done, complete the work and close the function
        context.done();
    }

}

//Heros Api ASync Do Work
// expects <id; method; body> should be already validated 
module.exports = function (context, myQueueItem) {
    context.log('JavaScript Heros Api ASync Do Work received --> Q Item = ', myQueueItem);

    //validate
    if (myQueueItem.apiId && myQueueItem.method && myQueueItem.body) {

        myVar = setTimeout(fakeDelayDoWork, 15000, myQueueItem, context);
    }
    else {

        //handle error queue item missing param
        context.log('JavaScript Heros Api ASync Do Work error: not valid queue item ', myQueueItem);
    }

    //context.done();
}
