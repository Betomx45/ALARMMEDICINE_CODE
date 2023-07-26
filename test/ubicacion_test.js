const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';

describe("Módulo de Ubicación", () => {

    //Post
    describe('Pruebas para el endpoint POST /ubicación', () => {
        it('Debería crear una nueva ubicación si la latitud y longitud son de tipo float', (done) => {
            const ubicacion = {
                latitud: 37.7749,
                longitud: -122.4194
            };

            chai.request(url)
                .post('/ubicacion')
                .send(ubicacion)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.ubicacion).to.be.an('object');
                    expect(res.body.ubicacion.latitud).to.equal(ubicacion.latitud);
                    expect(res.body.ubicacion.longitud).to.equal(ubicacion.longitud);
                    done();
                });
        });
        it('Debe devolver el código de estado 400 si no se proporcionan latitud y longitud', (done) => {
            chai.request(url)
                .post('/ubicacion')
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });
        it('Debería devolver el código de estado 400 si la latitud no es de tipo float', (done) => {
            const ubicacion = {
                latitud: 'string-invalido',
                longitud: -122.4194
            };

            chai.request(url)
                .post('/ubicacion')
                .send(ubicacion)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });
    });

    //Get
    describe('Pruebas para el endpoint GET /ubicacion', () => {
        it('Debe devolver un array con todas las ubicaciones', (done) => {
            chai.request(url)
                .get('/ubicacion')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.above(0); // Verifica que haya al menos una ubicación
                    done();
                });
        });

        it('Debe devolver el código de estado 400 si ocurre un error en el servidor', (done) => {
            // Forzamos un error en el servidor pasando un ID inválido
            chai.request(url)
                .get('/ubicacion?id=999999')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

        it('Debe devolver un objeto con la ubicación específica si se proporciona un ID válido', (done) => {
            // Suponemos que hay al menos una ubicación en la base de datos
            const ubicacionId = 1;

            chai.request(url)
                .get(`/ubicacion?id=${ubicacionId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('latitud');
                    expect(res.body).to.have.property('longitud');
                    done();
                });
        });
    });

    //PUT
    describe('Pruebas para el endpoint PUT /ubicacion', () => {
        it('Debe actualizar la ubicación y devolver el código de estado 200', (done) => {
            // Suponemos que hay al menos una ubicación en la base de datos
            const ubicacionId = 1;
            const datosActualizados = {
                latitud: 40.7128,
                longitud: -74.0060
            };

            chai.request(url)
                .put(`/ubicacion?id=${ubicacionId}`)
                .send(datosActualizados)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.ubicacion).to.be.an('object');
                    expect(res.body.ubicacion.latitud).to.equal(datosActualizados.latitud);
                    expect(res.body.ubicacion.longitud).to.equal(datosActualizados.longitud);
                    done();
                });
        });

        it('Debe devolver el código de estado 400 si no se proporcionan latitud y longitud', (done) => {
            // Suponemos que hay al menos una ubicación en la base de datos
            const ubicacionId = 1;

            chai.request(url)
                .put(`/ubicacion?id=${ubicacionId}`)
                .send({})
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

        it('Debe devolver el código de estado 400 si la ubicación no existe', (done) => {
            const ubicacionId = 999;
            const datosActualizados = {
                latitud: 40.7128,
                longitud: -74.0060
            };

            chai.request(url)
                .put(`/ubicacion?id=${ubicacionId}`)
                .send(datosActualizados)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });
    });

    //Delete
    describe('Pruebas para el endpoint DELETE /ubicacion', () => {
        // Suponemos que hay al menos una ubicación en la base de datos con ID 1
        const ubicacionIdExistente = 1;
        // Suponemos que el siguiente ID no existe en la base de datos
        const ubicacionIdInexistente = 999;

        it('Debe eliminar la ubicación y devolver el código de estado 200', (done) => {
            chai.request(url)
                .delete(`/ubicacion?id=${ubicacionIdExistente}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('Se eliminó correctamente la ubicación');
                    done();
                });
        });

        it('Debe devolver el código de estado 400 si la ubicación no existe', (done) => {
            chai.request(url)
                .delete(`/ubicacion?id=${ubicacionIdInexistente}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });

        it('Debe devolver el código de estado 400 si no se proporciona un ID válido', (done) => {
            const ubicacionIdInvalido = 'id-invalido';

            chai.request(url)
                .delete(`/ubicacion?id=${ubicacionIdInvalido}`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.error).to.be.true;
                    done();
                });
        });
    });

});