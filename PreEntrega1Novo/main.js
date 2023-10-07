// Bienvenida
alert("Bienvenido a su asesor de comida")

let respuesta;

do {

    preferencias()
    
    //          true o false
    respuesta = confirm("¿necesitas otra receta?")
} while (respuesta) // (respuesta) === true

alert("¡Gracias por usar el Asesor de Comida!");

function preferencias() {
    let preferenciaDietetica = prompt(
        "Por favor ingrese su preferencia alimenticia (1_vegano, 2_carnivoro, 3_vegetariano)",
        "1"
    );

    if (preferenciaDietetica == "1") {
        alert("Un tazón de arroz integral con brócoli y tofu a la parrilla.");
    } else if (preferenciaDietetica == "2") {
        alert(
            "Una pechuga de pollo a la parrilla con una guarnición de vegetales al vapor."
        );
    } else if (preferenciaDietetica == "3") {
        alert("Una ensalada fresca de rucula y tomates.");
    } else {
        alert("Una sopa de lentejas con verduras mixtas.");
    }
}