class Usuario {
    constructor(nombre,apellido,libros,mascotas) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._libros = libros;
        this._mascotas = mascotas;
    }

    getFullName(){
        return `${this._nombre} ${this._apellido}`;
        
    }
    
    addMascota(nombreMascota){
        return this._mascotas.push(nombreMascota);
    }

    countMascotas(){
        return this._mascotas.length;
    }

    addBook(titulo,autor){
        this._libros.push({nombre:titulo, autor:autor});
    }

    getBookNames(){
        return this._libros.map((libro) => libro.nombre); //.map busca dentro del obj libros el nombre de cada uno
    }

    getBookAutor(){
        return this._libros.map((libro_autor) => libro_autor.autor); //.map busca dentro del obj libro el autor de cada uno
    }

}

const libros = [
    {
        nombre: 'La larga marcha',
        autor: 'Stephen King'
    },
    {
        nombre: 'Corazon de rey',
        autor: 'Maravilla Martinez'
    }
];

const p = new Usuario('Federico', 'Sarandon', libros, ['Perro','Cocodrilo']);

console.log(p.getFullName()); // Retorna nombre completo, en este caso Federico Sarandon;

console.log(p.countMascotas()); // Retorna el numero 2, seria el total de las mascotas: 'Perro' y 'Cocodrilo'(2);

console.log(p.getBookNames()); // Retorna el nombre de los libros;

p.addMascota('Gato'); // Agrego una mascota mas (Gato);
console.log(p.countMascotas()); // Retorna el numero 3, agregando el animal anterior con el addMascota();

p.addBook('Watchmen', 'Alan Moore y Dave gibbons'); // Agregamos un libro mas (Watchmen + autores);
console.log(p.getBookNames()); // Retorna el nuevo libro agregado;

console.log(p.getBookAutor()); //Retorna los autores de los libros;
