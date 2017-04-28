'use strict';

//const heroes = require('../heroes');
const HeroesClass = require('../heroes').HeroesClass;

//GET
module.exports = function (context, req) {
    context.log('JavaScript API GET trigger function processed a request.');

    const id = context.bindingData.id;
    let returnedHeros = null;

    if (id === null) {
        returnedHeros = HeroesClass.getHeroesClass().getHeroes();
        context.res = {
            status: 200, 
            body: returnedHeros
        };
    }
    else {
        returnedHeros = HeroesClass.getHeroesClass().getHero(id);
        if (returnedHeros) {
            context.res = {
                status: 200, 
                body: returnedHeros
            };
        }
        else {
            context.res = {
                status: 404,
                body: {"error" : "cant find hero with id=",id}
            };
        }
    }



    context.done();
};