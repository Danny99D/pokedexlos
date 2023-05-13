let countClickBayleef = 0;

//Needs same attack and image, different stats and not noble form
let skipCardDraws = [
    '412-sc', '412-tc', // Burmy
    '413-sc', '413-tc', // Wormadam
    '521-f', // Unfezant
    '550-bb', '550-bw', // Basculin
    '585-su', '585-au', '585-wi', // Deerling
    '586-su', '586-au', '586-wi', //Sawsbuck
    '592-f', // Frillish
    '593-f', // Jellicent
    '710-ps', '710-pl', '710-pp', // Pumpkaboo
    '711-ps', '711-pl', '711-pp', // Gourgeist
    '774-mr', '774-mo', '774-my', '774-mb', '774-mi', '774-mv', // Minior
    '849-tl', '849-tgl', // Toxtricity
    '902-f', // Basculegion
    '925-mt', // Maushold
    '931-sb', '931-sy', '931-sw', // Squawkabilly
    '978-td', '978-ts', // Tatsugiri
    '982-dt' // Dudunsparce
]

const generationDex = [
    [0, 151],
    [152, 251],
    [252, 386],
    [387, 493],
    [494, 649],
    [650, 721],
    [722, 809],
    [810, 905],
    [906, 1100] //Max provisional
]

//===================================== Search =========================================
function searchByDex(pokemonData, dexNumber, expansion) {
    let pokeSearch = []
    let back = '';

    pokemonData.find((pokeObj) => {
        if (pokeObj.pokedex_number == dexNumber) {
            pokeSearch.push(pokeObj)
        }
    })

    back = pokeSearch.length ? pokeSearch[0] : 404

    if (pokeSearch.length > 1) {
        pokeSearch.find((pokeObj) => {
            if (pokeObj.expansion == expansion) {
                back = pokeObj
            }
        })
    }

    return back
}

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

function searchByRarity(pokemonData, rarity) {
    let pokemonSearch = []

    if (rarity != '') {
        switch (rarity) {
            case 'galactic':
                pokemonData.find((pokeObj) => {
                    if ((pokeObj.encounter_tier.toLowerCase() == 'grunt') ||
                        (pokeObj.encounter_tier.toLowerCase() == 'commander') ||
                        (pokeObj.encounter_tier.toLowerCase() == 'boss')) {
                        pokemonSearch.push(pokeObj)
                    }
                })
                break;
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
                    if ((pokeClimate != 'mega') && (pokeClimate != 'noble') && (pokeClimate != 'gigamax')) {
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

function searchByMoveStrength(pokemonData, moveStrength) {
    let pokemonSearch = []

    if (moveStrength > -1) {
        let modStrength = moveStrength == 0 ? '?' : moveStrength
        pokemonData.find((pokeObj) => {
            if (pokeObj.move_attack_strength == modStrength) {
                pokemonSearch.push(pokeObj)
            }
        })
    }

    return pokemonSearch
}

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

function searchByClimate(pokemonData, climate) {
    let pokemonSearch = []

    if (climate != '') {
        pokemonData.find((pokeObj) => {
            if (pokeObj.hasOwnProperty('climate')) {
                if (pokeObj.climate.toLowerCase() == climate) {
                    pokemonSearch.push(pokeObj)
                }
            }
        })
    }

    return pokemonSearch
}

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

function searchByGenerations(pokemonData, generations, rarity) {
    let pokemonSearch = []

    pokemonData.find((pokeObj) => {
        genOk = false
        generations.forEach(generation => {
            let minDex = generationDex[generation]
            let maxDex = generationDex[generation]

            if ((fixDexNumber(pokeObj.pokedex_number) >= minDex[0]) && (fixDexNumber(pokeObj.pokedex_number) <= maxDex[1])) {
                if (rarity == 'galactic') {
                    genOk = true
                } else {
                    if (pokeObj.pokedex_number.toString().indexOf('-gl') < 0 && pokeObj.pokedex_number.toString().indexOf('-x') < 0) {
                        genOk = true
                    }
                }
            }
        })
        if (genOk) {
            pokemonSearch.push(pokeObj)
        }
    });

    return pokemonSearch
}

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

function searchPokemon(pokemonData) {
    const pokemonName = document.getElementById('pokemonName').value
    const pokemonMoveName = document.getElementById('pokemonMoveName').value
    const pokemonMoveStrength = document.getElementById('pokemonMoveStrength').value ? document.getElementById('pokemonMoveStrength').value : -1
    const pokemonHealth = document.getElementById('pokemonHealth').value ? document.getElementById('pokemonHealth').value : 0
    const pokemonInitiative = document.getElementById('pokemonInitiative').value ? document.getElementById('pokemonInitiative').value : 0
    const pokemonEvoCost = document.getElementById('pokemonEvoCost').value ? document.getElementById('pokemonEvoCost').value : 0
    const searchByGen = document.getElementById('searchByGen').checked

    const searchExpansionsBox = document.getElementsByName('searchExpansions')
    const searchGenerationsBox = document.getElementsByName('searchGenerations')
    const pokemonRarityBox = document.getElementsByName('rarity')
    const pokemonTypesBox = document.getElementsByName('types')
    const pokemonMoveTypeBox = document.getElementsByName('moveType')
    const pokemonClimateBox = document.getElementsByName('climate')
    const pokemonBiomeBox = document.getElementsByName('biome')
    const pokemonLearnBox = document.getElementsByName('learn')
    const pokemonMoveEffect = document.getElementsByName('moveEffect')

    const searchExpansions = checkArray(searchExpansionsBox)
    const searchGenerations = checkArray(searchGenerationsBox)
    const pokemonTypes = checkArray(pokemonTypesBox)
    const pokemonLearn = checkArray(pokemonLearnBox)
    const pokemonMoveTypeA = checkArray(pokemonMoveTypeBox)
    const pokemonRarityA = checkArray(pokemonRarityBox)
    const pokemonBiomeA = checkArray(pokemonBiomeBox)
    const pokemonClimateA = checkArray(pokemonClimateBox)
    const pokemonMoveEffectA = checkArray(pokemonMoveEffect)

    const screen = document.getElementById('screen')
    if (screen.classList.contains('screen--noScroll')) {
        screen.classList.remove('screen--noScroll')
    }



    if (checkSearch(pokemonName, pokemonRarityA, pokemonTypes, pokemonMoveName, pokemonMoveTypeA, pokemonMoveStrength, pokemonHealth, pokemonInitiative, pokemonEvoCost, pokemonClimateA, pokemonBiomeA, pokemonLearn, searchExpansions, searchGenerations, searchByGen, pokemonMoveEffectA)) {
        let searchList = pokemonData
        const pokemonRarity = pokemonRarityA.length ? pokemonRarityA[0] : ''
        const pokemonBiome = pokemonBiomeA.length ? pokemonBiomeA[0] : ''
        const pokemonClimate = pokemonClimateA.length ? pokemonClimateA[0] : ''
        const pokemonMoveType = pokemonMoveTypeA.length ? pokemonMoveTypeA[0] : ''
        const pokemonMoveEffect = pokemonMoveEffectA.length ? pokemonMoveEffectA[0] : ''

        // Busca por tipo1 y tipo2
        searchList = pokemonTypes.length ? searchByType(searchList, pokemonTypes) : searchList


        // Busca pokemon por nombre
        searchList = pokemonName != '' ? searchByName(searchList, pokemonName) : searchList

        // Busca pokemon por vida
        searchList = pokemonHealth > 0 ? searchByHealth(searchList, pokemonHealth) : searchList

        // Busca pokemon por inicitiva
        searchList = pokemonInitiative > 0 ? searchByInitiative(searchList, pokemonInitiative) : searchList

        // Busca pokemon por bioma
        searchList = pokemonBiome != '' && pokemonRarity != 'noble' && pokemonRarity != 'mega' && pokemonRarity != 'gigamax' ? searchByBiome(searchList, pokemonBiome) : searchList

        // Busca pokemon por clima
        if (pokemonRarity == 'noble' || pokemonRarity == 'mega' || pokemonRarity == 'gigamax') {
            searchList = searchByClimate(searchList, pokemonRarity)
        } else {
            searchList = pokemonClimate != '' ? searchByClimate(searchList, pokemonClimate) : searchList
        }


        // Busca pokemon por rareza
        searchList = pokemonRarity != '' && pokemonRarity != 'noble' && pokemonRarity != 'mega' && pokemonRarity != 'gigamax' ? searchByRarity(searchList, pokemonRarity) : searchList

        // Busca pokemon por nombre del ataque
        searchList = pokemonMoveName != '' ? searchByMoveName(searchList, pokemonMoveName) : searchList

        // Busca pokemon por tipo del ataque
        searchList = pokemonMoveType != '' ? searchByMoveType(searchList, pokemonMoveType) : searchList

        // Busca pokemon por fuerza del ataque
        searchList = pokemonMoveStrength > -1 ? searchByMoveStrength(searchList, pokemonMoveStrength) : searchList

        // Busca pokemon por coste de evolucion
        searchList = pokemonEvoCost > 0 ? searchByEvoCost(searchList, pokemonEvoCost) : searchList

        // Busca pokemon por tipos de ataque aprendibles
        searchList = pokemonLearn.length ? searchByLearnTypes(searchList, pokemonLearn) : searchList

        // Busca pokemon por efectos del ataque
        searchList = pokemonMoveEffect.length ? searchByMoveEffect(searchList, pokemonMoveEffect) : searchList


        // Busca pokemon por expansion
        searchList = searchByExpansion(searchList, searchExpansions)

        // Busca pokemon por generacion
        searchList = searchByGenerations(searchList, searchGenerations, pokemonRarity)

        // Ordena la lista por pokedex_number
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

function searchOtherForms(pokemonData, dexNumber, expansion) {
    let otherForms = []

    pokemonData.forEach(pokemon => {
        if ((fixDexNumber(pokemon.pokedex_number) == fixDexNumber(dexNumber)) && dexNumber != pokemon.pokedex_number) {
            otherForms.push(pokemon)
        }
    });

    return otherForms
}

//Funcion que busca las evoluciones de un pokemon
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

//===================================== Draw =========================================

//Funcion para dibujar una carta
function drawPokemonCard(pokemon) {
    let sdcard = document.createElement('DIV')
    sdcard.classList.add('sdcard')
    sdcard.setAttribute('dexnumber', pokemon.pokedex_number)
    sdcard.setAttribute('expansion', pokemon.expansion)

    //---------sdcard Title
    let dvCardTitle = document.createElement('DIV')
    dvCardTitle.classList.add('sdcard-title')

    let div = document.createElement('DIV')
    div.classList.add('flex')
    div.classList.add('flex--sa')

    if (pokemon.hasOwnProperty('type_1') && pokemon.type_1 != '') {
        div.appendChild(createImg('type', pokemon.type_1, 'sdcard-type', pokemon.expansion))
    } else {
        div.appendChild(createImg('type', 'typeless', 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('type_2') && pokemon.type_2 != '') {
        div.appendChild(createImg('type', pokemon.type_2, 'sdcard-type', pokemon.expansion))
    }

    dvCardTitle.appendChild(div)

    let pName = document.createElement('P')
    pName.classList.add('sdcard-name')
    pName.appendChild(document.createTextNode(pokemon.pokedex_name))

    dvCardTitle.appendChild(pName)
    dvCardTitle.appendChild(createImg('icon', checkRarity(pokemon.encounter_tier), 'sdcard-type sdcard-type--last', pokemon.expansion))

    dvCardTitle.appendChild(createImg('exp', checkExp(pokemon.expansion), 'expansions--img expansions--img--sm', pokemon.expansion))


    //---------sdcard Info
    let dvCardInfo = document.createElement('DIV')
    dvCardInfo.classList.add('sdcard-info')

    dvCardInfo.appendChild(createImg('poke', checkDexNumber(pokemon.pokedex_number), 'sdcard-info--img', pokemon.expansion))

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
    dvInfo.appendChild(checkBioClim(modClimate, modBiome, 'sdcard-info--location'))

    //Poke Learn Moves
    let dvLearn = document.createElement('DIV')
    dvLearn.classList.add('sdcard-info--learn')

    if (pokemon.hasOwnProperty('move_1') && pokemon.move_1 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_1, 'sdcard-type', pokemon.expansion))
    } else {
        dvLearn.appendChild(createImg('type', 'typeless', 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_2') && pokemon.move_2 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_2, 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_3') && pokemon.move_3 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_3, 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_4') && pokemon.move_4 != '') {
        dvLearn.appendChild(createImg('type', pokemon.move_4, 'sdcard-type', pokemon.expansion))
    }

    dvInfo.appendChild(dvLearn)
    dvCardInfo.appendChild(dvInfo)


    //---------sdcard Move
    let dvCardMove = document.createElement('DIV')
    dvCardMove.classList.add('sdcard-moveInfo')

    dvCardMove.appendChild(createImg('type', pokemon.move_type, 'sdcard-type', pokemon.expansion))

    let pMoveName = document.createElement('P')
    pMoveName.classList.add('sdcard-moveInfo--name')
    pMoveName.appendChild(document.createTextNode(pokemon.move_name))
    dvCardMove.appendChild(pMoveName)

    let pStrength = document.createElement('DIV')
    pStrength.classList.add('sdcard-moveInfo--strength')
    pStrength.appendChild(document.createTextNode(pokemon.move_attack_strength))
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
function drawPokemonInfo(pokemonData, dexNumber, expansion, scrollVar) {
    const screen = document.getElementById('screen')
    const pokemon = searchByDex(pokemonData, dexNumber, expansion)

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
    dvCardTypes.appendChild(createImg('exp', checkExp(pokemon.expansion), 'cardInfo-type cardInfo-type--round', pokemon.expansion))

    if (pokemon.hasOwnProperty('type_1') && pokemon.type_1 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_1, 'cardInfo-type', pokemon.expansion))
    } else {
        dvCardTypes.appendChild(createImg('type', 'typeless', 'cardInfo-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('type_2') && pokemon.type_2 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_2, 'cardInfo-type', pokemon.expansion))
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
    let imgPoke = createImg('poke', checkDexNumber(pokemon.pokedex_number), 'cardInfo-info--img', pokemon.expansion)
    imgPoke.id = 'pokeImg'
    dvDataBox.appendChild(imgPoke)

    //Poke Description
    let dvCardDesc = document.createElement('DIV')
    dvCardDesc.classList.add('cardInfo-description')

    modRarity = checkRarity(pokemon.encounter_tier)
    dvCardDesc.appendChild(createImg('icon', modRarity, 'cardInfo-type cardInfo-type--sm', pokemon.expansion))

    if (pokemon.hasOwnProperty('description') && pokemon.description != '') {
        let pDesc = document.createElement('P')
        pDesc.appendChild(document.createTextNode(pokemon.description))

        dvCardDesc.appendChild(pDesc)
    }

    dvDataBox.appendChild(dvCardDesc)
    dvCardData.appendChild(dvDataBox)

    //Poke Info
    let dvInfoBox = document.createElement('DIV')
    dvInfoBox.classList.add('cardInfo-box')

    //Poke Stats
    let dvStats = document.createElement('DIV')
    dvStats.classList.add('cardInfo-info--stats')

    let dvHealth = document.createElement('DIV')
    dvHealth.classList.add('sdcard-info--health')
    dvHealth.appendChild(document.createTextNode(pokemon.health))
    dvStats.appendChild(dvHealth)

    let dvInit = document.createElement('DIV')
    dvInit.classList.add('sdcard-info--initiative')
    dvInit.appendChild(document.createTextNode(pokemon.initiative))
    dvStats.appendChild(dvInit)

    //Poke Learn Moves
    let dvLearn = document.createElement('DIV')
    dvLearn.classList.add('cardInfo-info--learn')

    let div = document.createElement('DIV')

    if (pokemon.hasOwnProperty('move_1') && pokemon.move_1 != '') {
        div.appendChild(createImg('type', pokemon.move_1, 'cardInfo-type--sm', pokemon.expansion))
    } else {
        div.appendChild(createImg('type', 'typeless', 'cardInfo-type--sm', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_2') && pokemon.move_2 != '') {
        div.appendChild(createImg('type', pokemon.move_2, 'cardInfo-type--sm', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_3') && pokemon.move_3 != '') {
        div.appendChild(createImg('type', pokemon.move_3, 'cardInfo-type--sm', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_4') && pokemon.move_4 != '') {
        div.appendChild(createImg('type', pokemon.move_4, 'cardInfo-type--sm', pokemon.expansion))
    }


    dvLearn.appendChild(div)

    //Poke Location
    let dvLocat = document.createElement('DIV')
    dvLocat.classList.add('cardInfo-info--location')

    modClimate = pokemon.hasOwnProperty('climate') ? pokemon.climate.toLowerCase() : ''
    modBiome = pokemon.hasOwnProperty('biome') ? pokemon.biome.toLowerCase() : ''

    dvLocat.appendChild(checkBioClim(modClimate, modBiome, ''))

    dvInfoBox.appendChild(dvStats)
    dvInfoBox.appendChild(dvLearn)
    dvInfoBox.appendChild(dvLocat)

    //Poke Evo Cost
    if (pokemon.hasOwnProperty('evolve_cost') && pokemon.evolve_cost.toString() != '') {
        let dvEvol = document.createElement('DIV')
        dvEvol.classList.add('cardInfo-info--evolution')

        div = document.createElement('DIV')
        div.appendChild(document.createTextNode(pokemon.evolve_cost))

        dvEvol.appendChild(div)
        dvInfoBox.appendChild(dvEvol)
    }

    dvCardData.appendChild(dvInfoBox)

    //------------cardMove
    let dvCardMove = document.createElement('DIV')
    dvCardMove.classList.add('cardInfo-move')

    dvCardMove.appendChild(createImg('type', pokemon.move_type, 'cardInfo-type--sm', pokemon.expansion))

    let pMoveName = document.createElement('P')
    pMoveName.classList.add('sdcard-moveInfo--name')
    pMoveName.appendChild(document.createTextNode(pokemon.move_name))
    dvCardMove.appendChild(pMoveName)

    let pStrength = document.createElement('DIV')
    pStrength.classList.add('sdcard-moveInfo--strength')
    pStrength.appendChild(document.createTextNode(pokemon.move_attack_strength))
    dvCardMove.appendChild(pStrength)

    let pMoveDesc = document.createElement('P')
    pMoveDesc.classList.add('cardInfo-move--description')
    pMoveDesc.appendChild(document.createTextNode(pokemon.move_effect))
    dvCardMove.appendChild(pMoveDesc)

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
    cardInfo.appendChild(dvCardMove)

    //------------cardForms
    let otherForms = searchOtherForms(pokemonData, pokemon.pokedex_number, pokemon.expansion)

    if (otherForms.length) {
        cardInfo.appendChild(drawVariations(otherForms, 'form'))

        const forms = document.getElementById('cardForms')

        forms.addEventListener('click', (e) => {
            if (e.target.hasAttribute('dexnumber')) {
                borrar(cardInfo)
                drawPokemonInfo(pokemonData, e.target.getAttribute('dexNumber'), e.target.getAttribute('expansion'), scrollVar)
            }
        })
    }

    //------------cardEvol
    let evolLine = searchEvolution(pokemonData, pokemon)

    if (evolLine.length) {
        cardInfo.appendChild(drawVariations(evolLine, 'evol'))

        const evols = document.getElementById('cardEvols')

        evols.addEventListener('click', (e) => {
            if (e.target.hasAttribute('dexnumber')) {
                borrar(cardInfo)
                drawPokemonInfo(pokemonData, e.target.getAttribute('dexNumber'), e.target.getAttribute('expansion'), scrollVar)
            }
        })
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

    //Variations
    const boxOptions = document.getElementsByClassName('pokeForms-option')
    const boxScreens = document.getElementsByClassName('pokeForms-box')

    //Si se encuentran Options y Screens añade listeners de Click a los elementos Option
    if (boxOptions && boxScreens) {
        //Recorre el array de Options asignandoles el evento Click
        Array.from(boxOptions).forEach(option => {
            option.addEventListener('click', (e) => {

                //const con la referencia a la box que mostrar
                const refBox = e.target.getAttribute('boxTarget')

                //Const con la referencia al tipo de box (form | evol)
                const refMod = refBox.split('-')[0]

                //Le pone la clase selected para mejor visual
                setOptions(e.target, refMod)

                //Recorre el array de Screens para cambiar las clases
                Array.from(boxScreens).forEach(box => {

                    //Si la Screen tiene el mismo Target que la Option cambia las clases de las Screen
                    if (box.getAttribute('boxTarget') == refBox) {

                        //Añade la clase para mostrar la Screen
                        box.classList.add('pokeForms-box--show')

                        //Recorre de nuevo el array de Screens para quitar la clase de mostrar del resto de Screen
                        Array.from(boxScreens).forEach(box => {

                            //Variable que guarda el atributo Target de la Screen
                            let boxTarget = box.hasAttribute('boxTarget') ? box.getAttribute('boxTarget') : ''

                            //Si la Screen es distinta a la Screen mostrada y son del mismo tipo de box les elimina la clase mostrar
                            if (box.getAttribute('boxTarget') != refBox &&
                                boxTarget != '' &&
                                boxTarget.split('-')[0] == refMod) {
                                box.classList.remove('pokeForms-box--show')
                            }
                        })
                    }

                })

            })
        });
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
        screen.classList.remove('screen--noScroll')
    })
}

//Funcion que dibuja la forma de un pokemon
function drawPokemonForm(pokemon, mod) {
    let dvForm = document.createElement('DIV')
    dvForm.classList.add('pokeForm')
    dvForm.setAttribute('dexnumber', pokemon.pokedex_number)
    dvForm.setAttribute('expansion', pokemon.expansion)

    let imgPoke = createImg('poke', checkDexNumber(pokemon.pokedex_number), 'pokeForm--img', pokemon.expansion)
    let imgExp = createImg('exp', checkExp(pokemon.expansion), 'pokeForm--expansion', pokemon.expansion)

    //cardTitle
    let dvCardTitle = document.createElement('DIV')
    dvCardTitle.classList.add('pokeForm--title')

    let dvCardTypes = document.createElement('DIV')
    dvCardTypes.classList.add('pokeForm--types')

    if (pokemon.hasOwnProperty('type_1') && pokemon.type_1 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_1, 'cardInfo-type pokeForm--type', pokemon.expansion))
    } else {
        dvCardTypes.appendChild(createImg('type', 'typeless', 'cardInfo-type pokeForm--type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('type_2') && pokemon.type_2 != '') {
        dvCardTypes.appendChild(createImg('type', pokemon.type_2, 'cardInfo-type pokeForm--type', pokemon.expansion))
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

//Funcion que dibuja las diferentes variaciones del pokemon
function drawVariations(otherForms, mod, pokemonName) {

    //Crea un div que contendra los elementos
    let cardForms = document.createElement('DIV')
    cardForms.classList.add('pokeForms')
    cardForms.id = 'card' + firstUpperCase(mod) + 's'

    //Crea un array con las diferentes expansiones encontradas
    let expansions = []
    otherForms.forEach(e => { expansions.push(e.expansion) });

    //Elimina duplicados del array
    expansions = [...new Set(expansions)]

    //Crea las box para las Options y Screens
    let boxOpts = document.createElement('DIV')
    boxOpts.classList.add('pokeForms-options')

    let boxScreen = document.createElement('DIV')
    boxScreen.classList.add('pokeForms-screen')

    //Comprueba si hay mas de una expansion
    if (expansions.length > 1) {

        //Recorre el array de expansiones creando las diferentes Options
        expansions.forEach((exp, i) => {
            let boxOpt = document.createElement('DIV')
            boxOpt.classList.add('pokeForms-option')
            if (i == 0) { boxOpt.classList.add('pokeForms-option--selected') }
            boxOpt.id = exp + firstUpperCase(exp)

            //Les añade un atributo para refenciar la Option y la Screen
            boxOpt.setAttribute('boxTarget', mod + '-' + exp)

            boxOpt.appendChild(createImg('exp', checkExp(exp), 'pokeForms-option--img', ''))

            boxOpt.appendChild(document.createTextNode(firstUpperCase(checkExpB(exp))))
            boxOpts.appendChild(boxOpt)
        });

        cardForms.appendChild(boxOpts)

        //Recorre el array de expansiones creando las distintas Screens
        expansions.forEach((exp, i) => {

            let boxForm = document.createElement('DIV')
            boxForm.classList.add('pokeForms-box')

            //Si es la primera Screen le añade la clase para mostrar
            if (i == 0) { boxForm.classList.add('pokeForms-box--show') }

            //Les añade un atributo para refenciar la Option y la Screen
            boxForm.setAttribute('boxTarget', mod + '-' + exp)

            //Recorre el array con las otras formas y añade los pokemon por su expansion
            otherForms.forEach(form => {
                if (form.expansion == exp) {
                    let dvForm = drawPokemonForm(form, mod, pokemonName)

                    boxForm.appendChild(dvForm)
                }
            });
            boxScreen.appendChild(boxForm)

        });
    } else {

        //Si solo hay una expansion, ignora las Options y crea una Screen
        let boxForm = document.createElement('DIV')
        boxForm.classList.add('pokeForms-box')
        boxForm.classList.add('pokeForms-box--show')

        otherForms.forEach(form => {
            boxForm.appendChild(drawPokemonForm(form, mod, pokemonName))
        });

        boxScreen.appendChild(boxForm)
    }

    cardForms.appendChild(boxScreen)

    return cardForms
}

//===================================== Check =========================================

//Funcion que devuelve una imagen dependiendo el bioma y clima
function checkBioClim(modClimate, modBiome, clas) {
    switch (modClimate) {
        case 'noble':
        case 'mega':
        case 'gigamax':
            return createImg('icon', modClimate.toLowerCase(), clas, '')
        case 'space':
            return createImg('icon', 'unknown', clas, '')
        default:
            if (modBiome == 'ruins') {
                return createImg('icon', 'unknown', clas, '')
            } else {
                return createImg('icon', modClimate.toLowerCase() + '_' + modBiome.toLowerCase(), clas, '')
            }
    }
}

//Funcion que añade 00 a la izquierda para las imagenes y elimina el mod -g
function checkDexNumber(modDex) {
    modDex = modDex.toString()
    dexNumber = modDex.split('-')[0]

    if (dexNumber.length <= 2) {
        if (dexNumber.length == 1) {
            modDex = '00' + modDex
        } else {
            modDex = '0' + modDex
        }
    }

    modDex = modDex.includes('-gl') ? modDex.slice(0, -3) : modDex
    return modDex
}

//Funcion que si falta alguna imagen la reemplaza con unknown.png
function checkImagesLoad() {
    const images = document.querySelectorAll('img')
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.src = 'assets/img/icons/unknown.png'
        })
    });
}

//Funcion que asegura que se busque por algun valor
function checkSearch(pokemonName, pokemonRarity, pokemonTypes, pokemonMoveName, pokemonMoveType, pokemonMoveStrength, pokemonHealth, pokemonInitiative, pokemonEvoCost, pokemonClimate, pokemonBiome, pokemonLearn, searchExpansions, searchGenerations, searchByGen, pokemonMoveEffect) {
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

    if (searchByGen && (searchExpansions.length > 0)) {
        return true
    } else {
        if ((pokemonTypes.length > 0 ||
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
                pokemonLearn.length > 0) && (searchExpansions.length > 0) && (searchGenerations.length > 0)) {
            return true
        }
    }

    return false
}

//Funcion que devuelve un array con los elementos checked
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
        default:
            return 'los'
    }
}

//Funcion que devuelve la rareza arreglada para el team galactic
function checkRarity(rarity) {
    if (rarity == 'grunt' || rarity == 'commander' || rarity == 'boss') {
        rarity = 'galactic'
    }
    return rarity
}

//Funcion que devuelve si la carta no esta en la black list para dibujarse
function checkCardDraw(pokemon) {
    draw = true
    skipCardDraws.forEach(dex => {
        if (pokemon.pokedex_number == dex) {
            draw = false
        }
    });
    return draw
}

//Funcion que coloca las imagenes de clima_bioma
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


    if (climate == 'space') {
        stateButton(biomeButton, 'dis')
        selectLocations.appendChild(createImg('locat', climate, 'select-locations--item', ''))
    } else {
        if (biome != '') { selectLocations.appendChild(createImg('locat', biome, 'select-locations--item', '')) }
        if (climate != '') {
            selectLocations.appendChild(createImg('locat', climate, 'select-locations--item', ''))
        }
        stateButton(biomeButton, 'en')

    }

}

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


    if (rarity == 'noble' || rarity == 'mega' || rarity == 'gigamax' || rarity == 'galactic') {
        borrar(selectLocations)
        selectLocations.appendChild(createImg('icon', rarity, 'select-locations--item', ''))
        stateButton(climateButton, 'dis')
        stateButton(biomeButton, 'dis')
    } else {
        if (rarity != '') {
            selectRarity.appendChild(createImg('icon', rarity, 'select-display--item', ''))
        }

        if (selectLocations.hasChildNodes) {
            let node = selectLocations.lastChild ? selectLocations.lastChild.getAttribute('alt') : ''
            if (node == 'noble.png' || node == 'mega.png' || node == 'gigamax.png' || node == 'galactic.png') {
                selectLocations.removeChild(selectLocations.lastChild)
            }
        }

        stateButton(climateButton, 'en')
        stateButton(biomeButton, 'en')
    }
}

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
        selectTypes.appendChild(createImg('effect', effect, 'select-display--item', ''))
    }

}

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
            selectTypes.appendChild(createImg('type', type, 'select-display--item', ''))
        });
    }

}

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
            selectLearn.appendChild(createImg('type', type, 'select-display--item', ''))
        });
    }

}

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
            selectMove.appendChild(createImg('type', type, 'select-display--item', ''))
        });
    }

}

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
    list.forEach(value => {

        let item = document.createElement('DIV')
        item.classList.add('select-item')

        item.appendChild(createImg(type, value.replace(' ', '_'), 'select--img', ''))

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

        box.appendChild(item)
    });
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
function createImg(type, name, clas, expansion) {
    let image = document.createElement('IMG')
    if (clas != '') {
        let clases = clas.split(' ')
        clases.forEach(e => {
            image.classList.add(e)
        });
    }

    switch (type) {
        case 'poke':
            image.src = 'assets/img/pokemon/' + checkExp(expansion) + '/' + name + '.png'
            break;
        case 'icon':
            image.src = 'assets/img/icons/' + name + '.png'
            if (name.includes('_')) {
                name = name.split('_')
                name = firstUpperCase(name[1]) + ' ' + firstUpperCase(name[0])
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
                    if (b.value == 'noble' || b.value == 'mega' || b.value == 'gigamax' || b.value == 'galactic') {
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
                    if (b.value == 'space') {
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
            add = p.pokedex_number == skip ? false : add
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