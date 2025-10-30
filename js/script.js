const typeList = ['normal', 'grass', 'fire', 'water', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy', 'typeless']
const rarityList = ['starter', 'weak', 'moderate', 'strong', 'legendary', 'ultra beast', 'noble', 'mega', 'gigantamax', 'fossil', 'shuckle 1', 'shuckle 2', 'shuckle 3', 'shuckle']
const climateList = ['cold', 'temperate', 'warm', 'space', 'cold ruins', 'temperate ruins', 'warm ruins', 'ancient ruins', 'future ruins']
const biomeList = ['forest', 'ocean', 'mountain', 'plains']
const moveEffectList = ['burned', 'frozen', 'paralysed', 'drowsy', 'confused', 'poisoned', 'sleep', 'hexed', 'intimidated', 'grappled', 'drenched', 'rooted','switch out', 'add roll', 'remove roll', 'second move', 'next attacked', 'next attacks', 'increase damage', 'minus damage', 'extra damage', 'double damage', 'take damage', 'change form', 'change type', 'heal', 'attack strength', 'battle fatigue']
const trainersList = [
    'galactic team', '---galactic grunt', '---mars', '---jupiter', '---saturn', '---sird', '---cyrus',
    'magma team', '---magma grunt', '---tabitha', '---courtney', '---maxie',
    'aqua team', '---aqua grunt', '---matt', '---shelly', '---archie',
    'plasma team', '---plasma grunt', '---plasma ace', '---colress',
    'rocket team', '---rocket grunt', '---rocket ace', '---proton', '---ariana', '---archer', '---giovanni',
    'shuckle', '---shuckle T1', '---shuckle T2', '---shuckle T3', '---rusty',
    'trainer', '---brendan', '---may', '---wally', '---lisia',
    '---roxanne', '---wattson', '---flannery', '---norman', '---winona', '---tate', '---liza', '---juan',
    '---falkner', '---bugsy', '---whitney', '---morty', '---chuck', '---jasmine', '---pryce', '---clair',
    '---palmer', '---thorton', '---dahlia', '---darach', '---argenta', '---caitlin',
    '---sidney', '---will', '---karen', '---koga', '---lance', '---steven', '---queen'
]
const archetypesList = ['bomb', 'dance', 'delay', 'form', 'modify', 'multi', 'multi all', 'persisting', 
    'priority', 'protect', 'recharge', 'song', 'switch']

var globalData = []
var pokemonData = []
var moveData = []

const urlParams = new URLSearchParams(window.location.search)
const urlExpansions = urlParams.get('exp')

document.addEventListener('DOMContentLoaded', () => { loadDoc('assets/sinnoh_cube.json', load) })

function load(xhttp) {
    globalData = JSON.parse(xhttp.responseText)
    pokemonData = globalData['pokemon']
    moveData = globalData['moves']

    const screen = document.getElementById('screen')
    const search = document.getElementById('search')

    const btnSearch = document.getElementById('btnSearch')
    const btnReset = document.getElementById('btnReset')
    const pokemonSearch = document.getElementById('pokemonSearch')
    const formClose = document.getElementById('formClose')

    const rarityButton = document.getElementById('rarityButton')
    const rarityBox = document.getElementById('rarityBox')
    const typeButton = document.getElementById('typeButton')
    const typeBox = document.getElementById('typeBox')
    const biomeButton = document.getElementById('biomeButton')
    const biomeBox = document.getElementById('biomeBox')
    const climateButton = document.getElementById('climateButton')
    const climateBox = document.getElementById('climateBox')
    const moveTypeButton = document.getElementById('moveTypeButton')
    const moveTypeBox = document.getElementById('moveTypeBox')
    const moveEffectButton = document.getElementById('moveEffectButton')
    const moveEffectBox = document.getElementById('moveEffectBox')
    const learnButton = document.getElementById('learnButton')
    const learnBox = document.getElementById('learnBox')
    const expButton = document.getElementById('expButton')
    const expBox = document.getElementById('expBox')
    const genButton = document.getElementById('genButton')
    const genBox = document.getElementById('genBox')
    const logButton = document.getElementById('logButton')
    const logBox = document.getElementById('logBox')
    const searchByGen = document.getElementById('searchByGen')
    const trainersButton = document.getElementById('trainersButton')
    const trainersBox = document.getElementById('trainersBox')
    const archetypesButton = document.getElementById('archetypesButton')
    const archetypesBox = document.getElementById('archetypesBox')

    checkExpansions()


    //Disables the reload page from Enter in the form for input texts
    document.querySelectorAll('input[type=text]').forEach(node => node.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            e.preventDefault();
            searchPokemon(pokemonData, moveData);
        }
    }))

    //Disables the reload page from Enter in the form from input numbers
    document.querySelectorAll('input[type=number]').forEach(node => node.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            e.preventDefault();
            searchPokemon(pokemonData, moveData);
        }
    }))

    //Creates the selects
    addSelectBox(rarityBox, rarityList, 'icon', 'rarity', 'checkbox')
    addSelectBox(typeBox, typeList, 'type', 'types', 'checkbox')
    addSelectBox(biomeBox, biomeList, 'locat', 'biome', 'checkbox')
    addSelectBox(climateBox, climateList, 'locat', 'climate', 'checkbox')
    addSelectBox(moveTypeBox, typeList, 'type', 'moveType', 'checkbox')
    addSelectBox(learnBox, typeList, 'type', 'learn', 'checkbox')
    addSelectBox(moveEffectBox, moveEffectList, 'effect', 'moveEffect', 'checkbox')
    addSelectBox(trainersBox, trainersList, 'trainer', 'trainer', 'checkbox')
    addSelectBox(archetypesBox, archetypesList, 'arch', 'archetype', 'checkbox')

    // rarityBox.classList.add('select-box--shown')

    //Test draw pokemon
    // let testExp = 'johtoWar'
    // lastExpasion = testExp
    // drawPokemonInfo(pokemonData, 59, 'los', '')
    // drawPokemonInfo(pokemonData, 6, 'los', '')
    // drawPokemonInfo(pokemonData, 133, 'los', '')
    // drawPokemonInfo(pokemonData, '648-mar', testExp, 0, '')

    //If a image is missing replaces it
    checkImagesLoad()

    //Deletes the loading screen when the data is loaded
    const ball = document.getElementById('ball')
    if (ball) {
        ball.parentNode.parentNode.removeChild(ball.parentNode)
    }

    const typesBoxChecks = document.getElementsByName('types')
    const rarityBoxChecks = document.getElementsByName('rarity')
    const climateBoxChecks = document.getElementsByName('climate')
    const biomeBoxChecks = document.getElementsByName('biome')
    const moveTypeBoxChecks = document.getElementsByName('moveType')
    const learnBoxChecks = document.getElementsByName('learn')
    const moveEffectBoxChecks = document.getElementsByName('moveEffect')
    const trainersBoxChecks = document.getElementsByName('trainer')
    const archetypesBoxChecks = document.getElementsByName('archetype')

    const shinyRadioAny = document.getElementById('searchShinyAnything')
    const shinyRadioNone = document.getElementById('searchShinyNone')
    const shinyRadioOnly = document.getElementById('searchShinyOnly')
    const shinyRadioNoneItem = document.getElementById('searchShinyNoneItem')
    const shinyRadioOnlyItem = document.getElementById('searchShinyOnlyItem')
    const selectLocations = document.getElementById('selectLocations')


    //show or hide the menu
    formClose.addEventListener('click', (e) => {
        search.classList.toggle('search--show')
        e.target.classList.toggle('formClose--show')
        e.target.classList.toggle('formClose--left')
    })

    //Adds the click function to search
    btnSearch.addEventListener('click', (e) => {
        if (e.target.value == 'Search') {
            searchPokemon(pokemonData, moveData)
        }
    })

    //Resets the form
    btnReset.addEventListener('click', (e) => {
        if (e.target.value == 'Reset') {
            const searchExpansions = document.getElementsByName('searchExpansions')
            let searchExpansionsVal = []
            const searchGenerations = document.getElementsByName('searchGenerations')
            let searchGenerationsVal = []
            const searchByGen = document.getElementById('searchByGen')

            searchExpansions.forEach(exp => {
                searchExpansionsVal.push(exp.checked)
            });
            searchGenerations.forEach(gen => {
                searchGenerationsVal.push(gen.checked)
            });
            let searchByGenVal = searchByGen.checked

            pokemonSearch.reset()

            enableBox(rarityBoxChecks)
            enableBox(typesBoxChecks)
            enableBox(biomeBoxChecks)
            enableBox(climateBoxChecks)
            enableBox(learnBoxChecks)
            enableBox(moveTypeBoxChecks)
            enableBox(moveEffectBoxChecks)
            enableBox(trainersBoxChecks)
            checkLocationBox()
            checkRarityBox()
            checkTypesBox()
            checkMoveBox()
            checkLearnBox()
            checkMoveEffectBox()
            checkArchetypesBox()
            stateButton(climateButton, 'en')
            stateButton(biomeButton, 'en')
            shinyRadioAny.checked = true
            

            searchExpansions.forEach((exp, i) => {
                exp.checked = searchExpansionsVal[i]
            });
            searchGenerations.forEach((gen, i) => {
                gen.checked = searchGenerationsVal[i]
            });
            searchByGen.checked = searchByGenVal
        }
    })

    //Change the input type searching by Generations from radio to checkbox and viceversa
    searchByGen.addEventListener('change', (e) => {
        const searchGenerations = document.getElementsByName('searchGenerations')
        if (e.target.checked) {
            searchGenerations.forEach(exp => {
                exp.type = 'radio'
            });
            searchGenerations[0].checked = true
        } else {
            searchGenerations.forEach(exp => {
                exp.type = 'checkbox'
                exp.checked = true
            });
        }
    })

    //Adds the click function to draw the info
    screen.addEventListener('click', (e) => {

        //Check if the element clicked is a card
        if(e.target.classList.contains('sdcard')){

            //Get the attributes to draw the pokemon
            let dexNumber = e.target.getAttribute('dexnumber')
            let expansion = e.target.getAttribute('expansion')
            let trainer = e.target.getAttribute('trainer')
            let scrollBar = screen.scrollTop

            //If have a dex number draw the info
            if(dexNumber){

                //makes the screen to not scroll
                screen.classList.add('screen--noScroll')

                //set the expansion clicked as last expansion
                lastExpasion = lastExpasion == null ? expansion : lastExpasion

                //Draws the pokemon info
                drawPokemonInfo(pokemonData, dexNumber, expansion, scrollBar, trainer)
            }
        }
    })

    //Adds the click function to select generations
    genButton.addEventListener('click', () => {
        setSelect()
        genBox.classList.add('select-box--shown')
    })

    //Adds the click function to log
    logButton.addEventListener('click', () => {
        setSelect()
        logBox.classList.add('select-box--shown')
    })

    //Adds the click function to select expansions
    expButton.addEventListener('click', () => {
        setSelect()
        expBox.classList.add('select-box--shown')
    })

    //Adds the click function to select rarities
    rarityButton.addEventListener('click', () => {
        setSelect()
        rarityBox.classList.add('select-box--shown')
    })

    //Adds the click function to select biomes
    biomeButton.addEventListener('click', (e) => {
        if (!e.target.classList.contains('select-button--disabled')) {
            setSelect()
            biomeBox.classList.add('select-box--shown')
        }
    })

    //Adds the click function to select climates
    climateButton.addEventListener('click', (e) => {
        if (!e.target.classList.contains('select-button--disabled')) {
            setSelect()
            climateBox.classList.add('select-box--shown')
        }
    })

    //Adds the click function to select move types
    moveTypeButton.addEventListener('click', () => {
        setSelect()
        moveTypeBox.classList.add('select-box--shown')
    })

    //Adds the click function to select learn move types
    learnButton.addEventListener('click', () => {
        setSelect()
        learnBox.classList.add('select-box--shown')
    })

    //Adds the click function to select types
    typeButton.addEventListener('click', () => {
        setSelect()
        typeBox.classList.add('select-box--shown')
    })

    //Adds the click function to select move effects
    moveEffectButton.addEventListener('click', () => {
        setSelect()
        moveEffectBox.classList.add('select-box--shown')
    })

    //Adds the click function to select trainers
    trainersButton.addEventListener('click', () => {
        setSelect()
        trainersBox.classList.add('select-box--shown')
    })

    //Adds the click function to select trainers
    archetypesButton.addEventListener('click', () => {
        setSelect()
        archetypesBox.classList.add('select-box--shown')
    })

    //Limit the max number of options of types (2)
    typesBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(typesBoxChecks, 2)
            checkTypesBox()
        })
    });

    //Limit the max number of options of move types (1)
    moveTypeBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(moveTypeBoxChecks, 1)
            checkMoveBox()
        })
    });

    //Limit the max number of options of learn move types (4)
    learnBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(learnBoxChecks, 4)
            checkLearnBox()
        })
    });

    //Limit the max number of options of rarities (1) and disables if noble, mega, gigantamax, fossil or trainer
    rarityBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(rarityBoxChecks, 1)
            boxDisabled(rarityBoxChecks, 'rarity')
            checkRarityBox()
        })
    });

    //disables biome and climate if has a trainer
    trainersBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxDisabled(trainersBoxChecks, 'trainer')
            checkTrainersBox()
        })
    });

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero, deshabilita si hay mega, noble o dinamax seleccionados
    moveEffectBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(moveEffectBoxChecks, 1)
            checkMoveEffectBox()
        })
    });

    //Limit the max number of options of climate (1) and disables if space selected
    climateBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(climateBoxChecks, 1)
            boxDisabled(climateBoxChecks, 'location')
            checkLocationBox()
        })
    });

    //Limit the max number of options of biome (1)
    biomeBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(biomeBoxChecks, 1)
            checkLocationBox()
        })
    });

    //Limit the max number of options of archetypes (1)
    archetypesBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(archetypesBoxChecks, 3)
            checkArchetypesBox()
        })
    });

    //Change the color for the shinies selector (anything)
    shinyRadioAny.addEventListener('click', ()=>{
        selectLocations.classList.remove('select-locations--only')
        selectLocations.classList.remove('select-locations--none')
        shinyRadioOnlyItem.classList.remove('select-radio--item--only')
        shinyRadioNoneItem.classList.remove('select-radio--item--none')
    })

    //Change the color for the shinies selector (only)
    shinyRadioOnly.addEventListener('click', ()=>{
        selectLocations.classList.add('select-locations--only')
        selectLocations.classList.remove('select-locations--none')
        shinyRadioOnlyItem.classList.add('select-radio--item--only')
        shinyRadioNoneItem.classList.remove('select-radio--item--none')
    })

    //Change the color for the shinies selector (none)
    shinyRadioNone.addEventListener('click', ()=>{
        selectLocations.classList.remove('select-locations--only')
        selectLocations.classList.add('select-locations--none')
        shinyRadioOnlyItem.classList.remove('select-radio--item--only')
        shinyRadioNoneItem.classList.add('select-radio--item--none')
    })
}

//Draws the cards from getCards in the screen
function drawCards(xhttp) {
    const screen = document.getElementById('screen')
    borrar(screen)
    let datos = xhttp.responseText
    screen.innerHTML = datos
}