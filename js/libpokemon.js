let countClickBayleef = 0;
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
        if (rarity == 'galactic') {
            pokemonData.find((pokeObj) => {
                if ((pokeObj.encounter_tier.toLowerCase() == 'grunt') ||
                    (pokeObj.encounter_tier.toLowerCase() == 'commander') ||
                    (pokeObj.encounter_tier.toLowerCase() == 'boss')) {
                    pokemonSearch.push(pokeObj)
                }
            })
        } else {
            pokemonData.find((pokeObj) => {
                if (pokeObj.encounter_tier.toLowerCase() == rarity) {
                    pokemonSearch.push(pokeObj)
                }
            })
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

function searchByType(pokemonData, type) {
    let pokemonSearch = []
    let types = type != '' ? type.split(' ') : []

    if (types.length == 2) {
        if (types[1] == '') {
            pokemonData.find((pokeObj) => {
                if (pokeObj.type_1 == types[0] || pokeObj.type_2 == types[0]) {
                    pokemonSearch.push(pokeObj)
                }
            })
        } else {
            pokemonData.find((pokeObj) => {
                if ((pokeObj.type_1 == types[0] || pokeObj.type_2 == types[0]) &&
                    (pokeObj.type_1 == types[1] || pokeObj.type_2 == types[1])) {
                    pokemonSearch.push(pokeObj)
                }
            })
        }

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

function searchByLearnTypes(pokemonData, moveType) {
    let pokemonSearch = []
    let types = []
    let typesB = moveType != '' ? moveType.split(' ') : []

    typesB.forEach(type => {
        if (type != '') {
            types.push(type)
        }
    });

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
    let auxExpansions = []

    expansions.forEach(exp => {
        if (exp.checked) {
            auxExpansions.push(exp.value)
        }
    });

    auxExpansions.forEach(expansion => {
        pokemonData.find((pokeObj) => {
            if ((pokeObj.expansion == expansion)) {
                pokemonSearch.push(pokeObj)
            }
        })
    });



    return pokemonSearch
}

function searchPokemon(pokemonData) {
    const pokemonName = document.getElementById('pokemonName').value
    const pokemonRarity = document.getElementById('pokemonRarity').value != 'none' ? document.getElementById('pokemonRarity').value : ''
    const pokemonType1 = document.getElementById('pokemonType1').value != 'none' ? document.getElementById('pokemonType1').value : ''
    const pokemonType2 = document.getElementById('pokemonType2').value != 'none' ? document.getElementById('pokemonType2').value : ''
    const pokemonMoveName = document.getElementById('pokemonMoveName').value
    const pokemonMoveType = document.getElementById('pokemonMoveType').value != 'none' ? document.getElementById('pokemonMoveType').value : ''
    const pokemonMoveStrength = document.getElementById('pokemonMoveStrength').value ? document.getElementById('pokemonMoveStrength').value : -1
    const pokemonHealth = document.getElementById('pokemonHealth').value ? document.getElementById('pokemonHealth').value : 0
    const pokemonInitiative = document.getElementById('pokemonInitiative').value ? document.getElementById('pokemonInitiative').value : 0
    const pokemonEvoCost = document.getElementById('pokemonEvoCost').value ? document.getElementById('pokemonEvoCost').value : 0
    const pokemonClimate = document.getElementById('pokemonClimate').value != 'none' ? document.getElementById('pokemonClimate').value : ''
    const pokemonBiome = document.getElementById('pokemonBiome').value != 'none' ? document.getElementById('pokemonBiome').value : ''
    const pokemonTypeLearn1 = document.getElementById('pokemonTypeLearn1').value != 'none' ? document.getElementById('pokemonTypeLearn1').value : ''
    const pokemonTypeLearn2 = document.getElementById('pokemonTypeLearn2').value != 'none' ? document.getElementById('pokemonTypeLearn2').value : ''
    const pokemonTypeLearn3 = document.getElementById('pokemonTypeLearn3').value != 'none' ? document.getElementById('pokemonTypeLearn3').value : ''
    const pokemonTypeLearn4 = document.getElementById('pokemonTypeLearn4').value != 'none' ? document.getElementById('pokemonTypeLearn4').value : ''
    const searchExpansions = document.getElementsByName('searchExpansions')

    const screen = document.getElementById('screen')
    if (screen.classList.contains('screen--noScroll')) {
        screen.classList.remove('screen--noScroll')
    }

    if (checkSearch(pokemonName, pokemonRarity, pokemonType1, pokemonType2, pokemonMoveName, pokemonMoveType, pokemonMoveStrength, pokemonHealth, pokemonInitiative, pokemonEvoCost, pokemonClimate, pokemonBiome, pokemonTypeLearn1, pokemonTypeLearn2, pokemonTypeLearn3, pokemonTypeLearn4, searchExpansions)) {
        let searchList = pokemonData

        // Busca por tipo1 y tipo2
        if (pokemonType1 != '' || pokemonType2 != '') {
            searchList = searchByType(searchList, pokemonType1 + ' ' + pokemonType2)
        }

        // Busca pokemon por nombre
        searchList = pokemonName != '' ? searchByName(searchList, pokemonName) : searchList

        // Busca pokemon por vida
        searchList = pokemonHealth > 0 ? searchByHealth(searchList, pokemonHealth) : searchList

        // Busca pokemon por inicitiva
        searchList = pokemonInitiative > 0 ? searchByInitiative(searchList, pokemonInitiative) : searchList

        // Busca pokemon por bioma
        if (pokemonRarity != 'noble') {
            searchList = pokemonBiome != '' ? searchByBiome(searchList, pokemonBiome) : searchList
        }

        // Busca pokemon por clima
        if (pokemonRarity == 'noble') {
            searchList = searchByClimate(searchList, 'noble')
        } else {
            searchList = pokemonClimate != '' ? searchByClimate(searchList, pokemonClimate) : searchList
        }

        // Busca pokemon por rareza
        searchList = pokemonRarity != '' && pokemonRarity != 'noble' ? searchByRarity(searchList, pokemonRarity) : searchList

        // Busca pokemon por nombre del ataque
        searchList = pokemonMoveName != '' ? searchByMoveName(searchList, pokemonMoveName) : searchList

        // Busca pokemon por tipo del ataque
        searchList = pokemonMoveType != '' ? searchByMoveType(searchList, pokemonMoveType) : searchList

        // Busca pokemon por fuerza del ataque
        searchList = pokemonMoveStrength > -1 ? searchByMoveStrength(searchList, pokemonMoveStrength) : searchList

        // Busca pokemon por coste de evolucion
        searchList = pokemonEvoCost > 0 ? searchByEvoCost(searchList, pokemonEvoCost) : searchList

        // Busca pokemon por tipos de ataque aprendibles
        if (pokemonTypeLearn1 != '' || pokemonTypeLearn2 != '' || pokemonTypeLearn3 != '' || pokemonTypeLearn4 != '') {
            searchList = searchByLearnTypes(searchList, pokemonTypeLearn1 + ' ' + pokemonTypeLearn2 + ' ' + pokemonTypeLearn3 + ' ' + pokemonTypeLearn4)
        }

        // Busca pokemon por expansion
        searchList = searchByExpansion(searchList, searchExpansions)

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

    if (pokemon.hasOwnProperty('type_1')) {
        div.appendChild(createImg('type', pokemon.type_1, 'sdcard-type', pokemon.expansion))
    } else {
        div.appendChild(createImg('type', 'typeless', 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('type_2')) {
        div.appendChild(createImg('type', pokemon.type_2, 'sdcard-type', pokemon.expansion))
    }

    dvCardTitle.appendChild(div)

    let pName = document.createElement('P')
    pName.classList.add('sdcard-name')
    pName.appendChild(document.createTextNode(pokemon.pokedex_name))

    dvCardTitle.appendChild(pName)
    dvCardTitle.appendChild(createImg('icon', checkRarity(pokemon.encounter_tier), 'sdcard-type sdcard-type--last', pokemon.expansion))

    let expImage = document.createElement('IMG')
    expImage.src = 'assets/img/icons/expansions/' + checkExp(pokemon.expansion)
    expImage.alt = checkExp(pokemon.expansion) + '.png'
    expImage.title = firstUpperCase(pokemon.expansion)
    expImage.classList.add('expansions--img')
    expImage.classList.add('expansions--img--sm')

    dvCardTitle.appendChild(expImage)


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

    modClimate = pokemon.hasOwnProperty('climate') ? pokemon.climate.toLowerCase() : ''
    modBiome = pokemon.hasOwnProperty('biome') ? pokemon.biome.toLowerCase() : ''
    dvInfo.appendChild(checkBioClim(modClimate, modBiome, 'sdcard-info--location'))

    //Poke Learn Moves
    let dvLearn = document.createElement('DIV')
    dvLearn.classList.add('sdcard-info--learn')

    if (pokemon.hasOwnProperty('move_1')) {
        dvLearn.appendChild(createImg('type', pokemon.move_1, 'sdcard-type', pokemon.expansion))
    } else {
        dvLearn.appendChild(createImg('type', 'typeless', 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_2')) {
        dvLearn.appendChild(createImg('type', pokemon.move_2, 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_3')) {
        dvLearn.appendChild(createImg('type', pokemon.move_3, 'sdcard-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_4')) {
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

    if (pokemonData.length) {
        pokemonData.forEach(pokemon => {
            screen.appendChild(drawPokemonCard(pokemon))
        });
    } else {
        notFound()
    }
}

//Funcion para dibujar la informacion de la carta seleccionada
function drawPokemonInfo(pokemonData, dexNumber, expansion, scrollVar) {
    const screen = document.getElementById('screen')
    const pokemon = searchByDex(pokemonData, dexNumber, expansion)

    //cardInfo
    let dvCardInfo = document.createElement('DIV')
    dvCardInfo.classList.add('cardInfo')
    dvCardInfo.id = 'cardInfo'
    dvCardInfo.style.top = scrollVar + "px"

    screen.appendChild(dvCardInfo)

    //cardClose
    let dvCardClose = document.createElement('DIV')
    dvCardClose.classList.add('cardInfo-close')
    dvCardClose.id = 'cardClose'

    dvCardInfo.appendChild(dvCardClose)

    //cardTitle
    let dvCardTitle = document.createElement('DIV')
    dvCardTitle.classList.add('cardInfo-title')

    let dvCardTypes = document.createElement('DIV')
    dvCardTypes.classList.add('cardInfo-title--types')
    dvCardTypes.appendChild(createImg('exp', checkExp(pokemon.expansion), 'cardInfo-type cardInfo-type--round', pokemon.expansion))

    if (pokemon.hasOwnProperty('type_1')) {
        dvCardTypes.appendChild(createImg('type', pokemon.type_1, 'cardInfo-type', pokemon.expansion))
    } else {
        dvCardTypes.appendChild(createImg('type', 'typeless', 'cardInfo-type', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('type_2')) {
        dvCardTypes.appendChild(createImg('type', pokemon.type_2, 'cardInfo-type', pokemon.expansion))
    }

    let pName = document.createElement('P')
    pName.classList.add('cardInfo-name')
    pName.appendChild(document.createTextNode(pokemon.pokedex_name))

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

    if (pokemon.hasOwnProperty('description')) {
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

    if (pokemon.hasOwnProperty('move_1')) {
        div.appendChild(createImg('type', pokemon.move_1, 'cardInfo-type--sm', pokemon.expansion))
    } else {
        div.appendChild(createImg('type', 'typeless', 'cardInfo-type--sm', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_2')) {
        div.appendChild(createImg('type', pokemon.move_2, 'cardInfo-type--sm', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_3')) {
        div.appendChild(createImg('type', pokemon.move_3, 'cardInfo-type--sm', pokemon.expansion))
    }

    if (pokemon.hasOwnProperty('move_4')) {
        div.appendChild(createImg('type', pokemon.move_4, 'cardInfo-type--sm', pokemon.expansion))
    }


    dvLearn.appendChild(div)

    //Poke Location
    let dvLocat = document.createElement('DIV')
    dvLocat.classList.add('cardInfo-info--location')
    if (pokemon.hasOwnProperty('evolve_cost') && !pokemon.evolve_cost.toString() != '') {
        dvLocat.classList.add('cardInfo-info--locationB')
    }

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

    //add
    const cardInfo = document.getElementById('cardInfo')

    cardInfo.appendChild(dvCardTitle)
    cardInfo.appendChild(dvCardData)
    cardInfo.appendChild(dvCardMove)

    const pokeImg = document.getElementById('pokeImg')
    countClickBayleef = 0;
    if (pokemon.pokedex_number == 153) {

        pokeImg.addEventListener('click', (e) => {
            countClickBayleef++
            if (countClickBayleef >= 5) {
                e.target.src = 'assets/img/icons/expansions/javcov.png'
            }
        })
    }

    //Borrar cardInfo
    const cardClose = document.getElementById('cardClose')
    cardClose.addEventListener('click', (e) => {
        screen.removeChild(e.target.parentNode)
        screen.classList.remove('screen--noScroll')
    })
}

//===================================== Check =========================================

function checkBioClim(modClimate, modBiome, clas) {
    switch (modClimate) {
        case 'noble':
            return createImg('icon', modClimate, clas, '')
        case 'space':
            return createImg('icon', 'unknown', clas, '')
        default:
            if (modBiome == 'ruins') {
                return createImg('icon', 'unknown', clas, '')
            } else {
                return createImg('icon', modClimate + '_' + modBiome, clas, '')
            }
    }
}

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

    modDex = modDex.includes('g') ? modDex.slice(0, -2) : modDex
    return modDex
}

function checkSearch(pokemonName, pokemonRarity, pokemonType1, pokemonType2, pokemonMoveName, pokemonMoveType, pokemonMoveStrength, pokemonHealth, pokemonInitiative, pokemonEvoCost, pokemonClimate, pokemonBiome, pokemonTypeLearn1, pokemonTypeLearn2, pokemonTypeLearn3, pokemonTypeLearn4, searchExpansions) {
    // console.log('--Nombre: ' + pokemonName)
    // console.log('--Rareza: ' + pokemonRarity)
    // console.log('--Tipo 1: ' + pokemonType1)
    // console.log('--Tipo 2: ' + pokemonType2)
    // console.log('--Nombre Ataque: ' + pokemonMoveName)
    // console.log('--Tipo Ataque: ' + pokemonMoveType)
    // console.log('--Fuerza Ataque: ' + pokemonMoveStrength)
    // console.log('--Vida: ' + pokemonHealth)
    // console.log('--Iniciativa: ' + pokemonInitiative)
    // console.log('--Coste Evolucion: ' + pokemonEvoCost)
    // console.log('--Clima: ' + pokemonClimate)
    // console.log('--Bioma: ' + pokemonBiome)
    // console.log('--Tipo Ataque aprendible 1: ' + pokemonTypeLearn1)
    // console.log('--Tipo Ataque aprendible 2: ' + pokemonTypeLearn2)
    // console.log('--Tipo Ataque aprendible 3: ' + pokemonTypeLearn3)
    // console.log('--Tipo Ataque aprendible 4: ' + pokemonTypeLearn4)
    // console.log(searchExpansions)
    let checkExp = false
    searchExpansions.forEach(e => {
        if (e.checked) {
            checkExp = true
        }
    });


    if ((pokemonType1 != '' ||
            pokemonType2 != '' ||
            pokemonName != '' ||
            pokemonRarity != '' ||
            pokemonMoveName != '' ||
            pokemonMoveType != '' ||
            pokemonMoveStrength > -1 ||
            pokemonHealth > 0 ||
            pokemonInitiative > 0 ||
            pokemonEvoCost > 0 ||
            pokemonClimate != '' ||
            pokemonBiome != '' ||
            pokemonTypeLearn1 != '' ||
            pokemonTypeLearn2 != '' ||
            pokemonTypeLearn3 != '' ||
            pokemonTypeLearn4 != '') && checkExp) {
        return true
    }

    return false
}

//Funcion que devuelve la ruta de Expansion
function checkExp(exp) {
    switch (exp) {
        case 'generations':
            return 'javcov'
        case 'xenonia':
            return 'xenonia'
        case 'evols':
            return 'evols'
        default:
            return 'los'
    }
}

function checkRarity(rarity) {
    if (rarity == 'grunt' || rarity == 'commander' || rarity == 'boss') {
        rarity = 'galactic'
    }
    return rarity
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
        case 'exp':
            image.src = 'assets/img/icons/expansions/' + name + '.png'
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