const typeList = ['normal', 'grass', 'fire', 'water', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy', 'typeless']
const rarityList = ['starter', 'weak', 'moderate', 'strong', 'legendary', 'ultra beast', 'noble', 'mega', 'gigamax', 'galactic']
const climateList = ['cold', 'temperate', 'warm', 'space']
const biomeList = ['forest', 'ocean', 'mountain', 'plains']
const moveEffectList = ['burned', 'frozen', 'paralysed', 'drowsy', 'confused', 'poisoned', 'switch out', 'add roll', 'remove roll', 'second move', 'next attacked', 'next attacks', 'increase damage', 'minus damage', 'extra damage', 'double damage', 'take damage', 'change form', 'change type', 'heal', 'attack strength', 'battle fatigue']
let scrollVar = 0;
let pokemonData = [];

document.addEventListener('DOMContentLoaded', () => { loadDoc('assets/sinnoh_cube.json', load) })

function load(xhttp) {
    pokemonData = JSON.parse(xhttp.responseText)['pokemon']

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
    const searchByGen = document.getElementById('searchByGen')


    //  Desactiva el boton enter como submit para el formulario y hace que ejecute la funcion para cargar los elementos
    document.querySelectorAll('input[type=text]').forEach(node => node.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            e.preventDefault();
            searchPokemon(pokemonData);
        }
    }))

    document.querySelectorAll('input[type=number]').forEach(node => node.addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            e.preventDefault();
            searchPokemon(pokemonData);
        }
    }))

    //Actualiza los select
    addSelectBox(rarityBox, rarityList, 'icon', 'rarity', 'checkbox')
    addSelectBox(typeBox, typeList, 'type', 'types', 'checkbox')
    addSelectBox(biomeBox, biomeList, 'locat', 'biome', 'checkbox')
    addSelectBox(climateBox, climateList, 'locat', 'climate', 'checkbox')
    addSelectBox(moveTypeBox, typeList, 'type', 'moveType', 'checkbox')
    addSelectBox(learnBox, typeList, 'type', 'learn', 'checkbox')
    addSelectBox(moveEffectBox, moveEffectList, 'effect', 'moveEffect', 'checkbox')

    checkImagesLoad()

    //Borra la pantalla de carga despues de recibir los datos
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


    //Desplaza el menu 
    formClose.addEventListener('click', (e) => {
        search.classList.toggle('search--show')
        e.target.classList.toggle('formClose--show')
        e.target.classList.toggle('formClose--left')
    })

    //Clic al boton buscar
    btnSearch.addEventListener('click', (e) => {
        if (e.target.value == 'Search') {
            searchPokemon(pokemonData)
        }
    })

    //Resetea el formulario
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
            checkLocationBox()
            checkRarityBox()
            checkTypesBox()
            checkMoveBox()
            checkLearnBox()
            checkMoveEffectBox()
            stateButton(climateButton, 'en')
            stateButton(biomeButton, 'en')

            searchExpansions.forEach((exp, i) => {
                exp.checked = searchExpansionsVal[i]
            });
            searchGenerations.forEach((gen, i) => {
                gen.checked = searchGenerationsVal[i]
            });
            searchByGen.checked = searchByGenVal
        }
    })

    //Cambia el tipo de input al buscar las generaciones de radio a checkbox
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

    //Añade funcion al hacer clic en las cartas buscadas
    screen.addEventListener('click', (e) => {
        if (e.target.classList.contains('sdcard')) {
            let dexNumber = e.target.getAttribute('dexnumber')
            let expansion = e.target.getAttribute('expansion')
            if (dexNumber) {
                scrollVar = screen.scrollTop
                screen.classList.add('screen--noScroll')
                drawPokemonInfo(pokemonData, dexNumber, expansion, scrollVar)
            }
        }
    })

    genButton.addEventListener('click', () => {
        setSelect()
        genBox.classList.add('select-box--shown')
    })

    expButton.addEventListener('click', () => {
        setSelect()
        expBox.classList.add('select-box--shown')
    })

    rarityButton.addEventListener('click', () => {
        setSelect()
        rarityBox.classList.add('select-box--shown')
    })

    biomeButton.addEventListener('click', (e) => {
        if (!e.target.classList.contains('select-button--disabled')) {
            setSelect()
            biomeBox.classList.add('select-box--shown')
        }
    })

    climateButton.addEventListener('click', (e) => {
        if (!e.target.classList.contains('select-button--disabled')) {
            setSelect()
            climateBox.classList.add('select-box--shown')
        }
    })

    moveTypeButton.addEventListener('click', () => {
        setSelect()
        moveTypeBox.classList.add('select-box--shown')
    })

    learnButton.addEventListener('click', () => {
        setSelect()
        learnBox.classList.add('select-box--shown')
    })

    typeButton.addEventListener('click', () => {
        setSelect()
        typeBox.classList.add('select-box--shown')
    })

    moveEffectButton.addEventListener('click', () => {
        setSelect()
        moveEffectBox.classList.add('select-box--shown')
    })

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero
    typesBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(typesBoxChecks, 2)
            checkTypesBox()
        })
    });

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero
    moveTypeBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(moveTypeBoxChecks, 1)
            checkMoveBox()
        })
    });

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero
    learnBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(learnBoxChecks, 4)
            checkLearnBox()
        })
    });

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero, deshabilita si hay mega, noble o dinamax seleccionados
    rarityBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(rarityBoxChecks, 1)
            boxDisabled(rarityBoxChecks, 'rarity')
            checkRarityBox()
        })
    });
    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero, deshabilita si hay mega, noble o dinamax seleccionados
    moveEffectBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(moveEffectBoxChecks, 1)
            checkMoveEffectBox()
        })
    });

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero, deshabilita si hay mega, noble o dinamax seleccionados
    climateBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(climateBoxChecks, 1)
            boxDisabled(climateBoxChecks, 'location')
            checkLocationBox()
        })
    });

    //Comprueba cuantos estan seleccionados y deshabilita si hay mas de cierto numero, deshabilita si hay mega, noble o dinamax seleccionados
    biomeBoxChecks.forEach(check => {
        check.addEventListener('change', () => {
            boxNabled(biomeBoxChecks, 1)
            checkLocationBox()
        })
    });
}

//Funcion para dibujar las cartas obtenidas de getCards en screen
function drawCards(xhttp) {
    const screen = document.getElementById('screen')
    borrar(screen)
    let datos = xhttp.responseText
    screen.innerHTML = datos
}