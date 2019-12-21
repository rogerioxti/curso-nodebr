const mocha = require('mocha') 
const nock = require('nock') 
const assert = require('assert') 
const { getStarships } = require('./service')

describe('Star Wars Tests', function() {

    this.beforeAll(function(){
        const response = {
            "count": 1, 
            "next": null, 
            "previous": null, 
            "results": [
                {
                    "name": "Millennium Falcon", 
                    "model": "YT-1300 light freighter", 
                    "manufacturer": "Corellian Engineering Corporation", 
                    "cost_in_credits": "100000", 
                    "length": "34.37", 
                    "max_atmosphering_speed": "1050", 
                    "crew": "4", 
                    "passengers": "6", 
                    "cargo_capacity": "100000", 
                    "consumables": "2 months", 
                    "hyperdrive_rating": "0.5", 
                    "MGLT": "75", 
                    "starship_class": "Light freighter", 
                    "pilots": [
                        "https://swapi.co/api/people/13/", 
                        "https://swapi.co/api/people/14/", 
                        "https://swapi.co/api/people/25/", 
                        "https://swapi.co/api/people/31/"
                    ], 
                    "films": [
                        "https://swapi.co/api/films/2/", 
                        "https://swapi.co/api/films/7/", 
                        "https://swapi.co/api/films/3/", 
                        "https://swapi.co/api/films/1/"
                    ], 
                    "created": "2014-12-10T16:59:45.094000Z", 
                    "edited": "2014-12-22T17:35:44.464156Z", 
                    "url": "https://swapi.co/api/starships/10/"
                }
            ]
        } 
        
        nock('https://swapi.co/api/starships')
        .get('/?search=Falcon&format=json')
        .reply(200, response) 
    })
    
    it('Starship test', async function(){
        const expected = [{
            name: "Millennium Falcon", 
            crew: 4, 
            hyperdrive: 0.5 
        }]

        const starship = await getStarships('Falcon') 
        assert.deepEqual(expected, starship) 
    })

})
