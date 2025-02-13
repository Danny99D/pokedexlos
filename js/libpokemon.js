let countClickBayleef = 0;
let lastExpasion = null;
let imageExceptions = [];

//Needs same move and stats to be here
let skipCardDraws = [
    '201-ua', '201-ub','201-uc','201-ud','201-ue','201-ug','201-uh','201-ui','201-uj','201-uk','201-ul',
    '201-um','201-un','201-uo','201-up','201-uq','201-ur','201-us','201-ut','201-uu','201-uv','201-uw',
    '201-ux','201-uy','201-uz','201-u!','201-u2',//Unown
    '412-wsacl', '412-wtrcl', // Burmy
    '413-wsacl', '413-wtrcl', // Wormadam
    '521-female', // Unfezant
    '550-bblst', '550-bwhst', // Basculin
    '585-summer', '585-autumn', '585-winter', // Deerling
    '586-summer', '586-autumn', '586-winter', //Sawsbuck
    '592-female', // Frillish
    '593-female', // Jellicent
    '666-vco','666-vicsn','666-vju','666-voc','666-vpo','666-vsa','666-vsu','666-vtu','666-vga','666-vma',
    '666-vmo','666-vfa','666-vpoba','666-vel','666-vri','666-vsan','666-var','666-vhipl','666-vmod',//Vivillon
    '676-fdi','676-fda','676-fde','676-fhe','676-fka','676-fre','676-fph','676-fma','676-fst', //Furfrou
    '710-ps', '710-pl', '710-pp', // Pumpkaboo
    '711-ps', '711-pl', '711-pp', // Gourgeist
    '774-mreco', '774-morco', '774-myeco', '774-mblco', '774-minco', '774-mvico', // Minior
    '849-tlo', '849-tgmlo', // Toxtricity
    '869-abemi','869-aclma','869-aflca','869-aloru','869-arira','869-astle',//Alcremie
    '902-female', // Basculegion
    '925-mth', // Maushold
    '931-sbl', '931-sye', '931-swh', // Squawkabilly
    '978-tdr', '978-tst', // Tatsugiri
    '982-dth' // Dudunsparce
]

let notTrainers = [
    'galactic_team', 'galactic_grunt', 'mars', 'jupiter', 'saturn', 'sird', 'cyrus', //Galactic Team
    'magma_team', 'magma_grunt', 'tabitha', 'courtney', 'maxie', //Magma Team
    'aqua_team', 'aqua_grunt', 'matt', 'shelly', 'archie', //Aqua Team
    'plasma_team', 'plasma_grunt', 'plasma_ace', 'colress', //Plasma Team
    'rocket_team', 'rocket_grunt', 'rocket_ace', 'proton', 'ariana', 'archer', 'giovanni', //Rocket Team
    'trainer'
]

//Defines the generations of the first and last dex number
const generationDex = [
    [0, 151],
    [152, 251],
    [252, 386],
    [387, 493],
    [494, 649],
    [650, 721],
    [722, 809],
    [810, 905],
    [906, 1025]
]

//load the exception images as the DOM is loaded
document.addEventListener('DOMContentLoaded', ()=>{loadDoc('assets/exceptions.json', loadException)})

function loadException(xhttp) {
    let datos = JSON.parse(xhttp.responseText)
    imageExceptions = datos
}

//===================================== Search =========================================

//Searchs a pokemon by dex, expansion and trainer
function searchByDex(pokemonData, dexNumber, expansion, trainer) {

    //Aux variables
    let pokeSearch = []
    let back = '';
    
    //Search all pokemon with the same dex number and put them in the array aux
    pokemonData.find((pokeObj) => {
        if (pokeObj.pokedex_number == dexNumber) {
            pokeSearch.push(pokeObj)
        }
    })

    //If no pokemon is found returns a 404 or use the first one as founded
    back = pokeSearch.length ? pokeSearch[0] : 404

    //If found more than 1 result
    if (pokeSearch.length > 1) {

        pokeSearch.find((pokeObj) => {

            //Check if the pokemon is the same as the expansion searched
            if (pokeObj.expansion == expansion) {

                //Check if the pokemon is the same as the trainer
                if(trainer != '' && trainer != null){
                    if(pokeObj.trainer.toLowerCase() == trainer.toLowerCase()){
                        back = pokeObj
                    }
                }else{
                    back = pokeObj
                }
            }
        })
    }

    //returns the pokemon founded or 404
    return back
}

//Searchs a pokemon by pokedex_name
function searchByName(pokemonData, name) {
    let pokemonSearch = []

    if (name != '') {
        pokemonData.find((pokeObj) => {
            if (pokeObj.pokedex_name.toLowerCase().includes(name.toLowerCase())) {
                pokemonSearch.push(pokeObj)
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by encounter_tier
function searchByRarity(pokemonData, rarity) {
    let pokemonSearch = []

    if (rarity != '') {
        
        switch (rarity) {
            case 'ultra beast':
                pokemonData.find((pokeObj) => {
                    if ((pokeObj.encounter_tier.toLowerCase() == 'ultra_beast') ||
                        (pokeObj.encounter_tier.toLowerCase() == 'ultra_burst')) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
            case 'legendary':
                pokemonData.find((pokeObj) => {

                    pokeClimate = pokeObj.hasOwnProperty('climate') ? pokeObj.climate.toLowerCase() : ''
                    if ((pokeClimate != 'mega') && (pokeClimate != 'noble') && (pokeClimate != 'gigantamax')) {
                        if (pokeObj.encounter_tier.toLowerCase() == rarity) {
                            pokemonSearch.push(pokeObj)
                        }
                    }
                })
                break;
            default:
                pokemonData.find((pokeObj) => {
                    if (pokeObj.encounter_tier.toLowerCase() == rarity) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
        }
    }

    return pokemonSearch
}

//Searchs a pokemon by evolution_cost
function searchByEvoCost(pokemonData, evoCost) {
    let pokemonSearch = []

    if (evoCost > 0) {
        pokemonData.find((pokeObj) => {
            if (pokeObj.hasOwnProperty('evolve_cost')) {
                if (pokeObj.evolve_cost == evoCost) {
                    pokemonSearch.push(pokeObj)
                }
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by type_1 and type_2
function searchByType(pokemonData, types) {
    let pokemonSearch = []

    switch (types.length) {
        case 2:
            pokemonData.find((pokeObj) => {
                if ((pokeObj.type_1 == types[0] || pokeObj.type_2 == types[0]) &&
                    (pokeObj.type_1 == types[1] || pokeObj.type_2 == types[1])) {
                    pokemonSearch.push(pokeObj)
                }
            })
            break;
        case 1:
            pokemonData.find((pokeObj) => {
                if (pokeObj.type_1 == types[0] || pokeObj.type_2 == types[0]) {
                    pokemonSearch.push(pokeObj)
                }
            })
            break;
    }

    return pokemonSearch
}

//Searchs a pokemon by move_name
function searchByMoveName(pokemonData, moveName) {
    let pokemonSearch = []

    if (moveName != '') {
        pokemonData.find((pokeObj) => {
            if (pokeObj.move_name.toLowerCase().includes(moveName.toLowerCase())) {
                pokemonSearch.push(pokeObj)
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by move_type
function searchByMoveType(pokemonData, moveType) {
    let pokemonSearch = []

    if (moveType != '') {
        pokemonData.find((pokeObj) => {
            if (pokeObj.move_type.toLowerCase() == moveType) {
                pokemonSearch.push(pokeObj)
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by move_strength
function searchByMoveStrength(pokemonData, moveStrength) {
    let pokemonSearch = []

    if (moveStrength > -1) {
        pokemonData.find((pokeObj) => {
            let mStrength = pokeObj.move_attack_strength

            if(moveStrength == 0){
                if (mStrength == '?' || mStrength == '-' || mStrength == 'blank') {
                    pokemonSearch.push(pokeObj)
                }
            }else{
                if (mStrength == moveStrength) {
                    pokemonSearch.push(pokeObj)
                }
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by health
function searchByHealth(pokemonData, health) {
    let pokemonSearch = []

    if (health > 0) {
        pokemonData.find((pokeObj) => {
            if (pokeObj.health == health) {
                pokemonSearch.push(pokeObj)
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by initiative
function searchByInitiative(pokemonData, initiative) {
    let pokemonSearch = []

    if (initiative > 0) {
        pokemonData.find((pokeObj) => {
            if (pokeObj.initiative == initiative) {
                pokemonSearch.push(pokeObj)
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by biome
function searchByBiome(pokemonData, biome) {
    let pokemonSearch = []

    if (biome != '') {
        pokemonData.find((pokeObj) => {
            if (pokeObj.hasOwnProperty('biome')) {
                if (pokeObj.biome.toLowerCase() == biome) {
                    pokemonSearch.push(pokeObj)
                }
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by climate
function searchByClimate(pokemonData, climate) {
    let pokemonSearch = []

    if (climate != '') {
        pokemonData.find((pokeObj) => {
            if (pokeObj.hasOwnProperty('climate')) {
                if(climate == 'fossil'){
                    let pBiome = pokeObj.hasOwnProperty('biome') ? pokeObj.biome.toLowerCase() : ''
                    if ((pokeObj.climate.toLowerCase() == climate || (pokeObj.climate.toLowerCase() == 'ancient' && pBiome != 'ruins')) &&
                        (pBiome == 'blank' || pBiome == '')) {
                        pokemonSearch.push(pokeObj)
                    }
                }else{
                    if (pokeObj.climate.toLowerCase() == climate) {
                        pokemonSearch.push(pokeObj)
                    }
                }
            }
        })
    }

    return pokemonSearch
}

//Searchs a pokemon by move_1, move_2, move_3 and move_4
function searchByLearnTypes(pokemonData, types) {
    let pokemonSearch = []

    switch (types.length) {
        case 4:
            pokemonData.find((pokeObj) => {
                if ((pokeObj.move_1 == types[0] || pokeObj.move_2 == types[0] || pokeObj.move_3 == types[0] || pokeObj.move_4 == types[0]) &&
                    (pokeObj.move_1 == types[1] || pokeObj.move_2 == types[1] || pokeObj.move_3 == types[1] || pokeObj.move_4 == types[1]) &&
                    (pokeObj.move_1 == types[2] || pokeObj.move_2 == types[2] || pokeObj.move_3 == types[2] || pokeObj.move_4 == types[2]) &&
                    (pokeObj.move_1 == types[3] || pokeObj.move_2 == types[3] || pokeObj.move_3 == types[3] || pokeObj.move_4 == types[3])) {
                    pokemonSearch.push(pokeObj)
                }
            })
            break;
        case 3:
            pokemonData.find((pokeObj) => {
                if ((pokeObj.move_1 == types[0] || pokeObj.move_2 == types[0] || pokeObj.move_3 == types[0] || pokeObj.move_4 == types[0]) &&
                    (pokeObj.move_1 == types[1] || pokeObj.move_2 == types[1] || pokeObj.move_3 == types[1] || pokeObj.move_4 == types[1]) &&
                    (pokeObj.move_1 == types[2] || pokeObj.move_2 == types[2] || pokeObj.move_3 == types[2] || pokeObj.move_4 == types[2])) {
                    pokemonSearch.push(pokeObj)
                }
            })
            break;
        case 2:
            pokemonData.find((pokeObj) => {
                if ((pokeObj.move_1 == types[0] || pokeObj.move_2 == types[0] || pokeObj.move_3 == types[0] || pokeObj.move_4 == types[0]) &&
                    (pokeObj.move_1 == types[1] || pokeObj.move_2 == types[1] || pokeObj.move_3 == types[1] || pokeObj.move_4 == types[1])) {
                    pokemonSearch.push(pokeObj)
                }
            })
            break;
        case 1:
            pokemonData.find((pokeObj) => {
                if ((pokeObj.move_1 == types[0] || pokeObj.move_2 == types[0] || pokeObj.move_3 == types[0] || pokeObj.move_4 == types[0])) {
                    pokemonSearch.push(pokeObj)
                }
            })
            break;
    }

    return pokemonSearch
}

//Searchs a pokemon by expansion
function searchByExpansion(pokemonData, expansions) {
    let pokemonSearch = []

    expansions.forEach(expansion => {
        pokemonData.find((pokeObj) => {
            if ((pokeObj.expansion == expansion)) {
                pokemonSearch.push(pokeObj)
            }
        })
    });

    return pokemonSearch
}

//Searchs a pokemon by generation
function searchByGenerations(pokemonData, generations, rarity) {
    let pokemonSearch = []

    pokemonData.find((pokeObj) => {
        genOk = false
        generations.forEach(generation => {

            //Set the value of the pokedex_number min and max
            let minDex = generationDex[generation]
            let maxDex = generationDex[generation]

            //If the pokemon's pokedex_number is between min and max adds it to the array
            if ((fixDexNumber(pokeObj.pokedex_number) >= minDex[0]) && (fixDexNumber(pokeObj.pokedex_number) <= maxDex[1])) {
                genOk = true
            }
        })
        if (genOk) {
            pokemonSearch.push(pokeObj)
        }
    });

    return pokemonSearch
}

//Search a pokemon by trainer/s
function searchByTrainer(pokemonData, trainers){
    let pokemonSearch = []

    //If there any trainer in the options
    if(trainers.length){

        pokemonData.forEach(pokeObj => {            
            trainers.forEach(t => {
                let pTrainer = pokeObj.hasOwnProperty('trainer') ? pokeObj.trainer.toLowerCase() : ''

                let trainer = t.toLowerCase()

                //If search by a team or trainers
                if(trainer == 'trainer' || trainer.includes('team')){
                    if(pokeObj.pokedex_number.includes(checkTrainerMod(pokeObj, trainer))){
                        pokemonSearch.push(pokeObj)
                    }
                }else{
                    if(pTrainer == trainer){
                        pokemonSearch.push(pokeObj)
                    }
                }
            });
        });
    }else{
        pokemonData.forEach(pokeObj => {            
            if(pokeObj.hasOwnProperty('trainer') && pokeObj.trainer == ''){
                pokemonSearch.push(pokeObj)
            }
        });
    }
    return pokemonSearch
}   

//Returns the mod for the trainer of the pokemon
function checkTrainerMod(pokemon, trainer) {
    if(pokemon.pokedex_number.includes('-x')){ return '-gl'}
    
    switch (trainer) {
        case 'galactic_team':
            switch (pokemon.trainer.toLowerCase()) {
                case 'galactic grunt':
                case 'mars':
                case 'jupiter':
                case 'saturn':
                case 'sird':
                case 'cyrus':
                        return '-gl'
                    break;
                default:
                    break;
            }
        break;
        case 'magma_team':
            switch (pokemon.trainer.toLowerCase()) {
                case 'magma grunt':
                case 'tabitha':
                case 'courtney':
                case 'maxie':
                        return '-tmag'
                    break;
                default:
                    break;
            }
        break;
        case 'aqua_team':
            switch (pokemon.trainer.toLowerCase()) {
                case 'aqua grunt':
                case 'matt':
                case 'shelly':
                case 'archie':
                        return '-taqu'
                    break;
                default:
                    break;
            }
        break;
        case 'plasma_team':
            switch (pokemon.trainer.toLowerCase()) {
                case 'plasma grunt':
                case 'plasma ace':
                case 'colress':
                        return '-tpls'
                    break;
                default:
                    break;
            }
        break;
        case 'rocket_team':
            switch (pokemon.trainer.toLowerCase()) {
                case 'rocket grunt':
                case 'rocket ace':
                case 'proton':
                case 'ariana':
                case 'archer':
                case 'giovanni':
                        return '-trck'
                    break;
                default:
                    break;
            }
        break;
        default:
            return '-trai'
            break;
    }
}

//Searchs pokemon by internal_name to determine if its shiny
function searchByShiny(pokemonData, shiny) {
    let pokemonSearch = []

    pokemonData.find((pokeObj) => {
        let lastS = pokeObj.internal_name.lastIndexOf(" S")
        let pokeInName = pokeObj.internal_name
        switch (shiny) {

            //Search only no shinies
            case 'none':
                if(!((lastS && pokeObj.internal_name.includes(" S") && (pokeInName.length - lastS == 2)) ||
                pokeInName.includes('Shiny'))){
                    pokemonSearch.push(pokeObj)
                }
                break;

            //Search only shinies
            case 'only':
                if((lastS && pokeObj.internal_name.includes(" S") && (pokeInName.length - lastS == 2)) ||
                    pokeInName.includes('Shiny')
                ){
                    pokemonSearch.push(pokeObj)
                }
                break;
            
            //anything
            default:
                pokemonSearch.push(pokeObj)
                break;
        }

    });

    return pokemonSearch
}

//Searchs pokemon by move_effect EXPERIMENTAL
function searchByMoveEffect(pokemonData, moveEffect) {
    let pokemonSearch = []

    if (moveEffect != '') {
        switch (moveEffect) {
            case 'burned':
            case 'frozen':
            case 'paralysed':
            case 'drowsy':
            case 'confused':
            case 'poisoned':
                pokemonData.find((pokeObj) => {
                    let move = pokeObj.move_effect.toLowerCase()
                    if (move.includes(moveEffect.toLowerCase())) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
            case 'add_roll':
            case 'remove_roll':
            case 'switch_out':
            case 'take_damage':
                moveEffect = moveEffect.split('_')[0]
                pokemonData.find((pokeObj) => {
                    let move = pokeObj.move_effect.toLowerCase()
                    if (move.includes(moveEffect.toLowerCase())) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
            case 'next_attacked':
            case 'next_attacks':
            case 'second_move':
            case 'battle_fatigue':
            case 'double_damage':
            case 'extra_damage':

                moveEffect = moveEffect.replace('_', ' ')
                pokemonData.find((pokeObj) => {
                    let move = pokeObj.move_effect.toLowerCase()
                    if (move.includes(moveEffect.toLowerCase())) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
            case 'heal':
                pokemonData.find((pokeObj) => {
                    let move = pokeObj.move_effect.toLowerCase()
                    if (move.includes(moveEffect.toLowerCase() + ' ') && (move.includes('damage') || move.includes('effect'))) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
            case 'change_form':
            case 'change_type':
            case 'attack_strength':
                moveEffect = moveEffect.toLowerCase().split('_')
                pokemonData.find((pokeObj) => {
                    let move = pokeObj.move_effect.toLowerCase()
                    if (move.includes(moveEffect[0]) && move.includes(moveEffect[1])) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
            case 'increase_damage':
            case 'minus_damage':
                moveEffect = moveEffect.toLowerCase().split('_')
                let modify = '+'
                modify = moveEffect[0] == 'minus' ? '-' : modify
                pokemonData.find((pokeObj) => {
                    let move = pokeObj.move_effect.toLowerCase()
                    let found = move.indexOf(modify)

                    if (move.includes(modify) && !isNaN(move.charAt(found + 1)) && move.includes(moveEffect[1])) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
        }
    }

    return pokemonSearch
}

//Searchs pokemon by move archetypes
function searchByMoveArchetypes(pokemonData, moveData, archetypes){
    let pokemonSearch = []
    let moveSearch = []

    moveData.forEach(move => {
        let arch1 = move.hasOwnProperty('archetype_1') ? move.archetype_1.toLowerCase() : ''
        let arch2 = move.hasOwnProperty('archetype_2') ? move.archetype_2.toLowerCase() : ''
        let arch3 = move.hasOwnProperty('archetype_3') ? move.archetype_3.toLowerCase() : ''
        let moveOk = false

        if(arch1 != '' || arch2 != '' || arch3 != ''){
            // console.log(arch1 + '|'+arch2+'|'+arch3)
            let countArch = 0
            archetypes.forEach(a => {
                let fixA = a.replace('_', ' ').toLowerCase()
                if(arch1.includes(fixA) || arch2.includes(fixA) || arch3.includes(fixA)){
                    countArch++
                }
            });

            // console.log(archetypes.length+' || '+countArch)

            if(archetypes.length == countArch){
                moveOk = true
            }


            if(moveOk){
                moveSearch.push(move)
            }

        }
    });

    moveSearch.forEach(move => {
        pokemonData.forEach(pokeObj => {
            let pokeMoveName = pokeObj.hasOwnProperty('move_name') ? pokeObj.move_name.toLowerCase() : ''
            let searchMoveName = move.hasOwnProperty('move_name') ? move.move_name.toLowerCase() : ''

            if(pokeMoveName == searchMoveName && pokeObj.expansion == move.expansion){
                pokemonSearch.push(pokeObj)
            }
        });
    });

    return pokemonSearch
}

//Searchs pokemon by the values
function searchPokemon(pokemonData, moveData) {

    //Gets the normal values
    const pokemonName = document.getElementById('pokemonName').value
    const pokemonMoveName = document.getElementById('pokemonMoveName').value
    const pokemonMoveStrength = document.getElementById('pokemonMoveStrength').value ? document.getElementById('pokemonMoveStrength').value : -1
    const pokemonHealth = document.getElementById('pokemonHealth').value ? document.getElementById('pokemonHealth').value : 0
    const pokemonInitiative = document.getElementById('pokemonInitiative').value ? document.getElementById('pokemonInitiative').value : 0
    const pokemonEvoCost = document.getElementById('pokemonEvoCost').value ? document.getElementById('pokemonEvoCost').value : 0
    const searchByGen = document.getElementById('searchByGen').checked

    //Gets the array values
    const searchExpansionsBox = document.getElementsByName('searchExpansions')
    const searchGenerationsBox = document.getElementsByName('searchGenerations')
    const pokemonRarityBox = document.getElementsByName('rarity')
    const pokemonTypesBox = document.getElementsByName('types')
    const pokemonMoveTypeBox = document.getElementsByName('moveType')
    const pokemonClimateBox = document.getElementsByName('climate')
    const pokemonBiomeBox = document.getElementsByName('biome')
    const pokemonLearnBox = document.getElementsByName('learn')
    const pokemonMoveEffect = document.getElementsByName('moveEffect')
    const pokemonShiny = document.getElementsByName('shiny')
    const pokemonTrainersBox = document.getElementsByName('trainer')
    const pokemonArchetypesBox = document.getElementsByName('archetype')

    //Convert the arrays to an array of the checkeds values
    const searchExpansions = checkArray(searchExpansionsBox)
    const searchGenerations = checkArray(searchGenerationsBox)
    const pokemonTypes = checkArray(pokemonTypesBox)
    const pokemonLearn = checkArray(pokemonLearnBox)
    const pokemonMoveTypeA = checkArray(pokemonMoveTypeBox)
    const pokemonRarityA = checkArray(pokemonRarityBox)
    const pokemonBiomeA = checkArray(pokemonBiomeBox)
    const pokemonClimateA = checkArray(pokemonClimateBox)
    const pokemonMoveEffectA = checkArray(pokemonMoveEffect)
    const pokemonShinyA = checkArray(pokemonShiny)
    const pokemonTrainers = checkArray(pokemonTrainersBox)
    const pokemonArchetypes = checkArray(pokemonArchetypesBox)

    //makes the screen scrollable again
    const screen = document.getElementById('screen')
    if (screen.classList.contains('screen--noScroll')) {
        screen.classList.remove('screen--noScroll')
    }


    if (checkSearch(pokemonName, pokemonRarityA, pokemonTypes, pokemonMoveName, pokemonMoveTypeA, pokemonMoveStrength, pokemonHealth, pokemonInitiative, pokemonEvoCost, pokemonClimateA, pokemonBiomeA, pokemonLearn, searchExpansions, searchGenerations, searchByGen, pokemonMoveEffectA, pokemonShiny, pokemonTrainers, pokemonArchetypes)) {
        let searchList = pokemonData
        
        //convert the array with checked value to a normal var
        const pokemonRarity = pokemonRarityA.length ? pokemonRarityA[0] : ''
        const pokemonBiomeB = pokemonBiomeA.length ? pokemonBiomeA[0] : ''
        const pokemonClimateB = pokemonClimateA.length ? pokemonClimateA[0] : ''
        const pokemonMoveType = pokemonMoveTypeA.length ? pokemonMoveTypeA[0] : ''
        const pokemonMoveEffect = pokemonMoveEffectA.length ? pokemonMoveEffectA[0] : ''
        const pokemonShiny = pokemonShinyA[0]
        
        let pokemonBiome = pokemonBiomeB
        let pokemonClimate = pokemonClimateA
        if(pokemonClimateB.includes('_')){
            pokemonBiome = pokemonClimateB.split('_')[1]
            pokemonClimate = pokemonClimateB.split('_')[0]
        }


        //Search the pokemon by type_1 and type_2
        searchList = pokemonTypes.length ? searchByType(searchList, pokemonTypes) : searchList

        //Search the pokemon by pokedex_name
        searchList = pokemonName != '' ? searchByName(searchList, pokemonName) : searchList

        //Search the pokemon by health
        searchList = pokemonHealth > 0 ? searchByHealth(searchList, pokemonHealth) : searchList

        //Search the pokemon by initiative
        searchList = pokemonInitiative > 0 ? searchByInitiative(searchList, pokemonInitiative) : searchList

        //Search the pokemon by biome
        searchList = pokemonBiome != '' && pokemonRarity != 'noble' && pokemonRarity != 'mega' && pokemonRarity != 'gigantamax' && pokemonRarity != 'fossil' ? searchByBiome(searchList, pokemonBiome) : searchList

        //Search the pokemon by climate except if is a Mega, Gigantamax, Noble or Fossil pokemon
        if (pokemonRarity == 'noble' || pokemonRarity == 'mega' || pokemonRarity == 'gigantamax' || pokemonRarity == 'fossil') {
            searchList = searchByClimate(searchList, pokemonRarity)
        } else {
            searchList = pokemonClimate != '' ? searchByClimate(searchList, pokemonClimate) : searchList
        }

        //Search by encounter_tier except if is if is a Mega, Gigantamax, Noble or Fossil pokemon
        searchList = pokemonRarity != '' && pokemonRarity != 'noble' && pokemonRarity != 'mega' && pokemonRarity != 'gigantamax' && pokemonRarity != 'fossil' ? searchByRarity(searchList, pokemonRarity) : searchList

        //Search a pokemon by move_name
        searchList = pokemonMoveName != '' ? searchByMoveName(searchList, pokemonMoveName) : searchList

        //Search a pokemon by move_type
        searchList = pokemonMoveType != '' ? searchByMoveType(searchList, pokemonMoveType) : searchList

        //Search a pokemon by move_strength
        searchList = pokemonMoveStrength > -1 ? searchByMoveStrength(searchList, pokemonMoveStrength) : searchList

        //Search a pokemon by evolution_cost
        searchList = pokemonEvoCost > 0 ? searchByEvoCost(searchList, pokemonEvoCost) : searchList

        //Search a pokemon by move_1, move_2, move_3 and move_4
        searchList = pokemonLearn.length ? searchByLearnTypes(searchList, pokemonLearn) : searchList

        //Search a pokemon by move_effect EXPERIMENTAL
        searchList = pokemonMoveEffect.length ? searchByMoveEffect(searchList, pokemonMoveEffect) : searchList

        //Search a pokemon by move archetypes
        searchList = pokemonArchetypes.length ? searchByMoveArchetypes(searchList, moveData, pokemonArchetypes) : searchList
        
        //Search a pokemon if its shiny or not
        searchList = searchByShiny(searchList, pokemonShiny)

        //Search a pokemon by expansion
        searchList = searchByExpansion(searchList, searchExpansions)

        //Search a pokemon by generation
        searchList = searchByGenerations(searchList, searchGenerations, pokemonRarity)

        //Search a pokemon by trainer
        searchList = searchByTrainer(searchList, pokemonTrainers)

        //Sort the array by pokedex_number
        searchList = sortByDexNumber(searchList)

        drawPokemonCards(searchList)

        //Cierra la ventana de busqueda para menu responsive
        const search = document.getElementById('search')
        const formClose = document.getElementById('formClose')

        if (search.classList.contains('search--show') && formClose.classList.contains('formClose--show')) {
            search.classList.remove('search--show')
            formClose.classList.remove('formClose--show')
            formClose.classList.remove('formClose--left')
        }
    }
}

//Formas cambiar
function searchOtherForms(pokemonData, dexNumber, expansion) {
    let otherForms = []

    pokemonData.forEach(pokemon => {
        if ((fixDexNumber(pokemon.pokedex_number) == fixDexNumber(dexNumber)) && dexNumber != pokemon.pokedex_number) {
            otherForms.push(pokemon)
        }
    });

    return otherForms
}

//Evoluciones cambiar
function searchEvolution(pokemonData, pokemon) {

    //Array aux
    let fromEvols = []
    let toEvols = []

    //Crea arrays buscando evoluciones anteriores y siguientes del pokemon
    let fromEvol = searchEvoFrom(pokemonData, pokemon)
    let toEvol = searchEvoTo(pokemonData, pokemon)

    //Si el array tiene evoluciones realiza otra busqueda
    if (fromEvol.length) {

        //Guarda el array de evoluciones al array aux
        fromEvols = fromEvol

        //Hace otra busqueda con cada una de las evoluciones posibles
        fromEvols.forEach(e => {
            fromEvol = searchEvoFrom(pokemonData, e)

            //Si encuentra evoluciones, las añade al array aux
            if (fromEvol.length) {
                fromEvol.forEach(fEvo => {
                    fromEvols.push(fEvo)
                });
            }
        });
    }

    //Si el array tiene evoluciones realiza otra busqueda
    if (toEvol.length) {

        //Guarda el array de evoluciones al array aux
        toEvols = toEvol

        //Hace otra busqueda con cada una de las evoluciones posibles
        toEvols.forEach(e => {
            toEvol = searchEvoTo(pokemonData, e)

            //Si encuentra evoluciones, las añade al array aux
            if (toEvol.length) {
                toEvol.forEach(tEvo => {
                    toEvols.push(tEvo)
                });
            }
        });
    }

    //Si encuentra alguna evolucion, elimina los duplicados y les añade una nueva propiedad
    if (fromEvols.length) {
        fromEvols = onlyUniqueObjects(fromEvols)
        fromEvols = newProp(fromEvols, 'evolution', 'from')
    }

    if (toEvols.length) {
        toEvols = onlyUniqueObjects(toEvols)
        toEvols = newProp(toEvols, 'evolution', 'to')
    }

    //Devuelve un array juntando ambos arrays ordenado por pokedex_number
    return sortByDexNumber(fromEvols.concat(toEvols))
}

//Funcion que busca la anterior evolucion del pokemon
function searchEvoFrom(pokemonData, pokemon) {
    let evolFrom = []

    pokemonData.forEach(p => {

        //Si el pokemon tiene la propiedad evolve_into
        if (p.hasOwnProperty('evolve_into')) {

            //Guarda sus evoluciones en un array
            let evolutions = p.evolve_into.split('/')

            if (evolutions.length) {
                evolutions.forEach(evo => {

                    //Mira si alguna evolucion es el pokemon buscado y añade el pokemon al array de busca
                    if (evo.toLowerCase() == pokemon.internal_name.toLowerCase()) {
                        evolFrom.push(p)
                    }
                });
            }
        }
    });

    //Devuelve un array con las evoluciones
    return evolFrom
}

//Funcion que busca la siguiente evolucion del pokemon
function searchEvoTo(pokemonData, pokemon) {
    let array = []

    pokemonData.forEach(p => {

        //Crea un array con las posibles evoluciones del pokemon
        let evolutions = pokemon.hasOwnProperty('evolve_into') ? pokemon.evolve_into.split('/') : []

        //Si hay alguna evolucion las añade al array de busqueda
        if (evolutions.length) {
            evolutions.forEach(evo => {

                //Añade la evolucion al array y se asegura que el pokemon a añadir no sea una forma Noble
                if (evo.toLowerCase() == p.internal_name.toLowerCase() &&
                    p.pokedex_number.toString().indexOf('-n') < 0) {
                    array.push(p)
                }
            });
        }
    });

    //Devuelve un array con las evoluciones
    return array
}

//Check if a pokemon is in the exceptions list for custom images
function searchDexExceptions(dexNumber, expansion){
    let r = false;
    if(checkExp(expansion) in imageExceptions){
        if(imageExceptions[checkExp(expansion)].includes(dexNumber)){
            r = true
        }
    }

    return r;
}

function searchMoveArchetypes(pokemon){
    let listArch = []

    moveData.forEach(move => {
        let arch1 = move.hasOwnProperty('archetype_1') ? move.archetype_1.toLowerCase() : ''
        let arch2 = move.hasOwnProperty('archetype_2') ? move.archetype_2.toLowerCase() : ''
        let arch3 = move.hasOwnProperty('archetype_3') ? move.archetype_3.toLowerCase() : ''

        if(move.move_name == pokemon.move_name && move.expansion == pokemon.expansion){
            if(arch1 != ''){
                listArch.push(arch1)
            }
            if(arch2 != ''){
                listArch.push(arch2)
            }
            if(arch3 != ''){
                listArch.push(arch3)
            }
        }
    });

    return listArch
}

//===================================== Draw =========================================

//Function to draw a sd card of a pokemon
function drawPokemonCard(pokemon) {

    //Create the card container
    let sdcard = document.createElement('DIV')

    sdcard.classList.add('sdcard')

    //Defines the values to search a pokemon
    sdcard.setAttribute('dexnumber', pokemon.pokedex_number)
    sdcard.setAttribute('expansion', pokemon.expansion)
    sdcard.setAttribute('trainer', pokemon.trainer)

    //---------sdcard Title
    let dvCardTitle = document.createElement('DIV')
    dvCardTitle.classList.add('sdcard-title')

    let div = document.createElement('DIV')
    div.classList.add('flex')
    div.classList.add('flex--sa')

    if (pokemon.hasOwnProperty('type_1') && pokemon.type_1 != '') {
        div.appendChild(createImg('type', pokemon.type_1.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    } else {
        div.appendChild(createImg('type', 'typeless', 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('type_2') && pokemon.type_2 != '') {
        div.appendChild(createImg('type', pokemon.type_2.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    }

    dvCardTitle.appendChild(div)

    let pName = document.createElement('P')
    pName.classList.add('sdcard-name')
    pName.appendChild(document.createTextNode(pokemon.pokedex_name))

    dvCardTitle.appendChild(pName)
    dvCardTitle.appendChild(createImg('icon', pokemon.encounter_tier, 'sdcard-type sdcard-type--last', pokemon.expansion, pokemon.pokedex_number))

    dvCardTitle.appendChild(createImg('exp', checkExp(pokemon.expansion), 'expansions--img expansions--img--sm', pokemon.expansion, pokemon.pokedex_number))


    //---------sdcard Info
    let dvCardInfo = document.createElement('DIV')
    dvCardInfo.classList.add('sdcard-info')

    dvCardInfo.appendChild(createImg('poke', checkDexNumber(pokemon.pokedex_number), 'sdcard-info--img', pokemon.expansion, pokemon.pokedex_number))

    let dvInfo = document.createElement('DIV')
    dvInfo.classList.add('sdcard-info--box')

    let dvStats = document.createElement('DIV')
    dvStats.classList.add('sdcard-info--stats')

    let pHealt = document.createElement('DIV')
    pHealt.classList.add('sdcard-info--health')
    pHealt.appendChild(document.createTextNode(pokemon.health))
    dvStats.appendChild(pHealt)

    let pInit = document.createElement('DIV')
    pInit.classList.add('sdcard-info--initiative')
    pInit.appendChild(document.createTextNode(pokemon.initiative))
    dvStats.appendChild(pInit)

    dvInfo.appendChild(dvStats)

    modClimate = pokemon.hasOwnProperty('climate') && pokemon.climate != '' ? pokemon.climate.toLowerCase() : ''
    modBiome = pokemon.hasOwnProperty('biome') && pokemon.biome != '' ? pokemon.biome.toLowerCase() : ''
    dvInfo.appendChild(checkBioClim(pokemon, 'sdcard-info--location'))

    //Poke Learn Moves
    let dvLearn = document.createElement('DIV')
    dvLearn.classList.add('sdcard-info--learn')

    if (pokemon.hasOwnProperty('move_1') && pokemon.move_1 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_1.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    } else {
        dvLearn.appendChild(createImg('type', 'typeless', 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('move_2') && pokemon.move_2 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_2.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('move_3') && pokemon.move_3 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_3.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('move_4') && pokemon.move_4 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_4.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))
    }

    dvInfo.appendChild(dvLearn)
    dvCardInfo.appendChild(dvInfo)


    //---------sdcard Move
    let dvCardMove = document.createElement('DIV')
    dvCardMove.classList.add('sdcard-moveInfo')

    dvCardMove.appendChild(createImg('type', pokemon.move_type.toLowerCase(), 'sdcard-type', pokemon.expansion, pokemon.pokedex_number))

    let pMoveName = document.createElement('P')
    pMoveName.classList.add('sdcard-moveInfo--name')
    pMoveName.appendChild(document.createTextNode(pokemon.move_name))
    dvCardMove.appendChild(pMoveName)

    let pokeArchetypes = searchMoveArchetypes(pokemon)

    if(pokeArchetypes.length > 0){
        let pArchetypes = document.createElement('DIV')
        pArchetypes.classList.add('sdcard-moveInfo--archetypes')

        pokeArchetypes.forEach(arch => {
            let pArch = document.createElement('DIV')
            let fixArch = fixArchetype(arch)

            pArch.classList.add('archetypes--' + fixArch)
            pArch.classList.add('sdcard-moveInfo--archetype')

            pArchetypes.appendChild(pArch)
        });

        pMoveName.appendChild(pArchetypes)
    }

    let pStrength = document.createElement('DIV')
    pStrength.classList.add('sdcard-moveInfo--strength')

    let pokeMoveStrength = pokemon.move_attack_strength == 'blank' ? '' : pokemon.move_attack_strength
    pStrength.appendChild(document.createTextNode(pokeMoveStrength))
    dvCardMove.appendChild(pStrength)


    sdcard.appendChild(dvCardTitle)
    sdcard.appendChild(dvCardInfo)
    sdcard.appendChild(dvCardMove)

    return sdcard
}

//Funcion para dibujar las cartas en la pantalla
function drawPokemonCards(pokemonData) {
    const screen = document.getElementById('screen')
    borrar(screen)

    let searchResult = document.createElement('DIV')
    searchResult.classList.add('screen-found')
    searchResult.appendChild(document.createTextNode(fixCount(pokemonData) + ' Results'))
    screen.appendChild(searchResult)

    screen.scrollTop = 0

    if (pokemonData.length) {
        pokemonData.forEach(pokemon => {
            if (checkCardDraw(pokemon)) {
                screen.appendChild(drawPokemonCard(pokemon))
            }
        });

        checkImagesLoad()
    } else {
        notFound()
    }
}

//Funcion para dibujar la informacion de la carta seleccionada
function drawPokemonInfo(pokemonData, dexNumber, expansion, scrollVar, trainer) {
    const screen = document.getElementById('screen')
    const pokemon = searchByDex(pokemonData, dexNumber, expansion, trainer)

    scrollVar = scrollVar ? scrollVar : screen.scrollTop

    //cardInfo
    if (!document.getElementById('cardInfo')) {
        let dvCardInfo = document.createElement('DIV')
        dvCardInfo.classList.add('cardInfo')
        dvCardInfo.id = 'cardInfo'
        dvCardInfo.style.top = scrollVar + "px"

        screen.appendChild(dvCardInfo)
    } else {
        document.getElementById('cardInfo').scrollTop = 0
    }

    //cardTitle
    let dvCardTitle = document.createElement('DIV')
    dvCardTitle.classList.add('cardInfo-title')

    let dvCardTypes = document.createElement('DIV')
    dvCardTypes.classList.add('cardInfo-title--types')
    dvCardTypes.appendChild(createImg('exp', checkExp(pokemon.expansion), 'cardInfo-type cardInfo-type--round', pokemon.expansion, pokemon.pokedex_number))

    if (pokemon.hasOwnProperty('type_1') && pokemon.type_1 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_1, 'cardInfo-type', pokemon.expansion, pokemon.pokedex_number))
    } else {
        dvCardTypes.appendChild(createImg('type', 'typeless', 'cardInfo-type', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('type_2') && pokemon.type_2 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_2, 'cardInfo-type', pokemon.expansion, pokemon.pokedex_number))
    }

    let pName = document.createElement('P')
    pName.classList.add('cardInfo-name')
    pName.appendChild(document.createTextNode('#' + checkDexNumber(fixDexNumber(pokemon.pokedex_number)) + ' ' + pokemon.pokedex_name))

    dvCardTitle.appendChild(dvCardTypes)
    dvCardTitle.appendChild(pName)

    //--------cardInfo
    let dvCardData = document.createElement('DIV')
    dvCardData.classList.add('cardInfo-info')

    let dvDataBox = document.createElement('DIV')
    dvDataBox.classList.add('cardInfo-info--box')

    //Poke Image
    let imgPoke = createImg('poke', checkDexNumber(pokemon.pokedex_number), 'cardInfo-info--img', pokemon.expansion, pokemon.pokedex_number)
    imgPoke.id = 'pokeImg'
    dvDataBox.appendChild(imgPoke)

    //Poke Description
    let dvCardDesc = document.createElement('DIV')
    dvCardDesc.classList.add('cardInfo-description')

    let dvHealth = document.createElement('DIV')
    dvHealth.classList.add('sdcard-info--health')
    dvHealth.appendChild(document.createTextNode(pokemon.health))
    dvCardDesc.appendChild(dvHealth)

    modRarity = pokemon.encounter_tier
    dvCardDesc.appendChild(createImg('icon', modRarity, 'cardInfo-type cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))

    let dvInit = document.createElement('DIV')
    dvInit.classList.add('sdcard-info--initiative')
    dvInit.appendChild(document.createTextNode(pokemon.initiative))
    dvCardDesc.appendChild(dvInit)


    if (pokemon.hasOwnProperty('description') && pokemon.description != '') {
        let pDesc = document.createElement('P')
        pDesc.appendChild(document.createTextNode(pokemon.description))

        dvCardDesc.appendChild(document.createElement('BR'))
        dvCardDesc.appendChild(pDesc)
    }

    dvDataBox.appendChild(dvCardDesc)
    dvCardData.appendChild(dvDataBox)

    //Poke Info
    let dvInfoBox = document.createElement('DIV')
    dvInfoBox.classList.add('cardInfo-box')


    //------------cardMove
    let dvCardMove = document.createElement('DIV')
    dvCardMove.classList.add('cardInfo-move')

    let dvCardMoveTitle = document.createElement('DIV')
    dvCardMoveTitle.classList.add('cardInfo-move--title')

    dvCardMoveTitle.appendChild(createImg('type', pokemon.move_type, 'cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))

    let pStrength = document.createElement('DIV')
    pStrength.classList.add('sdcard-moveInfo--strength')

    let pokeMoveStrength = pokemon.move_attack_strength == 'blank' ? '' : pokemon.move_attack_strength
    pStrength.appendChild(document.createTextNode(pokeMoveStrength))
    dvCardMoveTitle.appendChild(pStrength)

    let pMoveName = document.createElement('P')
    pMoveName.classList.add('sdcard-moveInfo--name')
    pMoveName.appendChild(document.createTextNode(pokemon.move_name))
    dvCardMoveTitle.appendChild(pMoveName)

    dvCardMove.appendChild(dvCardMoveTitle)


    let pMoveDesc = document.createElement('P')
    pMoveDesc.classList.add('cardInfo-move--description')
    pMoveDesc.appendChild(document.createTextNode(pokemon.move_effect))

    let pokeArchetypes = searchMoveArchetypes(pokemon)

    if(pokeArchetypes.length > 0){
        let pArchetypes = document.createElement('DIV')
        pArchetypes.classList.add('sdcard-moveInfo--archetypes')

        pokeArchetypes.forEach(arch => {
            let pArch = document.createElement('DIV')
            let fixArch = fixArchetype(arch)

            pArch.classList.add('archetypes--' + fixArch)
            pArch.classList.add('sdcard-moveInfo--archetype')

            pArch.appendChild(document.createTextNode(firstUpperCase(arch)))

            pArchetypes.appendChild(pArch)
        });

        pMoveDesc.appendChild(pArchetypes)
    }

    dvCardMove.appendChild(pMoveDesc)

    dvCardData.appendChild(dvCardMove)


    //Poke Learn Moves
    let dvLearn = document.createElement('DIV')
    dvLearn.classList.add('cardInfo-info--learn')

    let div = document.createElement('DIV')

    if (pokemon.hasOwnProperty('move_1') && pokemon.move_1 != '') {
        div.appendChild(createImg('type', pokemon.move_1, 'cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))
    } else {
        div.appendChild(createImg('type', 'typeless', 'cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('move_2') && pokemon.move_2 != '') {
        div.appendChild(createImg('type', pokemon.move_2, 'cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('move_3') && pokemon.move_3 != '') {
        div.appendChild(createImg('type', pokemon.move_3, 'cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('move_4') && pokemon.move_4 != '') {
        div.appendChild(createImg('type', pokemon.move_4, 'cardInfo-type--sm', pokemon.expansion, pokemon.pokedex_number))
    }


    dvLearn.appendChild(div)

    //Poke Location
    let dvLocat = document.createElement('DIV')
    dvLocat.classList.add('cardInfo-info--location')

    modClimate = pokemon.hasOwnProperty('climate') ? pokemon.climate.toLowerCase() : ''
    modBiome = pokemon.hasOwnProperty('biome') ? pokemon.biome.toLowerCase() : ''

    dvLocat.appendChild(checkBioClim(pokemon, ''))

    dvInfoBox.appendChild(dvLearn)
    dvInfoBox.appendChild(dvLocat)

    //Poke Evo Cost
    if (pokemon.hasOwnProperty('evolve_cost') && pokemon.evolve_cost.toString() != '' && pokemon.evolve_cost.toString().toLowerCase() != 'hidden') {
        let dvEvol = document.createElement('DIV')
        dvEvol.classList.add('cardInfo-info--evolution')

        div = document.createElement('DIV')
        div.appendChild(document.createTextNode(pokemon.evolve_cost))

        dvEvol.appendChild(div)
        dvInfoBox.appendChild(dvEvol)
    }

    dvCardData.appendChild(dvInfoBox)

    //------------link

    let link = document.createElement('A')
    link.classList.add('cardInfo-link')
    link.target = "_blank"
    link.href = "https://bulbapedia.bulbagarden.net/wiki/" + pokemon.pokedex_name.replace(" ", "_") + "_(Pok%C3%A9mon)"

    let linkImg = document.createElement('IMG')
    linkImg.src = 'assets/img/icons/Bulbapedia_logo.png'
    linkImg.alt = 'bulbapedia_logo.png'
    linkImg.title = firstUpperCase(pokemon.pokedex_name) + ' - Bulbapedia'

    link.appendChild(linkImg)

    //add
    const cardInfo = document.getElementById('cardInfo')

    cardInfo.appendChild(link)
    cardInfo.appendChild(dvCardTitle)
    cardInfo.appendChild(dvCardData)
    // cardInfo.appendChild(dvCardMove)

    //Dibuja las evoluciones y formas de los pokemon
    let otherForms = searchOtherForms(pokemonData, pokemon.pokedex_number, pokemon.expansion)
    let evolLine = searchEvolution(pokemonData, pokemon)

    if(otherForms.length > 0 || evolLine.length > 0){
        cardInfo.appendChild(drawPokemonLine(pokemonData, pokemon, otherForms, evolLine))
    }

    //Events
    const pokeImg = document.getElementById('pokeImg')
    countClickBayleef = 0;
    if (pokemon.pokedex_number == 153 && pokemon.expansion == 'generations') {

        pokeImg.addEventListener('click', (e) => {
            countClickBayleef++
            if (countClickBayleef >= 5) {
                e.target.src = 'assets/img/icons/expansions/javcovB.png'
            }
        })
    }

    //Cambia todas las imagenes no encontradas con unknown.png
    checkImagesLoad()

    if(otherForms.length > 1 || evolLine.length > 1){
        const pokeLinesOptions = document.getElementById('pokeLinesOptions')
        const pokeLinesBoxes = document.getElementsByClassName('pokeLines-box')
        const pokeLinesCages = document.getElementsByClassName('pokeLines-cage')
        

        //Cambia las box de las expansiones y opciones
        pokeLinesOptions.addEventListener('click', (e)=>{
            if(e.target.hasAttribute('boxTarget')){
                let boxIndex = null
                lastExpasion = e.target.getAttribute('boxTarget')

                pokeLinesOptions.childNodes.forEach((opt) =>{
                    opt.classList.remove('pokeLines-option--selected')
                })
                Array.from(pokeLinesBoxes).forEach((box, i) =>{
                    if(e.target.getAttribute('boxTarget') == box.getAttribute('boxTarget')){
                        boxIndex = i
                    }
                    box.classList.remove('pokeLines-box--show')
                })

                e.target.classList.add('pokeLines-option--selected')
                pokeLinesBoxes[boxIndex].classList.add('pokeLines-box--show')
            }
        })

        //Adds the click function for the elements
        Array.from(pokeLinesCages).forEach((cage) => {
            cage.addEventListener('click', (e)=>{

                //If the clicked element has dexNumber attribute
                if(e.target.hasAttribute('dexNumber')){

                    //Get the attributes
                    let dexNumber = e.target.getAttribute('dexNumber')
                    let expansion = e.target.getAttribute('expansion')
                    let trainer = e.target.getAttribute('trainer')

                    //Deletes the actual pokemon info
                    borrar(cardInfo)

                    //Search the clicked pokemon
                    drawPokemonInfo(pokemonData, dexNumber, expansion, scrollVar, trainer)
                }
            })
        })
    }

    //cardClose
    let dvCardClose = document.createElement('DIV')
    dvCardClose.classList.add('cardInfo-close')
    dvCardClose.id = 'cardClose'

    cardInfo.appendChild(dvCardClose)

    //Borrar cardInfo
    const cardClose = document.getElementById('cardClose')
    cardClose.addEventListener('click', (e) => {
        screen.removeChild(e.target.parentNode)
        screen.scrollTop = scrollVar
        screen.classList.remove('screen--noScroll')
    })
}

//Funcion que dibuja la forma de un pokemon
function drawPokemonForm(pokemon, mod) {
    let dvForm = document.createElement('DIV')
    dvForm.classList.add('pokeForm')
    dvForm.setAttribute('dexnumber', pokemon.pokedex_number)
    dvForm.setAttribute('expansion', pokemon.expansion)
    dvForm.setAttribute('trainer', pokemon.trainer)

    let imgPoke = createImg('poke', checkDexNumber(pokemon.pokedex_number), 'pokeForm--img', pokemon.expansion, pokemon.pokedex_number)
    let imgExp = createImg('exp', checkExp(pokemon.expansion), 'pokeForm--expansion', pokemon.expansion, pokemon.pokedex_number)

    //cardTitle
    let dvCardTitle = document.createElement('DIV')
    dvCardTitle.classList.add('pokeForm--title')

    let dvCardTypes = document.createElement('DIV')
    dvCardTypes.classList.add('pokeForm--types')

    if (pokemon.hasOwnProperty('type_1') && pokemon.type_1 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_1, 'cardInfo-type pokeForm--type', pokemon.expansion, pokemon.pokedex_number))
    } else {
        dvCardTypes.appendChild(createImg('type', 'typeless', 'cardInfo-type pokeForm--type', pokemon.expansion, pokemon.pokedex_number))
    }

    if (pokemon.hasOwnProperty('type_2') && pokemon.type_2 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_2, 'cardInfo-type pokeForm--type', pokemon.expansion, pokemon.pokedex_number))
    }

    dvCardTitle.appendChild(dvCardTypes)

    dvForm.appendChild(imgPoke)
    dvForm.appendChild(imgExp)
    dvForm.appendChild(dvCardTitle)

    switch (mod) {
        case 'evol':
            if (pokemon.hasOwnProperty('evolution')) {
                let pDesc = document.createElement('P')
                pDesc.classList.add('pokeForm--description')
                switch (pokemon.evolution) {
                    case 'to':
                        pDesc.appendChild(document.createTextNode('Evolve ' + pokemon.evolution + ' ' + firstUpperCase(pokemon.pokedex_name)))
                        break;

                    case 'from':
                        pDesc.appendChild(document.createTextNode('Evolved ' + pokemon.evolution + ' ' + firstUpperCase(pokemon.pokedex_name)))
                        break;
                }

                dvForm.appendChild(pDesc)
            }
            break;

        default:
            if (pokemon.hasOwnProperty('description')) {
                let pDesc = document.createElement('P')
                pDesc.classList.add('pokeForm--description')
                pDesc.appendChild(document.createTextNode(pokemon.description))

                dvForm.appendChild(pDesc)
            }
            break;
    }

    return dvForm
}

function drawPokemonLine(pokemonData, pokemon, otherForms, evolLine) {

    //Crea un array con las diferentes expansiones encontradas
    let expansions = []
    otherForms.forEach(e => { expansions.push(e.expansion) });
    evolLine.forEach(e => { expansions.push(e.expansion) });

    //Elimina duplicados del array
    expansions = sortExpansions(expansions)
    

    let pokeLines = document.createElement('DIV')
    pokeLines.classList.add('pokeLines')

    //--------- Options ----------------
    let boxOpts = document.createElement('DIV')
    boxOpts.classList.add('pokeLines-options')
    boxOpts.id = 'pokeLinesOptions'

    //Recorre el array de expansiones creando las diferentes Options
    expansions.forEach((exp, i) => {
        let boxOpt = document.createElement('DIV')
        boxOpt.classList.add('pokeLines-option')
        if(lastExpasion && expansions.find((e) => e == lastExpasion)){
            if (exp == lastExpasion) { 
                boxOpt.classList.add('pokeLines-option--selected') 
            }
        }else{
            if (i == 0) { boxOpt.classList.add('pokeLines-option--selected') }
        }

        //Les añade un atributo para refenciar la Option y la Screen
        boxOpt.setAttribute('boxTarget', exp)

        boxOpt.appendChild(createImg('exp', checkExp(exp), 'pokeLines-option--img', '', 0))

        boxOpt.appendChild(document.createTextNode(firstUpperCase(checkExpB(exp))))
        boxOpts.appendChild(boxOpt)
    });

    pokeLines.appendChild(boxOpts)

    //--------- box ----------------
    let pokeScreen = document.createElement('DIV')
    pokeScreen.classList.add('pokeLines-screen')

    expansions.forEach((exp, i) => {
        let box = document.createElement('DIV')
        box.classList.add('pokeLines-box')
        box.setAttribute('boxtarget', exp)

        if(lastExpasion && expansions.find((e) => e == lastExpasion)){
            if (exp == lastExpasion) { 
                box.classList.add('pokeLines-box--show')
            }
        }else{
            if (i == 0) { 
                box.classList.add('pokeLines-box--show')
            }
        }
        
        let forms = document.createElement('DIV')
        let evols = document.createElement('DIV')
        let lineCount = 0
        let evoCount = 0

        if(otherForms.length){
            forms.classList.add('pokeLines-cage')
            otherForms.forEach(form => {
                if(exp == form.expansion){
                    let dvForm = drawPokemonForm(form, '')

                    forms.appendChild(dvForm)
                    lineCount++
                }
            });
            
            box.appendChild(forms)
        }

        if(evolLine.length){
            evols.classList.add('pokeLines-cage')

            evolLine.forEach(evo => {
                if(exp == evo.expansion){
                    let dvForm = drawPokemonForm(evo, 'evol')

                    evols.appendChild(dvForm)
                    evoCount++
                }
            });
            
            box.appendChild(evols)
        }

        if(lineCount > 0 && evoCount > 0){
            forms.classList.add('pokeLines-cage--line')
        }
        
        pokeScreen.appendChild(box)

    })

    pokeLines.appendChild(pokeScreen)

    return pokeLines
}


//===================================== Check =========================================

//Funcion que devuelve una imagen dependiendo el bioma y clima
function checkBioClim(pokemon, clas) {
    let climate = pokemon.hasOwnProperty('climate') ? pokemon.climate.toLowerCase() : ''
    let biome = pokemon.hasOwnProperty('biome') ? pokemon.biome.toLowerCase() : ''
    let trainer = pokemon.hasOwnProperty('trainer') ? pokemon.trainer.toLowerCase() : ''
    trainer = trainer.replace(' ', '_')


    switch (pokemon.expansion) {
        case 'johtoWar':
            if(trainer != ''){
                return createImg('trainer', trainer + '_trainer', clas, '', 0)
            }
            switch (climate) {
                case 'noble':
                case 'mega':
                case 'gigantamax':
                    return createImg('icon', climate, clas, '', 0)
                case 'space':
                    return createImg('icon', 'unknown', clas, '', 0)
                case 'fossil':
                    return createImg('icon', 'fossil', clas, '', 0)
                case 'ancient':
                    if(biome == 'ruins'){ return createImg('icon', 'ancient_ruins', clas, '', 0) }
                    return createImg('icon', 'fossil', clas, '', 0)
                default:
                    if (climate == 'rage') {
                        return createImg('icon', 'unknown', clas, '', 0)
                    } else {
                        return createImg('icon', climate + '_' + biome, clas, '', 0)
                    }
            }
            break;
    
        default:
            if(trainer != ''){
                return createImg('trainer', trainer + '_trainer', clas, '', 0)
            }
            switch (climate) {
                case 'noble':
                case 'mega':
                case 'gigantamax':
                    return createImg('icon', climate, clas, '', 0)
                case 'space':
                    return createImg('icon', 'unknown', clas, '', 0)
                default:
                    if (biome == 'ruins') {
                        return createImg('icon', 'unknown', clas, '', 0)
                    } else {
                        return createImg('icon', climate + '_' + biome, clas, '', 0)
                    }
            }
            break;
    }
    
}

//Removes the -mod of trainers and some pokemon
function checkDexNumber(modDex) {
    modDex = modDex.toString()

    modDex = modDex.includes('-gl') ? modDex.slice(0, -3) : modDex //Galactic
    modDex = modDex.includes('-tpls') ? modDex.slice(0, -5) : modDex //Plasma
    modDex = modDex.includes('-trck') ? modDex.slice(0, -5) : modDex //Rocket
    modDex = modDex.includes('-trai') ? modDex.slice(0, -5) : modDex //Trainer (Freeze)
    modDex = modDex.includes('-taqu') ? modDex.slice(0, -5) : modDex //Team Aqua (Freeze)
    modDex = modDex.includes('-tmag') ? modDex.slice(0, -5) : modDex //Team Magma (Freeze)

    //Pumpkaboo & gourgheist
    modDex = modDex.substr(-3, 3) == '-ps' && modDex.includes('-ps') ? modDex.slice(0, -3) : modDex //small
    modDex = modDex.substr(-3, 3) == '-pl' && modDex.includes('-pl') ? modDex.slice(0, -3) : modDex //large
    modDex = modDex.substr(-3, 3) == '-pp' && modDex.includes('-pp') ? modDex.slice(0, -3) : modDex //super
    modDex = modDex.substr(-9, 9) == '-ps-shiny' && modDex.includes('-ps-shiny') ? modDex.slice(0, -9) + '-shiny' : modDex //small shiny
    modDex = modDex.substr(-9, 9) == '-pl-shiny' && modDex.includes('-pl-shiny') ? modDex.slice(0, -9) + '-shiny' : modDex //large shiny
    modDex = modDex.substr(-9, 9) == '-pp-shiny' && modDex.includes('-pp-shiny') ? modDex.slice(0, -9) + '-shiny' : modDex //super shiny
    
    return modDex
}

//Replaces all not found images with unknown.png
function checkImagesLoad() {
    const images = document.querySelectorAll('img')
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'assets/img/icons/unknown.png'
        })
    });
}

//Funcion que asegura que se busque por algun valor
function checkSearch(pokemonName, pokemonRarity, pokemonTypes, pokemonMoveName, pokemonMoveType, pokemonMoveStrength, pokemonHealth, pokemonInitiative, pokemonEvoCost, pokemonClimate, pokemonBiome, pokemonLearn, searchExpansions, searchGenerations, searchByGen, pokemonMoveEffect, pokemonShiny, pokemonTrainers, pokemonArchetypes) {
    // console.log('--Nombre: ' + pokemonName)
    // console.log(pokemonRarity)
    // console.log(pokemonTypes)
    // console.log('--Nombre Ataque: ' + pokemonMoveName)
    // console.log(pokemonMoveType)
    // console.log('--Fuerza Ataque: ' + pokemonMoveStrength)
    // console.log('--Vida: ' + pokemonHealth)
    // console.log('--Iniciativa: ' + pokemonInitiative)
    // console.log('--Coste Evolucion: ' + pokemonEvoCost)
    // console.log(pokemonClimate)
    // console.log(pokemonBiome)
    // console.log(pokemonLearn)
    // console.log('--Busca por Gen: ' + searchByGen)
    // console.log(searchExpansions)
    // console.log(searchGenerations)
    // console.log(pokemonShiny)
    // console.log(pokemonTrainers)

    // if (searchByGen && (searchExpansions.length > 0)) {
    //     return true
    // } else {
        if (    
            (pokemonTypes.length > 0 ||
                pokemonName != '' ||
                pokemonRarity != '' ||
                pokemonMoveName != '' ||
                pokemonMoveType.length > 0 ||
                pokemonMoveEffect.length > 0 ||
                pokemonMoveStrength > -1 ||
                pokemonHealth > 0 ||
                pokemonInitiative > 0 ||
                pokemonEvoCost > 0 ||
                pokemonClimate.length > 0 ||
                pokemonBiome.length > 0 ||
                pokemonLearn.length > 0 ||
                pokemonShiny.length > 0 ||
                pokemonTrainers.length > 0 ||
                pokemonArchetypes.length > 0
                ) ||
                (searchExpansions.length > 0) &&
                (searchGenerations.length > 0)
            ) {
            return true
        }
    // }

    return false
}

//Returns an array with all the checked values
function checkArray(array) {
    let newArray = []

    array.forEach(e => {
        if (e.checked) {
            newArray.push(e.value)
        }
    });

    return newArray
}

//Funcion que devuelve el nombre de Expansion
function checkExpB(exp) {
    switch (exp) {
        case 'generations':
            return 'generations'
        case 'xenonia':
            return 'xenonia'
        case 'darekMega':
            return 'Mega Evolution'
        case 'freeze':
            return 'freeze'
        case 'stadium':
            return 'stadium'
        case 'seasons':
            return 'seasons'
        case 'johtoWar':
            return 'Johto War'
        default:
            return 'base'
    }
}

//Funcion que devuelve la ruta de Expansion
function checkExp(exp) {
    switch (exp) {
        case 'generations':
            return 'javcov'
        case 'xenonia':
            return 'xenonia'
        case 'darekMega':
            return 'darekMega'
        case 'freeze':
            return 'freeze'
        case 'stadium':
            return 'stadium'
        case 'seasons':
            return 'seasons'
        case 'johtoWar':
            return 'johtoWar'
        default:
            return 'los'
    }
}

//Check if the card can be drawed checking skipCardDraws list
function checkCardDraw(pokemon) {
    draw = true
    skipCardDraws.forEach(dex => {
        if (pokemon.pokedex_number == dex || pokemon.pokedex_number == dex + '-shiny') {
            draw = false
        }
    });
    return draw
}

//Check the biome and climate box and change the preview of the selected values
function checkLocationBox() {
    const climateBoxChecks = document.getElementsByName('climate')
    const biomeBoxChecks = document.getElementsByName('biome')
    const selectLocations = document.getElementById('selectLocations')
    const biomeButton = document.getElementById('biomeButton')
    borrar(selectLocations)


    let climate = ''
    let biome = ''


    climateBoxChecks.forEach(e => {
        if (e.checked) {
            climate = e.value
        }
    });
    biomeBoxChecks.forEach(e => {
        if (e.checked) {
            biome = e.value
        }
    });


    if (climate == 'space' || climate == 'warm_ruins' || climate == 'cold_ruins' || climate == 'temperate_ruins' || climate == 'ancient_ruins' || climate == 'future_ruins') {
        selectLocations.appendChild(createImg('locat', climate, 'select-locations--item', '', 0))
        stateButton(biomeButton, 'dis')
    } else {
        if (biome != '') { selectLocations.appendChild(createImg('locat', biome, 'select-locations--item', '', 0)) }
        if (climate != '') {
            selectLocations.appendChild(createImg('locat', climate, 'select-locations--item', '', 0))
        }
        stateButton(biomeButton, 'en')

    }

}

//Check the rarity box and change the climate and biome buttons
function checkRarityBox() {
    const rarityBoxChecks = document.getElementsByName('rarity')
    const selectLocations = document.getElementById('selectLocations')
    const selectRarity = document.getElementById('selectRarity')
    const climateButton = document.getElementById('climateButton')
    const biomeButton = document.getElementById('biomeButton')
    borrar(selectRarity)

    let rarity = ''
    rarityBoxChecks.forEach(e => {
        if (e.checked) {
            rarity = e.value
        }
    });


    if (rarity == 'noble' || rarity == 'mega' || rarity == 'gigantamax' || rarity == 'fossil') {
        borrar(selectLocations)
        selectLocations.appendChild(createImg('icon', rarity, 'select-locations--item', '', 0))
        stateButton(climateButton, 'dis')
        stateButton(biomeButton, 'dis')
    } else {
        if (rarity != '') {
            selectRarity.appendChild(createImg('icon', rarity, 'select-display--item', '', 0))
        }

        if (selectLocations.hasChildNodes) {
            let node = selectLocations.lastChild ? selectLocations.lastChild.getAttribute('alt') : ''
            
            if (node == 'noble.png' || node == 'mega.png' || node == 'gigantamax.png' || node == 'fossil.png') {
                selectLocations.removeChild(selectLocations.lastChild)
            }
        }

        stateButton(climateButton, 'en')
        stateButton(biomeButton, 'en')
    }
}

//Check the trainer box to check all trainers from a group and change the climate and biome buttons
function checkTrainersBox() {
    const trainersBoxChecks = document.getElementsByName('trainer')
    const selectLocations = document.getElementById('selectLocations')
    const climateButton = document.getElementById('climateButton')
    const biomeButton = document.getElementById('biomeButton')
    
    borrar(selectLocations)
    let checkedValues = checkArray(trainersBoxChecks)

    if (trainersBoxChecks.length) {

        if(checkedValues.length > 0){
            selectLocations.appendChild(createImg('trainer', 'trainer', 'select-locations--item', '', 0))
            stateButton(climateButton, 'dis')
            stateButton(biomeButton, 'dis')
        } else {

            if (selectLocations.hasChildNodes) {
                let node = selectLocations.lastChild ? selectLocations.lastChild.getAttribute('alt') : ''
    
                if (node == 'galactic_team.png' || node == 'plasma_team.png' || 
                    node == 'aqua_team.png' || node == 'magma_team.png' || node == 'rocket_team.png' ||
                    node == 'trainer.png') {
                    selectLocations.removeChild(selectLocations.lastChild)
                }
            }
    
            stateButton(climateButton, 'en')
            stateButton(biomeButton, 'en')
        }

        trainersBoxChecks.forEach(option => {
            switch (option.value) {
                case 'galactic_team':
                    trainersBoxChecks.forEach(t => {
                        switch (t.value) {
                            case 'galactic_grunt':
                            case 'mars':
                            case 'jupiter':
                            case 'saturn':
                            case 'sird':
                            case 'cyrus':
                                if(option.checked){
                                    t.disabled = true
                                    t.checked = false
                                }else{
                                    t.disabled = false
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    break;
                case 'magma_team':
                    trainersBoxChecks.forEach(t => {
                        switch (t.value) {
                            case 'magma_grunt':
                            case 'tabitha':
                            case 'courtney':
                            case 'maxie':
                                if(option.checked){
                                    t.disabled = true
                                    t.checked = false
                                }else{
                                    t.disabled = false
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    break;
                case 'aqua_team':
                    trainersBoxChecks.forEach(t => {
                        switch (t.value) {
                            case 'aqua_grunt':
                            case 'matt':
                            case 'shelly':
                            case 'archie':
                                if(option.checked){
                                    t.disabled = true
                                    t.checked = false
                                }else{
                                    t.disabled = false
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    break;
                case 'plasma_team':
                    trainersBoxChecks.forEach(t => {
                        switch (t.value) {
                            case 'plasma_grunt':
                            case 'plasma_ace':
                            case 'colress':
                                if(option.checked){
                                    t.disabled = true
                                    t.checked = false
                                }else{
                                    t.disabled = false
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    break;
                case 'rocket_team':
                    trainersBoxChecks.forEach(t => {
                        switch (t.value) {
                            case 'rocket_grunt':
                            case 'rocket_ace':
                            case 'proton':
                            case 'ariana':
                            case 'archer':
                            case 'giovanni':
                                if(option.checked){
                                    t.disabled = true
                                    t.checked = false
                                }else{
                                    t.disabled = false
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    break;
                case 'trainer':
                    trainersBoxChecks.forEach(t => {
                        let rCheck = false

                        //Search if t is in the list of no trainers
                        notTrainers.forEach(t2 => {
                            rCheck = t.value == t2 ? true : rCheck                         
                        });

                        if(!rCheck){
                            if(option.checked){
                                t.disabled = true
                                t.checked = false
                            }else{
                                t.disabled = false
                            }
                        }
                    });
                break
                default:
                    break;
            }
        });
    }
}

//Check the move effect box and adds the preview of the selected values
function checkMoveEffectBox() {
    const moveEffectyBoxChecks = document.getElementsByName('moveEffect')
    const selectTypes = document.getElementById('selectEffect')
    borrar(selectTypes)

    let effect = ''
    moveEffectyBoxChecks.forEach(e => {
        if (e.checked) {
            effect = e.value
        }
    });

    if (effect != '') {
        selectTypes.appendChild(createImg('effect', effect, 'select-display--item', '', 0))
    }

}

//Check the types box and adds the preview of the selected values
function checkTypesBox() {
    const typesBoxChecks = document.getElementsByName('types')
    const selectTypes = document.getElementById('selectTypes')
    borrar(selectTypes)

    let types = []
    typesBoxChecks.forEach(e => {
        if (e.checked) {
            types.push(e.value)
        }
    });

    if (types.length) {
        types.forEach(type => {
            selectTypes.appendChild(createImg('type', type, 'select-display--item', '', 0))
        });
    }

}

//Check the archetypes box and adds the preview of the selected values
function checkArchetypesBox() {
    const archetypesBoxChecks = document.getElementsByName('archetype')
    const selectArchetypes = document.getElementById('selectArchetypes')
    selectArchetypes.classList.remove('select-display--arch')
    borrar(selectArchetypes)

    let archetypes = []
    archetypesBoxChecks.forEach(e => {
        if (e.checked) {
            archetypes.push(e.value)
        }
    });

    if (archetypes.length) {
        selectArchetypes.classList.add('select-display--arch')
        archetypes.forEach(archetype => {
            let imgDV = document.createElement('DIV')
            imgDV.classList.add('select-display--item')
            imgDV.classList.add('archetypes--' + archetype.replace(' ', '_'))

            selectArchetypes.appendChild(imgDV)
        });
    }

}

//Check the learn types box and adds the preview of the selected values
function checkLearnBox() {
    const typesBoxChecks = document.getElementsByName('learn')
    const selectLearn = document.getElementById('selectLearn')
    borrar(selectLearn)

    let types = []
    typesBoxChecks.forEach(e => {
        if (e.checked) {
            types.push(e.value)
        }
    });

    if (types.length) {
        types.forEach(type => {
            selectLearn.appendChild(createImg('type', type, 'select-display--item', '', 0))
        });
    }

}

//Check the move type box and adds the preview of the selected values
function checkMoveBox() {
    const typesBoxChecks = document.getElementsByName('moveType')
    const selectMove = document.getElementById('selectMove')
    borrar(selectMove)

    let types = []
    typesBoxChecks.forEach(e => {
        if (e.checked) {
            types.push(e.value)
        }
    });

    if (types.length) {
        types.forEach(type => {
            selectMove.appendChild(createImg('type', type, 'select-display--item', '', 0))
        });
    }

}

//Change the classes of a button to enable/disabled it
function stateButton(button, state) {
    switch (state) {
        case 'dis':
            button.classList.add('select-button--disabled')
            break;
        case 'en':
            button.classList.remove('select-button--disabled')
            break;
    }
}

//===================================== Others =========================================

function notFound() {
    const screen = document.getElementById('screen')
    let notFound = document.createElement('DIV')
    notFound.classList.add('notFound')
    notFound.appendChild(document.createTextNode('Not Found'))

    borrar(screen)
    screen.appendChild(notFound)
}

//Funcion que elimina todos los nodos hijos de un elemento
function borrar(e) {
    while (e.hasChildNodes()) {
        e.removeChild(e.firstChild);
    }
}

//Funcion ajax
function loadDoc(url, fun) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            fun(this);
        }
    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

//Funcion que recibe un select y le añade la lista de tipos Pokemon
function addSelect(list, options) {
    options.forEach(type => {
        let opt = document.createElement('OPTION')
        let text = document.createTextNode(firstUpperCase(type))

        opt.setAttribute('value', type)
        opt.appendChild(text)

        list.appendChild(opt)
    });
}

//Funcion que recibe un select y le añade la lista de tipos Pokemon
function addSelectBox(box, list, type, name, inputType) {
    let boxT = document.createElement('DIV')
    boxT.classList.add('select-boxT')

    list.forEach(value => {

        let sub = false
        if(value.includes('---')){
            value = value.replace('---', '')
            sub = true
        }


        let item = document.createElement('DIV')
        item.classList.add('select-item')
        if(sub){item.classList.add('select-item--sub')}

        if((!value.includes('team') && value != 'trainer') && type == 'trainer'){
            item.appendChild(createImg(type, value.replace(' ', '_')  + '_trainer', 'select--img', '', 0))
        }else{
            if(type == 'arch'){
                let imgDV = document.createElement('DIV')
                imgDV.classList.add('select--img')
                imgDV.classList.add('archetypes--' + value.replace(' ', '_'))

                item.appendChild(imgDV)
            }else{
                item.appendChild(createImg(type, value.replace(' ', '_'), 'select--img', '', 0))
            }
        }


        let inp = document.createElement('INPUT')
        inp.setAttribute('type', inputType)
        inp.setAttribute('name', name)
        inp.value = value.replace(' ', '_')
        inp.id = 'search' + firstUpperCase(name) + firstUpperCase(value.replace(' ', '_'))

        item.appendChild(inp)

        let label = document.createElement('LABEL')
        label.setAttribute('for', 'search' + firstUpperCase(name) + firstUpperCase(value.replace(' ', '_')))
        label.classList.add('select--title')
        label.appendChild(document.createTextNode(firstUpperCase(value)))

        item.appendChild(label)

        boxT.appendChild(item)
    });

    if(name == 'rarity'){
        let item = document.createElement('DIV')
        item.classList.add('select-radio')

        let attr = ['only', 'anything', 'none']

        attr.forEach(a => {
            let div = document.createElement('DIV')
            div.classList.add('select-radio--item')
            div.id = 'searchShiny'+firstUpperCase(a)+"Item"

            let inp = document.createElement('INPUT')
            inp.setAttribute('type', 'radio')
            inp.setAttribute('name', 'shiny')
            inp.value = a
            inp.id = 'searchShiny'+firstUpperCase(a)
            if(a == 'anything'){
                inp.checked = true
            }
    
            div.appendChild(inp)
    
            let label = document.createElement('LABEL')
            label.setAttribute('for', 'searchShiny'+firstUpperCase(a))
            label.classList.add('select--title')
            label.appendChild(document.createTextNode(firstUpperCase(a)))
    
            div.appendChild(label)
            item.appendChild(div)
        
        });

        boxT.appendChild(item)
        
    }
    box.appendChild(boxT)
    
}

//Funcion para convertir la primera letra de un string a mayuscula
function firstUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Funcion para habilitar o deshabilitar el segundo select
function disableSelect(select1, select2) {
    if (select1.value == 'none') {
        select2.disabled = true
        select2.value = 'none'
    } else {
        select2.disabled = false
    }
}

//Funcion para habilitar o deshabilitar conjuntos de select
function disableGroupSelect(select1, select2, select3, select4) {
    if (select1.value == 'none') {
        select2.disabled = true
        select3.disabled = true
        select4.disabled = true
        select2.value = 'none'
        select3.value = 'none'
        select4.value = 'none'
    } else {
        select2.disabled = false
        if (select2.value == 'none') {
            select3.disabled = true
            select4.disabled = true
            select3.value = 'none'
            select4.value = 'none'
        } else {
            select3.disabled = false
            if (select3.value == 'none') {
                select4.disabled = true
                select4.value = 'none'
            } else {
                select4.disabled = false
            }
        }
    }
}

//Funcion que devuelve una IMG creada
function createImg(type, name, clas, expansion, dexNumber) {
    let image = document.createElement('IMG')
    if (clas != '') {
        let clases = clas.split(' ')
        clases.forEach(e => {
            image.classList.add(e)
        });
    }

    switch (type) {
        case 'poke':
            let imgSrc = 'assets/img/pokemon/' + checkExp(expansion) + '/' + name + '.png'
            let imgSrcGeneral = 'assets/img/pokemon/' + name + '.png'
            if(dexNumber.includes('-shiny')){image.classList.add('shinyCard')}

            image.src = searchDexExceptions(dexNumber, expansion) ? imgSrc : imgSrcGeneral

            break;
        case 'icon':
            image.src = 'assets/img/icons/' + name + '.png'
            if (name.includes('_')) {
                name = name.split('_')
                name = firstUpperCase(name[1]) + ' ' + firstUpperCase(name[0])
            }
            image.title = firstUpperCase(name)
            break;
        case 'trainer':
            image.src = 'assets/img/icons/trainers/' + name + '.png'
            if (name.includes('_')) {
                name = name.split('_')
                let tName = ''

                name.forEach(n => {
                    tName += firstUpperCase(n) + " "
                });

                name = tName.trimEnd()
            }
            image.title = firstUpperCase(name)
            break;
        case 'type':
            image.src = 'assets/img/types/' + name + '.png'
            image.title = firstUpperCase(name)
            break;
        case 'locat':
            image.src = 'assets/img/icons/location/' + name + '.png'
            image.title = firstUpperCase(name)
            break;
        case 'exp':
            image.src = 'assets/img/icons/expansions/' + name + '.png'
            image.title = firstUpperCase(expansion)
            break;
        case 'effect':
            image.src = 'assets/img/icons/effects/' + name + '.png'
            image.title = firstUpperCase(expansion)
            break;
    }

    image.alt = name + '.png'


    return image
}

//Funcion que devuelve el array ordenando por pokedex_number
function sortByDexNumber(searchList) {
    searchList.sort(((a, b) =>
        fixDexNumber(a.pokedex_number) - fixDexNumber(b.pokedex_number)
    ));

    return searchList
}

//Funcion que elimina modificadores del pokedex_number
function fixDexNumber(dexNumber) {
    return dexNumber.toString().split('-')[0]
}

//Fixes the archetype name
function fixArchetype(archetype){
    let fixArch = archetype.split(' ')

    switch (fixArch.length) {
        case 2:
            if(fixArch[1] == 'all'){
                fixArch = fixArch[0]+'_'+fixArch[1]
            }else{
                fixArch = fixArch[0]
            }
            break;
    
        default:
            fixArch = fixArch[0]
            break;
    }

    return fixArch
}

//Crea el offset y el close button al abrir un selectBox
function setSelect() {
    const form = document.getElementById('form')
    const search = document.getElementById('search')
    form.classList.add('form--noOverflow')
    form.scrollTop = 0

    let selectCloseDv = document.createElement('DIV')
    selectCloseDv.id = 'selectClose'
    selectCloseDv.classList.add('select-close')

    let selectOffDv = document.createElement('DIV')
    selectOffDv.id = 'selectOff'
    selectOffDv.classList.add('select-offSet')

    form.appendChild(selectCloseDv)
    search.appendChild(selectOffDv)

    const selectOff = document.getElementById('selectOff')
    const selectClose = document.getElementById('selectClose')

    selectOff.addEventListener('click', (e) => {
        closeBox('')
        e.target.parentNode.removeChild(e.target)
        selectClose.parentNode.removeChild(selectClose)
        form.classList.remove('form--noOverflow')
    })

    selectClose.addEventListener('click', (e) => {
        closeBox('')
        e.target.parentNode.removeChild(e.target)
        selectOff.parentNode.removeChild(selectOff)
        form.classList.remove('form--noOverflow')
    })


}

//Cierra todas las select-box excepto la pasada por valor
function closeBox(skip) {
    const allBox = Array.from(document.getElementsByClassName('select-box'))

    allBox.forEach(box => {
        if (box != skip && box.classList.contains('select-box--shown')) {
            box.classList.remove('select-box--shown')
        }
    });
}

//Deshabilita el resto de checkbox si hay mas o igual que el maxNumber
function boxNabled(checks, maxNumber) {
    let n = 0;

    checks.forEach(c => {
        n = c.checked ? n + 1 : n
    });

    if (n >= maxNumber) {
        checks.forEach(c => {
            if (!c.checked) {
                c.disabled = true
            }
        });
    } else {
        checks.forEach(c => {
            if (c.disabled) {
                c.disabled = false
            }
        });
    }
}

//Deshabilita otras box dependiendo el valor
function boxDisabled(box, type) {
    const climateBoxChecks = document.getElementsByName('climate')
    const biomeBoxChecks = document.getElementsByName('biome')

    switch (type) {
        case 'rarity':
            let checkRar = false
            if (box != '') {
                box.forEach(b => {
                    if (b.value == 'noble' || b.value == 'mega' || b.value == 'gigantamax' || b.value == 'fossil') {
                        checkRar = b.checked ? true : checkRar
                    }
                });
            }

            if (checkRar) {
                disableBox(climateBoxChecks)
                disableBox(biomeBoxChecks)
            } else {
                enableBox(climateBoxChecks, 1)
                enableBox(biomeBoxChecks, 1)
            }
            break;
        case 'location':
            let checkLocat = false
            if (box != '') {
                box.forEach(b => {
                    if (b.value == 'space' || b.value == 'warm_ruins' || b.value == 'cold_ruins' || b.value == 'temperate_ruins' || b.value == 'ancient_ruins' || b.value == 'future_ruins') {
                        checkLocat = b.checked ? true : checkLocat
                    }
                });
            }

            if (checkLocat) {
                disableBox(biomeBoxChecks)
            } else {
                enableBox(biomeBoxChecks, 1)
            }
            break
    }
}

//Funcion que activa los checkbox de los selectBox
function enableBox(box, maxEnabled) {
    box.forEach(b => {
        if (b.disabled) {
            b.disabled = false;
        }
    });
    boxNabled(box, maxEnabled)
}

//Funcion que desactiva los checkbox de los selectBox
function disableBox(box) {
    box.forEach(b => {
        if (b.checked) {
            b.checked = false
        }
        if (!b.disabled) {
            b.disabled = true;
        }
    });
}

function onlyUnique(value, index, array) {
    return self.indexOf(value) === index;
}

//Funcion que devuelve un array de objetos con sin duplicados
function onlyUniqueObjects(array) {
    let set = new Set(array.map(JSON.stringify))
    return Array.from(set).map(JSON.parse)
}

function newProp(array, prop, value) {
    array.forEach(e => {
        if (typeof e === 'object') {

            Object.defineProperty(e, prop, {
                value: value,
                writable: true,
                enumerable: true,
                configurable: true
            });

        }
    })
    return array
}

//Funcion que arregla el contardor al buscar eliminando las formas alternas
function fixCount(pokemonData) {
    let count = 0

    pokemonData.forEach(p => {
        let add = true

        skipCardDraws.forEach(skip => {
            add = p.pokedex_number == skip || p.pokedex_number == skip + '-shiny' ? false : add
        });

        count = add ? count + 1 : count
    });

    return count
}

//Funcion que cambia el estado de selected en las opciones de distinta forma
function setOptions(option, refMod) {
    const optionsList = document.getElementsByClassName('pokeForms-option')

    Array.from(optionsList).forEach(e => {
        const refModB = e.getAttribute('boxtarget').split('-')[0]
        if (e.getAttribute('boxtarget') == option.getAttribute('boxtarget')) {
            e.classList.add('pokeForms-option--selected')
        } else {
            if (refMod == refModB) {
                e.classList.remove('pokeForms-option--selected')
            }
        }
    })

}

//Ordena las expansiones, eliminando duplicados y dejando el base primero
function sortExpansions(expansions) {
    sorted = [...new Set(expansions)]

    let deleteIndex = null

    if(sorted.find((e) => e == 'base') && sorted[0] != 'base'){
        
        sorted.forEach((e, i) => {
            if(e == 'base'){
                deleteIndex = i
            }
        })
        
        sorted.splice(deleteIndex, 1)
        sorted = sorted.length > 1 ? sorted.sort() : sorted
        sorted.unshift('base')
        
    }

    return sorted
}