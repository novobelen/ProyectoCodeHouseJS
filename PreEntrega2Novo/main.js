const menuSaludables = {
    vegetariano: [
        { nombre: "Ensalada de quinoa", ingredientes: ["Quinoa", "Tomate", "Lechuga", "Palta"] },
        { nombre: "Tacos de palta", ingredientes: ["Palta", "Tomate", "Cilantro", "Tortillas de maíz"] },
        { nombre: "Wraps de vegetales", ingredientes: ["Espinacas", "Zanahoria", "Tomate", "Hummus"] }
    ],
    vegano: [
        { nombre: "Bowl de garbanzos y espinacas", ingredientes: ["Garbanzos", "Espinacas", "Tomate", "Aceitunas"] },
        { nombre: "Sushi vegano", ingredientes: ["Arroz", "Alga nori", "Pepino", "Palta"] },
        { nombre: "Curry de lentejas", ingredientes: ["Lentejas", "Tomate", "Coco", "Especias"] }
    ],
    carnivoro: [
        { nombre: "Pechuga de pollo a la parrilla", ingredientes: ["Pechuga de pollo", "Limón", "Ajo", "Especias"] },
        { nombre: "Filete de salmón", ingredientes: ["Filete de salmón", "Limón", "Eneldo", "Aceite de oliva"] },
        { nombre: "Hamburguesa de ternera", ingredientes: ["Carne de ternera", "Pan de hamburguesa", "Lechuga", "Tomate"] }
    ],
    otro: [
        { nombre: "Sopa de lentejas con espinacas", ingredientes: ["Lentejas", "Espinacas", "Zanahoria", "Cebolla"] },
        { nombre: "Ensalada César", ingredientes: ["Lechuga romana", "Pollo", "Queso parmesano", "Aderezo César"] },
        { nombre: "Arroz con verduras", ingredientes: ["Arroz", "Zanahoria", "Choclo", "Pimiento"] }
    ]
};

// Bienvenida
alert("Bienvenido a su asesor de comida")

let respuesta;

do {

    const comida = obtenerComidaPorPreferencia()

    alert(`El menu para usted es '${comida.nombre}'.`)

    //          true o false
    respuesta = confirm("¿necesitas otra receta?")
} while (respuesta) // (respuesta) === true

alert("¡Gracias por usar el Asesor de Comida!");

function obtenerComidaPorPreferencia() {
    let opcion = prompt(
        "Por favor ingrese su preferencia alimenticia (vegano, carnivoro, vegetariano)",
        "vegano"
    ).toLowerCase();

    const menus = menuSaludables[opcion] || menuSaludables.otro;

    // quiere seleccionar ingredientes?
    // const listIngredientes = ingredientes.listarIngredientes()
    // alert(`${listIngredientes}`)
    const aceptar = confirm("¿quiere ver los ingredientes?")
    if (aceptar === true) {
        console.log("ok")

        const listaIngredientes = []; // nueva lista, almacenara todos los ingredientes
        for (let menu of menus) { // menu es mi objeto
            for (let ingrediente of menu.ingredientes) {
                listaIngredientes.push(ingrediente)
            }
        }

        const listaIngredienteUnique = [...new Set(listaIngredientes)]
        // mostrar lista
        const peticion = "Estos son algunos de los ingrediente, por favor seleccion alguno"
        const listaParaMostrar = []
        for (let i = 0; i < listaIngredienteUnique.length; i++) {
            listaParaMostrar.push(`${i + 1}) ${listaIngredienteUnique[i]}`);
        }

        const stringListaParaMostrar = listaParaMostrar.join("\n");
        const opcionIngrediente = prompt(`${peticion}\n${stringListaParaMostrar}`, "1")

        const opcionValida = parseInt(opcionIngrediente) <= listaIngredienteUnique.length
        if (opcionValida) {
            const ingredienteSeleccionado = listaIngredienteUnique[parseInt(opcionIngrediente) - 1]
            let menuBuscado;
            for (const menu of menus) {
                if (!menuBuscado) {
                    for (const ingrediente of menu.ingredientes) {
                        if (ingredienteSeleccionado.toLowerCase() === ingrediente.toLowerCase()) {
                            menuBuscado = menu;
                            break
                        }
                    }
                } else {
                    break;
                }
            }

            return menuBuscado;
        } else {
            alert("Opcion no valida.")
            const indiceAleatorio = Math.floor(Math.random() * menus.length);
            return menus[indiceAleatorio]
        }
    }

    const indiceAleatorio = Math.floor(Math.random() * menus.length);
    return menus[indiceAleatorio];
}

