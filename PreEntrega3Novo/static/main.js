'use strict'
const dom = new DomWrapper()

const KEYS_STORAGE = {
    MENU: "menu"
}

let menuStorage

function selectFoodPreference(select) {
    console.log(select)

    const categoryMenu = menuStorage[select]
    const categoryName = select

    for (const ele of dom.foodPreferenceItems) {
        ele.classList.remove("disabled", "bounceIn")
    }

    for (const ele of dom.foodPreferenceItems) {
        const isSelected = ele.id === `category-${select}`

        if (isSelected) {
            ele.classList.add("bounceIn")
            setTimeout(() => {
                ele.classList.remove("bounceIn");
            }, 100);

        } else {
            ele.classList.add("disabled")
        }
    }
    
    // const aceptar = confirm("¿quiere ver los ingredientes?")
    // if (aceptar === true) {

    //     const listaIngredientes = menus.flatMap(menu => menu.ingredientes);
    //     const listaIngredienteUnique = [...new Set(listaIngredientes)]

    //     // mostrar lista
    //     const peticion = "Estos son algunos de los ingrediente, por favor seleccion alguno"
    //     const listaParaMostrar = []
    //     for (let i = 0; i < listaIngredienteUnique.length; i++) {
    //         listaParaMostrar.push(`${i + 1}) ${listaIngredienteUnique[i]}`);
    //     }

    //     const stringListaParaMostrar = listaParaMostrar.join("\n");
    //     const opcionIngrediente = prompt(`${peticion}\n${stringListaParaMostrar}`, "1")

    //     const opcionValida = parseInt(opcionIngrediente) <= listaIngredienteUnique.length
    //     if (opcionValida) {
    //         const ingredienteSeleccionado = listaIngredienteUnique[parseInt(opcionIngrediente) - 1]
    //         let menu = menus.find(m => m.ingredientes.some(ingre => ingredienteSeleccionado.toLowerCase() === ingre.toLowerCase()))

    //         return menu;
    //     } else {
    //         alert("Opcion no valida.")
    //         const indiceAleatorio = Math.floor(Math.random() * menus.length);
    //         return menus[indiceAleatorio]
    //     }
    // }

    // const indiceAleatorio = Math.floor(Math.random() * menus.length);
    // return menus[indiceAleatorio];
}

const utils = {
    capitalize: function (word) {
        const firstLetter = word.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = word.slice(1)
        const capitalizedWord = firstLetterCap + remainingLetters

        return capitalizedWord
    },

    buildTemplate: function (menuName) {
        const menuTemp = (title) => `
            <div class="content u-text-center" aria-hidden="true">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt"
                    class="u-inline-block fa-bolt fa-w-10 fa-wrapper text-blue-600 bg-blue-100 p-3" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
                    style="border-radius: 100%; height: 4.75rem; width: 4.75rem;">
                    <path fill="currentColor"
                        d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z">
                    </path>
                </svg>
                <p id="projectname" class="title">${title}</p>
        </div>`

        const menuNameCap = utils.capitalize(menuName)
        const divStr = menuTemp(menuNameCap)

        return divStr
    }
}

const load = () => {
    menuStorage = localStorage.getItem(KEYS_STORAGE.MENU)
    if (!menuStorage) {
        menuStorage = HEALTHY_MENUS;
        localStorage.setItem(KEYS_STORAGE, JSON.stringify(menuStorage))
    }

    const menuKeys = Object.keys(HEALTHY_MENUS);

    for (const key of menuKeys) {
        const id = `category-${key}`
        const elementStr = utils.buildTemplate(key, id)
        const ele = document.createElement("div")
        ele.id = id
        ele.classList = "bg-gray-000 hover-grow w-auto p-2 animated"
        ele.onclick = function () {
            selectFoodPreference(key)
        }
        ele.innerHTML = elementStr

        dom.foodPreferContainer.appendChild(ele)
        dom.foodPreferenceItems.push(ele)
    }
}

load()
