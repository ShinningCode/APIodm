const request = require('supertest');

const app = require('../app');

const Board = require('../models/board'); // importar el modelo

it('Respond with json cointaining a list of boards', done =>{
    request(app)
    .get('/boards')
        .set('Accept', 'application/json')
        .expect('Content-Type',/json/)
        .expect(200, done);
});

describe('Probar board', () => {
  test('Debería obtener la información de un board', (done) => {
    
    const testBoard = new Board({
      _name: 'Test Board',
      _columns: 'testColumns',
    });

    testBoard.save((err, board) => { // guardar el objeto en la base de datos
      if (err) return done(err);

      supertest(app)
        .get(`/boards/${board._id}`) // hacer una solicitud HTTP GET al endpoint /boards/:id
        .expect(200)
        .end(function(err, res){
          if (err) return done(err);
          // asegurarse de que la respuesta que recibimos sea igual a nuestro objeto de prueba
          expect(res.body.name).toBe(testBoard.name);
          expect(res.body.columns)
          .toEqual(expect.arrayContaining(testBoard.columns.map((column) => column.toString())));
          done();
        });
    });
  });
});
