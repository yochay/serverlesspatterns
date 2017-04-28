'use strict';

// Generate a v4 UUID (random) 
const uuidV4 = require('uuid/v4');


let HerosClassSingletonRef = null;
let HerosClassSingletonFlag = false;

class Heroes {
    constructor() {
        if (HerosClassSingletonFlag & !HerosClassSingletonRef) {
            this.heroesList = {};

            this.heroesList["36c9ee83-0128-42e7-833e-d37f89c8c74e"] = { "name": "Dr. Evil", "superPower": "super smart" };
            this.heroesList["1ae0d528-4dfe-4b31-a8d2-4d223780c882"] = { "name": "Magneto", "superPower": "magnetism" };
            this.heroesList["60bf2be7-552f-447d-a23d-916da876e28c"] = { "name": "Lex Luthor", "superPower": "Knows where to find kryptonite" };
            this.heroesList["84221d4d-9caa-410a-b32c-d755774c6d64"] = { "name": "Loki", "superPower": "Looks like other people" };
            this.heroesList["490a1c14-9a96-40a8-9888-aa26a860dfd2"] = { "name": "Bane", "superPower": "Broke the Bat" };
        }
    }

    static getHeroesClass() {
        if (HerosClassSingletonFlag === false) {
            HerosClassSingletonFlag = true;
            if (HerosClassSingletonRef === null) {
                HerosClassSingletonRef = new Heroes();
            }
        }
        return HerosClassSingletonRef;
    }

    getHeroes() {
        return this.heroesList;
    }

    getHero(heroUuid) {
        return this.heroesList[heroUuid];
    }

    // TODO: validate input, handle errors, etc...
    addHero(name, superPower) {
        const tempUuid = uuidV4();
        this.heroesList[tempUuid] = { "name": name, "superPower": superPower };

        return tempUuid;//this.heroesList[tempUuid];
    }


    removeHero(heroUuid) {
        if (this.heroesList[heroUuid]) {
            delete this.heroesList[heroUuid];
            return true;
        }
        else return false;
    }


    updateHero(heroUuid, name, superPower) {
        if (this.heroesList[heroUuid]) {
            this.heroesList[heroUuid].name = name;
            this.heroesList[heroUuid].superPower = superPower;

            return this.heroesList[heroUuid];
        }
        else {
            return false;
        }
    }

}

module.exports = {
    HeroesClass: Heroes
}