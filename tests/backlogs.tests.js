const supertest = require('supertest');
const app = require('../app');
let key = '';
let id = '';

// Prueba de la función crear un actor
describe('Prueba de inicio de sesion', () => {
  it('debería crear un nuevo actor', async () => {
    const response = await supertest(app)
      .post('/api/backlogs')
      .send({ name: 'Edgar', lastName: 'Gonzalez', gender: 'male' })
      .expect(201); // Espera un código de estado HTTP 201 (creado)

    // Guarda el ID del actor creado para usarlo en las pruebas posteriores
    id = response.body.id;
  });
});

// Prueba de la función obtener un actor
describe('GET /api/actors/:id', () => {
  it('debería obtener los detalles de un actor específico', async () => {
    await supertest(app)
      .get(`/api/actors/${id}`)
      .expect(200) // Espera un código de estado HTTP 200
      .then((response) => {
        // Realiza aserciones sobre la respuesta
        expect(response.body.name).toBe('John Doe');
        expect(response.body.age).toBe(30);
        expect(response.body.gender).toBe('male');
      });
  });
});

// Prueba de la función modificar un actor
describe('PUT /api/actors/:id', () => {
  it('debería modificar los datos de un actor específico', async () => {
    await supertest(app)
      .put(`/api/actors/${id}`)
      .send({ name: 'Jane Doe', age: 35 })
      .expect(200); // Espera un código de estado HTTP 200

    // Verifica que los cambios se hayan aplicado correctamente
    await supertest(app)
      .get(`/api/actors/${id}`)
      .expect(200) // Espera un código de estado HTTP 200
      .then((response) => {
        // Realiza aserciones sobre la respuesta
        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.age).toBe(35);
        expect(response.body.gender).toBe('male'); // El género no debe haber cambiado
      });
  });
});

// Prueba de la función eliminar un actor
describe('DELETE /api/actors/:id', () => {
  it('debería eliminar un actor específico', async () => {
    await supertest(app)
      .delete(`/api/actors/${id}`)
      .expect(204); // Espera un código de estado HTTP 204 (sin contenido)

    // Verifica que el actor haya sido eliminado correctamente
    await supertest(app)
      .get(`/api/actors/${id}`)
      .expect(404); // Espera un código de estado HTTP 404 (no encontrado)
  });
});
