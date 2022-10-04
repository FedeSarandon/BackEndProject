const fs = require("fs");

class Contenedor {
  constructor(fileName) {
    this._filename = fileName;
    this._leerArchivoCrearUnoNuevo();
  }

  async _leerArchivoCrearUnoNuevo() {
    try {
      await fs.promises.readFile(this._filename, "utf-8");
    } catch (error) {
      error.code === "ENOENT"
        ? this._crearArchivoVacio()
        : console.log(
            `Error Code: ${error.code} | Este es un error inesperado al intentar leer el archivo ${this._filename}`
          );
    }
  }

  async _crearArchivoVacio() {
    fs.writeFile(this._filename, "[]", (error) => {
      error
        ? console.log(error)
        : console.log(`Se creo el archivo ${this._filename} porque no existia en el sistema`);
    });
  }

  async getById(id) {
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);

      return parsedData.find((producto) => producto.id === id);
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error al intentar obtener un elemento por su ID (${id})`
      );
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getData();
      const parsedData = JSON.parse(data);
      const eliminarId = parsedData.find(
        (producto) => producto.id === id
      );

      if (eliminarId) {
        const index = parsedData.indexOf(eliminarId);
        parsedData.splice(index, 1);
        await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
      } else {
        console.log(`El ID ${id} no existe en el archivo`);
        return null;
      }
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error al intentar eliminar un elemento por su ID (${id})`
      );
    }
  }

  async save(object) {
    try {
      const allData = await this.getData();
      const parsedData = JSON.parse(allData);

      object.id = parsedData.length + 1;
      parsedData.push(object);

      await fs.promises.writeFile(this._filename, JSON.stringify(parsedData));
      return object.id;
    } catch (error) {
      console.log(
        `Error Code: ${error.code} | Hubo un error al intentar guardar un elemento`
      );
    }
  }

  async deleteAll() {
    try {
      await this._crearArchivoVacio();
    } catch (error) {
      console.log(
        `Hubo un error (${error.code}) al intentar eliminar todos los objetos`
      );
    }
  }

  async getData() {
    const data = await fs.promises.readFile(this._filename, "utf-8");
    return data;
  }

  async getAll() {
    const data = await this.getData();
    return JSON.parse(data);
  }
}

module.exports = Contenedor;