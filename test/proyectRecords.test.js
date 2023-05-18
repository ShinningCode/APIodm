const supertest = require('supertest');
const app = require('../app');
var key = '';
var id = '';


describe('Deberia probar las rutas de los proyectRecords', ()=>{
    it('Deberia de crear un proyectRecord', (done)=> {
        supertest(app).post('/proyectRecords')
            .send({
                name: 'proyect1',
                requestDate: '2002-12-09',
                startDate: '2002-12-10',
                proyectManagerName: 'Juan',
                proyectManagerLastName: 'Dominguez',
                productOwnerName: 'Jorge',
                productOwnerLastName: 'Dominguez',
                description: 'Proyect made for testing',
                status: true,
                developmentTeam: [
                    ''
                ]
            })
            .set('Authorization', `Bearer ${key}`)
            .end(function(err, res){
                if(err){
                    done(err);
                }else{
                    id = res.body.objs_id;
                    expect(res.statusCode).toEqual(200);
                    done();
                }
            })
    })
    it('Deberia obtener la lista de proyectRecords', (done) => {
        supertest(app).get('/proyectRecords')
            .set('Authorization', `Bearer ${key}`)
            .end(function(err, res){
                if(err){
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(200);
                    done();
                }
            })
    })
    it('Deberia encontrar un proyectRecord', (done)=>{
        supertest(app).get(`/proyectRecords/${id}`)
            .set('Authorization', `Bearer ${key}`)
            .end(function(err, res){
                if(err){
                    done(err);
                }else{
                    expect(res.statusCode).toEqual(200);
                    done();
                }
            })
    })
})