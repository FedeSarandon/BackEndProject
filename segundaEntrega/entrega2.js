const Contenedor = require("./Contenedor");

const contenedor = new Contenedor("productos.json");

const main = async () => {
    const id1 = await contenedor.save({ title: "Maki Roll", price: 800 });
    const id2 = await contenedor.save({ title: "Buenos Aires Roll", price: 850 });
    const id3 = await contenedor.save({ title: "Tuna Roll", price: 750 });

    console.log(id1, id2, id3);

    const object2 = await contenedor.getById(2);
    console.log(object2); // Se obtiene{title:Buenos Aires Roll,  price:850} 

    await contenedor.deleteById(2); // Elimina del archivo el objeto con el ID buscado

    const allCurrentObjects = await contenedor.getAll();
    console.log(allCurrentObjects); // Retorna los dos objetos restantes ID 1 y ID 3 {title:Maki Roll,  price:800} {title:Tuna Roll,  price:750}
};

main();
