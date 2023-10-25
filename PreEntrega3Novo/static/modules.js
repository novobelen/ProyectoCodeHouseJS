class DomWrapper {
    constructor() {
        this.foodPreferContainer = document.getElementById("food-preference")
        this.foodPreferenceItems = []
    }
}

const HEALTHY_MENUS = {
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