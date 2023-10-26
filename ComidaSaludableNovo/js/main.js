'use strict'
const dom = {
    foodPreference: {
        containerElement: document.getElementById("food-preference"),
        preferences: []
    },
    ingredients: {
        sectionElement: document.getElementById("ingredients"),
        title: document.querySelector("#ingredients>p"),
        list: document.getElementById("ingredients-list"),
        question: document.getElementById("ingredients-question")
    },
    result: {
        element: document.getElementById("result"),
        title: document.querySelector("#result>p"),
        resetBtn: document.querySelector("#result>button"),
    }
}

const KEYS_STORAGE = {
    MENU: "menu"
}

const seletedModel = {
    category: {
        name: null,
        nameCap: null,
        menu: null,
        menus: null,
    },
}

let menuStorage

function selectFoodPreference(select) {
    seletedModel.category.menus = menuStorage[select].menus
    seletedModel.category.name = select

    for (const preference of dom.foodPreference.preferences) {
        const isSelected = preference.element.id === `category-${select}`

        if (isSelected) {
            seletedModel.category.nameCap = preference.menuNameCap
        }
    }

    dom.ingredients.title.textContent = `Opcion elegida: ${seletedModel.category.nameCap}`
    dom.ingredients.sectionElement.classList.remove("is-hidden")
}

const utils = {
    capitalize: function (word) {
        const firstLetter = word.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = word.slice(1)
        const capitalizedWord = firstLetterCap + remainingLetters

        return capitalizedWord
    },

    buildTemplate: function (menuNameEsp, imgName) {
        const menuTemp = (title, img) => `
        <div class="card">
            <div class="card-image">
                <figure class="image is-4by3">
                    <img src="img/${img}.jpg" class="container-img" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-size-3">${title}</p>
            </div>
        </div>`

        const elementStr = menuTemp(menuNameEsp, imgName)
        return elementStr
    }
}

const load = {
    localStorage() {
        menuStorage = localStorage.getItem(KEYS_STORAGE.MENU)
        if (!menuStorage) {
            menuStorage = HEALTHY_MENUS;
            localStorage.setItem(KEYS_STORAGE.MENU, JSON.stringify(menuStorage))
        } else {
            menuStorage = JSON.parse(menuStorage)
        }
    },
    foodPreferences() {
        const menuKeys = Object.keys(menuStorage);

        for (const key of menuKeys) {
            const { nameEsp: menuNameCap } = menuStorage[key]
            const id = `category-${key}`
            const elementStr = utils.buildTemplate(menuNameCap, key)
            const element = document.createElement("div")
            element.id = id
            element.onclick = function () {
                cleanProccess()
                selectFoodPreference(key)

                dom.ingredients.list.querySelectorAll('a.panel-block').forEach(function (panelBlock) {
                    dom.ingredients.list.removeChild(panelBlock);
                });
                dom.ingredients.question.classList.remove("is-hidden")
            }
            element.innerHTML = elementStr

            dom.foodPreference.containerElement.appendChild(element)
            dom.foodPreference.preferences.push({ menuNameCap, element })
        }
    }
}

const initialize = () => {
    load.localStorage()
    load.foodPreferences()
}

const selectIngredient = (ingredientSelected) => {
    const { menus } = seletedModel.category;
    const menu = menus.find(m =>
        m.ingredients.some(ingre =>
            ingredientSelected.toLowerCase() === ingre.toLowerCase()
        )
    );
    const { element, title, resetBtn } = dom.result;
    title.innerHTML = `Te recomendamos: ${menu.name}`;
    element.classList.remove("is-hidden");
    resetBtn.onclick = cleanProccess;
}

const cleanProccess = () => {
    seletedModel.category.name = null
    seletedModel.category.nameCap = null
    seletedModel.category.menu = null
    seletedModel.category.menus = null

    dom.ingredients.title.textContent = null
    dom.ingredients.list.querySelector(".panel-heading").classList.add("is-hidden")
    dom.ingredients.question.classList.remove("is-hidden")
    dom.ingredients.sectionElement.classList.add("is-hidden")

    dom.result.element.classList.add("is-hidden")
}

const cleanList = () => {
    const ingredientsList = document.getElementById("ingredients-list");
    const panelBlocks = ingredientsList.querySelectorAll('a.panel-block');

    panelBlocks.forEach(function (panelBlock) {
        ingredientsList.removeChild(panelBlock);
    });

    return ingredientsList;
}

const eventClickViewIngredients = (acceptView) => {
    dom.ingredients.question.classList.add("is-hidden")
    if (acceptView) {
        dom.ingredients.list.querySelector(".panel-heading").classList.remove("is-hidden")
        const ingredients = seletedModel.category.menus.flatMap(menu => menu.ingredients);
        const ingredientsUnique = [...new Set(ingredients)]

        const ingredientsList = cleanList()
        for (const ingredient of ingredientsUnique) {
            const newPanelBlockHTML = `
            <a class="panel-block is-active" onclick="selectIngredient('${ingredient}')">
                <span class="panel-icon">
                <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                ${ingredient}
            </a>
            `;

            ingredientsList.innerHTML += newPanelBlockHTML;
        }
    } else {

        const { menus } = seletedModel.category;
        const indexRam = Math.floor(Math.random() * menus.length);
        const menu = menus[indexRam];

        const { element, title, resetBtn } = dom.result;
        title.innerHTML = `Te recomendamos: ${menu.name}`;
        element.classList.remove("is-hidden");
        resetBtn.onclick = cleanProccess;
    }
}

initialize()
