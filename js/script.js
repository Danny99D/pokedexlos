const typeList = ['normal', 'grass', 'fire', 'water', 'flying', 'fighting', 'poison', 'electric', 'ground', 'rock', 'psychic', 'ice', 'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy', 'typeless']
const rarityList = ['weak', 'moderate', 'strong', 'legendary', 'noble']
const climateList = ['cold', 'temperate', 'warm', 'space']
const biomeList = ['forest', 'ocean', 'mountain', 'plains']
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

    const pokemonRarity = document.getElementById('pokemonRarity')
    const pokemonType1 = document.getElementById('pokemonType1')
    const pokemonType2 = document.getElementById('pokemonType2')
    const pokemonMoveType = document.getElementById('pokemonMoveType')
    const pokemonBiome = document.getElementById('pokemonBiome')
    const pokemonClimate = document.getElementById('pokemonClimate')
    const pokemonTypeLearn1 = document.getElementById('pokemonTypeLearn1')
    const pokemonTypeLearn2 = document.getElementById('pokemonTypeLearn2')
    const pokemonTypeLearn3 = document.getElementById('pokemonTypeLearn3')
    const pokemonTypeLearn4 = document.getElementById('pokemonTypeLearn4')

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
    addSelect(pokemonType1, typeList)
    addSelect(pokemonType2, typeList)
    addSelect(pokemonMoveType, typeList)
    addSelect(pokemonRarity, rarityList)
    addSelect(pokemonBiome, biomeList)
    addSelect(pokemonClimate, climateList)
    addSelect(pokemonTypeLearn1, typeList)
    addSelect(pokemonTypeLearn2, typeList)
    addSelect(pokemonTypeLearn3, typeList)
    addSelect(pokemonTypeLearn4, typeList)

    // loadDoc('php/searchPokemon.php?d=&type1=poison&type2=electric', drawCards)type1=fire
    searchPokemon(pokemonData)
        // loadDoc('php/loadPokemon.php?dexNumber=' + '1' + "&expansion=base", drawCardInfo)
        // loadDoc('php/loadPokemon.php?dexNumber=' + '41-g' + "&expansion=base", drawCardInfo)

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
            pokemonSearch.reset()
            pokemonTypeLearn2.disabled = true
            pokemonTypeLearn3.disabled = true
            pokemonTypeLearn4.disabled = true
            pokemonType2.disabled = true
        }
    })

    //Deshabilita el segundo tipo de pokemon
    pokemonType1.addEventListener('change', (e) => {
        disableSelect(pokemonType1, pokemonType2)
    })

    //Deshabilita el segundo tipo de pokemon
    pokemonTypeLearn1.addEventListener('change', (e) => {
        disableGroupSelect(pokemonTypeLearn1, pokemonTypeLearn2, pokemonTypeLearn3, pokemonTypeLearn4)
    })

    //Deshabilita el segundo tipo de pokemon
    pokemonTypeLearn2.addEventListener('change', (e) => {
        disableGroupSelect(pokemonTypeLearn1, pokemonTypeLearn2, pokemonTypeLearn3, pokemonTypeLearn4)

    })

    //Deshabilita el segundo tipo de pokemon
    pokemonTypeLearn3.addEventListener('change', (e) => {
        disableGroupSelect(pokemonTypeLearn1, pokemonTypeLearn2, pokemonTypeLearn3, pokemonTypeLearn4)
    })

    //Deshabilita buscar climate si se busca un pokemon noble
    pokemonRarity.addEventListener('change', (e) => {
        if (pokemonRarity.value == 'noble') {
            pokemonClimate.disabled = true
            pokemonClimate.value = 'none'
            pokemonBiome.disabled = true
            pokemonBiome.value = 'none'
        } else {
            pokemonClimate.disabled = false
            pokemonBiome.disabled = false
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

}

//Funcion para buscar las cartas por los valores del formulario
function getCards() {
    const pokemonName = document.getElementById('pokemonName').value
    const pokemonRarity = document.getElementById('pokemonRarity').value
    const pokemonType1 = document.getElementById('pokemonType1').value
    const pokemonType2 = document.getElementById('pokemonType2').value
    const pokemonMoveName = document.getElementById('pokemonMoveName').value
    const pokemonMoveType = document.getElementById('pokemonMoveType').value
    const pokemonMoveStrength = document.getElementById('pokemonMoveStrength').value ? document.getElementById('pokemonMoveStrength').value : -1
    const pokemonHealth = document.getElementById('pokemonHealth').value ? document.getElementById('pokemonHealth').value : -1
    const pokemonInitiative = document.getElementById('pokemonInitiative').value ? document.getElementById('pokemonInitiative').value : -1
    const pokemonEvoCost = document.getElementById('pokemonEvoCost').value ? document.getElementById('pokemonEvoCost').value : -1
    const pokemonClimate = document.getElementById('pokemonClimate').value
    const pokemonBiome = document.getElementById('pokemonBiome').value
    const pokemonTypeLearn1 = document.getElementById('pokemonTypeLearn1').value
    const pokemonTypeLearn2 = document.getElementById('pokemonTypeLearn2').value
    const pokemonTypeLearn3 = document.getElementById('pokemonTypeLearn3').value
    const pokemonTypeLearn4 = document.getElementById('pokemonTypeLearn4').value

    //Llama la libpokemon para sacar los resultados y dibujar las cartas
    let url = 'php/searchPokemon.php?d='
    url += pokemonType1 == 'none' ? '' : '&type1=' + pokemonType1
    url += pokemonType2 == 'none' ? '' : '&type2=' + pokemonType2
    url += pokemonName == '' ? '' : '&name=' + pokemonName
    url += pokemonRarity == 'none' ? '' : '&rarity=' + pokemonRarity
    url += pokemonMoveName == '' ? '' : '&moveName=' + pokemonMoveName
    url += pokemonMoveType == 'none' ? '' : '&moveType=' + pokemonMoveType
    url += pokemonMoveStrength == -1 ? '' : '&moveStrength=' + pokemonMoveStrength
    url += pokemonHealth == -1 ? '' : '&health=' + pokemonHealth
    url += pokemonInitiative == -1 ? '' : '&initiative=' + pokemonInitiative
    url += pokemonEvoCost == -1 ? '' : '&evCost=' + pokemonEvoCost
    url += pokemonClimate == 'none' ? '' : '&climate=' + pokemonClimate
    url += pokemonBiome == 'none' ? '' : '&biome=' + pokemonBiome
    url += pokemonTypeLearn1 == 'none' ? '' : '&learnMove1=' + pokemonTypeLearn1
    url += pokemonTypeLearn2 == 'none' ? '' : '&learnMove2=' + pokemonTypeLearn2
    url += pokemonTypeLearn3 == 'none' ? '' : '&learnMove3=' + pokemonTypeLearn3
    url += pokemonTypeLearn4 == 'none' ? '' : '&learnMove4=' + pokemonTypeLearn4

    url += url.length == 24 ? 'd' : url

    loadDoc(url, drawCards)

    const search = document.getElementById('search')
    const formClose = document.getElementById('formClose')

    if (url.length > 24 && search.classList.contains('search--show')) {
        search.classList.remove('search--show')
        formClose.classList.remove('formClose--show')
    }
}

//Funcion para dibujar las cartas obtenidas de getCards en screen
function drawCards(xhttp) {
    const screen = document.getElementById('screen')
    borrar(screen)
    let datos = xhttp.responseText
    screen.innerHTML = datos
}