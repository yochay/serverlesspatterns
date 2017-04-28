'use strict';

const heroes = require('../heroes');
const HeroesClass = require('../heroes').HeroesClass;


module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.input || (req.input && req.body.input)) {

        const msg = {
            "input": req.query.input
        };

        // write to Azure Q to be picked up by next function
        //context.bindings.outputQueueItem = msg;

        //const heroesList = heroes.getHeroes();
        //context.log('Heroes = ',  heroesList);

        let hc = new HeroesClass();
        hc = HeroesClass.getHeroesClass();
        let hc1 = HeroesClass.getHeroesClass();
        context.log('Heroes = ', hc.getHeroes());

        let newHero = hc.addHero("Darth Vader", "Most powerful force wielder");
        context.log('Heroes = ', hc.getHeroes());

        let tempUuid = "aaa";
        newHero = hc.getHero(tempUuid);

        hc.updateHero(tempUuid,"new name goes here", "new superpower goes here");
        context.log('Heroes = ', hc.getHeroes());

        hc.removeHero(tempUuid);
        context.log('Heroes = ', hc.getHeroes());

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "My super heros " + JSON.stringify(hc.getHeroes())
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass input on the query string"
        };
    }
    context.done();
};